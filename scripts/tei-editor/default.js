(function() {
    var individualAnnotations = {
        type: 'doc',
        attrs: {
            id: ''
        },
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
                        text: 'Page & Line'
                    },
                    {
                        type: 'text',
                        marks: [
                            {
                                type: 'wordRange'
                            }
                        ],
                        text: 'Word Range'
                    }
                ]
            },
            {
                type: 'paragraph',
                content: [
                    {
                        type: 'text',
                        text: 'Type your annotation here'
                    }
                ]
            }
        ]
    };

    window.teiEditorConfig = window.teiEditorConfig || {};
    window.teiEditorConfig.default = {
        individualAnnotations: individualAnnotations
    };
})();
