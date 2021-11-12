<script lang="ts">
    import { onMount, onDestroy } from 'svelte';
    import { Editor, isActive } from '@tiptap/core';
    import { Document } from '@tiptap/extension-document';
    import { Text } from '@tiptap/extension-text';
    import { History } from '@tiptap/extension-history';

    import { createConfigurableNode } from '../tiptap/configurable-node';
    import { UpdateAttribute } from '../tiptap/update-attribute';

    export let text;

    let editorElement = null as HTMLElement;
    let editor = null;
    let activeAttributes = {};

    function initEditor() {
        if (editor) {
            editor.destroy();
        }
        const extensions = [History, UpdateAttribute, createConfigurableNode({name: 'paragraph'}), Document, Text];
        editor = new Editor({
            element: editorElement,
            extensions: extensions,
            content: text,
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

    onMount(() => {
        initEditor();
    });

    $: {
        initEditor();
    }

    onDestroy(() => {
        if (editor) {
            editor.destroy();
        }
    });
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
        <div class="flex-none border-l border-solid border-gray-300">
            Options
        </div>
    </div>
</div>
