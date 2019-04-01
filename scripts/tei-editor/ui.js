(function() {
    var fullTextUI = {
        sidebar: [
            {
                title: 'Block Type',
                test: 'block',
                entries: [
                    {
                        type: 'select',
                        value_key: 'block.type.name',
                        action: 'setBlockType',
                        values: [
                            {
                                key: 'paragraph',
                                value: 'Paragraph'
                            },
                            {
                                key: 'heading',
                                value: 'Heading'
                            }
                        ]
                    }
                ]
            },
            {
                title: 'Heading',
                test: {
                    key: 'block.type.name',
                    value: 'heading'
                },
                entries: [
                    {
                        type: 'select',
                        value_key: 'block.attrs.level',
                        action: 'setBlockAttribute',
                        attribute: 'level',
                        values: [
                            {
                                key: '1',
                                value: 'Level 1'
                            },
                            {
                                key: '2',
                                value: 'Level 2'
                            },
                            {
                                key: '3',
                                value: 'Level 3'
                            }
                        ]
                    }
                ]
            },
            {
                title: 'Heading Menu ID',
                test: {
                    key: 'block.type.name',
                    value: 'heading'
                },
                entries: [
                    {
                        type: 'text',
                        value_key: 'block.attrs.heading_id',
                        action: 'setBlockAttribute',
                        attribute: 'heading_id'
                    }
                ]
            },
            {
                title: 'Paragraph',
                test: {
                    key: 'block.type.name',
                    value: 'paragraph'
                },
                entries: [
                    {
                        type: 'button',
                        value_key: 'block.attrs.text_align',
                        label: 'Left align',
                        icon: 'FormatAlignLeft',
                        action: 'setBlockAttribute',
                        attribute: 'text_align',
                        value: 'left'
                    },
                    {
                        type: 'button',
                        value_key: 'block.attrs.text_align',
                        label: 'Center align',
                        icon: 'FormatAlignCenter',
                        action: 'setBlockAttribute',
                        attribute: 'text_align',
                        value: 'center'
                    },
                    {
                        type: 'button',
                        value_key: 'block.attrs.text_align',
                        label: 'Right align',
                        icon: 'FormatAlignRight',
                        action: 'setBlockAttribute',
                        attribute: 'text_align',
                        value: 'right'
                    },
                    {
                        type: 'button',
                        value_key: 'block.attrs.text_align',
                        label: 'Align justify',
                        icon: 'FormatAlignJustify',
                        action: 'setBlockAttribute',
                        attribute: 'text_align',
                        value: 'justify'
                    },
                    {
                        type: 'button',
                        value_key: 'block.attrs.no_indent',
                        label: 'Do not indent the paragraph',
                        icon: 'FormatHorizontalAlignLeft',
                        action: 'toggleBlockAttribute',
                        attribute: 'no_indent',
                        value: true
                    }
                ]
            },
            {
                title: 'Styling',
                test: 'marks',
                entries: [
                    {
                        type: 'select',
                        value_key: 'marks.font_size.attrs.size',
                        action: 'setMarkAttribute',
                        attribute: 'font_size.size',
                        values: [
                            {
                                key: '',
                                value: 'Default Size'
                            },
                            {
                                key: 'small',
                                value: 'Small Font'
                            },
                            {
                                key: 'medium',
                                value: 'Medium Font'
                            },
                            {
                                key: 'large',
                                value: 'Large Font'
                            },
                        ]
                    },
                    {
                        type: 'button',
                        value_key: 'marks.letter_sparse',
                        label: 'Sparse Lettering',
                        icon: 'MapMarkerDistance',
                        action: 'toggleMark',
                        attribute: 'letter_sparse',
                        value: 'toggle'
                    },
                    {
                        type: 'button',
                        value_key: 'marks.font_weight_bold',
                        label: 'Bold Font',
                        icon: 'FormatBold',
                        action: 'toggleMark',
                        attribute: 'font_weight_bold',
                        value: 'toggle'
                    }
                ]
            },
            {
                title: 'Markup',
                test: 'marks',
                entries: [
                    {
                        type: 'button',
                        value_key: 'marks.page_break',
                        label: 'Page Break',
                        icon: 'FormatPageBreak',
                        action: 'toggleMark',
                        attribute: 'page_break',
                        value: 'toggle'
                    },
                    {
                        type: 'button',
                        value_key: 'marks.foreign',
                        label: 'Foreign Language',
                        icon: 'Translate',
                        action: 'toggleMark',
                        attribute: 'foreign',
                        value: 'toggle'
                    },
                    {
                        type: 'button',
                        value_key: 'marks.annotation',
                        label: 'Annotation',
                        icon: 'MessageBulleted',
                        action: 'toggleMark',
                        attribute: 'annotation',
                        value: 'toggle'
                    }
                ]
            },
            {
                title: 'Annotations',
                test: 'marks.annotation',
                entries: [
                    {
                        type: 'select-annotation',
                        value_key: 'marks.annotation.attrs.target',
                        action: 'setMarkAttribute',
                        attribute: 'annotation.target',
                    }
                ]
            }
        ]
    };

    // Individual annoation UI configuration
    var individualAnnotationsUI = {
        sidebar: [
            {
                title: 'Identifier',
                test: 'blocks.doc',
                entries: [
                    {
                        type: 'text',
                        value_key: 'blocks.doc.attrs.id',
                        action: 'setDocAttribute',
                        attribute: 'id'
                    }
                ]
            },
            {
                title: 'Paragraph',
                test: {
                    key: 'block.type.name',
                    value: 'paragraph'
                },
                entries: [
                    {
                        type: 'button',
                        value_key: 'block.attrs.text_align',
                        label: 'Left align',
                        icon: 'FormatAlignLeft',
                        action: 'setBlockAttribute',
                        attribute: 'text_align',
                        value: 'left'
                    },
                    {
                        type: 'button',
                        value_key: 'block.attrs.text_align',
                        label: 'Center align',
                        icon: 'FormatAlignCenter',
                        action: 'setBlockAttribute',
                        attribute: 'text_align',
                        value: 'center'
                    },
                    {
                        type: 'button',
                        value_key: 'block.attrs.text_align',
                        label: 'Right align',
                        icon: 'FormatAlignRight',
                        action: 'setBlockAttribute',
                        attribute: 'text_align',
                        value: 'right'
                    },
                    {
                        type: 'button',
                        value_key: 'block.attrs.text_align',
                        label: 'Align justify',
                        icon: 'FormatAlignJustify',
                        action: 'setBlockAttribute',
                        attribute: 'text_align',
                        value: 'justify'
                    }
                ]
            },
            {
                title: 'Styling',
                test: 'marks',
                entries: [
                    {
                        type: 'select',
                        value_key: 'marks.font_size.attrs.size',
                        action: 'setMarkAttribute',
                        attribute: 'font_size.size',
                        values: [
                            {
                                key: '',
                                value: 'Default Size'
                            },
                            {
                                key: 'small',
                                value: 'Small Font'
                            },
                            {
                                key: 'medium',
                                value: 'Medium Font'
                            },
                            {
                                key: 'large',
                                value: 'Large Font'
                            },
                        ]
                    },
                    {
                        type: 'button',
                        value_key: 'marks.letter_sparse',
                        label: 'Sparse Lettering',
                        icon: 'MapMarkerDistance',
                        action: 'toggleMark',
                        attribute: 'letter_sparse',
                        value: 'toggle'
                    },
                    {
                        type: 'button',
                        value_key: 'marks.font_weight_bold',
                        label: 'Bold Font',
                        icon: 'FormatBold',
                        action: 'toggleMark',
                        attribute: 'font_weight_bold',
                        value: 'toggle'
                    }
                ]
            },
            {
                title: 'Markup',
                test: 'marks',
                entries: [
                    {
                        type: 'button',
                        value_key: 'marks.pageLineRef',
                        label: 'Annotation page and line range',
                        icon: 'PagePreviousOutline',
                        action: 'toggleMark',
                        attribute: 'pageLineRef',
                        value: 'toggle'
                    },
                    {
                        type: 'button',
                        value_key: 'marks.wordRange',
                        label: 'Annotation word range',
                        icon: 'FileWordBox',
                        action: 'toggleMark',
                        attribute: 'wordRange',
                        value: 'toggle'
                    },
                    {
                        type: 'button',
                        value_key: 'marks.quotation',
                        label: 'Quotation from the text',
                        icon: 'FormatQuoteClose',
                        action: 'toggleMark',
                        attribute: 'quotation',
                        value: 'toggle'
                    },
                    {
                        type: 'button',
                        value_key: 'marks.foreign',
                        label: 'Foreign Language',
                        icon: 'Translate',
                        action: 'toggleMark',
                        attribute: 'foreign',
                        value: 'toggle'
                    }
                ]
            }
        ]
    };

    // UI configuration for the metadata view
    var metadataUI = [
        {
            title: 'Bibliography',
            entries: [
                {
                    type: 'single-text',
                    label: 'Title',
                    value_key: 'fileDesc.titleStmt.title._text'
                },
                {
                    type: 'single-text',
                    label: 'Author',
                    value_key: 'fileDesc.titleStmt.author._text'
                },
                {
                    type: 'single-text',
                    label: 'Source',
                    value_key: 'sourceDesc.bibl._text'
                },
                {
                    type: 'single-text',
                    label: 'Publication Date (machine-readable)',
                    value_key: 'profileDesc.creation.date._attrs.when'
                },
                {
                    type: 'single-text',
                    label: 'Publication Date (human-readable)',
                    value_key: 'profileDesc.creation.date._text'
                }
            ]
        },
        {
            title: 'Digital Version',
            entries: [
                {
                    type: 'single-text',
                    label: 'Distributor',
                    value_key: 'fileDesc.publicationStmt.distributor._text'
                },
                {
                    type: 'single-text',
                    label: 'Taxonomy Identifier',
                    value_key: 'encodingDesc.classDecl.taxonomy._attrs.xml:id'
                },
                {
                    type: 'single-text',
                    label: 'Taxonomy Label',
                    value_key: 'encodingDesc.classDecl.taxonomy.bibl._text'
                },
                {
                    type: 'single-text',
                    label: 'Categorisation',
                    value_key: 'profileDesc.textClass.catRef._attrs.target'
                }
            ]
        },
        {
            title: 'Responsibilities',
            entries: [
                {
                    type: 'multi-field',
                    value_key: 'fileDesc.titleStmt.respStmt',
                    entries: [
                        {
                            type: 'single-text',
                            label: 'Identifier',
                            value_key: '_attrs.xml:id'
                        },
                        {
                            type: 'single-text',
                            label: 'Responsible for',
                            value_key: 'resp._text'
                        },
                        {
                            type: 'single-text',
                            label: 'Name',
                            value_key: 'name._text'
                        }
                    ]
                }
            ]
        },
        {
            title: 'Revisions',
            entries: [
                {
                    type: 'multi-field',
                    value_key: 'revisionDesc.change',
                    entries: [
                        {
                            type: 'single-text',
                            label: 'Change',
                            value_key: '_text'
                        },
                        {
                            type: 'single-text',
                            label: 'Who',
                            value_key: '_attrs.who'
                        },
                        {
                            type: 'single-text',
                            label: 'When',
                            value_key: '_attrs.when'
                        }
                    ]
                }
            ]
        }
    ];

    window.teiEditorConfig = window.teiEditorConfig || {};
    window.teiEditorConfig.ui = {
        main: {},
        mainText: fullTextUI,
        globalAnnotations: fullTextUI,
        individualAnnotations: individualAnnotationsUI,
        metadata: metadataUI
    };
})();
