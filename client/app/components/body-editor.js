import Component from '@ember/component'
import {Schema} from "prosemirror-model"
import {EditorState} from "prosemirror-state"
import {EditorView} from "prosemirror-view"
import {undo, redo, history} from "prosemirror-history"
import {keymap} from "prosemirror-keymap"
import {baseKeymap, setBlockType, toggleMark} from "prosemirror-commands"
import {getActiveMarks, getBlockHierarchy} from "../utils/prosemirror-editor"

function paragraph_attrs_to_class(node) {
    let classes = [];
    if(node.attrs.no_indent) {
        classes.push('no-indent')
    }
    if(node.attrs.text_align === 'center') {
        classes.push('text-center')
    } else if(node.attrs.text_align === 'right') {
        classes.push('text-right')
    }
    if(classes.length > 0) {
        return classes.join(' ')
    } else {
        return null
    }
}

function paragraph_class_to_attrs(dom) {
    let attrs = {
        no_indent: False,
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
        }
    }
    return attrs
}

export default Component.extend({
    classNames: ['tei-body-editor', 'full-height'],
    blockPropertiesView: '',

    menu: undefined,

    didInsertElement() {
        this._super(...arguments)

        let menu = [
            {
                id: 'block',
                title: 'Current Block',
                items: [
                    {
                        id: 'heading',
                        title: 'Heading',
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
                id: 'block_styling',
                title: 'Block Styling',
                items: [
                    {
                        id: 'no_indent',
                        title: 'No indentation',
                        action: 'toggle-block-attr'
                    },
                    {
                        id: 'text_align_left',
                        title: 'Left align',
                        action: 'set-block-attr'
                    },
                    {
                        id: 'text_align_center',
                        title: 'Center align',
                        action: 'set-block-attr'
                    },
                    {
                        id: 'text_align_right',
                        title: 'Right align',
                        action: 'set-block-attr'
                    }
                ]
            },
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
                id: 'inline',
                title: 'Inline Styles',
                items: [
                    {
                        id: 'font_weight_bold',
                        title: 'Bold',
                        action: 'toggle-mark'
                    },
                    {
                        id: 'page_break',
                        title: 'Page Break',
                        action: 'toggle-mark'
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
        this.set('menu', menu)

        let schema = new Schema({
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
                        level: {
                            default: 1
                        }
                    },
                    defining: true,
                    toDOM(node) {return ['h' + node.attrs.level.substring(6), 0]},
                    parseDOM: [
                        {tag: "h1", attrs: {level: 'level-1'}},
                        {tag: "h2", attrs: {level: 'level-2'}}
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
                font_weight_bold: {
                    toDOM() {return ['span', {class: 'font-weight-bold'}, 0]},
                    parseDOM: [{tag: 'span.font-weight-bold'}]
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
                component.setMenuState('block.heading', {is_active: false})
                component.setMenuState('block.paragraph', {is_active: false})
                component.setMenuState('block_styling.no_indent', {is_active: false})
                component.setMenuState('block_styling.text_align_left', {is_active: false})
                component.setMenuState('block_styling.text_align_center', {is_active: false})
                component.setMenuState('block_styling.text_align_right', {is_active: false})
                let blocks = getBlockHierarchy(new_state)
                blocks.forEach((node) => {
                    if(node.type.isBlock) {
                        component.setMenuState('block.' + node.type.name, {is_active: true})
                        component.set('blockPropertiesView', {category: node.type.name, attrs: node.attrs})
                        if(node.type.name === 'paragraph') {
                            component.setMenuState('block_styling.no_indent', {is_active: node.attrs.no_indent})
                            if(node.attrs.text_align === 'left') {
                                component.setMenuState('block_styling.text_align_left', {is_active: true})
                            } else if(node.attrs.text_align === 'center') {
                                component.setMenuState('block_styling.text_align_center', {is_active: true})
                            } else if(node.attrs.text_align === 'right') {
                                component.setMenuState('block_styling.text_align_right', {is_active: true})
                            }
                        }
                    } else {
                        component.setMenuState('inline.' + node.type.name, {is_active: true})
                    }
                })
                // Calculate which marks are currently selected
                let selected_marks = getActiveMarks(new_state)
                component.setMenuState('font_size.default', {is_active: true})
                component.setMenuState('font_size.font_size_small', {is_active: false})
                component.setMenuState('font_size.font_size_medium', {is_active: false})
                component.setMenuState('font_size.font_size_large', {is_active: false})
                component.setMenuState('inline.sup', {is_active: false})
                component.setMenuState('inline.letter_sparse', {is_active: false})
                component.setMenuState('inline.foreign_language', {is_active: false})
                component.setMenuState('inline.page_break', {is_active: false})
                for(let idx = 0; idx < selected_marks.length; idx++) {
                    let mark = selected_marks[idx]
                    if(mark.indexOf('font_size_') === 0) {
                        component.setMenuState('font_size.default', {is_active: false})
                        component.setMenuState('font_size.' + mark, {is_active: true})
                    } else if(mark === 'page_break') {
                        component.setMenuState('inline.page_break', {is_active: true})
                    } else {
                        component.setMenuState('inline.' + mark, {is_active: true})
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
        'select-block-type': function(param) {
            let view = this.get('editor-view')
            let schema = this.get('editor-schema')
            view.focus()
            if(param === 'paragraph') {
                setBlockType(schema.nodes[param], {no_indent: false})(view.state, view.dispatch)
            } else if(param === 'heading') {
                setBlockType(schema.nodes['heading'], {level: 'level-1'})(view.state, view.dispatch)
            }
        },
        'select-heading-level': function(param) {
            let view = this.get('editor-view')
            let schema = this.get('editor-schema')
            view.focus()
            setBlockType(schema.nodes['heading'], {level: param})(view.state, view.dispatch)
        },
        'toggle-mark': function(param) {
            let view = this.get('editor-view')
            let schema = this.get('editor-schema')
            view.focus()
            toggleMark(schema.marks[param])(view.state, view.dispatch)
        },
        'set-font-size': function(param) {
            let view = this.get('editor-view')
            let schema = this.get('editor-schema')
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
        },
        'toggle-block-attr': function(param) {
            let view = this.get('editor-view')
            let schema = this.get('editor-schema')
            view.focus()
            let {$from} = view.state.selection
            if($from.parent.type.name === 'paragraph') {
                let attrs = {
                    no_indent: $from.parent.attrs.no_indent,
                    text_align: $from.parent.attrs.text_align
                }
                if(param === 'no_indent') {
                    attrs.no_indent = !attrs.no_indent
                }
                setBlockType(schema.nodes['paragraph'], attrs)(view.state, view.dispatch)
            }
        },
        'set-block-attr': function(param) {
            let view = this.get('editor-view')
            let schema = this.get('editor-schema')
            view.focus()
            let {$from} = view.state.selection
            if($from.parent.type.name === 'paragraph') {
                let attrs = {
                    no_indent: $from.parent.attrs.no_indent,
                    text_align: $from.parent.attrs.text_align
                }
                if(param === 'text_align_left') {
                    attrs.text_align = 'left'
                } else if(param === 'text_align_center') {
                    attrs.text_align = 'center'
                } else if(param === 'text_align_right') {
                    attrs.text_align = 'right'
                }
                setBlockType(schema.nodes['paragraph'], attrs)(view.state, view.dispatch)
            }
        }
    }
});
