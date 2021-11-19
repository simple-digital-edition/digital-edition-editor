import { Extension } from '@tiptap/core'
import { TextSelection } from 'prosemirror-state';

export interface ExtendNodeSelectionOptions {
}

declare module '@tiptap/core' {
    interface Commands<ReturnType> {
        'extend-node-selection': {
            /**
             * Extend the selection to the full node
             */
            extendNodeSelection: () => ReturnType,
        }
    }
}

export const ExtendNodeSelection = Extension.create<ExtendNodeSelectionOptions>({
    name: 'extend-node-selection',

    addCommands() {
        return {
            extendNodeSelection: () => ({ tr, state }) => {
                const range = tr.selection.$from.blockRange(tr.selection.$to);
                tr.setSelection(new TextSelection(state.doc.resolve(range.start), state.doc.resolve(range.end)));
                return true;
            },
        }
    },
});
