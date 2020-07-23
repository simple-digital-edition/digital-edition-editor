<template>
    <div class="text-editor flex vertical">
        <nav class="shrink">
            <ul role="menubar">
                <li role="presentation">
                    <a role="menuitem" @click="save">
                        <svg viewBox="0 0 24 24" class="icon small">
                            <path d="M15,9H5V5H15M12,19A3,3 0 0,1 9,16A3,3 0 0,1 12,13A3,3 0 0,1 15,16A3,3 0 0,1 12,19M17,3H5C3.89,3 3,3.9 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V7L17,3Z" />
                        </svg>
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

import { EditorState } from "@codemirror/next/state";
import { EditorView, keymap } from "@codemirror/next/view";
import { defaultKeymap } from "@codemirror/next/commands";

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

    private loadEditor(): void {
        if (!this.editorView && this.$refs.editorElement) {
            const startState = EditorState.create({
                doc: "",
                extensions: [keymap(defaultKeymap)]
            });

            this.editorView = new EditorView({
                state: startState,
                parent: this.$refs.editorElement as Element,
            });
        }
        if (this.editorView && this.text) {
            const loadState = EditorState.create({
                doc: this.text,
                extensions: [keymap(defaultKeymap)]
            });
            this.editorView.setState(loadState);
        }
    }
}
</script>
