import { Node, mergeAttributes } from '@tiptap/core';

interface TextNodeConfig {
    name: string;
    group?: string;
    content?: string;
    attributes?: {[x:string]: TextNodeChoiceAttributeConfig};
}

interface TextNodeChoiceAttributeConfig {
    type: 'choice';
    default: string;
    values: string[];
}

export function createConfigurableNode(config: TextNodeConfig) {
    return Node.create({
        name: config.name,
        group: config.group || 'block',
        content: config.content || 'inline*',

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
            return ['div', mergeAttributes(HTMLAttributes, {'data-type': config.name}), 0]
        },

        parseHTML() {
            return [
                {
                    tag: 'div',
                    getAttrs: node => (node as HTMLElement).getAttribute('data-type') === config.name && null,
                }
            ]
        }
    });
}
