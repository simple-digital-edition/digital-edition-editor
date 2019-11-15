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
                        },
                        footnote: {
                            group: 'inline',
                            inline: true,
                            content: 'text*',
                            parser: {
                                selector: 'tei:note[@type="footnote"]',
                                text: 'text()'
                            },
                            serializer: {
                                tag: 'tei:note',
                            },
                            attrs: {
                                type: {
                                    default: 'footnote',
                                    serializer: {
                                        attr: 'type',
                                        value: 'footnote'
                                    }
                                },
                                marker: {
                                    default: '',
                                    parser: {
                                        selector: '@data-marker'
                                    },
                                    serializer: {
                                        attr: 'data-marker'
                                    }
                                }
                            }
                        },
                        foreignLanguage: {
                            group: 'inline',
                            inline: true,
                            content: 'text*',
                            parser: {
                                selector: 'tei:foreign',
                                text: 'text()'
                            },
                            serializer: {
                                tag: 'tei:foreign'
                            }
                        },
                    },
                    marks: {
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
                        ]
                    },
                    {
                        title: 'Auszeichnungen',
                        type: 'block-type',
                        blocks: [
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
                            },
                            {
                                type: 'footnote',
                                label: 'Fußnote'
                            },
                            {
                                type: 'foreignLanguage',
                                label: 'Fremdsprachiger Text'
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
                    {
                        title: 'Fußnotenmarkierung',
                        type: 'toolbar',
                        context: 'blocks.footnote',
                        entries: [
                            {
                                type: 'text-attr',
                                attr: 'marker',
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
                        foreignLanguage: {
                            group: 'inline',
                            inline: true,
                            content: 'text*',
                            parser: {
                                selector: 'tei:foreign',
                                text: 'text()'
                            },
                            serializer: {
                                tag: 'tei:foreign'
                            }
                        },
                        quotation: {
                            group: 'inline',
                            inline: true,
                            content: 'text*',
                            parser: {
                                selector: 'tei:q',
                                text: 'text()'
                            },
                            serializer: {
                                tag: 'tei:q'
                            }
                        },
                        lemma: {
                            group: 'inline',
                            inline: true,
                            content: 'text*',
                            parser: {
                                selector: 'tei:lem',
                                text: 'text()'
                            },
                            serializer: {
                                tag: 'tei:lem',
                            }
                        },
                        sic: {
                            group: 'inline',
                            inline: true,
                            content: 'text*',
                            parser: {
                                selector: 'tei:sic',
                                text: 'text()'
                            },
                            serializer: {
                                tag: 'tei:sic',
                            }
                        },
                        missing: {
                            group: 'inline',
                            inline: true,
                            content: 'text*',
                            parser: {
                                selector: 'tei:metamark[@function="missing"]',
                                text: 'text()'
                            },
                            serializer: {
                                tag: 'tei:metamark'
                            },
                            attrs: {
                                function: {
                                    default: 'missing',
                                    serializer: {
                                        attr: 'function',
                                        value: 'missing'
                                    }
                                },
                            },
                        },
                    },
                    marks: {
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
                        ]
                    },
                    {
                        title: 'Auszeichnungen',
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
                            },
                            {
                                type: 'foreignLanguage',
                                label: 'Fremdsprachiger Text'
                            },
                            {
                                type: 'quotation',
                                label: 'Zitat'
                            },
                            {
                                type: 'lemma',
                                label: 'Lemma'
                            },
                            {
                                type: 'sic',
                                label: 'Korrigierter Text'
                            },
                            {
                                type: 'missing',
                                label: 'Nicht ermittelt'
                            },
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
                        },
                        foreignLanguage: {
                            group: 'inline',
                            inline: true,
                            content: 'text*',
                            parser: {
                                selector: 'tei:foreign',
                                text: 'text()'
                            },
                            serializer: {
                                tag: 'tei:foreign'
                            }
                        },
                        quotation: {
                            group: 'inline',
                            inline: true,
                            content: 'text*',
                            parser: {
                                selector: 'tei:q',
                                text: 'text()'
                            },
                            serializer: {
                                tag: 'tei:q'
                            }
                        },
                        missing: {
                            group: 'inline',
                            inline: true,
                            content: 'text*',
                            parser: {
                                selector: 'tei:metamark[@function="missing"]',
                                text: 'text()'
                            },
                            serializer: {
                                tag: 'tei:metamark'
                            },
                            attrs: {
                                function: {
                                    default: 'missing',
                                    serializer: {
                                        attr: 'function',
                                        value: 'missing'
                                    }
                                },
                            },
                        },
                    },
                    marks: {
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
                        title: 'Auszeichnungen',
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
                            },
                            {
                                type: 'foreignLanguage',
                                label: 'Fremdsprachiger Text'
                            },
                            {
                                type: 'quotation',
                                label: 'Zitat'
                            },
                            {
                                type: 'missing',
                                label: 'Nicht ermittelt'
                            },
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
                                    type: 'pageLineRef',
                                    content: [
                                        {
                                            type: 'text',
                                            text: 'Seite & Zeile'
                                        }
                                    ],
                                },
                                {
                                    type: 'text',
                                    text: ' '
                                },
                                {
                                    type: 'wordRange',
                                    content: [
                                        {
                                            type: 'text',
                                            text: 'Textspanne'
                                        }
                                    ],
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
