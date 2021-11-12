import { Mark, mergeAttributes } from '@tiptap/core';

export interface MarkConfig {
    name: string;
}

export function createConfigurableMark(config: MarkConfig) {
    return Mark.create({
        name: config.name,

        addAttributes() {
            return {
                'blabla': {
                    default: 'bla',
                    renderHTML(attributes) {
                        return {'data-attr-blabla': attributes.blabla}
                    },
                    parseHTML(element) {
                        return {
                            blabla: element.getAttribute('data-attr-blabla'),
                        }
                    }
                }
            }
        },

        renderHTML({ HTMLAttributes }) {
            return ['span', mergeAttributes(HTMLAttributes, {'data-type': config.name}), 0]
        },

        parseHTML() {
            return [
                {
                    tag: 'span',
                    getAttrs: node => (node as HTMLElement).getAttribute('data-type') === config.name && null,
                }
            ]
        }
    });
}
