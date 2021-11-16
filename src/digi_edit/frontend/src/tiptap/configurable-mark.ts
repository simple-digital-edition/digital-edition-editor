import { Mark, mergeAttributes } from '@tiptap/core';

export interface MarkConfig {
    name: string;
    attributes?: {[x: string]: MarkAttributeConfig};
}

interface MarkAttributeConfig {
    default: string;
}

export function createConfigurableMark(config: MarkConfig) {
    return Mark.create({
        name: config.name,

        addAttributes() {
            if (config.attributes) {
                return Object.fromEntries(Object.entries(config.attributes).map(([key, value]) => {
                    return [key, {
                        default: value.default,
                        renderHTML(attributes) {
                            return {['data-attr-' + key]: attributes[key]}
                        },
                        parseHTML(element) {
                            return {[key]: element.getAttribute('data-attr-' + key)}
                        }
                    }];
                }));
            } else {
                return {}
            }
        },

        renderHTML({ HTMLAttributes }) {
            return ['span', mergeAttributes(HTMLAttributes, {'data-type': 'mark-' + config.name}), 0]
        },

        parseHTML() {
            return [
                {
                    tag: 'span',
                    getAttrs: node => (node as HTMLElement).getAttribute('data-type') === 'mark-' + config.name && null,
                }
            ]
        }
    });
}
