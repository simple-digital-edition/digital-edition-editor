import { Extension, getNodeType, isNodeActive } from '@tiptap/core'
import type { NodeType } from 'prosemirror-model';

export interface ToggleWrapNodeOptions {
}

declare module '@tiptap/core' {
    interface Commands<ReturnType> {
        'toggle-wrap-node': {
            /**
             * Toggle wrapping a node, if necessary transforming internal nodes
             */
             toggleWrapNode: (name: NodeType | string, wrappedName?: NodeType | string, unwrappedName?: NodeType | string) => ReturnType,
        }
    }
}

export const ToggleWrapNode = Extension.create<ToggleWrapNodeOptions>({
    name: 'toggle-wrap-node',

    addCommands() {
        return {
            toggleWrapNode: (name, wrappedName, unwrappedName) => ({ tr, editor, state, dispatch }) => {
                const nodeType = getNodeType(name, editor.schema);
                const wrappedType = getNodeType(wrappedName, editor.schema);
                const unwrappedType = getNodeType(unwrappedName, editor.schema);
                const isActive = isNodeActive(state, nodeType);
                const range = tr.selection.$from.blockRange(tr.selection.$to);
                const slice = state.doc.slice(range.start, range.end);
                const content = [];

                slice.content.forEach((node) => {
                    if (isActive && unwrappedType) {
                        content.push(unwrappedType.create({}, node.content));
                    } else if (!isActive && wrappedType) {
                        content.push(wrappedType.create({}, node.content));
                    } else {
                        content.push(node);
                    }
                });
                if (isActive) {
                    tr = tr.replaceWith(range.start - 1, range.end, content);
                } else {
                    tr = tr.replaceWith(range.start, range.end, nodeType.create({}, content));
                }
                return dispatch(tr);
            },
        }
    },
});
