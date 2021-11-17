<script lang="ts">
    import { onMount, onDestroy } from 'svelte';
    import { get } from 'svelte/store';
    import { Editor, isActive, getNodeType } from '@tiptap/core';
    import { Document } from '@tiptap/extension-document';
    import { Text } from '@tiptap/extension-text';
    import { History } from '@tiptap/extension-history';
    import BubbleMenu from '@tiptap/extension-bubble-menu';

    import { createConfigurableMark, createConfigurableNode } from '../tiptap';
    import { schema, uiConfig } from '../stores';
    import { TEIParser } from '../tei';
    import EditorMenuEntry from './EditorMenuEntry.svelte';

    export let text: string;

    let editorElement = null as HTMLElement;
    let bubbleMenuElement = null as HTMLElement;
    let editor = null;

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

    function initEditor(text: string, localSchema) {
        if (editor) {
            editor.destroy();
        }
        if (text && localSchema && localSchema.elements && localSchema.attributes) {
            const parser = new TEIParser(localSchema);
            const extensions = [
                Document,
                History,
                Text,
            ] as any[];
            if (bubbleMenuElement) {
                extensions.push(BubbleMenu.configure({
                    element: bubbleMenuElement,
                }));
            }
            for (let element of localSchema.elements) {
                if (element.name === 'doc') {
                    continue;
                }
                if (!element.type || element.type === 'block') {
                    extensions.push(createConfigurableNode({
                        name: element.name,
                        attributes: createAttributes(localSchema, element.attrs),
                    }));
                } else if (element.type === 'inline') {
                    extensions.push(createConfigurableNode({
                        name: element.name,
                        group: 'inline',
                        inline: true,
                        attributes: createAttributes(localSchema, element.attrs),
                    }));
                } else if (element.type === 'nested') {
                    // TODO: Implement
                } else if (element.type === 'text') {
                    // Nothing needed for this
                } else if (element.type === 'mark') {
                    extensions.push(createConfigurableMark({
                        name: element.name,
                        attributes: createAttributes(localSchema, element.attrs),
                    }))
                } else {
                    console.error('Unknown element type ' + element.type);
                }
            }
            editor = new Editor({
                element: editorElement,
                extensions: extensions,
                content: parser.parse(text),
                onTransaction: ({ transaction }) => {
                    editor = editor;
                }
            });
        }
    }

    onMount(() => {
        initEditor(text, get(schema));
    });

    $: {
        initEditor(text, get(schema));
    }

    onDestroy(() => {
        if (editor) {
            editor.destroy();
        }
    });

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
            } else if (config.type === 'toggleMark') {
                editor.chain().focus().toggleMark(config.name).run();
            } else if (config.type === 'selectMarkAttribute') {
                if (isConfigActive(editor, config)) {
                    if (!ev.detail) {
                        editor.chain().focus().unsetMark(config.name).run();
                    } else {
                        editor.chain().focus().extendMarkRange(config.name).updateAttributes(config.name, {[config.attribute]: ev.detail}).run();
                    }
                } else {
                    editor.chain().focus().setMark(config.name, {[config.attribute]: ev.detail}).run();
                }
            } else if (config.type === 'setAttribute') {
                editor.chain().focus().updateAttributes(config.name, {[config.attribute]: config.value}).run();
            } else if (config.type === 'inputAttribute') {
                editor.chain().focus().updateAttributes(config.name, {[config.attribute]: ev.detail}).run();
            } else if (config.type === 'toggleAttribute') {
                if (isConfigActive(editor, config)) {
                    editor.chain().focus().updateAttributes(config.name, {[config.attribute]: null}).run();
                } else {
                    editor.chain().focus().updateAttributes(config.name, {[config.attribute]: config.value}).run();
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
</script>

<div id="tei-editor" class="flex flex-col h-full overflow-hidden">
    <nav class="flex-none">
        <ul class="flex flex-row">
            <li role="presentation">
                <button class="block px-2 py-1 border-b border-solid border-gray-300 hover:border-blue-700 focus:border-blu-700">Save</button>
            </li>
            <li role="presentation">
                <button class="block px-2 py-1 border-b border-solid border-gray-300 hover:border-blue-700 focus:border-blu-700">Discard</button>
            </li>
            <li role="presentation" class="flex-auto border-b border-solid border-gray-300"></li>
        </ul>
    </nav>
    <div class="flex-auto flex flex-row overflow-hidden">
        <div bind:this={editorElement} class="flex-auto overflow-auto">
        </div>
        {#if editor && $uiConfig && $uiConfig.editor && $uiConfig.editor.tei}
            {#if $uiConfig.editor.tei.sidebar}
                <div id="tei-editor-sidebar" class="flex-none w-1/5 border-l border-solid border-gray-300 px-3 py-1">
                    {#each $uiConfig.editor.tei.sidebar as section}
                        {#if !section.filter || isConfigActive(editor, section.filter)}
                            <section class="mb-4">
                                <h3 class="font-bold mb-2">{section.label}</h3>
                                {#if section.menus}
                                    {#each section.menus as menu}
                                        {#if menu.entries}
                                            <ul class="flex flex-row flex-wrap items-center mb-2">
                                                {#each menu.entries as entry}
                                                    {#if entry.separator}
                                                        <li role="presentation" class="w-6"></li>
                                                    {:else}
                                                        <li role="presentation">
                                                            <EditorMenuEntry entry={entry} active={isConfigActive(editor, entry.action)} on:action={(ev) => { handleAction(entry, ev) }}/>
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
                </div>
            {/if}
            {#if $uiConfig.editor.tei.bubbleMenu}
                <div bind:this={bubbleMenuElement} class="bg-white p-1 border border-gray-300 shadow-lg">
                    {#each $uiConfig.editor.tei.bubbleMenu as menu}
                        {#if menu.entries}
                            <ul class="flex flex-row flex-wrap items-center mb-2 last:mb-0">
                                {#each menu.entries as entry}
                                    {#if entry.separator}
                                        <li role="presentation" class="w-6"></li>
                                    {:else}
                                        <li role="presentation">
                                            <EditorMenuEntry entry={entry} active={isConfigActive(editor, entry.action)} on:action={(ev) => { handleAction(entry, ev) }}/>
                                        </li>
                                    {/if}
                                {/each}
                            </ul>
                        {/if}
                    {/each}
                </div>
            {/if}
        {/if}
    </div>
</div>
