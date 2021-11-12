import { Extension } from '@tiptap/core';

export const UpdateAttribute = Extension.create({
    name: 'UpdateAttribute',

    addCommands() {
        return {
            updateAttribute: (name: string, attr: string, value: string | Event) => {
                return ({ commands }) => {
                    if ((value as Event).target) {
                        const target = (value as Event).target as HTMLElement;
                        if (target.tagName.toLowerCase() === 'input') {
                            value = (target as HTMLInputElement).value;
                        } else {
                            return false;
                        }
                    }
                    if (this.editor.schema.marks[name]) {
                        return commands.extendMarkRange(name) && commands.updateAttributes(name, { [attr]: value });
                    } else {
                        return commands.updateAttributes(name, { [attr]: value });
                    }
                }
            }
        }
    }
})
