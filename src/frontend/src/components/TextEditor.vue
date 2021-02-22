<template>
    <div class="text-editor flex vertical">
        <nav class="shrink">
            <ul role="menubar">
                <li role="presentation">
                    <a role="menuitem" @click="save">
                        Save
                    </a>
                </li>
            </ul>
        </nav>
        <div ref="editorElement"></div>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

import { EditorState } from "@codemirror/state";
import { EditorView, keymap } from "@codemirror/view";
import { history, historyKeymap } from '@codemirror/history';
import { defaultKeymap } from '@codemirror/commands';

@Component
export default class FileEditor extends Vue {
    @Prop() text!: string;
    public editorView = null as null | EditorView;

    public mounted(): void {
        this.loadEditor();
    }

    public save(ev: Event): void {
        ev.preventDefault();
        if (this.editorView) {
            this.$emit('save', this.editorView.state.doc.toString());
        }
    }

    private extensions() {
        return [
            history(),
            keymap.of([
                ...defaultKeymap,
                ...historyKeymap,
            ]),
        ];
    }

    private loadEditor(): void {
        if (!this.editorView && this.$refs.editorElement) {
            const startState = EditorState.create({
                doc: "",
                extensions: this.extensions(),
            });

            this.editorView = new EditorView({
                state: startState,
                parent: this.$refs.editorElement as Element,
            });
        }
        if (this.editorView && this.text) {
            const loadState = EditorState.create({
                doc: this.text,
                extensions: this.extensions(),
            });
            this.editorView.setState(loadState);
        }
    }
}
</script>
