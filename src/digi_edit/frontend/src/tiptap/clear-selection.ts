import { Extension } from '@tiptap/core'
import { TextSelection } from 'prosemirror-state';

export interface ClearSelectionOptions {
}

declare module '@tiptap/core' {
    interface Commands<ReturnType> {
        'clear-selection': {
            /**
             * Clear the selection to the start
             */
            clearSelection: () => ReturnType,
        }
    }
}

export const ClearSelection = Extension.create<ClearSelectionOptions>({
    name: 'clear-selection',

    addCommands() {
        return {
            clearSelection: () => ({ tr, state, dispatch }) => {
                const range = tr.selection.$from.blockRange(tr.selection.$to);
                tr.setSelection(new TextSelection(state.doc.resolve(range.start), state.doc.resolve(range.start)));
                return dispatch(tr);
            },
        }
    },
});
