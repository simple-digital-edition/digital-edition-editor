<script lang="ts">
    import { onMount, onDestroy, createEventDispatcher } from 'svelte';
    import { EditorState, Transaction } from '@codemirror/state';
    import { EditorView, keymap } from '@codemirror/view';
    import { defaultKeymap } from '@codemirror/commands';
    import { history, historyKeymap } from '@codemirror/history';

    export let text: string;
    export let dirty = false;
    export let triggerSave = false;

    const dispatch = createEventDispatcher();
    let editorElement: HTMLElement;
    let editor: EditorView;

    function saveDocument(trigger: boolean) {
        if (editor) {
            dispatch('save', editor.state.doc.toString());
        }
    }

    onMount(() => {
        const state = EditorState.create({
            doc: text,
            extensions: [
                history(),
                keymap.of(defaultKeymap),
                keymap.of(historyKeymap),
                keymap.of([
                    {
                        key: 'Ctrl-s',
                        run() {
                            saveDocument(true);
                            return true;
                        }
                    }
                ]),
            ],
        });

        editor = new EditorView({
            state: state,
            parent: editorElement,
            dispatch(tr: Transaction) {
                if (tr.docChanged) {
                    dirty = true;
                }
                editor.update([tr]);
            },
        });
    });

    $: {
        saveDocument(triggerSave);
    }

    onDestroy(() => {
        editor.destroy();
    });
</script>

<div class="flex flex-row w-full h-full overflow-hidden codemirror-editor">
    <div bind:this={editorElement} class="flex-auto h-full px-2 py-1 overflow-auto"></div>
</div>
