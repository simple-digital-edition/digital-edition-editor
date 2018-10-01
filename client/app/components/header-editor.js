import Component from '@ember/component'
import { set } from '@ember/object'

export default Component.extend({
    didInsertElement() {
        this._super(...arguments)

        let fields = [
            {
                'title': 'Publication',
                'items': [
                    {
                        'type': 'single',
                        'title': 'Title',
                        'field': 'title'
                    },
                    {
                        'type': 'single',
                        'title': 'Author',
                        'field': 'author'
                    },
                    {
                        'type': 'single',
                        'title': 'Published',
                        'field': 'published'
                    },
                    {
                        'type': 'multiple',
                        'schema': {
                            'items': [
                                {
                                    'type': 'single',
                                    'title': 'Publication Date (machine-readable)',
                                    'field': 'pub_date.machine'
                                },
                                {
                                    'type': 'single',
                                    'title': 'Publication Date (human-readable)',
                                    'field': 'pub_date.human'
                                }
                            ]
                        }
                    },
                    {
                        'type': 'single',
                        'title': 'Category',
                        'field': 'category'
                    }
                ]
            },
            {
                'title': 'Editors',
                'items': [
                    {
                        'type': 'list',
                        'field': 'editors',
                        'schema': {
                            'type': 'multiple',
                            'items': [
                                {
                                    'title': 'Identifier',
                                    'field': 'identifier'
                                },
                                {
                                    'title': 'Name',
                                    'field': 'name'
                                },
                                {
                                    'title': 'Responsible for',
                                    'field': 'resp'
                                }
                            ]
                        }
                    }
                ]
            },
            {
                'title': 'History',
                'items': [
                    {
                        'type': 'list',
                        'field': 'history',
                        'schema': {
                            'type': 'multiple',
                            'items': [
                                {
                                    'title': 'Changed by',
                                    'field': 'who'
                                },
                                {
                                    'title': 'Changed on',
                                    'field': 'when'
                                },
                                {
                                    'title': 'Description',
                                    'field': 'change'
                                }
                            ]
                        }
                    }
                ]
            }
        ]
        this.set('fields', fields)
    },

    actions: {
        'update-field': function(field, ev) {
            let model = this.get('model')
            let header = model.get('header')
            set(header, field, ev.target.value)
            model.set('header', Object.assign({}, header))
        },
        'update-list-field': function(field, idx, sub_field, ev) {
            let model = this.get('model')
            let header = model.get('header')
            set(header, field + '.' + idx + '.' + sub_field, ev.target.value)
            model.set('header', Object.assign({}, header))
        }
    }
});
