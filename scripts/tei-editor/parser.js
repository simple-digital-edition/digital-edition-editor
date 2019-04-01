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

    var fullTextParser = {
        selector: '/tei:TEI/tei:text/tei:body/tei:*',
        blocks: {
            paragraph: {
                selector: 'tei:p',
                attrs: {
                    no_indent: {
                        selector: '@style',
                        values: {
                            'no-indent': true
                        }
                    },
                    text_align: {
                        selector: '@style',
                        values: {
                            'text-left': 'left',
                            'text-center': 'center',
                            'text-right': 'right',
                            'text-justify': 'justify'
                        }
                    }
                }
            },
            heading: {
                selector: 'tei:head',
                attrs: {
                    level: {
                        selector: '@type',
                        values: {
                            'level-1': '1',
                            'level-2': '2',
                            'level-3': '3'
                        }
                    },
                    heading_id: {
                        selector: '@data-heading-id'
                    }
                }
            }
        },
        inline: {
            text: [
                {
                    selector: 'tei:seg',
                    text: 'text()'
                },
                {
                    selector: 'tei:hi',
                    text: 'text()',
                    marks: {
                        font_size: {
                            selector: '@style',
                            values: ['font-size-small', 'font-size-medium', 'font-size-large'],
                            attrs: {
                                size: {
                                    selector: '@style',
                                    values: {
                                        'font-size-small': 'small',
                                        'font-size-medium': 'medium',
                                        'font-size-large': 'large'
                                    }
                                }
                            }
                        },
                        font_weight_bold: {
                            selector: '@style',
                            values: ['font-weight-bold']
                        },
                        letter_sparse: {
                            selector: '@style',
                            values: ['letter-sparse']
                        },
                        sup: {
                            selector: '@style',
                            values: ['sup']
                        }
                    }
                },
                {
                    selector: 'tei:ref',
                    text: 'text()',
                    marks: {
                        annotation: {
                            selector: '@target',
                            attrs: {
                                target: {
                                    selector: '@target',
                                }
                            }
                        }
                    }
                },
                {
                    selector: 'tei:foreign',
                    text: 'text()',
                    marks: {
                        foreign: true
                    }
                },
                {
                    selector: 'tei:pb',
                    text: '@n',
                    marks: {
                        page_break: true
                    }
                }
            ]
        }
    };

    var individualAnnotationsParser = {
        selector: '/tei:TEI/tei:text/tei:interpGrp[@type="individual"]/tei:interp',
        blockSelector: 'tei:*',
        blocks: {
            paragraph: {
                selector: 'tei:p',
                attrs: {
                    no_indent: {
                        selector: '@style',
                        values: {
                            'no-indent': true
                        }
                    },
                    text_align: {
                        selector: '@style',
                        values: {
                            'text-left': 'left',
                            'text-center': 'center',
                            'text-right': 'right',
                            'text-justify': 'justify'
                        }
                    }
                }
            }
        },
        inline: {
            text: [
                {
                    selector: 'tei:seg',
                    text: 'text()'
                },
                {
                    selector: 'tei:hi',
                    text: 'text()',
                    marks: {
                        font_size: {
                            selector: '@style',
                            values: ['font-size-small', 'font-size-medium', 'font-size-large'],
                            attrs: {
                                size: {
                                    selector: '@style',
                                    values: {
                                        'font-size-small': 'small',
                                        'font-size-medium': 'medium',
                                        'font-size-large': 'large'
                                    }
                                }
                            }
                        },
                        font_weight_bold: {
                            selector: '@style',
                            values: ['font-weight-bold']
                        },
                        letter_sparse: {
                            selector: '@style',
                            values: ['letter-sparse']
                        },
                        sup: {
                            selector: '@style',
                            values: ['sup']
                        }
                    }
                },
                {
                    selector: 'tei:foreign',
                    text: 'text()',
                    marks: {
                        foreign: true
                    }
                },
                {
                    selector: 'tei:pb',
                    text: '@n',
                    marks: {
                        page_break: true
                    }
                },
                {
                    selector: 'tei:citedRange[@type="page-line-ref"]',
                    text: 'text()',
                    marks: {
                        pageLineRef: true
                    }
                },
                {
                    selector: 'tei:citedRange[@type="word-range"]',
                    text: 'text()',
                    marks: {
                        wordRange: true
                    }
                },
                {
                    selector: 'tei:q',
                    text: 'text()',
                    marks: {
                        quotation: true
                    }
                }
            ]
        }
    };

    window.teiEditorConfig = window.teiEditorConfig || {};
    window.teiEditorConfig.parser = {
        mainText: fullTextParser,
        globalAnnotations: recursive_clone(fullTextParser),
        individualAnnotations: individualAnnotationsParser
    };
    window.teiEditorConfig.parser.globalAnnotations.selector = '/tei:TEI/tei:text/tei:interpGrp[@type="global"]/tei:*';
})();
