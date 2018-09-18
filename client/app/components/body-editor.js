import Component from '@ember/component'
import {Schema} from "prosemirror-model"
import {EditorState} from "prosemirror-state"
import {EditorView} from "prosemirror-view"
import {undo, redo, history} from "prosemirror-history"
import {keymap} from "prosemirror-keymap"
import {baseKeymap, setBlockType, toggleMark} from "prosemirror-commands"
import {getActiveMarks, getBlockHierarchy} from "../utils/prosemirror-editor"

export default Component.extend({
    classNames: ['tei-body-editor', 'full-height'],

    menu: undefined,

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
            },
            {
                id: 'styling',
                title: 'Styling',
                items: [
                    {
                        id: 'font_size',
                        title: 'Font Size',
                        items: [
                            {
                                id: 'default',
                                title: 'Normal',
                                action: 'set-font-size'
                            },
                            {
                                id: 'font_size_small',
                                title: 'Small',
                                action: 'set-font-size'
                            },
                            {
                                id: 'font_size_medium',
                                title: 'Medium',
                                action: 'set-font-size'
                            },
                            {
                                id: 'font_size_large',
                                title: 'Large',
                                action: 'set-font-size'
                            }
                        ]
                    },
                    {
                        id: 'text_styling',
                        title: 'Text',
                        items: [
                            {
                                id: 'no_indent',
                                title: 'No indentation',
                                action: 'toggle-block-attr'
                            },
                            {
                                id: 'sup',
                                title: 'Superscript',
                                action: 'toggle-mark'
                            },
                            {
                                id: 'letter_sparse',
                                title: 'Sparse lettering',
                                action: 'toggle-mark'
                            },
                            {
                                id: 'foreign_language',
                                title: 'Foreign Language',
                                action: 'toggle-mark'
                            }
                        ]
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
                paragraph: {
                    group: 'block',
                    content: 'inline*',
                    attrs: {no_indent: {default: false}},
                    toDOM(node) {return ['p', {class: node.attrs.no_indent ? 'no-indent' : null}, 0]},
                    parseDOM: [{tag: 'p', getAttrs(dom) { return {no_indent: dom.class && dom.class.indexOf('no-indent') >= 0} }}]
                },
                heading: {
                    group: 'block',
                    content: 'inline*',
                    attrs: {level: {default: 1}},
                    defining: true,
                    toDOM(node) {return ['h' + node.attrs.level, 0]},
                    parseDOM: [
                        {tag: "h1", attrs: {level: 1}},
                        {tag: "h2", attrs: {level: 2}}
                    ]
                },
                text: {
                    group: 'inline',
                    inline: true
                }
            },
            marks: {
                foreign_language: {
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
                font_size_large: {
                    toDOM() {return ['span', {class: 'font-size-large'}, 0]},
                    parseDOM: [{tag: 'span.font-size-large'}]
                },
                font_size_medium: {
                    toDOM() {return ['span', {class: 'font-size-medium'}, 0]},
                    parseDOM: [{tag: 'span.font-size-medium'}]
                },
                font_size_small: {
                    toDOM() {return ['span', {class: 'font-size-small'}, 0]},
                    parseDOM: [{tag: 'span.font-size-small'}]
                },
                page_break: {
                    toDOM() {return ['span', {class: 'page-break'}, 0]},
                    parseDOM: [{tag: 'span.page-break'}]
                },
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
                keymap(baseKeymap)
            ]
        })

        let component = this;
        let view = new EditorView(this.element.querySelector('.editor'), {
            state,
            dispatchTransaction(transaction) {
                let new_state = view.state.apply(transaction)
                // Calculate which block types are currently selected
                component.setMenuState('block.heading_level_1', {is_active: false})
                component.setMenuState('block.heading_level_2', {is_active: false})
                component.setMenuState('block.paragraph', {is_active: false})
                component.setMenuState('inline.page_break', {is_active: false})
                let blocks = getBlockHierarchy(new_state)
                blocks.forEach((node) => {
                    if(node.type.isBlock) {
                        component.setMenuState('block.' + node.type.name, {is_active: true})
                        component.setMenuState('block.' + node.type.name + '_level_' + node.attrs.level, {is_active: true})

                        component.setMenuState('block', {title: (component.getMenuState('block.' + node.type.name) || component.getMenuState('block.' + node.type.name + '_level_' + node.attrs.level)).title})
                        component.setMenuState('styling.text_styling.no_indent', {is_active: node.attrs && node.attrs.no_indent})
                    } else {
                        component.setMenuState('inline.' + node.type.name, {is_active: true})
                        component.setMenuState('inline', {title: component.getMenuState('inline.' + node.type.name).title})
                    }
                })
                // Calculate which marks are currently selected
                let selected_marks = getActiveMarks(new_state)
                component.setMenuState('styling.font_size.default', {is_active: true})
                component.setMenuState('styling.font_size.font_size_small', {is_active: false})
                component.setMenuState('styling.font_size.font_size_medium', {is_active: false})
                component.setMenuState('styling.font_size.font_size_large', {is_active: false})
                component.setMenuState('styling.text_styling.sup', {is_active: false})
                component.setMenuState('styling.text_styling.letter_sparse', {is_active: false})
                component.setMenuState('styling.text_styling.foreign_language', {is_active: false})
                component.setMenuState('inline.page_break', {is_active: false})
                component.setMenuState('inline', {title: 'Text'})
                for(let idx = 0; idx < selected_marks.length; idx++) {
                    let mark = selected_marks[idx]
                    if(mark.indexOf('font_size_') === 0) {
                        component.setMenuState('styling.font_size.default', {is_active: false})
                        component.setMenuState('styling.font_size.' + mark, {is_active: true})
                    } else if(mark === 'page_break') {
                        component.setMenuState('inline.page_break', {is_active: true})
                        component.setMenuState('inline', {title: 'Page Break'})
                    } else {
                        component.setMenuState('styling.text_styling.' + mark, {is_active: true})
                    }
                }
                view.updateState(new_state)
                component.set('body', new_state.doc.toJSON())
            }
        })
        this.set('editor-view', view)
    },

    willDestroyElement() {
        this.get('editor-view').destroy()
    },

    setMenuState(path, attrs) {
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

    getMenuState(path) {
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
        let get_path = recursive_find(menu, path.split('.'))
        if(get_path !== null) {
            get_path = get_path.join('.')
            return menu.get(get_path)
        } else {
            return null;
        }
    },

    actions: {
        'menu-action'(action, param) {
            let view = this.get('editor-view')
            let schema = this.get('editor-schema')
            if(action === 'select-block-type') {
                view.focus()
                if(param === 'paragraph') {
                    setBlockType(schema.nodes[param], {no_indent: false})(view.state, view.dispatch)
                } else if(param === 'heading_level_1') {
                    setBlockType(schema.nodes['heading'], {level: 1})(view.state, view.dispatch)
                } else if(param === 'heading_level_2') {
                    setBlockType(schema.nodes['heading'], {level: 2})(view.state, view.dispatch)
                }
            } else if(action === 'toggle-mark') {
                view.focus()
                toggleMark(schema.marks[param])(view.state, view.dispatch)
            } else if(action === 'set-font-size') {
                view.focus()
                let marks = getActiveMarks(view.state)
                marks.forEach((mark) => {
                    if(mark.indexOf('font_size_') === 0) {
                        toggleMark(schema.marks[mark])(view.state, view.dispatch)
                    }
                })
                if(param.indexOf('font_size_') === 0) {
                    toggleMark(schema.marks[param])(view.state, view.dispatch)
                }
            } else if(action === 'toggle-block-attr') {
                view.focus()
                let {$from} = view.state.selection
                if($from.parent.type.name === 'paragraph') {
                    setBlockType(schema.nodes['paragraph'], {no_indent: !$from.parent.attrs.no_indent})(view.state, view.dispatch)
                }
            } else if(action === 'select-inline-type') {
                view.focus()
                toggleMark(schema.marks[param])(view.state, view.dispatch)
            }
        }
    }
});
