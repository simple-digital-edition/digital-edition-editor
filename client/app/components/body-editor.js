import Component from '@ember/component'
import {Schema} from "prosemirror-model"
import {EditorState} from "prosemirror-state"
import {EditorView} from "prosemirror-view"
import {undo, redo, history} from "prosemirror-history"
import {keymap} from "prosemirror-keymap"
import {baseKeymap, setBlockType, toggleMark} from "prosemirror-commands"

export default Component.extend({
    classNames: ['tei-body-editor', 'full-height'],

    block_types: [
        {key: 'heading_level_1', label: 'Heading 1'},
        {key: 'heading_level_2', label: 'Heading 2'},
        {key: 'paragraph', label: 'Paragraph'},
        {key: 'paragraph_no_indent', label: 'Paragraph (no Indent)'},
    ],
    selected_block_type: null,
    mark_types: [
        {key: '', label: ''},
        {key: 'page_break', label: 'Page Number'},
        {key: 'foreign_language', label: 'Foreign Language'},
        {key: 'letter_sparse', label: 'Sparse Lettering'},
        {key: 'sup', label: 'Superscript'},
        {key: 'font_size_large', label: 'Large'},
        {key: 'font_size_medium', label: 'Medium'},
        {key: 'font_size_small', label: 'Small'},
    ],
    menu: undefined,
    selected_mark_types: null,

    didInsertElement() {
        this._super(...arguments)

        let menu = [
            {
                id: 'block',
                title: 'Block',
                items: [
                    {
                        id: 'heading_level_1',
                        title: 'Heading 1',
                        action: 'select-block-type'
                    },
                    {
                        id: 'heading_level_2',
                        title: 'Heading 2',
                        action: 'select-block-type'
                    },
                    {
                        id: 'paragraph',
                        title: 'Paragraph',
                        action: 'select-block-type'
                    }
                ]
            },
            {
                id: 'inline',
                title: 'Inline',
                items: [
                    {
                        id: 'page_break',
                        title: 'Page Break',
                        action: 'select-inline-type'
                    }
                ]
            }
        ]
        this.set('menu', menu)

        let schema = new Schema({
            nodes: {
                doc: {
                    content: 'block+'

                },
                heading_level_1: {
                    group: 'block',
                    content: 'inline*',
                    toDOM() {return ['h1', 0]},
                    parseDOM: [{tag: 'h1'}]
                },
                heading_level_2: {
                    group: 'block',
                    content: 'inline*',
                    toDOM() {return ['h2', 0]},
                    parseDOM: [{tag: 'h2'}]
                },
                paragraph_no_indent: {
                    group: 'block',
                    content: 'inline*',
                    toDOM() {return ['p', {class: 'no-indent'}, 0]},
                    parseDOM: [{tag: 'p.no-indent'}]
                },
                paragraph: {
                    group: 'block',
                    content: 'inline*',
                    toDOM() {return ['p', 0]},
                    parseDOM: [{tag: 'p'}]
                },
                text: {
                    group: 'inline',
                    inline: true
                }
            },
            marks: {
                page_break: {
                    inclusive: true,
                    toDOM() {return ['span', {class: 'page-break'}, 0]},
                    parseDOM: [{tag: 'span.page-break'}]
                },
                foreign_language: {
                    toDOM() {return ['span', {class: 'foreign_language'}, 0]},
                    parseDOM: [{tag: 'span.foreign_language'}]
                },
                letter_sparse: {
                    toDOM() {return ['span', {class: 'letter-sparse'}, 0]},
                    parseDOM: [{tag: 'span.letter-sparse'}]
                },
                sup: {
                    toDOM() {return ['sup', 0]},
                    parseDOM: [{tag: 'sup'}]
                },
                font_size_large: {
                    toDOM() {return ['span', {class: 'font-size-large'}, 0]},
                    parseDOM: [{tag: 'span.font-size-large'}]
                },
                font_size_medium: {
                    toDOM() {return ['sup', {class: 'font-size-medium'}, 0]},
                    parseDOM: [{tag: 'span.font-size-medium'}]
                },
                font_size_small: {
                    toDOM() {return ['sup', {class: 'font-size-small'}, 0]},
                    parseDOM: [{tag: 'span.font-size-small'}]
                }
            }
        })
        this.set('editor-schema', schema)

        let state = EditorState.create({
            schema,
            doc: schema.nodeFromJSON(this.get('body')),
            plugins: [
                history(),
                keymap({
                    'Mod-z': undo,
                    'Mod-y': redo
                }),
                keymap(baseKeymap),
                keymap({
                    'Ctrl-1': setBlockType(schema.nodes.main_heading),
                    'Ctrl-2': setBlockType(schema.nodes.sub_heading),
                    'Ctrl-3': setBlockType(schema.nodes.paragraph)
                })
            ]
        })

        let component = this;
        let view = new EditorView(this.element.querySelector('.editor'), {
            state,
            dispatchTransaction(transaction) {
                let new_state = view.state.apply(transaction)
                let selection = new_state.selection
                // Calculate which block type is currently selected
                component.updateMenuState('block.heading_level_1', {is_active: false});
                component.updateMenuState('block.heading_level_2', {is_active: false});
                component.updateMenuState('block.paragraph', {is_active: false});
                for(let idx = 0; idx < selection.$anchor.path.length; idx++) {
                    if(typeof(selection.$anchor.path[idx]) === 'object') {
                        let node_type = selection.$anchor.path[idx].type
                        if(node_type.name !== 'doc' && node_type.isBlock) {
                            component.set('selected_block_type', node_type.name)
                            component.updateMenuState('block.' + node_type.name, {is_active: true});
                        }
                    }
                }
                // Calculate which marks are currently selected
                let selected_marks = []
                if(selection.from === selection.to) {
                    // Get marks at the current cursor position
                    if(new_state.doc.nodeAt(selection.from)) {
                        new_state.doc.nodeAt(selection.from).marks.forEach((mark) => {
                            if(selected_marks.indexOf(mark.type.name) === -1) {
                                selected_marks.push(mark.type.name)
                            }
                        })
                    }
                    // Add marks from the previous cursor position if they are inclusive
                    if(new_state.doc.nodeAt(selection.from - 1)) {
                        new_state.doc.nodeAt(selection.from - 1).marks.forEach((mark) => {
                            if(mark.type.spec.inclusive && selected_marks.indexOf(mark.type.name) === -1) {
                                selected_marks.push(mark.type.name)
                            }
                        })
                    }
                    // Add stored marks
                    if(new_state.storedMarks) {
                        new_state.storedMarks.forEach((mark) => {
                            if(selected_marks.indexOf(mark.type.name) === -1) {
                                selected_marks.push(mark.type.name)
                            }
                        })
                    }
                } else {
                    // Add all marks between the selection markers
                    new_state.doc.nodesBetween(selection.from, selection.to, (node) => {
                        node.marks.forEach((mark) => {
                            if(selected_marks.indexOf(mark.type.name) === -1) {
                                selected_marks.push(mark.type.name)
                            }
                        })
                    })
                }
                component.set('selected_mark_types', selected_marks)
                view.updateState(new_state)
                component.set('body', new_state.doc.toJSON())
            }
        })
        this.set('editor-view', view)
    },

    willDestroyElement() {
        this.get('editor-view').destroy()
    },

    updateMenuState(path, attrs) {
        let menu = this.get('menu')
        function recursive_find(items, subpath) {
            let found = false
            for(let idx = 0; idx < items.length; idx++) {
                if(items[idx].id === subpath[0]) {
                    found = true
                    if(subpath.length > 1 && items[idx].items) {
                        let tmp = recursive_find(items[idx].items, subpath.slice(1))
                        if(tmp !== null) {
                            tmp.splice(0, 0, idx, 'items')
                        }
                        return tmp
                    } else if(subpath.length === 1) {
                        return [idx]
                    } else {
                        return null
                    }
                }
            }
            if(!found) {
                return null
            }
        }
        let set_path = recursive_find(menu, path.split('.'))
        if(set_path !== null) {
            set_path = set_path.join('.')
            let keys = Object.keys(attrs)
            for(let idx = 0; idx < keys.length; idx++) {
                menu.set(set_path + '.' + keys[idx], attrs[keys[idx]])
            }
        }
    },

    actions: {
        'menu-action'(action, param) {
            if(action === 'select-block-type') {
                let view = this.get('editor-view')
                let schema = this.get('editor-schema')
                view.focus()
                setBlockType(schema.nodes[param])(view.state, view.dispatch)
            }
        },
        'set-block-type'(value) {
            this.set('selected_block_type', value)
            let view = this.get('editor-view')
            let schema = this.get('editor-schema')
            view.focus()
            setBlockType(schema.nodes[value])(view.state, view.dispatch)
        },
        'toggle-mark'(value) {
            this.set('selected_inline_type', value)
            let view = this.get('editor-view')
            let schema = this.get('editor-schema')
            view.focus()
            toggleMark(schema.marks[value])(view.state, view.dispatch)
        }
    }
});
