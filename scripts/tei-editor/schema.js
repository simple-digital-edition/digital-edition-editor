(function() {
    function paragraph_attrs_to_class(node) {
        let classes = [];
        if(node.attrs.no_indent) {
            classes.push('no-indent')
        }
        if(node.attrs.text_align === 'center') {
            classes.push('text-center')
        } else if(node.attrs.text_align === 'right') {
            classes.push('text-right')
        } else if(node.attrs.text_align === 'justify') {
            classes.push('text-justify')
        }
        if(classes.length > 0) {
            return classes.join(' ')
        } else {
            return null
        }
    }

    function paragraph_class_to_attrs(dom) {
        let attrs = {
            no_indent: false,
            text_align: 'left'
        }
        if(dom.class) {
            if(dom.class.indexOf('no-indent') >= 0) {
                attrs.no_indent = true
            }
            if(dom.class.indexOf('text-center') >= 0) {
                attrs.text_align = 'center'
            } else if(dom.class.indexOf('text-right') >= 0) {
                attrs.text_align = 'right'
            } else if(dom.class.indexOf('text-justify') >= 0) {
                attrs.text_align = 'justify'
            }
        }
        return attrs
    }

    function mark_font_size_attr(dom) {
        let attrs = {
            size: ''
        }
        return attrs
    }

    /**
     * Recursively clone the object.
     */
    function recursive_clone(obj) {
        if (obj === undefined) {
            return undefined;
        } else if (obj === null) {
            return null;
        } else if (Array.isArray(obj)) {
            return obj.slice();
        } else if (typeof(obj) === 'object') {
            let clone = {};
            Object.keys(obj).forEach(function(key) {
                clone[key] = recursive_clone(obj[key]);
            });
            return clone;
        } else {
            return obj;
        }
    }


    // Schema for the full text
    var fullTextSchema = {
        nodes: {
            doc: {
                content: 'block+'
            },
            paragraph: {
                group: 'block',
                content: 'inline*',
                attrs: {
                    no_indent: {
                        default: false
                    },
                    text_align: {
                        default: 'left'
                    }
                },
                toDOM(node) {return ['p', {class: paragraph_attrs_to_class(node)}, 0]},
                parseDOM: [{tag: 'p', paragraph_class_to_attrs}]
            },
            heading: {
                group: 'block',
                content: 'inline*',
                attrs: {
                    heading_id: {
                        default: null
                    },
                    level: {
                        default: 1
                    }
                },
                defining: true,
                toDOM(node) {return ['h' + node.attrs.level, 0]},
                parseDOM: [
                    {tag: 'h1', attrs: {level: '1'}},
                    {tag: 'h2', attrs: {level: '2'}}
                ]
            },
            text: {
                group: 'inline',
                inline: true
            }
        },
        marks: {
            foreign: {
                toDOM() {return ['span', {class: 'foreign-language'}, 0]},
                parseDOM: [{tag: 'span.foreign-language'}]
            },
            letter_sparse: {
                toDOM() {return ['span', {class: 'letter-sparse'}, 0]},
                parseDOM: [{tag: 'span.letter-sparse'}]
            },
            sup: {
                toDOM() {return ['sup', 0]},
                parseDOM: [{tag: 'sup'}]
            },
            font_size: {
                attrs: {
                    size: {
                        default: ''
                    }
                },
                toDOM(mark) {return ['span', {class: 'font-size-' + mark.attrs.size}]},
                parseDOM: [{tag: 'span.font-size', mark_font_size_attr}]
            },
            page_break: {
                toDOM() {return ['span', {class: 'page-break'}, 0]},
                parseDOM: [{tag: 'span.page-break'}]
            },
            font_weight_bold: {
                toDOM() {return ['span', {class: 'font-weight-bold'}, 0]},
                parseDOM: [{tag: 'span.font-weight-bold'}]
            },
            annotation: {
                attrs: {
                    target: {
                        default: ''
                    }
                },
                toDOM() {return ['span', {class: 'annotation'}, 0]},
                parseDOM: [{tag: 'span.annotation'}]
            }
        }
    };

    // Schema for the individual annotations
    var individualAnnotationSchema = {
        nodes: {
            doc: {
                content: 'block+',
                attrs: {
                    id: {
                        default: ''
                    }
                }
            },
            paragraph: {
                group: 'block',
                content: 'inline*',
                attrs: {
                    no_indent: {
                        default: false
                    },
                    text_align: {
                        default: 'left'
                    }
                },
                toDOM(node) {return ['p', {class: paragraph_attrs_to_class(node)}, 0]},
                parseDOM: [{tag: 'p', paragraph_class_to_attrs}]
            },
            text: {
                group: 'inline',
                inline: true
            }
        },
        marks: {
            foreign: {
                toDOM() {return ['span', {class: 'foreign-language'}, 0]},
                parseDOM: [{tag: 'span.foreign-language'}]
            },
            letter_sparse: {
                toDOM() {return ['span', {class: 'letter-sparse'}, 0]},
                parseDOM: [{tag: 'span.letter-sparse'}]
            },
            sup: {
                toDOM() {return ['sup', 0]},
                parseDOM: [{tag: 'sup'}]
            },
            font_size: {
                attrs: {
                    size: {
                        default: ''
                    }
                },
                toDOM(mark) {return ['span', {class: 'font-size-' + mark.attrs.size}]},
                parseDOM: [{tag: 'span.font-size', mark_font_size_attr}]
            },
            page_break: {
                toDOM() {return ['span', {class: 'page-break'}, 0]},
                parseDOM: [{tag: 'span.page-break'}]
            },
            font_weight_bold: {
                toDOM() {return ['span', {class: 'font-weight-bold'}, 0]},
                parseDOM: [{tag: 'span.font-weight-bold'}]
            },
            pageLineRef: {
                toDOM() {return ['span', {class: 'page-line-range'}, 0]},
                parseDOM: [{tag: 'span.page-line-range'}]
            },
            wordRange: {
                toDOM() {return ['span', {class: 'word-range'}, 0]},
                parseDOM: [{tag: 'span.word-range'}]
            },
            quotation: {
                toDOM() {return ['span', {class: 'quotation'}, 0]},
                parseDOM: [{tag: 'span.quotation'}]
            }
        }
    };

    window.teiEditorConfig = window.teiEditorConfig || {};
    window.teiEditorConfig.schema = {
        mainText: fullTextSchema,
        globalAnnotations: recursive_clone(fullTextSchema),
        individualAnnotations: individualAnnotationSchema
    };
})();
