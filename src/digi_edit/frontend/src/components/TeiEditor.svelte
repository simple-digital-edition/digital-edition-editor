<script lang="ts">
    import { onMount, onDestroy } from 'svelte';
    import { get } from 'svelte/store';
    import { Editor, isActive } from '@tiptap/core';
    import { Document } from '@tiptap/extension-document';
    import { Text } from '@tiptap/extension-text';
    import { History } from '@tiptap/extension-history';
    import BubbleMenu from '@tiptap/extension-bubble-menu';

    import { createConfigurableMark, createConfigurableNode } from '../tiptap';
    import { schema, uiConfig } from '../stores';
    import { TEIParser } from '../tei';

    export let text: string;

    let editorElement = null as HTMLElement;
    let bubbleMenuElement = null as HTMLElement;
    let editor = null;
    let activeAttributes = {};

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
        if (text && localSchema) {
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
                    const { from, to } = transaction.selection;
                    const active = {};
                    transaction.doc.nodesBetween(from, to, (node) => {
                        active[node.type.name] = node.attrs;
                        if (node.marks) {
                            node.marks.forEach((mark) => {
                                if (mark.attrs) {
                                    active[mark.type.name] = mark.attrs;
                                } else {
                                    active[mark.type.name] = {};
                                }
                            });
                        }
                    });
                    activeAttributes = active;
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
     function handleAction(config, ev: Event) {
        if (editor) {
            if (config.type === 'setNode') {
                if (config.attributes) {
                   editor.chain().focus().setNode(config.name, config.attributes).run();
                } else {
                    editor.chain().focus().setNode(config.name).run();
                }
            } else if (config.type === 'toggleMark') {
                editor.chain().focus().toggleMark(config.name).run();
            } else if (config.type === 'updateAttribute') {
                if (activeAttributes[config.node]) {
                    if (config.value) {
                        editor.chain().focus().updateAttribute(config.name, config.attribute, config.value).run();
                    } else {
                        editor.chain().focus().updateAttribute(config.name, config.attribute, ev).run();
                    }
                } else {
                    if (config.value) {
                        editor.chain().focus().setNode(config.name).updateAttribute(config.name, config.attribute, config.value).run();
                    } else {
                        editor.chain().focus().setNode(config.name).updateAttribute(config.name, config.attribute, ev).run();
                    }
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
     function isConfigActive(editor, element) {
        if (element.action.type === 'setNode') {
            if (element.action.attributes) {
                return isActive(editor.state, element.action.name, element.action.attributes);
            } else {
                return isActive(editor.state, element.action.name);
            }
        } else if (element.action.type === 'toggleMark') {
            return isActive(editor.state, element.action.name);
        } else if (element.action.type === 'updateAttribute' && element.action.value) {
            return isActive(editor.state, element.action.name, {[element.action.attribute]: element.action.value});
        }
        return false;
    }
</script>

<div class="flex flex-col h-full overflow-hidden">
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
                <div class="flex-none border-l border-solid border-gray-300 px-3 py-1">
                    {#each $uiConfig.editor.tei.sidebar as section}
                        <section>
                            <h3 class="font-bold">{section.label}</h3>
                            {#if section.menus}
                                {#each section.menus as menu}
                                    {#if menu.entries}
                                        <ul class="flex flex-row flex-wrap">
                                            {#each menu.entries as entry}
                                                <li role="presentation">
                                                    {#if entry.svg}
                                                        <button on:click={(ev) => { handleAction(entry.action, ev); }} class="block {isConfigActive(editor, entry) ? 'bg-gray-300' : ''}" title={entry.label}>
                                                            {@html entry.svg}
                                                        </button>
                                                    {:else}
                                                        <button on:click={(ev) => { handleAction(entry.action, ev); }} class="block {isConfigActive(editor, entry) ? 'bg-gray-300' : ''}">
                                                            {entry.label}
                                                        </button>
                                                    {/if}
                                                </li>
                                            {/each}
                                        </ul>
                                    {/if}
                                {/each}
                            {/if}
                        </section>
                    {/each}
                </div>
            {/if}
            {#if $uiConfig.editor.tei.bubbleMenu}
                <ul bind:this={bubbleMenuElement} class="bg-white p-1 border border-gray-300 shadow-lg flex flex-row flex-wrap">
                    {#each $uiConfig.editor.tei.bubbleMenu as entry}
                        <li role="presentation">
                            {#if entry.svg}
                                <button on:click={(ev) => { handleAction(entry.action, ev); }} class="block {isConfigActive(editor, entry) ? 'bg-gray-300' : ''}" title={entry.label}>
                                    {@html entry.svg}
                                </button>
                            {:else}
                                <button on:click={(ev) => { handleAction(entry.action, ev); }} class="block {isConfigActive(editor, entry) ? 'bg-gray-300' : ''}">
                                    {entry.label}
                                </button>
                            {/if}
                        </li>
                    {/each}
                </ul>
            {/if}
        {/if}
    </div>
</div>
