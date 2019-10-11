(function() {
    window.teiEditorConfig = Object.assign(window.teiEditorConfig || {}, {
        // Configure editor tabs
        sections: {

            // ================
            // Metadaten Header
            // ================
            header: {
                title: 'Metadaten',
                type: 'header',
                tag: 'tei:teiHeader',
                schema: [
                    {
                        tag: 'tei:fileDesc',
                        children: [
                            {
                                tag: 'tei:titleStmt',
                                children: [
                                    {
                                        tag: 'tei:title',
                                        text: 'fileDesc.titleStmt.title._text'
                                    },
                                    {
                                        tag: 'tei:author',
                                        text: 'fileDesc.titleStmt.author._text'
                                    },
                                    {
                                        tag: 'tei:respStmt',
                                        multiple: true,
                                        attrs: {
                                            'xml:id': '_attrs.xml:id'
                                        },
                                        children: [
                                            {
                                                tag: 'tei:resp',
                                                text: 'resp._text'
                                            },
                                            {
                                                tag: 'tei:name',
                                                text: 'name._text'
                                            }
                                        ]
                                    }
                                ]
                            },
                            {
                                tag: 'tei:publicationStmt',
                                children: [
                                    {
                                        tag: 'tei:distributor',
                                        text: 'fileDesc.publicationStmt.distributor._text'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        tag: 'tei:encodingDesc',
                        children: [
                            {
                                tag: 'tei:classDecl',
                                children: [
                                    {
                                        tag: 'tei:taxonomy',
                                        attrs: {
                                            'xml:id': 'encodingDesc.classDecl.taxonomy._attrs.xml:id'
                                        },
                                        children: [
                                            {
                                                tag: 'tei:bibl',
                                                text: 'encodingDesc.classDecl.taxonomy.bibl._text'
                                            }
                                        ]
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        tag: 'tei:sourceDesc',
                        children: [
                            {
                                tag: 'tei:bibl',
                                text: 'sourceDesc.bibl._text'
                            }
                        ]
                    },
                    {
                        tag: 'tei:profileDesc',
                        children: [
                            {
                                tag: 'tei:creation',
                                children: [
                                    {
                                        tag: 'tei:date',
                                        attrs: {
                                            when: 'profileDesc.creation.date._attrs.when'
                                        },
                                        text: 'profileDesc.creation.date._text'
                                    }
                                ]
                            },
                            {
                                tag: 'tei:textClass',
                                children: [
                                    {
                                        tag: 'tei:catRef',
                                        attrs: {
                                            target: 'profileDesc.textClass.catRef._attrs.target'
                                        },
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        tag: 'tei:revisionDesc',
                        children: [
                            {
                                tag: 'tei:change',
                                multiple: true,
                                attrs: {
                                    when: '_attrs.when',
                                    who: '_attrs.who'
                                },
                                text: '_text'
                            }
                        ]
                    }
                ],
                ui: [
                    {
                        title: 'Bibliographie',
                        entries: [
                            {
                                type: 'single-text',
                                label: 'Titel',
                                path: 'fileDesc.titleStmt.title._text'
                            },
                            {
                                type: 'single-text',
                                label: 'Autor',
                                path: 'fileDesc.titleStmt.author._text'
                            },
                            {
                                type: 'single-text',
                                label: 'Quelle',
                                path: 'sourceDesc.bibl._text'
                            },
                            {
                                type: 'single-text',
                                label: 'Veröffentlichungsdatum (JJJJ-MM-TT)',
                                path: 'profileDesc.creation.date._attrs.when'
                            },
                            {
                                type: 'single-text',
                                label: 'Veröffentlichungsdatum (natürlichsprachlich)',
                                path: 'profileDesc.creation.date._text'
                            }
                        ]
                    },
                    {
                        title: 'Digitale Version',
                        entries: [
                            {
                                type: 'single-text',
                                label: 'Distributor',
                                path: 'fileDesc.publicationStmt.distributor._text'
                            },
                            {
                                type: 'single-text',
                                label: 'Taxonomie: Schlüssel',
                                path: 'encodingDesc.classDecl.taxonomy._attrs.xml:id'
                            },
                            {
                                type: 'single-text',
                                label: 'Taxonomie: Name',
                                path: 'encodingDesc.classDecl.taxonomy.bibl._text'
                            },
                            {
                                type: 'single-text',
                                label: 'Kategorie',
                                path: 'profileDesc.textClass.catRef._attrs.target'
                            }
                        ]
                    },
                    {
                        title: 'Verantwortliche',
                        entries: [
                            {
                                type: 'multi-field',
                                path: 'fileDesc.titleStmt.respStmt',
                                entries: [
                                    {
                                        type: 'single-text',
                                        label: 'Schlüssel',
                                        path: '_attrs.xml:id'
                                    },
                                    {
                                        type: 'single-text',
                                        label: 'Verantwortlich für',
                                        path: 'resp._text'
                                    },
                                    {
                                        type: 'single-text',
                                        label: 'Name',
                                        path: 'name._text'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        title: 'Änderungsgeschichte',
                        entries: [
                            {
                                type: 'multi-field',
                                path: 'revisionDesc.change',
                                entries: [
                                    {
                                        type: 'single-text',
                                        label: 'Änderung',
                                        path: '_text'
                                    },
                                    {
                                        type: 'single-text',
                                        label: 'Durch',
                                        path: '_attrs.who'
                                    },
                                    {
                                        type: 'single-text',
                                        label: 'Datum (JJJJ-MM-TT)',
                                        path: '_attrs.when'
                                    }
                                ]
                            }
                        ]
                    }
                ]
            },

            // =========
            // Haupttext
            // =========
            mainText: {
                title: 'Haupttext',
                type: 'single-text',
                parser: {
                    selector: 'tei:text/tei:body',
                },
                serializer: {
                    tag: 'tei:text'
                },
                schema: {
                    nodes: {
                        doc: {
                            content: 'block+',
                            parser: {
                                selector: 'tei:body'
                            },
                            serializer: {
                                tag: 'tei:body'
                            }
                        },
                        paragraph: {
                            group: 'block',
                            content: 'inline*',
                            parser: {
                                selector: 'tei:p'
                            },
                            serializer: {
                                tag: 'tei:p'
                            },
                            attrs: {
                                noIndent: {
                                    default: false,
                                    parser: {
                                        selector: 'contains(@style, "no-indent")',
                                        type: 'boolean'
                                    },
                                    serializer: {
                                        attr: 'style',
                                        values: {
                                            true: 'no-indent'
                                        }
                                    }
                                },
                                textAlign: {
                                    default: 'left',
                                    parsers: [
                                        {
                                            selector: "contains(@style, 'text-left')",
                                            type: 'static',
                                            value: 'left'
                                        },
                                        {
                                            selector: "contains(@style, 'text-center')",
                                            type: 'static',
                                            value: 'center'
                                        },
                                        {
                                            selector: "contains(@style, 'text-right')",
                                            type: 'static',
                                            value: 'right'
                                        },
                                        {
                                            selector: "contains(@style, 'text-justify')",
                                            type: 'static',
                                            value: 'justify'
                                        }
                                    ],
                                    serializer: {
                                        attr: 'style',
                                        values: {
                                            center: 'text-center',
                                            right: 'text-right',
                                            justify: 'text-justify'
                                        }
                                    }
                                }
                            },
                        },
                        heading: {
                            group: 'block',
                            content: 'inline*',
                            parser: {
                                selector: 'tei:head'
                            },
                            serializer: {
                                tag: 'tei:head'
                            },
                            attrs: {
                                headingId: {
                                    default: null,
                                    parser: {
                                        selector: '@data-heading-id'
                                    },
                                    serializer: {
                                        attr: 'data-heading-id'
                                    }
                                },
                                level: {
                                    default: 1,
                                    parser: {
                                        selector: 'substring(@type, 7)'
                                    },
                                    serializer: {
                                        attr: 'type',
                                        value: 'level-${value}'
                                    }
                                }
                            },
                            defining: true
                        },
                        line: {
                            group: 'block',
                            content: 'inline*',
                            parser: {
                                selector: 'tei:l'
                            },
                            serializer: {
                                tag: 'tei:l'
                            }
                        },
                        lineGroup: {
                            group: 'block',
                            content: 'line+',
                            parser: {
                                selector: 'tei:lg'
                            },
                            serializer: {
                                tag: 'tei:lg'
                            }
                        },
                        text: {
                            group: 'inline',
                            inline: true,
                            parsers: [
                                {
                                    selector: 'tei:seg',
                                    text: 'text()'
                                },
                                {
                                    selector: 'tei:hi',
                                    text: 'text()'
                                },
                                {
                                    selector: 'tei:foreign',
                                    text: 'text()'
                                }
                            ],
                            serializer: {
                                tag: 'tei:seg'
                            }
                        },
                        annotationGlobal: {
                            group: 'inline',
                            inline: true,
                            content: 'text*',
                            parser: {
                                selector: 'tei:ref[@target="#global"]',
                                text: 'text()'
                            },
                            serializer: {
                                tag: 'tei:ref'
                            },
                            attrs: {
                                target: {
                                    default: 'global',
                                    parser: {
                                        selector: 'substring(@target, 2)'
                                    },
                                    serializer: {
                                        attr: 'target',
                                        value: '#${value}'
                                    }
                                },
                                headingId: {
                                    default: null,
                                    parser: {
                                        selector: '@data-heading-id'
                                    },
                                    serializer: {
                                        attr: 'data-heading-id'
                                    }
                                }
                            }
                        },
                        annotation: {
                            group: 'inline',
                            inline: true,
                            content: 'text*',
                            parser: {
                                selector: 'tei:ref',
                                text: 'text()'
                            },
                            serializer: {
                                tag: 'tei:ref'
                            },
                            attrs: {
                                target: {
                                    default: 'unknown',
                                    parser: {
                                        selector: 'substring(@target, 2)'
                                    },
                                    serializer: {
                                        attr: 'target',
                                        value: '#${value}'
                                    }
                                }
                            }
                        },
                        pageBegin: {
                            group: 'inline',
                            inline: true,
                            content: 'text*',
                            parser: {
                                selector: 'tei:pb',
                                text: '@n'
                            },
                            serializer: {
                                tag: 'tei:pb',
                                text: {
                                    attr: 'n'
                                }
                            }
                        }
                    },
                    marks: {
                        foreignLanguage: {
                            parser: {
                                selector: 'self::tei:foreign'
                            },
                            serializer: {
                                tag: 'tei:foreign'
                            }
                        },
                        letterSparse: {
                            parser: {
                                selector: 'contains(@style, "letter-sparse")'
                            },
                            serializer: {
                                tag: 'tei:hi',
                                attrs: {
                                    style: {
                                        value: 'letter-sparse'
                                    }
                                }
                            }
                        },
                        sup: {
                            parser: {
                                selector: 'contains(@style, "sup")'
                            },
                            serializer: {
                                tag: 'tei:hi',
                                attrs: {
                                    style: {
                                        value: 'sup'
                                    }
                                }
                            }
                        },
                        fontSize: {
                            parsers: [
                                {
                                    selector: "contains(@style, 'font-size-small')"
                                },
                                {
                                    selector: "contains(@style, 'font-size-medium')"
                                },
                                {
                                    selector: "contains(@style, 'font-size-large')"
                                }
                            ],
                            serializer: {
                                tag: 'tei:hi'
                            },
                            attrs: {
                                size: {
                                    default: '',
                                    parsers: [
                                        {
                                            selector: "contains(@style, 'font-size-small')",
                                            type: 'static',
                                            value: 'small'
                                        },
                                        {
                                            selector: "contains(@style, 'font-size-medium')",
                                            type: 'static',
                                            value: 'medium'
                                        },
                                        {
                                            selector: "contains(@style, 'font-size-large')",
                                            type: 'static',
                                            value: 'large'
                                        }
                                    ],
                                    serializer: {
                                        attr: 'style',
                                        values: {
                                            small: 'font-size-small',
                                            medium: 'font-size-medium',
                                            large: 'font-size-large'
                                        }
                                    }
                                }
                            }
                        },
                        fontWeightBold: {
                            parser: {
                                selector: 'contains(@style, "font-weight-bold")'
                            },
                            serializer: {
                                tag: 'tei:hi',
                                attrs: {
                                    style: {
                                        value: 'font-weight-bold'
                                    }
                                }
                            }
                        },
                        fontStyleItalic: {
                            parser: {
                                selector: 'contains(@style, "font-style-italic")'
                            },
                            serializer: {
                                tag: 'tei:hi',
                                attrs: {
                                    style: {
                                        value: 'font-style-italic'
                                    }
                                }
                            }
                        }
                    }
                },
                ui: [
                    {
                        title: 'Blocktypen',
                        type: 'block-type',
                        blocks: [
                            {
                                type: 'heading',
                                label: 'Überschrift'
                            },
                            {
                                type: 'paragraph',
                                label: 'Absatz'
                            },
                            {
                                type: 'lineGroup',
                                label: 'Vers',
                                wrapping: true
                            },
                            {
                                type: 'line',
                                label: 'Zeile'
                            },
                            {
                                type: 'annotation',
                                label: 'Einzelstellenverweis'
                            },
                            {
                                type: 'annotationGlobal',
                                label: 'Globalkommentarverweis'
                            },
                            {
                                type: 'pageBegin',
                                label: 'Seitenanfang'
                            }
                        ]
                    },
                    {
                        title: 'Überschrift',
                        type: 'toolbar',
                        context: 'blocks.heading',
                        entries: [
                            {
                                type: 'select-attr',
                                attr: 'level',
                                values: [
                                    {
                                        key: '1',
                                        value: 'Ebene 1'
                                    },
                                    {
                                        key: '2',
                                        value: 'Ebene 2'
                                    },
                                    {
                                        key: '3',
                                        value: 'Ebene 3'
                                    }
                                ]
                            },
                            {
                                type: 'text-attr',
                                attr: 'headingId',
                                dataType: 'text'
                            }
                        ]
                    },
                    {
                        title: 'Absatz',
                        type: 'toolbar',
                        context: 'blocks.paragraph',
                        entries: [
                            {
                                type: 'toggle-attr',
                                attr: 'noIndent',
                                label: "Nicht einrücken",
                                icon: {
                                    on: '<svg viewBox="0 0 24 24" class="mdi-icon"><path d="M11,13H21V11H11M11,9H21V7H11M3,3V5H21V3M11,17H21V15H11M3,8V16L7,12M3,21H21V19H3V21Z" /></svg>',
                                    off: '<svg viewBox="0 0 24 24" class="mdi-icon"><path d="M11,13H21V11H11M11,9H21V7H11M3,3V5H21V3M3,21H21V19H3M3,12L7,16V8M11,17H21V15H11V17Z" /></svg>'
                                }
                            },
                            {
                                type: 'separator'
                            },
                            {
                                type: 'set-attr',
                                attr: 'textAlign',
                                value: 'left',
                                label: 'Linksbündig',
                                icon: '<svg viewBox="0 0 24 24" class="mdi-icon"><path d="M3,3H21V5H3V3M3,7H15V9H3V7M3,11H21V13H3V11M3,15H15V17H3V15M3,19H21V21H3V19Z" /></svg>'
                            },
                            {
                                type: 'set-attr',
                                attr: 'textAlign',
                                value: 'center',
                                label: 'Zentriert',
                                icon: '<svg style="viewBox="0 0 24 24" class="mdi-icon"><path d="M3,3H21V5H3V3M7,7H17V9H7V7M3,11H21V13H3V11M7,15H17V17H7V15M3,19H21V21H3V19Z" /></svg>'
                            },
                            {
                                type: 'set-attr',
                                attr: 'textAlign',
                                value: 'right',
                                label: 'Rechtsbündig',
                                icon: '<svg viewBox="0 0 24 24" class="mdi-icon"><path d="M3,3H21V5H3V3M9,7H21V9H9V7M3,11H21V13H3V11M9,15H21V17H9V15M3,19H21V21H3V19Z" /></svg>'
                            },
                            {
                                type: 'set-attr',
                                attr: 'textAlign',
                                value: 'justify',
                                label: 'Block',
                                icon: '<svg viewBox="0 0 24 24" class="mdi-icon"><path d="M3,3H21V5H3V3M3,7H21V9H3V7M3,11H21V13H3V11M3,15H21V17H3V15M3,19H21V21H3V19Z" /></svg>'
                            },
                        ]
                    },
                    {
                        title: 'Darstellung',
                        type: 'toolbar',
                        context: 'marks',
                        entries: [
                            {
                                type: 'select-mark-attr',
                                mark: 'fontSize',
                                attr: 'size',
                                values: [
                                    {
                                        key: '',
                                        label: 'Normal'
                                    },
                                    {
                                        key: 'small',
                                        label: 'Klein',
                                    },
                                    {
                                        key: 'medium',
                                        label: 'Mittel',
                                    },
                                    {
                                        key: 'large',
                                        label: 'Groß'
                                    }
                                ]
                            },
                            {
                                type: 'toggle-mark',
                                mark: 'fontWeightBold',
                                label: 'Fettdruck',
                                icon: '<svg viewBox="0 0 24 24" class="mdi-icon"><path d="M13.5,15.5H10V12.5H13.5A1.5,1.5 0 0,1 15,14A1.5,1.5 0 0,1 13.5,15.5M10,6.5H13A1.5,1.5 0 0,1 14.5,8A1.5,1.5 0 0,1 13,9.5H10M15.6,10.79C16.57,10.11 17.25,9 17.25,8C17.25,5.74 15.5,4 13.25,4H7V18H14.04C16.14,18 17.75,16.3 17.75,14.21C17.75,12.69 16.89,11.39 15.6,10.79Z" /></svg>'
                            },
                            {
                                type: 'toggle-mark',
                                mark: 'fontStyleItalic',
                                label: 'Kursiv',
                                icon: '<svg viewBox="0 0 24 24" class="mdi-icon"><path d="M10,4V7H12.21L8.79,15H6V18H14V15H11.79L15.21,7H18V4H10Z" /></svg>'
                            },
                            {
                                type: 'toggle-mark',
                                mark: 'letterSparse',
                                label: 'Sperrung',
                                icon: '<svg viewBox="0 0 24 24" class="mdi-icon"><path d="M7,8L2.5,12L7,16V8M17,8V16L21.5,12L17,8M12,10A2,2 0 0,0 10,12A2,2 0 0,0 12,14A2,2 0 0,0 14,12A2,2 0 0,0 12,10Z" /></svg>'
                            },
                            {
                                type: 'toggle-mark',
                                mark: 'sup',
                                label: 'Hochgestellt',
                                icon: '<svg viewBox="0 0 24 24" class="mdi-icon"><path d="M16,7.41L11.41,12L16,16.59L14.59,18L10,13.41L5.41,18L4,16.59L8.59,12L4,7.41L5.41,6L10,10.59L14.59,6L16,7.41M21.85,9H16.97V8L17.86,7.18C18.62,6.54 19.18,6 19.56,5.55C19.93,5.11 20.12,4.7 20.13,4.32C20.14,4.04 20.05,3.8 19.86,3.62C19.68,3.43 19.39,3.34 19,3.33C18.69,3.34 18.42,3.4 18.16,3.5L17.5,3.89L17.05,2.72C17.32,2.5 17.64,2.33 18.03,2.19C18.42,2.05 18.85,2 19.32,2C20.1,2 20.7,2.2 21.1,2.61C21.5,3 21.72,3.54 21.72,4.18C21.71,4.74 21.53,5.26 21.18,5.73C20.84,6.21 20.42,6.66 19.91,7.09L19.27,7.61V7.63H21.85V9Z" /></svg>'
                            }
                        ]
                    },
                    {
                        title: 'Markup',
                        type: 'toolbar',
                        context: 'marks',
                        entries: [
                            {
                                type: 'toggle-mark',
                                mark: 'foreignLanguage',
                                label: 'Fremdsprachiger Text',
                                icon: '<svg viewBox="0 0 24 24" class="mdi-icon"><path d="M12.87,15.07L10.33,12.56L10.36,12.53C12.1,10.59 13.34,8.36 14.07,6H17V4H10V2H8V4H1V6H12.17C11.5,7.92 10.44,9.75 9,11.35C8.07,10.32 7.3,9.19 6.69,8H4.69C5.42,9.63 6.42,11.17 7.67,12.56L2.58,17.58L4,19L9,14L12.11,17.11L12.87,15.07M18.5,10H16.5L12,22H14L15.12,19H19.87L21,22H23L18.5,10M15.88,17L17.5,12.67L19.12,17H15.88Z" /></svg>'
                            }
                        ]
                    },
                    {
                        title: 'Einzelstellenverweis',
                        type: 'toolbar',
                        context: 'blocks.annotation',
                        entries: [
                            {
                                type: 'select-attr',
                                attr: 'target',
                                valueSource: 'annotations'
                            }
                        ]
                    },
                    {
                        title: 'Globalkommentarverweis Abschnitt (optional)',
                        type: 'toolbar',
                        context: 'blocks.annotationGlobal',
                        entries: [
                            {
                                type: 'text-attr',
                                attr: 'headingId',
                                dataType: 'text'
                            }
                        ]
                    }
                ]
            },

            // ===============
            // Globalkommentar
            // ===============
            globalComment: {
                title: 'Kommentierung',
                type: 'single-text',
                parser: {
                    selector: 'tei:text/tei:interpGrp[@type="global"]',
                },
                serializer: {
                    tag: 'tei:text'
                },
                schema: {
                    nodes: {
                        doc: {
                            content: 'block+',
                            parser: {
                                selector: 'tei:interpGrp[@type="global"]'
                            },
                            serializer: {
                                tag: 'tei:interpGrp',
                                attrs: {
                                    type: 'global',
                                    'xml:id': 'global'
                                }
                            }
                        },
                        paragraph: {
                            group: 'block',
                            content: 'inline*',
                            parser: {
                                selector: 'tei:p'
                            },
                            serializer: {
                                tag: 'tei:p'
                            },
                            attrs: {
                                noIndent: {
                                    default: false,
                                    parser: {
                                        selector: 'contains(@style, "no-indent")',
                                        type: 'boolean'
                                    },
                                    serializer: {
                                        attr: 'style',
                                        values: {
                                            true: 'no-indent'
                                        }
                                    }
                                },
                                textAlign: {
                                    default: 'left',
                                    parsers: [
                                        {
                                            selector: "contains(@style, 'text-left')",
                                            type: 'static',
                                            value: 'left'
                                        },
                                        {
                                            selector: "contains(@style, 'text-center')",
                                            type: 'static',
                                            value: 'center'
                                        },
                                        {
                                            selector: "contains(@style, 'text-right')",
                                            type: 'static',
                                            value: 'right'
                                        },
                                        {
                                            selector: "contains(@style, 'text-justify')",
                                            type: 'static',
                                            value: 'justify'
                                        }
                                    ],
                                    serializer: {
                                        attr: 'style',
                                        values: {
                                            center: 'text-center',
                                            right: 'text-right',
                                            justify: 'text-justify'
                                        }
                                    }
                                }
                            },
                        },
                        heading: {
                            group: 'block',
                            content: 'inline*',
                            parser: {
                                selector: 'tei:head'
                            },
                            serializer: {
                                tag: 'tei:head'
                            },
                            attrs: {
                                headingId: {
                                    default: null,
                                    parser: {
                                        selector: '@data-heading-id'
                                    },
                                    serializer: {
                                        attr: 'data-heading-id'
                                    }
                                },
                                level: {
                                    default: 1,
                                    parser: {
                                        selector: 'substring(@type, 7)'
                                    },
                                    serializer: {
                                        attr: 'type',
                                        value: 'level-${value}'
                                    }
                                }
                            },
                            defining: true
                        },
                        source: {
                            group: 'block',
                            content: 'inline*',
                            parser: {
                                selector: 'tei:item'
                            },
                            serializer: {
                                tag: 'tei:item'
                            },
                            attrs: {
                                sourceId: {
                                    default: '',
                                    parser: {
                                        selector: '@data-source-id'
                                    },
                                    serializer: {
                                        attr: 'data-source-id',
                                        value: '${value}'
                                    }
                                }
                            }
                        },
                        sourceList: {
                            group: 'block',
                            content: 'source+',
                            parser: {
                                selector: 'tei:list[@type="sources"]'
                            },
                            serializer: {
                                tag: 'tei:list',
                                attrs: {
                                    type: 'sources'
                                }
                            }
                        },
                        text: {
                            group: 'inline',
                            inline: true,
                            parsers: [
                                {
                                    selector: 'tei:seg',
                                    text: 'text()'
                                },
                                {
                                    selector: 'tei:hi',
                                    text: 'text()'
                                },
                                {
                                    selector: 'tei:foreign',
                                    text: 'text()'
                                }
                            ],
                            serializer: {
                                tag: 'tei:seg'
                            }
                        },
                        pageLineRef: {
                            group: 'inline',
                            inline: true,
                            content: 'text*',
                            parser: {
                                selector: 'tei:citedRange[@type="page-line-ref"]',
                                text: 'text()'
                            },
                            serializer: {
                                tag: 'tei:citedRange',
                                attrs: {
                                    type: 'page-line-ref'
                                }
                            }
                        },
                        wordRange: {
                            group: 'inline',
                            inline: true,
                            content: 'text*',
                            parser: {
                                selector: 'tei:citedRange[@type="word-range"]',
                                text: 'text()'
                            },
                            serializer: {
                                tag: 'tei:citedRange',
                                attrs: {
                                    type: 'word-range'
                                }
                            }
                        },
                        annotationGlobal: {
                            group: 'inline',
                            inline: true,
                            content: 'text*',
                            parser: {
                                selector: 'tei:ref[@target="#global"]',
                                text: 'text()'
                            },
                            serializer: {
                                tag: 'tei:ref'
                            },
                            attrs: {
                                target: {
                                    default: 'global',
                                    parser: {
                                        selector: 'substring(@target, 2)'
                                    },
                                    serializer: {
                                        attr: 'target',
                                        value: '#${value}'
                                    }
                                },
                                headingId: {
                                    default: null,
                                    parser: {
                                        selector: '@data-heading-id'
                                    },
                                    serializer: {
                                        attr: 'data-heading-id'
                                    }
                                }
                            }
                        },
                        annotation: {
                            group: 'inline',
                            inline: true,
                            content: 'text*',
                            parser: {
                                selector: 'tei:ref',
                                text: 'text()'
                            },
                            serializer: {
                                tag: 'tei:ref'
                            },
                            attrs: {
                                target: {
                                    default: 'unknown',
                                    parser: {
                                        selector: 'substring(@target, 2)'
                                    },
                                    serializer: {
                                        attr: 'target',
                                        value: '#${value}'
                                    }
                                }
                            }
                        },
                    },
                    marks: {
                        foreignLanguage: {
                            parser: {
                                selector: 'self::tei:foreign'
                            },
                            serializer: {
                                tag: 'tei:foreign'
                            }
                        },
                        letterSparse: {
                            parser: {
                                selector: 'contains(@style, "letter-sparse")'
                            },
                            serializer: {
                                tag: 'tei:hi',
                                attrs: {
                                    style: {
                                        value: 'letter-sparse'
                                    }
                                }
                            }
                        },
                        sup: {
                            parser: {
                                selector: 'contains(@style, "sup")'
                            },
                            serializer: {
                                tag: 'tei:hi',
                                attrs: {
                                    style: {
                                        value: 'sup'
                                    }
                                }
                            }
                        },
                        fontSize: {
                            parsers: [
                                {
                                    selector: "contains(@style, 'font-size-small')"
                                },
                                {
                                    selector: "contains(@style, 'font-size-medium')"
                                },
                                {
                                    selector: "contains(@style, 'font-size-large')"
                                }
                            ],
                            serializer: {
                                tag: 'tei:hi'
                            },
                            attrs: {
                                size: {
                                    default: '',
                                    parsers: [
                                        {
                                            selector: "contains(@style, 'font-size-small')",
                                            type: 'static',
                                            value: 'small'
                                        },
                                        {
                                            selector: "contains(@style, 'font-size-medium')",
                                            type: 'static',
                                            value: 'medium'
                                        },
                                        {
                                            selector: "contains(@style, 'font-size-large')",
                                            type: 'static',
                                            value: 'large'
                                        }
                                    ],
                                    serializer: {
                                        attr: 'style',
                                        values: {
                                            small: 'font-size-small',
                                            medium: 'font-size-medium',
                                            large: 'font-size-large'
                                        }
                                    }
                                }
                            }
                        },
                        fontWeightBold: {
                            parser: {
                                selector: 'contains(@style, "font-weight-bold")'
                            },
                            serializer: {
                                tag: 'tei:hi',
                                attrs: {
                                    style: {
                                        value: 'font-weight-bold'
                                    }
                                }
                            }
                        },
                        quotation: {
                            parser: {
                                selector: 'self::tei:q'
                            },
                            serializer: {
                                tag: 'tei:q'
                            }
                        }
                    }
                },
                ui: [
                    {
                        title: 'Blocktypen',
                        type: 'block-type',
                        blocks: [
                            {
                                type: 'heading',
                                label: 'Überschrift'
                            },
                            {
                                type: 'paragraph',
                                label: 'Absatz'
                            },
                            {
                                type: 'sourceList',
                                label: 'Quellenliste',
                                wrapping: true
                            },
                            {
                                type: 'source',
                                label: 'Quelle'
                            },
                            {
                                type: 'pageLineRef',
                                label: 'Seite & Zeile'
                            },
                            {
                                type: 'wordRange',
                                label: 'Wortspanne'
                            },
                            {
                                type: 'annotation',
                                label: 'Einzelstellenverweis'
                            },
                            {
                                type: 'annotationGlobal',
                                label: 'Globalkommentarverweis'
                            }
                        ]
                    },
                    {
                        title: 'Überschrift',
                        type: 'toolbar',
                        context: 'blocks.heading',
                        entries: [
                            {
                                type: 'select-attr',
                                attr: 'level',
                                values: [
                                    {
                                        key: '1',
                                        value: 'Ebene 1'
                                    },
                                    {
                                        key: '2',
                                        value: 'Ebene 2'
                                    },
                                    {
                                        key: '3',
                                        value: 'Ebene 3'
                                    }
                                ]
                            },
                            {
                                type: 'text-attr',
                                attr: 'headingId',
                                dataType: 'text'
                            }
                        ]
                    },
                    {
                        title: 'Absatz',
                        type: 'toolbar',
                        context: 'blocks.paragraph',
                        entries: [
                            {
                                type: 'toggle-attr',
                                attr: 'noIndent',
                                label: "Nicht einrücken",
                                icon: {
                                    on: '<svg viewBox="0 0 24 24" class="mdi-icon"><path d="M11,13H21V11H11M11,9H21V7H11M3,3V5H21V3M11,17H21V15H11M3,8V16L7,12M3,21H21V19H3V21Z" /></svg>',
                                    off: '<svg viewBox="0 0 24 24" class="mdi-icon"><path d="M11,13H21V11H11M11,9H21V7H11M3,3V5H21V3M3,21H21V19H3M3,12L7,16V8M11,17H21V15H11V17Z" /></svg>'
                                }
                            },
                            {
                                type: 'separator'
                            },
                            {
                                type: 'set-attr',
                                attr: 'textAlign',
                                value: 'left',
                                label: 'Linksbündig',
                                icon: '<svg viewBox="0 0 24 24" class="mdi-icon"><path d="M3,3H21V5H3V3M3,7H15V9H3V7M3,11H21V13H3V11M3,15H15V17H3V15M3,19H21V21H3V19Z" /></svg>'
                            },
                            {
                                type: 'set-attr',
                                attr: 'textAlign',
                                value: 'center',
                                label: 'Zentriert',
                                icon: '<svg style="viewBox="0 0 24 24" class="mdi-icon"><path d="M3,3H21V5H3V3M7,7H17V9H7V7M3,11H21V13H3V11M7,15H17V17H7V15M3,19H21V21H3V19Z" /></svg>'
                            },
                            {
                                type: 'set-attr',
                                attr: 'textAlign',
                                value: 'right',
                                label: 'Rechtsbündig',
                                icon: '<svg viewBox="0 0 24 24" class="mdi-icon"><path d="M3,3H21V5H3V3M9,7H21V9H9V7M3,11H21V13H3V11M9,15H21V17H9V15M3,19H21V21H3V19Z" /></svg>'
                            },
                            {
                                type: 'set-attr',
                                attr: 'textAlign',
                                value: 'justify',
                                label: 'Block',
                                icon: '<svg viewBox="0 0 24 24" class="mdi-icon"><path d="M3,3H21V5H3V3M3,7H21V9H3V7M3,11H21V13H3V11M3,15H21V17H3V15M3,19H21V21H3V19Z" /></svg>'
                            }
                        ]
                    },
                    {
                        title: 'Quelle',
                        type: 'toolbar',
                        context: 'blocks.source',
                        entries: [
                            {
                                type: 'text-attr',
                                attr: 'sourceId',
                                dataType: 'text'
                            }
                        ]
                    },
                    {
                        title: 'Darstellung',
                        type: 'toolbar',
                        context: 'marks',
                        entries: [
                            {
                                type: 'select-mark-attr',
                                mark: 'fontSize',
                                attr: 'size',
                                values: [
                                    {
                                        key: '',
                                        label: 'Normal'
                                    },
                                    {
                                        key: 'small',
                                        label: 'Klein',
                                    },
                                    {
                                        key: 'medium',
                                        label: 'Mittel',
                                    },
                                    {
                                        key: 'large',
                                        label: 'Groß'
                                    }
                                ]
                            },
                            {
                                type: 'toggle-mark',
                                mark: 'fontWeightBold',
                                label: 'Fettdruck',
                                icon: '<svg viewBox="0 0 24 24" class="mdi-icon"><path d="M13.5,15.5H10V12.5H13.5A1.5,1.5 0 0,1 15,14A1.5,1.5 0 0,1 13.5,15.5M10,6.5H13A1.5,1.5 0 0,1 14.5,8A1.5,1.5 0 0,1 13,9.5H10M15.6,10.79C16.57,10.11 17.25,9 17.25,8C17.25,5.74 15.5,4 13.25,4H7V18H14.04C16.14,18 17.75,16.3 17.75,14.21C17.75,12.69 16.89,11.39 15.6,10.79Z" /></svg>'
                            },
                            {
                                type: 'toggle-mark',
                                mark: 'letterSparse',
                                label: 'Sperrung',
                                icon: '<svg viewBox="0 0 24 24" class="mdi-icon"><path d="M7,8L2.5,12L7,16V8M17,8V16L21.5,12L17,8M12,10A2,2 0 0,0 10,12A2,2 0 0,0 12,14A2,2 0 0,0 14,12A2,2 0 0,0 12,10Z" /></svg>'
                            },
                            {
                                type: 'toggle-mark',
                                mark: 'sup',
                                label: 'Hochgestellt',
                                icon: '<svg viewBox="0 0 24 24" class="mdi-icon"><path d="M16,7.41L11.41,12L16,16.59L14.59,18L10,13.41L5.41,18L4,16.59L8.59,12L4,7.41L5.41,6L10,10.59L14.59,6L16,7.41M21.85,9H16.97V8L17.86,7.18C18.62,6.54 19.18,6 19.56,5.55C19.93,5.11 20.12,4.7 20.13,4.32C20.14,4.04 20.05,3.8 19.86,3.62C19.68,3.43 19.39,3.34 19,3.33C18.69,3.34 18.42,3.4 18.16,3.5L17.5,3.89L17.05,2.72C17.32,2.5 17.64,2.33 18.03,2.19C18.42,2.05 18.85,2 19.32,2C20.1,2 20.7,2.2 21.1,2.61C21.5,3 21.72,3.54 21.72,4.18C21.71,4.74 21.53,5.26 21.18,5.73C20.84,6.21 20.42,6.66 19.91,7.09L19.27,7.61V7.63H21.85V9Z" /></svg>'
                            }
                        ]
                    },
                    {
                        title: 'Markup',
                        type: 'toolbar',
                        context: 'marks',
                        entries: [
                            {
                                type: 'toggle-mark',
                                mark: 'foreignLanguage',
                                label: 'Fremdsprachiger Text',
                                icon: '<svg viewBox="0 0 24 24" class="mdi-icon"><path d="M12.87,15.07L10.33,12.56L10.36,12.53C12.1,10.59 13.34,8.36 14.07,6H17V4H10V2H8V4H1V6H12.17C11.5,7.92 10.44,9.75 9,11.35C8.07,10.32 7.3,9.19 6.69,8H4.69C5.42,9.63 6.42,11.17 7.67,12.56L2.58,17.58L4,19L9,14L12.11,17.11L12.87,15.07M18.5,10H16.5L12,22H14L15.12,19H19.87L21,22H23L18.5,10M15.88,17L17.5,12.67L19.12,17H15.88Z" /></svg>'
                            },
                            {
                                type: 'toggle-mark',
                                mark: 'quotation',
                                label: 'Zitat',
                                icon: '<svg viewBox="0 0 24 24" class="mdi-icon"><path d="M14,17H17L19,13V7H13V13H16M6,17H9L11,13V7H5V13H8L6,17Z" /></svg>'
                            }
                        ]
                    },
                    {
                        title: 'Einzelstellenverweis',
                        type: 'toolbar',
                        context: 'blocks.annotation',
                        entries: [
                            {
                                type: 'select-attr',
                                attr: 'target',
                                valueSource: 'annotations'
                            }
                        ]
                    },
                    {
                        title: 'Globalkommentarverweis Abschnitt (optional)',
                        type: 'toolbar',
                        context: 'blocks.annotationGlobal',
                        entries: [
                            {
                                type: 'text-attr',
                                attr: 'headingId',
                                dataType: 'text'
                            }
                        ]
                    }
                ]
            },

            // ========================
            // Einstelstellenkommentare
            // ========================
            annotations: {
                title: 'Einzelstellenerläuterungen',
                type: 'multi-text',
                parser: {
                    selector: 'tei:text/tei:interpGrp[@type="individual"]',
                },
                serializer: {
                    tag: 'tei:text'
                },
                parts: {
                    parser: {
                        selector: 'tei:interp'
                    },
                    serializer: {
                        tag: 'tei:interpGrp',
                        attrs: {
                            type: 'individual'
                        }
                    }
                },
                schema: {
                    nodes: {
                        doc: {
                            content: 'block+',
                            parser: {
                                selector: 'tei:interp'
                            },
                            serializer: {
                                tag: 'tei:interp'
                            },
                            attrs: {
                                id: {
                                    default: 'unknown',
                                    parser: {
                                        selector: '@xml:id'
                                    },
                                    serializer: {
                                        attr: 'xml:id',
                                        value: '${value}'
                                    }
                                }
                            }
                        },
                        paragraph: {
                            group: 'block',
                            content: 'inline*',
                            parser: {
                                selector: 'tei:p'
                            },
                            serializer: {
                                tag: 'tei:p'
                            },
                            attrs: {
                                textAlign: {
                                    default: 'left',
                                    parsers: [
                                        {
                                            selector: "contains(@style, 'text-left')",
                                            type: 'static',
                                            value: 'left'
                                        },
                                        {
                                            selector: "contains(@style, 'text-center')",
                                            type: 'static',
                                            value: 'center'
                                        },
                                        {
                                            selector: "contains(@style, 'text-right')",
                                            type: 'static',
                                            value: 'right'
                                        },
                                        {
                                            selector: "contains(@style, 'text-justify')",
                                            type: 'static',
                                            value: 'justify'
                                        }
                                    ],
                                    serializer: {
                                        attr: 'style',
                                        values: {
                                            center: 'text-center',
                                            right: 'text-right',
                                            justify: 'text-justify'
                                        }
                                    }
                                }
                            },
                        },
                        text: {
                            group: 'inline',
                            inline: true,
                            parsers: [
                                {
                                    selector: 'tei:seg',
                                    text: 'text()'
                                },
                                {
                                    selector: 'tei:hi',
                                    text: 'text()'
                                },
                                {
                                    selector: 'tei:foreign',
                                    text: 'text()'
                                },
                                {
                                    selector: 'tei:q',
                                    text: 'text()'
                                }
                            ],
                            serializer: {
                                tag: 'tei:seg'
                            }
                        },
                        pageLineRef: {
                            group: 'inline',
                            inline: true,
                            content: 'text*',
                            parser: {
                                selector: 'tei:citedRange[@type="page-line-ref"]',
                                text: 'text()'
                            },
                            serializer: {
                                tag: 'tei:citedRange',
                                attrs: {
                                    type: 'page-line-ref'
                                }
                            }
                        },
                        wordRange: {
                            group: 'inline',
                            inline: true,
                            content: 'text*',
                            parser: {
                                selector: 'tei:citedRange[@type="word-range"]',
                                text: 'text()'
                            },
                            serializer: {
                                tag: 'tei:citedRange',
                                attrs: {
                                    type: 'word-range'
                                }
                            }
                        },
                        annotationGlobal: {
                            group: 'inline',
                            inline: true,
                            content: 'text*',
                            parser: {
                                selector: 'tei:ref[@target="#global"]',
                                text: 'text()'
                            },
                            serializer: {
                                tag: 'tei:ref'
                            },
                            attrs: {
                                target: {
                                    default: 'global',
                                    parser: {
                                        selector: 'substring(@target, 2)'
                                    },
                                    serializer: {
                                        attr: 'target',
                                        value: '#${value}'
                                    }
                                },
                                headingId: {
                                    default: null,
                                    parser: {
                                        selector: '@data-heading-id'
                                    },
                                    serializer: {
                                        attr: 'data-heading-id'
                                    }
                                }
                            }
                        },
                        annotation: {
                            group: 'inline',
                            inline: true,
                            content: 'text*',
                            parser: {
                                selector: 'tei:ref',
                                text: 'text()'
                            },
                            serializer: {
                                tag: 'tei:ref'
                            },
                            attrs: {
                                target: {
                                    default: 'unknown',
                                    parser: {
                                        selector: 'substring(@target, 2)'
                                    },
                                    serializer: {
                                        attr: 'target',
                                        value: '#${value}'
                                    }
                                }
                            }
                        }
                    },
                    marks: {
                        foreignLanguage: {
                            parser: {
                                selector: 'self::tei:foreign'
                            },
                            serializer: {
                                tag: 'tei:foreign'
                            }
                        },
                        letterSparse: {
                            parser: {
                                selector: 'contains(@style, "letter-sparse")'
                            },
                            serializer: {
                                tag: 'tei:hi',
                                attrs: {
                                    style: {
                                        value: 'letter-sparse'
                                    }
                                }
                            }
                        },
                        sup: {
                            parser: {
                                selector: 'contains(@style, "sup")'
                            },
                            serializer: {
                                tag: 'tei:hi',
                                attrs: {
                                    style: {
                                        value: 'sup'
                                    }
                                }
                            }
                        },
                        fontSize: {
                            parsers: [
                                {
                                    selector: "contains(@style, 'font-size-small')"
                                },
                                {
                                    selector: "contains(@style, 'font-size-medium')"
                                },
                                {
                                    selector: "contains(@style, 'font-size-large')"
                                }
                            ],
                            serializer: {
                                tag: 'tei:hi'
                            },
                            attrs: {
                                size: {
                                    default: '',
                                    parsers: [
                                        {
                                            selector: "contains(@style, 'font-size-small')",
                                            type: 'static',
                                            value: 'small'
                                        },
                                        {
                                            selector: "contains(@style, 'font-size-medium')",
                                            type: 'static',
                                            value: 'medium'
                                        },
                                        {
                                            selector: "contains(@style, 'font-size-large')",
                                            type: 'static',
                                            value: 'large'
                                        }
                                    ],
                                    serializer: {
                                        attr: 'style',
                                        values: {
                                            small: 'font-size-small',
                                            medium: 'font-size-medium',
                                            large: 'font-size-large'
                                        }
                                    }
                                }
                            }
                        },
                        quotation: {
                            parser: {
                                selector: 'self::tei:q'
                            },
                            serializer: {
                                tag: 'tei:q'
                            }
                        }
                    }
                },
                ui: [
                    {
                        title: 'Schlüssel',
                        type: 'toolbar',
                        context: 'blocks.doc',
                        entries: [
                            {
                                type: 'doc-text-attr',
                                attr: 'id'
                            }
                        ]
                    },
                    {
                        title: 'Blocktypen',
                        type: 'block-type',
                        blocks: [
                            {
                                type: 'pageLineRef',
                                label: 'Seite & Zeile'
                            },
                            {
                                type: 'wordRange',
                                label: 'Wortspanne'
                            },
                            {
                                type: 'annotation',
                                label: 'Einzelstellenverweis'
                            },
                            {
                                type: 'annotationGlobal',
                                label: 'Globalkommentarverweis'
                            }
                        ]
                    },
                    {
                        title: 'Absatz',
                        type: 'toolbar',
                        context: 'blocks.paragraph',
                        entries: [
                            {
                                type: 'set-attr',
                                attr: 'textAlign',
                                value: 'left',
                                label: 'Linksbündig',
                                icon: '<svg viewBox="0 0 24 24" class="mdi-icon"><path d="M3,3H21V5H3V3M3,7H15V9H3V7M3,11H21V13H3V11M3,15H15V17H3V15M3,19H21V21H3V19Z" /></svg>'
                            },
                            {
                                type: 'set-attr',
                                attr: 'textAlign',
                                value: 'center',
                                label: 'Zentriert',
                                icon: '<svg style="viewBox="0 0 24 24" class="mdi-icon"><path d="M3,3H21V5H3V3M7,7H17V9H7V7M3,11H21V13H3V11M7,15H17V17H7V15M3,19H21V21H3V19Z" /></svg>'
                            },
                            {
                                type: 'set-attr',
                                attr: 'textAlign',
                                value: 'right',
                                label: 'Rechtsbündig',
                                icon: '<svg viewBox="0 0 24 24" class="mdi-icon"><path d="M3,3H21V5H3V3M9,7H21V9H9V7M3,11H21V13H3V11M9,15H21V17H9V15M3,19H21V21H3V19Z" /></svg>'
                            },
                            {
                                type: 'set-attr',
                                attr: 'textAlign',
                                value: 'justify',
                                label: 'Block',
                                icon: '<svg viewBox="0 0 24 24" class="mdi-icon"><path d="M3,3H21V5H3V3M3,7H21V9H3V7M3,11H21V13H3V11M3,15H21V17H3V15M3,19H21V21H3V19Z" /></svg>'
                            }
                        ]
                    },
                    {
                        title: 'Styling',
                        type: 'toolbar',
                        context: 'marks',
                        entries: [
                            {
                                type: 'select-mark-attr',
                                mark: 'fontSize',
                                attr: 'size',
                                values: [
                                    {
                                        key: '',
                                        label: 'Normal'
                                    },
                                    {
                                        key: 'small',
                                        label: 'Klein',
                                    },
                                    {
                                        key: 'medium',
                                        label: 'Mittel',
                                    },
                                    {
                                        key: 'large',
                                        label: 'Groß'
                                    }
                                ]
                            },
                            {
                                type: 'toggle-mark',
                                mark: 'fontWeightBold',
                                label: 'Fettdruck',
                                icon: '<svg viewBox="0 0 24 24" class="mdi-icon"><path d="M13.5,15.5H10V12.5H13.5A1.5,1.5 0 0,1 15,14A1.5,1.5 0 0,1 13.5,15.5M10,6.5H13A1.5,1.5 0 0,1 14.5,8A1.5,1.5 0 0,1 13,9.5H10M15.6,10.79C16.57,10.11 17.25,9 17.25,8C17.25,5.74 15.5,4 13.25,4H7V18H14.04C16.14,18 17.75,16.3 17.75,14.21C17.75,12.69 16.89,11.39 15.6,10.79Z" /></svg>'
                            },
                            {
                                type: 'toggle-mark',
                                mark: 'letterSparse',
                                label: 'Sperrung',
                                icon: '<svg viewBox="0 0 24 24" class="mdi-icon"><path d="M7,8L2.5,12L7,16V8M17,8V16L21.5,12L17,8M12,10A2,2 0 0,0 10,12A2,2 0 0,0 12,14A2,2 0 0,0 14,12A2,2 0 0,0 12,10Z" /></svg>'
                            },
                            {
                                type: 'toggle-mark',
                                mark: 'sup',
                                label: 'Hochgestellt',
                                icon: '<svg viewBox="0 0 24 24" class="mdi-icon"><path d="M16,7.41L11.41,12L16,16.59L14.59,18L10,13.41L5.41,18L4,16.59L8.59,12L4,7.41L5.41,6L10,10.59L14.59,6L16,7.41M21.85,9H16.97V8L17.86,7.18C18.62,6.54 19.18,6 19.56,5.55C19.93,5.11 20.12,4.7 20.13,4.32C20.14,4.04 20.05,3.8 19.86,3.62C19.68,3.43 19.39,3.34 19,3.33C18.69,3.34 18.42,3.4 18.16,3.5L17.5,3.89L17.05,2.72C17.32,2.5 17.64,2.33 18.03,2.19C18.42,2.05 18.85,2 19.32,2C20.1,2 20.7,2.2 21.1,2.61C21.5,3 21.72,3.54 21.72,4.18C21.71,4.74 21.53,5.26 21.18,5.73C20.84,6.21 20.42,6.66 19.91,7.09L19.27,7.61V7.63H21.85V9Z" /></svg>'
                            }
                        ]
                    },
                    {
                        title: 'Markup',
                        type: 'toolbar',
                        context: 'marks',
                        entries: [
                            {
                                type: 'toggle-mark',
                                mark: 'foreignLanguage',
                                label: 'Fremdsprachiger Text',
                                icon: '<svg viewBox="0 0 24 24" class="mdi-icon"><path d="M12.87,15.07L10.33,12.56L10.36,12.53C12.1,10.59 13.34,8.36 14.07,6H17V4H10V2H8V4H1V6H12.17C11.5,7.92 10.44,9.75 9,11.35C8.07,10.32 7.3,9.19 6.69,8H4.69C5.42,9.63 6.42,11.17 7.67,12.56L2.58,17.58L4,19L9,14L12.11,17.11L12.87,15.07M18.5,10H16.5L12,22H14L15.12,19H19.87L21,22H23L18.5,10M15.88,17L17.5,12.67L19.12,17H15.88Z" /></svg>'
                            },
                            {
                                type: 'toggle-mark',
                                mark: 'quotation',
                                label: 'Zitat',
                                icon: '<svg viewBox="0 0 24 24" class="mdi-icon"><path d="M14,17H17L19,13V7H13V13H16M6,17H9L11,13V7H5V13H8L6,17Z" /></svg>'
                            }
                        ]
                    },
                    {
                        title: 'Einzelstellenverweis',
                        type: 'toolbar',
                        context: 'blocks.annotation',
                        entries: [
                            {
                                type: 'select-attr',
                                attr: 'target',
                                valueSource: 'annotations'
                            }
                        ]
                    },
                    {
                        title: 'Globalkommentarverweis Abschnitt (optional)',
                        type: 'toolbar',
                        context: 'blocks.annotationGlobal',
                        entries: [
                            {
                                type: 'text-attr',
                                attr: 'headingId',
                                dataType: 'text'
                            }
                        ]
                    },
                ],
                default: {
                    type: 'doc',
                    content: [
                        {
                            type: 'paragraph',
                            content: [
                                {
                                    type: 'text',
                                    marks: [
                                        {
                                            type: 'pageLineRef'
                                        }
                                    ],
                                    text: 'Seite & Zeile'
                                },
                                {
                                    type: 'text',
                                    text: ' '
                                },
                                {
                                    type: 'text',
                                    marks: [
                                        {
                                            type: 'wordRange'
                                        }
                                    ],
                                    text: 'Wortspanne'
                                }
                            ]
                        },
                        {
                            type: 'paragraph',
                            content: [
                                {
                                    type: 'text',
                                    text: 'Neuer Einzelstellenkommentar'
                                }
                            ]
                        }
                    ]
                }
            }
        }
    });
})();

(function(t,e){"object"==typeof exports&&"undefined"!=typeof module?e():"function"==typeof define&&define.amd?define(e):e()})(0,function(){"use strict"
function t(t="unreachable"){return new Error(t)}let e=0
function n(){return Object.create(null)}const r=Object.freeze([]),i=1
class s{validate(t){return this.value()===t}}s.id=0
const o=[],a=[]
class l{constructor(t,e){this.type=t,this.inner=e}value(){return(0,o[this.type])(this.inner)}validate(t){return(0,a[this.type])(this.inner,t)}}function c(t){let e=o.length
o.push(t=>t.value()),a.push((t,e)=>t.validate(e)),t.id=e}o.push(()=>0),a.push((t,e)=>0===e)
const h=new l(0,null)
o.push(()=>NaN),a.push((t,e)=>NaN===e)
const p=new l(1,null)
o.push(()=>m),a.push((t,e)=>e===m)
const u=new l(2,null)
function d({tag:t}){return t===h}function f(t){return t===h}let m=i
class g extends s{static create(t=m){return new l(this.id,new g(t))}constructor(t=m){super(),this.revision=t}value(){return this.revision}dirty(){this.revision=++m}}function v(t){let e=[]
for(let n=0,r=t.length;n<r;n++){let r=t[n].tag
if(r===p)return p
r!==h&&e.push(r)}return k(e)}function y(t){let e=[],n=t.head()
for(;null!==n;){let r=n.tag
if(r===p)return p
r!==h&&e.push(r),n=t.nextNode(n)}return k(e)}function b(t){let e=[]
for(let n=0,r=t.length;n<r;n++){let r=t[n]
if(r===p)return p
r!==h&&e.push(r)}return k(e)}function k(t){switch(t.length){case 0:return h
case 1:return t[0]
case 2:return x.create(t[0],t[1])
default:return S.create(t)}}c(g)
class w extends s{constructor(){super(...arguments),this.lastChecked=null,this.lastValue=null}value(){let t=this.lastChecked,e=this.lastValue
return t!==m&&(this.lastChecked=m,this.lastValue=e=this.compute()),this.lastValue}invalidate(){this.lastChecked=null}}class x extends w{static create(t,e){return new l(this.id,new x(t,e))}constructor(t,e){super(),this.first=t,this.second=e}compute(){return Math.max(this.first.value(),this.second.value())}}c(x)
class S extends w{static create(t){return new l(this.id,new S(t))}constructor(t){super(),this.tags=t}compute(){let t=this.tags,e=-1
for(let n=0;n<t.length;n++){let r=t[n].value()
e=Math.max(r,e)}return e}}c(S)
class C extends w{static create(t){return new l(this.id,new C(t))}constructor(t){super(),this.tag=t,this.lastUpdated=i}compute(){return Math.max(this.lastUpdated,this.tag.value())}update(t){t!==this.tag&&(this.tag=t,this.lastUpdated=m,this.invalidate())}}c(C)
class M{constructor(){this.lastRevision=null,this.lastValue=null}value(){let t=this.tag,e=this.lastRevision,n=this.lastValue
return null!==e&&t.validate(e)||(n=this.lastValue=this.compute(),this.lastRevision=t.value()),n}invalidate(){this.lastRevision=null}}class O{constructor(t){this.lastValue=null,this.lastRevision=null,this.initialized=!1,this.tag=t.tag,this.reference=t}peek(){return this.initialized?this.lastValue:this.initialize()}revalidate(){if(!this.initialized)return this.initialize()
let t=this.reference,e=this.lastRevision,n=t.tag
if(n.validate(e))return E
this.lastRevision=n.value()
let r=this.lastValue,i=t.value()
return i===r?E:(this.lastValue=i,i)}initialize(){let t=this.reference,e=this.lastValue=t.value()
return this.lastRevision=t.tag.value(),this.initialized=!0,e}}const E="adb3b78e-3d22-4e4b-877a-6317c2c5c145"
function T(t){return t!==E}class A{constructor(t){this.inner=t,this.tag=h}value(){return this.inner}}class N{constructor(t){this.next=null,this.prev=null,this.value=t}}class D{constructor(){this.clear()}head(){return this._head}tail(){return this._tail}clear(){this._head=this._tail=null}toArray(){let t=[]
return this.forEachNode(e=>t.push(e)),t}nextNode(t){return t.next}forEachNode(t){let e=this._head
for(;null!==e;)t(e),e=e.next}insertBefore(t,e=null){return null===e?this.append(t):(e.prev?e.prev.next=t:this._head=t,t.prev=e.prev,t.next=e,e.prev=t,t)}append(t){let e=this._tail
return e?(e.next=t,t.prev=e,t.next=null):this._head=t,this._tail=t}remove(t){return t.prev?t.prev.next=t.next:this._head=t.next,t.next?t.next.prev=t.prev:this._tail=t.prev,t}}Object.freeze([])
class _ extends N{constructor(t,e){super(t.valueReferenceFor(e)),this.retained=!1,this.seen=!1,this.key=e.key,this.iterable=t,this.memo=t.memoReferenceFor(e)}update(t){this.retained=!0,this.iterable.updateValueReference(this.value,t),this.iterable.updateMemoReference(this.memo,t)}shouldRemove(){return!this.retained}reset(){this.retained=!1,this.seen=!1}}class R{constructor(t){this.iterator=null,this.map=Object.create(null),this.list=new D,this.tag=t.tag,this.iterable=t}isEmpty(){return(this.iterator=this.iterable.iterate()).isEmpty()}iterate(){let t
return t=null===this.iterator?this.iterable.iterate():this.iterator,this.iterator=null,t}has(t){return!!this.map[t]}get(t){return this.map[t]}wasSeen(t){let e=this.map[t]
return void 0!==e&&e.seen}append(t){let e=this.map,n=this.list,r=this.iterable,i=e[t.key]=new _(r,t)
return n.append(i),i}insertBefore(t,e){let n=this.map,r=this.list,i=this.iterable,s=n[t.key]=new _(i,t)
return s.retained=!0,r.insertBefore(s,e),s}move(t,e){let n=this.list
t.retained=!0,n.remove(t),n.insertBefore(t,e)}remove(t){this.list.remove(t),delete this.map[t.key]}nextNode(t){return this.list.nextNode(t)}head(){return this.list.head()}}class I{constructor(t){this.iterator=null
let e=new R(t)
this.artifacts=e}next(){let t=this.artifacts,e=(this.iterator=this.iterator||t.iterate()).next()
return null===e?null:t.append(e)}}var B;(function(t){t[t.Append=0]="Append",t[t.Prune=1]="Prune",t[t.Done=2]="Done"})(B||(B={}))
class z{constructor({target:t,artifacts:e}){this.target=t,this.artifacts=e,this.iterator=e.iterate(),this.current=e.head()}sync(){let t=B.Append
for(;;)switch(t){case B.Append:t=this.nextAppend()
break
case B.Prune:t=this.nextPrune()
break
case B.Done:return void this.nextDone()}}advanceToKey(t){let e=this.current,n=this.artifacts,r=e
for(;null!==r&&r.key!==t;)r.seen=!0,r=n.nextNode(r)
null!==r&&(this.current=n.nextNode(r))}nextAppend(){let t=this.iterator,e=this.current,n=this.artifacts,r=t.next()
if(null===r)return this.startPrune()
let i=r.key
return null!==e&&e.key===i?this.nextRetain(r):n.has(i)?this.nextMove(r):this.nextInsert(r),B.Append}nextRetain(t){let e=this.artifacts,n=this.current;(n=n).update(t),this.current=e.nextNode(n),this.target.retain(t.key,n.value,n.memo)}nextMove(t){let e=this.current,n=this.artifacts,r=this.target,i=t.key,s=n.get(t.key)
s.update(t),n.wasSeen(t.key)?(n.move(s,e),r.move(s.key,s.value,s.memo,e?e.key:null)):this.advanceToKey(i)}nextInsert(t){let e=this.artifacts,n=this.target,r=this.current,i=e.insertBefore(t,r)
n.insert(i.key,i.value,i.memo,r?r.key:null)}startPrune(){return this.current=this.artifacts.head(),B.Prune}nextPrune(){let t=this.artifacts,e=this.target,n=this.current
if(null===n)return B.Done
let r=n
return this.current=t.nextNode(r),r.shouldRemove()?(t.remove(r),e.delete(r.key)):r.reset(),B.Prune}nextDone(){this.target.done()}}class P{constructor(){this.tags=new Set}add(t){this.tags.add(t)}combine(){let t=this.tags
return 0===t.size?h:b([...t])}}function F(...t){let e=t[0],n=t[1],r=t[2]
if(r)return function(t,e,n){let r=H(t)
r.trackedProperties[e]=!0,r.trackedComputedProperties[e]=!0
let i=n.get,s=n.set
return{enumerable:!0,configurable:!1,get:function(){let t=V,n=V=new P,r=i.call(this)
V=t
let s=n.combine()
V&&V.add(s)
return H(this).updatableTagFor(e).inner.update(s),r},set:s?function(){J.inner.dirty(),H(this).updatableTagFor(e).inner.update(g.create()),s.apply(this,arguments)}:void 0}}(e,n,r);(function(t,e){let n=Symbol(e)
H(t).trackedProperties[e]=!0,Object.defineProperty(t,e,{configurable:!0,get(){return L(this,e),this[n]},set(t){J.inner.dirty(),H(this).updatableTagFor(e).inner.update(g.create()),this[n]=t,q()}})})(e,n)}let V=null
function L(t,e){V&&V.add(H(t).updatableTagFor(e))}class j{constructor(t){this.tags=n(),this.computedPropertyTags=n(),this.trackedProperties=t?Object.create(t.trackedProperties):n(),this.trackedComputedProperties=t?Object.create(t.trackedComputedProperties):n()}tagFor(t){let e=this.tags[t]
return e||(this.trackedComputedProperties[t]?this.tags[t]=this.updatableTagFor(t):this.tags[t]=g.create())}updatableTagFor(t){let e
return this.trackedComputedProperties[t]?(e=this.computedPropertyTags[t])||(this.computedPropertyTags[t]=C.create(h)):(e=this.tags[t])||(this.tags[t]=C.create(h))}}const $=new WeakMap
function H(t){let e=$.get(t)
if(e)return e
let n=function(t){let e=null,n=t
for(;!e;){if(!(n=U(n)))return e
e=$.get(n)}return e}(t)
return e=new j(n),$.set(t,e),e}const U=Object.getPrototypeOf
const J=g.create()
let q=function(){}
class W extends Error{constructor(t,e,n){super(n),this.target=t,this.key=e}static for(t,e){return new W(t,e,`The property '${e}' on ${t} was changed after being rendered. If you want to change a property used in a template after the component has rendered, mark the property as a tracked property with the @tracked decorator.`)}}function K(t,e,n=function(t,e){throw W.for(t,e)}){if("object"==typeof t&&t){return H(t).tagFor(e)}return h}class G{constructor(t){this.debugName=null,this.__args__=null,Object.assign(this,t)}get element(){let t=this.bounds
return function(t,e){if(!t)throw new Error(e||"assertion failure")}(t&&t.firstNode===t.lastNode,"The 'element' property can only be accessed on components that contain a single root element in their template. Try using 'bounds' instead to access the first and last nodes."),t.firstNode}get args(){return L(this,"args"),this.__args__}set args(t){this.__args__=t,H(this).updatableTagFor("args").inner.update(u)}static create(t){return new this(t)}didInsertElement(){}didUpdate(){}willDestroy(){}destroy(){this.willDestroy()}toString(){return`${this.debugName} component`}}const Y={attributeHook:!0,createArgs:!0,createCaller:!1,createInstance:!0,dynamicLayout:!1,dynamicScope:!1,dynamicTag:!0,elementHook:!0,prepareArgs:!1,updateHook:!0}
class X{constructor(t,e,n,r){this.name=t,this.manager=e,this.ComponentClass=n,this.handle=r,this.state={name:t,capabilities:Y,ComponentClass:n,handle:r}}toJSON(){return{GlimmerDebug:`<component-definition name="${this.name}">`}}}class Q{constructor(t){this._bounds=t}get firstNode(){return this._bounds.firstNode()}get lastNode(){return this._bounds.lastNode()}}const Z=new class{constructor(){this.evaluateOpcode=function(t){let e=new Array(t)
for(let n=0;n<t;n++)e[n]=null
return e}(98).slice()}add(t,e,n="syscall"){this.evaluateOpcode[t]={syscall:"syscall"===n,evaluate:e}}debugBefore(t,e,n){return{sp:void 0,state:void 0}}debugAfter(t,e,n,r){r.sp,r.state}evaluate(t,e,n){let r=this.evaluateOpcode[n]
r.syscall?r.evaluate(t,e):r.evaluate(t.inner,e)}}
class tt{constructor(){this._guid=++e}}class et extends tt{constructor(){super(...arguments),this.next=null,this.prev=null}}var nt;(function(t){t[t.pc=0]="pc",t[t.ra=1]="ra",t[t.fp=2]="fp",t[t.sp=3]="sp",t[t.s0=4]="s0",t[t.s1=5]="s1",t[t.t0=6]="t0",t[t.t1=7]="t1",t[t.v0=8]="v0"})(nt||(nt={}))
class rt extends A{constructor(t){super(t)}static create(t){return void 0===t?ot:null===t?at:!0===t?lt:!1===t?ct:"number"==typeof t?new st(t):new it(t)}get(t){return ot}}class it extends rt{constructor(){super(...arguments),this.lengthReference=null}get(t){if("length"===t){let t=this.lengthReference
return null===t&&(t=this.lengthReference=new st(this.inner.length)),t}return super.get(t)}}class st extends rt{constructor(t){super(t)}}const ot=new st(void 0),at=new st(null),lt=new st(!0),ct=new st(!1)
class ht{constructor(t){this.inner=t,this.tag=t.tag}value(){return this.toBool(this.inner.value())}toBool(t){return!!t}}class pt extends M{constructor(t){super(),this.parts=t,this.tag=v(t)}compute(){let t=new Array
for(let e=0;e<this.parts.length;e++){let n=this.parts[e].value()
null!=n&&(t[e]=ut(n))}return t.length>0?t.join(""):null}}function ut(t){return"function"!=typeof t.toString?"":String(t)}Z.add(1,(t,{op1:e})=>{let n=t.stack,r=t.constants.resolveHandle(e)(t,n.pop())
t.loadValue(nt.v0,r)}),Z.add(6,(t,{op1:e})=>{let n=t.referenceForSymbol(e)
t.stack.push(n)}),Z.add(4,(t,{op1:e})=>{let n=t.stack.pop()
t.scope().bindSymbol(e,n)}),Z.add(5,(t,{op1:e})=>{let n=t.stack.pop(),r=t.stack.pop(),i=t.stack.pop(),s=i?[n,r,i]:null
t.scope().bindBlock(e,s)}),Z.add(96,(t,{op1:e})=>{let n=t.constants.getString(e),r=t.scope().getPartialMap()[n]
void 0===r&&(r=t.getSelf().get(n)),t.stack.push(r)}),Z.add(20,(t,{op1:e,op2:n})=>{t.pushRootScope(e,!!n)}),Z.add(7,(t,{op1:e})=>{let n=t.constants.getString(e),r=t.stack.pop()
t.stack.push(r.get(n))}),Z.add(8,(t,{op1:e})=>{let n=t.stack,r=t.scope().getBlock(e)
r?(n.push(r[2]),n.push(r[1]),n.push(r[0])):(n.push(null),n.push(null),n.push(null))}),Z.add(9,(t,{op1:e})=>{let n=!!t.scope().getBlock(e)
t.stack.push(n?lt:ct)}),Z.add(10,t=>{t.stack.pop(),t.stack.pop()
let e=t.stack.pop(),n=e&&e.parameters.length
t.stack.push(n?lt:ct)}),Z.add(11,(t,{op1:e})=>{let n=new Array(e)
for(let r=e;r>0;r--){n[r-1]=t.stack.pop()}t.stack.push(new pt(n))})
const dt="CURRIED COMPONENT DEFINITION [id=6f00feb9-a0ef-4547-99ea-ac328f80acea]"
function ft(t){return!(!t||!t[dt])}class mt{constructor(t,e){this.inner=t,this.args=e,this[dt]=!0}unwrap(t){t.realloc(this.offset)
let e=this
for(;;){var n=e
let r=n.args,i=n.inner
if(r&&(t.positional.prepend(r.positional),t.named.merge(r.named)),!ft(i))return i
e=i}}get offset(){let t=this.inner,e=this.args,n=e?e.positional.length:0
return ft(t)?n+t.offset:n}}function gt(t){return vt(t)?"":String(t)}function vt(t){return null==t||"function"!=typeof t.toString}function yt(t){return"object"==typeof t&&null!==t&&"number"==typeof t.nodeType}function bt(t){return"string"==typeof t}class kt extends et{constructor(t,e,n){super(),this.node=t,this.reference=e,this.lastValue=n,this.type="dynamic-text",this.tag=e.tag,this.lastRevision=this.tag.value()}evaluate(){let t=this.reference,e=this.tag
e.validate(this.lastRevision)||(this.lastRevision=e.value(),this.update(t.value()))}update(t){let e,n=this.lastValue
if(t!==n&&(e=vt(t)?"":bt(t)?t:String(t))!==n){this.node.nodeValue=this.lastValue=e}}}class wt extends ht{static create(t){return new wt(t)}toBool(t){return ft(t)}}class xt{constructor(t){this.inner=t,this.tag=t.tag}value(){let t=this.inner.value()
return function(t){return bt(t)||vt(t)||"boolean"==typeof t||"number"==typeof t}(t)?1:(e=t)&&e[dt]?0:function(t){return"object"==typeof t&&null!==t&&"function"==typeof t.toHTML}(t)?3:function(t){return yt(t)&&11===t.nodeType}(t)?4:yt(t)?5:1
var e}}Z.add(28,t=>{let e=t.stack.pop().value(),n=vt(e)?"":String(e)
t.elements().appendDynamicHTML(n)}),Z.add(29,t=>{let e=t.stack.pop().value().toHTML(),n=vt(e)?"":e
t.elements().appendDynamicHTML(n)}),Z.add(32,t=>{let e=t.stack.pop(),n=e.value(),r=vt(n)?"":String(n),i=t.elements().appendDynamicText(r)
d(e)||t.updateWith(new kt(i,e,r))}),Z.add(30,t=>{let e=t.stack.pop().value()
t.elements().appendDynamicFragment(e)}),Z.add(31,t=>{let e=t.stack.pop().value()
t.elements().appendDynamicNode(e)}),Z.add(22,t=>t.pushChildScope()),Z.add(23,t=>t.popScope()),Z.add(44,t=>t.pushDynamicScope()),Z.add(45,t=>t.popDynamicScope()),Z.add(12,(t,{op1:e})=>{t.stack.push(t.constants.getOther(e))}),Z.add(13,(t,{op1:e})=>{let n=t.stack,r=e>>3
switch(7&e){case 0:n.push(r)
break
case 1:n.push(t.constants.getNumber(r))
break
case 2:n.push(t.constants.getString(r))
break
case 3:n.pushEncodedImmediate(e)
break
case 4:case 5:n.push(t.constants.getNumber(r))}}),Z.add(14,t=>{let e=t.stack
e.push(rt.create(e.pop()))}),Z.add(15,t=>{let e=t.stack
e.push(e.peek().value())}),Z.add(16,(t,{op1:e,op2:n})=>{let r=t.fetchValue(e)-n
t.stack.dup(r)}),Z.add(17,(t,{op1:e})=>{t.stack.pop(e)}),Z.add(18,(t,{op1:e})=>{t.load(e)}),Z.add(19,(t,{op1:e})=>{t.fetch(e)}),Z.add(43,(t,{op1:e})=>{let n=t.constants.getArray(e)
t.bindDynamicScope(n)}),Z.add(61,(t,{op1:e})=>{t.enter(e)}),Z.add(62,t=>{t.exit()}),Z.add(48,(t,{op1:e})=>{t.stack.push(t.constants.getSerializable(e))}),Z.add(47,t=>{t.stack.push(t.scope())}),Z.add(46,t=>{let e=t.stack,n=e.pop()
n?e.pushSmi(n.compile()):e.pushNull()}),Z.add(51,t=>{let e=t.stack,n=e.pop(),r=e.pop(),i=e.pop(),s=e.pop()
if(null===i)return t.pushFrame(),void t.pushScope(r)
let o=r
{let t=i.parameters,e=t.length
if(e>0){o=o.child()
for(let n=0;n<e;n++)o.bindSymbol(t[n],s.at(n))}}t.pushFrame(),t.pushScope(o),t.call(n)}),Z.add(53,(t,{op1:e})=>{let n=t.stack.pop()
if(d(n))n.value()&&t.goto(e)
else{let r=new O(n)
r.peek()&&t.goto(e),t.updateWith(new St(r))}}),Z.add(54,(t,{op1:e})=>{let n=t.stack.pop()
if(d(n))n.value()||t.goto(e)
else{let r=new O(n)
r.peek()||t.goto(e),t.updateWith(new St(r))}}),Z.add(55,(t,{op1:e,op2:n})=>{t.stack.peek()===n&&t.goto(e)}),Z.add(56,t=>{let e=t.stack.peek()
d(e)||t.updateWith(St.initialize(new O(e)))}),Z.add(63,t=>{let e=t.env,n=t.stack
n.push(e.toConditionalReference(n.pop()))})
class St extends et{constructor(t){super(),this.type="assert",this.tag=t.tag,this.cache=t}static initialize(t){let e=new St(t)
return t.peek(),e}evaluate(t){T(this.cache.revalidate())&&t.throw()}}Z.add(26,(t,{op1:e})=>{t.elements().appendText(t.constants.getString(e))}),Z.add(27,(t,{op1:e})=>{t.elements().appendComment(t.constants.getString(e))}),Z.add(33,(t,{op1:e})=>{t.elements().openElement(t.constants.getString(e))}),Z.add(34,t=>{let e=t.stack.pop().value()
t.elements().openElement(e)}),Z.add(41,t=>{let e,n,r=t.stack.pop(),i=t.stack.pop(),s=t.stack.pop().value()
if(d(r))e=r.value()
else{let n=new O(r)
e=n.peek(),t.updateWith(new St(n))}if(d(i))n=i.value()
else{let e=new O(i)
n=e.peek(),t.updateWith(new St(e))}t.elements().pushRemoteElement(e,s,n)}),Z.add(42,t=>{t.elements().popRemoteElement()}),Z.add(38,t=>{let e=t.fetchValue(nt.t0)
e&&(e.flush(t),t.loadValue(nt.t0,null)),t.elements().flushElement()}),Z.add(39,t=>{t.elements().closeElement()}),Z.add(40,(t,{op1:e})=>{let n=t.constants.resolveHandle(e),r=t.stack.pop()
var i=t.elements()
let s=i.constructing,o=i.updateOperations,a=t.dynamicScope(),l=n.create(s,r,a,o)
t.env.scheduleInstallModifier(l,n)
let c=n.getDestructor(l)
c&&t.newDestroyable(c)
let h=n.getTag(l)
f(h)||t.updateWith(new Ct(h,n,l))})
class Ct extends et{constructor(t,e,n){super(),this.tag=t,this.manager=e,this.modifier=n,this.type="update-modifier",this.lastUpdated=t.value()}evaluate(t){let e=this.manager,n=this.modifier,r=this.tag,i=this.lastUpdated
r.validate(i)||(t.env.scheduleUpdateModifier(n,e),this.lastUpdated=r.value())}}Z.add(35,(t,{op1:e,op2:n,op3:r})=>{let i=t.constants.getString(e),s=t.constants.getString(n),o=r?t.constants.getString(r):null
t.elements().setStaticAttribute(i,s,o)}),Z.add(36,(t,{op1:e,op2:n,op3:r})=>{let i=t.constants.getString(e),s=t.stack.pop(),o=s.value(),a=r?t.constants.getString(r):null,l=t.elements().setDynamicAttribute(i,o,!!n,a)
d(s)||t.updateWith(new Mt(s,l))})
class Mt extends et{constructor(t,e){super(),this.reference=t,this.attribute=e,this.type="patch-element",this.tag=t.tag,this.lastRevision=this.tag.value()}evaluate(t){let e=this.attribute,n=this.reference,r=this.tag
r.validate(this.lastRevision)||(this.lastRevision=r.value(),e.update(n.value(),t.env))}}function Ot(t,e,n){return t.lookupComponentDefinition(e,n)}class Et{constructor(t,e,n,r){this.inner=t,this.resolver=e,this.meta=n,this.args=r,this.tag=t.tag,this.lastValue=null,this.lastDefinition=null}value(){let t=this.inner,e=this.lastValue,n=t.value()
if(n===e)return this.lastDefinition
let r=null
if(ft(n))r=n
else if("string"==typeof n&&n){r=Ot(this.resolver,n,this.meta)}return r=this.curry(r),this.lastValue=n,this.lastDefinition=r,r}get(){return ot}curry(t){let e=this.args
return!e&&ft(t)?t:t?new mt(t,e):null}}class Tt{constructor(t){this.list=t,this.tag=v(t),this.list=t}value(){let t=[],e=this.list
for(let n=0;n<e.length;n++){let r=gt(e[n].value())
r&&t.push(r)}return 0===t.length?null:t.join(" ")}}function At(t){return 0|(t.dynamicLayout?1:0)|(t.dynamicTag?2:0)|(t.prepareArgs?4:0)|(t.createArgs?8:0)|(t.attributeHook?16:0)|(t.elementHook?32:0)|(t.dynamicScope?64:0)|(t.createCaller?128:0)|(t.updateHook?256:0)|(t.createInstance?512:0)}function Nt(t,e){return!!(t&e)}Z.add(69,t=>{let e=t.stack,n=e.pop()
e.push(wt.create(n))}),Z.add(70,t=>{let e=t.stack,n=e.peek()
e.push(new xt(n))}),Z.add(71,(t,{op1:e})=>{let n=t.stack,r=n.pop(),i=n.pop(),s=t.constants.getSerializable(e),o=t.constants.resolver
t.loadValue(nt.v0,new Et(r,o,s,i))}),Z.add(72,(t,{op1:e})=>{let n=t.constants.resolveHandle(e),r=n.manager,i=At(r.getCapabilities(n.state)),s={definition:n,manager:r,capabilities:i,state:null,handle:null,table:null,lookup:null}
t.stack.push(s)}),Z.add(75,(e,{op1:n})=>{let r,i=e.stack,s=i.pop().value(),o=e.constants.getSerializable(n)
if(e.loadValue(nt.t1,null),"string"==typeof s){r=Ot(e.constants.resolver,s,o)}else{if(!ft(s))throw t()
r=s}i.push(r)}),Z.add(73,t=>{let e,n,r=t.stack,i=r.pop()
ft(i)?n=e=null:e=At((n=i.manager).getCapabilities(i.state)),r.push({definition:i,capabilities:e,manager:n,state:null,handle:null,table:null})}),Z.add(74,(e,{op1:n})=>{let r,i=e.stack,s=i.pop().value()
if(!ft(s))throw t()
r=s,i.push(r)}),Z.add(76,(t,{op1:e,op2:n})=>{let r=t.stack,i=t.constants.getStringArray(e),s=n>>4,o=8&n,a=[]
4&n&&a.push("main"),2&n&&a.push("else"),1&n&&a.push("attrs"),t.args.setup(r,i,a,s,!!o),r.push(t.args)}),Z.add(77,t=>{let e=t.stack
e.push(t.args.empty(e))}),Z.add(80,t=>{let e=t.stack,n=e.pop().capture()
e.push(n)}),Z.add(79,(t,{op1:e})=>{let n=t.stack,r=t.fetchValue(e),i=n.pop(),s=r.definition
ft(s)&&(s=function(t,e,n){let r=t.definition=e.unwrap(n),i=r.manager,s=r.state
return t.manager=i,t.capabilities=At(i.getCapabilities(s)),r}(r,s,i))
var o=s
let a=o.manager,l=o.state
if(!0!==Nt(r.capabilities,4))return void n.push(i)
let c=i.blocks.values,h=i.blocks.names,p=a.prepareArgs(l,i)
if(p){i.clear()
for(let i=0;i<c.length;i++)n.push(c[i])
let t=p.positional,e=p.named,r=t.length
for(let i=0;i<r;i++)n.push(t[i])
let s=Object.keys(e)
for(let i=0;i<s.length;i++)n.push(e[s[i]])
i.setup(n,s,h,r,!0)}n.push(i)}),Z.add(81,(t,{op1:e,op2:n})=>{let r=t.fetchValue(n),i=r.definition,s=r.manager,o=r.capabilities=At(s.getCapabilities(i.state)),a=null
Nt(o,64)&&(a=t.dynamicScope())
let l=1&e,c=null
Nt(o,8)&&(c=t.stack.peek())
let h=null
Nt(o,128)&&(h=t.getSelf())
let p=s.create(t.env,i.state,c,a,h,!!l)
r.state=p
let u=s.getTag(p)
Nt(o,256)&&!f(u)&&t.updateWith(new Rt(u,p,s,a))}),Z.add(82,(t,{op1:e})=>{var n=t.fetchValue(e)
let r=n.manager,i=n.state,s=r.getDestructor(i)
s&&t.newDestroyable(s)}),Z.add(91,t=>{t.beginCacheGroup(),t.elements().pushSimpleBlock()}),Z.add(83,t=>{t.loadValue(nt.t0,new Dt)}),Z.add(37,(t,{op1:e,op2:n,op3:r})=>{let i=t.constants.getString(e),s=t.stack.pop(),o=r?t.constants.getString(r):null
t.fetchValue(nt.t0).setAttribute(i,s,!!n,o)})
class Dt{constructor(){this.attributes=n(),this.classes=[]}setAttribute(t,e,n,r){let i={value:e,namespace:r,trusting:n}
"class"===t&&this.classes.push(e),this.attributes[t]=i}flush(t){for(let e in this.attributes){let n=this.attributes[e],r=n.value,i=n.namespace,s=n.trusting
if("class"===e&&(r=new Tt(this.classes)),"type"===e)continue
let o=t.elements().setDynamicAttribute(e,r.value(),s,i)
d(r)||t.updateWith(new Mt(r,o))}if("type"in this.attributes){let e=this.attributes.type,n=e.value,r=e.namespace,i=e.trusting,s=t.elements().setDynamicAttribute("type",n.value(),i,r)
d(n)||t.updateWith(new Mt(n,s))}}}function _t(t,e,n,r,i){let s=n.table.symbols.indexOf(t),o=r.get(e);-1!==s&&i.scope().bindBlock(s+1,o),n.lookup&&(n.lookup[t]=o)}Z.add(93,(t,{op1:e})=>{var n=t.fetchValue(e)
let r=n.definition,i=n.state,s=r.manager,o=t.fetchValue(nt.t0)
s.didCreateElement(i,t.elements().expectConstructing("DidCreateElementOpcode#evaluate"),o)}),Z.add(84,(t,{op1:e})=>{var n=t.fetchValue(e)
let r=n.definition,i=n.state,s=r.manager
t.stack.push(s.getSelf(i))}),Z.add(85,(t,{op1:e})=>{var n=t.fetchValue(e)
let r=n.definition,i=n.state,s=r.manager
t.stack.push(s.getTagName(i))}),Z.add(86,(e,{op1:n})=>{let r,i=e.fetchValue(n),s=i.manager,o=i.definition,a=e.constants.resolver,l=e.stack,c=i.state,h=i.capabilities,p=o.state
if(function(t,e){return!1===Nt(t,1)}(h))r=s.getLayout(p,a)
else{if(!function(t,e){return!0===Nt(t,1)}(h))throw t()
r=s.getDynamicLayout(c,a)}l.push(r.symbolTable),l.push(r.handle)}),Z.add(68,(t,{op1:e})=>{let n=t.stack.pop(),r=t.stack.pop(),i=n.manager,s=At(i.getCapabilities(n.state)),o={definition:n,manager:i,capabilities:s,state:null,handle:r.handle,table:r.symbolTable,lookup:null}
t.loadValue(e,o)}),Z.add(89,(t,{op1:e})=>{let n=t.stack,r=n.pop(),i=n.pop(),s=t.fetchValue(e)
s.handle=r,s.table=i}),Z.add(21,(t,{op1:e})=>{let n=t.fetchValue(e).table.symbols
t.pushRootScope(n.length+1,!0)}),Z.add(87,(t,{op1:e})=>{let r=t.fetchValue(e)
if(r.table.hasEval){let e=r.lookup=n()
t.scope().bindEvalScope(e)}}),Z.add(2,(t,{op1:e})=>{let n=t.fetchValue(e),r=t.scope(),i=t.stack.peek(),s=i.named.atNames
for(let o=s.length-1;o>=0;o--){let t=s[o],e=n.table.symbols.indexOf(s[o]),a=i.named.get(t,!1);-1!==e&&r.bindSymbol(e+1,a),n.lookup&&(n.lookup[t]=a)}}),Z.add(3,(t,{op1:e})=>{let n=t.fetchValue(e)
let r=t.stack.peek().blocks
_t("&attrs","attrs",n,r,t),_t("&inverse","else",n,r,t),_t("&default","main",n,r,t)}),Z.add(90,(t,{op1:e})=>{let n=t.fetchValue(e)
t.call(n.handle)}),Z.add(94,(t,{op1:e})=>{var n=t.fetchValue(e)
let r=n.manager,i=n.state,s=t.elements().popBlock()
r.didRenderLayout(i,s),t.env.didCreate(i,r),t.updateWith(new It(r,i,s))}),Z.add(92,t=>{t.commitCacheGroup()})
class Rt extends et{constructor(t,e,n,r){super(),this.tag=t,this.component=e,this.manager=n,this.dynamicScope=r,this.type="update-component"}evaluate(t){let e=this.component,n=this.manager,r=this.dynamicScope
n.update(e,r)}}class It extends et{constructor(t,e,n){super(),this.manager=t,this.component=e,this.bounds=n,this.type="did-update-layout",this.tag=h}evaluate(t){let e=this.manager,n=this.component,r=this.bounds
e.didUpdateLayout(n,r),t.env.didUpdate(n,e)}}let Bt=function(t,e){console.info("Use `context`, and `get(<path>)` to debug this template."),e("this")}
class zt{constructor(t,e,r){this.scope=t,this.locals=n()
for(let n=0;n<r.length;n++){let i=r[n],s=e[i-1],o=t.getSymbol(i)
this.locals[s]=o}}get(t){let e=this.scope,n=this.locals,r=t.split(".")
var i=t.split(".")
let s,o=i[0],a=i.slice(1),l=e.getEvalScope()
return"this"===o?s=e.getSelf():n[o]?s=n[o]:0===o.indexOf("@")&&l[o]?s=l[o]:(s=this.scope.getSelf(),a=r),a.reduce((t,e)=>t.get(e),s)}}Z.add(97,(t,{op1:e,op2:n})=>{let r=t.constants.getStringArray(e),i=t.constants.getArray(n),s=new zt(t.scope(),r,i)
Bt(t.getSelf().value(),t=>s.get(t).value())}),Z.add(95,(t,{op1:e,op2:n,op3:r})=>{let i=t.constants,s=t.constants.resolver,o=t.stack.pop().value(),a=i.getSerializable(e),l=i.getStringArray(n),c=i.getArray(r),h=s.lookupPartial(o,a)
var p=s.resolve(h).getPartial()
let u=p.symbolTable,d=p.handle
{let e=u.symbols,n=t.scope(),r=t.pushRootScope(e.length,!1),i=n.getEvalScope()
r.bindCallerScope(n.getCallerScope()),r.bindEvalScope(i),r.bindSelf(n.getSelf())
let s=Object.create(n.getPartialMap())
for(let t=0;t<c.length;t++){let e=c[t],r=l[e-1],i=n.getSymbol(e)
s[r]=i}if(i)for(let t=0;t<e.length;t++){let n=t+1,s=i[e[t]]
void 0!==s&&r.bind(n,s)}r.bindPartialMap(s),t.pushFrame(),t.call(d)}})
class Pt{constructor(t){this.tag=t.tag,this.artifacts=t}value(){return!this.artifacts.isEmpty()}}Z.add(66,t=>{let e=t.stack,n=e.pop(),r=e.pop(),i=t.env.iterableFor(n,r.value()),s=new I(i)
e.push(s),e.push(new Pt(s.artifacts))}),Z.add(64,(t,{op1:e})=>{t.enterList(e)}),Z.add(65,t=>{t.exitList()}),Z.add(67,(t,{op1:e})=>{let n=t.stack.peek().next()
if(n){let e=t.iterate(n.memo,n.value)
t.enterItem(n.key,e)}else t.goto(e)})
class Ft{constructor(t,e,n){this.parentNode=t,this.first=e,this.last=n}parentElement(){return this.parentNode}firstNode(){return this.first}lastNode(){return this.last}}const Vt="http://www.w3.org/2000/svg"
function Lt(t,e,n){if(!t)return e
if(!function(t,e){let n=t.createElementNS(e,"svg")
try{n.insertAdjacentHTML("beforeend","<circle></circle>")}catch(r){}finally{return 1!==n.childNodes.length||n.firstChild.namespaceURI!==Vt}}(t,n))return e
let r=t.createElement("div")
return class extends e{insertHTMLBefore(t,e,i){return null===i||""===i?super.insertHTMLBefore(t,e,i):t.namespaceURI!==n?super.insertHTMLBefore(t,e,i):function(t,e,n,r){let i="<svg>"+n+"</svg>"
e.innerHTML=i
var s=function(t,e,n){let r=t.firstChild,i=null,s=r
for(;s;)i=s,s=s.nextSibling,e.insertBefore(i,n)
return[r,i]}(e.firstChild,t,r)
let o=s[0],a=s[1]
return new Ft(t,o,a)}(t,r,i,e)}}}function jt(t,e){return t&&function(t){let e=t.createElement("div")
if(e.innerHTML="first",e.insertAdjacentHTML("beforeend","second"),2===e.childNodes.length)return!1
return!0}(t)?class extends e{constructor(t){super(t),this.uselessComment=t.createComment("")}insertHTMLBefore(t,e,n){if(null===n)return super.insertHTMLBefore(t,e,n)
let r=!1,i=e?e.previousSibling:t.lastChild
i&&i instanceof Text&&(r=!0,t.insertBefore(this.uselessComment,e))
let s=super.insertHTMLBefore(t,e,n)
return r&&t.removeChild(this.uselessComment),s}}:e}const $t="http://www.w3.org/2000/svg",Ht={foreignObject:1,desc:1,title:1},Ut=Object.create(null);["b","big","blockquote","body","br","center","code","dd","div","dl","dt","em","embed","h1","h2","h3","h4","h5","h6","head","hr","i","img","li","listing","main","meta","nobr","ol","p","pre","ruby","s","small","span","strong","strike","sub","sup","table","tt","u","ul","var"].forEach(t=>Ut[t]=1)
let Jt="undefined"==typeof document?null:document
class qt{constructor(t){this.document=t,this.setupUselessElement()}setupUselessElement(){this.uselessElement=this.document.createElement("div")}createElement(t,e){let n,r
if(e?(n=e.namespaceURI===$t||"svg"===t,r=Ht[e.tagName]):(n="svg"===t,r=!1),n&&!r){if(Ut[t])throw new Error(`Cannot create a ${t} inside an SVG context`)
return this.document.createElementNS($t,t)}return this.document.createElement(t)}insertBefore(t,e,n){t.insertBefore(e,n)}insertHTMLBefore(t,e,n){return function(t,e,n,r){let i,s=e,o=n,a=o?o.previousSibling:s.lastChild
if(null===r||""===r)return new Ft(s,null,null)
null===o?(s.insertAdjacentHTML("beforeend",r),i=s.lastChild):o instanceof HTMLElement?(o.insertAdjacentHTML("beforebegin",r),i=o.previousSibling):(s.insertBefore(t,o),t.insertAdjacentHTML("beforebegin",r),i=t.previousSibling,s.removeChild(t))
let l=a?a.nextSibling:s.firstChild
return new Ft(s,l,i)}(this.uselessElement,t,e,n)}createTextNode(t){return this.document.createTextNode(t)}createComment(t){return this.document.createComment(t)}}var Wt;(function(t){class e extends qt{createElementNS(t,e){return this.document.createElementNS(t,e)}setAttribute(t,e,n,r=null){r?t.setAttributeNS(r,e,n):t.setAttribute(e,n)}}t.TreeConstruction=e
let n=e
n=jt(Jt,n),n=Lt(Jt,n,$t),t.DOMTreeConstruction=n})(Wt||(Wt={}))
let Kt=class extends qt{constructor(t){super(t),this.document=t,this.namespace=null}setAttribute(t,e,n){t.setAttribute(e,n)}removeAttribute(t,e){t.removeAttribute(e)}insertAfter(t,e,n){this.insertBefore(t,e,n.nextSibling)}}
Kt=jt(Jt,Kt),Kt=Lt(Jt,Kt,$t)
Wt.DOMTreeConstruction
class Gt{constructor(t,e,n=e.length){this.tag=t,this.references=e,this.length=n}static empty(){return new Gt(h,r,0)}at(t){return this.references[t]}value(){return this.references.map(this.valueOf)}get(t){let e=this.references,n=this.length
if("length"===t)return rt.create(n)
{let r=parseInt(t,10)
return r<0||r>=n?ot:e[r]}}valueOf(t){return t.value()}}new class{constructor(t,e,n){this.tag=t,this.names=e,this.references=n,this.length=e.length,this._map=null}get map(){let t=this._map
if(!t){let e=this.names,r=this.references
t=this._map=n()
for(let n=0;n<e.length;n++)t[e[n]]=r[n]}return t}has(t){return-1!==this.names.indexOf(t)}get(t){let e=this.names,n=this.references,r=e.indexOf(t)
return-1===r?ot:n[r]}value(){let t=this.names,e=this.references,r=n()
for(let n=0;n<t.length;n++)r[t[n]]=e[n].value()
return r}}(h,r,r),new Gt(h,r)
class Yt{get(t){return Zt.create(this,t)}}class Xt extends Yt{constructor(){super(...arguments),this._lastRevision=null,this._lastValue=null}value(){let t=this.tag,e=this._lastRevision,n=this._lastValue
return e&&t.validate(e)||(n=this._lastValue=this.compute(),this._lastRevision=t.value()),n}}class Qt extends A{constructor(){super(...arguments),this.children=n()}get(t){let e=this.children[t]
return e||(e=this.children[t]=new te(this.inner,t)),e}}class Zt extends Xt{static create(t,e){return d(t)?new te(t.value(),e):new ee(t,e)}get(t){return new ee(this,t)}}class te extends Zt{constructor(t,e){super(),this._parentValue=t,this._propertyKey=e,this.tag=K(t,e)}compute(){return this._parentValue[this._propertyKey]}}class ee extends Zt{constructor(t,e){super()
let n=t.tag,r=C.create(h)
this._parentReference=t,this._parentObjectTag=r,this._propertyKey=e,this.tag=b([n,r])}compute(){let t=this._parentReference,e=this._parentObjectTag,n=this._propertyKey,r=t.value()
return e.inner.update(K(r,n)),"string"==typeof r&&"length"===n?r.length:"object"==typeof r&&r?r[n]:void 0}}class ne extends Yt{constructor(t){super(),this.tag=g.create(),this._value=t}value(){return this._value}update(t){t!==this._value&&(this.tag.inner.dirty(),this._value=t)}}class re{constructor(t,e,n,r){let i=t.ComponentClass,s=t.name
this.args=e
let o={debugName:s,args:this.namedArgsSnapshot()}
r.setOwner(o,n),i&&(this.component=i.create(o))}get tag(){return this.args.tag}namedArgsSnapshot(){return Object.freeze(this.args.named.value())}}const ie=new Qt(null)
class se{static create(t){return new se(t)}constructor(t){this.env=t.env}prepareArgs(t,e){return null}getCapabilities(t){return t.capabilities}getLayout({name:t,handle:e,symbolTable:n},r){return e&&n?{handle:e,symbolTable:n}:r.compileTemplate(t,e)}create(t,e,n,r,i,s){if(e.ComponentClass){let t=this.env.getOwner()
return new re(e,n.capture(),t,this.env)}}getSelf(t){return t?new Qt(t.component):ie}didCreateElement(t,e){}didRenderLayout(t,e){t&&(t.component.bounds=new Q(e))}didCreate(t){t&&t.component.didInsertElement()}getTag(t){return t?t.tag:h}update(t,e){t&&(t.component.args=t.namedArgsSnapshot())}didUpdateLayout(){}didUpdate(t){t&&t.component.didUpdate()}getDestructor(t){return t?t.component:oe}}const oe={destroy(){}}
function ae(t,e,n){function r(){return Reflect.construct(HTMLElement,[],r)}r.prototype=Object.create(HTMLElement.prototype,{constructor:{value:r},connectedCallback:{value:function(){let e=document.createElement("span"),r=this.parentNode
r.insertBefore(e,this),r.removeChild(this),t.renderComponent(n,r,e),function t(e,n){e._rendering?requestAnimationFrame(()=>{t(e,n)}):n()}(t,()=>{let t=e.previousElementSibling
e.remove(),function(t,e){let n=t.attributes
for(let i=0;i<n.length;i++){var r=n.item(i)
let t=r.name,s=r.value
e.setAttribute(t,s)}}(this,t)})}}}),window.customElements.define(e,r)}class le{constructor(t,e=null){this._registry=t,this._resolver=e,this._lookups={},this._factoryDefinitionLookups={}}factoryFor(t){let e=this._factoryDefinitionLookups[t]
if(e||(this._resolver&&(e=this._resolver.retrieve(t)),e||(e=this._registry.registration(t)),e&&(this._factoryDefinitionLookups[t]=e)),e)return this.buildFactory(t,e)}lookup(t){let e=!1!==this._registry.registeredOption(t,"singleton")
if(e&&this._lookups[t])return this._lookups[t]
let n=this.factoryFor(t)
if(!n)return
if(!1===this._registry.registeredOption(t,"instantiate"))return n.class
let r=n.create()
return e&&r&&(this._lookups[t]=r),r}defaultInjections(t){return{}}buildInjections(t){let e,n=this.defaultInjections(t),r=this._registry.registeredInjections(t)
for(let i=0;i<r.length;i++)n[(e=r[i]).property]=this.lookup(e.source)
return n}buildFactory(t,e){let n=this.buildInjections(t)
return{class:e,create(t){let r=Object.assign({},n,t)
return e.create(r)}}}}class ce{constructor(t){this._registrations={},this._registeredOptions={},this._registeredInjections={},t&&t.fallback&&(this._fallback=t.fallback)}register(t,e,n){this._registrations[t]=e,n&&(this._registeredOptions[t]=n)}registration(t){let e=this._registrations[t]
return void 0===e&&this._fallback&&(e=this._fallback.registration(t)),e}unregister(t){delete this._registrations[t],delete this._registeredOptions[t],delete this._registeredInjections[t]}registerOption(t,e,n){let r=this._registeredOptions[t]
r||(r={},this._registeredOptions[t]=r),r[e]=n}registeredOption(t,e){let n,r=this.registeredOptions(t)
return r&&(n=r[e]),void 0===n&&void 0!==this._fallback&&(n=this._fallback.registeredOption(t,e)),n}registeredOptions(t){let e=this._registeredOptions[t]
if(void 0===e){let n=t.split(":")[0]
e=this._registeredOptions[n]}return e}unregisterOption(t,e){let n=this._registeredOptions[t]
n&&delete n[e]}registerInjection(t,e,n){let r=this._registeredInjections[t]
void 0===r&&(this._registeredInjections[t]=r=[]),r.push({property:e,source:n})}registeredInjections(t){let e=t.split(":")[0],n=this._fallback?this._fallback.registeredInjections(t):[]
return Array.prototype.push.apply(n,this._registeredInjections[e]),Array.prototype.push.apply(n,this._registeredInjections[t]),n}}const he="__owner__"
function pe(t){return t[he]}function ue(t,e){t[he]=e}function de(t="unreachable"){return new Error(t)}function fe(t,e){if(!t)throw new Error(e||"assertion failure")}const me=Object.keys
function ge(t){for(let e=1;e<arguments.length;e++){let n=arguments[e]
if(null===n||"object"!=typeof n)continue
let r=me(n)
for(let e=0;e<r.length;e++){let i=r[e]
t[i]=n[i]}}return t}let ve=0
function ye(t){return t._guid=++ve}function be(){return Object.create(null)}class ke{constructor(){this.stack=[],this.current=null}get size(){return this.stack.length}push(t){this.current=t,this.stack.push(t)}pop(){let t=this.stack.pop(),e=this.stack.length
return this.current=0===e?null:this.stack[e-1],void 0===t?null:t}isEmpty(){return 0===this.stack.length}}class we{constructor(){this.clear()}head(){return this._head}tail(){return this._tail}clear(){this._head=this._tail=null}toArray(){let t=[]
return this.forEachNode(e=>t.push(e)),t}nextNode(t){return t.next}forEachNode(t){let e=this._head
for(;null!==e;)t(e),e=e.next}insertBefore(t,e=null){return null===e?this.append(t):(e.prev?e.prev.next=t:this._head=t,t.prev=e.prev,t.next=e,e.prev=t,t)}append(t){let e=this._tail
return e?(e.next=t,t.prev=e,t.next=null):this._head=t,this._tail=t}remove(t){return t.prev?t.prev.next=t.next:this._head=t.next,t.next?t.next.prev=t.prev:this._tail=t.prev,t}}class xe{constructor(t,e){this._head=t,this._tail=e}forEachNode(t){let e=this._head
for(;null!==e;)t(e),e=this.nextNode(e)}head(){return this._head}tail(){return this._tail}toArray(){let t=[]
return this.forEachNode(e=>t.push(e)),t}nextNode(t){return t===this._tail?null:t.next}}const Se=Object.freeze([])
class Ce{constructor(t,e){this._registry=t,this._resolver=e}register(t,e,n){let r=this._toAbsoluteSpecifier(t)
this._registry.register(r,e,n)}registration(t){let e=this._toAbsoluteSpecifier(t)
return this._registry.registration(e)}unregister(t){let e=this._toAbsoluteSpecifier(t)
this._registry.unregister(e)}registerOption(t,e,n){let r=this._toAbsoluteOrTypeSpecifier(t)
this._registry.registerOption(r,e,n)}registeredOption(t,e){let n=this._toAbsoluteOrTypeSpecifier(t)
return this._registry.registeredOption(n,e)}registeredOptions(t){let e=this._toAbsoluteOrTypeSpecifier(t)
return this._registry.registeredOptions(e)}unregisterOption(t,e){let n=this._toAbsoluteOrTypeSpecifier(t)
this._registry.unregisterOption(n,e)}registerInjection(t,e,n){let r=this._toAbsoluteOrTypeSpecifier(t),i=this._toAbsoluteSpecifier(n)
this._registry.registerInjection(r,e,i)}registeredInjections(t){let e=this._toAbsoluteOrTypeSpecifier(t)
return this._registry.registeredInjections(e)}_toAbsoluteSpecifier(t,e){return this._resolver.identify(t,e)}_toAbsoluteOrTypeSpecifier(t){return function(t){return-1===t.indexOf(":")}(t)?t:this._toAbsoluteSpecifier(t)}}class Me{constructor(t=null){this.bucket=t?ge({},t):{}}get(t){return this.bucket[t]}set(t,e){return this.bucket[t]=e}child(){return new Me(this.bucket)}}const Oe=new class{constructor(){this.evaluateOpcode=function(t){let e=new Array(t)
for(let n=0;n<t;n++)e[n]=null
return e}(98).slice()}add(t,e,n="syscall"){this.evaluateOpcode[t]={syscall:"syscall"===n,evaluate:e}}debugBefore(t,e,n){return{sp:void 0,state:void 0}}debugAfter(t,e,n,r){r.sp,r.state}evaluate(t,e,n){let r=this.evaluateOpcode[n]
r.syscall?r.evaluate(t,e):r.evaluate(t.inner,e)}}
class Ee{constructor(){ye(this)}}class Te extends Ee{constructor(){super(...arguments),this.next=null,this.prev=null}}var Ae;(function(t){t[t.pc=0]="pc",t[t.ra=1]="ra",t[t.fp=2]="fp",t[t.sp=3]="sp",t[t.s0=4]="s0",t[t.s1=5]="s1",t[t.t0=6]="t0",t[t.t1=7]="t1",t[t.v0=8]="v0"})(Ae||(Ae={}))
class Ne extends A{constructor(t){super(t)}static create(t){return void 0===t?Re:null===t?Ie:!0===t?Be:!1===t?ze:"number"==typeof t?new _e(t):new De(t)}get(t){return Re}}class De extends Ne{constructor(){super(...arguments),this.lengthReference=null}get(t){if("length"===t){let t=this.lengthReference
return null===t&&(t=this.lengthReference=new _e(this.inner.length)),t}return super.get(t)}}class _e extends Ne{constructor(t){super(t)}}const Re=new _e(void 0),Ie=new _e(null),Be=new _e(!0),ze=new _e(!1)
class Pe{constructor(t){this.inner=t,this.tag=t.tag}value(){return this.toBool(this.inner.value())}toBool(t){return!!t}}class Fe extends M{constructor(t){super(),this.parts=t,this.tag=v(t)}compute(){let t=new Array
for(let e=0;e<this.parts.length;e++){let n=this.parts[e].value()
null!=n&&(t[e]=Ve(n))}return t.length>0?t.join(""):null}}function Ve(t){return"function"!=typeof t.toString?"":String(t)}Oe.add(1,(t,{op1:e})=>{let n=t.stack,r=t.constants.resolveHandle(e)(t,n.pop())
t.loadValue(Ae.v0,r)}),Oe.add(6,(t,{op1:e})=>{let n=t.referenceForSymbol(e)
t.stack.push(n)}),Oe.add(4,(t,{op1:e})=>{let n=t.stack.pop()
t.scope().bindSymbol(e,n)}),Oe.add(5,(t,{op1:e})=>{let n=t.stack.pop(),r=t.stack.pop(),i=t.stack.pop(),s=i?[n,r,i]:null
t.scope().bindBlock(e,s)}),Oe.add(96,(t,{op1:e})=>{let n=t.constants.getString(e),r=t.scope().getPartialMap()[n]
void 0===r&&(r=t.getSelf().get(n)),t.stack.push(r)}),Oe.add(20,(t,{op1:e,op2:n})=>{t.pushRootScope(e,!!n)}),Oe.add(7,(t,{op1:e})=>{let n=t.constants.getString(e),r=t.stack.pop()
t.stack.push(r.get(n))}),Oe.add(8,(t,{op1:e})=>{let n=t.stack,r=t.scope().getBlock(e)
r?(n.push(r[2]),n.push(r[1]),n.push(r[0])):(n.push(null),n.push(null),n.push(null))}),Oe.add(9,(t,{op1:e})=>{let n=!!t.scope().getBlock(e)
t.stack.push(n?Be:ze)}),Oe.add(10,t=>{t.stack.pop(),t.stack.pop()
let e=t.stack.pop(),n=e&&e.parameters.length
t.stack.push(n?Be:ze)}),Oe.add(11,(t,{op1:e})=>{let n=new Array(e)
for(let r=e;r>0;r--){n[r-1]=t.stack.pop()}t.stack.push(new Fe(n))})
const Le="CURRIED COMPONENT DEFINITION [id=6f00feb9-a0ef-4547-99ea-ac328f80acea]"
function je(t){return!(!t||!t[Le])}class $e{constructor(t,e){this.inner=t,this.args=e,this[Le]=!0}unwrap(t){t.realloc(this.offset)
let e=this
for(;;){var n=e
let r=n.args,i=n.inner
if(r&&(t.positional.prepend(r.positional),t.named.merge(r.named)),!je(i))return i
e=i}}get offset(){let t=this.inner,e=this.args,n=e?e.positional.length:0
return je(t)?n+t.offset:n}}function He(t){return Ue(t)?"":String(t)}function Ue(t){return null==t||"function"!=typeof t.toString}function Je(t){return"object"==typeof t&&null!==t&&"function"==typeof t.toHTML}function qe(t){return"object"==typeof t&&null!==t&&"number"==typeof t.nodeType}function We(t){return"string"==typeof t}class Ke extends Te{constructor(t,e,n){super(),this.node=t,this.reference=e,this.lastValue=n,this.type="dynamic-text",this.tag=e.tag,this.lastRevision=this.tag.value()}evaluate(){let t=this.reference,e=this.tag
e.validate(this.lastRevision)||(this.lastRevision=e.value(),this.update(t.value()))}update(t){let e,n=this.lastValue
if(t!==n&&(e=Ue(t)?"":We(t)?t:String(t))!==n){this.node.nodeValue=this.lastValue=e}}}class Ge extends Pe{static create(t){return new Ge(t)}toBool(t){return je(t)}}class Ye{constructor(t){this.inner=t,this.tag=t.tag}value(){let t=this.inner.value()
return function(t){return We(t)||Ue(t)||"boolean"==typeof t||"number"==typeof t}(t)?1:(e=t)&&e[Le]?0:Je(t)?3:function(t){return qe(t)&&11===t.nodeType}(t)?4:qe(t)?5:1
var e}}Oe.add(28,t=>{let e=t.stack.pop().value(),n=Ue(e)?"":String(e)
t.elements().appendDynamicHTML(n)}),Oe.add(29,t=>{let e=t.stack.pop().value().toHTML(),n=Ue(e)?"":e
t.elements().appendDynamicHTML(n)}),Oe.add(32,t=>{let e=t.stack.pop(),n=e.value(),r=Ue(n)?"":String(n),i=t.elements().appendDynamicText(r)
d(e)||t.updateWith(new Ke(i,e,r))}),Oe.add(30,t=>{let e=t.stack.pop().value()
t.elements().appendDynamicFragment(e)}),Oe.add(31,t=>{let e=t.stack.pop().value()
t.elements().appendDynamicNode(e)}),Oe.add(22,t=>t.pushChildScope()),Oe.add(23,t=>t.popScope()),Oe.add(44,t=>t.pushDynamicScope()),Oe.add(45,t=>t.popDynamicScope()),Oe.add(12,(t,{op1:e})=>{t.stack.push(t.constants.getOther(e))}),Oe.add(13,(t,{op1:e})=>{let n=t.stack,r=e>>3
switch(7&e){case 0:n.push(r)
break
case 1:n.push(t.constants.getNumber(r))
break
case 2:n.push(t.constants.getString(r))
break
case 3:n.pushEncodedImmediate(e)
break
case 4:case 5:n.push(t.constants.getNumber(r))}}),Oe.add(14,t=>{let e=t.stack
e.push(Ne.create(e.pop()))}),Oe.add(15,t=>{let e=t.stack
e.push(e.peek().value())}),Oe.add(16,(t,{op1:e,op2:n})=>{let r=t.fetchValue(e)-n
t.stack.dup(r)}),Oe.add(17,(t,{op1:e})=>{t.stack.pop(e)}),Oe.add(18,(t,{op1:e})=>{t.load(e)}),Oe.add(19,(t,{op1:e})=>{t.fetch(e)}),Oe.add(43,(t,{op1:e})=>{let n=t.constants.getArray(e)
t.bindDynamicScope(n)}),Oe.add(61,(t,{op1:e})=>{t.enter(e)}),Oe.add(62,t=>{t.exit()}),Oe.add(48,(t,{op1:e})=>{t.stack.push(t.constants.getSerializable(e))}),Oe.add(47,t=>{t.stack.push(t.scope())}),Oe.add(46,t=>{let e=t.stack,n=e.pop()
n?e.pushSmi(n.compile()):e.pushNull()}),Oe.add(51,t=>{let e=t.stack,n=e.pop(),r=e.pop(),i=e.pop(),s=e.pop()
if(null===i)return t.pushFrame(),void t.pushScope(r)
let o=r
{let t=i.parameters,e=t.length
if(e>0){o=o.child()
for(let n=0;n<e;n++)o.bindSymbol(t[n],s.at(n))}}t.pushFrame(),t.pushScope(o),t.call(n)}),Oe.add(53,(t,{op1:e})=>{let n=t.stack.pop()
if(d(n))n.value()&&t.goto(e)
else{let r=new O(n)
r.peek()&&t.goto(e),t.updateWith(new Xe(r))}}),Oe.add(54,(t,{op1:e})=>{let n=t.stack.pop()
if(d(n))n.value()||t.goto(e)
else{let r=new O(n)
r.peek()||t.goto(e),t.updateWith(new Xe(r))}}),Oe.add(55,(t,{op1:e,op2:n})=>{t.stack.peek()===n&&t.goto(e)}),Oe.add(56,t=>{let e=t.stack.peek()
d(e)||t.updateWith(Xe.initialize(new O(e)))}),Oe.add(63,t=>{let e=t.env,n=t.stack
n.push(e.toConditionalReference(n.pop()))})
class Xe extends Te{constructor(t){super(),this.type="assert",this.tag=t.tag,this.cache=t}static initialize(t){let e=new Xe(t)
return t.peek(),e}evaluate(t){T(this.cache.revalidate())&&t.throw()}}class Qe extends Te{constructor(t,e){super(),this.target=e,this.type="jump-if-not-modified",this.tag=t,this.lastRevision=t.value()}evaluate(t){let e=this.tag,n=this.target,r=this.lastRevision
!t.alwaysRevalidate&&e.validate(r)&&t.goto(n)}didModify(){this.lastRevision=this.tag.value()}}class Ze extends Te{constructor(t){super(),this.target=t,this.type="did-modify",this.tag=h}evaluate(){this.target.didModify()}}class tn{constructor(t){this.tag=h,this.type="label",this.label=null,this.prev=null,this.next=null,ye(this),this.label=t}evaluate(){}inspect(){return`${this.label} [${this._guid}]`}}Oe.add(26,(t,{op1:e})=>{t.elements().appendText(t.constants.getString(e))}),Oe.add(27,(t,{op1:e})=>{t.elements().appendComment(t.constants.getString(e))}),Oe.add(33,(t,{op1:e})=>{t.elements().openElement(t.constants.getString(e))}),Oe.add(34,t=>{let e=t.stack.pop().value()
t.elements().openElement(e)}),Oe.add(41,t=>{let e,n,r=t.stack.pop(),i=t.stack.pop(),s=t.stack.pop().value()
if(d(r))e=r.value()
else{let n=new O(r)
e=n.peek(),t.updateWith(new Xe(n))}if(d(i))n=i.value()
else{let e=new O(i)
n=e.peek(),t.updateWith(new Xe(e))}t.elements().pushRemoteElement(e,s,n)}),Oe.add(42,t=>{t.elements().popRemoteElement()}),Oe.add(38,t=>{let e=t.fetchValue(Ae.t0)
e&&(e.flush(t),t.loadValue(Ae.t0,null)),t.elements().flushElement()}),Oe.add(39,t=>{t.elements().closeElement()}),Oe.add(40,(t,{op1:e})=>{let n=t.constants.resolveHandle(e),r=t.stack.pop()
var i=t.elements()
let s=i.constructing,o=i.updateOperations,a=t.dynamicScope(),l=n.create(s,r,a,o)
t.env.scheduleInstallModifier(l,n)
let c=n.getDestructor(l)
c&&t.newDestroyable(c)
let h=n.getTag(l)
f(h)||t.updateWith(new en(h,n,l))})
class en extends Te{constructor(t,e,n){super(),this.tag=t,this.manager=e,this.modifier=n,this.type="update-modifier",this.lastUpdated=t.value()}evaluate(t){let e=this.manager,n=this.modifier,r=this.tag,i=this.lastUpdated
r.validate(i)||(t.env.scheduleUpdateModifier(n,e),this.lastUpdated=r.value())}}Oe.add(35,(t,{op1:e,op2:n,op3:r})=>{let i=t.constants.getString(e),s=t.constants.getString(n),o=r?t.constants.getString(r):null
t.elements().setStaticAttribute(i,s,o)}),Oe.add(36,(t,{op1:e,op2:n,op3:r})=>{let i=t.constants.getString(e),s=t.stack.pop(),o=s.value(),a=r?t.constants.getString(r):null,l=t.elements().setDynamicAttribute(i,o,!!n,a)
d(s)||t.updateWith(new nn(s,l))})
class nn extends Te{constructor(t,e){super(),this.reference=t,this.attribute=e,this.type="patch-element",this.tag=t.tag,this.lastRevision=this.tag.value()}evaluate(t){let e=this.attribute,n=this.reference,r=this.tag
r.validate(this.lastRevision)||(this.lastRevision=r.value(),e.update(n.value(),t.env))}}function rn(t,e,n){return t.lookupComponentDefinition(e,n)}class sn{constructor(t,e,n,r){this.inner=t,this.resolver=e,this.meta=n,this.args=r,this.tag=t.tag,this.lastValue=null,this.lastDefinition=null}value(){let t=this.inner,e=this.lastValue,n=t.value()
if(n===e)return this.lastDefinition
let r=null
if(je(n))r=n
else if("string"==typeof n&&n){r=rn(this.resolver,n,this.meta)}return r=this.curry(r),this.lastValue=n,this.lastDefinition=r,r}get(){return Re}curry(t){let e=this.args
return!e&&je(t)?t:t?new $e(t,e):null}}class on{constructor(t){this.list=t,this.tag=v(t),this.list=t}value(){let t=[],e=this.list
for(let n=0;n<e.length;n++){let r=He(e[n].value())
r&&t.push(r)}return 0===t.length?null:t.join(" ")}}function an(t){return 0|(t.dynamicLayout?1:0)|(t.dynamicTag?2:0)|(t.prepareArgs?4:0)|(t.createArgs?8:0)|(t.attributeHook?16:0)|(t.elementHook?32:0)|(t.dynamicScope?64:0)|(t.createCaller?128:0)|(t.updateHook?256:0)|(t.createInstance?512:0)}function ln(t,e){return!!(t&e)}Oe.add(69,t=>{let e=t.stack,n=e.pop()
e.push(Ge.create(n))}),Oe.add(70,t=>{let e=t.stack,n=e.peek()
e.push(new Ye(n))}),Oe.add(71,(t,{op1:e})=>{let n=t.stack,r=n.pop(),i=n.pop(),s=t.constants.getSerializable(e),o=t.constants.resolver
t.loadValue(Ae.v0,new sn(r,o,s,i))}),Oe.add(72,(t,{op1:e})=>{let n=t.constants.resolveHandle(e),r=n.manager,i=an(r.getCapabilities(n.state)),s={definition:n,manager:r,capabilities:i,state:null,handle:null,table:null,lookup:null}
t.stack.push(s)}),Oe.add(75,(t,{op1:e})=>{let n,r=t.stack,i=r.pop().value(),s=t.constants.getSerializable(e)
if(t.loadValue(Ae.t1,null),"string"==typeof i){n=rn(t.constants.resolver,i,s)}else{if(!je(i))throw de()
n=i}r.push(n)}),Oe.add(73,t=>{let e,n,r=t.stack,i=r.pop()
je(i)?n=e=null:e=an((n=i.manager).getCapabilities(i.state)),r.push({definition:i,capabilities:e,manager:n,state:null,handle:null,table:null})}),Oe.add(74,(t,{op1:e})=>{let n,r=t.stack,i=r.pop().value()
if(!je(i))throw de()
n=i,r.push(n)}),Oe.add(76,(t,{op1:e,op2:n})=>{let r=t.stack,i=t.constants.getStringArray(e),s=n>>4,o=8&n,a=[]
4&n&&a.push("main"),2&n&&a.push("else"),1&n&&a.push("attrs"),t.args.setup(r,i,a,s,!!o),r.push(t.args)}),Oe.add(77,t=>{let e=t.stack
e.push(t.args.empty(e))}),Oe.add(80,t=>{let e=t.stack,n=e.pop().capture()
e.push(n)}),Oe.add(79,(t,{op1:e})=>{let n=t.stack,r=t.fetchValue(e),i=n.pop(),s=r.definition
je(s)&&(s=function(t,e,n){let r=t.definition=e.unwrap(n),i=r.manager,s=r.state
return t.manager=i,t.capabilities=an(i.getCapabilities(s)),r}(r,s,i))
var o=s
let a=o.manager,l=o.state
if(!0!==ln(r.capabilities,4))return void n.push(i)
let c=i.blocks.values,h=i.blocks.names,p=a.prepareArgs(l,i)
if(p){i.clear()
for(let i=0;i<c.length;i++)n.push(c[i])
let t=p.positional,e=p.named,r=t.length
for(let i=0;i<r;i++)n.push(t[i])
let s=Object.keys(e)
for(let i=0;i<s.length;i++)n.push(e[s[i]])
i.setup(n,s,h,r,!0)}n.push(i)}),Oe.add(81,(t,{op1:e,op2:n})=>{let r=t.fetchValue(n),i=r.definition,s=r.manager,o=r.capabilities=an(s.getCapabilities(i.state)),a=null
ln(o,64)&&(a=t.dynamicScope())
let l=1&e,c=null
ln(o,8)&&(c=t.stack.peek())
let h=null
ln(o,128)&&(h=t.getSelf())
let p=s.create(t.env,i.state,c,a,h,!!l)
r.state=p
let u=s.getTag(p)
ln(o,256)&&!f(u)&&t.updateWith(new pn(u,p,s,a))}),Oe.add(82,(t,{op1:e})=>{var n=t.fetchValue(e)
let r=n.manager,i=n.state,s=r.getDestructor(i)
s&&t.newDestroyable(s)}),Oe.add(91,t=>{t.beginCacheGroup(),t.elements().pushSimpleBlock()}),Oe.add(83,t=>{t.loadValue(Ae.t0,new cn)}),Oe.add(37,(t,{op1:e,op2:n,op3:r})=>{let i=t.constants.getString(e),s=t.stack.pop(),o=r?t.constants.getString(r):null
t.fetchValue(Ae.t0).setAttribute(i,s,!!n,o)})
class cn{constructor(){this.attributes=be(),this.classes=[]}setAttribute(t,e,n,r){let i={value:e,namespace:r,trusting:n}
"class"===t&&this.classes.push(e),this.attributes[t]=i}flush(t){for(let e in this.attributes){let n=this.attributes[e],r=n.value,i=n.namespace,s=n.trusting
if("class"===e&&(r=new on(this.classes)),"type"===e)continue
let o=t.elements().setDynamicAttribute(e,r.value(),s,i)
d(r)||t.updateWith(new nn(r,o))}if("type"in this.attributes){let e=this.attributes.type,n=e.value,r=e.namespace,i=e.trusting,s=t.elements().setDynamicAttribute("type",n.value(),i,r)
d(n)||t.updateWith(new nn(n,s))}}}function hn(t,e,n,r,i){let s=n.table.symbols.indexOf(t),o=r.get(e);-1!==s&&i.scope().bindBlock(s+1,o),n.lookup&&(n.lookup[t]=o)}Oe.add(93,(t,{op1:e})=>{var n=t.fetchValue(e)
let r=n.definition,i=n.state,s=r.manager,o=t.fetchValue(Ae.t0)
s.didCreateElement(i,t.elements().expectConstructing("DidCreateElementOpcode#evaluate"),o)}),Oe.add(84,(t,{op1:e})=>{var n=t.fetchValue(e)
let r=n.definition,i=n.state,s=r.manager
t.stack.push(s.getSelf(i))}),Oe.add(85,(t,{op1:e})=>{var n=t.fetchValue(e)
let r=n.definition,i=n.state,s=r.manager
t.stack.push(s.getTagName(i))}),Oe.add(86,(t,{op1:e})=>{let n,r=t.fetchValue(e),i=r.manager,s=r.definition,o=t.constants.resolver,a=t.stack,l=r.state,c=r.capabilities,h=s.state
if(function(t,e){return!1===ln(t,1)}(c))n=i.getLayout(h,o)
else{if(!function(t,e){return!0===ln(t,1)}(c))throw de()
n=i.getDynamicLayout(l,o)}a.push(n.symbolTable),a.push(n.handle)}),Oe.add(68,(t,{op1:e})=>{let n=t.stack.pop(),r=t.stack.pop(),i=n.manager,s=an(i.getCapabilities(n.state)),o={definition:n,manager:i,capabilities:s,state:null,handle:r.handle,table:r.symbolTable,lookup:null}
t.loadValue(e,o)}),Oe.add(89,(t,{op1:e})=>{let n=t.stack,r=n.pop(),i=n.pop(),s=t.fetchValue(e)
s.handle=r,s.table=i}),Oe.add(21,(t,{op1:e})=>{let n=t.fetchValue(e).table.symbols
t.pushRootScope(n.length+1,!0)}),Oe.add(87,(t,{op1:e})=>{let n=t.fetchValue(e)
if(n.table.hasEval){let e=n.lookup=be()
t.scope().bindEvalScope(e)}}),Oe.add(2,(t,{op1:e})=>{let n=t.fetchValue(e),r=t.scope(),i=t.stack.peek(),s=i.named.atNames
for(let o=s.length-1;o>=0;o--){let t=s[o],e=n.table.symbols.indexOf(s[o]),a=i.named.get(t,!1);-1!==e&&r.bindSymbol(e+1,a),n.lookup&&(n.lookup[t]=a)}}),Oe.add(3,(t,{op1:e})=>{let n=t.fetchValue(e)
let r=t.stack.peek().blocks
hn("&attrs","attrs",n,r,t),hn("&inverse","else",n,r,t),hn("&default","main",n,r,t)}),Oe.add(90,(t,{op1:e})=>{let n=t.fetchValue(e)
t.call(n.handle)}),Oe.add(94,(t,{op1:e})=>{var n=t.fetchValue(e)
let r=n.manager,i=n.state,s=t.elements().popBlock()
r.didRenderLayout(i,s),t.env.didCreate(i,r),t.updateWith(new un(r,i,s))}),Oe.add(92,t=>{t.commitCacheGroup()})
class pn extends Te{constructor(t,e,n,r){super(),this.tag=t,this.component=e,this.manager=n,this.dynamicScope=r,this.type="update-component"}evaluate(t){let e=this.component,n=this.manager,r=this.dynamicScope
n.update(e,r)}}class un extends Te{constructor(t,e,n){super(),this.manager=t,this.component=e,this.bounds=n,this.type="did-update-layout",this.tag=h}evaluate(t){let e=this.manager,n=this.component,r=this.bounds
e.didUpdateLayout(n,r),t.env.didUpdate(n,e)}}let dn=function(t,e){console.info("Use `context`, and `get(<path>)` to debug this template."),e("this")}
class fn{constructor(t,e,n){this.scope=t,this.locals=be()
for(let r=0;r<n.length;r++){let i=n[r],s=e[i-1],o=t.getSymbol(i)
this.locals[s]=o}}get(t){let e=this.scope,n=this.locals,r=t.split(".")
var i=t.split(".")
let s,o=i[0],a=i.slice(1),l=e.getEvalScope()
return"this"===o?s=e.getSelf():n[o]?s=n[o]:0===o.indexOf("@")&&l[o]?s=l[o]:(s=this.scope.getSelf(),a=r),a.reduce((t,e)=>t.get(e),s)}}Oe.add(97,(t,{op1:e,op2:n})=>{let r=t.constants.getStringArray(e),i=t.constants.getArray(n),s=new fn(t.scope(),r,i)
dn(t.getSelf().value(),t=>s.get(t).value())}),Oe.add(95,(t,{op1:e,op2:n,op3:r})=>{let i=t.constants,s=t.constants.resolver,o=t.stack.pop().value(),a=i.getSerializable(e),l=i.getStringArray(n),c=i.getArray(r),h=s.lookupPartial(o,a)
var p=s.resolve(h).getPartial()
let u=p.symbolTable,d=p.handle
{let e=u.symbols,n=t.scope(),r=t.pushRootScope(e.length,!1),i=n.getEvalScope()
r.bindCallerScope(n.getCallerScope()),r.bindEvalScope(i),r.bindSelf(n.getSelf())
let s=Object.create(n.getPartialMap())
for(let t=0;t<c.length;t++){let e=c[t],r=l[e-1],i=n.getSymbol(e)
s[r]=i}if(i)for(let t=0;t<e.length;t++){let n=t+1,s=i[e[t]]
void 0!==s&&r.bind(n,s)}r.bindPartialMap(s),t.pushFrame(),t.call(d)}})
class mn{constructor(t){this.tag=t.tag,this.artifacts=t}value(){return!this.artifacts.isEmpty()}}Oe.add(66,t=>{let e=t.stack,n=e.pop(),r=e.pop(),i=t.env.iterableFor(n,r.value()),s=new I(i)
e.push(s),e.push(new mn(s.artifacts))}),Oe.add(64,(t,{op1:e})=>{t.enterList(e)}),Oe.add(65,t=>{t.exitList()}),Oe.add(67,(t,{op1:e})=>{let n=t.stack.peek().next()
if(n){let e=t.iterate(n.memo,n.value)
t.enterItem(n.key,e)}else t.goto(e)})
class gn{constructor(t,e){this.element=t,this.nextSibling=e}}class vn{constructor(t,e,n){this.parentNode=t,this.first=e,this.last=n}parentElement(){return this.parentNode}firstNode(){return this.first}lastNode(){return this.last}}class yn{constructor(t,e){this.parentNode=t,this.node=e}parentElement(){return this.parentNode}firstNode(){return this.node}lastNode(){return this.node}}function bn(t,e){return new yn(t,e)}function kn(t,e){let n=t.parentElement(),r=t.firstNode(),i=t.lastNode(),s=r
for(;s;){let t=s.nextSibling
if(n.insertBefore(s,e),s===i)return t
s=t}return null}function wn(t){let e=t.parentElement(),n=t.firstNode(),r=t.lastNode(),i=n
for(;i;){let t=i.nextSibling
if(e.removeChild(i),i===r)return t
i=t}return null}const xn="http://www.w3.org/2000/svg"
function Sn(t,e,n){if(!t)return e
if(!function(t,e){let n=t.createElementNS(e,"svg")
try{n.insertAdjacentHTML("beforeend","<circle></circle>")}catch(r){}finally{return 1!==n.childNodes.length||n.firstChild.namespaceURI!==xn}}(t,n))return e
let r=t.createElement("div")
return class extends e{insertHTMLBefore(t,e,i){return null===i||""===i?super.insertHTMLBefore(t,e,i):t.namespaceURI!==n?super.insertHTMLBefore(t,e,i):function(t,e,n,r){let i="<svg>"+n+"</svg>"
e.innerHTML=i
var s=function(t,e,n){let r=t.firstChild,i=null,s=r
for(;s;)i=s,s=s.nextSibling,e.insertBefore(i,n)
return[r,i]}(e.firstChild,t,r)
let o=s[0],a=s[1]
return new vn(t,o,a)}(t,r,i,e)}}}function Cn(t,e){return t&&function(t){let e=t.createElement("div")
if(e.innerHTML="first",e.insertAdjacentHTML("beforeend","second"),2===e.childNodes.length)return!1
return!0}(t)?class extends e{constructor(t){super(t),this.uselessComment=t.createComment("")}insertHTMLBefore(t,e,n){if(null===n)return super.insertHTMLBefore(t,e,n)
let r=!1,i=e?e.previousSibling:t.lastChild
i&&i instanceof Text&&(r=!0,t.insertBefore(this.uselessComment,e))
let s=super.insertHTMLBefore(t,e,n)
return r&&t.removeChild(this.uselessComment),s}}:e}const Mn="http://www.w3.org/2000/svg",On={foreignObject:1,desc:1,title:1},En=Object.create(null);["b","big","blockquote","body","br","center","code","dd","div","dl","dt","em","embed","h1","h2","h3","h4","h5","h6","head","hr","i","img","li","listing","main","meta","nobr","ol","p","pre","ruby","s","small","span","strong","strike","sub","sup","table","tt","u","ul","var"].forEach(t=>En[t]=1)
let Tn="undefined"==typeof document?null:document
class An{constructor(t){this.document=t,this.setupUselessElement()}setupUselessElement(){this.uselessElement=this.document.createElement("div")}createElement(t,e){let n,r
if(e?(n=e.namespaceURI===Mn||"svg"===t,r=On[e.tagName]):(n="svg"===t,r=!1),n&&!r){if(En[t])throw new Error(`Cannot create a ${t} inside an SVG context`)
return this.document.createElementNS(Mn,t)}return this.document.createElement(t)}insertBefore(t,e,n){t.insertBefore(e,n)}insertHTMLBefore(t,e,n){return function(t,e,n,r){let i,s=e,o=n,a=o?o.previousSibling:s.lastChild
if(null===r||""===r)return new vn(s,null,null)
null===o?(s.insertAdjacentHTML("beforeend",r),i=s.lastChild):o instanceof HTMLElement?(o.insertAdjacentHTML("beforebegin",r),i=o.previousSibling):(s.insertBefore(t,o),t.insertAdjacentHTML("beforebegin",r),i=t.previousSibling,s.removeChild(t))
let l=a?a.nextSibling:s.firstChild
return new vn(s,l,i)}(this.uselessElement,t,e,n)}createTextNode(t){return this.document.createTextNode(t)}createComment(t){return this.document.createComment(t)}}var Nn;(function(t){class e extends An{createElementNS(t,e){return this.document.createElementNS(t,e)}setAttribute(t,e,n,r=null){r?t.setAttributeNS(r,e,n):t.setAttribute(e,n)}}t.TreeConstruction=e
let n=e
n=Cn(Tn,n),n=Sn(Tn,n,Mn),t.DOMTreeConstruction=n})(Nn||(Nn={}))
let Dn=class extends An{constructor(t){super(t),this.document=t,this.namespace=null}setAttribute(t,e,n){t.setAttribute(e,n)}removeAttribute(t,e){t.removeAttribute(e)}insertAfter(t,e,n){this.insertBefore(t,e,n.nextSibling)}}
Dn=Cn(Tn,Dn)
var _n=Dn=Sn(Tn,Dn,Mn)
const Rn=Nn.DOMTreeConstruction,In=["javascript:","vbscript:"],Bn=["A","BODY","LINK","IMG","IFRAME","BASE","FORM"],zn=["EMBED"],Pn=["href","src","background","action"],Fn=["src"]
function Vn(t,e){return-1!==t.indexOf(e)}function Ln(t,e){return(null===t||Vn(Bn,t))&&Vn(Pn,e)}function jn(t,e){return null!==t&&(Vn(zn,t)&&Vn(Fn,e))}function $n(t,e){return Ln(t,e)||jn(t,e)}function Hn(t,e,n,r){let i=null
if(null==r)return r
if(Je(r))return r.toHTML()
i=e?e.tagName.toUpperCase():null
let s=He(r)
if(Ln(i,n)){let e=t.protocolForURL(s)
if(Vn(In,e))return`unsafe:${s}`}return jn(i,n)?`unsafe:${s}`:s}function Un(t,e){let n,r
if(e in t)r=e,n="prop"
else{let i=e.toLowerCase()
i in t?(n="prop",r=i):(n="attr",r=e)}return"prop"!==n||"style"!==r.toLowerCase()&&!function(t,e){let n=Jn[t.toUpperCase()]
return n&&n[e.toLowerCase()]||!1}(t.tagName,r)||(n="attr"),{normalized:r,type:n}}const Jn={INPUT:{form:!0,autocorrect:!0,list:!0},SELECT:{form:!0},OPTION:{form:!0},TEXTAREA:{form:!0},LABEL:{form:!0},FIELDSET:{form:!0},LEGEND:{form:!0},OBJECT:{form:!0},BUTTON:{form:!0}}
function qn(t,e,n){let r=t.tagName,i={element:t,name:e,namespace:n}
if(t.namespaceURI===Mn)return Wn(r,e,i)
var s=Un(t,e)
let o=s.type,a=s.normalized
return"attr"===o?Wn(r,a,i):function(t,e,n){if($n(t,e))return new Xn(e,n)
if(function(t,e){return("INPUT"===t||"TEXTAREA"===t)&&"value"===e}(t,e))return new Zn(e,n)
if(function(t,e){return"OPTION"===t&&"selected"===e}(t,e))return new tr(e,n)
return new Yn(e,n)}(r,a,i)}function Wn(t,e,n){return $n(t,e)?new Qn(n):new Gn(n)}class Kn{constructor(t){this.attribute=t}}class Gn extends Kn{set(t,e,n){let r=er(e)
if(null!==r){var i=this.attribute
let e=i.name,n=i.namespace
t.__setAttribute(e,r,n)}}update(t,e){let n=er(t)
var r=this.attribute
let i=r.element,s=r.name
null===n?i.removeAttribute(s):i.setAttribute(s,n)}}class Yn extends Kn{constructor(t,e){super(e),this.normalizedName=t}set(t,e,n){null!=e&&(this.value=e,t.__setProperty(this.normalizedName,e))}update(t,e){let n=this.attribute.element
this.value!==t&&(n[this.normalizedName]=this.value=t,null==t&&this.removeAttribute())}removeAttribute(){var t=this.attribute
let e=t.element,n=t.namespace
n?e.removeAttributeNS(n,this.normalizedName):e.removeAttribute(this.normalizedName)}}class Xn extends Yn{set(t,e,n){var r=this.attribute
let i=Hn(n,r.element,r.name,e)
super.set(t,i,n)}update(t,e){var n=this.attribute
let r=Hn(e,n.element,n.name,t)
super.update(r,e)}}class Qn extends Gn{set(t,e,n){var r=this.attribute
let i=Hn(n,r.element,r.name,e)
super.set(t,i,n)}update(t,e){var n=this.attribute
let r=Hn(e,n.element,n.name,t)
super.update(r,e)}}class Zn extends Yn{set(t,e){t.__setProperty("value",He(e))}update(t){let e=this.attribute.element,n=e.value,r=He(t)
n!==r&&(e.value=r)}}class tr extends Yn{set(t,e){null!=e&&!1!==e&&t.__setProperty("selected",!0)}update(t){let e=this.attribute.element
e.selected=!!t}}function er(t){return!1===t||null==t||void 0===t.toString?null:!0===t?"":"function"==typeof t?null:String(t)}class nr{constructor(t,e,n,r){this.slots=t,this.callerScope=e,this.evalScope=n,this.partialMap=r}static root(t,e=0){let n=new Array(e+1)
for(let r=0;r<=e;r++)n[r]=Re
return new nr(n,null,null,null).init({self:t})}static sized(t=0){let e=new Array(t+1)
for(let n=0;n<=t;n++)e[n]=Re
return new nr(e,null,null,null)}init({self:t}){return this.slots[0]=t,this}getSelf(){return this.get(0)}getSymbol(t){return this.get(t)}getBlock(t){let e=this.get(t)
return e===Re?null:e}getEvalScope(){return this.evalScope}getPartialMap(){return this.partialMap}bind(t,e){this.set(t,e)}bindSelf(t){this.set(0,t)}bindSymbol(t,e){this.set(t,e)}bindBlock(t,e){this.set(t,e)}bindEvalScope(t){this.evalScope=t}bindPartialMap(t){this.partialMap=t}bindCallerScope(t){this.callerScope=t}getCallerScope(){return this.callerScope}child(){return new nr(this.slots.slice(),this.callerScope,this.evalScope,this.partialMap)}get(t){if(t>=this.slots.length)throw new RangeError(`BUG: cannot get $${t} from scope; length=${this.slots.length}`)
return this.slots[t]}set(t,e){if(t>=this.slots.length)throw new RangeError(`BUG: cannot get $${t} from scope; length=${this.slots.length}`)
this.slots[t]=e}}class rr{constructor(){this.scheduledInstallManagers=[],this.scheduledInstallModifiers=[],this.scheduledUpdateModifierManagers=[],this.scheduledUpdateModifiers=[],this.createdComponents=[],this.createdManagers=[],this.updatedComponents=[],this.updatedManagers=[],this.destructors=[]}didCreate(t,e){this.createdComponents.push(t),this.createdManagers.push(e)}didUpdate(t,e){this.updatedComponents.push(t),this.updatedManagers.push(e)}scheduleInstallModifier(t,e){this.scheduledInstallManagers.push(e),this.scheduledInstallModifiers.push(t)}scheduleUpdateModifier(t,e){this.scheduledUpdateModifierManagers.push(e),this.scheduledUpdateModifiers.push(t)}didDestroy(t){this.destructors.push(t)}commit(){let t=this.createdComponents,e=this.createdManagers
for(let c=0;c<t.length;c++){let n=t[c]
e[c].didCreate(n)}let n=this.updatedComponents,r=this.updatedManagers
for(let c=0;c<n.length;c++){let t=n[c]
r[c].didUpdate(t)}let i=this.destructors
for(let c=0;c<i.length;c++)i[c].destroy()
let s=this.scheduledInstallManagers,o=this.scheduledInstallModifiers
for(let c=0;c<s.length;c++){let t=s[c],e=o[c]
t.install(e)}let a=this.scheduledUpdateModifierManagers,l=this.scheduledUpdateModifiers
for(let c=0;c<a.length;c++){let t=a[c],e=l[c]
t.update(e)}}}class ir{constructor({appendOperations:t,updateOperations:e}){this._transaction=null,this.appendOperations=t,this.updateOperations=e}toConditionalReference(t){return new Pe(t)}getAppendOperations(){return this.appendOperations}getDOM(){return this.updateOperations}begin(){this._transaction=new rr}get transaction(){return this._transaction}didCreate(t,e){this.transaction.didCreate(t,e)}didUpdate(t,e){this.transaction.didUpdate(t,e)}scheduleInstallModifier(t,e){this.transaction.scheduleInstallModifier(t,e)}scheduleUpdateModifier(t,e){this.transaction.scheduleUpdateModifier(t,e)}didDestroy(t){this.transaction.didDestroy(t)}commit(){let t=this.transaction
this._transaction=null,t.commit()}attributeFor(t,e,n,r=null){return qn(t,e,r)}}class sr{constructor(t,e,n,r,i=-1,s=-1){this.stack=t,this.heap=e,this.program=n,this.externs=r,this.pc=i,this.ra=s,this.currentOpSize=0}pushFrame(){this.stack.pushSmi(this.ra),this.stack.pushSmi(this.stack.fp),this.stack.fp=this.stack.sp-1}popFrame(){this.stack.sp=this.stack.fp-1,this.ra=this.stack.getSmi(0),this.stack.fp=this.stack.getSmi(1)}pushSmallFrame(){this.stack.pushSmi(this.ra)}popSmallFrame(){this.ra=this.stack.popSmi()}goto(t){let e=this.pc+t-this.currentOpSize
this.pc=e}call(t){this.ra=this.pc,this.pc=this.heap.getaddr(t)}returnTo(t){let e=this.pc+t-this.currentOpSize
this.ra=e}return(){this.pc=this.ra}nextStatement(){let t=this.pc,e=this.program
if(-1===t)return null
let n=this.program.opcode(t).size,r=this.currentOpSize=n
return this.pc+=r,e.opcode(t)}evaluateOuter(t,e){this.evaluateInner(t,e)}evaluateInner(t,e){t.isMachine?this.evaluateMachine(t):this.evaluateSyscall(t,e)}evaluateMachine(t){switch(t.type){case 57:return this.pushFrame()
case 58:return this.popFrame()
case 59:return this.pushSmallFrame()
case 60:return this.popSmallFrame()
case 50:return this.call(t.op1)
case 49:return this.call(this.stack.popSmi())
case 52:return this.goto(t.op1)
case 24:return this.return()
case 25:return this.returnTo(t.op1)}}evaluateSyscall(t,e){Oe.evaluate(e,t,t.type)}}class or{constructor(t){this.node=t}firstNode(){return this.node}}class ar{constructor(t){this.node=t}lastNode(){return this.node}}class lr{constructor(t,e,n){this.constructing=null,this.operations=null,this.cursorStack=new ke,this.blockStack=new ke,this.pushElement(e,n),this.env=t,this.dom=t.getAppendOperations(),this.updateOperations=t.getDOM()}static forInitialRender(t,e){let n=new this(t,e.element,e.nextSibling)
return n.pushSimpleBlock(),n}static resume(t,e,n){let r=new this(t,e.parentElement(),n)
return r.pushSimpleBlock(),r.pushBlockTracker(e),r}get element(){return this.cursorStack.current.element}get nextSibling(){return this.cursorStack.current.nextSibling}expectConstructing(t){return this.constructing}block(){return this.blockStack.current}popElement(){this.cursorStack.pop(),this.cursorStack.current}pushSimpleBlock(){return this.pushBlockTracker(new cr(this.element))}pushUpdatableBlock(){return this.pushBlockTracker(new pr(this.element))}pushBlockList(t){return this.pushBlockTracker(new ur(this.element,t))}pushBlockTracker(t,e=!1){let n=this.blockStack.current
return null!==n&&(n.newDestroyable(t),e||n.didAppendBounds(t)),this.__openBlock(),this.blockStack.push(t),t}popBlock(){return this.block().finalize(this),this.__closeBlock(),this.blockStack.pop()}__openBlock(){}__closeBlock(){}openElement(t){let e=this.__openElement(t)
return this.constructing=e,e}__openElement(t){return this.dom.createElement(t,this.element)}flushElement(){let t=this.element,e=this.constructing
this.__flushElement(t,e),this.constructing=null,this.operations=null,this.pushElement(e,null),this.didOpenElement(e)}__flushElement(t,e){this.dom.insertBefore(t,e,this.nextSibling)}closeElement(){this.willCloseElement(),this.popElement()}pushRemoteElement(t,e,n=null){this.__pushRemoteElement(t,e,n)}__pushRemoteElement(t,e,n){this.pushElement(t,n)
let r=new hr(t)
this.pushBlockTracker(r,!0)}popRemoteElement(){this.popBlock(),this.popElement()}pushElement(t,e){this.cursorStack.push(new gn(t,e))}didAddDestroyable(t){this.block().newDestroyable(t)}didAppendBounds(t){return this.block().didAppendBounds(t),t}didAppendNode(t){return this.block().didAppendNode(t),t}didOpenElement(t){return this.block().openElement(t),t}willCloseElement(){this.block().closeElement()}appendText(t){return this.didAppendNode(this.__appendText(t))}__appendText(t){let e=this.dom,n=this.element,r=this.nextSibling,i=e.createTextNode(t)
return e.insertBefore(n,i,r),i}__appendNode(t){return this.dom.insertBefore(this.element,t,this.nextSibling),t}__appendFragment(t){let e=t.firstChild
if(e){let n=function(t,e,n){return new vn(t,e,n)}(this.element,e,t.lastChild)
return this.dom.insertBefore(this.element,t,this.nextSibling),n}return bn(this.element,this.__appendComment(""))}__appendHTML(t){return this.dom.insertHTMLBefore(this.element,this.nextSibling,t)}appendDynamicHTML(t){let e=this.trustedContent(t)
this.didAppendBounds(e)}appendDynamicText(t){let e=this.untrustedContent(t)
return this.didAppendNode(e),e}appendDynamicFragment(t){let e=this.__appendFragment(t)
this.didAppendBounds(e)}appendDynamicNode(t){let e=this.__appendNode(t),n=bn(this.element,e)
this.didAppendBounds(n)}trustedContent(t){return this.__appendHTML(t)}untrustedContent(t){return this.__appendText(t)}appendComment(t){return this.didAppendNode(this.__appendComment(t))}__appendComment(t){let e=this.dom,n=this.element,r=this.nextSibling,i=e.createComment(t)
return e.insertBefore(n,i,r),i}__setAttribute(t,e,n){this.dom.setAttribute(this.constructing,t,e,n)}__setProperty(t,e){this.constructing[t]=e}setStaticAttribute(t,e,n){this.__setAttribute(t,e,n)}setDynamicAttribute(t,e,n,r){let i=this.constructing,s=this.env.attributeFor(i,t,n,r)
return s.set(this,e,this.env),s}}class cr{constructor(t){this.parent=t,this.first=null,this.last=null,this.destroyables=null,this.nesting=0}destroy(){let t=this.destroyables
if(t&&t.length)for(let e=0;e<t.length;e++)t[e].destroy()}parentElement(){return this.parent}firstNode(){return this.first&&this.first.firstNode()}lastNode(){return this.last&&this.last.lastNode()}openElement(t){this.didAppendNode(t),this.nesting++}closeElement(){this.nesting--}didAppendNode(t){0===this.nesting&&(this.first||(this.first=new or(t)),this.last=new ar(t))}didAppendBounds(t){0===this.nesting&&(this.first||(this.first=t),this.last=t)}newDestroyable(t){this.destroyables=this.destroyables||[],this.destroyables.push(t)}finalize(t){this.first||t.appendComment("")}}class hr extends cr{destroy(){super.destroy(),wn(this)}}class pr extends cr{reset(t){let e=this.destroyables
if(e&&e.length)for(let r=0;r<e.length;r++)t.didDestroy(e[r])
let n=wn(this)
return this.first=null,this.last=null,this.destroyables=null,this.nesting=0,n}}class ur{constructor(t,e){this.parent=t,this.boundList=e,this.parent=t,this.boundList=e}destroy(){this.boundList.forEachNode(t=>t.destroy())}parentElement(){return this.parent}firstNode(){let t=this.boundList.head()
return t&&t.firstNode()}lastNode(){let t=this.boundList.tail()
return t&&t.lastNode()}openElement(t){}closeElement(){}didAppendNode(t){}didAppendBounds(t){}newDestroyable(t){}finalize(t){}}class dr{constructor(t=[]){this.vec=t}clone(){return new dr(this.vec.slice())}sliceFrom(t){return new dr(this.vec.slice(t))}slice(t,e){return new dr(this.vec.slice(t,e))}copy(t,e){this.vec[e]=this.vec[t]}writeRaw(t,e){this.vec[t]=e}writeSmi(t,e){var n
this.vec[t]=(n=e)<0?Math.abs(n)<<3|4:n<<3|0}getRaw(t){return this.vec[t]}getSmi(t){return function(t){switch(7&t){case 0:return t>>3
case 4:return-(t>>3)
default:throw new Error("unreachable")}}(this.vec[t])}reset(){this.vec.length=0}len(){return this.vec.length}}const fr=2147483648,mr=2147483647
class gr{constructor(t=new dr,e=[]){this.inner=t,this.js=e}slice(t,e){let n
return n="number"==typeof t&&"number"==typeof e?this.inner.slice(t,e):"number"==typeof t&&void 0===e?this.inner.sliceFrom(t):this.inner.clone(),new gr(n,this.js.slice(t,e))}sliceInner(t,e){let n=[]
for(let r=t;r<e;r++)n.push(this.get(r))
return n}copy(t,e){this.inner.copy(t,e)}write(t,e){if(function(t){let e=typeof t
if(null==t)return!0
switch(e){case"boolean":case"undefined":return!0
case"number":if(t%1!=0)return!1
let n=Math.abs(t)
return!(n>fr)
default:return!1}}(e))this.inner.writeRaw(t,yr(e))
else{let n=this.js.length
this.js.push(e),this.inner.writeRaw(t,n|fr)}}writeSmi(t,e){this.inner.writeSmi(t,e)}writeImmediate(t,e){this.inner.writeRaw(t,e)}get(t){let e=this.inner.getRaw(t)
return e&fr?this.js[e&mr]:function(t){switch(t){case 3:return!1
case 11:return!0
case 19:return null
case 27:return
default:return function(t){switch(7&t){case 0:return t>>3
case 4:return-(t>>3)
default:throw de()}}(t)}}(e)}getSmi(t){return this.inner.getSmi(t)}reset(){this.inner.reset(),this.js.length=0}get length(){return this.inner.len()}}class vr{constructor(t,e,n){this.stack=t,this.fp=e,this.sp=n}static empty(){return new this(new gr,0,-1)}static restore(t){let e=new gr
for(let n=0;n<t.length;n++)e.write(n,t[n])
return new this(e,0,t.length-1)}push(t){this.stack.write(++this.sp,t)}pushSmi(t){this.stack.writeSmi(++this.sp,t)}pushImmediate(t){this.stack.writeImmediate(++this.sp,yr(t))}pushEncodedImmediate(t){this.stack.writeImmediate(++this.sp,t)}pushNull(){this.stack.writeImmediate(++this.sp,19)}dup(t=this.sp){this.stack.copy(t,++this.sp)}copy(t,e){this.stack.copy(t,e)}pop(t=1){let e=this.stack.get(this.sp)
return this.sp-=t,e}popSmi(){return this.stack.getSmi(this.sp--)}peek(t=0){return this.stack.get(this.sp-t)}peekSmi(t=0){return this.stack.getSmi(this.sp-t)}get(t,e=this.fp){return this.stack.get(e+t)}getSmi(t,e=this.fp){return this.stack.getSmi(e+t)}set(t,e,n=this.fp){this.stack.write(n+e,t)}slice(t,e){return this.stack.slice(t,e)}sliceArray(t,e){return this.stack.sliceInner(t,e)}capture(t){let e=this.sp+1,n=e-t
return this.stack.sliceInner(n,e)}reset(){this.stack.reset()}toArray(){return this.stack.sliceInner(this.fp,this.sp+1)}}function yr(t){switch(typeof t){case"number":return function(t){return t<0?Math.abs(t)<<3|4:t<<3|0}(t)
case"boolean":return t?11:3
case"object":return 19
case"undefined":return 27
default:throw de()}}class br{constructor(t,e,{alwaysRevalidate:n=!1}){this.frameStack=new ke,this.env=t,this.constants=e.constants,this.dom=t.getDOM(),this.alwaysRevalidate=n}execute(t,e){let n=this.frameStack
for(this.try(t,e);!n.isEmpty();){let t=this.frame.nextStatement()
null!==t?t.evaluate(this):this.frameStack.pop()}}get frame(){return this.frameStack.current}goto(t){this.frame.goto(t)}try(t,e){this.frameStack.push(new Cr(t,e))}throw(){this.frame.handleException(),this.frameStack.pop()}}class kr extends Te{constructor(t,e,n,r,i){super(),this.start=t,this.state=e,this.runtime=n,this.type="block",this.next=null,this.prev=null,this.children=i,this.bounds=r}parentElement(){return this.bounds.parentElement()}firstNode(){return this.bounds.firstNode()}lastNode(){return this.bounds.lastNode()}evaluate(t){t.try(this.children,null)}destroy(){this.bounds.destroy()}didDestroy(){this.runtime.env.didDestroy(this.bounds)}}class wr extends kr{constructor(t,e,n,r,i){super(t,e,n,r,i),this.type="try",this.tag=this._tag=C.create(h)}didInitializeChildren(){this._tag.inner.update(y(this.children))}evaluate(t){t.try(this.children,this)}handleException(){let t=this.state,e=this.bounds,n=this.children,r=this.start,i=this.prev,s=this.next,o=this.runtime
n.clear()
let a=lr.resume(o.env,e,e.reset(o.env)),l=Br.resume(t,o,a),c=new we
l.execute(r,e=>{e.stack=vr.restore(t.stack),e.updatingOpcodeStack.push(c),e.updateWith(this),e.updatingOpcodeStack.push(n)}),this.prev=i,this.next=s}}class xr{constructor(t,e){this.opcode=t,this.marker=e,this.didInsert=!1,this.didDelete=!1,this.map=t.map,this.updating=t.children}insert(t,e,n,r){let i=this.map,s=this.opcode,o=this.updating,a=null,l=null
a=r?(l=i[r]).bounds.firstNode():this.marker
let c=s.vmForInsertion(a),h=null,p=s.start
c.execute(p,r=>{i[t]=h=r.iterate(n,e),r.updatingOpcodeStack.push(new we),r.updateWith(h),r.updatingOpcodeStack.push(h.children)}),o.insertBefore(h,l),this.didInsert=!0}retain(t,e,n){}move(t,e,n,r){let i=this.map,s=this.updating,o=i[t],a=i[r]||null
kn(o,r?a.firstNode():this.marker),s.remove(o),s.insertBefore(o,a)}delete(t){let e=this.map,n=e[t]
n.didDestroy(),wn(n),this.updating.remove(n),delete e[t],this.didDelete=!0}done(){this.opcode.didInitializeChildren(this.didInsert||this.didDelete)}}class Sr extends kr{constructor(t,e,n,r,s,o){super(t,e,n,r,s),this.type="list-block",this.map=be(),this.lastIterated=i,this.artifacts=o
let a=this._tag=C.create(h)
this.tag=b([o.tag,a])}didInitializeChildren(t=!0){this.lastIterated=this.artifacts.tag.value(),t&&this._tag.inner.update(y(this.children))}evaluate(t){let e=this.artifacts,n=this.lastIterated
if(!e.tag.validate(n)){let n=this.bounds,r=t.dom,i=r.createComment("")
r.insertAfter(n.parentElement(),i,n.lastNode())
let s=new xr(this,i)
new z({target:s,artifacts:e}).sync(),this.parentElement().removeChild(i)}super.evaluate(t)}vmForInsertion(t){let e=this.bounds,n=this.state,r=this.runtime,i=lr.forInitialRender(r.env,{element:e.parentElement(),nextSibling:t})
return Br.resume(n,r,i)}}class Cr{constructor(t,e){this.ops=t,this.exceptionHandler=e,this.current=t.head()}goto(t){this.current=t}nextStatement(){let t=this.current,e=this.ops
return t&&(this.current=e.nextNode(t)),t}handleException(){this.exceptionHandler&&this.exceptionHandler.handleException()}}class Mr{constructor(t,e,n,r){this.env=t,this.program=e,this.updating=n,this.bounds=r}rerender({alwaysRevalidate:t=!1}={alwaysRevalidate:!1}){let e=this.env,n=this.program,r=this.updating
new br(e,n,{alwaysRevalidate:t}).execute(r,this)}parentElement(){return this.bounds.parentElement()}firstNode(){return this.bounds.firstNode()}lastNode(){return this.bounds.lastNode()}handleException(){throw"this should never happen"}destroy(){this.bounds.destroy(),wn(this.bounds)}}class Or{constructor(){this.stack=null,this.positional=new Er,this.named=new Ar,this.blocks=new Dr}empty(t){let e=t.sp+1
return this.named.empty(t,e),this.positional.empty(t,e),this.blocks.empty(t,e),this}setup(t,e,n,r,i){this.stack=t
let s=this.named,o=e.length,a=t.sp-o+1
s.setup(t,a,o,e,i)
let l=a-r
this.positional.setup(t,l,r)
let c=this.blocks,h=n.length,p=l-3*h
c.setup(t,p,h,n)}get tag(){return v([this.positional,this.named])}get base(){return this.blocks.base}get length(){return this.positional.length+this.named.length+3*this.blocks.length}at(t){return this.positional.at(t)}realloc(t){let e=this.stack
if(t>0&&null!==e){let n=this.positional,r=this.named,i=n.base+t
for(let t=n.length+r.length-1;t>=0;t--)e.copy(t+n.base,t+i)
n.base+=t,r.base+=t,e.sp+=t}}capture(){let t=0===this.positional.length?Ir:this.positional.capture(),e=0===this.named.length?Rr:this.named.capture()
return{tag:this.tag,length:this.length,positional:t,named:e}}clear(){let t=this.stack,e=this.length
e>0&&null!==t&&t.pop(e)}}class Er{constructor(){this.base=0,this.length=0,this.stack=null,this._tag=null,this._references=null}empty(t,e){this.stack=t,this.base=e,this.length=0,this._tag=h,this._references=Se}setup(t,e,n){this.stack=t,this.base=e,this.length=n,0===n?(this._tag=h,this._references=Se):(this._tag=null,this._references=null)}get tag(){let t=this._tag
return t||(t=this._tag=v(this.references)),t}at(t){let e=this.base,n=this.length,r=this.stack
return t<0||t>=n?Re:r.get(t,e)}capture(){return new Tr(this.tag,this.references)}prepend(t){let e=t.length
if(e>0){let n=this.base,r=this.length,i=this.stack
this.base=n-=e,this.length=r+e
for(let s=0;s<e;s++)i.set(t.at(s),s,n)
this._tag=null,this._references=null}}get references(){let t=this._references
if(!t){let e=this.stack,n=this.base,r=this.length
t=this._references=e.sliceArray(n,n+r)}return t}}class Tr{constructor(t,e,n=e.length){this.tag=t,this.references=e,this.length=n}static empty(){return new Tr(h,Se,0)}at(t){return this.references[t]}value(){return this.references.map(this.valueOf)}get(t){let e=this.references,n=this.length
if("length"===t)return Ne.create(n)
{let r=parseInt(t,10)
return r<0||r>=n?Re:e[r]}}valueOf(t){return t.value()}}class Ar{constructor(){this.base=0,this.length=0,this._references=null,this._names=Se,this._atNames=Se}empty(t,e){this.stack=t,this.base=e,this.length=0,this._references=Se,this._names=Se,this._atNames=Se}setup(t,e,n,r,i){this.stack=t,this.base=e,this.length=n,0===n?(this._references=Se,this._names=Se,this._atNames=Se):(this._references=null,i?(this._names=r,this._atNames=null):(this._names=null,this._atNames=r))}get tag(){return v(this.references)}get names(){let t=this._names
return t||(t=this._names=this._atNames.map(this.toSyntheticName)),t}get atNames(){let t=this._atNames
return t||(t=this._atNames=this._names.map(this.toAtName)),t}has(t){return-1!==this.names.indexOf(t)}get(t,e=!0){let n=this.base,r=this.stack,i=(e?this.names:this.atNames).indexOf(t)
return-1===i?Re:r.get(i,n)}capture(){return new Nr(this.tag,this.names,this.references)}merge(t){let e=t.length
if(e>0){let n=this.names,r=this.length,i=this.stack,s=t.names
Object.isFrozen(n)&&0===n.length&&(n=[])
for(let o=0;o<e;o++){let e=s[o];-1===n.indexOf(e)&&(r=n.push(e),i.push(t.references[o]))}this.length=r,this._references=null,this._names=n,this._atNames=null}}get references(){let t=this._references
if(!t){let e=this.base,n=this.length,r=this.stack
t=this._references=r.sliceArray(e,e+n)}return t}toSyntheticName(t){return t.slice(1)}toAtName(t){return`@${t}`}}class Nr{constructor(t,e,n){this.tag=t,this.names=e,this.references=n,this.length=e.length,this._map=null}get map(){let t=this._map
if(!t){let e=this.names,n=this.references
t=this._map=be()
for(let r=0;r<e.length;r++){t[e[r]]=n[r]}}return t}has(t){return-1!==this.names.indexOf(t)}get(t){let e=this.names,n=this.references,r=e.indexOf(t)
return-1===r?Re:n[r]}value(){let t=this.names,e=this.references,n=be()
for(let r=0;r<t.length;r++){n[t[r]]=e[r].value()}return n}}class Dr{constructor(){this.internalValues=null,this.internalTag=null,this.names=Se,this.length=0,this.base=0}empty(t,e){this.stack=t,this.names=Se,this.base=e,this.length=0,this.internalTag=h,this.internalValues=Se}setup(t,e,n,r){this.stack=t,this.names=r,this.base=e,this.length=n,0===n?(this.internalTag=h,this.internalValues=Se):(this.internalTag=null,this.internalValues=null)}get values(){let t=this.internalValues
if(!t){let e=this.base,n=this.length,r=this.stack
t=this.internalValues=r.sliceArray(e,e+3*n)}return t}has(t){return-1!==this.names.indexOf(t)}get(t){let e=this.base,n=this.stack,r=this.names,i=r.indexOf(t)
if(-1===r.indexOf(t))return null
let s=n.get(3*i,e),o=n.get(3*i+1,e),a=n.get(3*i+2,e)
return null===a?null:[a,o,s]}capture(){return new _r(this.names,this.values)}}class _r{constructor(t,e){this.names=t,this.values=e,this.length=t.length}has(t){return-1!==this.names.indexOf(t)}get(t){let e=this.names.indexOf(t)
return-1===e?null:[this.values[3*e+2],this.values[3*e+1],this.values[3*e]]}}const Rr=new Nr(h,Se,Se),Ir=new Tr(h,Se)
class Br{constructor(t,e,n,r){this.runtime=t,this.elementStack=r,this.dynamicScopeStack=new ke,this.scopeStack=new ke,this.updatingOpcodeStack=new ke,this.cacheGroups=new ke,this.listBlockStack=new ke,this.s0=null,this.s1=null,this.t0=null,this.t1=null,this.v0=null,this.heap=this.program.heap,this.constants=this.program.constants,this.elementStack=r,this.scopeStack.push(e),this.dynamicScopeStack.push(n),this.args=new Or,this.inner=new sr(vr.empty(),this.heap,t.program,{debugBefore:t=>Oe.debugBefore(this,t,t.type),debugAfter:(t,e)=>{Oe.debugAfter(this,t,t.type,e)}})}get stack(){return this.inner.stack}set stack(t){this.inner.stack=t}set currentOpSize(t){this.inner.currentOpSize=t}get currentOpSize(){return this.inner.currentOpSize}get pc(){return this.inner.pc}set pc(t){this.inner.pc=t}get ra(){return this.inner.ra}set ra(t){this.inner.ra=t}get fp(){return this.stack.fp}set fp(t){this.stack.fp=t}get sp(){return this.stack.sp}set sp(t){this.stack.sp=t}fetch(t){this.stack.push(this[Ae[t]])}load(t){this[Ae[t]]=this.stack.pop()}fetchValue(t){return this[Ae[t]]}loadValue(t,e){this[Ae[t]]=e}pushFrame(){this.inner.pushFrame()}popFrame(){this.inner.popFrame()}goto(t){this.inner.goto(t)}call(t){this.inner.call(t)}returnTo(t){this.inner.returnTo(t)}return(){this.inner.return()}static initial(t,e,n,r,i,s){let o=t.heap.scopesizeof(s),a=nr.root(n,o),l=new Br({program:t,env:e},a,r,i)
return l.pc=l.heap.getaddr(s),l.updatingOpcodeStack.push(new we),l}static empty(t,e,n){let r={get:()=>Re,set:()=>Re,child:()=>r},i=new Br({program:t,env:e},nr.root(Re,0),r,n)
return i.updatingOpcodeStack.push(new we),i}static resume({scope:t,dynamicScope:e},n,r){return new Br(n,t,e,r)}get program(){return this.runtime.program}get env(){return this.runtime.env}capture(t){return{dynamicScope:this.dynamicScope(),scope:this.scope(),stack:this.stack.capture(t)}}beginCacheGroup(){this.cacheGroups.push(this.updating().tail())}commitCacheGroup(){let t=new tn("END"),e=this.updating(),n=this.cacheGroups.pop(),r=n?e.nextNode(n):e.head(),i=e.tail(),s=y(new xe(r,i)),o=new Qe(s,t)
e.insertBefore(o,r),e.append(new Ze(o)),e.append(t)}enter(t){let e=new we,n=this.capture(t),r=this.elements().pushUpdatableBlock(),i=new wr(this.heap.gethandle(this.pc),n,this.runtime,r,e)
this.didEnter(i)}iterate(t,e){let n=this.stack
n.push(e),n.push(t)
let r=this.capture(2),i=this.elements().pushUpdatableBlock()
return new wr(this.heap.gethandle(this.pc),r,this.runtime,i,new we)}enterItem(t,e){this.listBlock().map[t]=e,this.didEnter(e)}enterList(t){let e=new we,n=this.capture(0),r=this.elements().pushBlockList(e),i=this.stack.peek().artifacts,s=this.pc+t-this.currentOpSize,o=this.heap.gethandle(s),a=new Sr(o,n,this.runtime,r,e,i)
this.listBlockStack.push(a),this.didEnter(a)}didEnter(t){this.updateWith(t),this.updatingOpcodeStack.push(t.children)}exit(){this.elements().popBlock(),this.updatingOpcodeStack.pop(),this.updating().tail().didInitializeChildren()}exitList(){this.exit(),this.listBlockStack.pop()}updateWith(t){this.updating().append(t)}listBlock(){return this.listBlockStack.current}updating(){return this.updatingOpcodeStack.current}elements(){return this.elementStack}scope(){return this.scopeStack.current}dynamicScope(){return this.dynamicScopeStack.current}pushChildScope(){this.scopeStack.push(this.scope().child())}pushDynamicScope(){let t=this.dynamicScope().child()
return this.dynamicScopeStack.push(t),t}pushRootScope(t,e){let n=nr.sized(t)
return e&&n.bindCallerScope(this.scope()),this.scopeStack.push(n),n}pushScope(t){this.scopeStack.push(t)}popScope(){this.scopeStack.pop()}popDynamicScope(){this.dynamicScopeStack.pop()}newDestroyable(t){this.elements().didAddDestroyable(t)}getSelf(){return this.scope().getSelf()}referenceForSymbol(t){return this.scope().getSymbol(t)}execute(t,e){let n
for(this.pc=this.heap.getaddr(t),e&&e(this);!(n=this.next()).done;);return n.value}next(){let t,e=this.env,n=this.program,r=this.updatingOpcodeStack,i=this.elementStack,s=this.inner.nextStatement()
return null!==s?(this.inner.evaluateOuter(s,this),t={done:!1,value:null}):(this.stack.reset(),t={done:!0,value:new Mr(e,n,r.pop(),i.popBlock())}),t}bindDynamicScope(t){let e=this.dynamicScope()
for(let n=t.length-1;n>=0;n--){let r=this.constants.getString(t[n])
e.set(r,this.stack.pop())}}}class zr{constructor(t){this.vm=t}next(){return this.vm.next()}}class Pr{constructor(t,e){this.position=0,this.array=t,this.keyFor=e}isEmpty(){return 0===this.array.length}next(){let t=this.position,e=this.array,n=this.keyFor
if(t>=e.length)return null
let r=e[t],i=n(r,t),s=t
return this.position++,{key:i,value:r,memo:s}}}class Fr{constructor(t,e,n){this.position=0,this.keys=t,this.values=e,this.keyFor=n}isEmpty(){return 0===this.keys.length}next(){let t=this.position,e=this.keys,n=this.values,r=this.keyFor
if(t>=e.length)return null
let i=n[t],s=e[t],o=r(i,s)
return this.position++,{key:o,value:i,memo:s}}}const Vr=new class{isEmpty(){return!0}next(){throw new Error("Cannot call next() on an empty iterator")}}
class Lr{constructor(t,e){this.tag=t.tag,this.ref=t,this.keyFor=e}iterate(){let t=this.ref,e=this.keyFor,n=t.value()
if(Array.isArray(n))return n.length>0?new Pr(n,e):Vr
if(null==n)return Vr
if(void 0!==n.forEach){let t=[]
return n.forEach(function(e){t.push(e)}),t.length>0?new Pr(t,e):Vr}if("object"==typeof n){let t=Object.keys(n)
return t.length>0?new Fr(t,t.map(t=>n[t]),e):Vr}throw new Error(`Don't know how to {{#each ${n}}}`)}valueReferenceFor(t){return new ne(t.value)}updateValueReference(t,e){t.update(e.value)}memoReferenceFor(t){return new ne(t.memo)}updateMemoReference(t,e){t.update(e.memo)}}class jr extends ir{static create(t={}){return t.document=t.document||self.document,t.appendOperations=t.appendOperations||new Rn(t.document),new jr(t)}constructor(t){super({appendOperations:t.appendOperations,updateOperations:new _n(t.document||document)}),ue(this,pe(t)),this.uselessAnchor=t.document.createElement("a")}protocolForURL(t){return this.uselessAnchor.href=t,this.uselessAnchor.protocol}iterableFor(t,e){let n
if(!e)throw new Error("Must specify a key for #each")
switch(e){case"@index":n=((t,e)=>String(e))
break
case"@primitive":n=(t=>String(t))
break
default:n=(t=>t[e])}return new Lr(t,n)}getOwner(){return pe(this)}setOwner(t,e){ue(t,e)}}const $r="object"==typeof document?document:null
class Hr{constructor(t){this._roots=[],this._rootsIndex=0,this._initializers=[],this._initialized=!1,this._rendering=!1,this._rendered=!1,this._scheduled=!1,this._notifiers=[],this.rootName=t.rootName,this.resolver=t.resolver,fe(t.loader,"Must provide a Loader for preparing templates and other metadata required for a Glimmer Application."),fe(t.renderer,"Must provide a Renderer to render the templates produced by the Loader."),fe(t.builder,"Must provide a Builder that is responsible to building DOM."),this.document=t.document||$r,this.loader=t.loader,this.renderer=t.renderer,this.builder=t.builder}renderComponent(t,e,n=null){let r=this._roots,i=this._self
r.push({id:this._rootsIndex++,component:t,parent:e,nextSibling:n}),i&&(i.update({roots:r}),this.scheduleRerender())}async boot(){this.initialize(),this.env=this.lookup(`environment:/${this.rootName}/main/main`),await this._render()}scheduleRerender(){!this._scheduled&&this._rendered&&(this._rendering=!0,this._scheduled=!0,setTimeout(async()=>{this._scheduled=!1,await this._rerender(),this._rendering=!1},0))}initialize(){this.initRegistry(),this.initContainer()}registerInitializer(t){this._initializers.push(t)}initRegistry(){let t=this._registry=new ce,e=new Ce(this._registry,this.resolver)
t.register(`environment:/${this.rootName}/main/main`,jr),t.registerOption("helper","instantiate",!1),t.registerOption("template","instantiate",!1),t.register(`document:/${this.rootName}/main/main`,this.document),t.registerOption("document","instantiate",!1),t.registerInjection("environment","document",`document:/${this.rootName}/main/main`),t.registerInjection("component-manager","env",`environment:/${this.rootName}/main/main`)
let n=this._initializers
for(let r=0;r<n.length;r++)n[r].initialize(e)
this._initialized=!0}initContainer(){this._container=new le(this._registry,this.resolver),this._container.defaultInjections=(t=>{let e={}
return ue(e,this),e})}async _render(){let t=this.env,e=this._self=new ne({roots:this._roots}),n=new Me,r=this.builder.getBuilder(t),i=await this.loader.getTemplateIterator(this,t,r,n,e)
try{t.begin(),await this.renderer.render(i),t.commit(),this._didRender()}catch(s){this._didError(s)}}async _rerender(){let t=this.env
try{t.begin(),await this.renderer.rerender(),t.commit(),this._didRender()}catch(e){this._didError(e)}}_didRender(){this._rendered=!0
let t=this._notifiers
this._notifiers=[],t.forEach(t=>t[0]())}_didError(t){let e=this._notifiers
this._notifiers=[],e.forEach(e=>e[1](t))}identify(t,e){return this.resolver.identify(t,e)}factoryFor(t,e){return this._container.factoryFor(this.identify(t,e))}lookup(t,e){return this._container.lookup(this.identify(t,e))}}class Ur{constructor(){this.byName=be(),this.byHandle=be()}hasName(t){return t in this.byName}getHandle(t){return this.byName[t]}hasHandle(t){return t in this.byHandle}getByHandle(t){return this.byHandle[t]}register(t,e,n){this.byHandle[t]=n,this.byName[e]=t}}class Jr extends Xt{constructor(t,e){super(),this.helper=t,this.tag=e.tag,this.args=e.capture()}compute(){let t=this.helper,e=this.args
return t(e.positional.value(),e.named.value())}}var qr
function Wr(t){return function(e){return Array.isArray(e)&&e[0]===t}}(function(t){t[t.Text=0]="Text",t[t.Append=1]="Append",t[t.Comment=2]="Comment",t[t.Modifier=3]="Modifier",t[t.Block=4]="Block",t[t.Component=5]="Component",t[t.OpenElement=6]="OpenElement",t[t.OpenSplattedElement=7]="OpenSplattedElement",t[t.FlushElement=8]="FlushElement",t[t.CloseElement=9]="CloseElement",t[t.StaticAttr=10]="StaticAttr",t[t.DynamicAttr=11]="DynamicAttr",t[t.AttrSplat=12]="AttrSplat",t[t.Yield=13]="Yield",t[t.Partial=14]="Partial",t[t.DynamicArg=15]="DynamicArg",t[t.StaticArg=16]="StaticArg",t[t.TrustingAttr=17]="TrustingAttr",t[t.Debugger=18]="Debugger",t[t.ClientSideStatement=19]="ClientSideStatement",t[t.Unknown=20]="Unknown",t[t.Get=21]="Get",t[t.MaybeLocal=22]="MaybeLocal",t[t.HasBlock=23]="HasBlock",t[t.HasBlockParams=24]="HasBlockParams",t[t.Undefined=25]="Undefined",t[t.Helper=26]="Helper",t[t.Concat=27]="Concat",t[t.ClientSideExpression=28]="ClientSideExpression"})(qr||(qr={}))
Wr(qr.Modifier),Wr(qr.FlushElement),Wr(qr.Get),Wr(qr.MaybeLocal)
var Kr;(function(t){t[t.OpenComponentElement=0]="OpenComponentElement",t[t.DidCreateElement=1]="DidCreateElement",t[t.SetComponentAttrs=2]="SetComponentAttrs",t[t.DidRenderLayout=3]="DidRenderLayout",t[t.Debugger=4]="Debugger"})(Kr||(Kr={}))
var Gr=qr
const Yr="&attrs"
class Xr{constructor(t=0){this.offset=t,this.names=be(),this.funcs=[]}add(t,e){this.funcs.push(e),this.names[t]=this.funcs.length-1}compile(t,e){let n=t[this.offset],r=this.names[n];(0,this.funcs[r])(t,e)}}let Qr,Zr
function ti(t,e,n){let r=t[1],i=t[2],s=t[3]
n.expr(i),s?n.dynamicAttr(r,s,e):n.dynamicAttr(r,null,e)}class ei{constructor(){var t=function(t=new ni,e=new ri){return t.add("if",(t,e,n,r,i)=>{if(!t||1!==t.length)throw new Error("SYNTAX ERROR: #if requires a single argument")
i.replayableIf({args:()=>(i.expr(t[0]),i.toBoolean(),1),ifTrue(){i.invokeStaticBlock(n)},ifFalse(){r&&i.invokeStaticBlock(r)}})}),t.add("unless",(t,e,n,r,i)=>{if(!t||1!==t.length)throw new Error("SYNTAX ERROR: #unless requires a single argument")
i.replayableIf({args:()=>(i.expr(t[0]),i.toBoolean(),1),ifTrue(){r&&i.invokeStaticBlock(r)},ifFalse(){i.invokeStaticBlock(n)}})}),t.add("with",(t,e,n,r,i)=>{if(!t||1!==t.length)throw new Error("SYNTAX ERROR: #with requires a single argument")
i.replayableIf({args:()=>(i.expr(t[0]),i.dup(),i.toBoolean(),2),ifTrue(){i.invokeStaticBlock(n,1)},ifFalse(){r&&i.invokeStaticBlock(r)}})}),t.add("each",(t,e,n,r,i)=>{i.replayable({args:()=>(e&&"key"===e[0][0]?i.expr(e[1][0]):i.pushPrimitiveReference(null),i.expr(t[0]),2),body(){i.putIterator(),i.jumpUnless("ELSE"),i.pushFrame(),i.dup(Ae.fp,1),i.returnTo("ITER"),i.enterList("BODY"),i.label("ITER"),i.iterate("BREAK"),i.label("BODY"),i.invokeStaticBlock(n,2),i.pop(2),i.jump("FINALLY"),i.label("BREAK"),i.exitList(),i.popFrame(),i.jump("FINALLY"),i.label("ELSE"),r&&i.invokeStaticBlock(r)}})}),t.add("in-element",(t,e,n,r,i)=>{if(!t||1!==t.length)throw new Error("SYNTAX ERROR: #in-element requires a single argument")
i.replayableIf({args(){let n=e[0],r=e[1]
for(let t=0;t<n.length;t++){let e=n[t]
if("nextSibling"!==e&&"guid"!==e)throw new Error(`SYNTAX ERROR: #in-element does not take a \`${n[0]}\` option`)
i.expr(r[t])}return i.expr(t[0]),i.dup(),4},ifTrue(){i.pushRemoteElement(),i.invokeStaticBlock(n),i.popRemoteElement()}})}),t.add("-with-dynamic-vars",(t,e,n,r,i)=>{if(e){let t=e[0],r=e[1]
i.compileParams(r),i.pushDynamicScope(),i.bindDynamicScope(t),i.invokeStaticBlock(n),i.popDynamicScope()}else i.invokeStaticBlock(n)}),t.add("component",(t,e,n,r,i)=>{if("string"==typeof t[0]&&i.staticComponentHelper(t[0],e,n))return
let s=t[0],o=t.slice(1)
i.dynamicComponent(s,o,e,!0,n,r)}),e.add("component",(t,e,n,r)=>{let i=e&&e[0]
if("string"==typeof i&&r.staticComponentHelper(i,n,null))return!0
let s=e[0],o=e.slice(1)
return r.dynamicComponent(s,o,n,!0,null,null),!0}),{blocks:t,inlines:e}}()
let e=t.blocks,n=t.inlines
this.blocks=e,this.inlines=n}}class ni{constructor(){this.names=be(),this.funcs=[]}add(t,e){this.funcs.push(e),this.names[t]=this.funcs.length-1}addMissing(t){this.missing=t}compile(t,e,n,r,i,s){let o=this.names[t]
if(void 0===o){(0,this.missing)(t,e,n,r,i,s)}else{(0,this.funcs[o])(e,n,r,i,s)}}}class ri{constructor(){this.names=be(),this.funcs=[]}add(t,e){this.funcs.push(e),this.names[t]=this.funcs.length-1}addMissing(t){this.missing=t}compile(t,e){let n,r,i,s=t[1]
if(!Array.isArray(s))return["expr",s]
if(s[0]===Gr.Helper)n=s[1],r=s[2],i=s[3]
else{if(s[0]!==Gr.Unknown)return["expr",s]
n=s[1],r=i=null}let o=this.names[n]
if(void 0===o&&this.missing){let t=(0,this.missing)(n,r,i,e)
return!1===t?["expr",s]:t}if(void 0!==o){let t=(0,this.funcs[o])(n,r,i,e)
return!1===t?["expr",s]:t}return["expr",s]}}const ii=-1
class si{constructor(t,e){this.compiler=t,this.layout=e,this.compiled=null}get symbolTable(){return this.layout.block}compile(){if(null!==this.compiled)return this.compiled
this.compiled=ii
let t=this.layout.block.statements
return this.compiled=this.compiler.add(t,this.layout)}}class oi{constructor(t,e){this.compiler=t,this.parsed=e,this.compiled=null}get symbolTable(){return this.parsed.block}compile(){if(null!==this.compiled)return this.compiled
this.compiled=ii
var t=this.parsed
let e=t.block.statements,n=t.containingLayout
return this.compiled=this.compiler.add(e,n)}}function ai(t,e,n){let r=function(){if(Qr)return Qr
const t=Qr=new Xr
t.add(Gr.Text,(t,e)=>{e.text(t[1])}),t.add(Gr.Comment,(t,e)=>{e.comment(t[1])}),t.add(Gr.CloseElement,(t,e)=>{e.closeElement()}),t.add(Gr.FlushElement,(t,e)=>{e.flushElement()}),t.add(Gr.Modifier,(t,e)=>{let n=e.referrer,r=t[1],i=t[2],s=t[3],o=e.compiler.resolveModifier(r,n)
if(null===o)throw new Error(`Compile Error ${r} is not a modifier: Helpers may not be used in the element form.`)
e.modifier(o,i,s)}),t.add(Gr.StaticAttr,(t,e)=>{let n=t[1],r=t[2],i=t[3]
e.staticAttr(n,i,r)}),t.add(Gr.DynamicAttr,(t,e)=>{ti(t,!1,e)}),t.add(Gr.TrustingAttr,(t,e)=>{ti(t,!0,e)}),t.add(Gr.OpenElement,(t,e)=>{e.openPrimitiveElement(t[1])}),t.add(Gr.OpenSplattedElement,(t,e)=>{e.setComponentAttrs(!0),e.putComponentOperations(),e.openPrimitiveElement(t[1])}),t.add(Gr.Component,(t,e)=>{let n=t[1],r=t[2],i=t[3],s=t[4],o=e.referrer
var a=e.compiler.resolveLayoutForTag(n,o)
let l=a.handle,c=a.capabilities,h=a.compilable
if(null===l||null===c)throw new Error(`Compile Error: Cannot find component ${n}`)
{let t=[[Gr.ClientSideStatement,Kr.SetComponentAttrs,!0],...r,[Gr.ClientSideStatement,Kr.SetComponentAttrs,!1]],n=e.inlineBlock({statements:t,parameters:Se}),o=e.template(s)
h?(e.pushComponentDefinition(l),e.invokeStaticComponent(c,h,n,null,i,!1,o&&o)):(e.pushComponentDefinition(l),e.invokeComponent(c,n,null,i,!1,o&&o))}}),t.add(Gr.Partial,(t,e)=>{let n=t[1],r=t[2],i=e.referrer
e.replayableIf({args:()=>(e.expr(n),e.dup(),2),ifTrue(){e.invokePartial(i,e.evalSymbols(),r),e.popScope(),e.popFrame()}})}),t.add(Gr.Yield,(t,e)=>{let n=t[1],r=t[2]
e.yield(n,r)}),t.add(Gr.AttrSplat,(t,e)=>{let n=t[1]
e.yield(n,[]),e.setComponentAttrs(!1)}),t.add(Gr.Debugger,(t,e)=>{let n=t[1]
e.debugger(e.evalSymbols(),n)}),t.add(Gr.ClientSideStatement,(t,n)=>{e.compile(t,n)}),t.add(Gr.Append,(t,e)=>{let n=t[1],r=t[2]
!0!==(e.compileInline(t)||n)&&e.guardedAppend(n,r)}),t.add(Gr.Block,(t,e)=>{let n=t[1],r=t[2],i=t[3],s=t[4],o=t[5],a=e.template(s),l=e.template(o),c=a&&a,h=l&&l
e.compileBlock(n,r,i,c,h)})
const e=new Xr(1)
return e.add(Kr.OpenComponentElement,(t,e)=>{e.putComponentOperations(),e.openPrimitiveElement(t[2])}),e.add(Kr.DidCreateElement,(t,e)=>{e.didCreateElement(Ae.s0)}),e.add(Kr.SetComponentAttrs,(t,e)=>{e.setComponentAttrs(t[2])}),e.add(Kr.Debugger,()=>{}),e.add(Kr.DidRenderLayout,(t,e)=>{e.didRenderLayout(Ae.s0)}),t}()
for(let i=0;i<t.length;i++)r.compile(t[i],e)
return e.commit()}class li{constructor(t,e,n){this.main=t,this.trustingGuardedAppend=e,this.cautiousGuardedAppend=n}static compile(t){let e=this.std(t,t=>t.main()),n=this.std(t,t=>t.stdAppend(!0)),r=this.std(t,t=>t.stdAppend(!1))
return new li(e,n,r)}static std(t,e){return fi.build(t,e)}getAppend(t){return t?this.trustingGuardedAppend:this.cautiousGuardedAppend}}class ci{constructor(t,e,n){this.macros=t,this.program=e,this.resolver=n,this.initialize()}initialize(){this.stdLib=li.compile(this)}get constants(){return this.program.constants}compileInline(t,e){return this.macros.inlines.compile(t,e)}compileBlock(t,e,n,r,i,s){this.macros.blocks.compile(t,e,n,r,i,s)}add(t,e){return ai(t,this.builderFor(e))}commit(t,e){let n=this.program.heap,r=n.malloc()
for(let i=0;i<e.length;i++){let t=e[i]
"function"==typeof t?n.pushPlaceholder(t):n.push(t)}return n.finishMalloc(r,t),r}resolveLayoutForTag(t,e){let n=this.resolver.lookupComponentDefinition(t,e)
return null===n?{handle:null,capabilities:null,compilable:null}:this.resolveLayoutForHandle(n)}resolveLayoutForHandle(t){let e=this.resolver,n=e.getCapabilities(t),r=null
return n.dynamicLayout||(r=e.getLayout(t)),{handle:t,capabilities:n,compilable:r}}resolveModifier(t,e){return this.resolver.lookupModifier(t,e)}resolveHelper(t,e){return this.resolver.lookupHelper(t,e)}}class hi{constructor(t,e){this.compiler=t,this.layout=e,this.compiled=null
let n=e.block
this.symbolTable={hasEval:n.hasEval,symbols:n.symbols.concat([Yr])}}compile(){if(null!==this.compiled)return this.compiled
let t=this.compiler,e=this.layout,n=t.builderFor(e)
n.startLabels(),n.fetch(Ae.s1),n.getComponentTagName(Ae.s0),n.primitiveReference(),n.dup(),n.load(Ae.s1),n.jumpUnless("BODY"),n.fetch(Ae.s1),n.putComponentOperations(),n.openDynamicElement(),n.didCreateElement(Ae.s0),n.flushElement(),n.label("BODY"),n.invokeStaticBlock(function(t,e){return new oi(e,{block:{statements:t.block.statements,parameters:Se},containingLayout:t})}(e,t)),n.fetch(Ae.s1),n.jumpUnless("END"),n.closeElement(),n.label("END"),n.load(Ae.s1),n.stopLabels()
let r=n.commit()
return this.compiled=r}}class pi{constructor(t){this.builder=t}static(t,e){let n=e[0],r=e[1],i=e[2],s=e[3],o=this.builder
if(null!==t){var a=o.compiler.resolveLayoutForHandle(t)
let e=a.capabilities,l=a.compilable
l?(o.pushComponentDefinition(t),o.invokeStaticComponent(e,l,null,n,r,!1,i,s)):(o.pushComponentDefinition(t),o.invokeComponent(e,null,n,r,!1,i,s))}}}class ui{constructor(t){this.buffer=t,this.typePos=0,this.size=0}encode(t,e){if(t>255)throw new Error(`Opcode type over 8-bits. Got ${t}.`)
this.buffer.push(t|e|arguments.length-2<<8),this.typePos=this.buffer.length-1
for(let n=2;n<arguments.length;n++){let t=arguments[n]
if("number"==typeof t&&t>65535)throw new Error(`Operand over 16-bits. Got ${t}.`)
this.buffer.push(t)}this.size=this.buffer.length}patch(t,e){if(-1!==this.buffer[t+1])throw new Error("Trying to patch operand in populated slot instead of a reserved slot.")
this.buffer[t+1]=e}patchWith(t,e,n){if(-1!==this.buffer[t+1])throw new Error("Trying to patch operand in populated slot instead of a reserved slot.")
this.buffer[t+1]=e,this.buffer[t+2]=n}}class di{constructor(){this.labels=be(),this.targets=[]}label(t,e){this.labels[t]=e}target(t,e){this.targets.push({at:t,target:e})}patch(t){let e=this.targets,n=this.labels
for(let i=0;i<e.length;i++){var r=e[i]
let s=r.at,o=n[r.target]-s
t.patch(s,o)}}}class fi{constructor(t,e=0){this.size=e,this.encoder=new ui([]),this.labelsStack=new ke,this.compiler=t}static build(t,e){let n=new fi(t)
return e(n),n.commit()}push(t){switch(arguments.length){case 1:return this.encoder.encode(t,0)
case 2:return this.encoder.encode(t,0,arguments[1])
case 3:return this.encoder.encode(t,0,arguments[1],arguments[2])
default:return this.encoder.encode(t,0,arguments[1],arguments[2],arguments[3])}}pushMachine(t){switch(arguments.length){case 1:return this.encoder.encode(t,1024)
case 2:return this.encoder.encode(t,1024,arguments[1])
case 3:return this.encoder.encode(t,1024,arguments[1],arguments[2])
default:return this.encoder.encode(t,1024,arguments[1],arguments[2],arguments[3])}}commit(){return this.pushMachine(24),this.compiler.commit(this.size,this.encoder.buffer)}reserve(t){this.encoder.encode(t,0,-1)}reserveWithOperand(t,e){this.encoder.encode(t,0,-1,e)}reserveMachine(t){this.encoder.encode(t,1024,-1)}main(){this.push(68,Ae.s0),this.invokePreparedComponent(!1,!1,!0)}appendHTML(){this.push(28)}appendSafeHTML(){this.push(29)}appendDocumentFragment(){this.push(30)}appendNode(){this.push(31)}appendText(){this.push(32)}beginComponentTransaction(){this.push(91)}commitComponentTransaction(){this.push(92)}pushDynamicScope(){this.push(44)}popDynamicScope(){this.push(45)}pushRemoteElement(){this.push(41)}popRemoteElement(){this.push(42)}pushRootScope(t,e){this.push(20,t,e?1:0)}pushVirtualRootScope(t){this.push(21,t)}pushChildScope(){this.push(22)}popScope(){this.push(23)}prepareArgs(t){this.push(79,t)}createComponent(t,e){let n=0|e
this.push(81,n,t)}registerComponentDestructor(t){this.push(82,t)}putComponentOperations(){this.push(83)}getComponentSelf(t){this.push(84,t)}getComponentTagName(t){this.push(85,t)}getComponentLayout(t){this.push(86,t)}setupForEval(t){this.push(87,t)}invokeComponentLayout(t){this.push(90,t)}didCreateElement(t){this.push(93,t)}didRenderLayout(t){this.push(94,t)}pushFrame(){this.pushMachine(57)}popFrame(){this.pushMachine(58)}pushSmallFrame(){this.pushMachine(59)}popSmallFrame(){this.pushMachine(60)}invokeVirtual(){this.pushMachine(49)}invokeYield(){this.push(51)}toBoolean(){this.push(63)}invokePreparedComponent(t,e,n,r=null){this.beginComponentTransaction(),this.pushDynamicScope(),this.createComponent(Ae.s0,t),r&&r(),this.registerComponentDestructor(Ae.s0),this.getComponentSelf(Ae.s0),this.pushVirtualRootScope(Ae.s0),this.setVariable(0),this.setupForEval(Ae.s0),n&&this.setNamedVariables(Ae.s0),e&&this.setBlocks(Ae.s0),this.pop(),this.invokeComponentLayout(Ae.s0),this.didRenderLayout(Ae.s0),this.popFrame(),this.popScope(),this.popDynamicScope(),this.commitComponentTransaction()}get pos(){return this.encoder.typePos}get nextPos(){return this.encoder.size}compileInline(t){return this.compiler.compileInline(t,this)}compileBlock(t,e,n,r,i){this.compiler.compileBlock(t,e,n,r,i,this)}label(t){this.labels.label(t,this.nextPos)}get labels(){return this.labelsStack.current}startLabels(){this.labelsStack.push(new di)}stopLabels(){this.labelsStack.pop().patch(this.encoder)}pushCurriedComponent(){this.push(74)}pushDynamicComponentInstance(){this.push(73)}openDynamicElement(){this.push(34)}flushElement(){this.push(38)}closeElement(){this.push(39)}putIterator(){this.push(66)}enterList(t){this.reserve(64),this.labels.target(this.pos,t)}exitList(){this.push(65)}iterate(t){this.reserve(67),this.labels.target(this.pos,t)}setNamedVariables(t){this.push(2,t)}setBlocks(t){this.push(3,t)}setVariable(t){this.push(4,t)}setBlock(t){this.push(5,t)}getVariable(t){this.push(6,t)}getBlock(t){this.push(8,t)}hasBlock(t){this.push(9,t)}concat(t){this.push(11,t)}load(t){this.push(18,t)}fetch(t){this.push(19,t)}dup(t=Ae.sp,e=0){return this.push(16,t,e)}pop(t=1){return this.push(17,t)}returnTo(t){this.reserveMachine(25),this.labels.target(this.pos,t)}primitiveReference(){this.push(14)}reifyU32(){this.push(15)}enter(t){this.push(61,t)}exit(){this.push(62)}return(){this.pushMachine(24)}jump(t){this.reserveMachine(52),this.labels.target(this.pos,t)}jumpIf(t){this.reserve(53),this.labels.target(this.pos,t)}jumpUnless(t){this.reserve(54),this.labels.target(this.pos,t)}jumpEq(t,e){this.reserveWithOperand(55,t),this.labels.target(this.pos,e)}assertSame(){this.push(56)}pushEmptyArgs(){this.push(77)}switch(t,e){let n=[],r=0
e(function(t,e){n.push({match:t,callback:e,label:`CLAUSE${r++}`})}),this.enter(2),this.assertSame(),this.reifyU32(),this.startLabels(),n.slice(0,-1).forEach(t=>this.jumpEq(t.match,t.label))
for(let i=n.length-1;i>=0;i--){let t=n[i]
this.label(t.label),this.pop(2),t.callback(),0!==i&&this.jump("END")}this.label("END"),this.stopLabels(),this.exit()}stdAppend(t){this.switch(this.contentType(),e=>{e(1,()=>{t?(this.assertSame(),this.appendHTML()):this.appendText()}),e(0,()=>{this.pushCurriedComponent(),this.pushDynamicComponentInstance(),this.invokeBareComponent()}),e(3,()=>{this.assertSame(),this.appendSafeHTML()}),e(4,()=>{this.assertSame(),this.appendDocumentFragment()}),e(5,()=>{this.assertSame(),this.appendNode()})})}populateLayout(t){this.push(89,t)}invokeBareComponent(){this.fetch(Ae.s0),this.dup(Ae.sp,1),this.load(Ae.s0),this.pushFrame(),this.pushEmptyArgs(),this.prepareArgs(Ae.s0),this.invokePreparedComponent(!1,!1,!0,()=>{this.getComponentLayout(Ae.s0),this.populateLayout(Ae.s0)}),this.load(Ae.s0)}isComponent(){this.push(69)}contentType(){this.push(70)}pushBlockScope(){this.push(47)}}class mi extends fi{constructor(t,e){super(t,e?e.block.symbols.length:0),this.containingLayout=e,this.component=new pi(this),this.expressionCompiler=function(){if(Zr)return Zr
const t=Zr=new Xr
return t.add(Gr.Unknown,(t,e)=>{let n=e.compiler,r=e.referrer,i=e.containingLayout.asPartial,s=t[1],o=n.resolveHelper(s,r)
null!==o?e.helper(o,null,null):i?e.resolveMaybeLocal(s):(e.getVariable(0),e.getProperty(s))}),t.add(Gr.Concat,(t,e)=>{let n=t[1]
for(let r=0;r<n.length;r++)e.expr(n[r])
e.concat(n.length)}),t.add(Gr.Helper,(t,e)=>{let n=e.compiler,r=e.referrer,i=t[1],s=t[2],o=t[3]
if("component"===i){let t=s[0],n=s.slice(1)
return void e.curryComponent(t,n,o,!0)}let a=n.resolveHelper(i,r)
if(null===a)throw new Error(`Compile Error: ${i} is not a helper`)
e.helper(a,s,o)}),t.add(Gr.Get,(t,e)=>{let n=t[1],r=t[2]
e.getVariable(n)
for(let i=0;i<r.length;i++)e.getProperty(r[i])}),t.add(Gr.MaybeLocal,(t,e)=>{let n=t[1]
if(e.containingLayout.asPartial){let t=n[0]
n=n.slice(1),e.resolveMaybeLocal(t)}else e.getVariable(0)
for(let r=0;r<n.length;r++)e.getProperty(n[r])}),t.add(Gr.Undefined,(t,e)=>e.pushPrimitiveReference(void 0)),t.add(Gr.HasBlock,(t,e)=>{e.hasBlock(t[1])}),t.add(Gr.HasBlockParams,(t,e)=>{e.hasBlockParams(t[1])}),t}(),this.isComponentAttrs=!1,this.constants=t.constants,this.stdLib=t.stdLib}get referrer(){return this.containingLayout&&this.containingLayout.referrer}setComponentAttrs(t){this.isComponentAttrs=t}expr(t){Array.isArray(t)?this.expressionCompiler.compile(t,this):this.pushPrimitiveReference(t)}pushArgs(t,e){let n=this.constants.stringArray(t)
this.push(76,n,e)}pushYieldableBlock(t){this.pushSymbolTable(t&&t.symbolTable),this.pushBlockScope(),this.pushBlock(t)}curryComponent(t,e,n,r){let i=this.containingLayout.referrer
this.pushFrame(),this.compileArgs(e,n,null,r),this.push(80),this.expr(t),this.push(71,this.constants.serializable(i)),this.popFrame(),this.fetch(Ae.v0)}pushSymbolTable(t){if(t){let e=this.constants.serializable(t)
this.push(48,e)}else this.primitive(null)}invokeComponent(t,e,n,r,i,s,o=null,a){this.fetch(Ae.s0),this.dup(Ae.sp,1),this.load(Ae.s0),this.pushFrame()
let l=!!(s||o||e),c=!0===t||t.prepareArgs||!(!r||0===r[0].length),h={main:s,else:o,attrs:e}
this.compileArgs(n,r,h,i),this.prepareArgs(Ae.s0),this.invokePreparedComponent(null!==s,l,c,()=>{a?(this.pushSymbolTable(a.symbolTable),this.pushLayout(a),this.resolveLayout()):this.getComponentLayout(Ae.s0),this.populateLayout(Ae.s0)}),this.load(Ae.s0)}invokeStaticComponent(t,e,n,r,i,s,o,a=null){let l=e.symbolTable
if(l.hasEval||t.prepareArgs)return void this.invokeComponent(t,n,r,i,s,o,a,e)
this.fetch(Ae.s0),this.dup(Ae.sp,1),this.load(Ae.s0)
let c=l.symbols
t.createArgs&&(this.pushFrame(),this.compileArgs(null,i,null,s)),this.beginComponentTransaction(),t.dynamicScope&&this.pushDynamicScope(),t.createInstance&&this.createComponent(Ae.s0,null!==o),t.createArgs&&this.popFrame(),this.pushFrame(),this.registerComponentDestructor(Ae.s0)
let h=[]
this.getComponentSelf(Ae.s0),h.push({symbol:0,isBlock:!1})
for(let u=0;u<c.length;u++){let t=c[u]
switch(t.charAt(0)){case"&":let e=null
if("&default"===t)e=o
else if("&inverse"===t)e=a
else{if(t!==Yr)throw de()
e=n}e?(this.pushYieldableBlock(e),h.push({symbol:u+1,isBlock:!0})):(this.pushYieldableBlock(null),h.push({symbol:u+1,isBlock:!0}))
break
case"@":if(!i)break
let r=i[0],l=i[1],c=t
s&&(c=t.slice(1))
let p=r.indexOf(c);-1!==p&&(this.expr(l[p]),h.push({symbol:u+1,isBlock:!1}))}}this.pushRootScope(c.length+1,!!(o||a||n))
for(let u=h.length-1;u>=0;u--){var p=h[u]
let t=p.symbol
p.isBlock?this.setBlock(t):this.setVariable(t)}this.invokeStatic(e),t.createInstance&&this.didRenderLayout(Ae.s0),this.popFrame(),this.popScope(),t.dynamicScope&&this.popDynamicScope(),this.commitComponentTransaction(),this.load(Ae.s0)}dynamicComponent(t,e,n,r,i,s=null){this.replayable({args:()=>(this.expr(t),this.dup(),2),body:()=>{this.jumpUnless("ELSE"),this.resolveDynamicComponent(this.containingLayout.referrer),this.pushDynamicComponentInstance(),this.invokeComponent(!0,null,e,n,r,i,s),this.label("ELSE")}})}yield(t,e){this.compileArgs(e,null,null,!1),this.getBlock(t),this.resolveBlock(),this.invokeYield(),this.popScope(),this.popFrame()}guardedAppend(t,e){this.pushFrame(),this.expr(t),this.pushMachine(50,this.stdLib.getAppend(e)),this.popFrame()}invokeStaticBlock(t,e=0){let n=t.symbolTable.parameters,r=n.length,i=Math.min(e,r)
if(this.pushFrame(),i){this.pushChildScope()
for(let t=0;t<i;t++)this.dup(Ae.fp,e-t),this.setVariable(n[t])}this.pushBlock(t),this.resolveBlock(),this.invokeVirtual(),i&&this.popScope(),this.popFrame()}string(t){return this.constants.string(t)}names(t){let e=[]
for(let n=0;n<t.length;n++){let r=t[n]
e[n]=this.constants.string(r)}return this.constants.array(e)}symbols(t){return this.constants.array(t)}primitive(t){let e,n=0
switch(typeof t){case"number":t%1==0?t>-1?e=t:(e=this.constants.number(t),n=4):(e=this.constants.number(t),n=1)
break
case"string":e=this.string(t),n=2
break
case"boolean":e=0|t,n=3
break
case"object":e=2,n=3
break
case"undefined":e=3,n=3
break
default:throw new Error("Invalid primitive passed to pushPrimitive")}let r=this.sizeImmediate(e<<3|n,e)
this.push(13,r)}sizeImmediate(t,e){return t>=65535||t<0?this.constants.number(e)<<3|5:t}pushPrimitiveReference(t){this.primitive(t),this.primitiveReference()}pushComponentDefinition(t){this.push(72,this.constants.handle(t))}resolveDynamicComponent(t){this.push(75,this.constants.serializable(t))}staticComponentHelper(t,e,n){var r=this.compiler.resolveLayoutForTag(t,this.referrer)
let i=r.handle,s=r.capabilities,o=r.compilable
if(null!==i&&null!==s&&o){if(e)for(let t=0;t<e.length;t+=2)e[t][0]=`@${e[t][0]}`
return this.pushComponentDefinition(i),this.invokeStaticComponent(s,o,null,null,e,!1,n&&n),!0}return!1}invokePartial(t,e,n){let r=this.constants.serializable(t),i=this.constants.stringArray(e),s=this.constants.array(n)
this.push(95,r,i,s)}resolveMaybeLocal(t){this.push(96,this.string(t))}debugger(t,e){this.push(97,this.constants.stringArray(t),this.constants.array(e))}text(t){this.push(26,this.constants.string(t))}openPrimitiveElement(t){this.push(33,this.constants.string(t))}modifier(t,e,n){this.pushFrame(),this.compileArgs(e,n,null,!0),this.push(40,this.constants.handle(t)),this.popFrame()}comment(t){let e=this.constants.string(t)
this.push(27,e)}dynamicAttr(t,e,n){let r=this.constants.string(t),i=e?this.constants.string(e):0
this.isComponentAttrs?this.push(37,r,!0===n?1:0,i):this.push(36,r,!0===n?1:0,i)}staticAttr(t,e,n){let r=this.constants.string(t),i=e?this.constants.string(e):0
if(this.isComponentAttrs)this.pushPrimitiveReference(n),this.push(37,r,1,i)
else{let t=this.constants.string(n)
this.push(35,r,t,i)}}hasBlockParams(t){this.getBlock(t),this.resolveBlock(),this.push(10)}getProperty(t){this.push(7,this.string(t))}helper(t,e,n){this.pushFrame(),this.compileArgs(e,n,null,!0),this.push(1,this.constants.handle(t)),this.popFrame(),this.fetch(Ae.v0)}bindDynamicScope(t){this.push(43,this.names(t))}replayable({args:t,body:e}){this.startLabels(),this.pushFrame(),this.returnTo("ENDINITIAL")
let n=t()
this.enter(n),e(),this.label("FINALLY"),this.exit(),this.return(),this.label("ENDINITIAL"),this.popFrame(),this.stopLabels()}replayableIf({args:t,ifTrue:e,ifFalse:n}){this.replayable({args:t,body:()=>{this.jumpUnless("ELSE"),e(),this.jump("FINALLY"),this.label("ELSE"),n&&n()}})}inlineBlock(t){return new oi(this.compiler,{block:t,containingLayout:this.containingLayout})}evalSymbols(){let t=this.containingLayout.block
return t.hasEval?t.symbols:null}compileParams(t){if(!t)return 0
for(let e=0;e<t.length;e++)this.expr(t[e])
return t.length}compileArgs(t,e,n,r){n&&(this.pushYieldableBlock(n.main),this.pushYieldableBlock(n.else),this.pushYieldableBlock(n.attrs))
let i=this.compileParams(t)<<4
r&&(i|=8),n&&(i|=7)
let s=Se
if(e){s=e[0]
let t=e[1]
for(let e=0;e<t.length;e++)this.expr(t[e])}this.pushArgs(s,i)}template(t){return t?this.inlineBlock(t):null}}class gi extends mi{pushBlock(t){t?this.pushOther(t):this.primitive(null)}resolveBlock(){this.push(46)}pushLayout(t){t?this.pushOther(t):this.primitive(null)}resolveLayout(){this.push(46)}invokeStatic(t){this.pushOther(t),this.push(46),this.pushMachine(49)}pushOther(t){this.push(12,this.other(t))}other(t){return this.constants.other(t)}}const vi={},yi=0,bi=Object.freeze([])
class ki{constructor(){this.strings=[],this.arrays=[bi],this.tables=[],this.handles=[],this.resolved=[],this.numbers=[]}string(t){let e=this.strings.indexOf(t)
return e>-1?e:this.strings.push(t)-1}stringArray(t){let e=new Array(t.length)
for(let n=0;n<t.length;n++)e[n]=this.string(t[n])
return this.array(e)}array(t){if(0===t.length)return yi
let e=this.arrays.indexOf(t)
return e>-1?e:this.arrays.push(t)-1}handle(t){let e=this.handles.indexOf(t)
return e>-1?e:(this.resolved.push(vi),this.handles.push(t)-1)}serializable(t){let e=JSON.stringify(t),n=this.strings.indexOf(e)
return n>-1?n:this.strings.push(e)-1}number(t){let e=this.numbers.indexOf(t)
return e>-1?e:this.numbers.push(t)-1}toPool(){return{strings:this.strings,arrays:this.arrays,handles:this.handles,numbers:this.numbers}}}class wi extends ki{constructor(t,e){super(),this.resolver=t,e&&(this.strings=e.strings,this.arrays=e.arrays,this.handles=e.handles,this.resolved=this.handles.map(()=>vi),this.numbers=e.numbers)}getNumber(t){return this.numbers[t]}getString(t){return this.strings[t]}getStringArray(t){let e=this.getArray(t),n=new Array(e.length)
for(let r=0;r<e.length;r++){let t=e[r]
n[r]=this.getString(t)}return n}getArray(t){return this.arrays[t]}resolveHandle(t){let e=this.resolved[t]
if(e===vi){let n=this.handles[t]
e=this.resolved[t]=this.resolver.resolve(n)}return e}getSerializable(t){return JSON.parse(this.strings[t])}}class xi extends wi{constructor(){super(...arguments),this.others=[],this.serializables=[]}serializable(t){let e=this.serializables.indexOf(t)
return e>-1?e:this.serializables.push(t)-1}getSerializable(t){return this.serializables[t]}getOther(t){return this.others[t-1]}other(t){return this.others.push(t)}}class Si{constructor(t){this.heap=t,this.offset=0}get size(){return 1+((768&this.heap.getbyaddr(this.offset))>>8)}get isMachine(){return 1024&this.heap.getbyaddr(this.offset)}get type(){return 255&this.heap.getbyaddr(this.offset)}get op1(){return this.heap.getbyaddr(this.offset+1)}get op2(){return this.heap.getbyaddr(this.offset+2)}get op3(){return this.heap.getbyaddr(this.offset+3)}}function Ci(t,e,n){return t|e<<16|n<<30}function Mi(t,e){return t|e<<30}const Oi=1048576
class Ei{constructor(t){if(this.placeholders=[],this.offset=0,this.handle=0,this.capacity=Oi,t){let e=t.buffer,n=t.table,r=t.handle
this.heap=new Uint16Array(e),this.table=n,this.offset=this.heap.length,this.handle=r,this.capacity=0}else this.heap=new Uint16Array(Oi),this.table=[]}push(t){this.sizeCheck(),this.heap[this.offset++]=t}sizeCheck(){if(0===this.capacity){let t=Ni(this.heap,0,this.offset)
this.heap=new Uint16Array(t.length+Oi),this.heap.set(t,0),this.capacity=Oi}this.capacity--}getbyaddr(t){return this.heap[t]}setbyaddr(t,e){this.heap[t]=e}malloc(){this.table.push(this.offset,0)
let t=this.handle
return this.handle+=2,t}finishMalloc(t,e){let n=this.table[t],r=Ci(this.offset-n,e,0)
this.table[t+1]=r}size(){return this.offset}getaddr(t){return this.table[t]}gethandle(t){this.table.push(t,Ci(0,0,3))
let e=this.handle
return this.handle+=2,e}sizeof(t){return-1}scopesizeof(t){return(1073676288&this.table[t+1])>>16}free(t){let e=this.table[t+1]
this.table[t+1]=Mi(e,1)}compact(){let t=0,e=this.table,n=this.table.length,r=this.heap
for(let i=0;i<n;i+=2){let n=e[i],s=e[i+1],o=65535&s,a=-1&s
if(2!==a)if(1===a)e[i+1]=Mi(s,2),t+=o
else if(0===a){for(let e=n;e<=i+o;e++)r[e-t]=r[e]
e[i]=n-t}else 3===a&&(e[i]=n-t)}this.offset=this.offset-t}pushPlaceholder(t){this.sizeCheck()
let e=this.offset++
this.heap[e]=65535,this.placeholders.push([e,t])}patchPlaceholders(){let t=this.placeholders
for(let n=0;n<t.length;n++){var e=t[n]
let r=e[0],i=e[1]
this.setbyaddr(r,i())}}capture(t=this.offset){this.patchPlaceholders()
let e=Ni(this.heap,0,t).buffer
return{handle:this.handle,table:this.table,buffer:e}}}class Ti{constructor(t=new ki,e=new Ei){this.constants=t,this.heap=e,this._opcode=new Si(this.heap)}opcode(t){return this._opcode.offset=t,this._opcode}}class Ai extends Ti{}function Ni(t,e,n){if(void 0!==t.slice)return t.slice(e,n)
let r=new Uint16Array(n)
for(;e<n;e++)r[e]=t[e]
return r}class Di extends ci{constructor(t,e,n){let r=new xi(e)
super(n,new Ai(r),t)}builderFor(t){return new gi(this,t)}}let _i=0
class Ri{constructor(t,e){this.compiler=t,this.parsedLayout=e,this.layout=null,this.partial=null,this.wrappedLayout=null
let n=e.block
this.symbols=n.symbols,this.hasEval=n.hasEval,this.referrer=e.referrer,this.id=e.id||`client-${_i++}`}asLayout(){return this.layout?this.layout:this.layout=new si(this.compiler,Object.assign({},this.parsedLayout,{asPartial:!1}))}asPartial(){return this.partial?this.partial:this.layout=new si(this.compiler,Object.assign({},this.parsedLayout,{asPartial:!0}))}asWrappedLayout(){return this.wrappedLayout?this.wrappedLayout:this.wrappedLayout=new hi(this.compiler,Object.assign({},this.parsedLayout,{asPartial:!1}))}}class Ii{constructor(t){this.owner=t,this.handleLookup=[],this.cache={component:new Ur,template:new Ur,compiledTemplate:new Ur,helper:new Ur,manager:new Ur,modifier:new Ur}}lookup(t,e,n){return this.cache[t].hasName(e)?this.cache[t].getHandle(e):null}register(t,e,n){let r=this.cache[t],i=this.handleLookup.length
return this.handleLookup.push(r),this.cache[t].register(i,e,n),i}lookupModifier(t,e){let n=this.lookup("modifier",t)
if(null===n)throw new Error(`Modifier for ${t} not found.`)
return n}compileTemplate(t,e){if(!this.cache.compiledTemplate.hasName(t)){let n=this.resolve(e),r=JSON.parse(n.block),i=new si(this.compiler,{block:r,referrer:n.meta,asPartial:!1}),s={handle:i.compile(),symbolTable:i.symbolTable}
return this.register("compiledTemplate",t,s),s}let n=this.lookup("compiledTemplate",t)
return this.resolve(n)}registerHelper(t,e){return this.register("helper",t,(t,n)=>new Jr(e,n))}registerInternalHelper(t,e){this.register("helper",t,e)}registerComponent(t,e,n,r){let i=this.registerTemplate(e,r),s=this.managerFor(i.meta.managerId),o=new X(t,s,n,i.handle)
return this.register("component",t,o)}lookupComponentHandle(t,e){return this.cache.component.hasName(t)||this.lookupComponentDefinition(t,e),this.lookup("component",t,e)}managerFor(t="main"){let e
if(this.cache.manager.hasName(t)){let e=this.cache.manager.getHandle(t)
return this.cache.manager.getByHandle(e)}{let n=this.owner.rootName
if(!(e=this.owner.lookup(`component-manager:/${n}/component-managers/${t}`)))throw new Error(`No component manager found for ID ${t}.`)
return this.register("manager",t,e),e}}registerTemplate(t,e){return{name:t,handle:this.register("template",t,e),meta:e.meta}}lookupComponentDefinition(t,e){let n
if(this.cache.component.hasName(t))n=this.lookup("component",t,e)
else{let r=function(t,e){if(null==t)throw new Error(e)
return t}(this.identifyComponent(t,e),`Could not find the component '${t}'`),i=this.owner.lookup("template",r),s=this.owner.identify("component",r),o=null
void 0!==s&&(o=this.owner.factoryFor(s)),n=this.registerComponent(t,r,o,i)}return this.resolve(n)}lookupHelper(t,e){if(!this.cache.helper.hasName(t)){let n=this.owner,r=`helper:${t}`,i=e.specifier,s=n.identify(r,i)
if(void 0===s)return null
let o=this.owner.lookup(s,e.specifier)
return this.registerHelper(t,o)}return this.lookup("helper",t,e)}lookupPartial(t,e){throw new Error("Partials are not available in Glimmer applications.")}resolve(t){return this.handleLookup[t].getByHandle(t)}identifyComponent(t,e){let n=this.owner,r=`template:${t}`,i=e.specifier,s=n.identify(r,i)
if(void 0===s&&n.identify(`component:${t}`,i))throw new Error(`The component '${t}' is missing a template. All components must have a template. Make sure there is a template.hbs in the component directory.`)
return s}}var Bi={id:"j7SGa6Pm",block:'{"symbols":["root"],"statements":[[4,"each",[[22,["roots"]]],[["key"],["id"]],{"statements":[[4,"in-element",[[21,1,["parent"]]],[["guid","nextSibling"],["%cursor:0%",[21,1,["nextSibling"]]]],{"statements":[[1,[26,"component",[[21,1,["component"]]],null],false]],"parameters":[]},null]],"parameters":[1]},null]],"hasEval":false}',meta:{specifier:"template:/-application/application/src/templates/main"}}
function zi(t,e){let n=t.getSelf(),r=e.capture(),i=r.positional.at(0).value()
return"function"!=typeof i&&function(t,e){let n=function(t){let e,n,r=""
if(null==t)return r
"parent"in t&&"property"in t?(e=t.parent.value(),n=t.property):"_parentValue"in t&&"_propertyKey"in t&&(e=t._parentValue,n=t._propertyKey)
void 0!==n&&(r+=`('${n}' on ${function(t){let e=typeof t
if(null==t)return e
if("number"===e||"boolean"===e)return t.toString()
if(t.debugName)return t.debugName
try{return JSON.stringify(t)}catch(n){}return t.toString()}(e)}) `)
return r}(e)
throw new Error(`You tried to create an action with the {{action}} helper, but the first argument ${n}was ${typeof t} instead of a function.`)}(i,r.positional.at(0)),new ne(function(...t){let e=r.positional.value()
e.shift(),e.push(...t),i.apply(n&&n.value(),e)})}function Pi(t){return t[0]?t[1]:t[2]}class Fi{constructor(t){this.resolver=t}getComponentDefinition(t){let e=this.resolver.resolve(t)
return fe(!!e,`Couldn't find a template for ${t}`),e}getCapabilities(t){let e=this.getComponentDefinition(t),n=e.manager,r=e.state
return n.getCapabilities(r)}getLayout(t){let e=this.getComponentDefinition(t),n=e.manager.getLayout(e,this.resolver)
return{compile:()=>n.handle,symbolTable:n.symbolTable}}lookupHelper(t,e){return this.resolver.lookupHelper(t,e)}lookupModifier(t,e){return this.resolver.lookupModifier(t,e)}lookupComponentDefinition(t,e){return this.resolver.lookupComponentHandle(t,e)}lookupPartial(t,e){return this.resolver.lookupPartial(t,e)}}class Vi{constructor(t){this.resolver=t}async getTemplateIterator(t,e,n,r,i){let s=new Ii(t),o=new Fi(s),a=new ei,l=new Di(o,s,a),c=l.program
s.compiler=l,s.registerTemplate("main",Bi),s.registerInternalHelper("action",zi),s.registerHelper("if",Pi)
let h=function({id:t,meta:e,block:n}){let r,i=t||`client-${_i++}`
return{id:i,meta:e,create:(t,s)=>{let o=s?ge({},s,e):e
return r||(r=JSON.parse(n)),new Ri(t,{id:i,block:r,referrer:o})}}}(Bi).create(l)
return Promise.resolve(function(t,e,n,r,i,s){let o=Br.initial(t,e,n,r,i,s)
return new zr(o)}(c,e,i,r,n,h.asLayout().compile()))}}class Li{constructor({element:t,nextSibling:e=null}){this.cursor={element:t,nextSibling:e}}getBuilder(t){return function(t,e){return lr.forInitialRender(t,e)}(t,this.cursor)}}class ji{render(t){let e
do{e=t.next()}while(!e.done)
this.result=e.value}rerender(){if(!this.result)throw new Error("Cannot re-render before initial render has completed")
this.result.rerender()}}function $i(t){return void 0!==t.rootName&&void 0!==t.collection&&void 0!==t.name&&void 0!==t.type}function Hi(t){let e=t.type,n=function(t){let e=[]
t.rootName&&e.push(t.rootName)
t.collection&&e.push(t.collection)
t.namespace&&e.push(t.namespace)
t.name&&e.push(t.name)
if(e.length>0){let n=e.join("/")
return $i(t)&&(n="/"+n),n}}(t)
return n?e+":"+n:e}function Ui(t){let e={}
if(t.indexOf(":")>-1){let n,r=t.split(":"),i=r[0],s=r[1]
e.type=i,0===s.indexOf("/")?(n=s.substr(1).split("/"),s.substr(1).startsWith("@")?e.rootName=n.shift()+"/"+n.shift():e.rootName=n.shift(),e.collection=n.shift()):n=s.split("/"),n.length>0&&(e.name=n.pop(),n.length>0&&(e.namespace=n.join("/")))}else e.type=t
return e}function Ji(t,e){if(!e)throw new Error("Assertion Failed: "+t)}class qi{constructor(t,e){this.config=t,this.registry=e}identify(t,e){if(function(t){let e=t.split(":"),n=e[0],r=e[1]
return!!(n&&r&&0===r.indexOf("/")&&r.split("/").length>3)}(t))return t
let n,r=Ui(t)
if(e){let t=Ui(e)
if($i(t)){Ji("Specifier must not include a rootName, collection, or namespace when combined with an absolute referrer",void 0===r.rootName&&void 0===r.collection&&void 0===r.namespace),r.rootName=t.rootName,r.collection=t.collection
let e=this._definitiveCollection(r.type)
if(!r.name)return r.namespace=t.namespace,r.name=t.name,this._serializeAndVerify(r)
if(r.namespace=t.namespace?t.namespace+"/"+t.name:t.name,function(t){let e=t.namespace,n=t.collection,r=e.lastIndexOf("/-")
if(r>-1){r+=2
let t=e.indexOf("/",r)
n=e.slice(r,t>-1?t:void 0)}return n}(r)===e&&(n=this._serializeAndVerify(r)))return n
if(e&&(r.namespace+="/-"+e,n=this._serializeAndVerify(r)))return n
r.rootName=r.collection=r.namespace=void 0}else Ji('Referrer must either be "absolute" or include a `type` to determine the associated type',t.type),r.collection=this._definitiveCollection(t.type),r.namespace||(r.namespace=t.rootName),Ji(`'${t.type}' does not have a definitive collection`,r.collection)}if(r.collection||(r.collection=this._definitiveCollection(r.type),Ji(`'${r.type}' does not have a definitive collection`,r.collection)),!r.rootName){if(r.rootName=this.config.app.rootName||"app",n=this._serializeAndVerify(r))return n
r.namespace?(r.rootName=r.namespace,r.namespace=void 0):(r.rootName=r.name,r.name="main")}return(n=this._serializeAndVerify(r))?n:void 0}retrieve(t){return this.registry.get(t)}resolve(t,e){let n=this.identify(t,e)
if(n)return this.retrieve(n)}_definitiveCollection(t){let e=this.config.types[t]
return Ji(`'${t}' is not a recognized type`,e),e.definitiveCollection}_serializeAndVerify(t){let e=Hi(t)
if(this.registry.has(e))return e}}class Wi{constructor(t={}){this._entries=t}has(t){return t in this._entries}get(t){return this._entries[t]}}class Ki extends G{constructor(){super(...arguments),this.expanded="false"}click(t){t.preventDefault(),"false"===this.expanded?this.expanded="true":this.expanded="false"}keyDown(t){if(13===t.keyCode)"false"===this.expanded?(this.expanded="true",setTimeout(function(){t.target.nextElementSibling.querySelector('*[role="menuitem"]').focus()},100)):this.expanded="false"
else if(27===t.keyCode)"true"!==t.target.getAttribute("aria-haspopup")&&t.target.parentElement.parentElement.previousElementSibling.focus(),this.expanded="false"
else if(39===t.keyCode){let e=t.target.parentElement.nextElementSibling
for(;e&&("separator"===e.getAttribute("role")||"true"===e.querySelector('*[role="menuitem"]').getAttribute("aria-disabled"));)e=e.nextElementSibling
e&&e.querySelector('*[role="menuitem"]').focus()}else if(37===t.keyCode){let e=t.target.parentElement.previousElementSibling
for(;e&&("separator"===e.getAttribute("role")||"true"===e.querySelector('*[role="menuitem"]').getAttribute("aria-disabled"));)e=e.previousElementSibling
e&&e.querySelector('*[role="menuitem"]').focus()}}mouseOver(){this.expanded="true"}mouseOut(){this.expanded="false"}}(function(t,e,n,r){var i,s=arguments.length,o=s<3?e:null===r?r=Object.getOwnPropertyDescriptor(e,n):r
if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(t,e,n,r)
else for(var a=t.length-1;a>=0;a--)(i=t[a])&&(o=(s<3?i(o):s>3?i(e,n,o):i(e,n))||o)
s>3&&o&&Object.defineProperty(e,n,o)})([F],Ki.prototype,"expanded",void 0)
class Gi extends G{get tabindex(){return void 0!==this.args.tabindex?this.args.tabindex:-1}noAction(t){t.preventDefault()}}(function(t,e,n,r){var i,s=arguments.length,o=s<3?e:null===r?r=Object.getOwnPropertyDescriptor(e,n):r
if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(t,e,n,r)
else for(var a=t.length-1;a>=0;a--)(i=t[a])&&(o=(s<3?i(o):s>3?i(e,n,o):i(e,n))||o)
s>3&&o&&Object.defineProperty(e,n,o)})([F],Gi.prototype,"tabindex",null)
function Yi(t){return function t(e){if(void 0!==e){if(null===e)return null
if(Array.isArray(e))return e.slice()
if("object"==typeof e){let n={}
return Object.keys(e).forEach(function(r){n[r]=t(e[r])}),n}return e}}(t[0])}function Xi(t){let e=t[0],n=t[1].split(".")
for(;e&&n.length>0;)e=e[n[0]],n=n.slice(1)
return e}function Qi(t){let e=t[0],n=t[1].split("."),r=e
for(;n.length>0;)n.length>1?(r[n[0]]||(r[n[0]]={}),r=r[n[0]]):r[n[0]]=t[2],n.splice(0,1)
return e}var Zi=function(t,e,n,r){var i,s=arguments.length,o=s<3?e:null===r?r=Object.getOwnPropertyDescriptor(e,n):r
if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(t,e,n,r)
else for(var a=t.length-1;a>=0;a--)(i=t[a])&&(o=(s<3?i(o):s>3?i(e,n,o):i(e,n))||o)
return s>3&&o&&Object.defineProperty(e,n,o),o}
class ts extends G{constructor(){super(...arguments),this.texts=null,this.selectedIdx=null,this.text=null}didUpdate(){this.texts!==this.args.texts&&(this.texts=this.args.texts,this.texts&&this.texts.length>0?null!==this.selectedIdx?this.selectedIdx>=0&&this.selectedIdx<this.texts.length?this.text=this.texts[this.selectedIdx].text:this.texts&&this.texts.length>0?(this.selectedIdx=0,this.text=this.texts[this.selectedIdx].text):(this.selectedIdx=null,this.text=null):(this.selectedIdx=0,this.text=this.texts[this.selectedIdx].text):(this.selectedIdx=null,this.text=null))}selectText(t){t.preventDefault(),this.selectedIdx=Number.parseInt(t.target.value),this.text=this.texts[this.selectedIdx].text}updateText(t){this.texts[this.selectedIdx]={id:t.attrs.id,text:t},this.text=t,this.args.update(this.texts)}deleteText(){let t=Yi([this.texts])
console.log(this.selectedIdx),t.splice(this.selectedIdx,1),this.args.update(t)}addText(){let t=Yi([this.texts]),e=0,n=!0
for(;n;){n=!1,e+=1
for(let r=0;r<t.length;r++)if(t[r].id==="new-text-"+e){n=!0
break}}let r={id:"new-text-"+e,text:Yi([this.args.default])}
r.text.attrs||(r.text.attrs={}),r.text.attrs.id="new-text-"+e,t.push(r),this.selectedIdx=t.length-1,this.text=t[this.selectedIdx].text,this.args.update(t)}}Zi([F],ts.prototype,"texts",void 0),Zi([F],ts.prototype,"selectedIdx",void 0),Zi([F],ts.prototype,"text",void 0)
let es=0
function ns(t){return t._guid||function(t){return t._guid=++es}(t)}Object.freeze([])
function rs(t){return t&&t.__esModule&&Object.prototype.hasOwnProperty.call(t,"default")?t.default:t}function is(t,e){return t(e={exports:{}},e.exports),e.exports}function ss(t){this.content=t}ss.prototype={constructor:ss,find:function(t){for(var e=0;e<this.content.length;e+=2)if(this.content[e]===t)return e
return-1},get:function(t){var e=this.find(t)
return-1==e?void 0:this.content[e+1]},update:function(t,e,n){var r=n&&n!=t?this.remove(n):this,i=r.find(t),s=r.content.slice()
return-1==i?s.push(n||t,e):(s[i+1]=e,n&&(s[i]=n)),new ss(s)},remove:function(t){var e=this.find(t)
if(-1==e)return this
var n=this.content.slice()
return n.splice(e,2),new ss(n)},addToStart:function(t,e){return new ss([t,e].concat(this.remove(t).content))},addToEnd:function(t,e){var n=this.remove(t).content.slice()
return n.push(t,e),new ss(n)},addBefore:function(t,e,n){var r=this.remove(e),i=r.content.slice(),s=r.find(t)
return i.splice(-1==s?i.length:s,0,e,n),new ss(i)},forEach:function(t){for(var e=0;e<this.content.length;e+=2)t(this.content[e],this.content[e+1])},prepend:function(t){return(t=ss.from(t)).size?new ss(t.content.concat(this.subtract(t).content)):this},append:function(t){return(t=ss.from(t)).size?new ss(this.subtract(t).content.concat(t.content)):this},subtract:function(t){var e=this
t=ss.from(t)
for(var n=0;n<t.content.length;n+=2)e=e.remove(t.content[n])
return e},get size(){return this.content.length>>1}},ss.from=function(t){if(t instanceof ss)return t
var e=[]
if(t)for(var n in t)e.push(n,t[n])
return new ss(e)}
var as=ss,ls=is(function(t,e){Object.defineProperty(e,"__esModule",{value:!0})
var n,r=(n=as)&&"object"==typeof n&&"default"in n?n.default:n
var i=function(t,e){if(this.content=t,this.size=e||0,null==e)for(var n=0;n<t.length;n++)this.size+=t[n].nodeSize},s={firstChild:{},lastChild:{},childCount:{}}
i.prototype.nodesBetween=function(t,e,n,r,i){void 0===r&&(r=0)
for(var s=0,o=0;o<e;s++){var a=this.content[s],l=o+a.nodeSize
if(l>t&&!1!==n(a,r+o,i,s)&&a.content.size){var c=o+1
a.nodesBetween(Math.max(0,t-c),Math.min(a.content.size,e-c),n,r+c)}o=l}},i.prototype.descendants=function(t){this.nodesBetween(0,this.size,t)},i.prototype.textBetween=function(t,e,n,r){var i="",s=!0
return this.nodesBetween(t,e,function(o,a){o.isText?(i+=o.text.slice(Math.max(t,a)-a,e-a),s=!n):o.isLeaf&&r?(i+=r,s=!n):!s&&o.isBlock&&(i+=n,s=!0)},0),i},i.prototype.append=function(t){if(!t.size)return this
if(!this.size)return t
var e=this.lastChild,n=t.firstChild,r=this.content.slice(),s=0
for(e.isText&&e.sameMarkup(n)&&(r[r.length-1]=e.withText(e.text+n.text),s=1);s<t.content.length;s++)r.push(t.content[s])
return new i(r,this.size+t.size)},i.prototype.cut=function(t,e){if(null==e&&(e=this.size),0==t&&e==this.size)return this
var n=[],r=0
if(e>t)for(var s=0,o=0;o<e;s++){var a=this.content[s],l=o+a.nodeSize
l>t&&((o<t||l>e)&&(a=a.isText?a.cut(Math.max(0,t-o),Math.min(a.text.length,e-o)):a.cut(Math.max(0,t-o-1),Math.min(a.content.size,e-o-1))),n.push(a),r+=a.nodeSize),o=l}return new i(n,r)},i.prototype.cutByIndex=function(t,e){return t==e?i.empty:0==t&&e==this.content.length?this:new i(this.content.slice(t,e))},i.prototype.replaceChild=function(t,e){var n=this.content[t]
if(n==e)return this
var r=this.content.slice(),s=this.size+e.nodeSize-n.nodeSize
return r[t]=e,new i(r,s)},i.prototype.addToStart=function(t){return new i([t].concat(this.content),this.size+t.nodeSize)},i.prototype.addToEnd=function(t){return new i(this.content.concat(t),this.size+t.nodeSize)},i.prototype.eq=function(t){if(this.content.length!=t.content.length)return!1
for(var e=0;e<this.content.length;e++)if(!this.content[e].eq(t.content[e]))return!1
return!0},s.firstChild.get=function(){return this.content.length?this.content[0]:null},s.lastChild.get=function(){return this.content.length?this.content[this.content.length-1]:null},s.childCount.get=function(){return this.content.length},i.prototype.child=function(t){var e=this.content[t]
if(!e)throw new RangeError("Index "+t+" out of range for "+this)
return e},i.prototype.maybeChild=function(t){return this.content[t]},i.prototype.forEach=function(t){for(var e=0,n=0;e<this.content.length;e++){var r=this.content[e]
t(r,n,e),n+=r.nodeSize}},i.prototype.findDiffStart=function(t,e){return void 0===e&&(e=0),function t(e,n,r){for(var i=0;;i++){if(i==e.childCount||i==n.childCount)return e.childCount==n.childCount?null:r
var s=e.child(i),o=n.child(i)
if(s!=o){if(!s.sameMarkup(o))return r
if(s.isText&&s.text!=o.text){for(var a=0;s.text[a]==o.text[a];a++)r++
return r}if(s.content.size||o.content.size){var l=t(s.content,o.content,r+1)
if(null!=l)return l}r+=s.nodeSize}else r+=s.nodeSize}}(this,t,e)},i.prototype.findDiffEnd=function(t,e,n){return void 0===e&&(e=this.size),void 0===n&&(n=t.size),function t(e,n,r,i){for(var s=e.childCount,o=n.childCount;;){if(0==s||0==o)return s==o?null:{a:r,b:i}
var a=e.child(--s),l=n.child(--o),c=a.nodeSize
if(a!=l){if(!a.sameMarkup(l))return{a:r,b:i}
if(a.isText&&a.text!=l.text){for(var h=0,p=Math.min(a.text.length,l.text.length);h<p&&a.text[a.text.length-h-1]==l.text[l.text.length-h-1];)h++,r--,i--
return{a:r,b:i}}if(a.content.size||l.content.size){var u=t(a.content,l.content,r-1,i-1)
if(u)return u}r-=c,i-=c}else r-=c,i-=c}}(this,t,e,n)},i.prototype.findIndex=function(t,e){if(void 0===e&&(e=-1),0==t)return a(0,t)
if(t==this.size)return a(this.content.length,t)
if(t>this.size||t<0)throw new RangeError("Position "+t+" outside of fragment ("+this+")")
for(var n=0,r=0;;n++){var i=r+this.child(n).nodeSize
if(i>=t)return i==t||e>0?a(n+1,i):a(n,r)
r=i}},i.prototype.toString=function(){return"<"+this.toStringInner()+">"},i.prototype.toStringInner=function(){return this.content.join(", ")},i.prototype.toJSON=function(){return this.content.length?this.content.map(function(t){return t.toJSON()}):null},i.fromJSON=function(t,e){if(!e)return i.empty
if(!Array.isArray(e))throw new RangeError("Invalid input for Fragment.fromJSON")
return new i(e.map(t.nodeFromJSON))},i.fromArray=function(t){if(!t.length)return i.empty
for(var e,n=0,r=0;r<t.length;r++){var s=t[r]
n+=s.nodeSize,r&&s.isText&&t[r-1].sameMarkup(s)?(e||(e=t.slice(0,r)),e[e.length-1]=s.withText(e[e.length-1].text+s.text)):e&&e.push(s)}return new i(e||t,n)},i.from=function(t){return t?t instanceof i?t:Array.isArray(t)?this.fromArray(t):new i([t],t.nodeSize):i.empty},Object.defineProperties(i.prototype,s)
var o={index:0,offset:0}
function a(t,e){return o.index=t,o.offset=e,o}function l(t,e){if(t===e)return!0
if(!t||"object"!=typeof t||!e||"object"!=typeof e)return!1
var n=Array.isArray(t)
if(Array.isArray(e)!=n)return!1
if(n){if(t.length!=e.length)return!1
for(var r=0;r<t.length;r++)if(!l(t[r],e[r]))return!1}else{for(var i in t)if(!(i in e&&l(t[i],e[i])))return!1
for(var s in e)if(!(s in t))return!1}return!0}i.empty=new i([],0)
var c=function(t,e){this.type=t,this.attrs=e}
function h(t){var e=Error.call(this,t)
return e.__proto__=h.prototype,e}c.prototype.addToSet=function(t){for(var e,n=!1,r=0;r<t.length;r++){var i=t[r]
if(this.eq(i))return t
if(this.type.excludes(i.type))e||(e=t.slice(0,r))
else{if(i.type.excludes(this.type))return t
!n&&i.type.rank>this.type.rank&&(e||(e=t.slice(0,r)),e.push(this),n=!0),e&&e.push(i)}}return e||(e=t.slice()),n||e.push(this),e},c.prototype.removeFromSet=function(t){for(var e=0;e<t.length;e++)if(this.eq(t[e]))return t.slice(0,e).concat(t.slice(e+1))
return t},c.prototype.isInSet=function(t){for(var e=0;e<t.length;e++)if(this.eq(t[e]))return!0
return!1},c.prototype.eq=function(t){return this==t||this.type==t.type&&l(this.attrs,t.attrs)},c.prototype.toJSON=function(){var t={type:this.type.name}
for(var e in this.attrs){t.attrs=this.attrs
break}return t},c.fromJSON=function(t,e){if(!e)throw new RangeError("Invalid input for Mark.fromJSON")
var n=t.marks[e.type]
if(!n)throw new RangeError("There is no mark type "+e.type+" in this schema")
return n.create(e.attrs)},c.sameSet=function(t,e){if(t==e)return!0
if(t.length!=e.length)return!1
for(var n=0;n<t.length;n++)if(!t[n].eq(e[n]))return!1
return!0},c.setFrom=function(t){if(!t||0==t.length)return c.none
if(t instanceof c)return[t]
var e=t.slice()
return e.sort(function(t,e){return t.type.rank-e.type.rank}),e},c.none=[],h.prototype=Object.create(Error.prototype),h.prototype.constructor=h,h.prototype.name="ReplaceError"
var p=function(t,e,n){this.content=t,this.openStart=e,this.openEnd=n},u={size:{}}
function d(t,e,n){if(n.openStart>t.depth)throw new h("Inserted content deeper than insertion position")
if(t.depth-n.openStart!=e.depth-n.openEnd)throw new h("Inconsistent open depths")
return function t(e,n,r,s){var o=e.index(s),a=e.node(s)
if(o==n.index(s)&&s<e.depth-r.openStart){var l=t(e,n,r,s+1)
return a.copy(a.content.replaceChild(o,l))}if(r.content.size){if(r.openStart||r.openEnd||e.depth!=s||n.depth!=s){var c=function(t,e){for(var n=e.depth-t.openStart,r=e.node(n).copy(t.content),s=n-1;s>=0;s--)r=e.node(s).copy(i.from(r))
return{start:r.resolveNoCache(t.openStart+n),end:r.resolveNoCache(r.content.size-t.openEnd-n)}}(r,e),h=c.start,p=c.end
return y(a,function t(e,n,r,s,o){var a=e.depth>o&&m(e,n,o+1)
var l=s.depth>o&&m(r,s,o+1)
var c=[]
v(null,e,o,c)
a&&l&&n.index(o)==r.index(o)?(f(a,l),g(y(a,t(e,n,r,s,o+1)),c)):(a&&g(y(a,b(e,n,o+1)),c),v(n,r,o,c),l&&g(y(l,b(r,s,o+1)),c))
v(s,null,o,c)
return new i(c)}(e,h,p,n,s))}var u=e.parent,d=u.content
return y(u,d.cut(0,e.parentOffset).append(r.content).append(d.cut(n.parentOffset)))}return y(a,b(e,n,s))}(t,e,n,0)}function f(t,e){if(!e.type.compatibleContent(t.type))throw new h("Cannot join "+e.type.name+" onto "+t.type.name)}function m(t,e,n){var r=t.node(n)
return f(r,e.node(n)),r}function g(t,e){var n=e.length-1
n>=0&&t.isText&&t.sameMarkup(e[n])?e[n]=t.withText(e[n].text+t.text):e.push(t)}function v(t,e,n,r){var i=(e||t).node(n),s=0,o=e?e.index(n):i.childCount
t&&(s=t.index(n),t.depth>n?s++:t.textOffset&&(g(t.nodeAfter,r),s++))
for(var a=s;a<o;a++)g(i.child(a),r)
e&&e.depth==n&&e.textOffset&&g(e.nodeBefore,r)}function y(t,e){if(!t.type.validContent(e))throw new h("Invalid content for node "+t.type.name)
return t.copy(e)}function b(t,e,n){var r=[];(v(null,t,n,r),t.depth>n)&&g(y(m(t,e,n+1),b(t,e,n+1)),r)
return v(e,null,n,r),new i(r)}u.size.get=function(){return this.content.size-this.openStart-this.openEnd},p.prototype.insertAt=function(t,e){var n=function t(e,n,r,i){var s=e.findIndex(n)
var o=s.index
var a=s.offset
var l=e.maybeChild(o)
if(a==n||l.isText)return i&&!i.canReplace(o,o,r)?null:e.cut(0,n).append(r).append(e.cut(n))
var c=t(l.content,n-a-1,r)
return c&&e.replaceChild(o,l.copy(c))}(this.content,t+this.openStart,e,null)
return n&&new p(n,this.openStart,this.openEnd)},p.prototype.removeBetween=function(t,e){return new p(function t(e,n,r){var i=e.findIndex(n)
var s=i.index
var o=i.offset
var a=e.maybeChild(s)
var l=e.findIndex(r)
var c=l.index
var h=l.offset
if(o==n||a.isText){if(h!=r&&!e.child(c).isText)throw new RangeError("Removing non-flat range")
return e.cut(0,n).append(e.cut(r))}if(s!=c)throw new RangeError("Removing non-flat range")
return e.replaceChild(s,a.copy(t(a.content,n-o-1,r-o-1)))}(this.content,t+this.openStart,e+this.openStart),this.openStart,this.openEnd)},p.prototype.eq=function(t){return this.content.eq(t.content)&&this.openStart==t.openStart&&this.openEnd==t.openEnd},p.prototype.toString=function(){return this.content+"("+this.openStart+","+this.openEnd+")"},p.prototype.toJSON=function(){if(!this.content.size)return null
var t={content:this.content.toJSON()}
return this.openStart>0&&(t.openStart=this.openStart),this.openEnd>0&&(t.openEnd=this.openEnd),t},p.fromJSON=function(t,e){if(!e)return p.empty
var n=e.openStart||0,r=e.openEnd||0
if("number"!=typeof n||"number"!=typeof r)throw new RangeError("Invalid input for Slice.fromJSON")
return new p(i.fromJSON(t,e.content),e.openStart||0,e.openEnd||0)},p.maxOpen=function(t,e){void 0===e&&(e=!0)
for(var n=0,r=0,i=t.firstChild;i&&!i.isLeaf&&(e||!i.type.spec.isolating);i=i.firstChild)n++
for(var s=t.lastChild;s&&!s.isLeaf&&(e||!s.type.spec.isolating);s=s.lastChild)r++
return new p(t,n,r)},Object.defineProperties(p.prototype,u),p.empty=new p(i.empty,0,0)
var k=function(t,e,n){this.pos=t,this.path=e,this.depth=e.length/3-1,this.parentOffset=n},w={parent:{},doc:{},textOffset:{},nodeAfter:{},nodeBefore:{}}
k.prototype.resolveDepth=function(t){return null==t?this.depth:t<0?this.depth+t:t},w.parent.get=function(){return this.node(this.depth)},w.doc.get=function(){return this.node(0)},k.prototype.node=function(t){return this.path[3*this.resolveDepth(t)]},k.prototype.index=function(t){return this.path[3*this.resolveDepth(t)+1]},k.prototype.indexAfter=function(t){return t=this.resolveDepth(t),this.index(t)+(t!=this.depth||this.textOffset?1:0)},k.prototype.start=function(t){return 0==(t=this.resolveDepth(t))?0:this.path[3*t-1]+1},k.prototype.end=function(t){return t=this.resolveDepth(t),this.start(t)+this.node(t).content.size},k.prototype.before=function(t){if(!(t=this.resolveDepth(t)))throw new RangeError("There is no position before the top-level node")
return t==this.depth+1?this.pos:this.path[3*t-1]},k.prototype.after=function(t){if(!(t=this.resolveDepth(t)))throw new RangeError("There is no position after the top-level node")
return t==this.depth+1?this.pos:this.path[3*t-1]+this.path[3*t].nodeSize},w.textOffset.get=function(){return this.pos-this.path[this.path.length-1]},w.nodeAfter.get=function(){var t=this.parent,e=this.index(this.depth)
if(e==t.childCount)return null
var n=this.pos-this.path[this.path.length-1],r=t.child(e)
return n?t.child(e).cut(n):r},w.nodeBefore.get=function(){var t=this.index(this.depth),e=this.pos-this.path[this.path.length-1]
return e?this.parent.child(t).cut(0,e):0==t?null:this.parent.child(t-1)},k.prototype.marks=function(){var t=this.parent,e=this.index()
if(0==t.content.size)return c.none
if(this.textOffset)return t.child(e).marks
var n=t.maybeChild(e-1),r=t.maybeChild(e)
if(!n){var i=n
n=r,r=i}for(var s=n.marks,o=0;o<s.length;o++)!1!==s[o].type.spec.inclusive||r&&s[o].isInSet(r.marks)||(s=s[o--].removeFromSet(s))
return s},k.prototype.marksAcross=function(t){var e=this.parent.maybeChild(this.index())
if(!e||!e.isInline)return null
for(var n=e.marks,r=t.parent.maybeChild(t.index()),i=0;i<n.length;i++)!1!==n[i].type.spec.inclusive||r&&n[i].isInSet(r.marks)||(n=n[i--].removeFromSet(n))
return n},k.prototype.sharedDepth=function(t){for(var e=this.depth;e>0;e--)if(this.start(e)<=t&&this.end(e)>=t)return e
return 0},k.prototype.blockRange=function(t,e){if(void 0===t&&(t=this),t.pos<this.pos)return t.blockRange(this)
for(var n=this.depth-(this.parent.inlineContent||this.pos==t.pos?1:0);n>=0;n--)if(t.pos<=this.end(n)&&(!e||e(this.node(n))))return new M(this,t,n)},k.prototype.sameParent=function(t){return this.pos-this.parentOffset==t.pos-t.parentOffset},k.prototype.max=function(t){return t.pos>this.pos?t:this},k.prototype.min=function(t){return t.pos<this.pos?t:this},k.prototype.toString=function(){for(var t="",e=1;e<=this.depth;e++)t+=(t?"/":"")+this.node(e).type.name+"_"+this.index(e-1)
return t+":"+this.parentOffset},k.resolve=function(t,e){if(!(e>=0&&e<=t.content.size))throw new RangeError("Position "+e+" out of range")
for(var n=[],r=0,i=e,s=t;;){var o=s.content.findIndex(i),a=o.index,l=o.offset,c=i-l
if(n.push(s,a,r+l),!c)break
if((s=s.child(a)).isText)break
i=c-1,r+=l+1}return new k(e,n,i)},k.resolveCached=function(t,e){for(var n=0;n<x.length;n++){var r=x[n]
if(r.pos==e&&r.doc==t)return r}var i=x[S]=k.resolve(t,e)
return S=(S+1)%C,i},Object.defineProperties(k.prototype,w)
var x=[],S=0,C=12,M=function(t,e,n){this.$from=t,this.$to=e,this.depth=n},O={start:{},end:{},parent:{},startIndex:{},endIndex:{}}
O.start.get=function(){return this.$from.before(this.depth+1)},O.end.get=function(){return this.$to.after(this.depth+1)},O.parent.get=function(){return this.$from.node(this.depth)},O.startIndex.get=function(){return this.$from.index(this.depth)},O.endIndex.get=function(){return this.$to.indexAfter(this.depth)},Object.defineProperties(M.prototype,O)
var E=Object.create(null),T=function(t,e,n,r){this.type=t,this.attrs=e,this.content=n||i.empty,this.marks=r||c.none},A={nodeSize:{},childCount:{},textContent:{},firstChild:{},lastChild:{},isBlock:{},isTextblock:{},inlineContent:{},isInline:{},isText:{},isLeaf:{},isAtom:{}}
A.nodeSize.get=function(){return this.isLeaf?1:2+this.content.size},A.childCount.get=function(){return this.content.childCount},T.prototype.child=function(t){return this.content.child(t)},T.prototype.maybeChild=function(t){return this.content.maybeChild(t)},T.prototype.forEach=function(t){this.content.forEach(t)},T.prototype.nodesBetween=function(t,e,n,r){void 0===r&&(r=0),this.content.nodesBetween(t,e,n,r,this)},T.prototype.descendants=function(t){this.nodesBetween(0,this.content.size,t)},A.textContent.get=function(){return this.textBetween(0,this.content.size,"")},T.prototype.textBetween=function(t,e,n,r){return this.content.textBetween(t,e,n,r)},A.firstChild.get=function(){return this.content.firstChild},A.lastChild.get=function(){return this.content.lastChild},T.prototype.eq=function(t){return this==t||this.sameMarkup(t)&&this.content.eq(t.content)},T.prototype.sameMarkup=function(t){return this.hasMarkup(t.type,t.attrs,t.marks)},T.prototype.hasMarkup=function(t,e,n){return this.type==t&&l(this.attrs,e||t.defaultAttrs||E)&&c.sameSet(this.marks,n||c.none)},T.prototype.copy=function(t){return void 0===t&&(t=null),t==this.content?this:new this.constructor(this.type,this.attrs,t,this.marks)},T.prototype.mark=function(t){return t==this.marks?this:new this.constructor(this.type,this.attrs,this.content,t)},T.prototype.cut=function(t,e){return 0==t&&e==this.content.size?this:this.copy(this.content.cut(t,e))},T.prototype.slice=function(t,e,n){if(void 0===e&&(e=this.content.size),void 0===n&&(n=!1),t==e)return p.empty
var r=this.resolve(t),i=this.resolve(e),s=n?0:r.sharedDepth(e),o=r.start(s),a=r.node(s).content.cut(r.pos-o,i.pos-o)
return new p(a,r.depth-s,i.depth-s)},T.prototype.replace=function(t,e,n){return d(this.resolve(t),this.resolve(e),n)},T.prototype.nodeAt=function(t){for(var e=this;;){var n=e.content.findIndex(t),r=n.index,i=n.offset
if(!(e=e.maybeChild(r)))return null
if(i==t||e.isText)return e
t-=i+1}},T.prototype.childAfter=function(t){var e=this.content.findIndex(t),n=e.index,r=e.offset
return{node:this.content.maybeChild(n),index:n,offset:r}},T.prototype.childBefore=function(t){if(0==t)return{node:null,index:0,offset:0}
var e=this.content.findIndex(t),n=e.index,r=e.offset
if(r<t)return{node:this.content.child(n),index:n,offset:r}
var i=this.content.child(n-1)
return{node:i,index:n-1,offset:r-i.nodeSize}},T.prototype.resolve=function(t){return k.resolveCached(this,t)},T.prototype.resolveNoCache=function(t){return k.resolve(this,t)},T.prototype.rangeHasMark=function(t,e,n){var r=!1
return e>t&&this.nodesBetween(t,e,function(t){return n.isInSet(t.marks)&&(r=!0),!r}),r},A.isBlock.get=function(){return this.type.isBlock},A.isTextblock.get=function(){return this.type.isTextblock},A.inlineContent.get=function(){return this.type.inlineContent},A.isInline.get=function(){return this.type.isInline},A.isText.get=function(){return this.type.isText}
A.isLeaf.get=function(){return this.type.isLeaf},A.isAtom.get=function(){return this.type.isAtom},T.prototype.toString=function(){if(this.type.spec.toDebugString)return this.type.spec.toDebugString(this)
var t=this.type.name
return this.content.size&&(t+="("+this.content.toStringInner()+")"),D(this.marks,t)},T.prototype.contentMatchAt=function(t){var e=this.type.contentMatch.matchFragment(this.content,0,t)
if(!e)throw new Error("Called contentMatchAt on a node with invalid content")
return e},T.prototype.canReplace=function(t,e,n,r,s){void 0===n&&(n=i.empty),void 0===r&&(r=0),void 0===s&&(s=n.childCount)
var o=this.contentMatchAt(t).matchFragment(n,r,s),a=o&&o.matchFragment(this.content,e)
if(!a||!a.validEnd)return!1
for(var l=r;l<s;l++)if(!this.type.allowsMarks(n.child(l).marks))return!1
return!0},T.prototype.canReplaceWith=function(t,e,n,r){if(r&&!this.type.allowsMarks(r))return!1
var i=this.contentMatchAt(t).matchType(n),s=i&&i.matchFragment(this.content,e)
return!!s&&s.validEnd},T.prototype.canAppend=function(t){return t.content.size?this.canReplace(this.childCount,this.childCount,t.content):this.type.compatibleContent(t.type)},T.prototype.defaultContentType=function(t){return this.contentMatchAt(t).defaultType},T.prototype.check=function(){if(!this.type.validContent(this.content))throw new RangeError("Invalid content for node "+this.type.name+": "+this.content.toString().slice(0,50))
this.content.forEach(function(t){return t.check()})},T.prototype.toJSON=function(){var t={type:this.type.name}
for(var e in this.attrs){t.attrs=this.attrs
break}return this.content.size&&(t.content=this.content.toJSON()),this.marks.length&&(t.marks=this.marks.map(function(t){return t.toJSON()})),t},T.fromJSON=function(t,e){if(!e)throw new RangeError("Invalid input for Node.fromJSON")
var n=null
if(e.marks){if(!Array.isArray(e.marks))throw new RangeError("Invalid mark data for Node.fromJSON")
n=e.marks.map(t.markFromJSON)}if("text"==e.type){if("string"!=typeof e.text)throw new RangeError("Invalid text node in JSON")
return t.text(e.text,n)}var r=i.fromJSON(t,e.content)
return t.nodeType(e.type).create(e.attrs,r,n)},Object.defineProperties(T.prototype,A)
var N=function(t){function e(e,n,r,i){if(t.call(this,e,n,null,i),!r)throw new RangeError("Empty text nodes are not allowed")
this.text=r}t&&(e.__proto__=t),e.prototype=Object.create(t&&t.prototype),e.prototype.constructor=e
var n={textContent:{},nodeSize:{}}
return e.prototype.toString=function(){return this.type.spec.toDebugString?this.type.spec.toDebugString(this):D(this.marks,JSON.stringify(this.text))},n.textContent.get=function(){return this.text},e.prototype.textBetween=function(t,e){return this.text.slice(t,e)},n.nodeSize.get=function(){return this.text.length},e.prototype.mark=function(t){return t==this.marks?this:new e(this.type,this.attrs,this.text,t)},e.prototype.withText=function(t){return t==this.text?this:new e(this.type,this.attrs,t,this.marks)},e.prototype.cut=function(t,e){return void 0===t&&(t=0),void 0===e&&(e=this.text.length),0==t&&e==this.text.length?this:this.withText(this.text.slice(t,e))},e.prototype.eq=function(t){return this.sameMarkup(t)&&this.text==t.text},e.prototype.toJSON=function(){var e=t.prototype.toJSON.call(this)
return e.text=this.text,e},Object.defineProperties(e.prototype,n),e}(T)
function D(t,e){for(var n=t.length-1;n>=0;n--)e=t[n].type.name+"("+e+")"
return e}var _=function(t){this.validEnd=t,this.next=[],this.wrapCache=[]},R={inlineContent:{},defaultType:{},edgeCount:{}}
_.parse=function(t,e){var n=new I(t,e)
if(null==n.next)return _.empty
var r=z(n)
n.next&&n.err("Unexpected trailing text")
var i=function(t){var e=Object.create(null)
return function n(r){var i=[]
r.forEach(function(e){t[e].forEach(function(e){var n=e.term,r=e.to
if(n){var s=i.indexOf(n),o=s>-1&&i[s+1]
$(t,r).forEach(function(t){o||i.push(n,o=[]),-1==o.indexOf(t)&&o.push(t)})}})})
var s=e[r.join(",")]=new _(r.indexOf(t.length-1)>-1)
for(var o=0;o<i.length;o+=2){var a=i[o+1].sort(j)
s.next.push(i[o],e[a.join(",")]||n(a))}return s}($(t,0))}(function(t){var e=[[]]
return i(function t(e,s){if("choice"==e.type)return e.exprs.reduce(function(e,n){return e.concat(t(n,s))},[])
if("seq"==e.type)for(var o=0;;o++){var a=t(e.exprs[o],s)
if(o==e.exprs.length-1)return a
i(a,s=n())}else{if("star"==e.type){var l=n()
return r(s,l),i(t(e.expr,l),l),[r(l)]}if("plus"==e.type){var c=n()
return i(t(e.expr,s),c),i(t(e.expr,c),c),[r(c)]}if("opt"==e.type)return[r(s)].concat(t(e.expr,s))
if("range"==e.type){for(var h=s,p=0;p<e.min;p++){var u=n()
i(t(e.expr,h),u),h=u}if(-1==e.max)i(t(e.expr,h),h)
else for(var d=e.min;d<e.max;d++){var f=n()
r(h,f),i(t(e.expr,h),f),h=f}return[r(h)]}if("name"==e.type)return[r(s,null,e.value)]}}(t,0),n()),e
function n(){return e.push([])-1}function r(t,n,r){var i={term:r,to:n}
return e[t].push(i),i}function i(t,e){t.forEach(function(t){return t.to=e})}}(r))
return function(t,e){for(var n=0,r=[t];n<r.length;n++){for(var i=r[n],s=!i.validEnd,o=[],a=0;a<i.next.length;a+=2){var l=i.next[a],c=i.next[a+1]
o.push(l.name),!s||l.isText||l.hasRequiredAttrs()||(s=!1),-1==r.indexOf(c)&&r.push(c)}s&&e.err("Only non-generatable nodes ("+o.join(", ")+") in a required position")}}(i,n),i},_.prototype.matchType=function(t){for(var e=0;e<this.next.length;e+=2)if(this.next[e]==t)return this.next[e+1]
return null},_.prototype.matchFragment=function(t,e,n){void 0===e&&(e=0),void 0===n&&(n=t.childCount)
for(var r=this,i=e;r&&i<n;i++)r=r.matchType(t.child(i).type)
return r},R.inlineContent.get=function(){var t=this.next[0]
return!!t&&t.isInline},R.defaultType.get=function(){for(var t=0;t<this.next.length;t+=2){var e=this.next[t]
if(!e.isText&&!e.hasRequiredAttrs())return e}},_.prototype.compatible=function(t){for(var e=0;e<this.next.length;e+=2)for(var n=0;n<t.next.length;n+=2)if(this.next[e]==t.next[n])return!0
return!1},_.prototype.fillBefore=function(t,e,n){void 0===e&&(e=!1),void 0===n&&(n=0)
var r=[this]
return function s(o,a){var l=o.matchFragment(t,n)
if(l&&(!e||l.validEnd))return i.from(a.map(function(t){return t.createAndFill()}))
for(var c=0;c<o.next.length;c+=2){var h=o.next[c],p=o.next[c+1]
if(!h.isText&&!h.hasRequiredAttrs()&&-1==r.indexOf(p)){r.push(p)
var u=s(p,a.concat(h))
if(u)return u}}}(this,[])},_.prototype.findWrapping=function(t){for(var e=0;e<this.wrapCache.length;e+=2)if(this.wrapCache[e]==t)return this.wrapCache[e+1]
var n=this.computeWrapping(t)
return this.wrapCache.push(t,n),n},_.prototype.computeWrapping=function(t){for(var e=Object.create(null),n=[{match:this,type:null,via:null}];n.length;){var r=n.shift(),i=r.match
if(i.matchType(t)){for(var s=[],o=r;o.type;o=o.via)s.push(o.type)
return s.reverse()}for(var a=0;a<i.next.length;a+=2){var l=i.next[a]
l.isLeaf||l.hasRequiredAttrs()||l.name in e||r.type&&!i.next[a+1].validEnd||(n.push({match:l.contentMatch,type:l,via:r}),e[l.name]=!0)}}},R.edgeCount.get=function(){return this.next.length>>1},_.prototype.edge=function(t){var e=t<<1
if(e>this.next.length)throw new RangeError("There's no "+t+"th edge in this content match")
return{type:this.next[e],next:this.next[e+1]}},_.prototype.toString=function(){var t=[]
return function e(n){t.push(n)
for(var r=1;r<n.next.length;r+=2)-1==t.indexOf(n.next[r])&&e(n.next[r])}(this),t.map(function(e,n){for(var r=n+(e.validEnd?"*":" ")+" ",i=0;i<e.next.length;i+=2)r+=(i?", ":"")+e.next[i].name+"->"+t.indexOf(e.next[i+1])
return r}).join("\n")},Object.defineProperties(_.prototype,R),_.empty=new _(!0)
var I=function(t,e){this.string=t,this.nodeTypes=e,this.inline=null,this.pos=0,this.tokens=t.split(/\s*(?=\b|\W|$)/),""==this.tokens[this.tokens.length-1]&&this.tokens.pop(),""==this.tokens[0]&&this.tokens.unshift()},B={next:{}}
function z(t){var e=[]
do{e.push(P(t))}while(t.eat("|"))
return 1==e.length?e[0]:{type:"choice",exprs:e}}function P(t){var e=[]
do{e.push(F(t))}while(t.next&&")"!=t.next&&"|"!=t.next)
return 1==e.length?e[0]:{type:"seq",exprs:e}}function F(t){for(var e=function(t){if(t.eat("(")){var e=z(t)
return t.eat(")")||t.err("Missing closing paren"),e}if(!/\W/.test(t.next)){var n=function(t,e){var n=t.nodeTypes,r=n[e]
if(r)return[r]
var i=[]
for(var s in n){var o=n[s]
o.groups.indexOf(e)>-1&&i.push(o)}0==i.length&&t.err("No node type or group '"+e+"' found")
return i}(t,t.next).map(function(e){return null==t.inline?t.inline=e.isInline:t.inline!=e.isInline&&t.err("Mixing inline and block content"),{type:"name",value:e}})
return t.pos++,1==n.length?n[0]:{type:"choice",exprs:n}}t.err("Unexpected token '"+t.next+"'")}(t);;)if(t.eat("+"))e={type:"plus",expr:e}
else if(t.eat("*"))e={type:"star",expr:e}
else if(t.eat("?"))e={type:"opt",expr:e}
else{if(!t.eat("{"))break
e=L(t,e)}return e}function V(t){/\D/.test(t.next)&&t.err("Expected number, got '"+t.next+"'")
var e=Number(t.next)
return t.pos++,e}function L(t,e){var n=V(t),r=n
return t.eat(",")&&(r="}"!=t.next?V(t):-1),t.eat("}")||t.err("Unclosed braced range"),{type:"range",min:n,max:r,expr:e}}function j(t,e){return t-e}function $(t,e){var n=[]
return function e(r){var i=t[r]
if(1==i.length&&!i[0].term)return e(i[0].to)
n.push(r)
for(var s=0;s<i.length;s++){var o=i[s],a=o.term,l=o.to
a||-1!=n.indexOf(l)||e(l)}}(e),n.sort(j)}function H(t){var e=Object.create(null)
for(var n in t){var r=t[n]
if(!r.hasDefault)return null
e[n]=r.default}return e}function U(t,e){var n=Object.create(null)
for(var r in t){var i=e&&e[r]
if(void 0===i){var s=t[r]
if(!s.hasDefault)throw new RangeError("No value supplied for attribute "+r)
i=s.default}n[r]=i}return n}function J(t){var e=Object.create(null)
if(t)for(var n in t)e[n]=new K(t[n])
return e}B.next.get=function(){return this.tokens[this.pos]},I.prototype.eat=function(t){return this.next==t&&(this.pos++||!0)},I.prototype.err=function(t){throw new SyntaxError(t+" (in content expression '"+this.string+"')")},Object.defineProperties(I.prototype,B)
var q=function(t,e,n){this.name=t,this.schema=e,this.spec=n,this.groups=n.group?n.group.split(" "):[],this.attrs=J(n.attrs),this.defaultAttrs=H(this.attrs),this.contentMatch=null,this.markSet=null,this.inlineContent=null,this.isBlock=!(n.inline||"text"==t),this.isText="text"==t},W={isInline:{},isTextblock:{},isLeaf:{},isAtom:{}}
W.isInline.get=function(){return!this.isBlock},W.isTextblock.get=function(){return this.isBlock&&this.inlineContent},W.isLeaf.get=function(){return this.contentMatch==_.empty},W.isAtom.get=function(){return this.isLeaf||this.spec.atom},q.prototype.hasRequiredAttrs=function(t){for(var e in this.attrs)if(this.attrs[e].isRequired&&(!t||!(e in t)))return!0
return!1},q.prototype.compatibleContent=function(t){return this==t||this.contentMatch.compatible(t.contentMatch)},q.prototype.computeAttrs=function(t){return!t&&this.defaultAttrs?this.defaultAttrs:U(this.attrs,t)},q.prototype.create=function(t,e,n){if(this.isText)throw new Error("NodeType.create can't construct text nodes")
return new T(this,this.computeAttrs(t),i.from(e),c.setFrom(n))},q.prototype.createChecked=function(t,e,n){if(e=i.from(e),!this.validContent(e))throw new RangeError("Invalid content for node "+this.name)
return new T(this,this.computeAttrs(t),e,c.setFrom(n))},q.prototype.createAndFill=function(t,e,n){if(t=this.computeAttrs(t),(e=i.from(e)).size){var r=this.contentMatch.fillBefore(e)
if(!r)return null
e=r.append(e)}var s=this.contentMatch.matchFragment(e).fillBefore(i.empty,!0)
return s?new T(this,t,e.append(s),c.setFrom(n)):null},q.prototype.validContent=function(t){var e=this.contentMatch.matchFragment(t)
if(!e||!e.validEnd)return!1
for(var n=0;n<t.childCount;n++)if(!this.allowsMarks(t.child(n).marks))return!1
return!0},q.prototype.allowsMarkType=function(t){return null==this.markSet||this.markSet.indexOf(t)>-1},q.prototype.allowsMarks=function(t){if(null==this.markSet)return!0
for(var e=0;e<t.length;e++)if(!this.allowsMarkType(t[e].type))return!1
return!0},q.prototype.allowedMarks=function(t){var e
if(null==this.markSet)return t
for(var n=0;n<t.length;n++)this.allowsMarkType(t[n].type)?e&&e.push(t[n]):e||(e=t.slice(0,n))
return e?e.length?e:c.empty:t},q.compile=function(t,e){var n=Object.create(null)
t.forEach(function(t,r){return n[t]=new q(t,e,r)})
var r=e.spec.topNode||"doc"
if(!n[r])throw new RangeError("Schema is missing its top node type ('"+r+"')")
if(!n.text)throw new RangeError("Every schema needs a 'text' type")
for(var i in n.text.attrs)throw new RangeError("The text node type should not have attributes")
return n},Object.defineProperties(q.prototype,W)
var K=function(t){this.hasDefault=Object.prototype.hasOwnProperty.call(t,"default"),this.default=t.default},G={isRequired:{}}
G.isRequired.get=function(){return!this.hasDefault},Object.defineProperties(K.prototype,G)
var Y=function(t,e,n,r){this.name=t,this.schema=n,this.spec=r,this.attrs=J(r.attrs),this.rank=e,this.excluded=null
var i=H(this.attrs)
this.instance=i&&new c(this,i)}
Y.prototype.create=function(t){return!t&&this.instance?this.instance:new c(this,U(this.attrs,t))},Y.compile=function(t,e){var n=Object.create(null),r=0
return t.forEach(function(t,i){return n[t]=new Y(t,r++,e,i)}),n},Y.prototype.removeFromSet=function(t){for(var e=0;e<t.length;e++)if(t[e].type==this)return t.slice(0,e).concat(t.slice(e+1))
return t},Y.prototype.isInSet=function(t){for(var e=0;e<t.length;e++)if(t[e].type==this)return t[e]},Y.prototype.excludes=function(t){return this.excluded.indexOf(t)>-1}
var X=function(t){for(var e in this.spec={},t)this.spec[e]=t[e]
this.spec.nodes=r.from(t.nodes),this.spec.marks=r.from(t.marks),this.nodes=q.compile(this.spec.nodes,this),this.marks=Y.compile(this.spec.marks,this)
var n=Object.create(null)
for(var i in this.nodes){if(i in this.marks)throw new RangeError(i+" can not be both a node and a mark")
var s=this.nodes[i],o=s.spec.content||"",a=s.spec.marks
s.contentMatch=n[o]||(n[o]=_.parse(o,this.nodes)),s.inlineContent=s.contentMatch.inlineContent,s.markSet="_"==a?null:a?Q(this,a.split(" ")):""!=a&&s.inlineContent?null:[]}for(var l in this.marks){var c=this.marks[l],h=c.spec.excludes
c.excluded=null==h?[c]:""==h?[]:Q(this,h.split(" "))}this.nodeFromJSON=this.nodeFromJSON.bind(this),this.markFromJSON=this.markFromJSON.bind(this),this.topNodeType=this.nodes[this.spec.topNode||"doc"],this.cached=Object.create(null),this.cached.wrappings=Object.create(null)}
function Q(t,e){for(var n=[],r=0;r<e.length;r++){var i=e[r],s=t.marks[i],o=s
if(s)n.push(s)
else for(var a in t.marks){var l=t.marks[a];("_"==i||l.spec.group&&l.spec.group.split(" ").indexOf(i)>-1)&&n.push(o=l)}if(!o)throw new SyntaxError("Unknown mark type: '"+e[r]+"'")}return n}X.prototype.node=function(t,e,n,r){if("string"==typeof t)t=this.nodeType(t)
else{if(!(t instanceof q))throw new RangeError("Invalid node type: "+t)
if(t.schema!=this)throw new RangeError("Node type from different schema used ("+t.name+")")}return t.createChecked(e,n,r)},X.prototype.text=function(t,e){var n=this.nodes.text
return new N(n,n.defaultAttrs,t,c.setFrom(e))},X.prototype.mark=function(t,e){return"string"==typeof t&&(t=this.marks[t]),t.create(e)},X.prototype.nodeFromJSON=function(t){return T.fromJSON(this,t)},X.prototype.markFromJSON=function(t){return c.fromJSON(this,t)},X.prototype.nodeType=function(t){var e=this.nodes[t]
if(!e)throw new RangeError("Unknown node type: "+t)
return e}
var Z=function(t,e){var n=this
this.schema=t,this.rules=e,this.tags=[],this.styles=[],e.forEach(function(t){t.tag?n.tags.push(t):t.style&&n.styles.push(t)})}
Z.prototype.parse=function(t,e){void 0===e&&(e={})
var n=new at(this,e,!1)
return n.addAll(t,null,e.from,e.to),n.finish()},Z.prototype.parseSlice=function(t,e){void 0===e&&(e={})
var n=new at(this,e,!0)
return n.addAll(t,null,e.from,e.to),p.maxOpen(n.finish())},Z.prototype.matchTag=function(t,e){for(var n=0;n<this.tags.length;n++){var r=this.tags[n]
if(ct(t,r.tag)&&(void 0===r.namespace||t.namespaceURI==r.namespace)&&(!r.context||e.matchesContext(r.context))){if(r.getAttrs){var i=r.getAttrs(t)
if(!1===i)continue
r.attrs=i}return r}}},Z.prototype.matchStyle=function(t,e,n){for(var r=0;r<this.styles.length;r++){var i=this.styles[r]
if(!(0!=i.style.indexOf(t)||i.context&&!n.matchesContext(i.context)||i.style.length>t.length&&(61!=i.style.charCodeAt(t.length)||i.style.slice(t.length+1)!=e))){if(i.getAttrs){var s=i.getAttrs(e)
if(!1===s)continue
i.attrs=s}return i}}},Z.schemaRules=function(t){var e=[]
function n(t){for(var n=null==t.priority?50:t.priority,r=0;r<e.length;r++){var i=e[r]
if((null==i.priority?50:i.priority)<n)break}e.splice(r,0,t)}var r=function(e){var r=t.marks[e].spec.parseDOM
r&&r.forEach(function(t){n(t=ht(t)),t.mark=e})}
for(var i in t.marks)r(i)
var s
for(var o in t.nodes)s=void 0,(s=t.nodes[o].spec.parseDOM)&&s.forEach(function(t){n(t=ht(t)),t.node=o})
return e},Z.fromSchema=function(t){return t.cached.domParser||(t.cached.domParser=new Z(t,Z.schemaRules(t)))}
var tt={address:!0,article:!0,aside:!0,blockquote:!0,canvas:!0,dd:!0,div:!0,dl:!0,fieldset:!0,figcaption:!0,figure:!0,footer:!0,form:!0,h1:!0,h2:!0,h3:!0,h4:!0,h5:!0,h6:!0,header:!0,hgroup:!0,hr:!0,li:!0,noscript:!0,ol:!0,output:!0,p:!0,pre:!0,section:!0,table:!0,tfoot:!0,ul:!0},et={head:!0,noscript:!0,object:!0,script:!0,style:!0,title:!0},nt={ol:!0,ul:!0},rt=1,it=2
function st(t){return(t?rt:0)|("full"===t?it:0)}var ot=function(t,e,n,r,i,s){this.type=t,this.attrs=e,this.solid=r,this.match=i||(4&s?null:t.contentMatch),this.options=s,this.content=[],this.marks=n,this.activeMarks=c.none}
ot.prototype.findWrapping=function(t){if(!this.match){if(!this.type)return[]
var e=this.type.contentMatch.fillBefore(i.from(t))
if(!e){var n,r=this.type.contentMatch
return(n=r.findWrapping(t.type))?(this.match=r,n):null}this.match=this.type.contentMatch.matchFragment(e)}return this.match.findWrapping(t.type)},ot.prototype.finish=function(t){if(!(this.options&rt)){var e,n=this.content[this.content.length-1]
n&&n.isText&&(e=/\s+$/.exec(n.text))&&(n.text.length==e[0].length?this.content.pop():this.content[this.content.length-1]=n.withText(n.text.slice(0,n.text.length-e[0].length)))}var r=i.from(this.content)
return!t&&this.match&&(r=r.append(this.match.fillBefore(i.empty,!0))),this.type?this.type.create(this.attrs,r,this.marks):r}
var at=function(t,e,n){this.parser=t,this.options=e,this.isOpen=n,this.pendingMarks=[]
var r,i=e.topNode,s=st(e.preserveWhitespace)|(n?4:0)
r=i?new ot(i.type,i.attrs,c.none,!0,e.topMatch||i.type.contentMatch,s):new ot(n?null:t.schema.topNodeType,null,c.none,!0,null,s),this.nodes=[r],this.open=0,this.find=e.findPositions,this.needsBlock=!1},lt={top:{},currentPos:{}}
function ct(t,e){return(t.matches||t.msMatchesSelector||t.webkitMatchesSelector||t.mozMatchesSelector).call(t,e)}function ht(t){var e={}
for(var n in t)e[n]=t[n]
return e}lt.top.get=function(){return this.nodes[this.open]},at.prototype.addDOM=function(t){if(3==t.nodeType)this.addTextNode(t)
else if(1==t.nodeType){var e=t.getAttribute("style"),n=e?this.readStyles(function(t){var e,n=/\s*([\w-]+)\s*:\s*([^;]+)/g,r=[]
for(;e=n.exec(t);)r.push(e[1],e[2].trim())
return r}(e)):null
if(null!=n)for(var r=0;r<n.length;r++)this.addPendingMark(n[r])
if(this.addElement(t),null!=n)for(var i=0;i<n.length;i++)this.removePendingMark(n[i])}},at.prototype.addTextNode=function(t){var e=t.nodeValue,n=this.top
if((n.type?n.type.inlineContent:n.content.length&&n.content[0].isInline)||/\S/.test(e)){if(n.options&rt)n.options&it||(e=e.replace(/\r?\n|\r/g," "))
else if(e=e.replace(/\s+/g," "),/^\s/.test(e)&&this.open==this.nodes.length-1){var r=n.content[n.content.length-1],i=t.previousSibling;(!r||i&&"BR"==i.nodeName||r.isText&&/\s$/.test(r.text))&&(e=e.slice(1))}e&&this.insertNode(this.parser.schema.text(e)),this.findInText(t)}else this.findInside(t)},at.prototype.addElement=function(t){var e=t.nodeName.toLowerCase()
nt.hasOwnProperty(e)&&function(t){for(var e=t.firstChild,n=null;e;e=e.nextSibling){var r=1==e.nodeType?e.nodeName.toLowerCase():null
r&&nt.hasOwnProperty(r)&&n?(n.appendChild(e),e=n):"li"==r?n=e:r&&(n=null)}}(t)
var n=this.options.ruleFromNode&&this.options.ruleFromNode(t)||this.parser.matchTag(t,this)
if(n?n.ignore:et.hasOwnProperty(e))this.findInside(t)
else if(!n||n.skip){n&&n.skip.nodeType&&(t=n.skip)
var r,i=this.top,s=this.needsBlock
tt.hasOwnProperty(e)&&(r=!0,i.type||(this.needsBlock=!0)),this.addAll(t),r&&this.sync(i),this.needsBlock=s}else this.addElementByRule(t,n)},at.prototype.readStyles=function(t){for(var e=c.none,n=0;n<t.length;n+=2){var r=this.parser.matchStyle(t[n],t[n+1],this)
if(r){if(r.ignore)return null
e=this.parser.schema.marks[r.mark].create(r.attrs).addToSet(e)}}return e},at.prototype.addElementByRule=function(t,e){var n,r,i,s=this
e.node?(r=this.parser.schema.nodes[e.node]).isLeaf?this.insertNode(r.create(e.attrs)):n=this.enter(r,e.attrs,e.preserveWhitespace):(i=this.parser.schema.marks[e.mark].create(e.attrs),this.addPendingMark(i))
var o=this.top
if(r&&r.isLeaf)this.findInside(t)
else if(e.getContent)this.findInside(t),e.getContent(t,this.parser.schema).forEach(function(t){return s.insertNode(t)})
else{var a=e.contentElement
"string"==typeof a?a=t.querySelector(a):"function"==typeof a&&(a=a(t)),a||(a=t),this.findAround(t,a,!0),this.addAll(a,n)}return n&&(this.sync(o),this.open--),i&&this.removePendingMark(i),!0},at.prototype.addAll=function(t,e,n,r){for(var i=n||0,s=n?t.childNodes[n]:t.firstChild,o=null==r?null:t.childNodes[r];s!=o;s=s.nextSibling,++i)this.findAtPoint(t,i),this.addDOM(s),e&&tt.hasOwnProperty(s.nodeName.toLowerCase())&&this.sync(e)
this.findAtPoint(t,i)},at.prototype.findPlace=function(t){for(var e,n,r=this.open;r>=0;r--){var i=this.nodes[r],s=i.findWrapping(t)
if(s&&(!e||e.length>s.length)&&(e=s,n=i,!s.length))break
if(i.solid)break}if(!e)return!1
this.sync(n)
for(var o=0;o<e.length;o++)this.enterInner(e[o],null,!1)
return!0},at.prototype.insertNode=function(t){if(t.isInline&&this.needsBlock&&!this.top.type){var e=this.textblockFromContext()
e&&this.enterInner(e)}if(this.findPlace(t)){this.closeExtra()
var n=this.top
this.applyPendingMarks(n),n.match&&(n.match=n.match.matchType(t.type))
for(var r=n.activeMarks,i=0;i<t.marks.length;i++)n.type&&!n.type.allowsMarkType(t.marks[i].type)||(r=t.marks[i].addToSet(r))
n.content.push(t.mark(r))}},at.prototype.applyPendingMarks=function(t){for(var e=0;e<this.pendingMarks.length;e++){var n=this.pendingMarks[e]
t.type&&!t.type.allowsMarkType(n.type)||n.type.isInSet(t.activeMarks)||(t.activeMarks=n.addToSet(t.activeMarks),this.pendingMarks.splice(e--,1))}},at.prototype.enter=function(t,e,n){var r=this.findPlace(t.create(e))
return r&&(this.applyPendingMarks(this.top),this.enterInner(t,e,!0,n)),r},at.prototype.enterInner=function(t,e,n,r){this.closeExtra()
var i=this.top
i.match=i.match&&i.match.matchType(t,e)
var s=null==r?-5&i.options:st(r)
4&i.options&&0==i.content.length&&(s|=4),this.nodes.push(new ot(t,e,i.activeMarks,n,null,s)),this.open++},at.prototype.closeExtra=function(t){var e=this.nodes.length-1
if(e>this.open){for(;e>this.open;e--)this.nodes[e-1].content.push(this.nodes[e].finish(t))
this.nodes.length=this.open+1}},at.prototype.finish=function(){return this.open=0,this.closeExtra(this.isOpen),this.nodes[0].finish(this.isOpen||this.options.topOpen)},at.prototype.sync=function(t){for(var e=this.open;e>=0;e--)if(this.nodes[e]==t)return void(this.open=e)},at.prototype.addPendingMark=function(t){this.pendingMarks.push(t)},at.prototype.removePendingMark=function(t){var e=this.pendingMarks.lastIndexOf(t)
if(e>-1)this.pendingMarks.splice(e,1)
else{var n=this.top
n.activeMarks=t.removeFromSet(n.activeMarks)}},lt.currentPos.get=function(){this.closeExtra()
for(var t=0,e=this.open;e>=0;e--){for(var n=this.nodes[e].content,r=n.length-1;r>=0;r--)t+=n[r].nodeSize
e&&t++}return t},at.prototype.findAtPoint=function(t,e){if(this.find)for(var n=0;n<this.find.length;n++)this.find[n].node==t&&this.find[n].offset==e&&(this.find[n].pos=this.currentPos)},at.prototype.findInside=function(t){if(this.find)for(var e=0;e<this.find.length;e++)null==this.find[e].pos&&1==t.nodeType&&t.contains(this.find[e].node)&&(this.find[e].pos=this.currentPos)},at.prototype.findAround=function(t,e,n){if(t!=e&&this.find)for(var r=0;r<this.find.length;r++){if(null==this.find[r].pos&&1==t.nodeType&&t.contains(this.find[r].node))e.compareDocumentPosition(this.find[r].node)&(n?2:4)&&(this.find[r].pos=this.currentPos)}},at.prototype.findInText=function(t){if(this.find)for(var e=0;e<this.find.length;e++)this.find[e].node==t&&(this.find[e].pos=this.currentPos-(t.nodeValue.length-this.find[e].offset))},at.prototype.matchesContext=function(t){var e=this
if(t.indexOf("|")>-1)return t.split(/\s*\|\s*/).some(this.matchesContext,this)
var n=t.split("/"),r=this.options.context,i=!(this.isOpen||r&&r.parent.type!=this.nodes[0].type),s=-(r?r.depth+1:0)+(i?0:1)
return function t(o,a){for(;o>=0;o--){var l=n[o]
if(""==l){if(o==n.length-1||0==o)continue
for(;a>=s;a--)if(t(o-1,a))return!0
return!1}var c=a>0||0==a&&i?e.nodes[a].type:r&&a>=s?r.node(a-s).type:null
if(!c||c.name!=l&&-1==c.groups.indexOf(l))return!1
a--}return!0}(n.length-1,this.open)},at.prototype.textblockFromContext=function(){var t=this.options.context
if(t)for(var e=t.depth;e>=0;e--){var n=t.node(e).contentMatchAt(t.indexAfter(e)).defaultType
if(n&&n.isTextblock&&n.defaultAttrs)return n}for(var r in this.parser.schema.nodes){var i=this.parser.schema.nodes[r]
if(i.isTextblock&&i.defaultAttrs)return i}},Object.defineProperties(at.prototype,lt)
var pt=function(t,e){this.nodes=t||{},this.marks=e||{}}
function ut(t){var e={}
for(var n in t){var r=t[n].spec.toDOM
r&&(e[n]=r)}return e}function dt(t){return t.document||window.document}pt.prototype.serializeFragment=function(t,e,n){var r=this
void 0===e&&(e={}),n||(n=dt(e).createDocumentFragment())
var i=n,s=null
return t.forEach(function(t){if(s||t.marks.length){s||(s=[])
for(var n=0,o=0;n<s.length&&o<t.marks.length;){var a=t.marks[o]
if(r.marks[a.type.name]){if(!a.eq(s[n])||!1===a.type.spec.spanning)break
n+=2,o++}else o++}for(;n<s.length;)i=s.pop(),s.pop()
for(;o<t.marks.length;){var l=t.marks[o++],c=r.serializeMark(l,t.isInline,e)
c&&(s.push(l,i),i.appendChild(c.dom),i=c.contentDOM||c.dom)}}i.appendChild(r.serializeNode(t,e))}),n},pt.prototype.serializeNode=function(t,e){void 0===e&&(e={})
var n=pt.renderSpec(dt(e),this.nodes[t.type.name](t)),r=n.dom,i=n.contentDOM
if(i){if(t.isLeaf)throw new RangeError("Content hole not allowed in a leaf node spec")
e.onContent?e.onContent(t,i,e):this.serializeFragment(t.content,e,i)}return r},pt.prototype.serializeNodeAndMarks=function(t,e){void 0===e&&(e={})
for(var n=this.serializeNode(t,e),r=t.marks.length-1;r>=0;r--){var i=this.serializeMark(t.marks[r],t.isInline,e)
i&&((i.contentDOM||i.dom).appendChild(n),n=i.dom)}return n},pt.prototype.serializeMark=function(t,e,n){void 0===n&&(n={})
var r=this.marks[t.type.name]
return r&&pt.renderSpec(dt(n),r(t,e))},pt.renderSpec=function(t,e){if("string"==typeof e)return{dom:t.createTextNode(e)}
if(null!=e.nodeType)return{dom:e}
var n=t.createElement(e[0]),r=null,i=e[1],s=1
if(i&&"object"==typeof i&&null==i.nodeType&&!Array.isArray(i))for(var o in s=2,i)null!=i[o]&&n.setAttribute(o,i[o])
for(var a=s;a<e.length;a++){var l=e[a]
if(0===l){if(a<e.length-1||a>s)throw new RangeError("Content hole must be the only child of its parent node")
return{dom:n,contentDOM:n}}var c=pt.renderSpec(t,l),h=c.dom,p=c.contentDOM
if(n.appendChild(h),p){if(r)throw new RangeError("Multiple content holes")
r=p}}return{dom:n,contentDOM:r}},pt.fromSchema=function(t){return t.cached.domSerializer||(t.cached.domSerializer=new pt(this.nodesFromSchema(t),this.marksFromSchema(t)))},pt.nodesFromSchema=function(t){var e=ut(t.nodes)
return e.text||(e.text=function(t){return t.text}),e},pt.marksFromSchema=function(t){return ut(t.marks)},e.Node=T,e.ResolvedPos=k,e.NodeRange=M,e.Fragment=i,e.Slice=p,e.ReplaceError=h,e.Mark=c,e.Schema=X,e.NodeType=q,e.MarkType=Y,e.ContentMatch=_,e.DOMParser=Z,e.DOMSerializer=pt})
rs(ls)
ls.Node,ls.ResolvedPos,ls.NodeRange,ls.Fragment,ls.Slice,ls.ReplaceError,ls.Mark
var cs=ls.Schema,hs=(ls.NodeType,ls.MarkType,ls.ContentMatch,ls.DOMParser,ls.DOMSerializer,is(function(t,e){Object.defineProperty(e,"__esModule",{value:!0})
var n=65535,r=Math.pow(2,16)
function i(t){return t&n}var s=function(t,e,n){void 0===e&&(e=!1),void 0===n&&(n=null),this.pos=t,this.deleted=e,this.recover=n},o=function(t,e){void 0===e&&(e=!1),this.ranges=t,this.inverted=e}
o.prototype.recover=function(t){var e=0,s=i(t)
if(!this.inverted)for(var o=0;o<s;o++)e+=this.ranges[3*o+2]-this.ranges[3*o+1]
return this.ranges[3*s]+e+function(t){return(t-(t&n))/r}(t)},o.prototype.mapResult=function(t,e){return void 0===e&&(e=1),this._map(t,e,!1)},o.prototype.map=function(t,e){return void 0===e&&(e=1),this._map(t,e,!0)},o.prototype._map=function(t,e,n){for(var i=0,o=this.inverted?2:1,a=this.inverted?1:2,l=0;l<this.ranges.length;l+=3){var c=this.ranges[l]-(this.inverted?i:0)
if(c>t)break
var h=this.ranges[l+o],p=this.ranges[l+a],u=c+h
if(t<=u){var d=c+i+((h?t==c?-1:t==u?1:e:e)<0?0:p)
if(n)return d
var f=l/3+(t-c)*r
return new s(d,e<0?t!=c:t!=u,f)}i+=p-h}return n?t+i:new s(t+i)},o.prototype.touches=function(t,e){for(var n=0,r=i(e),s=this.inverted?2:1,o=this.inverted?1:2,a=0;a<this.ranges.length;a+=3){var l=this.ranges[a]-(this.inverted?n:0)
if(l>t)break
var c=this.ranges[a+s]
if(t<=l+c&&a==3*r)return!0
n+=this.ranges[a+o]-c}return!1},o.prototype.forEach=function(t){for(var e=this.inverted?2:1,n=this.inverted?1:2,r=0,i=0;r<this.ranges.length;r+=3){var s=this.ranges[r],o=s-(this.inverted?i:0),a=s+(this.inverted?0:i),l=this.ranges[r+e],c=this.ranges[r+n]
t(o,o+l,a,a+c),i+=c-l}},o.prototype.invert=function(){return new o(this.ranges,!this.inverted)},o.prototype.toString=function(){return(this.inverted?"-":"")+JSON.stringify(this.ranges)},o.offset=function(t){return 0==t?o.empty:new o(t<0?[0,-t,0]:[0,0,t])},o.empty=new o([])
var a=function(t,e,n,r){this.maps=t||[],this.from=n||0,this.to=null==r?this.maps.length:r,this.mirror=e}
function l(t){var e=Error.call(this,t)
return e.__proto__=l.prototype,e}a.prototype.slice=function(t,e){return void 0===t&&(t=0),void 0===e&&(e=this.maps.length),new a(this.maps,this.mirror,t,e)},a.prototype.copy=function(){return new a(this.maps.slice(),this.mirror&&this.mirror.slice(),this.from,this.to)},a.prototype.appendMap=function(t,e){this.to=this.maps.push(t),null!=e&&this.setMirror(this.maps.length-1,e)},a.prototype.appendMapping=function(t){for(var e=0,n=this.maps.length;e<t.maps.length;e++){var r=t.getMirror(e)
this.appendMap(t.maps[e],null!=r&&r<e?n+r:null)}},a.prototype.getMirror=function(t){if(this.mirror)for(var e=0;e<this.mirror.length;e++)if(this.mirror[e]==t)return this.mirror[e+(e%2?-1:1)]},a.prototype.setMirror=function(t,e){this.mirror||(this.mirror=[]),this.mirror.push(t,e)},a.prototype.appendMappingInverted=function(t){for(var e=t.maps.length-1,n=this.maps.length+t.maps.length;e>=0;e--){var r=t.getMirror(e)
this.appendMap(t.maps[e].invert(),null!=r&&r>e?n-r-1:null)}},a.prototype.invert=function(){var t=new a
return t.appendMappingInverted(this),t},a.prototype.map=function(t,e){if(void 0===e&&(e=1),this.mirror)return this._map(t,e,!0)
for(var n=this.from;n<this.to;n++)t=this.maps[n].map(t,e)
return t},a.prototype.mapResult=function(t,e){return void 0===e&&(e=1),this._map(t,e,!1)},a.prototype._map=function(t,e,n){for(var r=!1,i=null,o=this.from;o<this.to;o++){var a=this.maps[o],l=i&&i[o]
if(null!=l&&a.touches(t,l))t=a.recover(l)
else{var c=a.mapResult(t,e)
if(null!=c.recover){var h=this.getMirror(o)
if(null!=h&&h>o&&h<this.to){if(c.deleted){o=h,t=this.maps[h].recover(c.recover)
continue}(i||(i=Object.create(null)))[h]=c.recover}}c.deleted&&(r=!0),t=c.pos}}return n?t:new s(t,r)},l.prototype=Object.create(Error.prototype),l.prototype.constructor=l,l.prototype.name="TransformError"
var c=function(t){this.doc=t,this.steps=[],this.docs=[],this.mapping=new a},h={before:{},docChanged:{}}
function p(){throw new Error("Override me")}h.before.get=function(){return this.docs.length?this.docs[0]:this.doc},c.prototype.step=function(t){var e=this.maybeStep(t)
if(e.failed)throw new l(e.failed)
return this},c.prototype.maybeStep=function(t){var e=t.apply(this.doc)
return e.failed||this.addStep(t,e.doc),e},h.docChanged.get=function(){return this.steps.length>0},c.prototype.addStep=function(t,e){this.docs.push(this.doc),this.steps.push(t),this.mapping.appendMap(t.getMap()),this.doc=e},Object.defineProperties(c.prototype,h)
var u=Object.create(null),d=function(){}
d.prototype.apply=function(t){return p()},d.prototype.getMap=function(){return o.empty},d.prototype.invert=function(t){return p()},d.prototype.map=function(t){return p()},d.prototype.merge=function(t){return null},d.prototype.toJSON=function(){return p()},d.fromJSON=function(t,e){if(!e||!e.stepType)throw new RangeError("Invalid input for Step.fromJSON")
var n=u[e.stepType]
if(!n)throw new RangeError("No step type "+e.stepType+" defined")
return n.fromJSON(t,e)},d.jsonID=function(t,e){if(t in u)throw new RangeError("Duplicate use of step JSON ID "+t)
return u[t]=e,e.prototype.jsonID=t,e}
var f=function(t,e){this.doc=t,this.failed=e}
f.ok=function(t){return new f(t,null)},f.fail=function(t){return new f(null,t)},f.fromReplace=function(t,e,n,r){try{return f.ok(t.replace(e,n,r))}catch(i){if(i instanceof ls.ReplaceError)return f.fail(i.message)
throw i}}
var m=function(t){function e(e,n,r,i){t.call(this),this.from=e,this.to=n,this.slice=r,this.structure=!!i}return t&&(e.__proto__=t),e.prototype=Object.create(t&&t.prototype),e.prototype.constructor=e,e.prototype.apply=function(t){return this.structure&&v(t,this.from,this.to)?f.fail("Structure replace would overwrite content"):f.fromReplace(t,this.from,this.to,this.slice)},e.prototype.getMap=function(){return new o([this.from,this.to-this.from,this.slice.size])},e.prototype.invert=function(t){return new e(this.from,this.from+this.slice.size,t.slice(this.from,this.to))},e.prototype.map=function(t){var n=t.mapResult(this.from,1),r=t.mapResult(this.to,-1)
return n.deleted&&r.deleted?null:new e(n.pos,Math.max(n.pos,r.pos),this.slice)},e.prototype.merge=function(t){if(!(t instanceof e)||t.structure!=this.structure)return null
if(this.from+this.slice.size!=t.from||this.slice.openEnd||t.slice.openStart){if(t.to!=this.from||this.slice.openStart||t.slice.openEnd)return null
var n=this.slice.size+t.slice.size==0?ls.Slice.empty:new ls.Slice(t.slice.content.append(this.slice.content),t.slice.openStart,this.slice.openEnd)
return new e(t.from,this.to,n,this.structure)}var r=this.slice.size+t.slice.size==0?ls.Slice.empty:new ls.Slice(this.slice.content.append(t.slice.content),this.slice.openStart,t.slice.openEnd)
return new e(this.from,this.to+(t.to-t.from),r,this.structure)},e.prototype.toJSON=function(){var t={stepType:"replace",from:this.from,to:this.to}
return this.slice.size&&(t.slice=this.slice.toJSON()),this.structure&&(t.structure=!0),t},e.fromJSON=function(t,n){if("number"!=typeof n.from||"number"!=typeof n.to)throw new RangeError("Invalid input for ReplaceStep.fromJSON")
return new e(n.from,n.to,ls.Slice.fromJSON(t,n.slice),!!n.structure)},e}(d)
d.jsonID("replace",m)
var g=function(t){function e(e,n,r,i,s,o,a){t.call(this),this.from=e,this.to=n,this.gapFrom=r,this.gapTo=i,this.slice=s,this.insert=o,this.structure=!!a}return t&&(e.__proto__=t),e.prototype=Object.create(t&&t.prototype),e.prototype.constructor=e,e.prototype.apply=function(t){if(this.structure&&(v(t,this.from,this.gapFrom)||v(t,this.gapTo,this.to)))return f.fail("Structure gap-replace would overwrite content")
var e=t.slice(this.gapFrom,this.gapTo)
if(e.openStart||e.openEnd)return f.fail("Gap is not a flat range")
var n=this.slice.insertAt(this.insert,e.content)
return n?f.fromReplace(t,this.from,this.to,n):f.fail("Content does not fit in gap")},e.prototype.getMap=function(){return new o([this.from,this.gapFrom-this.from,this.insert,this.gapTo,this.to-this.gapTo,this.slice.size-this.insert])},e.prototype.invert=function(t){var n=this.gapTo-this.gapFrom
return new e(this.from,this.from+this.slice.size+n,this.from+this.insert,this.from+this.insert+n,t.slice(this.from,this.to).removeBetween(this.gapFrom-this.from,this.gapTo-this.from),this.gapFrom-this.from,this.structure)},e.prototype.map=function(t){var n=t.mapResult(this.from,1),r=t.mapResult(this.to,-1),i=t.map(this.gapFrom,-1),s=t.map(this.gapTo,1)
return n.deleted&&r.deleted||i<n.pos||s>r.pos?null:new e(n.pos,r.pos,i,s,this.slice,this.insert,this.structure)},e.prototype.toJSON=function(){var t={stepType:"replaceAround",from:this.from,to:this.to,gapFrom:this.gapFrom,gapTo:this.gapTo,insert:this.insert}
return this.slice.size&&(t.slice=this.slice.toJSON()),this.structure&&(t.structure=!0),t},e.fromJSON=function(t,n){if("number"!=typeof n.from||"number"!=typeof n.to||"number"!=typeof n.gapFrom||"number"!=typeof n.gapTo||"number"!=typeof n.insert)throw new RangeError("Invalid input for ReplaceAroundStep.fromJSON")
return new e(n.from,n.to,n.gapFrom,n.gapTo,ls.Slice.fromJSON(t,n.slice),n.insert,!!n.structure)},e}(d)
function v(t,e,n){for(var r=t.resolve(e),i=n-e,s=r.depth;i>0&&s>0&&r.indexAfter(s)==r.node(s).childCount;)s--,i--
if(i>0)for(var o=r.node(s).maybeChild(r.indexAfter(s));i>0;){if(!o||o.isLeaf)return!0
o=o.firstChild,i--}return!1}function y(t,e,n){return(0==e||t.canReplace(e,t.childCount))&&(n==t.childCount||t.canReplace(0,n))}function b(t){return{type:t,attrs:null}}function k(t,e){return t&&e&&!t.isLeaf&&t.canAppend(e)}function w(t,e,n){var r=t.resolve(e)
if(r.parent.canReplaceWith(r.index(),r.index(),n))return e
if(0==r.parentOffset)for(var i=r.depth-1;i>=0;i--){var s=r.index(i)
if(r.node(i).canReplaceWith(s,s,n))return r.before(i+1)
if(s>0)return null}if(r.parentOffset==r.parent.content.size)for(var o=r.depth-1;o>=0;o--){var a=r.indexAfter(o)
if(r.node(o).canReplaceWith(a,a,n))return r.after(o+1)
if(a<r.node(o).childCount)return null}}function x(t,e,n){for(var r=[],i=0;i<t.childCount;i++){var s=t.child(i)
s.content.size&&(s=s.copy(x(s.content,e,s))),s.isInline&&(s=e(s,n,i)),r.push(s)}return ls.Fragment.fromArray(r)}d.jsonID("replaceAround",g),c.prototype.lift=function(t,e){for(var n=t.$from,r=t.$to,i=t.depth,s=n.before(i+1),o=r.after(i+1),a=s,l=o,c=ls.Fragment.empty,h=0,p=i,u=!1;p>e;p--)u||n.index(p)>0?(u=!0,c=ls.Fragment.from(n.node(p).copy(c)),h++):a--
for(var d=ls.Fragment.empty,f=0,m=i,v=!1;m>e;m--)v||r.after(m+1)<r.end(m)?(v=!0,d=ls.Fragment.from(r.node(m).copy(d)),f++):l++
return this.step(new g(a,l,s,o,new ls.Slice(c.append(d),h,f),c.size-h,!0))},c.prototype.wrap=function(t,e){for(var n=ls.Fragment.empty,r=e.length-1;r>=0;r--)n=ls.Fragment.from(e[r].type.create(e[r].attrs,n))
var i=t.start,s=t.end
return this.step(new g(i,s,i,s,new ls.Slice(n,0,0),e.length,!0))},c.prototype.setBlockType=function(t,e,n,r){var i=this
if(void 0===e&&(e=t),!n.isTextblock)throw new RangeError("Type given to setBlockType should be a textblock")
var s=this.steps.length
return this.doc.nodesBetween(t,e,function(t,e){if(t.isTextblock&&!t.hasMarkup(n,r)&&function(t,e,n){var r=t.resolve(e),i=r.index()
return r.parent.canReplaceWith(i,i+1,n)}(i.doc,i.mapping.slice(s).map(e),n)){i.clearIncompatible(i.mapping.slice(s).map(e,1),n)
var o=i.mapping.slice(s),a=o.map(e,1),l=o.map(e+t.nodeSize,1)
return i.step(new g(a,l,a+1,l-1,new ls.Slice(ls.Fragment.from(n.create(r,null,t.marks)),0,0),1,!0)),!1}}),this},c.prototype.setNodeMarkup=function(t,e,n,r){var i=this.doc.nodeAt(t)
if(!i)throw new RangeError("No node at given position")
e||(e=i.type)
var s=e.create(n,null,r||i.marks)
if(i.isLeaf)return this.replaceWith(t,t+i.nodeSize,s)
if(!e.validContent(i.content))throw new RangeError("Invalid content for node type "+e.name)
return this.step(new g(t,t+i.nodeSize,t+1,t+i.nodeSize-1,new ls.Slice(ls.Fragment.from(s),0,0),1,!0))},c.prototype.split=function(t,e,n){void 0===e&&(e=1)
for(var r=this.doc.resolve(t),i=ls.Fragment.empty,s=ls.Fragment.empty,o=r.depth,a=r.depth-e,l=e-1;o>a;o--,l--){i=ls.Fragment.from(r.node(o).copy(i))
var c=n&&n[l]
s=ls.Fragment.from(c?c.type.create(c.attrs,s):r.node(o).copy(s))}return this.step(new m(t,t,new ls.Slice(i.append(s),e,e,!0)))},c.prototype.join=function(t,e){void 0===e&&(e=1)
var n=new m(t-e,t+e,ls.Slice.empty,!0)
return this.step(n)}
var S=function(t){function e(e,n,r){t.call(this),this.from=e,this.to=n,this.mark=r}return t&&(e.__proto__=t),e.prototype=Object.create(t&&t.prototype),e.prototype.constructor=e,e.prototype.apply=function(t){var e=this,n=t.slice(this.from,this.to),r=t.resolve(this.from),i=r.node(r.sharedDepth(this.to)),s=new ls.Slice(x(n.content,function(t,n){return n.type.allowsMarkType(e.mark.type)?t.mark(e.mark.addToSet(t.marks)):t},i),n.openStart,n.openEnd)
return f.fromReplace(t,this.from,this.to,s)},e.prototype.invert=function(){return new C(this.from,this.to,this.mark)},e.prototype.map=function(t){var n=t.mapResult(this.from,1),r=t.mapResult(this.to,-1)
return n.deleted&&r.deleted||n.pos>=r.pos?null:new e(n.pos,r.pos,this.mark)},e.prototype.merge=function(t){if(t instanceof e&&t.mark.eq(this.mark)&&this.from<=t.to&&this.to>=t.from)return new e(Math.min(this.from,t.from),Math.max(this.to,t.to),this.mark)},e.prototype.toJSON=function(){return{stepType:"addMark",mark:this.mark.toJSON(),from:this.from,to:this.to}},e.fromJSON=function(t,n){if("number"!=typeof n.from||"number"!=typeof n.to)throw new RangeError("Invalid input for AddMarkStep.fromJSON")
return new e(n.from,n.to,t.markFromJSON(n.mark))},e}(d)
d.jsonID("addMark",S)
var C=function(t){function e(e,n,r){t.call(this),this.from=e,this.to=n,this.mark=r}return t&&(e.__proto__=t),e.prototype=Object.create(t&&t.prototype),e.prototype.constructor=e,e.prototype.apply=function(t){var e=this,n=t.slice(this.from,this.to),r=new ls.Slice(x(n.content,function(t){return t.mark(e.mark.removeFromSet(t.marks))}),n.openStart,n.openEnd)
return f.fromReplace(t,this.from,this.to,r)},e.prototype.invert=function(){return new S(this.from,this.to,this.mark)},e.prototype.map=function(t){var n=t.mapResult(this.from,1),r=t.mapResult(this.to,-1)
return n.deleted&&r.deleted||n.pos>=r.pos?null:new e(n.pos,r.pos,this.mark)},e.prototype.merge=function(t){if(t instanceof e&&t.mark.eq(this.mark)&&this.from<=t.to&&this.to>=t.from)return new e(Math.min(this.from,t.from),Math.max(this.to,t.to),this.mark)},e.prototype.toJSON=function(){return{stepType:"removeMark",mark:this.mark.toJSON(),from:this.from,to:this.to}},e.fromJSON=function(t,n){if("number"!=typeof n.from||"number"!=typeof n.to)throw new RangeError("Invalid input for RemoveMarkStep.fromJSON")
return new e(n.from,n.to,t.markFromJSON(n.mark))},e}(d)
function M(t,e,n,r){if(void 0===n&&(n=e),void 0===r&&(r=ls.Slice.empty),e==n&&!r.size)return null
var i=t.resolve(e),s=t.resolve(n)
if(T(i,s,r))return new m(e,n,r)
var o=function(t,e){var n=function t(e,n,r,i){var s=ls.Fragment.empty,o=0,a=r[n]
if(e.depth>n){var l=t(e,n+1,r,i||a)
o=l.openEnd+1,s=ls.Fragment.from(e.node(n+1).copy(l.content))}a&&(s=s.append(a.content),o=a.openEnd)
i&&(s=s.append(e.node(n).contentMatchAt(e.indexAfter(n)).fillBefore(ls.Fragment.empty,!0)),o=0)
return{content:s,openEnd:o}}(t,0,e,!1),r=n.content,i=n.openEnd
return new ls.Slice(r,t.depth,i||0)}(i,function(t,e){for(var n=new A(t),r=1;e.size&&r<=3;r++)e=n.placeSlice(e.content,e.openStart,e.openEnd,r)
for(;n.open.length;)n.closeNode()
return n.placed}(i,r)),a=E(i,s,o)
if(!a)return null
if(o.size!=a.size&&function(t,e,n){if(!e.parent.isTextblock)return!1
var r,i=n.openEnd?function(t,e){for(var n=1;n<e;n++)t=t.lastChild.content
return t.lastChild}(n.content,n.openEnd):t.node(t.depth-(n.openStart-n.openEnd))
if(!i.isTextblock)return!1
for(var s=e.index();s<e.parent.childCount;s++)if(!i.type.allowsMarks(e.parent.child(s).marks))return!1
n.openEnd?r=i.contentMatchAt(i.childCount):(r=i.contentMatchAt(i.childCount),n.size&&(r=r.matchFragment(n.content,n.openStart?1:0)))
return(r=r.matchFragment(e.parent.content,e.index()))&&r.validEnd}(i,s,o)){for(var l=s.depth,c=s.after(l);l>1&&c==s.end(--l);)++c
var h=E(i,t.resolve(c),o)
if(h)return new g(e,c,n,s.end(),h,o.size)}return a.size||e!=n?new m(e,n,a):null}function O(t,e,n,r,i,s,o){var a,l=t.childCount,c=l-(o>0?1:0),h=s<0?e:n.node(i)
a=s<0?h.contentMatchAt(c):1==l&&o>0?h.contentMatchAt(s?n.index(i):n.indexAfter(i)):h.contentMatchAt(n.indexAfter(i)).matchFragment(t,l>0&&s?1:0,c)
var p=r.node(i)
if(o>0&&i<r.depth){var u=p.content.cutByIndex(r.indexAfter(i)).addToStart(t.lastChild),d=a.fillBefore(u,!0)
if(d&&d.size&&s>0&&1==l&&(d=null),d){var f=O(t.lastChild.content,t.lastChild,n,r,i+1,1==l?s-1:-1,o-1)
if(f){var m=t.lastChild.copy(f)
return d.size?t.cutByIndex(0,l-1).append(d).addToEnd(m):t.replaceChild(l-1,m)}}}o>0&&(a=a.matchType((1==l&&s>0?n.node(i+1):t.lastChild).type))
var g=r.index(i)
if(g==p.childCount&&!p.type.compatibleContent(e.type))return null
for(var v=a.fillBefore(p.content,!0,g),y=g;v&&y<p.content.childCount;y++)h.type.allowsMarks(p.content.child(y).marks)||(v=null)
if(!v)return null
if(o>0){var b=function t(e,n,r,i,s){var o,a=e.content,l=a.childCount
o=s>=0?r.node(i).contentMatchAt(r.indexAfter(i)).matchFragment(a,s>0?1:0,l):e.contentMatchAt(l)
if(n>0){var c=t(a.lastChild,n-1,r,i+1,1==l?s-1:-1)
a=a.replaceChild(l-1,c)}return e.copy(a.append(o.fillBefore(ls.Fragment.empty,!0)))}(t.lastChild,o-1,n,i+1,1==l?s-1:-1)
t=t.replaceChild(l-1,b)}return t=t.append(v),r.depth>i&&(t=t.addToEnd(function t(e,n){var r=e.node(n)
var i=r.contentMatchAt(0).fillBefore(r.content,!0,e.index(n))
e.depth>n&&(i=i.addToEnd(t(e,n+1)))
return r.copy(i)}(r,i+1))),t}function E(t,e,n){var r=O(n.content,t.node(0),t,e,0,n.openStart,n.openEnd)
return r?function(t,e,n){for(;e>0&&n>0&&1==t.childCount;)t=t.firstChild.content,e--,n--
return new ls.Slice(t,e,n)}(r,n.openStart,e.depth):null}function T(t,e,n){return!n.openStart&&!n.openEnd&&t.start()==e.start()&&t.parent.canReplace(t.index(),e.index(),n.content)}d.jsonID("removeMark",C),c.prototype.addMark=function(t,e,n){var r=this,i=[],s=[],o=null,a=null
return this.doc.nodesBetween(t,e,function(r,l,c){if(r.isInline){var h=r.marks
if(!n.isInSet(h)&&c.type.allowsMarkType(n.type)){for(var p=Math.max(l,t),u=Math.min(l+r.nodeSize,e),d=n.addToSet(h),f=0;f<h.length;f++)h[f].isInSet(d)||(o&&o.to==p&&o.mark.eq(h[f])?o.to=u:i.push(o=new C(p,u,h[f])))
a&&a.to==p?a.to=u:s.push(a=new S(p,u,n))}}}),i.forEach(function(t){return r.step(t)}),s.forEach(function(t){return r.step(t)}),this},c.prototype.removeMark=function(t,e,n){var r=this
void 0===n&&(n=null)
var i=[],s=0
return this.doc.nodesBetween(t,e,function(r,o){if(r.isInline){s++
var a=null
if(n instanceof ls.MarkType){var l=n.isInSet(r.marks)
l&&(a=[l])}else n?n.isInSet(r.marks)&&(a=[n]):a=r.marks
if(a&&a.length)for(var c=Math.min(o+r.nodeSize,e),h=0;h<a.length;h++){for(var p=a[h],u=void 0,d=0;d<i.length;d++){var f=i[d]
f.step==s-1&&p.eq(i[d].style)&&(u=f)}u?(u.to=c,u.step=s):i.push({style:p,from:Math.max(o,t),to:c,step:s})}}}),i.forEach(function(t){return r.step(new C(t.from,t.to,t.style))}),this},c.prototype.clearIncompatible=function(t,e,n){void 0===n&&(n=e.contentMatch)
for(var r=this.doc.nodeAt(t),i=[],s=t+1,o=0;o<r.childCount;o++){var a=r.child(o),l=s+a.nodeSize,c=n.matchType(a.type,a.attrs)
if(c){n=c
for(var h=0;h<a.marks.length;h++)e.allowsMarkType(a.marks[h].type)||this.step(new C(s,l,a.marks[h]))}else i.push(new m(s,l,ls.Slice.empty))
s=l}if(!n.validEnd){var p=n.fillBefore(ls.Fragment.empty,!0)
this.replace(s,s,new ls.Slice(p,0,0))}for(var u=i.length-1;u>=0;u--)this.step(i[u])
return this},c.prototype.replace=function(t,e,n){void 0===e&&(e=t),void 0===n&&(n=ls.Slice.empty)
var r=M(this.doc,t,e,n)
return r&&this.step(r),this},c.prototype.replaceWith=function(t,e,n){return this.replace(t,e,new ls.Slice(ls.Fragment.from(n),0,0))},c.prototype.delete=function(t,e){return this.replace(t,e,ls.Slice.empty)},c.prototype.insert=function(t,e){return this.replaceWith(t,t,e)}
var A=function(t){this.open=[]
for(var e=0;e<=t.depth;e++){var n=t.node(e),r=n.contentMatchAt(t.indexAfter(e))
this.open.push({parent:n,match:r,content:ls.Fragment.empty,wrapper:!1,openEnd:0,depth:e})}this.placed=[]}
function N(t,e,n){var r=t.content
if(e>1){var i=N(t.firstChild,e-1,1==t.childCount?n-1:0)
r=t.content.replaceChild(0,i)}var s=t.type.contentMatch.fillBefore(r,0==n)
return t.copy(s.append(r))}function D(t,e,n,r,i){if(e<n){var s=t.firstChild
t=t.replaceChild(0,s.copy(D(s.content,e+1,n,r,s)))}return e>r&&(t=i.contentMatchAt(0).fillBefore(t,!0).append(t)),t}function _(t,e){for(var n=[],r=Math.min(t.depth,e.depth);r>=0;r--){var i=t.start(r)
if(i<t.pos-(t.depth-r)||e.end(r)>e.pos+(e.depth-r)||t.node(r).type.spec.isolating||e.node(r).type.spec.isolating)break
i==e.start(r)&&n.push(r)}return n}A.prototype.placeSlice=function(t,e,n,r,i){if(e>0){var s=t.firstChild,o=this.placeSlice(s.content,Math.max(0,e-1),n&&1==t.childCount?n-1:0,r,s)
o.content!=s.content&&(o.content.size?(t=t.replaceChild(0,s.copy(o.content)),e=o.openStart+1):(1==t.childCount&&(n=0),t=t.cutByIndex(1),e=0))}var a=this.placeContent(t,e,n,r,i)
if(r>2&&a.size&&0==e){for(var l=0;l<a.content.childCount;l++){var c=a.content.child(l)
this.placeContent(c.content,0,n&&l==a.content.childCount.length-1?n-1:0,r,c)}a=ls.Fragment.empty}return a},A.prototype.placeContent=function(t,e,n,r,i){for(var s=0;s<t.childCount;s++){for(var o=t.child(s),a=!1,l=s==t.childCount-1,c=this.open.length-1;c>=0;c--){var h=this.open[c],p=void 0
if(r>1&&(p=h.match.findWrapping(o.type))&&(!i||!p.length||p[p.length-1]!=i.type)){for(;this.open.length-1>c;)this.closeNode()
for(var u=0;u<p.length;u++)h.match=h.match.matchType(p[u]),c++,h={parent:p[u].create(),match:p[u].contentMatch,content:ls.Fragment.empty,wrapper:!0,openEnd:0,depth:c+u},this.open.push(h)}var d=h.match.matchType(o.type)
if(!d){var f=h.match.fillBefore(ls.Fragment.from(o))
if(!f){if(i&&h.match.matchType(i.type))break
continue}for(var m=0;m<f.childCount;m++){var g=f.child(m)
this.addNode(h,g,0),d=h.match.matchFragment(g)}}for(;this.open.length-1>c;)this.closeNode()
o=o.mark(h.parent.type.allowedMarks(o.marks)),e&&(o=N(o,e,l?n:0),e=0),this.addNode(h,o,l?n:0),h.match=d,l&&(n=0),a=!0
break}if(!a)break}return this.open.length>1&&(s>0&&s==t.childCount||i&&this.open[this.open.length-1].parent.type==i.type)&&this.closeNode(),new ls.Slice(t.cutByIndex(s),e,n)},A.prototype.addNode=function(t,e,n){var r,i
t.content=(r=t.content,i=t.openEnd,i?r.replaceChild(r.childCount-1,function t(e,n){var r=e.content
if(n>1){var i=t(e.lastChild,n-1)
r=e.content.replaceChild(e.childCount-1,i)}var s=e.contentMatchAt(e.childCount).fillBefore(ls.Fragment.empty,!0)
return e.copy(r.append(s))}(r.lastChild,i)):r).addToEnd(e),t.openEnd=n},A.prototype.closeNode=function(){var t=this.open.pop()
0==t.content.size||(t.wrapper?this.addNode(this.open[this.open.length-1],t.parent.copy(t.content),t.openEnd+1):this.placed[t.depth]={depth:t.depth,content:t.content,openEnd:t.openEnd})},c.prototype.replaceRange=function(t,e,n){if(!n.size)return this.deleteRange(t,e)
var r=this.doc.resolve(t),i=this.doc.resolve(e)
if(T(r,i,n))return this.step(new m(t,e,n))
var s=_(r,this.doc.resolve(e))
0==s[s.length-1]&&s.pop()
var o=-(r.depth+1)
s.unshift(o)
for(var a=r.depth,l=r.pos-1;a>0;a--,l--){var c=r.node(a).type.spec
if(c.defining||c.isolating)break
s.indexOf(a)>-1?o=a:r.before(a)==l&&s.splice(1,0,-a)}for(var h=s.indexOf(o),p=[],u=n.openStart,d=n.content,f=0;;f++){var g=d.firstChild
if(p.push(g),f==n.openStart)break
d=g.content}u>0&&p[u-1].type.spec.defining&&r.node(h).type!=p[u-1].type?u-=1:u>=2&&p[u-1].isTextblock&&p[u-2].type.spec.defining&&r.node(h).type!=p[u-2].type&&(u-=2)
for(var v=n.openStart;v>=0;v--){var y=(v+u+1)%(n.openStart+1),b=p[y]
if(b)for(var k=0;k<s.length;k++){var w=s[(k+h)%s.length],x=!0
w<0&&(x=!1,w=-w)
var S=r.node(w-1),C=r.index(w-1)
if(S.canReplaceWith(C,C,b.type,b.marks))return this.replace(r.before(w),x?i.after(w):e,new ls.Slice(D(n.content,0,n.openStart,y),y,n.openEnd))}}return this.replace(t,e,n)},c.prototype.replaceRangeWith=function(t,e,n){if(!n.isInline&&t==e&&this.doc.resolve(t).parent.content.size){var r=w(this.doc,t,n.type)
null!=r&&(t=e=r)}return this.replaceRange(t,e,new ls.Slice(ls.Fragment.from(n),0,0))},c.prototype.deleteRange=function(t,e){for(var n=this.doc.resolve(t),r=this.doc.resolve(e),i=_(n,r),s=0;s<i.length;s++){var o=i[s],a=s==i.length-1
if(a&&0==o||n.node(o).type.contentMatch.validEnd)return this.delete(n.start(o),r.end(o))
if(o>0&&(a||n.node(o-1).canReplace(n.index(o-1),r.indexAfter(o-1))))return this.delete(n.before(o),r.after(o))}for(var l=1;l<=n.depth;l++)if(t-n.start(l)==n.depth-l&&e>n.end(l))return this.delete(n.before(l),e)
return this.delete(t,e)},e.Transform=c,e.TransformError=l,e.Step=d,e.StepResult=f,e.joinPoint=function(t,e,n){void 0===n&&(n=-1)
for(var r=t.resolve(e),i=r.depth;;i--){var s=void 0,o=void 0
if(i==r.depth?(s=r.nodeBefore,o=r.nodeAfter):n>0?(s=r.node(i+1),o=r.node(i).maybeChild(r.index(i)+1)):(s=r.node(i).maybeChild(r.index(i)-1),o=r.node(i+1)),s&&!s.isTextblock&&k(s,o))return e
if(0==i)break
e=n<0?r.before(i):r.after(i)}},e.canJoin=function(t,e){var n=t.resolve(e),r=n.index()
return k(n.nodeBefore,n.nodeAfter)&&n.parent.canReplace(r,r+1)},e.canSplit=function(t,e,n,r){void 0===n&&(n=1)
var i=t.resolve(e),s=i.depth-n,o=r&&r[r.length-1]||i.parent
if(s<0||i.parent.type.spec.isolating||!i.parent.canReplace(i.index(),i.parent.childCount)||!o.type.validContent(i.parent.content.cutByIndex(i.index(),i.parent.childCount)))return!1
for(var a=i.depth-1,l=n-2;a>s;a--,l--){var c=i.node(a),h=i.index(a)
if(c.type.spec.isolating)return!1
var p=c.content.cutByIndex(h,c.childCount),u=r&&r[l]||c
if(u!=c&&(p=p.replaceChild(0,u.type.create(u.attrs))),!c.canReplace(h+1,c.childCount)||!u.type.validContent(p))return!1}var d=i.indexAfter(s),f=r&&r[0]
return i.node(s).canReplaceWith(d,d,f?f.type:i.node(s+1).type)},e.insertPoint=w,e.dropPoint=function(t,e,n){var r=t.resolve(e)
if(!n.content.size)return e
for(var i=n.content,s=0;s<n.openStart;s++)i=i.firstChild.content
for(var o=1;o<=(0==n.openStart&&n.size?2:1);o++)for(var a=r.depth;a>=0;a--){var l=a==r.depth?0:r.pos<=(r.start(a+1)+r.end(a+1))/2?-1:1,c=r.index(a)+(l>0?1:0)
if(1==o?r.node(a).canReplace(c,c,i):r.node(a).contentMatchAt(c).findWrapping(i.firstChild.type))return 0==l?r.pos:l<0?r.before(a+1):r.after(a+1)}return null},e.liftTarget=function(t){for(var e=t.parent.content.cutByIndex(t.startIndex,t.endIndex),n=t.depth;;--n){var r=t.$from.node(n),i=t.$from.index(n),s=t.$to.indexAfter(n)
if(n<t.depth&&r.canReplace(i,s,e))return n
if(0==n||r.type.spec.isolating||!y(r,i,s))break}},e.findWrapping=function(t,e,n,r){void 0===r&&(r=t)
var i=function(t,e){var n=t.parent,r=t.startIndex,i=t.endIndex,s=n.contentMatchAt(r).findWrapping(e)
if(!s)return null
var o=s.length?s[0]:e
return n.canReplaceWith(r,i,o)?s:null}(t,e),s=i&&function(t,e){var n=t.parent,r=t.startIndex,i=t.endIndex,s=n.child(r),o=e.contentMatch.findWrapping(s.type)
if(!o)return null
for(var a=(o.length?o[o.length-1]:e).contentMatch,l=r;a&&l<i;l++)a=a.matchType(n.child(l).type)
return a&&a.validEnd?o:null}(r,e)
return s?i.map(b).concat({type:e,attrs:n}).concat(s.map(b)):null},e.StepMap=o,e.MapResult=s,e.Mapping=a,e.AddMarkStep=S,e.RemoveMarkStep=C,e.ReplaceStep=m,e.ReplaceAroundStep=g,e.replaceStep=M}))
rs(hs)
hs.Transform,hs.TransformError
var ps=hs.Step,us=hs.StepResult,ds=(hs.joinPoint,hs.canJoin,hs.canSplit,hs.insertPoint,hs.dropPoint,hs.liftTarget),fs=hs.findWrapping,ms=(hs.StepMap,hs.MapResult,hs.Mapping,hs.AddMarkStep,hs.RemoveMarkStep,hs.ReplaceStep,hs.ReplaceAroundStep,hs.replaceStep,is(function(t,e){Object.defineProperty(e,"__esModule",{value:!0})
var n=Object.create(null),r=function(t,e,n){this.ranges=n||[new s(t.min(e),t.max(e))],this.$anchor=t,this.$head=e},i={anchor:{},head:{},from:{},to:{},$from:{},$to:{},empty:{}}
i.anchor.get=function(){return this.$anchor.pos},i.head.get=function(){return this.$head.pos},i.from.get=function(){return this.$from.pos},i.to.get=function(){return this.$to.pos},i.$from.get=function(){return this.ranges[0].$from},i.$to.get=function(){return this.ranges[0].$to},i.empty.get=function(){for(var t=this.ranges,e=0;e<t.length;e++)if(t[e].$from.pos!=t[e].$to.pos)return!1
return!0},r.prototype.content=function(){return this.$from.node(0).slice(this.from,this.to,!0)},r.prototype.replace=function(t,e){void 0===e&&(e=ls.Slice.empty)
for(var n=e.content.lastChild,r=null,i=0;i<e.openEnd;i++)r=n,n=n.lastChild
for(var s=t.steps.length,o=this.ranges,a=0;a<o.length;a++){var l=o[a],c=l.$from,h=l.$to,p=t.mapping.slice(s)
t.replaceRange(p.map(c.pos),p.map(h.pos),a?ls.Slice.empty:e),0==a&&d(t,s,(n?n.isInline:r&&r.isTextblock)?-1:1)}},r.prototype.replaceWith=function(t,e){for(var n=t.steps.length,r=this.ranges,i=0;i<r.length;i++){var s=r[i],o=s.$from,a=s.$to,l=t.mapping.slice(n),c=l.map(o.pos),h=l.map(a.pos)
i?t.deleteRange(c,h):(t.replaceRangeWith(c,h,e),d(t,n,e.isInline?-1:1))}},r.findFrom=function(t,e,n){var r=t.parent.inlineContent?new o(t):u(t.node(0),t.parent,t.pos,t.index(),e,n)
if(r)return r
for(var i=t.depth-1;i>=0;i--){var s=e<0?u(t.node(0),t.node(i),t.before(i+1),t.index(i),e,n):u(t.node(0),t.node(i),t.after(i+1),t.index(i)+1,e,n)
if(s)return s}},r.near=function(t,e){return void 0===e&&(e=1),this.findFrom(t,e)||this.findFrom(t,-e)||new h(t.node(0))},r.atStart=function(t){return u(t,t,0,0,1)||new h(t)},r.atEnd=function(t){return u(t,t,t.content.size,t.childCount,-1)||new h(t)},r.fromJSON=function(t,e){if(!e||!e.type)throw new RangeError("Invalid input for Selection.fromJSON")
var r=n[e.type]
if(!r)throw new RangeError("No selection type "+e.type+" defined")
return r.fromJSON(t,e)},r.jsonID=function(t,e){if(t in n)throw new RangeError("Duplicate use of selection JSON ID "+t)
return n[t]=e,e.prototype.jsonID=t,e},r.prototype.getBookmark=function(){return o.between(this.$anchor,this.$head).getBookmark()},Object.defineProperties(r.prototype,i),r.prototype.visible=!0
var s=function(t,e){this.$from=t,this.$to=e},o=function(t){function e(e,n){void 0===n&&(n=e),t.call(this,e,n)}t&&(e.__proto__=t),e.prototype=Object.create(t&&t.prototype),e.prototype.constructor=e
var n={$cursor:{}}
return n.$cursor.get=function(){return this.$anchor.pos==this.$head.pos?this.$head:null},e.prototype.map=function(n,r){var i=n.resolve(r.map(this.head))
if(!i.parent.inlineContent)return t.near(i)
var s=n.resolve(r.map(this.anchor))
return new e(s.parent.inlineContent?s:i,i)},e.prototype.replace=function(e,n){if(void 0===n&&(n=ls.Slice.empty),t.prototype.replace.call(this,e,n),n==ls.Slice.empty){var r=this.$from.marksAcross(this.$to)
r&&e.ensureMarks(r)}},e.prototype.eq=function(t){return t instanceof e&&t.anchor==this.anchor&&t.head==this.head},e.prototype.getBookmark=function(){return new a(this.anchor,this.head)},e.prototype.toJSON=function(){return{type:"text",anchor:this.anchor,head:this.head}},e.fromJSON=function(t,n){if("number"!=typeof n.anchor||"number"!=typeof n.head)throw new RangeError("Invalid input for TextSelection.fromJSON")
return new e(t.resolve(n.anchor),t.resolve(n.head))},e.create=function(t,e,n){void 0===n&&(n=e)
var r=t.resolve(e)
return new this(r,n==e?r:t.resolve(n))},e.between=function(n,r,i){var s=n.pos-r.pos
if(i&&!s||(i=s>=0?1:-1),!r.parent.inlineContent){var o=t.findFrom(r,i,!0)||t.findFrom(r,-i,!0)
if(!o)return t.near(r,i)
r=o.$head}return n.parent.inlineContent||(0==s?n=r:(n=(t.findFrom(n,-i,!0)||t.findFrom(n,i,!0)).$anchor).pos<r.pos!=s<0&&(n=r)),new e(n,r)},Object.defineProperties(e.prototype,n),e}(r)
r.jsonID("text",o)
var a=function(t,e){this.anchor=t,this.head=e}
a.prototype.map=function(t){return new a(t.map(this.anchor),t.map(this.head))},a.prototype.resolve=function(t){return o.between(t.resolve(this.anchor),t.resolve(this.head))}
var l=function(t){function e(e){var n=e.nodeAfter,r=e.node(0).resolve(e.pos+n.nodeSize)
t.call(this,e,r),this.node=n}return t&&(e.__proto__=t),e.prototype=Object.create(t&&t.prototype),e.prototype.constructor=e,e.prototype.map=function(n,r){var i=r.mapResult(this.anchor),s=i.deleted,o=i.pos,a=n.resolve(o)
return s?t.near(a):new e(a)},e.prototype.content=function(){return new ls.Slice(ls.Fragment.from(this.node),0,0)},e.prototype.eq=function(t){return t instanceof e&&t.anchor==this.anchor},e.prototype.toJSON=function(){return{type:"node",anchor:this.anchor}},e.prototype.getBookmark=function(){return new c(this.anchor)},e.fromJSON=function(t,n){if("number"!=typeof n.anchor)throw new RangeError("Invalid input for NodeSelection.fromJSON")
return new e(t.resolve(n.anchor))},e.create=function(t,e){return new this(t.resolve(e))},e.isSelectable=function(t){return!t.isText&&!1!==t.type.spec.selectable},e}(r)
l.prototype.visible=!1,r.jsonID("node",l)
var c=function(t){this.anchor=t}
c.prototype.map=function(t){var e=t.mapResult(this.anchor),n=e.deleted,r=e.pos
return n?new a(r,r):new c(r)},c.prototype.resolve=function(t){var e=t.resolve(this.anchor),n=e.nodeAfter
return n&&l.isSelectable(n)?new l(e):r.near(e)}
var h=function(t){function e(e){t.call(this,e.resolve(0),e.resolve(e.content.size))}return t&&(e.__proto__=t),e.prototype=Object.create(t&&t.prototype),e.prototype.constructor=e,e.prototype.toJSON=function(){return{type:"all"}},e.fromJSON=function(t){return new e(t)},e.prototype.map=function(t){return new e(t)},e.prototype.eq=function(t){return t instanceof e},e.prototype.getBookmark=function(){return p},e}(r)
r.jsonID("all",h)
var p={map:function(){return this},resolve:function(t){return new h(t)}}
function u(t,e,n,r,i,s){if(e.inlineContent)return o.create(t,n)
for(var a=r-(i>0?0:1);i>0?a<e.childCount:a>=0;a+=i){var c=e.child(a)
if(c.isAtom){if(!s&&l.isSelectable(c))return l.create(t,n-(i<0?c.nodeSize:0))}else{var h=u(t,c,n+i,i<0?c.childCount:0,i,s)
if(h)return h}n+=c.nodeSize*i}}function d(t,e,n){var i=t.steps.length-1
if(!(i<e)){var s,o=t.steps[i]
if(o instanceof hs.ReplaceStep||o instanceof hs.ReplaceAroundStep)t.mapping.maps[i].forEach(function(t,e,n,r){null==s&&(s=r)}),t.setSelection(r.near(t.doc.resolve(s),n))}}var f=function(t){function e(e){t.call(this,e.doc),this.time=Date.now(),this.curSelection=e.selection,this.curSelectionFor=0,this.storedMarks=e.storedMarks,this.updated=0,this.meta=Object.create(null)}t&&(e.__proto__=t),e.prototype=Object.create(t&&t.prototype),e.prototype.constructor=e
var n={selection:{},selectionSet:{},storedMarksSet:{},isGeneric:{},scrolledIntoView:{}}
return n.selection.get=function(){return this.curSelectionFor<this.steps.length&&(this.curSelection=this.curSelection.map(this.doc,this.mapping.slice(this.curSelectionFor)),this.curSelectionFor=this.steps.length),this.curSelection},e.prototype.setSelection=function(t){return this.curSelection=t,this.curSelectionFor=this.steps.length,this.updated=-3&(1|this.updated),this.storedMarks=null,this},n.selectionSet.get=function(){return(1&this.updated)>0},e.prototype.setStoredMarks=function(t){return this.storedMarks=t,this.updated|=2,this},e.prototype.ensureMarks=function(t){return ls.Mark.sameSet(this.storedMarks||this.selection.$from.marks(),t)||this.setStoredMarks(t),this},e.prototype.addStoredMark=function(t){return this.ensureMarks(t.addToSet(this.storedMarks||this.selection.$head.marks()))},e.prototype.removeStoredMark=function(t){return this.ensureMarks(t.removeFromSet(this.storedMarks||this.selection.$head.marks()))},n.storedMarksSet.get=function(){return(2&this.updated)>0},e.prototype.addStep=function(e,n){t.prototype.addStep.call(this,e,n),this.updated=-3&this.updated,this.storedMarks=null},e.prototype.setTime=function(t){return this.time=t,this},e.prototype.replaceSelection=function(t){return this.selection.replace(this,t),this},e.prototype.replaceSelectionWith=function(t,e){var n=this.selection
return!1!==e&&(t=t.mark(this.storedMarks||(n.empty?n.$from.marks():n.$from.marksAcross(n.$to)||ls.Mark.none))),n.replaceWith(this,t),this},e.prototype.deleteSelection=function(){return this.selection.replace(this),this},e.prototype.insertText=function(t,e,n){void 0===n&&(n=e)
var r=this.doc.type.schema
if(null==e)return t?this.replaceSelectionWith(r.text(t),!0):this.deleteSelection()
if(!t)return this.deleteRange(e,n)
var i=this.storedMarks
if(!i){var s=this.doc.resolve(e)
i=n==e?s.marks():s.marksAcross(this.doc.resolve(n))}return this.replaceRangeWith(e,n,r.text(t,i))},e.prototype.setMeta=function(t,e){return this.meta["string"==typeof t?t:t.key]=e,this},e.prototype.getMeta=function(t){return this.meta["string"==typeof t?t:t.key]},n.isGeneric.get=function(){for(var t in this.meta)return!1
return!0},e.prototype.scrollIntoView=function(){return this.updated|=4,this},n.scrolledIntoView.get=function(){return(4&this.updated)>0},Object.defineProperties(e.prototype,n),e}(hs.Transform)
function m(t,e){return e&&t?t.bind(e):t}var g=function(t,e,n){this.name=t,this.init=m(e.init,n),this.apply=m(e.apply,n)},v=[new g("doc",{init:function(t){return t.doc||t.schema.topNodeType.createAndFill()},apply:function(t){return t.doc}}),new g("selection",{init:function(t,e){return t.selection||r.atStart(e.doc)},apply:function(t){return t.selection}}),new g("storedMarks",{init:function(t){return t.storedMarks||null},apply:function(t,e,n,r){return r.selection.$cursor?t.storedMarks:null}}),new g("scrollToSelection",{init:function(){return 0},apply:function(t,e){return t.scrolledIntoView?e+1:e}})],y=function(t,e){var n=this
this.schema=t,this.fields=v.concat(),this.plugins=[],this.pluginsByKey=Object.create(null),e&&e.forEach(function(t){if(n.pluginsByKey[t.key])throw new RangeError("Adding different instances of a keyed plugin ("+t.key+")")
n.plugins.push(t),n.pluginsByKey[t.key]=t,t.spec.state&&n.fields.push(new g(t.key,t.spec.state,t))})},b=function(t){this.config=t},k={schema:{},plugins:{},tr:{}}
k.schema.get=function(){return this.config.schema},k.plugins.get=function(){return this.config.plugins},b.prototype.apply=function(t){return this.applyTransaction(t).state},b.prototype.filterTransaction=function(t,e){void 0===e&&(e=-1)
for(var n=0;n<this.config.plugins.length;n++)if(n!=e){var r=this.config.plugins[n]
if(r.spec.filterTransaction&&!r.spec.filterTransaction.call(r,t,this))return!1}return!0},b.prototype.applyTransaction=function(t){if(!this.filterTransaction(t))return{state:this,transactions:[]}
for(var e=[t],n=this.applyInner(t),r=null;;){for(var i=!1,s=0;s<this.config.plugins.length;s++){var o=this.config.plugins[s]
if(o.spec.appendTransaction){var a=r?r[s].n:0,l=r?r[s].state:this,c=a<e.length&&o.spec.appendTransaction.call(o,a?e.slice(a):e,l,n)
if(c&&n.filterTransaction(c,s)){if(c.setMeta("appendedTransaction",t),!r){r=[]
for(var h=0;h<this.config.plugins.length;h++)r.push(h<s?{state:n,n:e.length}:{state:this,n:0})}e.push(c),n=n.applyInner(c),i=!0}r&&(r[s]={state:n,n:e.length})}}if(!i)return{state:n,transactions:e}}},b.prototype.applyInner=function(t){if(!t.before.eq(this.doc))throw new RangeError("Applying a mismatched transaction")
for(var e=new b(this.config),n=this.config.fields,r=0;r<n.length;r++){var i=n[r]
e[i.name]=i.apply(t,this[i.name],this,e)}for(var s=0;s<w.length;s++)w[s](this,t,e)
return e},k.tr.get=function(){return new f(this)},b.create=function(t){for(var e=new y(t.schema||t.doc.type.schema,t.plugins),n=new b(e),r=0;r<e.fields.length;r++)n[e.fields[r].name]=e.fields[r].init(t,n)
return n},b.prototype.reconfigure=function(t){for(var e=new y(t.schema||this.schema,t.plugins),n=e.fields,r=new b(e),i=0;i<n.length;i++){var s=n[i].name
r[s]=this.hasOwnProperty(s)?this[s]:n[i].init(t,r)}return r},b.prototype.toJSON=function(t){var e={doc:this.doc.toJSON(),selection:this.selection.toJSON()}
if(this.storedMarks&&(e.storedMarks=this.storedMarks.map(function(t){return t.toJSON()})),t&&"object"==typeof t)for(var n in t){if("doc"==n||"selection"==n)throw new RangeError("The JSON fields `doc` and `selection` are reserved")
var r=t[n],i=r.spec.state
i&&i.toJSON&&(e[n]=i.toJSON.call(r,this[r.key]))}return e},b.fromJSON=function(t,e,n){if(!e)throw new RangeError("Invalid input for EditorState.fromJSON")
if(!t.schema)throw new RangeError("Required config field 'schema' missing")
var i=new y(t.schema,t.plugins),s=new b(i)
return i.fields.forEach(function(i){if("doc"==i.name)s.doc=ls.Node.fromJSON(t.schema,e.doc)
else if("selection"==i.name)s.selection=r.fromJSON(s.doc,e.selection)
else if("storedMarks"==i.name)e.storedMarks&&(s.storedMarks=e.storedMarks.map(t.schema.markFromJSON))
else{if(n)for(var o in n){var a=n[o],l=a.spec.state
if(a.key==i.name&&l&&l.fromJSON&&Object.prototype.hasOwnProperty.call(e,o))return void(s[i.name]=l.fromJSON.call(a,t,e[o],s))}s[i.name]=i.init(t,s)}}),s},b.addApplyListener=function(t){w.push(t)},b.removeApplyListener=function(t){var e=w.indexOf(t)
e>-1&&w.splice(e,1)},Object.defineProperties(b.prototype,k)
var w=[]
var x=function(t){this.props={},t.props&&function t(e,n,r){for(var i in e){var s=e[i]
s instanceof Function?s=s.bind(n):"handleDOMEvents"==i&&(s=t(s,n,{})),r[i]=s}return r}(t.props,this,this.props),this.spec=t,this.key=t.key?t.key.key:C("plugin")}
x.prototype.getState=function(t){return t[this.key]}
var S=Object.create(null)
function C(t){return t in S?t+"$"+ ++S[t]:(S[t]=0,t+"$")}var M=function(t){void 0===t&&(t="key"),this.key=C(t)}
M.prototype.get=function(t){return t.config.pluginsByKey[this.key]},M.prototype.getState=function(t){return t[this.key]},e.Selection=r,e.SelectionRange=s,e.TextSelection=o,e.NodeSelection=l,e.AllSelection=h,e.Transaction=f,e.EditorState=b,e.Plugin=x,e.PluginKey=M}))
rs(ms)
ms.Selection,ms.SelectionRange,ms.TextSelection,ms.NodeSelection,ms.AllSelection,ms.Transaction
var gs=ms.EditorState,vs=(ms.Plugin,ms.PluginKey,is(function(t,e){function n(t,e){return!t.selection.empty&&(e&&e(t.tr.deleteSelection().scrollIntoView()),!0)}function r(t,e,n){var r=t.selection.$cursor
if(!r||(n?!n.endOfTextblock("backward",t):r.parentOffset>0))return!1
var s=o(r)
if(!s){var a=r.blockRange(),l=a&&hs.liftTarget(a)
return null!=l&&(e&&e(t.tr.lift(a,l).scrollIntoView()),!0)}var c=s.nodeBefore
if(!c.type.spec.isolating&&g(t,s,e))return!0
if(0==r.parent.content.size&&(i(c,"end")||ms.NodeSelection.isSelectable(c))){if(e){var h=t.tr.deleteRange(r.before(),r.after())
h.setSelection(i(c,"end")?ms.Selection.findFrom(h.doc.resolve(h.mapping.map(s.pos,-1)),-1):ms.NodeSelection.create(h.doc,s.pos-c.nodeSize)),e(h.scrollIntoView())}return!0}return!(!c.isAtom||s.depth!=r.depth-1)&&(e&&e(t.tr.delete(s.pos-c.nodeSize,s.pos).scrollIntoView()),!0)}function i(t,e){for(;t;t="start"==e?t.firstChild:t.lastChild)if(t.isTextblock)return!0
return!1}function s(t,e,n){var r=t.selection.$cursor
if(!r||(n?!n.endOfTextblock("backward",t):r.parentOffset>0))return!1
var i=o(r),s=i&&i.nodeBefore
return!(!s||!ms.NodeSelection.isSelectable(s))&&(e&&e(t.tr.setSelection(ms.NodeSelection.create(t.doc,i.pos-s.nodeSize)).scrollIntoView()),!0)}function o(t){if(!t.parent.type.spec.isolating)for(var e=t.depth-1;e>=0;e--){if(t.index(e)>0)return t.doc.resolve(t.before(e+1))
if(t.node(e).type.spec.isolating)break}return null}function a(t,e,n){var r=t.selection.$cursor
if(!r||(n?!n.endOfTextblock("forward",t):r.parentOffset<r.parent.content.size))return!1
var s=c(r)
if(!s)return!1
var o=s.nodeAfter
if(g(t,s,e))return!0
if(0==r.parent.content.size&&(i(o,"start")||ms.NodeSelection.isSelectable(o))){if(e){var a=t.tr.deleteRange(r.before(),r.after())
a.setSelection(i(o,"start")?ms.Selection.findFrom(a.doc.resolve(a.mapping.map(s.pos)),1):ms.NodeSelection.create(a.doc,a.mapping.map(s.pos))),e(a.scrollIntoView())}return!0}return!(!o.isAtom||s.depth!=r.depth-1)&&(e&&e(t.tr.delete(s.pos,s.pos+o.nodeSize).scrollIntoView()),!0)}function l(t,e,n){var r=t.selection.$cursor
if(!r||(n?!n.endOfTextblock("forward",t):r.parentOffset<r.parent.content.size))return!1
var i=c(r),s=i&&i.nodeAfter
return!(!s||!ms.NodeSelection.isSelectable(s))&&(e&&e(t.tr.setSelection(ms.NodeSelection.create(t.doc,i.pos)).scrollIntoView()),!0)}function c(t){if(!t.parent.type.spec.isolating)for(var e=t.depth-1;e>=0;e--){var n=t.node(e)
if(t.index(e)+1<n.childCount)return t.doc.resolve(t.after(e+1))
if(n.type.spec.isolating)break}return null}function h(t,e){var n=t.selection,r=n.$head,i=n.$anchor
return!(!r.parent.type.spec.code||!r.sameParent(i))&&(e&&e(t.tr.insertText("\n").scrollIntoView()),!0)}function p(t,e){var n=t.selection,r=n.$head,i=n.$anchor
if(!r.parent.type.spec.code||!r.sameParent(i))return!1
var s=r.node(-1),o=r.indexAfter(-1),a=s.contentMatchAt(o).defaultType
if(!s.canReplaceWith(o,o,a))return!1
if(e){var l=r.after(),c=t.tr.replaceWith(l,l,a.createAndFill())
c.setSelection(ms.Selection.near(c.doc.resolve(l),1)),e(c.scrollIntoView())}return!0}function u(t,e){var n=t.selection,r=n.$from,i=n.$to
if(r.parent.inlineContent||i.parent.inlineContent)return!1
var s=r.parent.contentMatchAt(i.indexAfter()).defaultType
if(!s||!s.isTextblock)return!1
if(e){var o=(!r.parentOffset&&i.index()<i.parent.childCount?r:i).pos,a=t.tr.insert(o,s.createAndFill())
a.setSelection(ms.TextSelection.create(a.doc,o+1)),e(a.scrollIntoView())}return!0}function d(t,e){var n=t.selection.$cursor
if(!n||n.parent.content.size)return!1
if(n.depth>1&&n.after()!=n.end(-1)){var r=n.before()
if(hs.canSplit(t.doc,r))return e&&e(t.tr.split(r).scrollIntoView()),!0}var i=n.blockRange(),s=i&&hs.liftTarget(i)
return null!=s&&(e&&e(t.tr.lift(i,s).scrollIntoView()),!0)}function f(t,e){var n=t.selection,r=n.$from,i=n.$to
if(t.selection instanceof ms.NodeSelection&&t.selection.node.isBlock)return!(!r.parentOffset||!hs.canSplit(t.doc,r.pos))&&(e&&e(t.tr.split(r.pos).scrollIntoView()),!0)
if(!r.parent.isBlock)return!1
if(e){var s=i.parentOffset==i.parent.content.size,o=t.tr
t.selection instanceof ms.TextSelection&&o.deleteSelection()
var a=0==r.depth?null:r.node(-1).contentMatchAt(r.indexAfter(-1)).defaultType,l=s&&a?[{type:a}]:null,c=hs.canSplit(o.doc,r.pos,1,l)
l||c||!hs.canSplit(o.doc,o.mapping.map(r.pos),1,a&&[{type:a}])||(l=[{type:a}],c=!0),c&&(o.split(o.mapping.map(r.pos),1,l),s||r.parentOffset||r.parent.type==a||!r.node(-1).canReplace(r.index(-1),r.indexAfter(-1),ls.Fragment.from(a.create(),r.parent))||o.setNodeMarkup(o.mapping.map(r.before()),a)),e(o.scrollIntoView())}return!0}function m(t,e){return e&&e(t.tr.setSelection(new ms.AllSelection(t.doc))),!0}function g(t,e,n){var r,i,s=e.nodeBefore,o=e.nodeAfter
if(s.type.spec.isolating||o.type.spec.isolating)return!1
if(function(t,e,n){var r=e.nodeBefore,i=e.nodeAfter,s=e.index()
return!(!(r&&i&&r.type.compatibleContent(i.type))||(!r.content.size&&e.parent.canReplace(s-1,s)?(n&&n(t.tr.delete(e.pos-r.nodeSize,e.pos).scrollIntoView()),0):!e.parent.canReplace(s,s+1)||!i.isTextblock&&!hs.canJoin(t.doc,e.pos)||(n&&n(t.tr.clearIncompatible(e.pos,r.type,r.contentMatchAt(r.childCount)).join(e.pos).scrollIntoView()),0)))}(t,e,n))return!0
if(e.parent.canReplace(e.index(),e.index()+1)&&(r=(i=s.contentMatchAt(s.childCount)).findWrapping(o.type))&&i.matchType(r[0]||o.type).validEnd){if(n){for(var a=e.pos+o.nodeSize,l=ls.Fragment.empty,c=r.length-1;c>=0;c--)l=ls.Fragment.from(r[c].create(null,l))
l=ls.Fragment.from(s.copy(l))
var h=t.tr.step(new hs.ReplaceAroundStep(e.pos-1,a,e.pos,a,new ls.Slice(l,1,0),r.length,!0)),p=a+2*r.length
hs.canJoin(h.doc,p)&&h.join(p),n(h.scrollIntoView())}return!0}var u=ms.Selection.findFrom(e,1),d=u&&u.$from.blockRange(u.$to),f=d&&hs.liftTarget(d)
return null!=f&&f>=e.depth&&(n&&n(t.tr.lift(d,f).scrollIntoView()),!0)}function v(){for(var t=[],e=arguments.length;e--;)t[e]=arguments[e]
return function(e,n,r){for(var i=0;i<t.length;i++)if(t[i](e,n,r))return!0
return!1}}Object.defineProperty(e,"__esModule",{value:!0})
var y=v(n,r,s),b=v(n,a,l),k={Enter:v(h,u,d,f),"Mod-Enter":p,Backspace:y,"Mod-Backspace":y,Delete:b,"Mod-Delete":b,"Mod-a":m},w={"Ctrl-h":k.Backspace,"Alt-Backspace":k["Mod-Backspace"],"Ctrl-d":k.Delete,"Ctrl-Alt-Backspace":k["Mod-Delete"],"Alt-Delete":k["Mod-Delete"],"Alt-d":k["Mod-Delete"]}
for(var x in k)w[x]=k[x]
var S=("undefined"!=typeof navigator?/Mac/.test(navigator.platform):"undefined"!=typeof os&&"darwin"==os.platform())?w:k
e.deleteSelection=n,e.joinBackward=r,e.selectNodeBackward=s,e.joinForward=a,e.selectNodeForward=l,e.joinUp=function(t,e){var n,r=t.selection,i=r instanceof ms.NodeSelection
if(i){if(r.node.isTextblock||!hs.canJoin(t.doc,r.from))return!1
n=r.from}else if(null==(n=hs.joinPoint(t.doc,r.from,-1)))return!1
if(e){var s=t.tr.join(n)
i&&s.setSelection(ms.NodeSelection.create(s.doc,n-t.doc.resolve(n).nodeBefore.nodeSize)),e(s.scrollIntoView())}return!0},e.joinDown=function(t,e){var n,r=t.selection
if(r instanceof ms.NodeSelection){if(r.node.isTextblock||!hs.canJoin(t.doc,r.to))return!1
n=r.to}else if(null==(n=hs.joinPoint(t.doc,r.to,1)))return!1
return e&&e(t.tr.join(n).scrollIntoView()),!0},e.lift=function(t,e){var n=t.selection,r=n.$from,i=n.$to,s=r.blockRange(i),o=s&&hs.liftTarget(s)
return null!=o&&(e&&e(t.tr.lift(s,o).scrollIntoView()),!0)},e.newlineInCode=h,e.exitCode=p,e.createParagraphNear=u,e.liftEmptyBlock=d,e.splitBlock=f,e.splitBlockKeepMarks=function(t,e){return f(t,e&&function(n){var r=t.storedMarks||t.selection.$to.parentOffset&&t.selection.$from.marks()
r&&n.ensureMarks(r),e(n)})},e.selectParentNode=function(t,e){var n,r=t.selection,i=r.$from,s=r.to,o=i.sharedDepth(s)
return 0!=o&&(n=i.before(o),e&&e(t.tr.setSelection(ms.NodeSelection.create(t.doc,n))),!0)},e.selectAll=m,e.wrapIn=function(t,e){return function(n,r){var i=n.selection,s=i.$from,o=i.$to,a=s.blockRange(o),l=a&&hs.findWrapping(a,t,e)
return!!l&&(r&&r(n.tr.wrap(a,l).scrollIntoView()),!0)}},e.setBlockType=function(t,e){return function(n,r){var i=n.selection,s=i.from,o=i.to,a=!1
return n.doc.nodesBetween(s,o,function(r,i){if(a)return!1
if(r.isTextblock&&!r.hasMarkup(t,e))if(r.type==t)a=!0
else{var s=n.doc.resolve(i),o=s.index()
a=s.parent.canReplaceWith(o,o+1,t)}}),!!a&&(r&&r(n.tr.setBlockType(s,o,t,e).scrollIntoView()),!0)}},e.toggleMark=function(t,e){return function(n,r){var i=n.selection,s=i.empty,o=i.$cursor,a=i.ranges
if(s&&!o||!function(t,e,n){for(var r=function(r){var i=e[r],s=i.$from,o=i.$to,a=0==s.depth&&t.type.allowsMarkType(n)
if(t.nodesBetween(s.pos,o.pos,function(t){if(a)return!1
a=t.inlineContent&&t.type.allowsMarkType(n)}),a)return{v:!0}},i=0;i<e.length;i++){var s=r(i)
if(s)return s.v}return!1}(n.doc,a,t))return!1
if(r)if(o)t.isInSet(n.storedMarks||o.marks())?r(n.tr.removeStoredMark(t)):r(n.tr.addStoredMark(t.create(e)))
else{for(var l=!1,c=n.tr,h=0;!l&&h<a.length;h++){var p=a[h],u=p.$from,d=p.$to
l=n.doc.rangeHasMark(u.pos,d.pos,t)}for(var f=0;f<a.length;f++){var m=a[f],g=m.$from,v=m.$to
l?c.removeMark(g.pos,v.pos,t):c.addMark(g.pos,v.pos,t.create(e))}r(c.scrollIntoView())}return!0}},e.autoJoin=function(t,e){if(Array.isArray(e)){var n=e
e=function(t){return n.indexOf(t.type.name)>-1}}return function(n,r){return t(n,r&&function(t,e){return function(n){if(!n.isGeneric)return t(n)
for(var r=[],i=0;i<n.mapping.maps.length;i++){for(var s=n.mapping.maps[i],o=0;o<r.length;o++)r[o]=s.map(r[o])
s.forEach(function(t,e,n,i){return r.push(n,i)})}for(var a=[],l=0;l<r.length;l+=2)for(var c=r[l],h=r[l+1],p=n.doc.resolve(c),u=p.sharedDepth(h),d=p.node(u),f=p.indexAfter(u),m=p.after(u+1);m<=h;++f){var g=d.maybeChild(f)
if(!g)break
if(f&&-1==a.indexOf(m)){var v=d.child(f-1)
v.type==g.type&&e(v,g)&&a.push(m)}m+=g.nodeSize}a.sort(function(t,e){return t-e})
for(var y=a.length-1;y>=0;y--)hs.canJoin(n.doc,a[y])&&n.join(a[y])
t(n)}}(r,e))}},e.chainCommands=v,e.pcBaseKeymap=k,e.macBaseKeymap=w,e.baseKeymap=S}))
rs(vs)
vs.deleteSelection,vs.joinBackward,vs.selectNodeBackward,vs.joinForward,vs.selectNodeForward,vs.joinUp,vs.joinDown,vs.lift,vs.newlineInCode,vs.exitCode,vs.createParagraphNear,vs.liftEmptyBlock,vs.splitBlock,vs.splitBlockKeepMarks,vs.selectParentNode,vs.selectAll,vs.wrapIn
var ys=vs.setBlockType,bs=vs.toggleMark,ks=(vs.autoJoin,vs.chainCommands,vs.pcBaseKeymap,vs.macBaseKeymap,vs.baseKeymap),ws=function(){}
ws.prototype.append=function(t){return t.length?(t=ws.from(t),!this.length&&t||t.length<200&&this.leafAppend(t)||this.length<200&&t.leafPrepend(this)||this.appendInner(t)):this},ws.prototype.prepend=function(t){return t.length?ws.from(t).append(this):this},ws.prototype.appendInner=function(t){return new Ss(this,t)},ws.prototype.slice=function(t,e){return void 0===t&&(t=0),void 0===e&&(e=this.length),t>=e?ws.empty:this.sliceInner(Math.max(0,t),Math.min(this.length,e))},ws.prototype.get=function(t){if(!(t<0||t>=this.length))return this.getInner(t)},ws.prototype.forEach=function(t,e,n){void 0===e&&(e=0),void 0===n&&(n=this.length),e<=n?this.forEachInner(t,e,n,0):this.forEachInvertedInner(t,e,n,0)},ws.prototype.map=function(t,e,n){void 0===e&&(e=0),void 0===n&&(n=this.length)
var r=[]
return this.forEach(function(e,n){return r.push(t(e,n))},e,n),r},ws.from=function(t){return t instanceof ws?t:t&&t.length?new xs(t):ws.empty}
var xs=function(t){function e(e){t.call(this),this.values=e}t&&(e.__proto__=t),e.prototype=Object.create(t&&t.prototype),e.prototype.constructor=e
var n={length:{},depth:{}}
return e.prototype.flatten=function(){return this.values},e.prototype.sliceInner=function(t,n){return 0==t&&n==this.length?this:new e(this.values.slice(t,n))},e.prototype.getInner=function(t){return this.values[t]},e.prototype.forEachInner=function(t,e,n,r){for(var i=e;i<n;i++)if(!1===t(this.values[i],r+i))return!1},e.prototype.forEachInvertedInner=function(t,e,n,r){for(var i=e-1;i>=n;i--)if(!1===t(this.values[i],r+i))return!1},e.prototype.leafAppend=function(t){if(this.length+t.length<=200)return new e(this.values.concat(t.flatten()))},e.prototype.leafPrepend=function(t){if(this.length+t.length<=200)return new e(t.flatten().concat(this.values))},n.length.get=function(){return this.values.length},n.depth.get=function(){return 0},Object.defineProperties(e.prototype,n),e}(ws)
ws.empty=new xs([])
var Ss=function(t){function e(e,n){t.call(this),this.left=e,this.right=n,this.length=e.length+n.length,this.depth=Math.max(e.depth,n.depth)+1}return t&&(e.__proto__=t),e.prototype=Object.create(t&&t.prototype),e.prototype.constructor=e,e.prototype.flatten=function(){return this.left.flatten().concat(this.right.flatten())},e.prototype.getInner=function(t){return t<this.left.length?this.left.get(t):this.right.get(t-this.left.length)},e.prototype.forEachInner=function(t,e,n,r){var i=this.left.length
return!(e<i&&!1===this.left.forEachInner(t,e,Math.min(n,i),r))&&(!(n>i&&!1===this.right.forEachInner(t,Math.max(e-i,0),Math.min(this.length,n)-i,r+i))&&void 0)},e.prototype.forEachInvertedInner=function(t,e,n,r){var i=this.left.length
return!(e>i&&!1===this.right.forEachInvertedInner(t,e-i,Math.max(n,i)-i,r+i))&&(!(n<i&&!1===this.left.forEachInvertedInner(t,Math.min(e,i),n,r))&&void 0)},e.prototype.sliceInner=function(t,e){if(0==t&&e==this.length)return this
var n=this.left.length
return e<=n?this.left.slice(t,e):t>=n?this.right.slice(t-n,e-n):this.left.slice(t,n).append(this.right.slice(0,e-n))},e.prototype.leafAppend=function(t){var n=this.right.leafAppend(t)
if(n)return new e(this.left,n)},e.prototype.leafPrepend=function(t){var n=this.left.leafPrepend(t)
if(n)return new e(n,this.right)},e.prototype.appendInner=function(t){return this.left.depth>=Math.max(this.right.depth,t.depth)+1?new e(this.left,new e(this.right,t)):new e(this,t)},e}(ws),Cs=ws,Ms=is(function(t,e){Object.defineProperty(e,"__esModule",{value:!0})
var n,r=(n=Cs)&&"object"==typeof n&&"default"in n?n.default:n,i=function(t,e){this.items=t,this.eventCount=e}
i.prototype.popEvent=function(t,e){var n=this
if(0==this.eventCount)return null
for(var r,o,a=this.items.length;;a--){if(n.items.get(a-1).selection){--a
break}}e&&(r=this.remapping(a,this.items.length),o=r.maps.length)
var l,c,h=t.tr,p=[],u=[]
return this.items.forEach(function(t,e){if(!t.step)return r||(r=n.remapping(a,e+1),o=r.maps.length),o--,void u.push(t)
if(r){u.push(new s(t.map))
var d,f=t.step.map(r.slice(o))
f&&h.maybeStep(f).doc&&(d=h.mapping.maps[h.mapping.maps.length-1],p.push(new s(d,null,null,p.length+u.length))),o--,d&&r.appendMap(d,o)}else h.maybeStep(t.step)
return t.selection?(l=r?t.selection.map(r.slice(o)):t.selection,c=new i(n.items.slice(0,a).append(u.reverse().concat(p)),n.eventCount-1),!1):void 0},this.items.length,0),{remaining:c,transform:h,selection:l}},i.prototype.addTransform=function(t,e,n,r){for(var o=[],l=this.eventCount,c=this.items,h=!r&&c.length?c.get(c.length-1):null,p=0;p<t.steps.length;p++){var u,d=t.steps[p].invert(t.docs[p]),f=new s(t.mapping.maps[p],d,e);(u=h&&h.merge(f))&&(f=u,p?o.pop():c=c.slice(0,c.length-1)),o.push(f),e&&(l++,e=null),r||(h=f)}var m,g,v,y=l-n.depth
return y>a&&(g=y,(m=c).forEach(function(t,e){if(t.selection&&0==g--)return v=e,!1}),c=m.slice(v),l-=y),new i(c.append(o),l)},i.prototype.remapping=function(t,e){var n=new hs.Mapping
return this.items.forEach(function(e,r){var i=null!=e.mirrorOffset&&r-e.mirrorOffset>=t?i=n.maps.length-e.mirrorOffset:null
n.appendMap(e.map,i)},t,e),n},i.prototype.addMaps=function(t){return 0==this.eventCount?this:new i(this.items.append(t.map(function(t){return new s(t)})),this.eventCount)},i.prototype.rebased=function(t,e){if(!this.eventCount)return this
var n=[],r=Math.max(0,this.items.length-e),o=t.mapping,a=t.steps.length,l=this.eventCount
this.items.forEach(function(t){t.selection&&l--},r)
var c=e
this.items.forEach(function(e){var r=o.getMirror(--c)
if(null!=r){a=Math.min(a,r)
var i=o.maps[r]
if(e.step){var h=t.steps[r].invert(t.docs[r]),p=e.selection&&e.selection.map(o.slice(c+1,r))
p&&l++,n.push(new s(i,h,p))}else n.push(new s(i))}},r)
for(var h=[],p=e;p<a;p++)h.push(new s(o.maps[p]))
var u=this.items.slice(0,r).append(h).append(n),d=new i(u,l)
return d.emptyItemCount()>500&&(d=d.compress(this.items.length-n.length)),d},i.prototype.emptyItemCount=function(){var t=0
return this.items.forEach(function(e){e.step||t++}),t},i.prototype.compress=function(t){void 0===t&&(t=this.items.length)
var e=this.remapping(0,t),n=e.maps.length,o=[],a=0
return this.items.forEach(function(r,i){if(i>=t)o.push(r),r.selection&&a++
else if(r.step){var l=r.step.map(e.slice(n)),c=l&&l.getMap()
if(n--,c&&e.appendMap(c,n),l){var h=r.selection&&r.selection.map(e.slice(n))
h&&a++
var p,u=new s(c.invert(),l,h),d=o.length-1;(p=o.length&&o[d].merge(u))?o[d]=p:o.push(u)}}else r.map&&n--},this.items.length,0),new i(r.from(o.reverse()),a)},i.empty=new i(r.empty,0)
var s=function(t,e,n,r){this.map=t,this.step=e,this.selection=n,this.mirrorOffset=r}
s.prototype.merge=function(t){if(this.step&&t.step&&!t.selection){var e=t.step.merge(this.step)
if(e)return new s(e.getMap().invert(),e,this.selection)}}
var o=function(t,e,n,r){this.done=t,this.undone=e,this.prevRanges=n,this.prevTime=r},a=20
function l(t){var e=[]
return t.forEach(function(t,n,r,i){return e.push(r,i)}),e}function c(t,e){if(!t)return null
for(var n=[],r=0;r<t.length;r+=2){var i=e.map(t[r],1),s=e.map(t[r+1],-1)
i<=s&&n.push(i,s)}return n}function h(t,e,n,r){var i=d(e),s=f.get(e).spec.config,a=(r?t.undone:t.done).popEvent(e,i)
if(a){var l=a.selection.resolve(a.transform.doc),c=(r?t.done:t.undone).addTransform(a.transform,e.selection.getBookmark(),s,i),h=new o(r?c:a.remaining,r?a.remaining:c,null,0)
n(a.transform.setSelection(l).setMeta(f,{redo:r,historyState:h}).scrollIntoView())}}var p=!1,u=null
function d(t){var e=t.plugins
if(u!=e){p=!1,u=e
for(var n=0;n<e.length;n++)if(e[n].spec.historyPreserveItems){p=!0
break}}return p}var f=new ms.PluginKey("history"),m=new ms.PluginKey("closeHistory")
e.HistoryState=o,e.closeHistory=function(t){return t.setMeta(m,!0)},e.history=function(t){return t={depth:t&&t.depth||100,newGroupDelay:t&&t.newGroupDelay||500},new ms.Plugin({key:f,state:{init:function(){return new o(i.empty,i.empty,null,0)},apply:function(e,n,r){return function(t,e,n,r){var s,a=n.getMeta(f)
if(a)return a.historyState
n.getMeta(m)&&(t=new o(t.done,t.undone,null,0))
var h=n.getMeta("appendedTransaction")
if(0==n.steps.length)return t
if(h&&h.getMeta(f))return h.getMeta(f).redo?new o(t.done.addTransform(n,null,r,d(e)),t.undone,l(n.mapping.maps[n.steps.length-1]),t.prevTime):new o(t.done,t.undone.addTransform(n,null,r,d(e)),null,t.prevTime)
if(!1===n.getMeta("addToHistory")||h&&!1===h.getMeta("addToHistory"))return(s=n.getMeta("rebased"))?new o(t.done.rebased(n,s),t.undone.rebased(n,s),c(t.prevRanges,n.mapping),t.prevTime):new o(t.done.addMaps(n.mapping.maps),t.undone.addMaps(n.mapping.maps),c(t.prevRanges,n.mapping),t.prevTime)
var p=t.prevTime<(n.time||0)-r.newGroupDelay||!h&&!function(t,e){if(!e)return!1
if(!t.docChanged)return!0
var n=!1
return t.mapping.maps[0].forEach(function(t,r){for(var i=0;i<e.length;i+=2)t<=e[i+1]&&r>=e[i]&&(n=!0)}),n}(n,t.prevRanges),u=h?c(t.prevRanges,n.mapping):l(n.mapping.maps[n.steps.length-1])
return new o(t.done.addTransform(n,p?e.selection.getBookmark():null,r,d(e)),i.empty,u,n.time)}(n,r,e,t)}},config:t})},e.undo=function(t,e){var n=f.getState(t)
return!(!n||0==n.done.eventCount||(e&&h(n,t,e,!1),0))},e.redo=function(t,e){var n=f.getState(t)
return!(!n||0==n.undone.eventCount||(e&&h(n,t,e,!0),0))},e.undoDepth=function(t){var e=f.getState(t)
return e?e.done.eventCount:0},e.redoDepth=function(t){var e=f.getState(t)
return e?e.undone.eventCount:0}})
rs(Ms)
Ms.HistoryState,Ms.closeHistory
for(var Os=Ms.history,Es=Ms.undo,Ts=Ms.redo,As=(Ms.undoDepth,Ms.redoDepth,{8:"Backspace",9:"Tab",10:"Enter",12:"NumLock",13:"Enter",16:"Shift",17:"Control",18:"Alt",20:"CapsLock",27:"Escape",32:" ",33:"PageUp",34:"PageDown",35:"End",36:"Home",37:"ArrowLeft",38:"ArrowUp",39:"ArrowRight",40:"ArrowDown",44:"PrintScreen",45:"Insert",46:"Delete",59:";",61:"=",91:"Meta",92:"Meta",106:"*",107:"+",108:",",109:"-",110:".",111:"/",144:"NumLock",145:"ScrollLock",160:"Shift",161:"Shift",162:"Control",163:"Control",164:"Alt",165:"Alt",173:"-",186:";",187:"=",188:",",189:"-",190:".",191:"/",192:"`",219:"[",220:"\\",221:"]",222:"'",229:"q"}),Ns={48:")",49:"!",50:"@",51:"#",52:"$",53:"%",54:"^",55:"&",56:"*",57:"(",59:";",61:"+",173:"_",186:":",187:"+",188:"<",189:"_",190:">",191:"?",192:"~",219:"{",220:"|",221:"}",222:'"',229:"Q"},Ds="undefined"!=typeof navigator&&/Chrome\/(\d+)/.exec(navigator.userAgent),_s="undefined"!=typeof navigator&&/Apple Computer/.test(navigator.vendor),Rs="undefined"!=typeof navigator&&/Gecko\/\d+/.test(navigator.userAgent),Is="undefined"!=typeof navigator&&/Mac/.test(navigator.platform),Bs=Ds&&(Is||+Ds[1]<57)||Rs&&Is,zs=0;zs<10;zs++)As[48+zs]=As[96+zs]=String(zs)
for(zs=1;zs<=24;zs++)As[zs+111]="F"+zs
for(zs=65;zs<=90;zs++)As[zs]=String.fromCharCode(zs+32),Ns[zs]=String.fromCharCode(zs)
for(var Ps in As)Ns.hasOwnProperty(Ps)||(Ns[Ps]=As[Ps])
function Fs(t){var e=!(Bs&&(t.ctrlKey||t.altKey||t.metaKey)||_s&&t.shiftKey&&t.key&&1==t.key.length)&&t.key||(t.shiftKey?Ns:As)[t.keyCode]||t.key||"Unidentified"
return"Esc"==e&&(e="Escape"),"Del"==e&&(e="Delete"),"Left"==e&&(e="ArrowLeft"),"Up"==e&&(e="ArrowUp"),"Right"==e&&(e="ArrowRight"),"Down"==e&&(e="ArrowDown"),e}var Vs=Fs
Fs.base=As,Fs.shift=Ns
var Ls=is(function(t,e){Object.defineProperty(e,"__esModule",{value:!0})
var n,r=(n=Vs)&&"object"==typeof n&&"default"in n?n.default:n,i="undefined"!=typeof navigator&&/Mac/.test(navigator.platform)
function s(t){var e,n,r,s,o=t.split(/-(?!$)/),a=o[o.length-1]
"Space"==a&&(a=" ")
for(var l=0;l<o.length-1;l++){var c=o[l]
if(/^(cmd|meta|m)$/i.test(c))s=!0
else if(/^a(lt)?$/i.test(c))e=!0
else if(/^(c|ctrl|control)$/i.test(c))n=!0
else if(/^s(hift)?$/i.test(c))r=!0
else{if(!/^mod$/i.test(c))throw new Error("Unrecognized modifier name: "+c)
i?s=!0:n=!0}}return e&&(a="Alt-"+a),n&&(a="Ctrl-"+a),s&&(a="Meta-"+a),r&&(a="Shift-"+a),a}function o(t,e,n){return e.altKey&&(t="Alt-"+t),e.ctrlKey&&(t="Ctrl-"+t),e.metaKey&&(t="Meta-"+t),!1!==n&&e.shiftKey&&(t="Shift-"+t),t}function a(t){var e=function(t){var e=Object.create(null)
for(var n in t)e[s(n)]=t[n]
return e}(t)
return function(t,n){var i,s=r(n),a=1==s.length&&" "!=s,l=e[o(s,n,!a)]
if(l&&l(t.state,t.dispatch,t))return!0
if(a&&(n.shiftKey||n.altKey||n.metaKey)&&(i=r.base[n.keyCode])&&i!=s){var c=e[o(i,n,!0)]
if(c&&c(t.state,t.dispatch,t))return!0}return!1}}e.keymap=function(t){return new ms.Plugin({props:{handleKeyDown:a(t)}})},e.keydownHandler=a})
rs(Ls)
var js=Ls.keymap,$s=(Ls.keydownHandler,is(function(t,e){Object.defineProperty(e,"__esModule",{value:!0})
var n={}
if("undefined"!=typeof navigator&&"undefined"!=typeof document){var r=/Edge\/(\d+)/.exec(navigator.userAgent),i=/MSIE \d/.test(navigator.userAgent),s=/Trident\/(?:[7-9]|\d{2,})\..*rv:(\d+)/.exec(navigator.userAgent)
n.mac=/Mac/.test(navigator.platform)
var o=n.ie=!!(i||s||r)
n.ie_version=i?document.documentMode||6:s?+s[1]:r?+r[1]:null,n.gecko=!o&&/gecko\/(\d+)/i.test(navigator.userAgent),n.gecko_version=n.gecko&&+(/Firefox\/(\d+)/.exec(navigator.userAgent)||[0,0])[1]
var a=!o&&/Chrome\/(\d+)/.exec(navigator.userAgent)
n.chrome=!!a,n.chrome_version=a&&+a[1],n.ios=!o&&/AppleWebKit/.test(navigator.userAgent)&&/Mobile\/\w+/.test(navigator.userAgent),n.android=/Android \d/.test(navigator.userAgent),n.webkit=!o&&"WebkitAppearance"in document.documentElement.style,n.safari=/Apple Computer/.test(navigator.vendor),n.webkit_version=n.webkit&&+(/\bAppleWebKit\/(\d+)/.exec(navigator.userAgent)||[0,0])[1]}var l=function(t){for(var e=0;;e++)if(!(t=t.previousSibling))return e},c=function(t){var e=t.parentNode
return e&&11==e.nodeType?e.host:e},h=function(t,e,n){var r=document.createRange()
return r.setEnd(t,null==n?t.nodeValue.length:n),r.setStart(t,e||0),r},p=function(t,e,n,r){return n&&(d(t,e,n,r,-1)||d(t,e,n,r,1))},u=/^(img|br|input|textarea|hr)$/i
function d(t,e,n,r,i){for(;;){if(t==n&&e==r)return!0
if(e==(i<0?0:f(t))||3==t.nodeType&&"\ufeff"==t.nodeValue){var s=t.parentNode
if(1!=s.nodeType||(o=void 0,(o=t.pmViewDesc)&&o.node&&o.node.isBlock)||u.test(t.nodeName)||"false"==t.contentEditable)return!1
e=l(t)+(i<0?0:1),t=s}else{if(1!=t.nodeType)return!1
t=t.childNodes[e+(i<0?-1:0)],e=i<0?f(t):0}}var o}function f(t){return 3==t.nodeType?t.nodeValue.length:t.childNodes.length}var m=function(t){var e=t.isCollapsed
return e&&n.chrome&&t.rangeCount&&!t.getRangeAt(0).collapsed&&(e=!1),e}
function g(t,e){var n=document.createEvent("Event")
return n.initEvent("keydown",!0,!0),n.keyCode=t,n.key=n.code=e,n}function v(t){return{left:0,right:t.innerWidth,top:0,bottom:t.innerHeight}}function y(t,e){return"number"==typeof t?t:t[e]}function b(t,e,n){for(var r=t.someProp("scrollThreshold")||0,i=t.someProp("scrollMargin")||5,s=t.dom.ownerDocument,o=s.defaultView,a=n||t.dom;a;a=c(a))if(1==a.nodeType){var l=a==s.body||1!=a.nodeType,h=l?v(o):a.getBoundingClientRect(),p=0,u=0
if(e.top<h.top+y(r,"top")?u=-(h.top-e.top+y(i,"top")):e.bottom>h.bottom-y(r,"bottom")&&(u=e.bottom-h.bottom+y(i,"bottom")),e.left<h.left+y(r,"left")?p=-(h.left-e.left+y(i,"left")):e.right>h.right-y(r,"right")&&(p=e.right-h.right+y(i,"right")),(p||u)&&(l?o.scrollBy(p,u):(u&&(a.scrollTop+=u),p&&(a.scrollLeft+=p))),l)break}}function k(t,e){for(var n,r,i=2e8,s=0,o=e.top,a=e.top,l=t.firstChild,c=0;l;l=l.nextSibling,c++){var p=void 0
if(1==l.nodeType)p=l.getClientRects()
else{if(3!=l.nodeType)continue
p=h(l).getClientRects()}for(var u=0;u<p.length;u++){var d=p[u]
if(d.top<=o&&d.bottom>=a){o=Math.max(d.bottom,o),a=Math.min(d.top,a)
var f=d.left>e.left?d.left-e.left:d.right<e.left?e.left-d.right:0
if(f<i){n=l,i=f,r=f&&3==n.nodeType?{left:d.right<e.left?d.right:d.left,top:e.top}:e,1==l.nodeType&&f&&(s=c+(e.left>=(d.left+d.right)/2?1:0))
continue}}!n&&(e.left>=d.right&&e.top>=d.top||e.left>=d.left&&e.top>=d.bottom)&&(s=c+1)}}return n&&3==n.nodeType?function(t,e){for(var n=t.nodeValue.length,r=document.createRange(),i=0;i<n;i++){r.setEnd(t,i+1),r.setStart(t,i)
var s=S(r,1)
if(s.top!=s.bottom&&w(e,s))return{node:t,offset:i+(e.left>=(s.left+s.right)/2?1:0)}}return{node:t,offset:0}}(n,r):!n||i&&1==n.nodeType?{node:t,offset:s}:k(n,r)}function w(t,e){return t.left>=e.left-1&&t.left<=e.right+1&&t.top>=e.top-1&&t.top<=e.bottom+1}function x(t,e){var n,r,i=t.root
if(i.caretPositionFromPoint){var s,o=i.caretPositionFromPoint(e.left,e.top)
if(o)n=(s=o).offsetNode,r=s.offset}if(!n&&i.caretRangeFromPoint){var a,l=i.caretRangeFromPoint(e.left,e.top)
if(l)n=(a=l).startContainer,r=a.startOffset}var c,h=i.elementFromPoint(e.left,e.top+1)
if(!h||!t.dom.contains(1!=h.nodeType?h.parentNode:h)){var p=t.dom.getBoundingClientRect()
if(!w(e,p))return null
if(!(h=function t(e,n,r){var i=e.childNodes.length
if(i&&r.top<r.bottom)for(var s=Math.max(0,Math.floor(i*(n.top-r.top)/(r.bottom-r.top))-2),o=s;;){var a=e.childNodes[o]
if(1==a.nodeType)for(var l=a.getClientRects(),c=0;c<l.length;c++){var h=l[c]
if(w(n,h))return t(a,n,h)}if((o=(o+1)%i)==s)break}return e}(t.dom,e,p)))return null}h=function(t,e){var n=t.parentNode
return n&&/^li$/i.test(n.nodeName)&&e.left<t.getBoundingClientRect().left?n:t}(h,e),n&&(n==t.dom&&r==n.childNodes.length-1&&1==n.lastChild.nodeType&&e.top>n.lastChild.getBoundingClientRect().bottom?c=t.state.doc.content.size:0!=r&&1==n.nodeType&&"BR"==n.childNodes[r-1].nodeName||(c=function(t,e,n,r){for(var i=-1,s=e;s!=t.dom;){var o=t.docView.nearestDesc(s,!0)
if(!o)return null
if(o.node.isBlock&&o.parent){var a=o.dom.getBoundingClientRect()
if(a.left>r.left||a.top>r.top)i=o.posBefore
else{if(!(a.right<r.left||a.bottom<r.top))break
i=o.posAfter}}s=o.dom.parentNode}return i>-1?i:t.docView.posFromDOM(e,n)}(t,n,r,e))),null==c&&(c=function(t,e,n){var r=k(e,n),i=r.node,s=r.offset,o=-1
if(1==i.nodeType&&!i.firstChild){var a=i.getBoundingClientRect()
o=a.left!=a.right&&n.left>(a.left+a.right)/2?1:-1}return t.docView.posFromDOM(i,s,o)}(t,h,e))
var u=t.docView.nearestDesc(h,!0)
return{pos:c,inside:u?u.posAtStart-u.border:-1}}function S(t,e){var n=t.getClientRects()
return n.length?n[e<0?0:n.length-1]:t.getBoundingClientRect()}function C(t,e){var r=t.docView.domFromPos(e),i=r.node,s=r.offset
if(3==i.nodeType&&(n.chrome||n.gecko)){var o=S(h(i,s,s),0)
if(n.gecko&&s&&/\s/.test(i.nodeValue[s-1])&&s<i.nodeValue.length){var a=S(h(i,s-1,s-1),-1)
if(Math.abs(a.left-o.left)<1&&a.top==o.top){var l=S(h(i,s,s+1),-1)
return M(l,l.left<a.left)}}return o}if(1==i.nodeType&&!t.state.doc.resolve(e).parent.inlineContent){var c,p=!0
if(s<i.childNodes.length){var u=i.childNodes[s]
1==u.nodeType&&(c=u.getBoundingClientRect())}if(!c&&s){var d=i.childNodes[s-1]
1==d.nodeType&&(c=d.getBoundingClientRect(),p=!1)}return function(t,e){if(0==t.height)return t
var n=e?t.top:t.bottom
return{top:n,bottom:n,left:t.left,right:t.right}}(c||parent.getBoundingClientRect(),p)}for(var m=-1;m<2;m+=2)if(m<0&&s){var g=void 0,v=3==i.nodeType?h(i,s-1,s):3==(g=i.childNodes[s-1]).nodeType?h(g):1==g.nodeType&&"BR"!=g.nodeName?g:null
if(v){var y=S(v,1)
if(y.top<y.bottom)return M(y,!1)}}else if(m>0&&s<f(i)){var b=void 0,k=3==i.nodeType?h(i,s,s+1):3==(b=i.childNodes[s]).nodeType?h(b):1==b.nodeType?b:null
if(k){var w=S(k,-1)
if(w.top<w.bottom)return M(w,!0)}}return M(S(3==i.nodeType?h(i):i,0),!1)}function M(t,e){if(0==t.width)return t
var n=e?t.left:t.right
return{top:t.top,bottom:t.bottom,left:n,right:n}}function O(t,e,n){var r=t.state,i=t.root.activeElement
r==e&&t.inDOMChange||t.updateState(e),i!=t.dom&&t.focus()
try{return n()}finally{r!=e&&t.updateState(r),i!=t.dom&&i.focus()}}var E=/[\u0590-\u08ac]/
var T=null,A=null,N=!1
function D(t,e,n){return T==e&&A==n?N:(T=e,A=n,N="up"==n||"down"==n?function(t,e,n){var r=e.selection,i="up"==n?r.$anchor.min(r.$head):r.$anchor.max(r.$head)
return O(t,e,function(){for(var e=t.docView.domFromPos(i.pos).node;;){var r=t.docView.nearestDesc(e,!0)
if(!r)break
if(r.node.isBlock){e=r.dom
break}e=r.dom.parentNode}for(var s=C(t,i.pos),o=e.firstChild;o;o=o.nextSibling){var a=void 0
if(1==o.nodeType)a=o.getClientRects()
else{if(3!=o.nodeType)continue
a=h(o,0,o.nodeValue.length).getClientRects()}for(var l=0;l<a.length;l++){var c=a[l]
if(c.bottom>c.top&&("up"==n?c.bottom<s.top+1:c.top>s.bottom-1))return!1}}return!0})}(t,e,n):function(t,e,n){var r=e.selection.$head
if(!r.parent.isTextblock)return!1
var i=r.parentOffset,s=!i,o=i==r.parent.content.size,a=getSelection()
return E.test(r.parent.textContent)&&a.modify?O(t,e,function(){var e=a.getRangeAt(0),i=a.focusNode,s=a.focusOffset
a.modify("move",n,"character")
var o=!(r.depth?t.docView.domAfterPos(r.before()):t.dom).contains(1==a.focusNode.nodeType?a.focusNode:a.focusNode.parentNode)||i==a.focusNode&&s==a.focusOffset
return a.removeAllRanges(),a.addRange(e),o}):"left"==n||"backward"==n?s:o}(t,e,n))}var _=function(t,e,n,r){this.parent=t,this.children=e,this.dom=n,n.pmViewDesc=this,this.contentDOM=r,this.dirty=0},R={beforePosition:{},size:{},border:{},posBefore:{},posAtStart:{},posAfter:{},posAtEnd:{},contentLost:{}}
_.prototype.matchesWidget=function(){return!1},_.prototype.matchesMark=function(){return!1},_.prototype.matchesNode=function(){return!1},_.prototype.matchesHack=function(){return!1},R.beforePosition.get=function(){return!1},_.prototype.parseRule=function(){return null},_.prototype.stopEvent=function(){return!1},R.size.get=function(){for(var t=0,e=0;e<this.children.length;e++)t+=this.children[e].size
return t},R.border.get=function(){return 0},_.prototype.destroy=function(){this.parent=null,this.dom.pmViewDesc==this&&(this.dom.pmViewDesc=null)
for(var t=0;t<this.children.length;t++)this.children[t].destroy()},_.prototype.posBeforeChild=function(t){for(var e=0,n=this.posAtStart;e<this.children.length;e++){var r=this.children[e]
if(r==t)return n
n+=r.size}},R.posBefore.get=function(){return this.parent.posBeforeChild(this)},R.posAtStart.get=function(){return this.parent?this.parent.posBeforeChild(this)+this.border:0},R.posAfter.get=function(){return this.posBefore+this.size},R.posAtEnd.get=function(){return this.posAtStart+this.size-2*this.border},_.prototype.localPosFromDOM=function(t,e,n){var r
if(this.contentDOM&&this.contentDOM.contains(1==t.nodeType?t:t.parentNode)){if(n<0){var i,s
if(t==this.contentDOM)i=t.childNodes[e-1]
else{for(;t.parentNode!=this.contentDOM;)t=t.parentNode
i=t.previousSibling}for(;i&&(!(s=i.pmViewDesc)||s.parent!=this);)i=i.previousSibling
return i?this.posBeforeChild(s)+s.size:this.posAtStart}var o,a
if(t==this.contentDOM)o=t.childNodes[e]
else{for(;t.parentNode!=this.contentDOM;)t=t.parentNode
o=t.nextSibling}for(;o&&(!(a=o.pmViewDesc)||a.parent!=this);)o=o.nextSibling
return o?this.posBeforeChild(a):this.posAtEnd}if(this.contentDOM&&this.contentDOM!=this.dom&&this.dom.contains(this.contentDOM))r=2&t.compareDocumentPosition(this.contentDOM)
else if(this.dom.firstChild){if(0==e)for(var l=t;;l=l.parentNode){if(l==this.dom){r=!1
break}if(l.parentNode.firstChild!=l)break}if(null==r&&e==t.childNodes.length)for(var c=t;;c=c.parentNode){if(c==this.dom){r=!0
break}if(c.parentNode.lastChild!=c)break}}return(null==r?n>0:r)?this.posAtEnd:this.posAtStart},_.prototype.nearestDesc=function(t,e){for(var n=!0,r=t;r;r=r.parentNode){var i=this.getDesc(r)
if(i&&(!e||i.node)){if(!n||!i.nodeDOM||(1==i.nodeDOM.nodeType?i.nodeDOM.contains(t):i.nodeDOM==t))return i
n=!1}}},_.prototype.getDesc=function(t){for(var e=t.pmViewDesc,n=e;n;n=n.parent)if(n==this)return e},_.prototype.posFromDOM=function(t,e,n){for(var r=t;;r=r.parentNode){var i=this.getDesc(r)
if(i)return i.localPosFromDOM(t,e,n)}},_.prototype.descAt=function(t){for(var e=0,n=0;e<this.children.length;e++){var r=this.children[e],i=n+r.size
if(n==t&&i!=n){for(;!r.border&&r.children.length;)r=r.children[0]
return r}if(t<i)return r.descAt(t-n-r.border)
n=i}},_.prototype.domFromPos=function(t){if(!this.contentDOM)return{node:this.dom,offset:0}
for(var e=0,n=0;;n++){if(e==t){for(;n<this.children.length&&this.children[n].beforePosition;)n++
return{node:this.contentDOM,offset:n}}if(n==this.children.length)throw new Error("Invalid position "+t)
var r=this.children[n],i=e+r.size
if(t<i)return r.domFromPos(t-e-r.border)
e=i}},_.prototype.parseRange=function(t,e,n){if(void 0===n&&(n=0),0==this.children.length)return{node:this.contentDOM,from:t,to:e,fromOffset:0,toOffset:this.contentDOM.childNodes.length}
for(var r=-1,i=-1,s=0,o=0;;o++){var a=this.children[o],c=s+a.size
if(-1==r&&t<=c){var h=s+a.border
if(t>=h&&e<=c-a.border&&a.node&&a.contentDOM&&this.contentDOM.contains(a.contentDOM))return a.parseRange(t-h,e-h,n+h)
t=n+s
for(var p=o;p>0;p--){var u=this.children[p-1]
if(u.size&&u.dom.parentNode==this.contentDOM&&!u.emptyChildAt(1)){r=l(u.dom)+1
break}t-=u.size}-1==r&&(r=0)}if(r>-1&&e<=c){e=n+c
for(var d=o+1;d<this.children.length;d++){var f=this.children[d]
if(f.size&&f.dom.parentNode==this.contentDOM&&!f.emptyChildAt(-1)){i=l(f.dom)
break}e+=f.size}-1==i&&(i=this.contentDOM.childNodes.length)
break}s=c}return{node:this.contentDOM,from:t,to:e,fromOffset:r,toOffset:i}},_.prototype.emptyChildAt=function(t){if(this.border||!this.contentDOM||!this.children.length)return!1
var e=this.children[t<0?0:this.children.length-1]
return 0==e.size||e.emptyChildAt(t)},_.prototype.domAfterPos=function(t){var e=this.domFromPos(t),n=e.node,r=e.offset
if(1!=n.nodeType||r==n.childNodes.length)throw new RangeError("No node after pos "+t)
return n.childNodes[r]},_.prototype.setSelection=function(t,e,n,r){for(var i=Math.min(t,e),s=Math.max(t,e),o=0,a=0;o<this.children.length;o++){var l=this.children[o],c=a+l.size
if(i>a&&s<c)return l.setSelection(t-a-l.border,e-a-l.border,n,r)
a=c}var h=this.domFromPos(t),u=this.domFromPos(e),d=n.getSelection(),f=document.createRange()
if(r||!p(h.node,h.offset,d.anchorNode,d.anchorOffset)||!p(u.node,u.offset,d.focusNode,d.focusOffset)){if(d.extend)f.setEnd(h.node,h.offset),f.collapse(!1)
else{if(t>e){var m=h
h=u,u=m}f.setEnd(u.node,u.offset),f.setStart(h.node,h.offset)}d.removeAllRanges(),d.addRange(f),d.extend&&d.extend(u.node,u.offset)}},_.prototype.ignoreMutation=function(t){return!this.contentDOM},R.contentLost.get=function(){return this.contentDOM&&this.contentDOM!=this.dom&&!this.dom.contains(this.contentDOM)},_.prototype.markDirty=function(t,e){for(var n=0,r=0;r<this.children.length;r++){var i=this.children[r],s=n+i.size
if(n==s?t<=s&&e>=n:t<s&&e>n){var o=n+i.border,a=s-i.border
if(t>=o&&e<=a)return this.dirty=t==n||e==s?2:1,void(t==o&&e==a&&i.contentLost?i.dirty=3:i.markDirty(t-o,e-o))
i.dirty=3}n=s}this.dirty=2},Object.defineProperties(_.prototype,R)
var I=[],B=function(t){function e(e,n,r,i){var s,o=n.type.toDOM
if("function"==typeof o&&(o=o(r,function(){return s?s.parent?s.parent.posBeforeChild(s):void 0:i})),!n.type.spec.raw){if(1!=o.nodeType){var a=document.createElement("span")
a.appendChild(o),o=a}o.contentEditable=!1,o.classList.add("ProseMirror-widget")}t.call(this,e,I,o,null),this.widget=n,s=this}t&&(e.__proto__=t),e.prototype=Object.create(t&&t.prototype),e.prototype.constructor=e
var n={beforePosition:{}}
return n.beforePosition.get=function(){return this.widget.type.side<0},e.prototype.matchesWidget=function(t){return 0==this.dirty&&t.type.eq(this.widget.type)},e.prototype.parseRule=function(){return{ignore:!0}},e.prototype.stopEvent=function(t){var e=this.widget.spec.stopEvent
return!!e&&e(t)},Object.defineProperties(e.prototype,n),e}(_),z=function(t){function e(){t.apply(this,arguments)}return t&&(e.__proto__=t),e.prototype=Object.create(t&&t.prototype),e.prototype.constructor=e,e.prototype.parseRule=function(){for(var e,n=this.dom.firstChild;n;n=n.nextSibling){var r=void 0
if(3==n.nodeType){var i=n.nodeValue.replace(/\ufeff/g,"")
if(!i)continue
r=document.createTextNode(i)}else{if("\ufeff"==n.textContent)continue
r=n.cloneNode(!0)}e||(e=document.createDocumentFragment()),e.appendChild(r)}return e?{skip:e}:t.prototype.parseRule.call(this)},e.prototype.ignoreMutation=function(){return!1},e}(B),P=function(t){function e(e,n,r,i){t.call(this,e,[],r,i),this.mark=n}return t&&(e.__proto__=t),e.prototype=Object.create(t&&t.prototype),e.prototype.constructor=e,e.create=function(t,n,r,i){var s=i.nodeViews[n.type.name],o=s&&s(n,i,r)
return o&&o.dom||(o=ls.DOMSerializer.renderSpec(document,n.type.spec.toDOM(n,r))),new e(t,n,o.dom,o.contentDOM||o.dom)},e.prototype.parseRule=function(){return{mark:this.mark.type.name,attrs:this.mark.attrs,contentElement:this.contentDOM}},e.prototype.matchesMark=function(t){return 3!=this.dirty&&this.mark.eq(t)},e.prototype.markDirty=function(e,n){if(t.prototype.markDirty.call(this,e,n),0!=this.dirty){for(var r=this.parent;!r.node;)r=r.parent
r.dirty<this.dirty&&(r.dirty=this.dirty),this.dirty=0}},e}(_),F=function(t){function e(e,n,r,i,s,o,a,l,c){t.call(this,e,n.isLeaf?I:[],s,o),this.nodeDOM=a,this.node=n,this.outerDeco=r,this.innerDeco=i,o&&this.updateChildren(l,c)}t&&(e.__proto__=t),e.prototype=Object.create(t&&t.prototype),e.prototype.constructor=e
var r={size:{},border:{}}
return e.create=function(t,n,r,i,s,o){var a,l=s.nodeViews[n.type.name],c=l&&l(n,s,function(){return a?a.parent?a.parent.posBeforeChild(a):void 0:o},r),h=c&&c.dom,p=c&&c.contentDOM
if(n.isText)if(h){if(3!=h.nodeType)throw new RangeError("Text must be rendered as a DOM text node")}else h=document.createTextNode(n.text)
else if(!h){var u
h=(u=ls.DOMSerializer.renderSpec(document,n.type.spec.toDOM(n))).dom,p=u.contentDOM}p||n.isText||"BR"==h.nodeName||(h.hasAttribute("contenteditable")||(h.contentEditable=!1),n.type.spec.draggable&&(h.draggable=!0))
var d=h
return h=K(h,r,n),c?a=new $(t,n,r,i,h,p,d,c,s,o+1):n.isText?new L(t,n,r,i,h,d,s):new e(t,n,r,i,h,p,d,s,o+1)},e.prototype.parseRule=function(){var t=this
if(this.node.type.spec.reparseInView)return null
var e={node:this.node.type.name,attrs:this.node.attrs}
return this.node.type.spec.code&&(e.preserveWhitespace="full"),this.contentDOM&&!this.contentLost?e.contentElement=this.contentDOM:e.getContent=function(){return t.contentDOM?ls.Fragment.empty:t.node.content},e},e.prototype.matchesNode=function(t,e,n){return 0==this.dirty&&t.eq(this.node)&&G(e,this.outerDeco)&&n.eq(this.innerDeco)},r.size.get=function(){return this.node.nodeSize},r.border.get=function(){return this.node.isLeaf?0:1},e.prototype.updateChildren=function(t,e){var n=this,r=new X(this),i=this.node.inlineContent;(function(t,e,n,r){var i=e.locals(t),s=0
if(0==i.length){for(var o=0;o<t.childCount;o++){var a=t.child(o)
r(a,i,e.forChild(s,a),o),s+=a.nodeSize}return}for(var l=0,c=[],h=null,p=0;;){if(l<i.length&&i[l].to==s){for(var u=i[l++],d=void 0;l<i.length&&i[l].to==s;)(d||(d=[u])).push(i[l++])
if(d){d.sort(Q)
for(var f=0;f<d.length;f++)n(d[f],p)}else n(u,p)}var m=void 0,g=void 0
if(h)g=-1,m=h,h=null
else{if(!(p<t.childCount))break
g=p,m=t.child(p++)}for(var v=0;v<c.length;v++)c[v].to<=s&&c.splice(v--,1)
for(;l<i.length&&i[l].from==s;)c.push(i[l++])
var y=s+m.nodeSize
if(m.isText){var b=y
l<i.length&&i[l].from<b&&(b=i[l].from)
for(var k=0;k<c.length;k++)c[k].to<b&&(b=c[k].to)
b<y&&(h=m.cut(b-s),m=m.cut(0,b-s),y=b,g=-1)}r(m,c.length?c.slice():I,e.forChild(s,m),g),s=y}})(this.node,this.innerDeco,function(s,o){s.spec.marks?r.syncToMarks(s.spec.marks,i,t):s.type.side>=0&&r.syncToMarks(o==n.node.childCount?ls.Mark.none:n.node.child(o).marks,i,t),r.placeWidget(s,t,e)},function(n,s,o,a){r.syncToMarks(n.marks,i,t),r.findNodeMatch(n,s,o,a)||r.updateNextNode(n,s,o,t,a)||r.addNode(n,s,o,t,e),e+=n.nodeSize}),r.syncToMarks(I,i,t),this.node.isTextblock&&r.addTextblockHacks(),r.destroyRest(),(r.changed||2==this.dirty)&&this.renderChildren()},e.prototype.renderChildren=function(){(function t(e,n){var r=e.firstChild
for(var i=0;i<n.length;i++){var s=n[i],o=s.dom
if(o.parentNode==e){for(;o!=r;)r=Y(r)
r=r.nextSibling}else e.insertBefore(o,r)
if(s instanceof P){var a=r?r.previousSibling:e.lastChild
t(s.contentDOM,s.children),r=a?a.nextSibling:e.firstChild}}for(;r;)r=Y(r)})(this.contentDOM,this.children,e.is),n.ios&&function(t){if("UL"==t.nodeName||"OL"==t.nodeName){var e=t.style.cssText
t.style.cssText=e+"; list-style: square !important",window.getComputedStyle(t).listStyle,t.style.cssText=e}}(this.dom)},e.prototype.update=function(t,e,n,r){return!(3==this.dirty||!t.sameMarkup(this.node))&&(this.updateInner(t,e,n,r),!0)},e.prototype.updateInner=function(t,e,n,r){this.updateOuterDeco(e),this.node=t,this.innerDeco=n,this.contentDOM&&this.updateChildren(r,this.posAtStart),this.dirty=0},e.prototype.updateOuterDeco=function(t){if(!G(t,this.outerDeco)){var e=1!=this.nodeDOM.nodeType,n=this.dom
this.dom=q(this.dom,this.nodeDOM,J(this.outerDeco,this.node,e),J(t,this.node,e)),this.dom!=n&&(n.pmViewDesc=null,this.dom.pmViewDesc=this),this.outerDeco=t}},e.prototype.selectNode=function(){this.nodeDOM.classList.add("ProseMirror-selectednode"),!this.contentDOM&&this.node.type.spec.draggable||(this.dom.draggable=!0)},e.prototype.deselectNode=function(){this.nodeDOM.classList.remove("ProseMirror-selectednode"),!this.contentDOM&&this.node.type.spec.draggable||(this.dom.draggable=!1)},Object.defineProperties(e.prototype,r),e}(_)
function V(t,e,n,r,i){return K(r,e,t),new F(null,t,e,n,r,r,r,i,0)}var L=function(t){function e(e,n,r,i,s,o,a){t.call(this,e,n,r,i,s,null,o,a)}return t&&(e.__proto__=t),e.prototype=Object.create(t&&t.prototype),e.prototype.constructor=e,e.prototype.parseRule=function(){var t=this.nodeDOM.parentNode
return t?{skip:t}:{ignore:!0}},e.prototype.update=function(t,e){return!(3==this.dirty||0!=this.dirty&&!this.inParent()||!t.sameMarkup(this.node))&&(this.updateOuterDeco(e),0==this.dirty&&t.text==this.node.text||t.text==this.nodeDOM.nodeValue||(this.nodeDOM.nodeValue=t.text),this.node=t,this.dirty=0,!0)},e.prototype.inParent=function(){for(var t=this.parent.contentDOM,e=this.nodeDOM;e;e=e.parentNode)if(e==t)return!0
return!1},e.prototype.domFromPos=function(t){return{node:this.nodeDOM,offset:t}},e.prototype.localPosFromDOM=function(e,n,r){return e==this.nodeDOM?this.posAtStart+Math.min(n,this.node.text.length):t.prototype.localPosFromDOM.call(this,e,n,r)},e.prototype.ignoreMutation=function(t){return"characterData"!=t.type},e}(F),j=function(t){function e(){t.apply(this,arguments)}return t&&(e.__proto__=t),e.prototype=Object.create(t&&t.prototype),e.prototype.constructor=e,e.prototype.parseRule=function(){return{ignore:!0}},e.prototype.matchesHack=function(){return 0==this.dirty},e}(_),$=function(t){function e(e,n,r,i,s,o,a,l,c,h){t.call(this,e,n,r,i,s,o,a,c,h),this.spec=l}return t&&(e.__proto__=t),e.prototype=Object.create(t&&t.prototype),e.prototype.constructor=e,e.prototype.update=function(e,n,r,i){if(3==this.dirty)return!1
if(this.spec.update){var s=this.spec.update(e,n)
return s&&this.updateInner(e,n,r,i),s}return!(!this.contentDOM&&!e.isLeaf)&&t.prototype.update.call(this,e,n,r,i)},e.prototype.selectNode=function(){this.spec.selectNode?this.spec.selectNode():t.prototype.selectNode.call(this)},e.prototype.deselectNode=function(){this.spec.deselectNode?this.spec.deselectNode():t.prototype.deselectNode.call(this)},e.prototype.setSelection=function(e,n,r,i){this.spec.setSelection?this.spec.setSelection(e,n,r):t.prototype.setSelection.call(this,e,n,r,i)},e.prototype.destroy=function(){this.spec.destroy&&this.spec.destroy(),t.prototype.destroy.call(this)},e.prototype.stopEvent=function(t){return!!this.spec.stopEvent&&this.spec.stopEvent(t)},e.prototype.ignoreMutation=function(e){return this.spec.ignoreMutation?this.spec.ignoreMutation(e):t.prototype.ignoreMutation.call(this,e)},e}(F)
function H(t){t&&(this.nodeName=t)}H.prototype=Object.create(null)
var U=[new H]
function J(t,e,n){if(0==t.length)return U
for(var r=n?U[0]:new H,i=[r],s=0;s<t.length;s++){var o=t[s].type.attrs,a=r
if(o)for(var l in o.nodeName&&i.push(a=new H(o.nodeName)),o){var c=o[l]
null!=c&&(n&&1==i.length&&i.push(a=r=new H(e.isInline?"span":"div")),"class"==l?a.class=(a.class?a.class+" ":"")+c:"style"==l?a.style=(a.style?a.style+";":"")+c:"nodeName"!=l&&(a[l]=c))}}return i}function q(t,e,n,r){if(n==U&&r==U)return e
for(var i=e,s=0;s<r.length;s++){var o=r[s],a=n[s]
if(s){var l=void 0
a&&a.nodeName==o.nodeName&&i!=t&&(l=e.parentNode)&&l.tagName.toLowerCase()==o.nodeName?i=l:((l=document.createElement(o.nodeName)).appendChild(i),i=l)}W(i,a||U[0],o)}return i}function W(t,e,n){for(var r in e)"class"==r||"style"==r||"nodeName"==r||r in n||t.removeAttribute(r)
for(var i in n)"class"!=i&&"style"!=i&&"nodeName"!=i&&n[i]!=e[i]&&t.setAttribute(i,n[i])
if(e.class!=n.class){for(var s=e.class?e.class.split(" "):I,o=n.class?n.class.split(" "):I,a=0;a<s.length;a++)-1==o.indexOf(s[a])&&t.classList.remove(s[a])
for(var l=0;l<o.length;l++)-1==s.indexOf(o[l])&&t.classList.add(o[l])}if(e.style!=n.style){if(e.style)for(var c,h=/\s*([\w\-\xa1-\uffff]+)\s*:(?:"(?:\\.|[^"])*"|'(?:\\.|[^'])*'|\(.*?\)|[^;])*/g;c=h.exec(e.style);)t.style[c[1].toLowerCase()]=""
n.style&&(t.style.cssText+=n.style)}}function K(t,e,n){return q(t,t,U,J(e,n,1!=t.nodeType))}function G(t,e){if(t.length!=e.length)return!1
for(var n=0;n<t.length;n++)if(!t[n].type.eq(e[n].type))return!1
return!0}function Y(t){var e=t.nextSibling
return t.parentNode.removeChild(t),e}var X=function(t){this.top=t,this.index=0,this.stack=[],this.changed=!1
var e=function(t,e){for(var n=[],r=t.childCount,i=e.length-1;r>0&&i>=0;i--){var s=e[i],o=s.node
if(o){if(o!=t.child(r-1))break
n.push(s),--r}}return{nodes:n.reverse(),offset:r}}(t.node.content,t.children)
this.preMatched=e.nodes,this.preMatchOffset=e.offset}
function Q(t,e){return t.type.side-e.type.side}function Z(t,e){var n=t.selection,r=n.$anchor,i=n.$head,s=e>0?r.max(i):r.min(i),o=s.parent.inlineContent?s.depth?t.doc.resolve(e>0?s.after():s.before()):null:s
return o&&ms.Selection.findFrom(o,e)}function tt(t,e){return t.dispatch(t.state.tr.setSelection(e).scrollIntoView()),!0}function et(t,e,n){var r=t.state.selection
if(r instanceof ms.TextSelection){if(!r.empty||n.indexOf("s")>-1)return!1
if(t.endOfTextblock(e>0?"right":"left")){var i=Z(t.state,e)
return!!(i&&i instanceof ms.NodeSelection)&&tt(t,i)}var s,o=r.$head,a=o.textOffset?null:e<0?o.nodeBefore:o.nodeAfter
if(a&&ms.NodeSelection.isSelectable(a)){var l=e<0?o.pos-a.nodeSize:o.pos
if(a.isAtom||(s=t.docView.descAt(l))&&!s.contentDOM)return tt(t,new ms.NodeSelection(e<0?t.state.doc.resolve(o.pos-a.nodeSize):o))}return!1}if(r instanceof ms.NodeSelection&&r.node.isInline)return tt(t,new ms.TextSelection(e>0?r.$to:r.$from))
var c=Z(t.state,e)
return!!c&&tt(t,c)}function nt(t){return 3==t.nodeType?t.nodeValue.length:t.childNodes.length}function rt(t){var e=t.pmViewDesc
return e&&0==e.size&&(t.nextSibling||"BR"!=t.nodeName)}function it(t){var e=t.root.getSelection(),r=e.focusNode,i=e.focusOffset
if(r){var s,o,a=!1
for(n.gecko&&1==r.nodeType&&i<nt(r)&&rt(r.childNodes[i])&&(a=!0);;)if(i>0)if(1!=r.nodeType){if(3!=r.nodeType||"\ufeff"!=r.nodeValue.charAt(i-1))break
n.ie&&n.ie_version<=11&&(a=!0),s=r,o=--i}else{var c=r.childNodes[i-1]
if(rt(c))s=r,o=--i
else{if(3!=c.nodeType)break
i=(r=c).nodeValue.length}}else{if(ot(r))break
for(var h=r.previousSibling;h&&rt(h);)s=r.parentNode,o=l(h),h=h.previousSibling
if(h)i=nt(r=h)
else{if((r=r.parentNode)==t.dom)break
i=0}}a?at(t,e,r,i):s&&at(t,e,s,o)}}function st(t){var e=t.root.getSelection(),n=e.focusNode,r=e.focusOffset
if(n){for(var i,s,o=nt(n);;)if(r<o){if(1!=n.nodeType)break
if(!rt(n.childNodes[r]))break
i=n,s=++r}else{if(ot(n))break
for(var a=n.nextSibling;a&&rt(a);)i=a.parentNode,s=l(a)+1,a=a.nextSibling
if(a)r=0,o=nt(n=a)
else{if((n=n.parentNode)==t.dom)break
r=o=0}}i&&at(t,e,i,s)}}function ot(t){var e=t.pmViewDesc
return e&&e.node&&e.node.isBlock}function at(t,e,n,r){if(m(e)){var i=document.createRange()
i.setEnd(n,r),i.setStart(n,r),e.removeAllRanges(),e.addRange(i)}else e.extend&&e.extend(n,r)
t.selectionReader.storeDOMState(t.selection)}function lt(t,e,n){var r=t.state.selection
if(r instanceof ms.TextSelection&&!r.empty||n.indexOf("s")>-1)return!1
var i=r.$from,s=r.$to
if(!i.parent.inlineContent||t.endOfTextblock(e<0?"up":"down")){var o=Z(t.state,e)
if(o&&o instanceof ms.NodeSelection)return tt(t,o)}if(!i.parent.inlineContent){var a=ms.Selection.findFrom(e<0?i:s,e)
return!a||tt(t,a)}return!1}function ct(t,e){if(!(t.state.selection instanceof ms.TextSelection))return!0
var n=t.state.selection,r=n.$head,i=n.$anchor,s=n.empty
if(!r.sameParent(i))return!0
if(!s)return!1
if(t.endOfTextblock(e>0?"forward":"backward"))return!0
var o=!r.textOffset&&(e<0?r.nodeBefore:r.nodeAfter)
if(o&&!o.isText){var a=t.state.tr
return e<0?a.delete(r.pos-o.nodeSize,r.pos):a.delete(r.pos,r.pos+o.nodeSize),t.dispatch(a),!0}return!1}function ht(t,e,n){t.domObserver.stop(),e.contentEditable=n,t.domObserver.start()}function pt(t,e){var r=e.keyCode,i=function(t){var e=""
return t.ctrlKey&&(e+="c"),t.metaKey&&(e+="m"),t.altKey&&(e+="a"),t.shiftKey&&(e+="s"),e}(e)
return 8==r||n.mac&&72==r&&"c"==i?ct(t,-1)||it(t):46==r||n.mac&&68==r&&"c"==i?ct(t,1)||st(t):13==r||27==r||(37==r?et(t,-1,i)||it(t):39==r?et(t,1,i)||st(t):38==r?lt(t,-1,i)||it(t):40==r?function(t){if(n.chrome&&!(t.state.selection.$head.parentOffset>0)){var e=t.root.getSelection(),r=e.focusNode,i=e.focusOffset
if(r&&1==r.nodeType&&0==i&&r.firstChild&&"false"==r.firstChild.contentEditable){var s=r.firstChild
ht(t,s,!0),setTimeout(function(){return ht(t,s,!1)},20)}}}(t)||lt(t,1,i)||st(t):i==(n.mac?"m":"c")&&(66==r||73==r||89==r||90==r))}X.prototype.getPreMatch=function(t){return t>=this.preMatchOffset?this.preMatched[t-this.preMatchOffset]:null},X.prototype.destroyBetween=function(t,e){if(t!=e){for(var n=t;n<e;n++)this.top.children[n].destroy()
this.top.children.splice(t,e-t),this.changed=!0}},X.prototype.destroyRest=function(){this.destroyBetween(this.index,this.top.children.length)},X.prototype.syncToMarks=function(t,e,n){for(var r=0,i=this.stack.length>>1,s=Math.min(i,t.length);r<s&&(r==i-1?this.top:this.stack[r+1<<1]).matchesMark(t[r])&&!1!==t[r].type.spec.spanning;)r++
for(;r<i;)this.destroyRest(),this.top.dirty=0,this.index=this.stack.pop(),this.top=this.stack.pop(),i--
for(;i<t.length;){this.stack.push(this.top,this.index+1)
for(var o=-1,a=this.index;a<Math.min(this.index+3,this.top.children.length);a++)if(this.top.children[a].matchesMark(t[i])){o=a
break}if(o>-1)o>this.index&&(this.changed=!0,this.top.children.splice(this.index,o-this.index)),this.top=this.top.children[this.index]
else{var l=P.create(this.top,t[i],e,n)
this.top.children.splice(this.index,0,l),this.top=l,this.changed=!0}this.index=0,i++}},X.prototype.findNodeMatch=function(t,e,n,r){var i=-1,s=r<0?void 0:this.getPreMatch(r),o=this.top.children
if(s&&s.matchesNode(t,e,n))i=o.indexOf(s)
else for(var a=this.index,l=Math.min(o.length,a+5);a<l;a++){var c=o[a]
if(c.matchesNode(t,e,n)&&this.preMatched.indexOf(c)<0){i=a
break}}return!(i<0)&&(this.destroyBetween(this.index,i),this.index++,!0)},X.prototype.updateNextNode=function(t,e,n,r,i){if(this.index==this.top.children.length)return!1
var s=this.top.children[this.index]
if(s instanceof F){var o=this.preMatched.indexOf(s)
if(o>-1&&o+this.preMatchOffset!=i)return!1
var a=s.dom
if(s.update(t,e,n,r))return s.dom!=a&&(this.changed=!0),this.index++,!0}return!1},X.prototype.addNode=function(t,e,n,r,i){this.top.children.splice(this.index++,0,F.create(this.top,t,e,n,r,i)),this.changed=!0},X.prototype.placeWidget=function(t,e,n){if(this.index<this.top.children.length&&this.top.children[this.index].matchesWidget(t))this.index++
else{var r=new(t.spec.isCursorWrapper?z:B)(this.top,t,e,n)
this.top.children.splice(this.index++,0,r),this.changed=!0}},X.prototype.addTextblockHacks=function(){for(var t=this.top.children[this.index-1];t instanceof P;)t=t.children[t.children.length-1]
if(!t||!(t instanceof L)||/\n$/.test(t.node.text))if(this.index<this.top.children.length&&this.top.children[this.index].matchesHack())this.index++
else{var e=document.createElement("br")
this.top.children.splice(this.index++,0,new j(this.top,I,e,null)),this.changed=!0}}
var ut=function(t,e,n){this.prev=t,this.mapping=e,this.state=n},dt=function(t){this.seen=[new ut(null,null,t)],ms.EditorState.addApplyListener(this.track=this.track.bind(this))}
dt.prototype.destroy=function(){ms.EditorState.removeApplyListener(this.track)},dt.prototype.find=function(t){for(var e=this.seen.length-1;e>=0;e--){var n=this.seen[e]
if(n.state==t)return n}},dt.prototype.track=function(t,e,n){var r=this.seen.length<200?this.find(t):null
r&&this.seen.push(new ut(r,e.docChanged?e.mapping:null,n))},dt.prototype.getMapping=function(t,e){var n=this.find(t)
if(!n)return null
for(var r=[],i=n;i;i=i.prev)i.mapping&&r.push(i.mapping)
for(var s=e||new hs.Mapping,o=r.length-1;o>=0;o--)s.appendMapping(r[o])
return s}
var ft=function(t){var e=this
this.view=t,this.lastAnchorNode=this.lastHeadNode=this.lastAnchorOffset=this.lastHeadOffset=null,this.lastSelection=t.state.selection,this.ignoreUpdates=!1,this.suppressUpdates=!1,this.poller=new("onselectionchange"in document?mt:gt)(this),this.focusFunc=function(){return e.poller.start(St(e.view))}.bind(this),this.blurFunc=this.poller.stop,t.dom.addEventListener("focus",this.focusFunc),t.dom.addEventListener("blur",this.blurFunc),t.editable||this.poller.start(!1)}
ft.prototype.destroy=function(){this.view.dom.removeEventListener("focus",this.focusFunc),this.view.dom.removeEventListener("blur",this.blurFunc),this.poller.stop()},ft.prototype.poll=function(t){this.poller.poll(t)},ft.prototype.editableChanged=function(){this.view.editable?St(this.view)||this.poller.stop():this.poller.start()},ft.prototype.domChanged=function(){var t=this.view.root.getSelection()
return t.anchorNode!=this.lastAnchorNode||t.anchorOffset!=this.lastAnchorOffset||t.focusNode!=this.lastHeadNode||t.focusOffset!=this.lastHeadOffset},ft.prototype.storeDOMState=function(t){var e=this.view.root.getSelection()
this.lastAnchorNode=e.anchorNode,this.lastAnchorOffset=e.anchorOffset,this.lastHeadNode=e.focusNode,this.lastHeadOffset=e.focusOffset,this.lastSelection=t},ft.prototype.clearDOMState=function(){this.lastAnchorNode=this.lastSelection=null},ft.prototype.readFromDOM=function(t){if(!this.ignoreUpdates&&this.domChanged()&&St(this.view)){if(this.suppressUpdates)return vt(this.view)
if(this.view.inDOMChange||this.view.domObserver.flush(),!this.view.inDOMChange){var e,n,r=this.view.root.getSelection(),i=this.view.state.doc,s=this.view.docView.nearestDesc(r.focusNode),o=s&&0==s.size,a=this.view.docView.posFromDOM(r.focusNode,r.focusOffset),l=i.resolve(a)
if(m(r)){for(e=l;s&&!s.node;)s=s.parent
if(s&&s.node.isAtom&&ms.NodeSelection.isSelectable(s.node)&&s.parent){var c=s.posBefore
n=new ms.NodeSelection(a==c?l:i.resolve(c))}}else e=i.resolve(this.view.docView.posFromDOM(r.anchorNode,r.anchorOffset))
if(!n){var h="pointer"==t||this.view.state.selection.head<l.pos&&!o?1:-1
n=xt(this.view,e,l,h)}if(this.view.state.selection.eq(n))vt(this.view)
else{var p=this.view.state.tr.setSelection(n)
"pointer"==t?p.setMeta("pointer",!0):"key"==t&&p.scrollIntoView(),this.view.dispatch(p)}}}}
var mt=function(t){var e=this
this.listening=!1,this.curOrigin=null,this.originTime=0,this.reader=t,this.readFunc=function(){return t.readFromDOM(e.originTime>Date.now()-50?e.curOrigin:null)}}
mt.prototype.poll=function(t){this.curOrigin=t,this.originTime=Date.now()},mt.prototype.start=function(t){this.listening||(this.reader.view.dom.ownerDocument.addEventListener("selectionchange",this.readFunc),this.listening=!0,t&&this.readFunc())},mt.prototype.stop=function(){this.listening&&(this.reader.view.dom.ownerDocument.removeEventListener("selectionchange",this.readFunc),this.listening=!1)}
var gt=function(t){this.polling=null,this.reader=t,this.pollFunc=this.doPoll.bind(this,null)}
function vt(t,e,r){var i=t.state.selection
if(kt(t,i),t.editable&&!t.hasFocus()){if(!e)return
n.gecko&&n.gecko_version<=55&&(t.selectionReader.ignoreUpdates=!0,t.dom.focus(),t.selectionReader.ignoreUpdates=!1)}else if(!t.editable&&!Ct(t)&&!e)return
var s=t.selectionReader
if(!s.lastSelection||!s.lastSelection.eq(i)||s.domChanged()){if(s.ignoreUpdates=!0,t.cursorWrapper)(function(t){var e=t.root.getSelection(),r=document.createRange(),i=t.cursorWrapper.dom
r.setEnd(i,i.childNodes.length),r.collapse(!1),e.removeAllRanges(),e.addRange(r),!t.state.selection.visible&&n.ie&&n.ie_version<=11&&(i.disabled=!0,i.disabled=!1)})(t)
else{var o,a,l=i.anchor,c=i.head
!yt||i instanceof ms.TextSelection||(i.$from.parent.inlineContent||(o=bt(t,i.from)),i.empty||i.$from.parent.inlineContent||(a=bt(t,i.to))),t.docView.setSelection(l,c,t.root,r),yt&&(o&&(o.contentEditable="false"),a&&(a.contentEditable="false")),i.visible?t.dom.classList.remove("ProseMirror-hideselection"):l!=c&&(t.dom.classList.add("ProseMirror-hideselection"),"onselectionchange"in document&&function(t){var e=t.dom.ownerDocument
e.removeEventListener("selectionchange",t.hideSelectionGuard)
var n=t.root.getSelection(),r=n.anchorNode,i=n.anchorOffset
e.addEventListener("selectionchange",t.hideSelectionGuard=function(){n.anchorNode==r&&n.anchorOffset==i||(e.removeEventListener("selectionchange",t.hideSelectionGuard),t.dom.classList.remove("ProseMirror-hideselection"))})}(t))}s.storeDOMState(i),s.ignoreUpdates=!1}}gt.prototype.doPoll=function(t){var e=this.reader.view
e.focused||!e.editable?(this.reader.readFromDOM(t),this.polling=setTimeout(this.pollFunc,100)):this.polling=null},gt.prototype.poll=function(t){clearTimeout(this.polling),this.polling=setTimeout(t?this.doPoll.bind(this,t):this.pollFunc,0)},gt.prototype.start=function(){null==this.polling&&this.poll()},gt.prototype.stop=function(){clearTimeout(this.polling),this.polling=null}
var yt=n.safari||n.chrome&&n.chrome_version<63
function bt(t,e){var n=t.docView.domFromPos(e),r=n.node,i=n.offset,s=i<r.childNodes.length?r.childNodes[i]:null,o=i?r.childNodes[i-1]:null
if(!(s&&"false"!=s.contentEditable||o&&"false"!=o.contentEditable)){if(s)return s.contentEditable="true",s
if(o)return o.contentEditable="true",o}}function kt(t,e){if(e instanceof ms.NodeSelection){var n=t.docView.descAt(e.from)
n!=t.lastSelectedViewDesc&&(wt(t),n&&n.selectNode(),t.lastSelectedViewDesc=n)}else wt(t)}function wt(t){t.lastSelectedViewDesc&&(t.lastSelectedViewDesc.parent&&t.lastSelectedViewDesc.deselectNode(),t.lastSelectedViewDesc=null)}function xt(t,e,n,r){return t.someProp("createSelectionBetween",function(r){return r(t,e,n)})||ms.TextSelection.between(e,n,r)}function St(t){return(!t.editable||t.root.activeElement==t.dom)&&Ct(t)}function Ct(t){var e=t.root.getSelection()
if(!e.anchorNode)return!1
try{return t.dom.contains(3==e.anchorNode.nodeType?e.anchorNode.parentNode:e.anchorNode)&&(t.editable||t.dom.contains(3==e.focusNode.nodeType?e.focusNode.parentNode:e.focusNode))}catch(n){return!1}}function Mt(t){return!1===t.type.spec.inclusive}function Ot(t){var e=t.selection,n=e.$head,r=e.$anchor,i=e.visible,s=n.pos!=r.pos||i&&!n.parent.inlineContent?null:n
return s&&(!i||t.storedMarks||0==s.parent.content.length||s.parentOffset&&!s.textOffset&&s.nodeBefore.marks.some(Mt))?s:null}var Et=function t(e,n){var r=this
this.view=e,this.state=e.state,this.composing=n,this.compositionEndedAt=null,this.from=this.to=null,this.typeOver=!1,this.timeout=n?null:setTimeout(function(){return r.finish()},t.commitTimeout),this.trackMappings=new dt(e.state),this.mapping=new hs.Mapping,this.mappingTo=e.state}
function Tt(t,e){return function(r){var i=r.pmViewDesc
if(i)return i.parseRule()
if("BR"==r.nodeName&&r.parentNode){if(n.safari&&/^(ul|ol)$/i.test(r.parentNode.nodeName))return t.matchTag(document.createElement("li"),e)
if(r.parentNode.lastChild==r||n.safari&&/^(tr|table)$/i.test(r.parentNode.nodeName))return{ignore:!0}}}}function At(t,e){for(var n=e||0;n<t.depth;n++)if(t.index(n)+1<t.node(n).childCount)return!1
return t.parentOffset==t.parent.content.size}function Nt(t,e){for(var n=e||0;n<t.depth;n++)if(t.index(0)>0)return!1
return 0==t.parentOffset}function Dt(t,e,n,r){return Math.max(r.anchor,r.head)>e.content.size?null:xt(t,e.resolve(n.map(r.anchor)),e.resolve(n.map(r.head)))}function _t(t,e,n){for(var r=t.depth,i=e?t.end():t.pos;r>0&&(e||t.indexAfter(r)==t.node(r).childCount);)r--,i++,e=!1
if(n)for(var s=t.node(r).maybeChild(t.indexAfter(r));s&&!s.isLeaf;)s=s.firstChild,i++
return i}function Rt(t,e){for(var n=[],r=e.content,i=e.openStart,s=e.openEnd;i>1&&s>1&&1==r.childCount&&1==r.firstChild.childCount;){i--,s--
var o=r.firstChild
n.push(o.type.name,o.type.hasRequiredAttrs()?o.attrs:null),r=o.content}var a=t.someProp("clipboardSerializer")||ls.DOMSerializer.fromSchema(t.state.schema),l=document.createElement("div")
l.appendChild(a.serializeFragment(r))
for(var c,h=l.firstChild;h&&1==h.nodeType&&(c=zt[h.nodeName.toLowerCase()]);){for(var p=c.length-1;p>=0;p--){for(var u=document.createElement(c[p]);l.firstChild;)u.appendChild(l.firstChild)
l.appendChild(u)}h=l.firstChild}return h&&1==h.nodeType&&h.setAttribute("data-pm-slice",i+" "+s+" "+JSON.stringify(n)),{dom:l,text:t.someProp("clipboardTextSerializer",function(t){return t(e)})||e.content.textBetween(0,e.content.size,"\n\n")}}function It(t,e,n,r,i){var s,o,a=i.parent.type.spec.code
if(!n&&!e)return null
var l=e&&(r||a||!n)
if(l){if(t.someProp("transformPastedText",function(t){e=t(e)}),a)return new ls.Slice(ls.Fragment.from(t.state.schema.text(e)),0,0)
var c=t.someProp("clipboardTextParser",function(t){return t(e,i)})
c?o=c:(s=document.createElement("div"),e.trim().split(/(?:\r\n?|\n)+/).forEach(function(t){s.appendChild(document.createElement("p")).textContent=t}))}else t.someProp("transformPastedHTML",function(t){n=t(n)}),s=function(t){var e=/(\s*<meta [^>]*>)*/.exec(t)
e&&(t=t.slice(e[0].length))
var n,r=(Pt||(Pt=document.implementation.createHTMLDocument("title"))).createElement("div"),i=/(?:<meta [^>]*>)*<([a-z][^>\s]+)/i.exec(t),s=0;(n=i&&zt[i[1].toLowerCase()])&&(t=n.map(function(t){return"<"+t+">"}).join("")+t+n.map(function(t){return"</"+t+">"}).reverse().join(""),s=n.length)
r.innerHTML=t
for(var o=0;o<s;o++)r=r.firstChild
return r}(n)
var h=s&&s.querySelector("[data-pm-slice]"),p=h&&/^(\d+) (\d+) (.*)/.exec(h.getAttribute("data-pm-slice"))
if(!o){var u=t.someProp("clipboardParser")||t.someProp("domParser")||ls.DOMParser.fromSchema(t.state.schema)
o=u.parseSlice(s,{preserveWhitespace:!(!l&&!p),context:i})}return o=p?function(t,e){if(!t.size)return t
var n,r=t.content.firstChild.type.schema
try{n=JSON.parse(e)}catch(c){return t}for(var i=t.content,s=t.openStart,o=t.openEnd,a=n.length-2;a>=0;a-=2){var l=r.nodes[n[a]]
if(!l||l.hasRequiredAttrs())break
i=ls.Fragment.from(l.create(n[a+1],i)),s++,o++}return new ls.Slice(i,s,o)}(new ls.Slice(o.content,Math.min(o.openStart,+p[1]),Math.min(o.openEnd,+p[2])),p[3]):ls.Slice.maxOpen(function(t,e){if(t.childCount<2)return t
for(var n=function(n){var r=e.node(n),i=r.contentMatchAt(e.index(n)),s=void 0,o=[]
if(t.forEach(function(t){if(o){var e,n=i.findWrapping(t.type)
if(!n)return o=null
if(e=o.length&&s.length&&function t(e,n,r,i,s){if(s<e.length&&s<n.length&&e[s]==n[s]){var o=t(e,n,r,i.lastChild,s+1)
if(o)return i.copy(i.content.replaceChild(i.childCount-1,o))
var a=i.contentMatchAt(i.childCount)
if(a.matchType(s==e.length-1?r.type:e[s+1]))return i.copy(i.content.append(ls.Fragment.from(Bt(r,e,s+1))))}}(n,s,t,o[o.length-1],0))o[o.length-1]=e
else{o.length&&(o[o.length-1]=function t(e,n){if(0==n)return e
var r=e.content.replaceChild(e.childCount-1,t(e.lastChild,n-1))
var i=e.contentMatchAt(e.childCount).fillBefore(ls.Fragment.empty,!0)
return e.copy(r.append(i))}(o[o.length-1],s.length))
var r=Bt(t,n)
o.push(r),i=i.matchType(r.type,r.attrs),s=n}}}),o)return{v:ls.Fragment.from(o)}},r=e.depth;r>=0;r--){var i=n(r)
if(i)return i.v}return t}(o.content,i),!1),t.someProp("transformPasted",function(t){o=t(o)}),o}function Bt(t,e,n){void 0===n&&(n=0)
for(var r=e.length-1;r>=n;r--)t=e[r].create(null,ls.Fragment.from(t))
return t}Et.prototype.addRange=function(t,e){null==this.from?(this.from=t,this.to=e):(this.from=Math.min(t,this.from),this.to=Math.max(e,this.to))},Et.prototype.changedRange=function(){if(null==this.from)return function(t){var e=t.$anchor.min(t.$head),n=t.$anchor.max(t.$head)
if(e.sameParent(n)&&e.parent.inlineContent&&e.parentOffset&&n.parentOffset<n.parent.content.size){var r=Math.max(0,e.parentOffset),i=e.parent.content.size,s=Math.min(i,n.parentOffset)
if(r>0&&(r=e.parent.childBefore(r).offset),s<i){var o=e.parent.childAfter(s)
s=o.offset+o.node.nodeSize}var a=e.start()
return{from:a+r,to:a+s}}for(var l=0;;l++){var c=Nt(e,l+1),h=At(n,l+1)
if(c||h||e.index(l)!=n.index(l)||n.node(l).isTextblock){var p=e.before(l+1),u=n.after(l+1)
return c&&e.index(l)>0&&(p-=e.node(l).child(e.index(l)-1).nodeSize),h&&n.index(l)+1<n.node(l).childCount&&(u+=n.node(l).child(n.index(l)+1).nodeSize),{from:p,to:u}}}}(this.state.selection)
var t=this.state.doc.resolve(Math.min(this.from,this.state.selection.from)),e=this.state.doc.resolve(this.to),n=t.sharedDepth(this.to)
return{from:t.before(n+1),to:e.after(n+1)}},Et.prototype.markDirty=function(t){null==this.from?this.view.docView.markDirty((t=t||this.changedRange()).from,t.to):this.view.docView.markDirty(this.from,this.to)},Et.prototype.stateUpdated=function(t){return this.trackMappings.getMapping(t,this.mapping)?(this.trackMappings.destroy(),this.trackMappings=new dt(t),this.mappingTo=t,!0):(this.markDirty(),this.destroy(),!1)},Et.prototype.finish=function(t){if(clearTimeout(this.timeout),!this.composing||t){this.view.domObserver.flush()
var e=this.changedRange()
this.markDirty(e),this.destroy()
var r=this.state.selection,i=this.typeOver&&r instanceof ms.TextSelection&&!r.empty&&r.$head.sameParent(r.$anchor);(function(t,e,r,i,s){var o,a,l=function(t,e,r){var i=t.docView.parseRange(r.from,r.to),s=i.node,o=i.fromOffset,a=i.toOffset,l=i.from,c=i.to,h=t.root.getSelection(),p=null,u=h.anchorNode
u&&t.dom.contains(1==u.nodeType?u:u.parentNode)&&(p=[{node:u,offset:h.anchorOffset}],m(h)||p.push({node:h.focusNode,offset:h.focusOffset}))
if(n.chrome&&8===t.lastKeyCode)for(var d=a;d>o;d--){var f=s.childNodes[d-1],g=f.pmViewDesc
if("BR"==f.nodeType&&!g){a=d
break}if(!g||g.size)break}var v=e.doc,y=t.someProp("domParser")||ls.DOMParser.fromSchema(t.state.schema),b=v.resolve(l),k=null,w=y.parse(s,{topNode:b.parent,topMatch:b.parent.contentMatchAt(b.index()),topOpen:!0,from:o,to:a,preserveWhitespace:!b.parent.type.spec.code||"full",editableContent:!0,findPositions:p,ruleFromNode:Tt(y,b),context:b})
if(p&&null!=p[0].pos){var x=p[0].pos,S=p[1]&&p[1].pos
null==S&&(S=x),k={anchor:x+l,head:S+l}}return{doc:w,sel:k,from:l,to:c}}(t,r,i),c=r.doc,h=c.slice(l.from,l.to)
8===t.lastKeyCode&&Date.now()-100<t.lastKeyCodeTime?(o=r.selection.to,a="end"):(o=r.selection.from,a="start")
t.lastKeyCode=null
var p=function(t,e,n,r,i){var s=t.findDiffStart(e,n)
if(null==s)return null
var o=t.findDiffEnd(e,n+t.size,n+e.size),a=o.a,l=o.b
if("end"==i){var c=Math.max(0,s-Math.min(a,l))
r-=a+c-s}if(a<s&&t.size<e.size){var h=r<=s&&r>=a?s-r:0
l=(s-=h)+(l-a),a=s}else if(l<s){var p=r<=s&&r>=l?s-r:0
a=(s-=p)+(a-l),l=s}return{start:s,endA:a,endB:l}}(h.content,l.doc.content,l.from,o,a)
if(!p){if(s){var u=t.state,d=u.selection
t.dispatch(u.tr.replaceSelectionWith(u.schema.text(u.doc.textBetween(d.from,d.to)),!0).scrollIntoView())}else if(l.sel){var f=Dt(t,t.state.doc,e,l.sel)
f&&!f.eq(t.state.selection)&&t.dispatch(t.state.tr.setSelection(f))}return}t.domChangeCount++,r.selection.from<r.selection.to&&p.start==p.endB&&r.selection instanceof ms.TextSelection&&(p.start>r.selection.from&&p.start<=r.selection.from+2?p.start=r.selection.from:p.endA<r.selection.to&&p.endA>=r.selection.to-2&&(p.endB+=r.selection.to-p.endA,p.endA=r.selection.to))
var v,y=l.doc.resolveNoCache(p.start-l.from),b=l.doc.resolveNoCache(p.endB-l.from)
if(!y.sameParent(b)&&y.pos<l.doc.content.size&&(v=ms.Selection.findFrom(l.doc.resolve(y.pos+1),1,!0))&&v.head==b.pos&&t.someProp("handleKeyDown",function(e){return e(t,g(13,"Enter"))}))return
if(r.selection.anchor>p.start&&function(t,e,n,r,i){if(!r.parent.isTextblock||n-e<=i.pos-r.pos||_t(r,!0,!1)<i.pos)return!1
var s=t.resolve(e)
if(s.parentOffset<s.parent.content.size||!s.parent.isTextblock)return!1
var o=t.resolve(_t(s,!0,!0))
if(!o.parent.isTextblock||o.pos>n||_t(o,!0,!1)<n)return!1
return r.parent.content.cut(r.parentOffset).eq(o.parent.content)}(c,p.start,p.endA,y,b)&&t.someProp("handleKeyDown",function(e){return e(t,g(8,"Backspace"))}))return void(n.android&&n.chrome&&(t.selectionReader.suppressUpdates=!0,setTimeout(function(){return t.selectionReader.suppressUpdates=!1},50)))
var k,w,x,S,C=e.map(p.start),M=Math.max(C,e.map(p.endA,-1))
if(y.sameParent(b)&&y.parent.inlineContent)if(y.pos==b.pos)k=t.state.tr.delete(C,M),w=c.resolve(p.start).marksAcross(c.resolve(p.endA))
else if(p.endA==p.endB&&(S=c.resolve(p.start))&&(x=function(t,e){for(var n,r,i,s=t.firstChild.marks,o=e.firstChild.marks,a=s,l=o,c=0;c<o.length;c++)a=o[c].removeFromSet(a)
for(var h=0;h<s.length;h++)l=s[h].removeFromSet(l)
if(1==a.length&&0==l.length)r=a[0],n="add",i=function(t){return t.mark(r.addToSet(t.marks))}
else{if(0!=a.length||1!=l.length)return null
r=l[0],n="remove",i=function(t){return t.mark(r.removeFromSet(t.marks))}}for(var p=[],u=0;u<e.childCount;u++)p.push(i(e.child(u)))
if(ls.Fragment.from(p).eq(t))return{mark:r,type:n}}(y.parent.content.cut(y.parentOffset,b.parentOffset),S.parent.content.cut(S.parentOffset,p.endA-S.start()))))k=t.state.tr,"add"==x.type?k.addMark(C,M,x.mark):k.removeMark(C,M,x.mark)
else if(y.parent.child(y.index()).isText&&y.index()==b.index()-(b.textOffset?0:1)){var O=y.parent.textBetween(y.parentOffset,b.parentOffset)
if(t.someProp("handleTextInput",function(e){return e(t,C,M,O)}))return
k=t.state.tr.insertText(O,C,M)}k||(k=t.state.tr.replace(C,M,l.doc.slice(p.start-l.from,p.endB-l.from)))
if(l.sel){var E=Dt(t,k.doc,e,l.sel)
E&&k.setSelection(E)}w&&k.ensureMarks(w)
t.dispatch(k.scrollIntoView())})(this.view,this.mapping,this.state,e,i),this.view.docView.dirty&&this.view.updateState(this.view.state)}},Et.prototype.destroy=function(){clearTimeout(this.timeout),this.trackMappings.destroy(),this.view.inDOMChange=null},Et.prototype.compositionEnd=function(t){var e=this
this.composing&&(this.composing=!1,t&&(this.compositionEndedAt=t.timeStamp),this.timeout=setTimeout(function(){return e.finish()},50))},Et.prototype.ignoreKeyDownOnCompositionEnd=function(t){return!!(n.safari&&null!==this.compositionEndedAt&&Math.abs(t.timeStamp-this.compositionEndedAt)<500)&&(this.compositionEndedAt=null,!0)},Et.start=function(t,e){return t.inDOMChange?e&&(clearTimeout(t.inDOMChange.timeout),t.inDOMChange.composing=!0,t.inDOMChange.compositionEndedAt=null):t.inDOMChange=new Et(t,e),t.inDOMChange},Et.commitTimeout=20
var zt={thead:["table"],colgroup:["table"],col:["table","colgroup"],tr:["table","tbody"],td:["table","tbody","tr"],th:["table","tbody","tr"]},Pt=null
var Ft={childList:!0,characterData:!0,attributes:!0,subtree:!0,characterDataOldValue:!0},Vt=n.ie&&n.ie_version<=11,Lt=function(t){var e=this
this.view=t,this.observer=window.MutationObserver&&new window.MutationObserver(function(t){return e.registerMutations(t)}),Vt&&(this.onCharData=function(t){return e.registerMutation({target:t.target,type:"characterData",oldValue:t.prevValue})})}
Lt.prototype.start=function(){this.observer&&this.observer.observe(this.view.dom,Ft),Vt&&this.view.dom.addEventListener("DOMCharacterDataModified",this.onCharData)},Lt.prototype.stop=function(){this.observer&&(this.flush(),this.observer.disconnect()),Vt&&this.view.dom.removeEventListener("DOMCharacterDataModified",this.onCharData)},Lt.prototype.flush=function(){this.observer&&this.registerMutations(this.observer.takeRecords())},Lt.prototype.registerMutations=function(t){for(var e=0;e<t.length;e++)this.registerMutation(t[e])},Lt.prototype.registerMutation=function(t){if(this.view.editable){var e=this.view.docView.nearestDesc(t.target)
if(("attributes"!=t.type||e!=this.view.docView&&"contenteditable"!=t.attributeName)&&e&&!e.ignoreMutation(t)){var n,r
if("childList"==t.type){var i=t.previousSibling&&t.previousSibling.parentNode==t.target?l(t.previousSibling)+1:0
if(-1==i)return
n=e.localPosFromDOM(t.target,i,-1)
var s=t.nextSibling&&t.nextSibling.parentNode==t.target?l(t.nextSibling):t.target.childNodes.length
if(-1==s)return
r=e.localPosFromDOM(t.target,s,1)}else"attributes"==t.type?(n=e.posAtStart-e.border,r=e.posAtEnd+e.border):(n=e.posAtStart,r=e.posAtEnd,t.target.nodeValue==t.oldValue&&(Et.start(this.view).typeOver=!0))
Et.start(this.view).addRange(n,r)}}}
var jt={},$t={}
function Ht(t){t.someProp("handleDOMEvents",function(e){for(var n in e)t.eventHandlers[n]||t.dom.addEventListener(n,t.eventHandlers[n]=function(e){return Ut(t,e)})})}function Ut(t,e){return t.someProp("handleDOMEvents",function(n){var r=n[e.type]
return!!r&&(r(t,e)||e.defaultPrevented)})}function Jt(t){return{left:t.clientX,top:t.clientY}}function qt(t,e,n,r,i){if(-1==r)return!1
for(var s=t.state.doc.resolve(r),o=function(r){if(t.someProp(e,function(e){return r>s.depth?e(t,n,s.nodeAfter,s.before(r),i,!0):e(t,n,s.node(r),s.before(r),i,!1)}))return{v:!0}},a=s.depth+1;a>0;a--){var l=o(a)
if(l)return l.v}return!1}function Wt(t,e,n){t.focused||t.focus()
var r=t.state.tr.setSelection(e)
"pointer"==n&&r.setMeta("pointer",!0),t.dispatch(r)}function Kt(t,e,n,r,i){return qt(t,"handleClickOn",e,n,r)||t.someProp("handleClick",function(n){return n(t,e,r)})||(i?function(t,e){if(-1==e)return!1
var n,r,i=t.state.selection
i instanceof ms.NodeSelection&&(n=i.node)
for(var s=t.state.doc.resolve(e),o=s.depth+1;o>0;o--){var a=o>s.depth?s.nodeAfter:s.node(o)
if(ms.NodeSelection.isSelectable(a)){r=n&&i.$from.depth>0&&o>=i.$from.depth&&s.before(i.$from.depth+1)==i.$from.pos?s.before(i.$from.depth):s.before(o)
break}}return null!=r&&(Wt(t,ms.NodeSelection.create(t.state.doc,r),"pointer"),!0)}(t,n):function(t,e){if(-1==e)return!1
var n=t.state.doc.resolve(e),r=n.nodeAfter
return!!(r&&r.isAtom&&ms.NodeSelection.isSelectable(r))&&(Wt(t,new ms.NodeSelection(n),"pointer"),!0)}(t,n))}function Gt(t,e,n,r){return qt(t,"handleTripleClickOn",e,n,r)||t.someProp("handleTripleClick",function(n){return n(t,e,r)})||function(t,e){var n=t.state.doc
if(-1==e)return!!n.inlineContent&&(Wt(t,ms.TextSelection.create(n,0,n.content.size),"pointer"),!0)
for(var r=n.resolve(e),i=r.depth+1;i>0;i--){var s=i>r.depth?r.nodeAfter:r.node(i),o=r.before(i)
if(s.inlineContent)Wt(t,ms.TextSelection.create(n,o+1,o+1+s.content.size),"pointer")
else{if(!ms.NodeSelection.isSelectable(s))continue
Wt(t,ms.NodeSelection.create(n,o),"pointer")}return!0}}(t,n)}function Yt(t){return!!t.inDOMChange&&(t.inDOMChange.finish(!0),!0)}$t.keydown=function(t,e){if(t.shiftKey=16==e.keyCode||e.shiftKey,t.inDOMChange){if(t.inDOMChange.composing)return
if(t.inDOMChange.ignoreKeyDownOnCompositionEnd(e))return
t.inDOMChange.finish()}t.lastKeyCode=e.keyCode,t.lastKeyCodeTime=Date.now(),t.someProp("handleKeyDown",function(n){return n(t,e)})||pt(t,e)?e.preventDefault():t.selectionReader.poll("key")},$t.keyup=function(t,e){16==e.keyCode&&(t.shiftKey=!1)},$t.keypress=function(t,e){if(!(t.inDOMChange||!e.charCode||e.ctrlKey&&!e.altKey||n.mac&&e.metaKey))if(t.someProp("handleKeyPress",function(n){return n(t,e)}))e.preventDefault()
else{var r=t.state.selection
if(!(r instanceof ms.TextSelection&&r.$from.sameParent(r.$to))){var i=String.fromCharCode(e.charCode)
t.someProp("handleTextInput",function(e){return e(t,r.$from.pos,r.$to.pos,i)})||t.dispatch(t.state.tr.insertText(i).scrollIntoView()),e.preventDefault()}}}
var Xt=n.mac?"metaKey":"ctrlKey"
jt.mousedown=function(t,e){t.shiftKey=e.shiftKey
var n=Yt(t),r=Date.now(),i="singleClick"
r-t.lastClick.time<500&&function(t,e){var n=e.x-t.clientX,r=e.y-t.clientY
return n*n+r*r<100}(e,t.lastClick)&&!e[Xt]&&("singleClick"==t.lastClick.type?i="doubleClick":"doubleClick"==t.lastClick.type&&(i="tripleClick")),t.lastClick={time:r,x:e.clientX,y:e.clientY,type:i}
var s=t.posAtCoords(Jt(e))
s&&("singleClick"==i?t.mouseDown=new Qt(t,s,e,n):("doubleClick"==i?function(t,e,n,r){return qt(t,"handleDoubleClickOn",e,n,r)||t.someProp("handleDoubleClick",function(n){return n(t,e,r)})}:Gt)(t,s.pos,s.inside,e)?e.preventDefault():t.selectionReader.poll("pointer"))}
var Qt=function(t,e,r,i){var s,o,a=this
if(this.view=t,this.pos=e,this.event=r,this.flushed=i,this.selectNode=r[Xt],this.allowDefault=r.shiftKey,e.inside>-1)s=t.state.doc.nodeAt(e.inside),o=e.inside
else{var l=t.state.doc.resolve(e.pos)
s=l.parent,o=l.depth?l.before():0}this.mightDrag=null
var c=i?null:r.target,h=c?t.docView.nearestDesc(c,!0):null
this.target=h?h.dom:null,(s.type.spec.draggable&&!1!==s.type.spec.selectable||t.state.selection instanceof ms.NodeSelection&&o==t.state.selection.from)&&(this.mightDrag={node:s,pos:o,addAttr:this.target&&!this.target.draggable,setUneditable:this.target&&n.gecko&&!this.target.hasAttribute("contentEditable")}),this.target&&this.mightDrag&&(this.mightDrag.addAttr||this.mightDrag.setUneditable)&&(this.view.domObserver.stop(),this.mightDrag.addAttr&&(this.target.draggable=!0),this.mightDrag.setUneditable&&setTimeout(function(){return a.target.setAttribute("contentEditable","false")},20),this.view.domObserver.start()),t.root.addEventListener("mouseup",this.up=this.up.bind(this)),t.root.addEventListener("mousemove",this.move=this.move.bind(this)),t.selectionReader.poll("pointer")}
Qt.prototype.done=function(){this.view.root.removeEventListener("mouseup",this.up),this.view.root.removeEventListener("mousemove",this.move),this.mightDrag&&this.target&&(this.view.domObserver.stop(),this.mightDrag.addAttr&&(this.target.draggable=!1),this.mightDrag.setUneditable&&this.target.removeAttribute("contentEditable"),this.view.domObserver.start()),this.view.mouseDown=null},Qt.prototype.up=function(t){this.done(),this.view.dom.contains(3==t.target.nodeType?t.target.parentNode:t.target)&&(this.allowDefault?(n.ie&&Ot(this.view.state)&&this.view.updateState(this.view.state),this.view.selectionReader.poll("pointer")):Kt(this.view,this.pos.pos,this.pos.inside,t,this.selectNode)?t.preventDefault():!this.flushed&&(!n.chrome||this.view.state.selection instanceof ms.TextSelection||this.pos.pos!=this.view.state.selection.from&&this.pos.pos!=this.view.state.selection.to)?this.view.selectionReader.poll("pointer"):(Wt(this.view,ms.Selection.near(this.view.state.doc.resolve(this.pos.pos)),"pointer"),t.preventDefault()))},Qt.prototype.move=function(t){!this.allowDefault&&(Math.abs(this.event.x-t.clientX)>4||Math.abs(this.event.y-t.clientY)>4)&&(this.allowDefault=!0),this.view.selectionReader.poll("pointer")},jt.touchdown=function(t){Yt(t),t.selectionReader.poll("pointer")},jt.contextmenu=function(t){return Yt(t)},$t.compositionstart=$t.compositionupdate=function(t){Et.start(t,!0)},$t.compositionend=function(t,e){if(!t.inDOMChange){if(!e.data)return
Et.start(t,!0)}t.inDOMChange.compositionEnd(e)},$t.input=function(t){var e=Et.start(t)
e.composing||e.finish()}
var Zt=n.ie&&n.ie_version<15||n.ios&&n.webkit_version<604
function te(t,e,n,r){var i=It(t,e,n,t.shiftKey,t.state.selection.$from)
if(t.someProp("handlePaste",function(e){return e(t,r,i||ls.Slice.empty)})||!i)return!0
var s=function(t){return 0==t.openStart&&0==t.openEnd&&1==t.content.childCount?t.content.firstChild:null}(i),o=s?t.state.tr.replaceSelectionWith(s,t.shiftKey):t.state.tr.replaceSelection(i)
return t.dispatch(o.scrollIntoView().setMeta("paste",!0).setMeta("uiEvent","paste")),!0}jt.copy=$t.cut=function(t,e){var n=t.state.selection,r="cut"==e.type
if(!n.empty){var i=Zt?null:e.clipboardData,s=Rt(t,n.content()),o=s.dom,a=s.text
i?(e.preventDefault(),i.clearData(),i.setData("text/html",o.innerHTML),i.setData("text/plain",a)):function(t,e){var n=e.ownerDocument,r=n.body.appendChild(n.createElement("div"))
r.appendChild(e),r.style.cssText="position: fixed; left: -10000px; top: 10px"
var i=getSelection(),s=n.createRange()
s.selectNodeContents(e),t.dom.blur(),i.removeAllRanges(),i.addRange(s),setTimeout(function(){n.body.removeChild(r),t.focus()},50)}(t,o),r&&t.dispatch(t.state.tr.deleteSelection().scrollIntoView().setMeta("uiEvent","cut"))}},$t.paste=function(t,e){var n=Zt?null:e.clipboardData
n&&(te(t,n.getData("text/plain"),n.getData("text/html"),e)||n.files.length>0)?e.preventDefault():function(t,e){var n=t.dom.ownerDocument,r=t.shiftKey||t.state.selection.$from.parent.type.spec.code,i=n.body.appendChild(n.createElement(r?"textarea":"div"))
r||(i.contentEditable="true"),i.style.cssText="position: fixed; left: -10000px; top: 10px",i.focus(),setTimeout(function(){t.focus(),n.body.removeChild(i),r?te(t,i.value,null,e):te(t,i.textContent,i.innerHTML,e)},50)}(t,e)}
var ee=function(t,e){this.slice=t,this.move=e},ne=n.mac?"altKey":"ctrlKey"
for(var re in jt.dragstart=function(t,e){var n=t.mouseDown
if(n&&n.done(),e.dataTransfer){var r=t.state.selection,i=r.empty?null:t.posAtCoords(Jt(e))
if(i&&i.pos>=r.from&&i.pos<=(r instanceof ms.NodeSelection?r.to-1:r.to));else if(n&&n.mightDrag)t.dispatch(t.state.tr.setSelection(ms.NodeSelection.create(t.state.doc,n.mightDrag.pos)))
else if(e.target&&1==e.target.nodeType){var s=t.docView.nearestDesc(e.target,!0)
if(!s||!s.node.type.spec.draggable||s==t.docView)return
t.dispatch(t.state.tr.setSelection(ms.NodeSelection.create(t.state.doc,s.posBefore)))}var o=t.state.selection.content(),a=Rt(t,o),l=a.dom,c=a.text
e.dataTransfer.clearData(),e.dataTransfer.setData(Zt?"Text":"text/html",l.innerHTML),Zt||e.dataTransfer.setData("text/plain",c),t.dragging=new ee(o,!e[ne])}},jt.dragend=function(t){window.setTimeout(function(){return t.dragging=null},50)},$t.dragover=$t.dragenter=function(t,e){return e.preventDefault()},$t.drop=function(t,e){var n=t.dragging
if(t.dragging=null,e.dataTransfer){var r=t.posAtCoords(Jt(e))
if(r){var i=t.state.doc.resolve(r.pos)
if(i){var s=n&&n.slice||It(t,e.dataTransfer.getData(Zt?"Text":"text/plain"),Zt?null:e.dataTransfer.getData("text/html"),!1,i)
if(s&&(e.preventDefault(),!t.someProp("handleDrop",function(r){return r(t,e,s,n&&n.move)}))){var o=s?hs.dropPoint(t.state.doc,i.pos,s):i.pos
null==o&&(o=i.pos)
var a=t.state.tr
n&&n.move&&a.deleteSelection()
var l=a.mapping.map(o),c=0==s.openStart&&0==s.openEnd&&1==s.content.childCount,h=a.doc
if(c?a.replaceRangeWith(l,l,s.content.firstChild):a.replaceRange(l,l,s),!a.doc.eq(h)){var p=a.doc.resolve(l)
c&&ms.NodeSelection.isSelectable(s.content.firstChild)&&p.nodeAfter&&p.nodeAfter.sameMarkup(s.content.firstChild)?a.setSelection(new ms.NodeSelection(p)):a.setSelection(xt(t,p,a.doc.resolve(a.mapping.map(o)))),t.focus(),t.dispatch(a.setMeta("uiEvent","drop"))}}}}}},jt.focus=function(t){t.focused||(t.dom.classList.add("ProseMirror-focused"),t.focused=!0)},jt.blur=function(t){t.focused&&(t.dom.classList.remove("ProseMirror-focused"),t.focused=!1)},jt.beforeinput=function(t,e){if(n.chrome&&n.android&&"deleteContentBackward"==e.inputType){var r=t.domChangeCount
setTimeout(function(){if(t.domChangeCount==r&&(t.dom.blur(),t.focus(),!t.someProp("handleKeyDown",function(e){return e(t,g(8,"Backspace"))}))){var e=t.state.selection.$cursor
e&&e.pos>0&&t.dispatch(t.state.tr.delete(e.pos-1,e.pos).scrollIntoView())}},50)}},$t)jt[re]=$t[re]
function ie(t,e){if(t==e)return!0
for(var n in t)if(t[n]!==e[n])return!1
for(var r in e)if(!(r in t))return!1
return!0}var se=function(t,e){this.spec=e||pe,this.side=this.spec.side||0,this.toDOM=t}
se.prototype.map=function(t,e,n,r){var i=t.mapResult(e.from+r,this.side<0?-1:1),s=i.pos
return i.deleted?null:new le(s-n,s-n,this)},se.prototype.valid=function(){return!0},se.prototype.eq=function(t){return this==t||t instanceof se&&(this.spec.key&&this.spec.key==t.spec.key||this.toDOM==t.toDOM&&ie(this.spec,t.spec))}
var oe=function(t,e){this.spec=e||pe,this.attrs=t}
oe.prototype.map=function(t,e,n,r){var i=t.map(e.from+r,this.spec.inclusiveStart?-1:1)-n,s=t.map(e.to+r,this.spec.inclusiveEnd?1:-1)-n
return i>=s?null:new le(i,s,this)},oe.prototype.valid=function(t,e){return e.from<e.to},oe.prototype.eq=function(t){return this==t||t instanceof oe&&ie(this.attrs,t.attrs)&&ie(this.spec,t.spec)},oe.is=function(t){return t.type instanceof oe}
var ae=function(t,e){this.spec=e||pe,this.attrs=t}
ae.prototype.map=function(t,e,n,r){var i=t.mapResult(e.from+r,1)
if(i.deleted)return null
var s=t.mapResult(e.to+r,-1)
return s.deleted||s.pos<=i.pos?null:new le(i.pos-n,s.pos-n,this)},ae.prototype.valid=function(t,e){var n=t.content.findIndex(e.from),r=n.index,i=n.offset
return i==e.from&&i+t.child(r).nodeSize==e.to},ae.prototype.eq=function(t){return this==t||t instanceof ae&&ie(this.attrs,t.attrs)&&ie(this.spec,t.spec)}
var le=function(t,e,n){this.from=t,this.to=e,this.type=n},ce={spec:{}}
le.prototype.copy=function(t,e){return new le(t,e,this.type)},le.prototype.eq=function(t){return this.type.eq(t.type)&&this.from==t.from&&this.to==t.to},le.prototype.map=function(t,e,n){return this.type.map(t,this,e,n)},le.widget=function(t,e,n){return new le(t,t,new se(e,n))},le.inline=function(t,e,n,r){return new le(t,e,new oe(n,r))},le.node=function(t,e,n,r){return new le(t,e,new ae(n,r))},ce.spec.get=function(){return this.type.spec},Object.defineProperties(le.prototype,ce)
var he=[],pe={},ue=function(t,e){this.local=t&&t.length?t:he,this.children=e&&e.length?e:he}
ue.create=function(t,e){return e.length?ye(e,t,0,pe):de},ue.prototype.find=function(t,e,n){var r=[]
return this.findInner(null==t?0:t,null==e?1e9:e,r,0,n),r},ue.prototype.findInner=function(t,e,n,r,i){for(var s=0;s<this.local.length;s++){var o=this.local[s]
o.from<=e&&o.to>=t&&(!i||i(o.spec))&&n.push(o.copy(o.from+r,o.to+r))}for(var a=0;a<this.children.length;a+=3)if(this.children[a]<e&&this.children[a+1]>t){var l=this.children[a]+1
this.children[a+2].findInner(t-l,e-l,n,r+l,i)}},ue.prototype.map=function(t,e,n){return this==de||0==t.maps.length?this:this.mapInner(t,e,0,0,n||pe)},ue.prototype.mapInner=function(t,e,n,r,i){for(var s,o=0;o<this.local.length;o++){var a=this.local[o].map(t,n,r)
a&&a.type.valid(e,a)?(s||(s=[])).push(a):i.onRemove&&i.onRemove(this.local[o].spec)}return this.children.length?function(t,e,n,r,i,s,o){for(var a=t.slice(),l=function(t,e,n,r){for(var o=0;o<a.length;o+=3){var l=a[o+1],c=void 0;-1==l||t>l+s||(e>=a[o]+s?a[o+1]=-1:(c=r-n-(e-t)+(s-i))&&(a[o]+=c,a[o+1]+=c))}},c=0;c<n.maps.length;c++)n.maps[c].forEach(l)
for(var h=!1,p=0;p<a.length;p+=3)if(-1==a[p+1]){var u=n.map(a[p]+s),d=u-i
if(d<0||d>=r.content.size){h=!0
continue}var f=n.map(t[p+1]+s,-1),m=f-i,g=r.content.findIndex(d),v=g.index,y=g.offset,b=r.maybeChild(v)
if(b&&y==d&&y+b.nodeSize==m){var k=a[p+2].mapInner(n,b,u+1,a[p]+s+1,o)
k!=de?(a[p]=d,a[p+1]=m,a[p+2]=k):(a[p+1]=-2,h=!0)}else h=!0}if(h){var w=function(t,e,n,r,i,s,o){function a(t,e){for(var s=0;s<t.local.length;s++){var l=t.local[s].map(r,i,e)
l?n.push(l):o.onRemove&&o.onRemove(t.local[s].spec)}for(var c=0;c<t.children.length;c+=3)a(t.children[c+2],t.children[c]+e+1)}for(var l=0;l<t.length;l+=3)-1==t[l+1]&&a(t[l+2],e[l]+s+1)
return n}(a,t,e||[],n,i,s,o),x=ye(w,r,0,o)
e=x.local
for(var S=0;S<a.length;S+=3)a[S+1]<0&&(a.splice(S,3),S-=3)
for(var C=0,M=0;C<x.children.length;C+=3){for(var O=x.children[C];M<a.length&&a[M]<O;)M+=3
a.splice(M,0,x.children[C],x.children[C+1],x.children[C+2])}}return new ue(e&&e.sort(be),a)}(this.children,s,t,e,n,r,i):s?new ue(s.sort(be)):de},ue.prototype.add=function(t,e){return e.length?this==de?ue.create(t,e):this.addInner(t,e,0):this},ue.prototype.addInner=function(t,e,n){var r,i=this,s=0
t.forEach(function(t,o){var a,l=o+n
if(a=ge(e,t,l)){for(r||(r=i.children.slice());s<r.length&&r[s]<o;)s+=3
r[s]==o?r[s+2]=r[s+2].addInner(t,a,l+1):r.splice(s,0,o,o+t.nodeSize,ye(a,t,l+1,pe)),s+=3}})
var o=me(s?ve(e):e,-n)
return new ue(o.length?this.local.concat(o).sort(be):this.local,r||this.children)},ue.prototype.remove=function(t){return 0==t.length||this==de?this:this.removeInner(t,0)},ue.prototype.removeInner=function(t,e){for(var n=this.children,r=this.local,i=0;i<n.length;i+=3){for(var s=void 0,o=n[i]+e,a=n[i+1]+e,l=0,c=void 0;l<t.length;l++)(c=t[l])&&c.from>o&&c.to<a&&(t[l]=null,(s||(s=[])).push(c))
if(s){n==this.children&&(n=this.children.slice())
var h=n[i+2].removeInner(s,o+1)
h!=de?n[i+2]=h:(n.splice(i,3),i-=3)}}if(r.length)for(var p=0,u=void 0;p<t.length;p++)if(u=t[p])for(var d=0;d<r.length;d++)r[d].type.eq(u.type)&&(r==this.local&&(r=this.local.slice()),r.splice(d--,1))
return n==this.children&&r==this.local?this:r.length||n.length?new ue(r,n):de},ue.prototype.forChild=function(t,e){var n,r
if(this==de)return this
if(e.isLeaf)return ue.empty
for(var i=0;i<this.children.length;i+=3)if(this.children[i]>=t){this.children[i]==t&&(n=this.children[i+2])
break}for(var s=t+1,o=s+e.content.size,a=0;a<this.local.length;a++){var l=this.local[a]
if(l.from<o&&l.to>s&&l.type instanceof oe){var c=Math.max(s,l.from)-s,h=Math.min(o,l.to)-s
c<h&&(r||(r=[])).push(l.copy(c,h))}}if(r){var p=new ue(r.sort(be))
return n?new fe([p,n]):p}return n||de},ue.prototype.eq=function(t){if(this==t)return!0
if(!(t instanceof ue)||this.local.length!=t.local.length||this.children.length!=t.children.length)return!1
for(var e=0;e<this.local.length;e++)if(!this.local[e].eq(t.local[e]))return!1
for(var n=0;n<this.children.length;n+=3)if(this.children[n]!=t.children[n]||this.children[n+1]!=t.children[n+1]||!this.children[n+2].eq(t.children[n+2]))return!1
return!1},ue.prototype.locals=function(t){return ke(this.localsInner(t))},ue.prototype.localsInner=function(t){if(this==de)return he
if(t.inlineContent||!this.local.some(oe.is))return this.local
for(var e=[],n=0;n<this.local.length;n++)this.local[n].type instanceof oe||e.push(this.local[n])
return e}
var de=new ue
ue.empty=de,ue.removeOverlap=ke
var fe=function(t){this.members=t}
function me(t,e){if(!e||!t.length)return t
for(var n=[],r=0;r<t.length;r++){var i=t[r]
n.push(new le(i.from+e,i.to+e,i.type))}return n}function ge(t,e,n){if(e.isLeaf)return null
for(var r=n+e.nodeSize,i=null,s=0,o=void 0;s<t.length;s++)(o=t[s])&&o.from>n&&o.to<r&&((i||(i=[])).push(o),t[s]=null)
return i}function ve(t){for(var e=[],n=0;n<t.length;n++)null!=t[n]&&e.push(t[n])
return e}function ye(t,e,n,r){var i=[],s=!1
e.forEach(function(e,o){var a=ge(t,e,o+n)
if(a){s=!0
var l=ye(a,e,n+o+1,r)
l!=de&&i.push(o,o+e.nodeSize,l)}})
for(var o=me(s?ve(t):t,-n).sort(be),a=0;a<o.length;a++)o[a].type.valid(e,o[a])||(r.onRemove&&r.onRemove(o[a].spec),o.splice(a--,1))
return o.length||i.length?new ue(o,i):de}function be(t,e){return t.from-e.from||t.to-e.to}function ke(t){for(var e=t,n=0;n<e.length-1;n++){var r=e[n]
if(r.from!=r.to)for(var i=n+1;i<e.length;i++){var s=e[i]
if(s.from!=r.from){s.from<r.to&&(e==t&&(e=t.slice()),e[n]=r.copy(r.from,s.from),we(e,i,r.copy(s.from,r.to)))
break}s.to!=r.to&&(e==t&&(e=t.slice()),e[i]=s.copy(s.from,r.to),we(e,i+1,s.copy(r.to,s.to)))}}return e}function we(t,e,n){for(;e<t.length&&be(n,t[e])>0;)e++
t.splice(e,0,n)}function xe(t){var e=[]
return t.someProp("decorations",function(n){var r=n(t.state)
r&&r!=de&&e.push(r)}),t.cursorWrapper&&e.push(ue.create(t.state.doc,[t.cursorWrapper.deco])),fe.from(e)}fe.prototype.forChild=function(t,e){if(e.isLeaf)return ue.empty
for(var n=[],r=0;r<this.members.length;r++){var i=this.members[r].forChild(t,e)
i!=de&&(i instanceof fe?n=n.concat(i.members):n.push(i))}return fe.from(n)},fe.prototype.eq=function(t){if(!(t instanceof fe)||t.members.length!=this.members.length)return!1
for(var e=0;e<this.members.length;e++)if(!this.members[e].eq(t.members[e]))return!1
return!0},fe.prototype.locals=function(t){for(var e,n=!0,r=0;r<this.members.length;r++){var i=this.members[r].localsInner(t)
if(i.length)if(e){n&&(e=e.slice(),n=!1)
for(var s=0;s<i.length;s++)e.push(i[s])}else e=i}return e?ke(n?e:e.sort(be)):he},fe.from=function(t){switch(t.length){case 0:return de
case 1:return t[0]
default:return new fe(t)}}
var Se=function(t,e){this._props=e,this.state=e.state,this.dispatch=this.dispatch.bind(this),this._root=null,this.focused=!1,this.dom=t&&t.mount||document.createElement("div"),t&&(t.appendChild?t.appendChild(this.dom):t.apply?t(this.dom):t.mount&&(this.mounted=!0)),this.editable=Ee(this),this.cursorWrapper=null,Oe(this),this.nodeViews=Ae(this),this.docView=V(this.state.doc,Me(this),xe(this),this.dom,this),this.lastSelectedViewDesc=null,this.dragging=null,function(t){t.shiftKey=!1,t.mouseDown=null,t.inDOMChange=null,t.lastKeyCode=null,t.lastKeyCodeTime=0,t.lastClick={time:0,x:0,y:0,type:""},t.domObserver=new Lt(t),t.domObserver.start(),t.domChangeCount=0,t.eventHandlers=Object.create(null)
var e=function(e){var n=jt[e]
t.dom.addEventListener(e,t.eventHandlers[e]=function(e){!function(t,e){if(!e.bubbles)return!0
if(e.defaultPrevented)return!1
for(var n=e.target;n!=t.dom;n=n.parentNode)if(!n||11==n.nodeType||n.pmViewDesc&&n.pmViewDesc.stopEvent(e))return!1
return!0}(t,e)||Ut(t,e)||!t.editable&&e.type in $t||n(t,e)})}
for(var n in jt)e(n)
Ht(t)}(this),this.selectionReader=new ft(this),this.pluginViews=[],this.updatePluginViews()},Ce={props:{},root:{}}
function Me(t){var e=Object.create(null)
return e.class="ProseMirror",e.contenteditable=String(t.editable),t.someProp("attributes",function(n){if("function"==typeof n&&(n=n(t.state)),n)for(var r in n)"class"==r?e.class+=" "+n[r]:e[r]||"contenteditable"==r||"nodeName"==r||(e[r]=String(n[r]))}),[le.node(0,t.state.doc.content.size,e)]}function Oe(t){var e=Ot(t.state)
if(!e||n.ie&&t.mouseDown)t.cursorWrapper=null
else{var r,i=t.state.selection.visible,s=t.state.storedMarks||e.marks()
t.cursorWrapper&&ls.Mark.sameSet(t.cursorWrapper.deco.spec.marks,s)&&"\ufeff"==t.cursorWrapper.dom.textContent&&t.cursorWrapper.deco.spec.visible==i?t.cursorWrapper.deco.pos!=e.pos&&(r=t.cursorWrapper.dom):r=function(t){var e=document.createElement("span")
return e.textContent="\ufeff",t||(e.style.position="absolute",e.style.left="-100000px"),e}(i),r&&(t.cursorWrapper={dom:r,deco:le.widget(e.pos,r,{isCursorWrapper:!0,marks:s,raw:!0,visible:i})})}}function Ee(t){return!t.someProp("editable",function(e){return!1===e(t.state)})}function Te(t){var e=t.getSelection(),n=e.focusOffset,r=e.focusNode
return r&&3!=r.nodeType?[r,n,1==r.nodeType?r.childNodes[n-1]:null,1==r.nodeType?r.childNodes[n]:null]:null}function Ae(t){var e={}
return t.someProp("nodeViews",function(t){for(var n in t)Object.prototype.hasOwnProperty.call(e,n)||(e[n]=t[n])}),e}Ce.props.get=function(){if(this._props.state!=this.state){var t=this._props
for(var e in this._props={},t)this._props[e]=t[e]
this._props.state=this.state}return this._props},Se.prototype.update=function(t){t.handleDOMEvents!=this._props.handleDOMEvents&&Ht(this),this._props=t,this.updateStateInner(t.state,!0)},Se.prototype.setProps=function(t){var e={}
for(var n in this._props)e[n]=this._props[n]
for(var r in e.state=this.state,t)e[r]=t[r]
this.update(e)},Se.prototype.updateState=function(t){this.updateStateInner(t,this.state.plugins!=t.plugins)},Se.prototype.updateStateInner=function(t,e){var r=this,i=this.state,s=!1
if(this.state=t,e){var o=Ae(this);(function(t,e){var n=0,r=0
for(var i in t){if(t[i]!=e[i])return!0
n++}for(var s in e)r++
return n!=r})(o,this.nodeViews)&&(this.nodeViews=o,s=!0),Ht(this)}if(this.domObserver.flush(),!this.inDOMChange||!this.inDOMChange.stateUpdated(t)){var a=this.editable
this.editable=Ee(this),Oe(this)
var l,h,u,d=xe(this),f=Me(this),m=e?"reset":t.scrollToSelection>i.scrollToSelection?"to selection":"preserve",g=s||!this.docView.matchesNode(t.doc,f,d),v=g||!t.selection.eq(i.selection)||this.selectionReader.domChanged(),y="preserve"==m&&v&&function(t){for(var e,n,r=t.dom.getBoundingClientRect(),i=Math.max(0,r.top),s=t.dom.ownerDocument,o=(r.left+r.right)/2,a=i+1;a<Math.min(innerHeight,r.bottom);a+=5){var l=t.root.elementFromPoint(o,a)
if(l!=t.dom&&t.dom.contains(l)){var h=l.getBoundingClientRect()
if(h.top>=i-20){e=l,n=h.top
break}}}for(var p=[],u=t.dom;u&&(p.push({dom:u,top:u.scrollTop,left:u.scrollLeft}),u!=s.body);u=c(u));return{refDOM:e,refTop:n,stack:p}}(this)
if(v){this.domObserver.stop()
var k=!1
if(g){var w=n.chrome&&Te(this.root)
!s&&this.docView.update(t.doc,f,d,this)||(this.docView.destroy(),this.docView=V(t.doc,f,d,this.dom,this)),this.selectionReader.clearDOMState(),w&&(k=function(t,e){var n=Te(e)
if(!n||3==n[0].nodeType)return!1
for(var r=0;r<t.length;r++)if(n[r]!=t[r])return!0
return!1}(w,this.root))}k||!(this.mouseDown&&this.selectionReader.domChanged()&&(l=this,h=l.docView.domFromPos(l.state.selection.anchor),u=l.root.getSelection(),p(h.node,h.offset,u.anchorNode,u.anchorOffset)))?vt(this,!1,k):(kt(this,t.selection),this.selectionReader.storeDOMState(t.selection)),this.domObserver.start()}if(a!=this.editable&&this.selectionReader.editableChanged(),this.updatePluginViews(e?null:i),"reset"==m)this.dom.scrollTop=0
else if("to selection"==m){var x=this.root.getSelection().focusNode
this.someProp("handleScrollToSelection",function(t){return t(r)})||(t.selection instanceof ms.NodeSelection?b(this,this.docView.domAfterPos(t.selection.from).getBoundingClientRect(),x):b(this,this.coordsAtPos(t.selection.head),x))}else y&&function(t){for(var e=t.refDOM,n=t.refTop,r=t.stack,i=e?e.getBoundingClientRect().top:0,s=0==i?0:i-n,o=0;o<r.length;o++){var a=r[o],l=a.dom,c=a.top,h=a.left
l.scrollTop!=c+s&&(l.scrollTop=c+s),l.scrollLeft!=h&&(l.scrollLeft=h)}}(y)}},Se.prototype.destroyPluginViews=function(){for(var t;t=this.pluginViews.pop();)t.destroy&&t.destroy()},Se.prototype.updatePluginViews=function(t){if(t)for(var e=0;e<this.pluginViews.length;e++){var n=this.pluginViews[e]
n.update&&n.update(this,t)}else{this.destroyPluginViews()
for(var r=0;r<this.state.plugins.length;r++){var i=this.state.plugins[r]
i.spec.view&&this.pluginViews.push(i.spec.view(this))}}},Se.prototype.someProp=function(t,e){var n,r=this._props&&this._props[t]
if(null!=r&&(n=e?e(r):r))return n
var i=this.state.plugins
if(i)for(var s=0;s<i.length;s++){var o=i[s].props[t]
if(null!=o&&(n=e?e(o):o))return n}},Se.prototype.hasFocus=function(){return this.root.activeElement==this.dom},Se.prototype.focus=function(){this.domObserver.stop(),vt(this,!0),this.domObserver.start(),this.editable&&this.dom.focus()},Ce.root.get=function(){var t=this._root
if(null==t)for(var e=this.dom.parentNode;e;e=e.parentNode)if(9==e.nodeType||11==e.nodeType&&e.host)return this._root=e
return t||document},Se.prototype.posAtCoords=function(t){var e=x(this,t)
return this.inDOMChange&&e&&(e.pos=this.inDOMChange.mapping.map(e.pos),-1!=e.inside&&(e.inside=this.inDOMChange.mapping.map(e.inside))),e},Se.prototype.coordsAtPos=function(t){return this.inDOMChange&&(t=this.inDOMChange.mapping.invert().map(t)),C(this,t)},Se.prototype.domAtPos=function(t){return this.inDOMChange&&(t=this.inDOMChange.mapping.invert().map(t)),this.docView.domFromPos(t)},Se.prototype.nodeDOM=function(t){this.inDOMChange&&(t=this.inDOMChange.mapping.invert().map(t))
var e=this.docView.descAt(t)
return e?e.nodeDOM:null},Se.prototype.posAtDOM=function(t,e,n){void 0===n&&(n=-1)
var r=this.docView.posFromDOM(t,e,n)
if(null==r)throw new RangeError("DOM position not inside the editor")
return this.inDOMChange&&(r=this.inDOMChange.mapping.map(r)),r},Se.prototype.endOfTextblock=function(t,e){return D(this,e||this.state,t)},Se.prototype.destroy=function(){this.docView&&(function(t){for(var e in t.domObserver.stop(),t.inDOMChange&&t.inDOMChange.destroy(),t.eventHandlers)t.dom.removeEventListener(e,t.eventHandlers[e])}(this),this.destroyPluginViews(),this.selectionReader.destroy(),this.mounted?(this.docView.update(this.state.doc,[],xe(this),this),this.dom.textContent=""):this.dom.parentNode&&this.dom.parentNode.removeChild(this.dom),this.docView.destroy(),this.docView=null)},Se.prototype.dispatchEvent=function(t){return function(t,e){Ut(t,e)||!jt[e.type]||!t.editable&&e.type in $t||jt[e.type](t,e)}(this,t)},Se.prototype.dispatch=function(t){var e=this._props.dispatchTransaction
e?e.call(this,t):this.updateState(this.state.apply(t))},Object.defineProperties(Se.prototype,Ce),e.EditorView=Se,e.Decoration=le,e.DecorationSet=ue,e.__serializeForClipboard=Rt,e.__parseFromClipboard=It}))
rs($s)
var Hs=$s.EditorView
$s.Decoration,$s.DecorationSet,$s.__serializeForClipboard,$s.__parseFromClipboard
class Us extends ps{constructor(t,e,n="SetDocAttr"){super(),this.stepType=n,this.key=t,this.value=e}apply(t){return this.prevValue=t.attrs[this.key],t.attrs[this.key]=this.value,us.ok(t)}invert(){return new Us(this.key,this.prevValue,"revertSetDocAttr")}map(){return null}toJSON(){return{stepType:this.stepType,key:this.key,value:this.value}}static fromJSON(t){return new Us(t.key,t.value,t.stepType)}}function Js(t,e){let n=!1
t.forEach(t=>{t===e&&(n=!0)}),n||t.push(e)}function qs(t){let e=t.selection,n=[]
return e.from===e.to?(t.doc.nodeAt(e.from)&&t.doc.nodeAt(e.from).marks.forEach(t=>{Js(n,t)}),t.doc.nodeAt(e.from-1)&&t.doc.nodeAt(e.from-1).marks.forEach(t=>{(t.type.spec.inclusive||void 0===t.type.spec.inclusive)&&Js(n,t)}),t.storedMarks&&t.storedMarks.forEach(t=>{Js(n,t)})):t.doc.nodesBetween(e.from,e.to,t=>{t.marks.forEach(t=>{Js(n,t)})}),n}class Ws extends G{constructor(){super(...arguments),this._guid=null,this.sourceText=null,this.editorView=null,this.status=null,this.schema=null}didInsertElement(){this.makeSchema(),this.sourceText=this.args.text
let t=gs.create({schema:this.schema,doc:this.sourceText?this.schema.nodeFromJSON(this.sourceText):null,plugins:[Os(),js({"Mod-z":Es,"Mod-y":Ts}),js(ks)]}),e=this
e.editorView=new Hs(document.querySelector("#"+this.prosemirrorId),{state:t,dispatchTransaction(t){let n=e.editorView.state.apply(t)
e.stateChange(n),e.editorView.updateState(n)}})}didUpdate(){if(this.args.text&&this.args.text!==this.sourceText){this.sourceText=this.args.text
let t=gs.create({schema:this.schema,doc:this.schema.nodeFromJSON(this.sourceText),plugins:[Os(),js({"Mod-z":Es,"Mod-y":Ts}),js(ks)]})
this.editorView.updateState(t)}}get prosemirrorId(){return"tei-editor-prosemirror-"+ns(this)}stateChange(t){let e={block:null,blocks:null,marks:{}};(function(t){let e=t.selection,n=[]
for(let r=0;r<e.$from.path.length;r++)"object"==typeof e.$from.path[r]&&n.push(e.$from.path[r])
return n})(t).forEach(t=>{t.type.isText||(null===e.blocks&&(e.blocks={}),e.blocks[t.type.name]=t,e.block=t)}),qs(t).forEach(t=>{e.marks[t.type.name]=t}),this.status=e,this.args.update&&(this.sourceText=t.doc.toJSON(),this.args.update(this.sourceText))}menuAction(t,e,n,r){if(this.editorView.focus(),"ev.target.value"===n&&(n=r.target.value),"setDocAttribute"===t){let t=this.editorView.state.tr
t.step(new Us(e,n)),this.editorView.dispatch(t)}else if("setBlockType"===t)if(this.schema.nodes[n].isBlock)if(e.wrapping){let t=this.editorView.state.selection.$from.blockRange(this.editorView.state.selection.$to)
if(this.status.blocks[n])this.editorView.dispatch(this.editorView.state.tr.lift(t,ds(t)))
else{let e=fs(t,this.schema.nodes[n])
e&&this.editorView.dispatch(this.editorView.state.tr.wrap(t,e))}}else ys(this.schema.nodes[n],{})(this.editorView.state,this.editorView.dispatch)
else{let t=this.schema.nodes[n]
var i=this.editorView.state.selection
let e=i.$from,r=i.$to
if(this.status.blocks[n]){let t=e.parent.slice(e.parentOffset,r.parentOffset)
this.editorView.dispatch(this.editorView.state.tr.replaceRange(e.pos-1,r.pos+1,t))}else if(e.parent.canReplaceWith(e.index(),r.index(),t)){let n=e.parent.slice(e.parentOffset,r.parentOffset)
this.editorView.dispatch(this.editorView.state.tr.replaceSelectionWith(t.create({},n.content)))}}else if("setBlockAttribute"===t){let t=this.editorView.state.selection.$from,r=this.editorView.state.tr
for(let i=t.depth;i>=0;i--){let s=t.node(i)
if(void 0!==s.type.attrs[e]){let o=Object.assign({},s.attrs)
o[e]=n,r.setNodeMarkup(t.start(i)-1,null,o)}}this.editorView.dispatch(r)}else if("toggleBlockAttribute"===t){let t=this.editorView.state.selection.$from,n=this.editorView.state.tr
for(let r=t.depth;r>=0;r--){let i=t.node(r)
if(void 0!==i.type.attrs[e]){let s=Object.assign({},i.attrs)
s[e]=!s[e],n.setNodeMarkup(t.start(r)-1,null,s)}}this.editorView.dispatch(n)}else if("setMarkAttribute"===t){e=e.split(".")
qs(this.editorView.state)
var s=this.editorView.state.selection
let t=s.$from,r=s.$to,i=this.editorView.state.tr
if(i.removeMark(t.pos,r.pos,this.schema.marks[e[0]]),n&&""!==n.trim()){let s={}
s[e[1]]=n,i.addMark(t.pos,r.pos,this.schema.marks[e[0]].create(s))}this.editorView.dispatch(i)}else"toggleMark"===t&&bs(this.schema.marks[e])(this.editorView.state,this.editorView.dispatch)}makeSchema(){function t(t,e){let n={class:"tei-editor-"+t}
return e.attrs&&Object.entries(e.attrs).forEach(t=>{n["data-"+t[0]]=t[1]}),n}function e(t){console.log(t)}let n=Yi([this.args.schema])
Object.entries(n.nodes).forEach(n=>{let r=n[0],i=n[1]
"doc"!==r&&"text"!==r&&(i.inline?(i.toDOM=function(e){return["span",t(r,e),0]},i.parseDOM=[{tag:"span.tei-editor-"+r,getAttrs:e}]):(i.toDOM=function(e){return["div",t(r,e),0]},i.parseDOM=[{tag:"div.tei-editor-"+r,getAttrs:e}]))}),Object.entries(n.marks).forEach(n=>{let r=n[0],i=n[1]
i.toDOM=function(e){return["span",t(r,e),0]},i.parseDOM=[{tag:"span.tei-editor-"+r,getAttrs:e}]}),this.schema=new cs(n)}}(function(t,e,n,r){var i,s=arguments.length,o=s<3?e:null===r?r=Object.getOwnPropertyDescriptor(e,n):r
if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(t,e,n,r)
else for(var a=t.length-1;a>=0;a--)(i=t[a])&&(o=(s<3?i(o):s>3?i(e,n,o):i(e,n))||o)
s>3&&o&&Object.defineProperty(e,n,o)})([F],Ws.prototype,"status",void 0)
function Ks(t){return"tei"===t?"http://www.tei-c.org/ns/1.0":"xml"===t?"http://www.w3.org/XML/1998/namespace":"http://www.tei-c.org/ns/1.0"}class Gs{constructor(t){this.dom=t}evaluate(t,e,n){return this.dom.evaluate(e,t,Ks,n,null)}firstNode(t,e){return this.evaluate(t,e,XPathResult.FIRST_ORDERED_NODE_TYPE).singleNodeValue}nodeIterator(t,e){return this.evaluate(t,e,XPathResult.ORDERED_NODE_ITERATOR_TYPE)}stringValue(t,e){return this.evaluate(t,e,XPathResult.STRING_TYPE).stringValue}booleanValue(t,e){return this.evaluate(t,e,XPathResult.BOOLEAN_TYPE).booleanValue}numberValue(t,e){return this.evaluate(t,e,XPathResult.NUMBER_TYPE).numberValue}}class Ys{constructor(t,e){let n=new DOMParser
this.dom=n.parseFromString(t,"application/xml"),this.xpath=new Gs(this.dom),this.sections=e,this.parsed={}}get(t){return void 0===this.parsed[t]&&("single-text"===this.sections[t].type?this.parsed[t]=this.parseSingleText(this.sections[t]):"header"===this.sections[t].type?this.parsed[t]=this.parseHeader(this.sections[t]):"multi-text"===this.sections[t].type&&(this.parsed[t]=this.parseMultiText(this.sections[t]))),this.parsed[t]}parseSingleText(t){let e=this.xpath.firstNode(this.dom.documentElement,t.parser.selector)
return e?this.parseContentNode(e,t):null}parseContentAttributes(t,e){let n={}
return Object.entries(e).forEach(e=>{let r=e[0],i=e[1],s=[]
i.parser?s.push(i.parser):i.parsers&&(s=i.parsers)
for(let a=0;a<s.length;a++){let e=s[a]
if("boolean"===e.type)n[r]=this.xpath.booleanValue(t,e.selector)
else if("number"===e.type)try{n[r]=this.xpath.numberValue(t,e.selector)}catch(o){console.log(o)}else if("static"===e.type)this.xpath.booleanValue(t,e.selector)&&(n[r]=e.value)
else try{let i=this.xpath.stringValue(t,e.selector)
i&&""!==i&&(n[r]=i)}catch(o){console.log(o)}}}),n}parseContentMarks(t,e){let n=[]
return Object.entries(e).forEach(e=>{let r=e[0],i=e[1],s=[]
i.parser?s.push(i.parser):i.parsers&&(s=i.parsers)
for(let o=0;o<s.length;o++)if(this.xpath.booleanValue(t,s[o].selector)){let e={type:r}
i.attrs&&(e.attrs=this.parseContentAttributes(t,i.attrs)),n.push(e)}}),n}parseContentNode(t,e){let n=Object.entries(e.schema.nodes)
for(let r=0;r<n.length;r++){let i=n[r][0],s=n[r][1],o=[]
s.parser?o.push(s.parser):s.parsers&&(o=o.concat(s.parsers))
for(let n=0;n<o.length;n++){let r=o[n]
if(null!==this.xpath.firstNode(t,"self::"+r.selector)){let n={type:i}
if(s.attrs&&(n.attrs=this.parseContentAttributes(t,s.attrs)),s.inline)if("text"===i){if(n.text=this.xpath.stringValue(t,r.text),n.marks=this.parseContentMarks(t,e.schema.marks),1===t.children.length){let r=this.parseContentNode(t.children[0],e)
r.text&&""!==r.text&&(n.text=r.text),n.marks=n.marks.concat(r.marks)}}else if(0===t.children.length)n.content=[{type:"text",text:this.xpath.stringValue(t,r.text),marks:this.parseContentMarks(t,e.schema.marks)}]
else{let r=[]
for(let n=0;n<t.children.length;n++){let i=this.parseContentNode(t.children[n],e)
i&&r.push(i)}n.content=r}else{let r=[]
for(let n=0;n<t.children.length;n++){let i=this.parseContentNode(t.children[n],e)
i&&r.push(i)}n.content=r}return n}}}}parseHeaderNode(t,e){let n=this.xpath.nodeIterator(t,e.tag),r=[],i=n.iterateNext()
for(;i;){let t={_attrs:{},_text:0===i.children.length?this.xpath.stringValue(i,"text()"):null}
for(let e=0;e<i.attributes.length;e++)t._attrs[i.attributes[e].name]=i.attributes[e].value
if(e.children)for(let n=0;n<e.children.length;n++){let r=this.parseHeaderNode(i,e.children[n])
r&&(t[e.children[n].tag.substring(4)]=r)}r.push(t),i=n.iterateNext()}return 0===r.length?null:e.multiple?r:r[0]}parseHeader(t){let e=this.xpath.firstNode(this.dom.documentElement,t.tag),n={}
for(let r=0;r<t.schema.length;r++){let i=this.parseHeaderNode(e,t.schema[r])
i&&(n[t.schema[r].tag.substring(4)]=i)}return n}parseMultiText(t){let e=this.xpath.firstNode(this.dom.documentElement,t.parser.selector)
if(e){let n=[],r=this.xpath.nodeIterator(e,t.parts.parser.selector),i=r.iterateNext()
for(;i;){let e=this.parseContentNode(i,t)
e&&n.push({id:i.getAttribute("xml:id"),text:e}),i=r.iterateNext()}return n}return[]}}class Xs{serialize(t,e){let n={node:"tei:TEI",attrs:{"xmlns:tei":["http://www.tei-c.org/ns/1.0"]},children:[]},r=Object.keys(e)
for(let s=0;s<r.length;s++){let i=r[s]
"single-text"===e[i].type?this.mergeTrees(n,this.serializeSingleText(t[i],e[i])):"header"===e[i].type?this.mergeTrees(n,this.serializeHeader(t[i],e[i])):"multi-text"===e[i].type&&this.mergeTrees(n,this.serializeMultiText(t[i],e[i]))}let i=this.toString(n,"")
return i.splice(0,0,'<?xml version="1.0" encoding="UTF-8"?>'),i.push(""),i.join("\n")}mergeTrees(t,e){if(t&&e)for(let n=0;n<e.children.length;n++){let r=!1
for(let i=0;i<t.children.length;i++)t.children[i].node===e.children[n].node&&this.objectsMatch(t.children[i].attrs,e.children[n].attrs)&&(this.mergeTrees(t.children[i],e.children[n]),r=!0)
r||t.children.push(e.children[n])}}objectsMatch(t,e){if(t&&e){if(typeof t!=typeof e)return!1
if("string"==typeof t||"number"==typeof t||"boolean"==typeof t)return t===e
let n=Object.keys(t),r=Object.keys(e)
return n.forEach(n=>!(r.indexOf(n)<0)&&(!!this.objectsMatch(t[n],e[n])&&void r.splice(r.indexOf(n),1))),!(r.length>0)}return!t&&!e}serializeSingleText(t,e){return t?{node:"tei:TEI",children:[{node:e.serializer.tag,children:[this.serializeTextNode(t,e)]}]}:null}serializeTextNode(t,e){let n={node:e.schema.nodes[t.type].serializer.tag,attrs:{},children:[],text:null}
if(e.schema.nodes[t.type].serializer.attrs&&Object.entries(e.schema.nodes[t.type].serializer.attrs).forEach(t=>{n.attrs[t[0]]=[t[1]]}),t.attrs&&Object.entries(t.attrs).forEach(r=>{let i=e.schema.nodes[t.type].attrs[r[0]].serializer,s=void 0
i.values?i.values[r[1]]&&(s=i.values[r[1]]):s=i.value?i.value.replace("${value}",r[1]):r[1],void 0!==s&&(n.attrs[i.attr]?n.attrs[i.attr].push(s):n.attrs[i.attr]=[s])}),e.schema.nodes[t.type].inline){if(t.content)if(t.content.length>1||t.content[0].marks&&t.content[0].marks.length>0)t.content.forEach(t=>{n.children.push(this.serializeTextNode(t,e))})
else{let r=this.serializeTextNode(t.content[0],e)
e.schema.nodes[t.type].serializer.text?n.attrs[e.schema.nodes[t.type].serializer.text.attr]?n.attrs[e.schema.nodes[t.type].serializer.text.attr].push(r.text):n.attrs[e.schema.nodes[t.type].serializer.text.attr]=[r.text]:n.text=r.text}else t.text&&(e.schema.nodes[t.type].serializer.text?n.attrs[e.schema.nodes[t.type].serializer.text.attr]?n.attrs[e.schema.nodes[t.type].serializer.text.attr].push(t.text):n.attrs[e.schema.nodes[t.type].serializer.text.attr]=[t.text]:n.text=t.text)
if(t.marks){let r=t.marks.map(t=>{let r={node:n.node,attrs:{}},i=e.schema.marks[t.type].serializer
return i.tag&&(r.node=i.tag),i.attrs&&Object.entries(i.attrs).forEach(t=>{t[1].value&&(r.attrs[t[0]]?r.attrs[t[0]].push(t[1].value):r.attrs[t[0]]=[t[1].value])}),t.attrs&&Object.entries(t.attrs).forEach(n=>{let i=void 0
e.schema.marks[t.type].attrs[n[0]].serializer.value?i=e.schema.marks[t.type].attrs[n[0]].serializer.value.replace("${value}",n[1]):e.schema.marks[t.type].attrs[n[0]].serializer.values&&e.schema.marks[t.type].attrs[n[0]].serializer.values[n[1]]&&(i=e.schema.marks[t.type].attrs[n[0]].serializer.values[n[1]]),void 0!==i&&(r.attrs[e.schema.marks[t.type].attrs[n[0]].serializer.attr]?r.attrs[e.schema.marks[t.type].attrs[n[0]].serializer.attr].push(i):r.attrs[e.schema.marks[t.type].attrs[n[0]].serializer.attr]=[i])}),r})
if(new Set(r.map(t=>t.node)).size>1){r.sort((t,e)=>t.node<e.node?-1:t.node>e.node?1:t.node===e.node?0:void 0)
let t=n
t.node=null,r.forEach(e=>{if(null===t.node||t.node===e.node)t.node=e.node,Object.entries(e.attrs).forEach(e=>{t.attrs[e[0]]?t.attrs[e[0]]=t.attrs[e[0]].concat(e[1]):t.attrs[e[0]]=e[1]})
else{let n={node:e.node,attrs:e.attrs,children:[],text:t.text}
t.text=null,t.children.push(n),t=n}})}else r.forEach(t=>{t.node&&(n.node=t.node),t.attrs&&Object.entries(t.attrs).forEach(t=>{n.attrs[t[0]]?n.attrs[t[0]]=n.attrs[t[0]].concat(t[1]):n.attrs[t[0]]=t[1]})})}}else t.content&&t.content.forEach(t=>{n.children.push(this.serializeTextNode(t,e))})
return n}serializeHeader(t,e){return{node:"tei:TEI",children:[{node:e.tag,children:e.schema.map(e=>this.serializeMetadataNode(t[e.tag.substring(4)],e))}]}}serializeMetadataNode(t,e){if(e.multiple)return t.map(t=>{let n={node:e.tag}
if(t._text&&(n.text=t._text),t._attrs&&(n.attrs={},Object.entries(t._attrs).forEach(t=>{n.attrs[t[0]]=[t[1]]})),e.children){n.children=[]
for(let r=0;r<e.children.length;r++)if(t[e.children[r].tag.substring(4)]){let i=this.serializeMetadataNode(t[e.children[r].tag.substring(4)],e.children[r])
Array.isArray(i)?n.children=n.children.concat(i):n.children.push(i)}}return n})
{let n={node:e.tag}
if(t._text&&(n.text=t._text),t._attrs&&(n.attrs={},Object.entries(t._attrs).forEach(t=>{n.attrs[t[0]]=[t[1]]})),e.children){n.children=[]
for(let r=0;r<e.children.length;r++)if(t[e.children[r].tag.substring(4)]){let i=this.serializeMetadataNode(t[e.children[r].tag.substring(4)],e.children[r])
Array.isArray(i)?n.children=n.children.concat(i):n.children.push(i)}}return n}}serializeMultiText(t,e){let n={node:e.parts.serializer.tag,children:t.map(t=>this.serializeTextNode(t.text,e))}
return e.parts.serializer.attrs&&(n.attrs={},Object.entries(e.parts.serializer.attrs).forEach(t=>{n.attrs[t[0]]=[t[1]]})),{node:"tei:TEI",children:[{node:e.serializer.tag,children:[n]}]}}toString(t,e){function n(t){return t.replace("&","&amp;").replace("<","&lt;").replace(">","&gt;")}let r=[],i=[e,"<",t.node]
return t.attrs&&Object.entries(t.attrs).forEach(t=>{t[1].length>0&&(t[1].sort(),i.push(" "+t[0]+'="'+n(t[1].join(" "))+'"'))}),t.children&&t.children.length>0?(i.push(">"),r.push(i.join("")),t.children.forEach(t=>{r=r.concat(this.toString(t,e+"  "))}),r.push(e+"</"+t.node+">")):(t.text?(i.push(">"),i.push(n(t.text)),i.push("</"+t.node+">")):i.push("/>"),r.push(i.join(""))),r}}var Qs=function(t,e,n,r){var i,s=arguments.length,o=s<3?e:null===r?r=Object.getOwnPropertyDescriptor(e,n):r
if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(t,e,n,r)
else for(var a=t.length-1;a>=0;a--)(i=t[a])&&(o=(s<3?i(o):s>3?i(e,n,o):i(e,n))||o)
return s>3&&o&&Object.defineProperty(e,n,o),o}
class Zs extends G{constructor(t){super(t),this.loaded=!1,this.sections=null,this.data=null,this.currentView="",this.sections=Yi([window.teiEditorConfig.sections]),this.currentView=Object.keys(this.sections)[0]}didInsertElement(){if(window.teiEditorConfig.actions&&window.teiEditorConfig.actions.initLoad){let t=this
window.teiEditorConfig.actions.initLoad().then(function(e){let n=new Ys(e,window.teiEditorConfig.sections)
e={},Object.keys(window.teiEditorConfig.sections).forEach(t=>{e[t]=n.get(t)}),t.data=e,t.loaded=!0})}}get mainUIConfig(){return window.teiEditorConfig.ui.main}get multiTexts(){let t={}
return this.sections&&this.data&&Object.entries(this.sections).forEach(e=>{"multi-text"===e[1].type&&this.data&&this.data[e[0]]&&(t[e[0]]=this.data[e[0]])}),t}loadFile(t){t.preventDefault()
let e=this
if(window.teiEditorConfig.actions&&window.teiEditorConfig.actions.load)window.teiEditorConfig.actions.load().then(function(t){let n=new Ys(t,window.teiEditorConfig.parser)
e.mainText=n.body,e.displayedMainText=n.body,e.metadata=n.metadata,e.globalAnnotationText=n.globalAnnotationText,e.displayedGlobalAnnotationText=n.globalAnnotationText,e.individualAnnotations=n.individualAnnotations,e.loaded=!0})
else{let t=document.createElement("input")
t.setAttribute("type","file"),t.setAttribute("class","hidden"),document.querySelector("body").appendChild(t),t.click(),t.addEventListener("change",function(n){let r=n.target.files
if(r.length>0){let t=new FileReader
t.onload=(t=>{let n=new Ys(t.target.result,window.teiEditorConfig.parser)
e.mainText=n.body,e.displayedMainText=n.body,e.metadata=n.metadata,e.globalAnnotationText=n.globalAnnotationText,e.displayedGlobalAnnotationText=n.globalAnnotationText,e.individualAnnotations=n.individualAnnotations,e.loaded=!0}),t.readAsText(r[0])}t.remove()})}}saveFile(t){t.preventDefault()
let e=(new Xs).serialize(this.data,this.sections)
if(window.teiEditorConfig.actions&&window.teiEditorConfig.actions.save)window.teiEditorConfig.actions.save(e)
else{let t=new Blob([e],{type:"text/xml;charset=utf-8"}),n=document.createElement("a")
n.setAttribute("href",URL.createObjectURL(t)),n.setAttribute("download","download.tei"),document.body.appendChild(n),n.click(),document.body.removeChild(n)}}setView(t,e){e.preventDefault(),this.currentView=t}updateData(t,e){let n=Yi([this.data])
n[t]=e,this.data=n}}Qs([F],Zs.prototype,"loaded",void 0),Qs([F],Zs.prototype,"sections",void 0),Qs([F],Zs.prototype,"data",void 0),Qs([F],Zs.prototype,"currentView",void 0),Qs([F],Zs.prototype,"multiTexts",null)
var to={"component:/tei-editor/components/AriaDropdownMenu":Ki,"template:/tei-editor/components/AriaDropdownMenu":{id:"jlrELQXU",block:'{"symbols":["@title","&default"],"statements":[[6,"li"],[10,"role","presentation"],[10,"class","dropdown"],[11,"onmouseover",[26,"action",[[22,["mouseOver"]]],null],null],[11,"onmouseout",[26,"action",[[22,["mouseOut"]]],null],null],[8],[0,"\\n  "],[6,"a"],[10,"role","menuitem"],[10,"aria-haspopup","true"],[10,"tabindex","-1"],[11,"aria-expanded",[20,"expanded"],null],[11,"onclick",[26,"action",[[22,["click"]]],null],null],[11,"onkeydown",[26,"action",[[22,["keyDown"]]],null],null],[8],[1,[21,1,[]],false],[9],[0,"\\n  "],[6,"ul"],[10,"role","menu"],[10,"class","vertical"],[11,"onkeydown",[26,"action",[[22,["keyDown"]]],null],null],[8],[0,"\\n    "],[13,2],[0,"\\n  "],[9],[0,"\\n"],[9],[0,"\\n"]],"hasEval":false}',meta:{specifier:"template:/tei-editor/components/AriaDropdownMenu"}},"component:/tei-editor/components/AriaMenu":class extends G{keyDown(t){if(39===t.keyCode){let e=t.target.parentElement.nextElementSibling
for(;e&&("separator"===e.getAttribute("role")||"true"===e.querySelector('*[role="menuitem"]').getAttribute("aria-disabled"));)e=e.nextElementSibling
e&&e.querySelector('*[role="menuitem"]').focus()}else if(37===t.keyCode){let e=t.target.parentElement.previousElementSibling
for(;e&&("separator"===e.getAttribute("role")||"true"===e.querySelector('*[role="menuitem"]').getAttribute("aria-disabled"));)e=e.previousElementSibling
e&&e.querySelector('*[role="menuitem"]').focus()}}},"template:/tei-editor/components/AriaMenu":{id:"IoCg9v0u",block:'{"symbols":["@class","@label","&default"],"statements":[[6,"nav"],[10,"role","menubar"],[11,"class",[21,1,[]],null],[11,"arial-label",[21,2,[]],null],[8],[0,"\\n  "],[6,"ul"],[10,"role","menu"],[11,"onkeydown",[26,"action",[[22,["keyDown"]]],null],null],[8],[0,"\\n    "],[13,3],[0,"\\n  "],[9],[0,"\\n"],[9],[0,"\\n"]],"hasEval":false}',meta:{specifier:"template:/tei-editor/components/AriaMenu"}},"component:/tei-editor/components/AriaMenuAction":Gi,"template:/tei-editor/components/AriaMenuAction":{id:"E5+xlPLz",block:'{"symbols":["@action","@label","@current","@hidden","&default","@disabled"],"statements":[[6,"li"],[10,"role","presentation"],[8],[4,"if",[[21,6,[]]],null,{"statements":[[6,"a"],[10,"role","menuitem"],[11,"onclick",[26,"action",[[22,["noAction"]]],null],null],[11,"tabindex",[20,"tabindex"],null],[11,"title",[21,2,[]],null],[11,"aria-label",[21,2,[]],null],[10,"aria-disabled","true"],[11,"aria-current",[21,3,[]],null],[11,"aria-hidden",[21,4,[]],null],[8],[13,5],[9]],"parameters":[]},{"statements":[[6,"a"],[10,"role","menuitem"],[11,"onclick",[21,1,[]],null],[11,"tabindex",[20,"tabindex"],null],[11,"title",[21,2,[]],null],[11,"aria-label",[21,2,[]],null],[10,"aria-disabled","false"],[11,"aria-current",[21,3,[]],null],[11,"aria-hidden",[21,4,[]],null],[8],[13,5],[9]],"parameters":[]}],[9],[0,"\\n"]],"hasEval":false}',meta:{specifier:"template:/tei-editor/components/AriaMenuAction"}},"component:/tei-editor/components/MetadataEditor":class extends G{setMetadataField(t,e){e.preventDefault()
let n=Yi([this.args.metadata])
n=Qi([n,t,e.target.value]),this.args.update(n)}addMultiFieldRow(t,e,n){n.preventDefault()
let r=Yi([this.args.metadata]),i=Xi([r,t]),s=[]
e.forEach(t=>{let e={}
e=Qi([e,t.path,""]),s.push(e)}),i.push(s),this.args.update(r)}removeMultiFieldRow(t,e,n){n.preventDefault()
let r=Yi([this.args.metadata])
Xi([r,t]).splice(e,1),this.args.update(r)}moveMultiFieldRowUp(t,e,n){n.preventDefault()
let r=Yi([this.args.metadata]),i=Xi([r,t]),s=i[e]
i.splice(e,1),i.splice(e-1,0,s),this.args.update(r)}moveMultiFieldRowDown(t,e,n){n.preventDefault()
let r=Yi([this.args.metadata]),i=Xi([r,t]),s=i[e]
i.splice(e,1),i.splice(e+1,0,s),this.args.update(r)}},"template:/tei-editor/components/MetadataEditor":{id:"0OMKJLJ6",block:'{"symbols":["section","entry","value","value_idx","part_entry","part_idx","@metadata","@config"],"statements":[[6,"dl"],[8],[0,"\\n"],[4,"each",[[21,8,[]]],[["key"],["@index"]],{"statements":[[0,"    "],[6,"dt"],[8],[1,[21,1,["title"]],false],[9],[0,"\\n    "],[6,"dd"],[8],[0,"\\n      "],[6,"ul"],[8],[0,"\\n"],[4,"each",[[21,1,["entries"]]],[["key"],["@index"]],{"statements":[[4,"if",[[26,"eq",[[21,2,["type"]],"single-text"],null]],null,{"statements":[[0,"            "],[6,"li"],[10,"class","tei-editor-metadata-single"],[8],[6,"label"],[8],[1,[21,2,["label"]],false],[6,"input"],[10,"type","text"],[11,"value",[26,"get",[[21,7,[]],[21,2,["path"]]],null],null],[11,"onchange",[26,"action",[[22,["setMetadataField"]],[21,2,["path"]]],null],null],[8],[9],[9],[9],[0,"\\n"]],"parameters":[]},null],[4,"if",[[26,"eq",[[21,2,["type"]],"multi-field"],null]],null,{"statements":[[0,"            "],[6,"li"],[10,"class","tei-editor-metadata-multiple"],[8],[0,"\\n"],[4,"each",[[26,"get",[[21,7,[]],[21,2,["path"]]],null]],[["key"],["@index"]],{"statements":[[0,"              "],[6,"div"],[8],[0,"\\n"],[4,"each",[[21,2,["entries"]]],[["key"],["@index"]],{"statements":[[0,"                  "],[6,"div"],[8],[6,"label"],[8],[1,[21,5,["label"]],false],[6,"input"],[10,"type","text"],[11,"value",[26,"get",[[21,3,[]],[21,5,["path"]]],null],null],[11,"onchange",[26,"action",[[22,["setMetadataField"]],[26,"join",[".",[21,2,["path"]],[21,4,[]],[21,5,["path"]]],null]],null],null],[8],[9],[9],[9],[0,"\\n"]],"parameters":[5,6]},null],[0,"                "],[6,"nav"],[8],[0,"\\n                  "],[5,"AriaMenu",[],[[],[]],{"statements":[[0,"\\n                    "],[5,"AriaMenuAction",[],[["@tabindex","@label","@action"],["0","Delete this row",[26,"action",[[22,["removeMultiFieldRow"]],[21,2,["path"]],[21,4,[]]],null]]],{"statements":[[0,"Delete"]],"parameters":[]}],[0,"\\n                    "],[5,"AriaMenuAction",[],[["@tabindex","@label","@disabled","@action"],["-1","Move this row up one",[26,"array-first",[[26,"get",[[21,7,[]],[21,2,["path"]]],null],[21,4,[]]],null],[26,"action",[[22,["moveMultiFieldRowUp"]],[21,2,["path"]],[21,4,[]]],null]]],{"statements":[[0,"Up"]],"parameters":[]}],[0,"\\n                    "],[5,"AriaMenuAction",[],[["@tabindex","@label","@disabled","@action"],["-1","Move this row one down",[26,"array-last",[[26,"get",[[21,7,[]],[21,2,["path"]]],null],[21,4,[]]],null],[26,"action",[[22,["moveMultiFieldRowDown"]],[21,2,["path"]],[21,4,[]]],null]]],{"statements":[[0,"Down"]],"parameters":[]}],[0,"\\n                  "]],"parameters":[]}],[0,"\\n                "],[9],[0,"\\n              "],[9],[0,"\\n"]],"parameters":[3,4]},null],[0,"              "],[5,"AriaMenu",[],[[],[]],{"statements":[[0,"\\n                "],[5,"AriaMenuAction",[],[["@tabindex","@label","@action"],["0","Add a new row",[26,"action",[[22,["addMultiFieldRow"]],[21,2,["path"]],[21,2,["entries"]]],null]]],{"statements":[[0,"Add"]],"parameters":[]}],[0,"\\n              "]],"parameters":[]}],[0,"\\n            "],[9],[0,"\\n"]],"parameters":[]},null]],"parameters":[2]},null],[0,"      "],[9],[0,"\\n    "],[9],[0,"\\n"]],"parameters":[1]},null],[9],[0,"\\n"]],"hasEval":false}',meta:{specifier:"template:/tei-editor/components/MetadataEditor"}},"component:/tei-editor/components/MultiText":ts,"template:/tei-editor/components/MultiText":{id:"8ruI8+Tc",block:'{"symbols":["text","idx","@schema","@ui","@multiTexts","@texts"],"statements":[[6,"nav"],[10,"class","tei-editor-menubar"],[8],[0,"\\n  "],[5,"AriaMenu",[],[["@label"],["Individual Annotation"]],{"statements":[[0,"\\n    "],[6,"li"],[10,"role","presentation"],[8],[0,"\\n      "],[6,"select"],[10,"role","menuitem"],[10,"tabindex","0"],[10,"aria-label","Select the text to edit"],[11,"onchange",[26,"action",[[22,["selectText"]]],null],null],[8],[0,"\\n"],[4,"each",[[21,6,[]]],[["key"],["@index"]],{"statements":[[4,"if",[[26,"eq",[[21,2,[]],[22,["selectedIdx"]]],null]],null,{"statements":[[0,"            "],[6,"option"],[11,"value",[21,2,[]],null],[10,"selected","selected"],[8],[1,[21,1,["id"]],false],[9],[0,"\\n"]],"parameters":[]},{"statements":[[0,"            "],[6,"option"],[11,"value",[21,2,[]],null],[8],[1,[21,1,["id"]],false],[9],[0,"\\n"]],"parameters":[]}]],"parameters":[1,2]},null],[0,"      "],[9],[0,"\\n    "],[9],[0,"\\n    "],[5,"AriaMenuAction",[],[["@label","@tabindex","@disabled","@action"],["Delete this text","-1",[26,"eq",[[26,"get",[[22,["texts"]],"length"],null],0],null],[26,"action",[[22,["deleteText"]]],null]]],{"statements":[[0,"Delete"]],"parameters":[]}],[0,"\\n    "],[5,"AriaMenuAction",[],[["@label","@tabindex","@action"],["Add a text","-1",[26,"action",[[22,["addText"]]],null]]],{"statements":[[0,"Add"]],"parameters":[]}],[0,"\\n  "]],"parameters":[]}],[0,"\\n"],[9],[0,"\\n"],[6,"div"],[8],[0,"\\n"],[4,"if",[[22,["text"]]],null,{"statements":[[0,"    "],[5,"ProsemirrorEditor",[],[["@schema","@ui","@text","@multiTexts","@update"],[[21,3,[]],[21,4,[]],[20,"text"],[21,5,[]],[26,"action",[[22,["updateText"]]],null]]],{"statements":[],"parameters":[]}],[0,"\\n"]],"parameters":[]},null],[9],[0,"\\n"]],"hasEval":false}',meta:{specifier:"template:/tei-editor/components/MultiText"}},"component:/tei-editor/components/ProsemirrorEditor":Ws,"component:/tei-editor/components/ProsemirrorEditor/set-doc-attr":Us,"template:/tei-editor/components/ProsemirrorEditor":{id:"OykVrrdG",block:'{"symbols":["section","entry","value","value","value","entry","@multiTexts","@ui"],"statements":[[0,"  "],[6,"div"],[10,"class","tei-editor-prosemirror-editor"],[8],[0,"\\n    "],[6,"div"],[11,"id",[20,"prosemirrorId"],null],[8],[9],[0,"\\n  "],[9],[0,"\\n  "],[6,"div"],[10,"class","tei-editor-prosemirror-sidebar"],[8],[0,"\\n    "],[6,"dl"],[8],[0,"\\n"],[4,"each",[[21,8,[]]],[["key"],["@index"]],{"statements":[[4,"if",[[26,"status-display-entry",[[22,["status"]],[21,1,["context"]]],null]],null,{"statements":[[0,"          "],[6,"dt"],[8],[1,[21,1,["title"]],false],[9],[0,"\\n          "],[6,"dd"],[8],[0,"\\n"],[4,"if",[[26,"eq",[[21,1,["type"]],"block-type"],null]],null,{"statements":[[0,"              "],[5,"AriaMenu",[],[["@label"],[[21,1,["title"]]]],{"statements":[[0,"\\n"],[4,"each",[[21,1,["blocks"]]],[["key"],["@index"]],{"statements":[[0,"                  "],[5,"AriaMenuAction",[],[["@tabindex","@label","@current","@action"],[[26,"aria-menu-item-tabindex",[[22,["index"]]],null],[21,6,["label"]],[26,"boolean-str",[[26,"get",[[22,["status","blocks"]],[21,6,["type"]]],null]],null],[26,"action",[[22,["menuAction"]],"setBlockType",[21,6,[]],[21,6,["type"]]],null]]],{"statements":[[1,[21,6,["label"]],false]],"parameters":[]}],[0,"\\n"]],"parameters":[6]},null],[0,"              "]],"parameters":[]}],[0,"\\n"]],"parameters":[]},null],[4,"if",[[26,"eq",[[21,1,["type"]],"toolbar"],null]],null,{"statements":[[0,"              "],[5,"AriaMenu",[],[["@label"],[[21,1,["title"]]]],{"statements":[[0,"\\n"],[4,"each",[[21,1,["entries"]]],[["key"],["@index"]],{"statements":[[4,"if",[[26,"eq",[[21,2,["type"]],"separator"],null]],null,{"statements":[[0,"                    "],[6,"li"],[10,"role","separator"],[8],[9],[0,"\\n"]],"parameters":[]},null],[4,"if",[[26,"eq",[[21,2,["type"]],"select-attr"],null]],null,{"statements":[[0,"                    "],[6,"li"],[10,"class","input"],[10,"role","presentation"],[8],[0,"\\n                      "],[6,"select"],[10,"role","menuitem"],[11,"tabindex",[26,"aria-menu-item-tabindex",[[22,["index"]]],null],null],[11,"onchange",[26,"action",[[22,["menuAction"]],"setBlockAttribute",[21,2,["attr"]],"ev.target.value"],null],null],[8],[0,"\\n"],[4,"each",[[21,2,["values"]]],[["key"],["@index"]],{"statements":[[0,"                          "],[6,"option"],[11,"value",[21,5,["key"]],null],[11,"selected",[26,"eq",[[26,"get",[[26,"get",[[26,"get",[[22,["status"]],[21,1,["context"]]],null],"attrs"],null],[21,2,["attr"]]],null],[21,5,["key"]]],null],null],[8],[1,[21,5,["value"]],false],[9],[0,"\\n"]],"parameters":[5]},null],[4,"each",[[26,"get",[[21,7,[]],[21,2,["valueSource"]]],null]],[["key"],["@index"]],{"statements":[[0,"                          "],[6,"option"],[11,"value",[21,4,["id"]],null],[11,"selected",[26,"eq",[[26,"get",[[26,"get",[[26,"get",[[22,["status"]],[21,1,["context"]]],null],"attrs"],null],[21,2,["attr"]]],null],[21,4,["id"]]],null],null],[8],[1,[21,4,["id"]],false],[9],[0,"\\n"]],"parameters":[4]},null],[0,"                      "],[9],[0,"\\n                    "],[9],[0,"\\n"]],"parameters":[]},null],[4,"if",[[26,"eq",[[21,2,["type"]],"set-attr"],null]],null,{"statements":[[0,"                    "],[5,"AriaMenuAction",[],[["@tabindex","@label","@current","@action"],[[26,"aria-menu-item-tabindex",[[22,["index"]]],null],[21,2,["label"]],[26,"boolean-str",[[26,"eq",[[26,"get",[[26,"get",[[26,"get",[[22,["status"]],[21,1,["context"]]],null],"attrs"],null],[21,2,["attr"]]],null],[21,2,["value"]]],null]],null],[26,"action",[[22,["menuAction"]],"setBlockAttribute",[21,2,["attr"]],[21,2,["value"]]],null]]],{"statements":[[0,"\\n"],[4,"if",[[21,2,["icon"]]],null,{"statements":[[4,"if",[[26,"and",[[21,2,["icon","on"]],[21,2,["icon","off"]]],null]],null,{"statements":[[4,"if",[[26,"eq",[[26,"get",[[26,"get",[[26,"get",[[22,["status"]],[21,1,["context"]]],null],"attrs"],null],[21,2,["attr"]]],null],[21,2,["value"]]],null]],null,{"statements":[[0,"                            "],[1,[21,2,["icon","on"]],true],[0,"\\n"]],"parameters":[]},{"statements":[[0,"                            "],[1,[21,2,["icon","off"]],true],[0,"\\n"]],"parameters":[]}]],"parameters":[]},{"statements":[[0,"                          "],[1,[21,2,["icon"]],true],[0,"\\n"]],"parameters":[]}]],"parameters":[]},{"statements":[[0,"                        "],[1,[21,2,["label"]],false],[0,"\\n"]],"parameters":[]}],[0,"                    "]],"parameters":[]}],[0,"\\n"]],"parameters":[]},null],[4,"if",[[26,"eq",[[21,2,["type"]],"toggle-attr"],null]],null,{"statements":[[0,"                    "],[5,"AriaMenuAction",[],[["@tabindex","@label","@current","@action"],[[26,"aria-menu-item-tabindex",[[22,["index"]]],null],[21,2,["label"]],[26,"boolean-str",[[26,"get",[[26,"get",[[26,"get",[[22,["status"]],[21,1,["context"]]],null],"attrs"],null],[21,2,["attr"]]],null]],null],[26,"action",[[22,["menuAction"]],"toggleBlockAttribute",[21,2,["attr"]]],null]]],{"statements":[[0,"\\n"],[4,"if",[[21,2,["icon"]]],null,{"statements":[[4,"if",[[26,"and",[[21,2,["icon","on"]],[21,2,["icon","off"]]],null]],null,{"statements":[[4,"if",[[26,"get",[[26,"get",[[26,"get",[[22,["status"]],[21,1,["context"]]],null],"attrs"],null],[21,2,["attr"]]],null]],null,{"statements":[[0,"                            "],[1,[21,2,["icon","on"]],true],[0,"\\n"]],"parameters":[]},{"statements":[[0,"                            "],[1,[21,2,["icon","off"]],true],[0,"\\n"]],"parameters":[]}]],"parameters":[]},{"statements":[[0,"                          "],[1,[21,2,["icon"]],true],[0,"\\n"]],"parameters":[]}]],"parameters":[]},{"statements":[[0,"                        "],[1,[21,2,["label"]],false],[0,"\\n"]],"parameters":[]}],[0,"                    "]],"parameters":[]}],[0,"\\n"]],"parameters":[]},null],[4,"if",[[26,"eq",[[21,2,["type"]],"toggle-mark"],null]],null,{"statements":[[0,"                    "],[5,"AriaMenuAction",[],[["@tabindex","@label","@current","@action"],[[26,"aria-menu-item-tabindex",[[22,["index"]]],null],[21,2,["label"]],[26,"boolean-str",[[26,"get",[[26,"get",[[22,["status"]],[21,1,["context"]]],null],[21,2,["mark"]]],null]],null],[26,"action",[[22,["menuAction"]],"toggleMark",[21,2,["mark"]]],null]]],{"statements":[[0,"\\n"],[4,"if",[[21,2,["icon"]]],null,{"statements":[[4,"if",[[26,"and",[[21,2,["icon","on"]],[21,2,["icon","off"]]],null]],null,{"statements":[[4,"if",[[26,"get",[[26,"get",[[26,"get",[[22,["status"]],[21,1,["context"]]],null],"attrs"],null],[21,2,["attr"]]],null]],null,{"statements":[[0,"                            "],[1,[21,2,["icon","on"]],true],[0,"\\n"]],"parameters":[]},{"statements":[[0,"                            "],[1,[21,2,["icon","off"]],true],[0,"\\n"]],"parameters":[]}]],"parameters":[]},{"statements":[[0,"                          "],[1,[21,2,["icon"]],true],[0,"\\n"]],"parameters":[]}]],"parameters":[]},{"statements":[[0,"                        "],[1,[21,2,["label"]],false],[0,"\\n"]],"parameters":[]}],[0,"                    "]],"parameters":[]}],[0,"\\n"]],"parameters":[]},null],[4,"if",[[26,"eq",[[21,2,["type"]],"text-attr"],null]],null,{"statements":[[0,"                    "],[6,"li"],[10,"class","input"],[10,"role","presentation"],[8],[0,"\\n                      "],[6,"input"],[11,"type",[21,2,["dataType"]],null],[11,"value",[26,"get",[[26,"get",[[26,"get",[[22,["status"]],[21,1,["context"]]],null],"attrs"],null],[21,2,["attr"]]],null],null],[11,"onchange",[26,"action",[[22,["menuAction"]],"setBlockAttribute",[21,2,["attr"]],"ev.target.value"],null],null],[8],[9],[0,"\\n                    "],[9],[0,"\\n"]],"parameters":[]},null],[4,"if",[[26,"eq",[[21,2,["type"]],"doc-text-attr"],null]],null,{"statements":[[0,"                    "],[6,"li"],[10,"class","input"],[10,"role","presentation"],[8],[0,"\\n                      "],[6,"input"],[11,"type",[21,2,["dataType"]],null],[11,"value",[26,"get",[[26,"get",[[26,"get",[[22,["status"]],[21,1,["context"]]],null],"attrs"],null],[21,2,["attr"]]],null],null],[11,"onchange",[26,"action",[[22,["menuAction"]],"setDocAttribute",[21,2,["attr"]],"ev.target.value"],null],null],[8],[9],[0,"\\n                    "],[9],[0,"\\n"]],"parameters":[]},null],[4,"if",[[26,"eq",[[21,2,["type"]],"select-mark-attr"],null]],null,{"statements":[[0,"                    "],[6,"li"],[10,"class","input"],[10,"role","presentation"],[8],[0,"\\n                      "],[6,"select"],[10,"role","menuitem"],[11,"tabindex",[26,"aria-menu-item-tabindex",[[22,["index"]]],null],null],[11,"onchange",[26,"action",[[22,["menuAction"]],"setMarkAttribute",[26,"join",[".",[21,2,["mark"]],[21,2,["attr"]]],null],"ev.target.value"],null],null],[8],[0,"\\n"],[4,"each",[[21,2,["values"]]],[["key"],["@index"]],{"statements":[[0,"                          "],[6,"option"],[11,"value",[21,3,["key"]],null],[11,"selected",[26,"eq",[[26,"get",[[26,"get",[[26,"get",[[26,"get",[[22,["status"]],"marks"],null],[21,2,["mark"]]],null],"attrs"],null],[21,2,["attr"]]],null],[21,3,["key"]]],null],null],[8],[1,[21,3,["label"]],false],[9],[0,"\\n"]],"parameters":[3]},null],[0,"                      "],[9],[0,"\\n                    "],[9],[0,"\\n"]],"parameters":[]},null]],"parameters":[2]},null],[0,"              "]],"parameters":[]}],[0,"\\n"]],"parameters":[]},null],[0,"          "],[9],[0,"\\n"]],"parameters":[]},null]],"parameters":[1]},null],[0,"    "],[9],[0,"\\n  "],[9],[0,"\\n"]],"hasEval":false}',meta:{specifier:"template:/tei-editor/components/ProsemirrorEditor"}},"component:/tei-editor/components/TeiEditor":Zs,"component:/tei-editor/components/TeiEditor/tei":null,"template:/tei-editor/components/TeiEditor":{id:"doP/P5p0",block:'{"symbols":["value","key","value","key"],"statements":[[6,"div"],[10,"class","tei-editor"],[8],[0,"\\n  "],[6,"div"],[8],[0,"\\n    "],[5,"AriaMenu",[],[["@class"],["tei-editor-menubar"]],{"statements":[[0,"\\n      "],[5,"AriaDropdownMenu",[],[["@title"],["File"]],{"statements":[[0,"\\n        "],[5,"AriaMenuAction",[],[["@action"],[[26,"action",[[22,["saveFile"]]],null]]],{"statements":[[0,"Save"]],"parameters":[]}],[0,"\\n      "]],"parameters":[]}],[0,"\\n"],[4,"each",[[22,["sections"]]],[["key"],["@index"]],{"statements":[[0,"        "],[5,"AriaMenuAction",[],[["@current","@hidden","@action"],[[26,"boolean-str",[[26,"eq",[[22,["currentView"]],[21,4,[]]],null]],null],[26,"boolean-str",[[26,"not",[[22,["loaded"]]],null]],null],[26,"action",[[22,["setView"]],[21,4,[]]],null]]],{"statements":[[1,[21,3,["title"]],false]],"parameters":[]}],[0,"\\n"]],"parameters":[3,4]},null],[0,"    "]],"parameters":[]}],[0,"\\n  "],[9],[0,"\\n  "],[6,"div"],[11,"aria-hidden",[26,"boolean-str",[[26,"not",[[22,["loaded"]]],null]],null],null],[8],[0,"\\n"],[4,"each",[[22,["sections"]]],[["key"],["@index"]],{"statements":[[0,"      "],[6,"div"],[11,"id",[27,[[21,2,[]]]]],[11,"class",[27,["tei-editor-view-",[26,"get",[[26,"get",[[22,["sections"]],[21,2,[]]],null],"type"],null]]]],[11,"aria-hidden",[26,"boolean-str",[[26,"not",[[26,"eq",[[22,["currentView"]],[21,2,[]]],null]],null]],null],null],[8],[0,"\\n"],[4,"if",[[26,"eq",[[26,"get",[[26,"get",[[22,["sections"]],[21,2,[]]],null],"type"],null],"header"],null]],null,{"statements":[[0,"          "],[5,"MetadataEditor",[],[["@config","@metadata","@update"],[[26,"get",[[26,"get",[[22,["sections"]],[21,2,[]]],null],"ui"],null],[26,"get",[[22,["data"]],[21,2,[]]],null],[26,"action",[[22,["updateData"]],[21,2,[]]],null]]],{"statements":[],"parameters":[]}],[0,"\\n"]],"parameters":[]},null],[4,"if",[[26,"eq",[[26,"get",[[26,"get",[[22,["sections"]],[21,2,[]]],null],"type"],null],"single-text"],null]],null,{"statements":[[0,"          "],[5,"ProsemirrorEditor",[],[["@schema","@ui","@multiTexts","@text","@update"],[[26,"get",[[26,"get",[[22,["sections"]],[21,2,[]]],null],"schema"],null],[26,"get",[[26,"get",[[22,["sections"]],[21,2,[]]],null],"ui"],null],[20,"multiTexts"],[26,"get",[[22,["data"]],[21,2,[]]],null],[26,"action",[[22,["updateData"]],[21,2,[]]],null]]],{"statements":[],"parameters":[]}],[0,"\\n"]],"parameters":[]},null],[4,"if",[[26,"eq",[[26,"get",[[26,"get",[[22,["sections"]],[21,2,[]]],null],"type"],null],"multi-text"],null]],null,{"statements":[[0,"          "],[5,"MultiText",[],[["@schema","@ui","@default","@texts","@multiTexts","@update"],[[26,"get",[[26,"get",[[22,["sections"]],[21,2,[]]],null],"schema"],null],[26,"get",[[26,"get",[[22,["sections"]],[21,2,[]]],null],"ui"],null],[26,"get",[[26,"get",[[22,["sections"]],[21,2,[]]],null],"default"],null],[26,"get",[[22,["data"]],[21,2,[]]],null],[20,"multiTexts"],[26,"action",[[22,["updateData"]],[21,2,[]]],null]]],{"statements":[],"parameters":[]}],[0,"\\n"]],"parameters":[]},null],[0,"      "],[9],[0,"\\n"]],"parameters":[1,2]},null],[0,"  "],[9],[0,"\\n"],[9],[0,"\\n"]],"hasEval":false}',meta:{specifier:"template:/tei-editor/components/TeiEditor"}},"helper:/tei-editor/components/and":function(t){for(let e=0;e<t.length;e++)if(!t[e])return!1
return!0},"helper:/tei-editor/components/aria-menu-item-tabindex":function(t){return 0===t[0]?0:-1},"helper:/tei-editor/components/array-first":function(t){return t[0].length>0&&0===t[1]},"helper:/tei-editor/components/array-last":function(t){return t[1]===t[0].length-1},"helper:/tei-editor/components/boolean-str":function(t){return t[0]?"true":"false"},"helper:/tei-editor/components/deepclone":Yi,"helper:/tei-editor/components/eq":function(t){return t[0]===t[1]},"helper:/tei-editor/components/get":Xi,"helper:/tei-editor/components/join":function(t){return t.slice(1).join(t[0])},"helper:/tei-editor/components/not":function(t){return!t[0]},"helper:/tei-editor/components/or":function(t){for(let e=0;e<t.length;e++)if(t[e])return!0
return!1},"helper:/tei-editor/components/set":Qi,"helper:/tei-editor/components/status-display-entry":function(t){let e=t[0],n=t[1]
if(e&&n){if("string"==typeof n)return Xi([e,n])
if(n.key&&n.value)return Xi([e,n.key])===n.value}else if(e&&!n)return!0
return!1}},eo={app:{name:"tei-editor",rootName:"tei-editor"},types:{application:{definitiveCollection:"main"},component:{definitiveCollection:"components"},"component-test":{unresolvable:!0},helper:{definitiveCollection:"components"},"helper-test":{unresolvable:!0},renderer:{definitiveCollection:"main"},template:{definitiveCollection:"components"}},collections:{main:{types:["application","renderer"]},components:{group:"ui",types:["component","component-test","template","helper","helper-test"],defaultType:"component",privateCollections:["utils"]},styles:{group:"ui",unresolvable:!0},utils:{unresolvable:!0}}}
const no=new class extends Hr{constructor(){let t=new Wi(to),e=new qi(eo,t)
const n=document.body
super({builder:new Li({element:n,nextSibling:null}),loader:new Vi(e),renderer:new ji,resolver:e,rootName:eo.app.rootName})}},ro=document.getElementById("app")
q=(()=>{no.scheduleRerender()}),no.registerInitializer({initialize(t){t.register(`component-manager:/${no.rootName}/component-managers/main`,se)}}),no.renderComponent("TeiEditor",ro,null),no.boot(),function(t,e){for(let n in e)ae(t,n,e[n])}(no,{"tei-editor":"TeiEditor"})})
