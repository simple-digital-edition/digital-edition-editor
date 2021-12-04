export interface XMLElement {
    tag: string;
    children: XMLElement[];
    text: string | null;
    attributes: {[x:string]: string};
}

export class TEISerialiser {
    private sections;
    private elements;
    private attributes;

    constructor(config) {
        this.sections = config.sections;
        this.elements = Object.fromEntries(config.elements.map((element) => {
            return [element.name, {
                serialise: element.serialise,
                attributes: element.attrs,
            }];
        }));
        this.attributes = Object.fromEntries(config.attributes.map((attribute) => {
            return [attribute.name, {
                serialise: attribute.serialise,
            }];
        }));
    }

    serialise(doc) {
        const tree = this.buildBaseElement('tei:TEI[@xmlns:tei="http://www.tei-c.org/ns/1.0"]')
        for (let section of this.sections) {
            if (section.type === 'text' && section.serialise && doc[section.name]) {
                const [root, leaf] = this.buildElement(section.serialise.element);
                this.serialiseNestedDocs(leaf, this.textDoc2tree(leaf, doc[section.name]._main), doc[section.name]);

                this.mergeTree(tree, root);
            } else if (section.type === 'metadata' && doc[section.name]) {
                this.mergeTree(tree, doc[section.name]);
            }
        }
        const lines = [
            '<?xml version="1.0" encoding="UTF-8"?>',
        ];
        this.serialiseTree(tree, lines);
        return lines.join('\n');
    }

    private serialiseNestedDocs(leaf, nestedIds, sections) {
        const processedIds = [];
        const tmpRoot = {
            tag: '',
            children: [],
            text: '',
            attributes: {},
        }
        while (nestedIds.length > 0) {
            const nestedId = nestedIds.pop();
            if (processedIds.indexOf(nestedId) < 0) {
                Object.entries(sections).forEach(([key, section]) => {
                    if (key !== '_main') {
                        if (section[nestedId]) {
                            const nestedDoc = section[nestedId];
                            nestedDoc.doc.type = nestedDoc.type;
                            nestedDoc.doc.attrs = {xmlid: nestedId};
                            nestedIds = nestedIds.concat(this.textDoc2tree(tmpRoot, nestedDoc.doc));
                        }
                    }
                });
                processedIds.push(nestedId);
            }
        }
        tmpRoot.children.sort((a, b) => {
            if (a.attributes['xml:id'].indexOf('-') >= 0 && b.attributes['xml:id'].indexOf('-')) {
                const [aKey, aValue] = a.attributes['xml:id'].split('-');
                const [bKey, bValue] = b.attributes['xml:id'].split('-');
                if (aKey == bKey) {
                    return Number.parseInt(aValue) - Number.parseInt(bValue);
                } else if (aKey > bKey) {
                    return 1;
                } else if (aKey < bKey) {
                    return -1;
                } else {
                    return 0;
                }
            } else {
                if (a.attributes['xml:id'] > b.attributes['xml:id']) {
                    return 1;
                } else if (a.attributes['xml:id'] < b.attributes['xml:id']) {
                    return -1;
                } else {
                    return 0;
                }
            }
        });
        tmpRoot.children.forEach((child) => {
            leaf.children.push(child);
        });
    }

    private buildBaseElement(path: string): XMLElement {
        let tag = path;
        if (tag.indexOf('[') >= 0) {
            tag = tag.substring(0, tag.indexOf('['));
        }
        const element = {
            tag: tag,
            children: [],
            text: null,
            attributes: {},
        };
        if (path.indexOf('[') >= 0) {
            for (let expression of path.split('[')) {
                for (let constraint of expression.split(' and ')) {
                    if (constraint.startsWith('@')) {
                        if (constraint.endsWith(']')) {
                            constraint = constraint.substring(1, constraint.length - 1);
                        }
                        let [name, value] = constraint.split('=');
                        value = value.replace(/"/g, '');
                        element.attributes[name.trim()] = value.trim();
                    }
                }
            }
        }
        return element;
    }

    private buildElement(path: string): [XMLElement, XMLElement] {
        const parts = path.split('/');
        const root = this.buildBaseElement(parts[0]);
        let leaf = root;
        for (let idx = 1; idx < parts.length; idx++) {
            leaf.children.push(this.buildBaseElement(parts[idx]));
            leaf = leaf.children[0];
        }
        return [root, leaf];
    }

    private buildAttributes(nodeOrMark, schema): {[x: string]: string} {
        const attributes = {};
        if (schema.attributes && nodeOrMark.attrs) {
            for (let name of schema.attributes) {
                const attributeSchema = this.attributes[name];
                if (attributeSchema && attributeSchema.serialise) {
                    const serialise = attributeSchema.serialise;
                    if (serialise.attribute && serialise.values) {
                        if (serialise.values[nodeOrMark.attrs[name]]) {
                            attributes[serialise.attribute] = serialise.values[nodeOrMark.attrs[name]];
                        }
                    } else if (serialise.attribute && serialise.value) {
                        if (serialise.value === 'value()') {
                            if (nodeOrMark.attrs[name]) {
                                attributes[serialise.attribute] = nodeOrMark.attrs[name];
                            }
                        } else if (nodeOrMark.attrs[name]) {
                            attributes[serialise.attribute] = serialise.value.replace(/\{value\(\)\}/g, nodeOrMark.attrs[name]);
                        } else {
                            attributes[serialise.attribute] = serialise.value;
                        }
                    }
                }
            }
        }
        return attributes;
    }

    private buildNodeElement(node, schema): XMLElement {
        const element = this.buildBaseElement(schema.serialise.element);
        if (schema.serialise.text) {
            if (schema.serialise.text === 'text()' && node.text) {
                element.text = node.text;
            }
        }
        element.attributes = { ...element.attributes, ...this.buildAttributes(node, schema)};
        return element;
    }

    private buildMarkElement(mark, schema): XMLElement {
        const element = this.buildBaseElement(schema.serialise.element);
        element.attributes = { ...element.attributes, ...this.buildAttributes(mark, schema)};
        return element;
    }

    private textDoc2tree(leaf: XMLElement, node) {
        let nestedIds = [];
        const elementSchema = this.elements[node.type];
        if (elementSchema && elementSchema.serialise) {
            if (node.marks && node.marks.length > 0) {
                const markElements = node.marks.map((mark) => {
                    const markSchema = this.elements[mark.type];
                    if (markSchema && markSchema.serialise) {
                        if (markSchema.attributes && markSchema.attributes.indexOf('nestedTarget') >= 0) {
                            nestedIds.push(mark.attrs.nestedTarget);
                        }
                        return [this.buildMarkElement(mark, markSchema), markSchema];
                    }
                }).filter((mark) => { return mark; });
                if (markElements.length > 0) {
                    markElements.sort(([elementA, schemaA], [elementB, schemaB]) => {
                        if (schemaA.serialise.weight && schemaB.serialise.weight) {
                            if (schemaA.serialise.weight > schemaB.serialise.weight) {
                                return 1;
                            } else if (schemaA.serialise.weight < schemaB.serialise.weight) {
                                return -1;
                            }
                        } else if (schemaA.serialise.weight) {
                            return -1;
                        } else if (schemaB.serialise.weight) {
                            return 1;
                        }
                        if (elementA.tag > elementB.tag) {
                            return 1;
                        } else if (elementA.tag < elementB.tag) {
                            return -1;
                        } else {
                            return 0;
                        }
                    });
                    let parent = leaf;
                    markElements.forEach(([element, schema], idx) => {
                        if (idx === markElements.length - 1) {
                            if (schema.serialise.text && schema.serialise.text === 'text()' && node.text) {
                                element.text = node.text;
                            }
                            Object.keys(element.attributes).forEach((key) => {
                                if (element.attributes[key]) {
                                    element.attributes[key] = element.attributes[key].replace(/\{text\(\)\}/g, node.text);
                                }
                            });
                        }
                        parent.children.push(element);
                        parent = element;
                    });
                }
            } else {
                const element = this.buildNodeElement(node, elementSchema);
                leaf.children.push(element);
                if (node.content) {
                    for (let child of node.content) {
                        nestedIds = nestedIds.concat(this.textDoc2tree(element, child));
                    }
                }
            }
        } else {
            for (let child of node.content) {
                nestedIds = nestedIds.concat(this.textDoc2tree(leaf, child));
            }
        }
        return nestedIds;
    }

    private mergeTree(base: XMLElement, merge: XMLElement) {
        if (base.tag === merge.tag) {
            base.attributes = { ...base.attributes, ...merge.attributes };
            for (let mergeChild of merge.children) {
                const found = base.children.filter((child) => { return child.tag === mergeChild.tag; });
                if (found.length > 0) {
                    this.mergeTree(found[0], mergeChild);
                } else {
                    base.children.push(mergeChild);
                }
            }
        } else {
            const found = base.children.filter((child) => { return child.tag === merge.tag; });
            if (found.length > 0) {
                this.mergeTree(found[0], merge);
            } else {
                base.children.push(merge);
            }
        }
    }

    private serialiseTree(element: XMLElement, lines: string[], indent?: string | undefined) {
        if (indent === undefined) {
            indent = '';
        }
        const opening = [indent, '<', element.tag];
        const attributes = Object.entries(element.attributes);
        if (attributes.length > 0) {
            attributes.sort(([keyA, valueA], [keyB, valueB]) => {
                if (keyA > keyB) {
                    return 1;
                } else if (keyA < keyB) {
                    return -1;
                } else {
                    return 0;
                }
            });
            for (let [name, value] of attributes) {
                opening.push(' ');
                opening.push(name);
                opening.push('="');
                opening.push(this.xmlEscape(value));
                opening.push('"');
            }
        }
        opening.push('>');
        if (element.text !== null) {
            if (element.text !== '') {
                opening.push(this.xmlEscape(element.text));
                opening.push('</' + element.tag + '>');
            } else {
                opening.pop();
                opening.push('/>');
            }
            lines.push(opening.join(''));
        } else {
            if (element.children.length > 0) {
                lines.push(opening.join(''));
                for (let child of element.children) {
                    this.serialiseTree(child, lines, indent + '  ');
                }
                lines.push(indent + '</' + element.tag + '>');
            } else {
                opening.pop();
                opening.push('/>');
                lines.push(opening.join(''));
            }
        }
    }

    private xmlEscape(str: string): string {
        return str.replace(/["'<>&]/g, (value) => {
            if (value === '&') {
                return '&amp;';
            } else if (value === '<') {
                return '&lt;';
            } else if (value === '>') {
                return '&gt;';
            } else if (value === '"') {
                return '&quot;';
            } else if (value === "'") {
                return '&apos;';
            } else {
                return value;
            }
        });
    }
}
