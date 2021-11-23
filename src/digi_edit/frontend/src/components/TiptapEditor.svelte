<script lang="ts">
    import { onMount, onDestroy, createEventDispatcher } from 'svelte';
    import { Editor, isActive } from '@tiptap/core';
    import { Document } from '@tiptap/extension-document';
    import { Text } from '@tiptap/extension-text';
    import { History } from '@tiptap/extension-history';
    import BubbleMenu from '@tiptap/extension-bubble-menu';
    import type { Schema } from 'prosemirror-model';

    import { createConfigurableMark, createConfigurableNode, ExtendNodeSelection, ToggleWrapNode, ClearSelection } from '../tiptap';
    import EditorMenuEntry from './EditorMenuEntry.svelte';

    export let doc = null;
    export let fullDoc = null;
    export let schema = null;
    export let bubbleMenu = null;
    export let sidebarMenu = null;

    const dispatch = createEventDispatcher();
    let editorElement = null;
    let bubbleMenuElement = null;
    let editor = null;
    let updateTimeout = null;
    let internalUpdate = false;

    function getSchemaTypeNameByName(name: string, schema: Schema): 'node' | 'mark' | null {
        if (schema.nodes[name]) {
            return 'node';
        } else if (schema.marks[name]) {
            return 'mark';
        }
        return null;
    }

    function createAttributes(schema, names) {
        const attrs = {};
        if (names) {
            for (let attr of schema.attributes) {
                if (names.filter((name) => { return name === attr.name; }).length > 0) {
                    attrs[attr.name] = {
                        default: attr.default,
                    };
                }
            }
        }
        return attrs;
    }

    function initEditor(text: string) {
        if (internalUpdate) {
            internalUpdate = false;
            return;
        }
        if (editor) {
            editor.destroy();
        }
        if (text && schema && schema.elements && schema.attributes) {
            const extensions = [
                Document,
                History,
                Text,
                ExtendNodeSelection,
                ToggleWrapNode,
                ClearSelection,
            ] as any[];
            if (bubbleMenuElement && bubbleMenu) {
                extensions.push(BubbleMenu.configure({
                    element: bubbleMenuElement,
                }));
            }
            for (let element of schema.elements) {
                if (element.name === 'doc') {
                    continue;
                }
                if (!element.type || element.type === 'block') {
                    extensions.push(createConfigurableNode({
                        name: element.name,
                        group: element.group,
                        content: element.content,
                        defining: element.defining,
                        attributes: createAttributes(schema, element.attrs),
                    }));
                } else if (element.type === 'inline') {
                    extensions.push(createConfigurableNode({
                        name: element.name,
                        group: 'inline',
                        inline: true,
                        attributes: createAttributes(schema, element.attrs),
                    }));
                } else if (element.type === 'nested') {
                    // Nothing needed for this
                } else if (element.type === 'text') {
                    // Nothing needed for this
                } else if (element.type === 'mark') {
                    extensions.push(createConfigurableMark({
                        name: element.name,
                        attributes: createAttributes(schema, element.attrs),
                    }))
                } else {
                    console.error('Unknown element type ' + element.type);
                }
            }
            editor = new Editor({
                element: editorElement,
                extensions: extensions,
                content: doc,
                onTransaction: ({ transaction }) => {
                    if (transaction.docChanged) {
                        clearTimeout(updateTimeout);
                        updateTimeout = setTimeout(() => {
                            internalUpdate = true;
                            dispatch('update', transaction.doc.toJSON());
                        }, 1000);
                    }
                    editor = editor;
                }
            });
        }
    }

    /**
     * Handle menubar actions
     *
     * @param config
     * @param ev
     */
     function handleAction(entry, ev: Event) {
        if (editor) {
            const config = entry.action;
            if (config.type === 'setNode') {
                if (config.attributes) {
                   editor.chain().focus().setNode(config.name, config.attributes).run();
                } else {
                    editor.chain().focus().setNode(config.name).run();
                }
            } else if (config.type === 'toggleWrapNode') {
                editor.chain().focus().toggleWrapNode(config.name, config.wrappedName, config.unwrappedName).run();
            } else if (config.type === 'toggleMark') {
                editor.chain().focus().toggleMark(config.name).run();
            } else if (config.type === 'selectAttribute') {
                const elementType = getSchemaTypeNameByName(config.name, editor.schema);
                if (elementType === 'mark') {
                    if (isConfigActive(editor, config)) {
                        if (!ev.detail) {
                            editor.chain().focus().unsetMark(config.name).run();
                        } else {
                            editor.chain().focus().extendMarkRange(config.name).updateAttributes(config.name, {[config.attribute]: ev.detail}).run();
                        }
                    } else {
                        editor.chain().focus().setMark(config.name, {[config.attribute]: ev.detail}).run();
                    }
                }
            } else if (config.type === 'selectNestedDoc') {
                const elementType = getSchemaTypeNameByName(config.markerName, editor.schema);
                if (elementType === 'mark') {
                    editor.chain().focus().extendMarkRange(config.markerName).updateAttributes(config.markerName, {nestedTarget: ev.detail}).run();
                }
            } else if (config.type === 'setAttribute') {
                editor.chain().focus().updateAttributes(config.name, {[config.attribute]: config.value}).run();
            } else if (config.type === 'inputAttribute') {
                const elementType = getSchemaTypeNameByName(config.name, editor.schema);
                if (elementType === 'node') {
                    editor.chain().focus().updateAttributes(config.name, {[config.attribute]: ev.detail}).run();
                } else if (elementType === 'mark') {
                    editor.chain().focus().extendMarkRange(config.name).updateAttributes(config.name, {[config.attribute]: ev.detail}).run();
                }
            } else if (config.type === 'toggleAttribute') {
                if (isConfigActive(editor, config)) {
                    editor.chain().focus().updateAttributes(config.name, {[config.attribute]: null}).run();
                } else {
                    editor.chain().focus().updateAttributes(config.name, {[config.attribute]: config.value}).run();
                }
            } else if (config.type === 'editNestedDoc') {
                if (editor.getAttributes(config.markerName).nestedTarget) {
                    dispatch('editNestedDoc', {
                        type: config.name,
                        id: editor.getAttributes(config.markerName).nestedTarget,
                    });
                    editor.chain().focus().clearSelection().run();
                } else {
                    dispatch('editNestedDoc', {
                        type: config.name,
                        id: editor.getAttributes(config.markerName).nestedTarget,
                        created(newId: string) {
                            editor.chain().focus().extendMarkRange(config.markerName).updateAttributes(config.markerName, {'nestedTarget': newId}).clearSelection().run();
                        }
                    });
                }
            }
        }
    }

    /**
     * Check if the given Menubar element is active
     *
     * @param editor
     * @param element
     */
    function isConfigActive(editor, config) {
        if (config) {
            if (config.type === 'selectMarkAttribute') {
                for (let value of config.values) {
                    if (isActive(editor.state, config.name, {[config.attribute]: value.value})) {
                        return value.value;
                    }
                }
                return false;
            } else if (config.type === 'selectNestedDoc') {
                return editor.getAttributes(config.markerName).nestedTarget;
            } else if (config.type === 'inputAttribute') {
                return editor.getAttributes(config.name)[config.attribute];
            } else {
                if (config.attributes) {
                    return isActive(editor.state, config.name, config.attributes);
                } else if (config.attribute && config.value) {
                    return isActive(editor.state, config.name, {[config.attribute]: config.value});
                } else {
                    return isActive(editor.state, config.name);
                }
            }
        }
    }

    function nestedDocList(entry) {
        if (fullDoc[entry.action.name]) {
            return Object.values(fullDoc[entry.action.name]).map((nestedDoc) => {
                return {
                    value: nestedDoc.id,
                    label: nestedDoc.id,
                }
            });
        }
        return [];
    }

    onMount(() => {
        internalUpdate = false;
        initEditor(doc);
    });

    $: {
        initEditor(doc);
    }

    onDestroy(() => {
        if (editor) {
            clearTimeout(updateTimeout);
            dispatch('update', editor.state.doc.toJSON());
            editor.destroy();
        }
    });
</script>

<div id="tiptap-editor" class="flex flex-row w-full h-full overflow-hidden">
    <div bind:this={editorElement} class="flex-auto h-full px-2 py-1 overflow-auto"></div>
    <div id="tiptap-editor-sidebar" class="flex-none w-1/4 border-l border-solid border-gray-300 px-3 py-1 overflow-auto">
        {#if sidebarMenu}
            {#each sidebarMenu as section}
                {#if !section.filter || isConfigActive(editor, section.filter)}
                    <section class="mb-4">
                        <h3 class="font-bold mb-2">{section.label}</h3>
                        {#if section.menus}
                            {#each section.menus as menu}
                                {#if menu.entries && (!menu.filter || isConfigActive(editor, menu.filter))}
                                    <ul class="flex flex-row flex-wrap items-center mb-2">
                                        {#each menu.entries as entry}
                                            {#if entry.separator}
                                                <li role="presentation" class="{entry.svg ? '': 'w-6'}">
                                                    {#if entry.svg}
                                                        {@html entry.svg}
                                                    {/if}
                                                </li>
                                            {:else if (!entry.filter || isConfigActive(editor, entry.filter))}
                                                <li role="presentation">
                                                    {#if entry.action.type === 'selectNestedDoc'}
                                                        <EditorMenuEntry entry={entry} active={isConfigActive(editor, entry.action)} values={nestedDocList(entry)} on:action={(ev) => { handleAction(entry, ev) }}/>
                                                    {:else}
                                                        <EditorMenuEntry entry={entry} active={isConfigActive(editor, entry.action)} on:action={(ev) => { handleAction(entry, ev) }}/>
                                                    {/if}
                                                </li>
                                            {/if}
                                        {/each}
                                    </ul>
                                {/if}
                            {/each}
                        {/if}
                    </section>
                {/if}
            {/each}
        {/if}
    </div>
    <div id="tiptap-editor-bubblemenu" bind:this={bubbleMenuElement} class="{bubbleMenu ? 'bg-white p-1 border border-gray-300 shadow-lg' : 'hidden'}">
        {#if bubbleMenu}
            {#each bubbleMenu as menu}
                {#if menu.entries && (!menu.filter || isConfigActive(editor, menu.filter))}
                    <ul class="flex flex-row flex-wrap items-center mb-2 last:mb-0">
                        {#each menu.entries as entry}
                            {#if entry.separator}
                                <li role="presentation" class="{entry.svg ? '': 'w-6'}">
                                    {#if entry.svg}
                                        {@html entry.svg}
                                    {/if}
                                </li>
                            {:else if (!entry.filter || isConfigActive(editor, entry.filter))}
                                <li role="presentation">
                                    {#if entry.action.type === 'selectNestedDoc'}
                                        <EditorMenuEntry entry={entry} active={isConfigActive(editor, entry.action)} values={nestedDocList(entry)} on:action={(ev) => { handleAction(entry, ev) }}/>
                                    {:else}
                                        <EditorMenuEntry entry={entry} active={isConfigActive(editor, entry.action)} on:action={(ev) => { handleAction(entry, ev) }}/>
                                    {/if}
                                </li>
                            {/if}
                        {/each}
                    </ul>
                {/if}
            {/each}
        {/if}
    </div>
</div>
