(function() {
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

    // Serializer for the metadata block
    var metadataSerializer = {
        node: 'tei:teiHeader',
        type: 'container',
        children: [
            {
                node: 'tei:fileDesc',
                children: [
                    {
                        node: 'tei:titleStmt',
                        children: [
                            {
                                node: 'tei:title',
                                text: 'fileDesc.titleStmt.title._text'
                            },
                            {
                                node: 'tei:author',
                                text: 'fileDesc.titleStmt.author._text'
                            },
                            {
                                node: 'tei:respStmt',
                                multiple: 'fileDesc.titleStmt.respStmt',
                                attrs: {
                                    'xml:id': '_attrs.xml:id'
                                },
                                children: [
                                    {
                                        node: 'tei:resp',
                                        text: 'resp._text'
                                    },
                                    {
                                        node: 'tei:name',
                                        text: 'name._text'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        node: 'tei:publicationStmt',
                        children: [
                            {
                                node: 'tei:distributor',
                                text: 'fileDesc.publicationStmt.distributor._text'
                            }
                        ]
                    }
                ]
            },
            {
                node: 'tei:encodingDesc',
                children: [
                    {
                        node: 'tei:classDecl',
                        children: [
                            {
                                node: 'tei:taxonomy',
                                attrs: {
                                    'xml:id': 'encodingDesc.classDecl.taxonomy._attrs.xml:id'
                                },
                                children: [
                                    {
                                        node: 'tei:bibl',
                                        text: 'encodingDesc.classDecl.taxonomy.bibl._text'
                                    }
                                ]
                            }
                        ]
                    }
                ]
            },
            {
                node: 'tei:sourceDesc',
                children: [
                    {
                        node: 'tei:bibl',
                        text: 'sourceDesc.bibl._text'
                    }
                ]
            },
            {
                node: 'tei:profileDesc',
                children: [
                    {
                        node: 'tei:creation',
                        children: [
                            {
                                node: 'tei:date',
                                attrs: {
                                    when: 'profileDesc.creation.date._attrs.when'
                                },
                                text: 'profileDesc.creation.date._text'
                            }
                        ]
                    },
                    {
                        node: 'tei:textClass',
                        children: [
                            {
                                node: 'tei:catRef',
                                attrs: {
                                    target: 'profileDesc.textClass.catRef._attrs.target'
                                },
                            }
                        ]
                    }
                ]
            },
            {
                node: 'tei:revisionDesc',
                children: [
                    {
                        node: 'tei:change',
                        multiple: 'revisionDesc.change',
                        attrs: {
                            when: '_attrs.when',
                            who: '_attrs.who'
                        },
                        text: '_text'
                    }
                ]
            }
        ]
    }

    // Serialize for the main text block
    var fullTextSerializer = {
        doc: {
            node: 'tei:body'
        },
        heading: {
            node: 'tei:head',
            attrs: [
                {
                    name: 'type',
                    selector: 'level',
                    values: {
                        '1': 'level-1',
                        '2': 'level-2',
                        '3': 'level-3'
                    }
                },
                {
                    name: 'data-heading-id',
                    selector: 'heading_id',
                    value: '${value}'
                }
            ]
        },
        paragraph: {
            node: 'tei:p',
            attrs: [
                {
                    name: 'style',
                    selector: 'no_indent',
                    values: {
                        true: 'no-indent'
                    }
                },
                {
                    name: 'style',
                    selector: 'text_align',
                    values: {
                        left: 'text-left',
                        center: 'text-center',
                        right: 'text-right',
                        justify: 'text-justify'
                    }
                }
            ]
        },
        text: {
            node: 'tei:seg',
            inline: true,
            marks: {
                foreign: {
                    node: 'tei:foreign'
                },
                letter_sparse: {
                    node: 'tei:hi',
                    attrs: [
                        {
                            name: 'style',
                            value: 'letter-sparse'
                        }
                    ]
                },
                sup: {
                    node: 'tei:hi'
                },
                font_size: {
                    node: 'tei:hi',
                    attrs: [
                        {
                            name: 'style',
                            selector: 'size',
                            values: {
                                small: 'font-size-small',
                                medium: 'font-size-medium',
                                large: 'font-size-large'
                            }
                        }
                    ]
                },
                page_break: {
                    node: 'tei:pb',
                    attrs: [
                        {
                            name: 'n',
                            selector: 'text()'
                        }
                    ],
                    text: null
                },
                font_weight_bold: {
                    node: 'tei:hi',
                    attrs: [
                        {
                            name: 'style',
                            value: 'font-weight-bold'
                        }
                    ]
                },
                annotation: {
                    node: 'tei:ref',
                    attrs: [
                        {
                            name: 'target',
                            selector: 'target',
                            value: '${value}'
                        }
                    ]
                }
            }
        }
    }

    // Serialize for the main text block
    var individualAnnotationsSerializer = {
        '_collection': {
            node: 'tei:interpGrp',
            attrs: [
                {
                    name: 'type',
                    value: 'individual'
                }
            ]
        },
        doc: {
            node: 'tei:interp',
            attrs: [
                {
                    name: 'xml:id',
                    selector: 'id',
                    value: '${value}'
                }
            ]
        },
        heading: {
            node: 'tei:head',
            attrs: [
                {
                    name: 'type',
                    selector: 'level',
                    values: {
                        '1': 'level-1',
                        '2': 'level-2',
                        '3': 'level-3'
                    }
                },
                {
                    name: 'data-heading-id',
                    selector: 'heading_id',
                    value: '${value}'
                }
            ]
        },
        paragraph: {
            node: 'tei:p',
            attrs: [
                {
                    name: 'style',
                    selector: 'no_indent',
                    values: {
                        true: 'no-indent'
                    }
                },
                {
                    name: 'style',
                    selector: 'text_align',
                    values: {
                        left: 'text-left',
                        center: 'text-center',
                        right: 'text-right',
                        justify: 'text-justify'
                    }
                }
            ]
        },
        text: {
            node: 'tei:seg',
            inline: true,
            marks: {
                foreign: {
                    node: 'tei:foreign'
                },
                letter_sparse: {
                    node: 'tei:hi',
                    attrs: [
                        {
                            name: 'style',
                            value: 'letter-sparse'
                        }
                    ]
                },
                sup: {
                    node: 'tei:hi'
                },
                font_size: {
                    node: 'tei:hi',
                    attrs: [
                        {
                            name: 'style',
                            selector: 'size',
                            values: {
                                small: 'font-size-small',
                                medium: 'font-size-medium',
                                large: 'font-size-large'
                            }
                        }
                    ]
                },
                font_weight_bold: {
                    node: 'tei:hi',
                    attrs: [
                        {
                            name: 'style',
                            value: 'font-weight-bold'
                        }
                    ]
                },
                pageLineRef: {
                    node: 'tei:citedRange',
                    attrs: [
                        {
                            name: 'type',
                            value: 'page-line-ref'
                        }
                    ]
                },
                wordRange: {
                    node: 'tei:citedRange',
                    attrs: [
                        {
                            name: 'type',
                            value: 'word-range'
                        }
                    ]
                },
                quotation: {
                    node: 'tei:q'
                }
            }
        }
    };

    window.teiEditorConfig = window.teiEditorConfig || {};
    window.teiEditorConfig.serializer = {
        metadata: metadataSerializer,
        mainText: fullTextSerializer,
        globalAnnotations: recursive_clone(fullTextSerializer),
        individualAnnotations: individualAnnotationsSerializer
    };
    window.teiEditorConfig.serializer.globalAnnotations.doc.node = 'tei:interpGrp';
    window.teiEditorConfig.serializer.globalAnnotations.doc.attrs = [
        {
            name: 'type',
            value: 'global'
        }
    ];
})();
