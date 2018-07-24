import Component from '@ember/component'
import {Schema} from "prosemirror-model"
import {EditorState} from "prosemirror-state"
import {EditorView} from "prosemirror-view"
import {undo, redo, history} from "prosemirror-history"
import {keymap} from "prosemirror-keymap"
import {baseKeymap, setBlockType} from "prosemirror-commands"

export default Component.extend({
    didInsertElement() {
        this._super(...arguments);

        let schema = new Schema({
            nodes: {
                text: {},
                'main_heading': {
                    content: 'text*',
                    toDOM() {return ['h1', 0]},
                    parseDOM: [{tag: 'h1'}]
                },
                'sub_heading': {
                    content: 'text*',
                    toDOM() {return ['h2', 0]},
                    parseDOM: [{tag: 'h2'}]
                },
                paragraph: {
                    content: 'text*',
                    toDOM() {return ['p', 0]},
                    parseDOM: [{tag: 'p'}]
                },
                doc: {
                    content: '(main_heading | sub_heading | paragraph)+'
                }
            }
        })

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

        this.set('editor-view', new EditorView(this.element, {state}))
    },

    willDestroyElement() {
        this.get('editor-view').destroy()
    }
});
