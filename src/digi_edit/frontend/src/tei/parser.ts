export default class XPathEvaluator {
    private dom: XMLDocument;

    constructor (dom: XMLDocument) {
        this.dom = dom;
    }

    nsResolver(prefix: string | null): string {
        if (prefix === 'tei') {
            return 'http://www.tei-c.org/ns/1.0';
        } else if (prefix === 'xml') {
            return 'http://www.w3.org/XML/1998/namespace';
        } else {
            return 'http://www.tei-c.org/ns/1.0';
        }
    }

    evaluate(node: Node, xpath: string, result_type: number) {
        return this.dom.evaluate(xpath, node, this.nsResolver, result_type, null);
    }

    matches(node: Node, xpath: string) {
        const result = this.evaluate(node, xpath, XPathResult.ANY_TYPE);
        if (result.resultType == XPathResult.NUMBER_TYPE && result.numberValue !== null) {
            return true;
        } else if (result.resultType == XPathResult.STRING_TYPE && result.stringValue !== null) {
            return true;
        } else if (result.resultType == XPathResult.BOOLEAN_TYPE && result.booleanValue) {
            return true;
        } else if (result.resultType == XPathResult.FIRST_ORDERED_NODE_TYPE && result.singleNodeValue !== null) {
            return true;
        } else if ((result.resultType == XPathResult.UNORDERED_NODE_ITERATOR_TYPE || result.resultType == XPathResult.ORDERED_NODE_ITERATOR_TYPE) && result.iterateNext()) {
            return true;
        }
        return false;
    }

    firstNode(node: Node, xpath: string) {
        return this.evaluate(node, xpath, XPathResult.FIRST_ORDERED_NODE_TYPE).singleNodeValue as Element;
    }

    nodeIterator(node: Node, xpath: string) {
        return this.evaluate(node, xpath, XPathResult.ORDERED_NODE_ITERATOR_TYPE);
    }

    stringValue(node: Node, xpath: string) {
        return this.evaluate(node, xpath, XPathResult.STRING_TYPE).stringValue;
    }

    booleanValue(node: Node, xpath: string) {
        return this.evaluate(node, xpath, XPathResult.BOOLEAN_TYPE).booleanValue;
    }

    numberValue(node: Node, xpath: string) {
        return this.evaluate(node, xpath, XPathResult.NUMBER_TYPE).numberValue;
    }
}

export class TEIParser {
    private nodeRules = [];
    private attrRules = [];
    private sections = [];

    constructor(config) {
        this.sections = config.sections;

        this.nodeRules = [];
        for (let element of config.elements) {
            if (element.parse) {
                if (Array.isArray(element.parse.rule)) {
                    for (let rule of element.parse.rule) {
                        this.nodeRules.push({
                            rule: rule,
                            name: element.name,
                            type: element.type || 'block',
                            attrs: element.attrs || [],
                            text: element.parse.text || null,
                        });
                    }
                } else {
                    this.nodeRules.push({
                        rule: element.parse.rule,
                        name: element.name,
                        type: element.type || 'block',
                        attrs: element.attrs || [],
                        text: element.parse.text || null,
                    });
                }
            }
        }

        this.attrRules = [];
        for (let attr of config.attributes) {
            if (attr.parse) {
                if (Array.isArray(attr.parse)) {
                    for (let parse of attr.parse) {
                        if (Array.isArray(parse.rule)) {
                            for (let rule of parse.rule) {
                                this.attrRules.push({
                                    rule: rule,
                                    name: attr.name,
                                    value: parse.value,
                                });
                            }
                        } else {
                            this.attrRules.push({
                                rule: parse.rule,
                                name: attr.name,
                                value: parse.value,
                            });
                        }
                    }
                } else {
                    if (Array.isArray(attr.parse.rule)) {
                        for (let rule of attr.parse.rule) {
                            this.attrRules.push({
                                rule: rule,
                                name: attr.name,
                                value: attr.parse.value,
                            });
                        }
                    } else {
                        this.attrRules.push({
                            rule: attr.parse.rule,
                            name: attr.name,
                            value: attr.parse.value,
                        });
                    }
                }
            }
        }
    }

    parse(text: string) {
        const parser = new DOMParser();
        const doc = parser.parseFromString(text, 'application/xml');
        const xpath = new XPathEvaluator(doc);
        const root = doc.documentElement;
        const result = {};
        for (let section of this.sections) {
            if (section.type === 'text') {
                const docRoot = xpath.firstNode(root, section.parse.rule);
                if (docRoot) {
                    result[section.name] = this.parseTextDocument(docRoot, xpath);
                } else {
                    result[section.name] = {
                        _main: {
                            type: 'doc',
                            content: [],
                        }
                    }
                }
            } else if (section.type === 'metadata') {
                result[section.name] = this.parseMetadata(root, xpath);
            }
            result[section.name]._type = section.type;
        }
        return result;
    }

    parseTextDocument(root: Element, xpath: XPathEvaluator) {
        const doc = {
            _main: {
                content: [],
            },
        };
        this.walkTextDocument(root, doc, doc._main, (node: Element) => {
            let markObj = null;
            for (let rule of this.nodeRules) {
                if (xpath.firstNode(node, 'self::' + rule.rule)) {
                    if (rule.type === 'mark') {
                        if (markObj === null) {
                            markObj = {
                                type: 'text',
                                content: [],
                                marks: [
                                    {
                                        type: rule.name,
                                        attrs: {},
                                    }
                                ],
                                attrs: {},
                                text: null,
                            }
                        } else {
                            markObj.marks.push({
                                type: rule.name,
                                attrs: {},
                            });
                        }
                        if (rule.text && node.children.length === 0) {
                            markObj.text = xpath.stringValue(node, rule.text)
                        }
                        for (let attrRule of this.attrRules) {
                            if (rule.attrs && rule.attrs.indexOf(attrRule.name) >= 0 && xpath.booleanValue(node, attrRule.rule)) {
                                markObj.marks[markObj.marks.length - 1].attrs[attrRule.name] = xpath.stringValue(node, attrRule.value);
                            }
                        }
                    } else if (markObj === null) {
                        const obj = {
                            type: rule.name,
                            content: [],
                            marks: [],
                            attrs: {},
                            text: null,
                            nested: rule.type === 'nested',
                        }
                        if (rule.text) {
                            if (rule.type === 'inline') {
                                obj.content.push({
                                    type: 'text',
                                    content: [],
                                    marks: [],
                                    attrs: {},
                                    text: xpath.stringValue(node, rule.text),
                                })
                            } else {
                                obj.text = xpath.stringValue(node, rule.text)
                            }
                        }
                        for (let attrRule of this.attrRules) {
                            if (rule.attrs && rule.attrs.indexOf(attrRule.name) >= 0 && xpath.matches(node, attrRule.rule)) {
                                obj.attrs[attrRule.name] = xpath.stringValue(node, attrRule.value);
                            }
                        }
                        return obj;
                    }
                }
            }
            return markObj;
        });
        for (let key of Object.keys(doc)) {
            if (key === '_main') {
                doc[key] = this.cleanEmptyTextNodes(doc[key].content[0]);
            } else {
                for (let nestedDoc of Object.values(doc[key])) {
                    nestedDoc.doc = this.cleanEmptyTextNodes(nestedDoc.doc);
                }
            }
        }
        return doc;
    }

    walkTextDocument(node: Element, container, parent, callback) {
        const obj = callback(node);
        if (obj) {
            if (obj.nested) {
                if (!container[obj.type]) {
                    container[obj.type] = {};
                }
                container[obj.type][obj.attrs.xmlid] = {
                    id: obj.attrs.xmlid,
                    type: obj.type,
                    doc: {
                        type: 'doc',
                        content: obj.content,
                    }
                };
                for (let child of node.children) {
                    this.walkTextDocument(child, container, obj, callback);
                }
            } else {
                delete obj['nested'];
                if (parent.type === 'text') {
                    if (obj.text) {
                        parent.text = obj.text;
                    }
                    if (obj.marks) {
                        for (let mark of obj.marks) {
                            parent.marks.push(mark);
                        }
                    }
                    for (let child of node.children) {
                        this.walkTextDocument(child, container, parent, callback);
                    }
                } else {
                    parent.content.push(obj);
                    for (let child of node.children) {
                        this.walkTextDocument(child, container, obj, callback);
                    }
                }
            }
        } else {
            console.error('Unknown TEI element ' + node.tagName, Array.from(node.attributes));
        }
    }

    private cleanEmptyTextNodes(node) {
        if (node) {
            return {
                type: node.type,
                content: node.content.map((child) => {
                    if (child.type !== 'text' || child.text) {
                        return this.cleanEmptyTextNodes(child);
                    } else {
                        return false;
                    }
                }).filter((child) => {
                    return child;
                }),
                marks: node.marks,
                attrs: node.attrs,
                text: node.text
            };
        } else {
            return null;
        }
    }

    private parseMetadata(root, xpath: XPathEvaluator) {
        return this.walkMetadata(xpath.firstNode(root, 'tei:teiHeader'), xpath);
    }

    private walkMetadata(node, xpath: XPathEvaluator) {
        const text = xpath.stringValue(node, 'text()').trim();
        const entry = {
            tag: 'tei:' + node.localName,
            children: Array.from(node.children).map((child) => { return this.walkMetadata(child, xpath); }),
            text: text ? text : null,
            attributes: Object.fromEntries(Array.from(node.attributes).map((attr) => {
                return [attr.name, attr.value];
            })),
        }
        return entry;
    }
}
