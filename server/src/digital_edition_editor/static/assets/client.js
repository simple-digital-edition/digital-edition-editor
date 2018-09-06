'use strict';



;define('client/app', ['exports', 'client/resolver', 'ember-load-initializers', 'client/config/environment'], function (exports, _resolver, _emberLoadInitializers, _environment) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });


  const App = Ember.Application.extend({
    modulePrefix: _environment.default.modulePrefix,
    podModulePrefix: _environment.default.podModulePrefix,
    Resolver: _resolver.default
  });

  (0, _emberLoadInitializers.default)(App, _environment.default.modulePrefix);

  exports.default = App;
});
;define("client/components/body-editor", ["exports", "prosemirror-model", "prosemirror-state", "prosemirror-view", "prosemirror-history", "prosemirror-keymap", "prosemirror-commands"], function (exports, _prosemirrorModel, _prosemirrorState, _prosemirrorView, _prosemirrorHistory, _prosemirrorKeymap, _prosemirrorCommands) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.default = Ember.Component.extend({
        classNames: ['tei-body-editor', 'full-height'],

        block_types: [{ key: 'heading_level_1', label: 'Heading 1' }, { key: 'heading_level_2', label: 'Heading 2' }, { key: 'paragraph', label: 'Paragraph' }, { key: 'paragraph_no_indent', label: 'Paragraph (no Indent)' }],
        selected_block_type: null,
        mark_types: [{ key: '', label: '' }, { key: 'page_break', label: 'Page Number' }, { key: 'foreign_language', label: 'Foreign Language' }, { key: 'letter_sparse', label: 'Sparse Lettering' }, { key: 'sup', label: 'Superscript' }, { key: 'font_size_large', label: 'Large' }, { key: 'font_size_medium', label: 'Medium' }, { key: 'font_size_small', label: 'Small' }],
        menu: undefined,
        selected_mark_types: null,

        didInsertElement() {
            this._super(...arguments);

            let menu = [{
                id: 'block',
                title: 'Block',
                items: [{
                    id: 'heading_level_1',
                    title: 'Heading 1',
                    action: 'select-block-type'
                }, {
                    id: 'heading_level_2',
                    title: 'Heading 2',
                    action: 'select-block-type'
                }, {
                    id: 'paragraph',
                    title: 'Paragraph',
                    action: 'select-block-type'
                }]
            }, {
                id: 'inline',
                title: 'Inline',
                items: [{
                    id: 'page_break',
                    title: 'Page Break',
                    action: 'select-inline-type'
                }]
            }];
            this.set('menu', menu);

            let schema = new _prosemirrorModel.Schema({
                nodes: {
                    doc: {
                        content: 'block+'

                    },
                    heading_level_1: {
                        group: 'block',
                        content: 'inline*',
                        toDOM() {
                            return ['h1', 0];
                        },
                        parseDOM: [{ tag: 'h1' }]
                    },
                    heading_level_2: {
                        group: 'block',
                        content: 'inline*',
                        toDOM() {
                            return ['h2', 0];
                        },
                        parseDOM: [{ tag: 'h2' }]
                    },
                    paragraph_no_indent: {
                        group: 'block',
                        content: 'inline*',
                        toDOM() {
                            return ['p', { class: 'no-indent' }, 0];
                        },
                        parseDOM: [{ tag: 'p.no-indent' }]
                    },
                    paragraph: {
                        group: 'block',
                        content: 'inline*',
                        toDOM() {
                            return ['p', 0];
                        },
                        parseDOM: [{ tag: 'p' }]
                    },
                    text: {
                        group: 'inline',
                        inline: true
                    }
                },
                marks: {
                    page_break: {
                        inclusive: true,
                        toDOM() {
                            return ['span', { class: 'page-break' }, 0];
                        },
                        parseDOM: [{ tag: 'span.page-break' }]
                    },
                    foreign_language: {
                        toDOM() {
                            return ['span', { class: 'foreign_language' }, 0];
                        },
                        parseDOM: [{ tag: 'span.foreign_language' }]
                    },
                    letter_sparse: {
                        toDOM() {
                            return ['span', { class: 'letter-sparse' }, 0];
                        },
                        parseDOM: [{ tag: 'span.letter-sparse' }]
                    },
                    sup: {
                        toDOM() {
                            return ['sup', 0];
                        },
                        parseDOM: [{ tag: 'sup' }]
                    },
                    font_size_large: {
                        toDOM() {
                            return ['span', { class: 'font-size-large' }, 0];
                        },
                        parseDOM: [{ tag: 'span.font-size-large' }]
                    },
                    font_size_medium: {
                        toDOM() {
                            return ['sup', { class: 'font-size-medium' }, 0];
                        },
                        parseDOM: [{ tag: 'span.font-size-medium' }]
                    },
                    font_size_small: {
                        toDOM() {
                            return ['sup', { class: 'font-size-small' }, 0];
                        },
                        parseDOM: [{ tag: 'span.font-size-small' }]
                    }
                }
            });
            this.set('editor-schema', schema);

            let state = _prosemirrorState.EditorState.create({
                schema,
                doc: schema.nodeFromJSON(this.get('body')),
                plugins: [(0, _prosemirrorHistory.history)(), (0, _prosemirrorKeymap.keymap)({
                    'Mod-z': _prosemirrorHistory.undo,
                    'Mod-y': _prosemirrorHistory.redo
                }), (0, _prosemirrorKeymap.keymap)(_prosemirrorCommands.baseKeymap), (0, _prosemirrorKeymap.keymap)({
                    'Ctrl-1': (0, _prosemirrorCommands.setBlockType)(schema.nodes.main_heading),
                    'Ctrl-2': (0, _prosemirrorCommands.setBlockType)(schema.nodes.sub_heading),
                    'Ctrl-3': (0, _prosemirrorCommands.setBlockType)(schema.nodes.paragraph)
                })]
            });

            let component = this;
            let view = new _prosemirrorView.EditorView(this.element.querySelector('.editor'), {
                state,
                dispatchTransaction(transaction) {
                    let new_state = view.state.apply(transaction);
                    let selection = new_state.selection;
                    // Calculate which block type is currently selected
                    component.updateMenuState('block.heading_level_1', { is_active: false });
                    component.updateMenuState('block.heading_level_2', { is_active: false });
                    component.updateMenuState('block.paragraph', { is_active: false });
                    for (let idx = 0; idx < selection.$anchor.path.length; idx++) {
                        if (typeof selection.$anchor.path[idx] === 'object') {
                            let node_type = selection.$anchor.path[idx].type;
                            if (node_type.name !== 'doc' && node_type.isBlock) {
                                component.set('selected_block_type', node_type.name);
                                component.updateMenuState('block.' + node_type.name, { is_active: true });
                            }
                        }
                    }
                    // Calculate which marks are currently selected
                    let selected_marks = [];
                    if (selection.from === selection.to) {
                        // Get marks at the current cursor position
                        if (new_state.doc.nodeAt(selection.from)) {
                            new_state.doc.nodeAt(selection.from).marks.forEach(mark => {
                                if (selected_marks.indexOf(mark.type.name) === -1) {
                                    selected_marks.push(mark.type.name);
                                }
                            });
                        }
                        // Add marks from the previous cursor position if they are inclusive
                        if (new_state.doc.nodeAt(selection.from - 1)) {
                            new_state.doc.nodeAt(selection.from - 1).marks.forEach(mark => {
                                if (mark.type.spec.inclusive && selected_marks.indexOf(mark.type.name) === -1) {
                                    selected_marks.push(mark.type.name);
                                }
                            });
                        }
                        // Add stored marks
                        if (new_state.storedMarks) {
                            new_state.storedMarks.forEach(mark => {
                                if (selected_marks.indexOf(mark.type.name) === -1) {
                                    selected_marks.push(mark.type.name);
                                }
                            });
                        }
                    } else {
                        // Add all marks between the selection markers
                        new_state.doc.nodesBetween(selection.from, selection.to, node => {
                            node.marks.forEach(mark => {
                                if (selected_marks.indexOf(mark.type.name) === -1) {
                                    selected_marks.push(mark.type.name);
                                }
                            });
                        });
                    }
                    component.set('selected_mark_types', selected_marks);
                    view.updateState(new_state);
                    component.set('body', new_state.doc.toJSON());
                }
            });
            this.set('editor-view', view);
        },

        willDestroyElement() {
            this.get('editor-view').destroy();
        },

        updateMenuState(path, attrs) {
            let menu = this.get('menu');
            function recursive_find(items, subpath) {
                let found = false;
                for (let idx = 0; idx < items.length; idx++) {
                    if (items[idx].id === subpath[0]) {
                        found = true;
                        if (subpath.length > 1 && items[idx].items) {
                            let tmp = recursive_find(items[idx].items, subpath.slice(1));
                            if (tmp !== null) {
                                tmp.splice(0, 0, idx, 'items');
                            }
                            return tmp;
                        } else if (subpath.length === 1) {
                            return [idx];
                        } else {
                            return null;
                        }
                    }
                }
                if (!found) {
                    return null;
                }
            }
            let set_path = recursive_find(menu, path.split('.'));
            if (set_path !== null) {
                set_path = set_path.join('.');
                let keys = Object.keys(attrs);
                for (let idx = 0; idx < keys.length; idx++) {
                    menu.set(set_path + '.' + keys[idx], attrs[keys[idx]]);
                }
            }
        },

        actions: {
            'menu-action'(action, param) {
                if (action === 'select-block-type') {
                    let view = this.get('editor-view');
                    let schema = this.get('editor-schema');
                    view.focus();
                    (0, _prosemirrorCommands.setBlockType)(schema.nodes[param])(view.state, view.dispatch);
                }
            },
            'set-block-type'(value) {
                this.set('selected_block_type', value);
                let view = this.get('editor-view');
                let schema = this.get('editor-schema');
                view.focus();
                (0, _prosemirrorCommands.setBlockType)(schema.nodes[value])(view.state, view.dispatch);
            },
            'toggle-mark'(value) {
                this.set('selected_inline_type', value);
                let view = this.get('editor-view');
                let schema = this.get('editor-schema');
                view.focus();
                (0, _prosemirrorCommands.toggleMark)(schema.marks[value])(view.state, view.dispatch);
            }
        }
    });
});
;define('client/components/dropdown-menu-item', ['exports'], function (exports) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.default = Ember.Component.extend({
        tagName: 'li',
        classNameBindings: ['has_children:is-dropdown-submenu-parent', 'is_nested:is-submenu-item', 'is_nested:is-dropdown-submenu-item', 'has_children:opens-right', 'item.is_active:is-active'],
        is_focus: false,
        has_children: false,
        is_nested: false,

        didReceiveAttrs() {
            this._super(...arguments);
            this.set('has_children', this.get('item.items') !== undefined);
        },
        mouseEnter() {
            this.set('is_focus', true);
        },
        mouseLeave() {
            this.set('is_focus', false);
        },
        actions: {
            select() {
                if (this.get('item.action')) {
                    this.get('onaction')(this.get('item.action'), this.get('item.id'));
                }
            }
        }
    });
});
;define('client/components/dropdown-menu', ['exports'], function (exports) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.default = Ember.Component.extend({
        tagName: 'ul',
        classNames: ['menu'],
        classNameBindings: ['dropdown', 'submenu', 'isDropdownSubmenu', 'vertical', 'is_focus:is-visible'],
        dropdown: false,
        submenu: false,
        isDropdownSubmenu: false,
        vertical: false,
        is_focus: false,
        is_nested: false,

        didReceiveAttrs() {
            this._super(...arguments);
            if (this.is_nested) {
                this.set('submenu', true);
                this.set('isDropdownSubmenu', true);
                this.set('vertical', true);
            } else {
                this.set('dropdown', true);
            }
        }
    });
});
;define('client/components/node-editor', ['exports'], function (exports) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.default = Ember.Component.extend({
        edit_attributes: true,
        edit_text: true,
        edit_tail: true,

        actions: {
            'add-attribute': function (node) {
                var attrib = prompt('New attribute name');
                if (attrib) {
                    attrib = attrib.replace(/\./g, '::');
                    Ember.set(node.attrib, attrib, '');
                    this.get('notify-model-change')(node);
                }
            },
            'remove-attribute': function (node, attrib) {
                Ember.set(node.attrib, attrib, null);
                delete node.attrib[attrib];
                this.get('notify-model-change')();
            },
            'update-attribute': function (node, attrib, ev) {
                Ember.set(node.attrib, attrib, ev.target.value);
                this.get('notify-model-change')();
            },
            'update-text': function (node, key, ev) {
                Ember.set(node, key, ev.target.value);
                this.get('notify-model-change')();
            }
        }
    });
});
;define('client/components/tei-tag-render', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Component.extend({});
});
;define('client/components/tree-view', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Component.extend({});
});
;define('client/components/welcome-page', ['exports', 'ember-welcome-page/components/welcome-page'], function (exports, _welcomePage) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _welcomePage.default;
    }
  });
});
;define('client/components/xml-tree-editor', ['exports'], function (exports) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.default = Ember.Component.extend({
        actions: {
            'add-child-node': function (node) {
                var tag = prompt('New node tag');
                if (tag) {
                    tag = tag.replace(/\./g, '::');
                    var new_node = {
                        'tag': tag,
                        'children': [],
                        'attrib': {},
                        'text': '',
                        'tail': ''
                    };
                    node.children.pushObject(new_node);
                    this.get('notify-model-change')();
                }
            },
            'remove-node': function (parent, node) {
                parent.children.removeObject(node);
                this.get('notify-model-change')();
            },
            'move-node-forward': function (parent, node) {
                var idx = parent.children.indexOf(node);
                if (idx > 0) {
                    parent.children.removeObject(node);
                    parent.children.insertAt(idx - 1, node);
                    this.get('notify-model-change')();
                }
            },
            'move-node-backward': function (parent, node) {
                var idx = parent.children.indexOf(node);
                if (idx < parent.children.length - 1) {
                    parent.children.removeObject(node);
                    parent.children.insertAt(idx + 1, node);
                    this.get('notify-model-change')();
                }
            }
        }
    });
});
;define('client/controllers/editor', ['exports'], function (exports) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.default = Ember.Controller.extend({
        selected_repository: null,
        selected_file: null,
        file_component: Ember.inject.controller('editor.file'),

        actions: {
            select_repository: function (repository_id) {
                this.transitionToRoute('editor.repository', repository_id);
            },
            reset_file: function () {
                this.get('file_component').get('model').reload();
                this.get('file_component').set('selected_metadata_node', null);
            },
            save_file: function () {
                this.get('selected_file').save();
            }
        }
    });
});
;define('client/controllers/editor/file', ['exports'], function (exports) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.default = Ember.Controller.extend({
        selected_metadata_node: null,

        actions: {
            'select-tab-panel': function (target, ev) {
                ev.preventDefault();
                var panel_root = ev.target.parentElement.parentElement.parentElement.parentElement;
                panel_root.querySelectorAll('.tabs-title.is-active').forEach(function (item) {
                    item.classList.remove('is-active');
                    item.querySelector('a').removeAttribute('aria-selected');
                });
                panel_root.querySelectorAll('.tabs-panel.is-active').forEach(function (item) {
                    item.classList.remove('is-active');
                });
                ev.target.parentElement.classList.add('is-active');
                ev.target.setAttribute('aria-selected', 'true');
                panel_root.querySelector(target + '.tabs-panel').classList.add('is-active');
            },
            'select-metadata-node': function (node) {
                this.set('selected_metadata_node', node);
            },
            'notify-model-change': function () {
                this.get('model').send('becomeDirty');
            }
        }
    });
});
;define('client/controllers/editor/files', ['exports'], function (exports) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.default = Ember.Controller.extend({
        actions: {
            'select-file': function (rid, fid) {
                this.transitionToRoute('editor.file', rid, fid);
            }
        }
    });
});
;define('client/controllers/editor/repositories', ['exports'], function (exports) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.default = Ember.Controller.extend({
        actions: {
            'select-repository': function (rid) {
                this.transitionToRoute('editor.repository', rid);
            }
        }
    });
});
;define('client/controllers/editor/repository', ['exports'], function (exports) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.default = Ember.Controller.extend({
        selected_file: null,
        actions: {
            select_file: function (file_id) {
                this.transitionToRoute('editor.repository.file', file_id);
            }
        }
    });
});
;define('client/helpers/and', ['exports', 'ember-truth-helpers/helpers/and'], function (exports, _and) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _and.default;
    }
  });
  Object.defineProperty(exports, 'and', {
    enumerable: true,
    get: function () {
      return _and.and;
    }
  });
});
;define('client/helpers/app-version', ['exports', 'client/config/environment', 'ember-cli-app-version/utils/regexp'], function (exports, _environment, _regexp) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.appVersion = appVersion;
  function appVersion(_, hash = {}) {
    const version = _environment.default.APP.version;
    // e.g. 1.0.0-alpha.1+4jds75hf

    // Allow use of 'hideSha' and 'hideVersion' For backwards compatibility
    let versionOnly = hash.versionOnly || hash.hideSha;
    let shaOnly = hash.shaOnly || hash.hideVersion;

    let match = null;

    if (versionOnly) {
      if (hash.showExtended) {
        match = version.match(_regexp.versionExtendedRegExp); // 1.0.0-alpha.1
      }
      // Fallback to just version
      if (!match) {
        match = version.match(_regexp.versionRegExp); // 1.0.0
      }
    }

    if (shaOnly) {
      match = version.match(_regexp.shaRegExp); // 4jds75hf
    }

    return match ? match[0] : version;
  }

  exports.default = Ember.Helper.helper(appVersion);
});
;define('client/helpers/array-contains', ['exports', 'ember-array-contains-helper/helpers/array-contains'], function (exports, _arrayContains) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _arrayContains.default;
    }
  });
  Object.defineProperty(exports, 'arrayContains', {
    enumerable: true,
    get: function () {
      return _arrayContains.arrayContains;
    }
  });
});
;define('client/helpers/eq', ['exports', 'ember-truth-helpers/helpers/equal'], function (exports, _equal) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _equal.default;
    }
  });
  Object.defineProperty(exports, 'equal', {
    enumerable: true,
    get: function () {
      return _equal.equal;
    }
  });
});
;define('client/helpers/format-tag-ns', ['exports'], function (exports) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.formatTagNs = formatTagNs;
    function formatTagNs(params /*, hash*/) {
        return params.map(function (item) {
            return item.replace(/::/g, '.');
        });
    }

    exports.default = Ember.Helper.helper(formatTagNs);
});
;define('client/helpers/gt', ['exports', 'ember-truth-helpers/helpers/gt'], function (exports, _gt) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _gt.default;
    }
  });
  Object.defineProperty(exports, 'gt', {
    enumerable: true,
    get: function () {
      return _gt.gt;
    }
  });
});
;define('client/helpers/gte', ['exports', 'ember-truth-helpers/helpers/gte'], function (exports, _gte) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _gte.default;
    }
  });
  Object.defineProperty(exports, 'gte', {
    enumerable: true,
    get: function () {
      return _gte.gte;
    }
  });
});
;define('client/helpers/is-array', ['exports', 'ember-truth-helpers/helpers/is-array'], function (exports, _isArray) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _isArray.default;
    }
  });
  Object.defineProperty(exports, 'isArray', {
    enumerable: true,
    get: function () {
      return _isArray.isArray;
    }
  });
});
;define('client/helpers/is-empty', ['exports', 'ember-truth-helpers/helpers/is-empty'], function (exports, _isEmpty) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _isEmpty.default;
    }
  });
});
;define('client/helpers/is-equal', ['exports', 'ember-truth-helpers/helpers/is-equal'], function (exports, _isEqual) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _isEqual.default;
    }
  });
  Object.defineProperty(exports, 'isEqual', {
    enumerable: true,
    get: function () {
      return _isEqual.isEqual;
    }
  });
});
;define('client/helpers/lt', ['exports', 'ember-truth-helpers/helpers/lt'], function (exports, _lt) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _lt.default;
    }
  });
  Object.defineProperty(exports, 'lt', {
    enumerable: true,
    get: function () {
      return _lt.lt;
    }
  });
});
;define('client/helpers/lte', ['exports', 'ember-truth-helpers/helpers/lte'], function (exports, _lte) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _lte.default;
    }
  });
  Object.defineProperty(exports, 'lte', {
    enumerable: true,
    get: function () {
      return _lte.lte;
    }
  });
});
;define('client/helpers/not-eq', ['exports', 'ember-truth-helpers/helpers/not-equal'], function (exports, _notEqual) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _notEqual.default;
    }
  });
  Object.defineProperty(exports, 'notEq', {
    enumerable: true,
    get: function () {
      return _notEqual.notEq;
    }
  });
});
;define('client/helpers/not', ['exports', 'ember-truth-helpers/helpers/not'], function (exports, _not) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _not.default;
    }
  });
  Object.defineProperty(exports, 'not', {
    enumerable: true,
    get: function () {
      return _not.not;
    }
  });
});
;define('client/helpers/or', ['exports', 'ember-truth-helpers/helpers/or'], function (exports, _or) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _or.default;
    }
  });
  Object.defineProperty(exports, 'or', {
    enumerable: true,
    get: function () {
      return _or.or;
    }
  });
});
;define('client/helpers/pluralize', ['exports', 'ember-inflector/lib/helpers/pluralize'], function (exports, _pluralize) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = _pluralize.default;
});
;define('client/helpers/singularize', ['exports', 'ember-inflector/lib/helpers/singularize'], function (exports, _singularize) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = _singularize.default;
});
;define('client/helpers/strip-tag-ns', ['exports'], function (exports) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.stripTagNs = stripTagNs;
    function stripTagNs(params /*, hash*/) {
        return params.map(function (item) {
            if (item.indexOf('{') >= 0 && item.indexOf('}') >= 0) {
                return item.substring(item.indexOf('}') + 1);
            } else {
                return item;
            }
        });
    }

    exports.default = Ember.Helper.helper(stripTagNs);
});
;define('client/helpers/tei-tag-mapper', ['exports'], function (exports) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.teiTagMapper = teiTagMapper;
    function teiTagMapper(params /*, hash*/) {
        return params.map(function (item) {
            if (item === '{http://www::tei-c::org/ns/1::0}head') {
                return 'header';
            } else if (item === '{http://www::tei-c::org/ns/1::0}p') {
                return 'p';
            } else if (item === '{http://www::tei-c::org/ns/1::0}span') {
                return 'span';
            } else {
                if (item.indexOf('{') >= 0 && item.indexOf('}') >= 0) {
                    return item.substring(item.indexOf('}') + 1);
                } else {
                    return item;
                }
            }
        });
    }

    exports.default = Ember.Helper.helper(teiTagMapper);
});
;define('client/helpers/tei-tag-source-code', ['exports'], function (exports) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.teiTagSourceCode = teiTagSourceCode;


    function recursive_text(tag) {
        var text = '<' + tag.tag.replace('{http://www::tei-c::org/ns/1::0}', 'tei:');
        Object.keys(tag.attrib).forEach(function (key) {
            text = text + ' ' + key + '="' + tag.attrib[key] + '"';
        });
        text = text + '>';
        if (tag.text) {
            text = text + tag.text;
        }
        tag.children.forEach(function (child) {
            text = text + recursive_text(child);
            if (child.tail) {
                text = text + child.tail;
            }
        });
        text = text + '</' + tag.tag.replace('{http://www::tei-c::org/ns/1::0}', 'tei:') + '>';
        if (tag.tail) {
            text = text + tag.tail;
        }
        return text;
    }

    function teiTagSourceCode(params /*, hash*/) {
        return params.map(function (item) {
            return recursive_text(item);
        });
    }

    exports.default = Ember.Helper.helper(teiTagSourceCode);
});
;define('client/helpers/xor', ['exports', 'ember-truth-helpers/helpers/xor'], function (exports, _xor) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _xor.default;
    }
  });
  Object.defineProperty(exports, 'xor', {
    enumerable: true,
    get: function () {
      return _xor.xor;
    }
  });
});
;define('client/initializers/app-version', ['exports', 'ember-cli-app-version/initializer-factory', 'client/config/environment'], function (exports, _initializerFactory, _environment) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });


  let name, version;
  if (_environment.default.APP) {
    name = _environment.default.APP.name;
    version = _environment.default.APP.version;
  }

  exports.default = {
    name: 'App Version',
    initialize: (0, _initializerFactory.default)(name, version)
  };
});
;define('client/initializers/container-debug-adapter', ['exports', 'ember-resolver/resolvers/classic/container-debug-adapter'], function (exports, _containerDebugAdapter) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = {
    name: 'container-debug-adapter',

    initialize() {
      let app = arguments[1] || arguments[0];

      app.register('container-debug-adapter:main', _containerDebugAdapter.default);
      app.inject('container-debug-adapter:main', 'namespace', 'application:main');
    }
  };
});
;define('client/initializers/ember-data', ['exports', 'ember-data/setup-container', 'ember-data'], function (exports, _setupContainer) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = {
    name: 'ember-data',
    initialize: _setupContainer.default
  };
});
;define('client/initializers/export-application-global', ['exports', 'client/config/environment'], function (exports, _environment) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.initialize = initialize;
  function initialize() {
    var application = arguments[1] || arguments[0];
    if (_environment.default.exportApplicationGlobal !== false) {
      var theGlobal;
      if (typeof window !== 'undefined') {
        theGlobal = window;
      } else if (typeof global !== 'undefined') {
        theGlobal = global;
      } else if (typeof self !== 'undefined') {
        theGlobal = self;
      } else {
        // no reasonable global, just bail
        return;
      }

      var value = _environment.default.exportApplicationGlobal;
      var globalName;

      if (typeof value === 'string') {
        globalName = value;
      } else {
        globalName = Ember.String.classify(_environment.default.modulePrefix);
      }

      if (!theGlobal[globalName]) {
        theGlobal[globalName] = application;

        application.reopen({
          willDestroy: function () {
            this._super.apply(this, arguments);
            delete theGlobal[globalName];
          }
        });
      }
    }
  }

  exports.default = {
    name: 'export-application-global',

    initialize: initialize
  };
});
;define('client/instance-initializers/ember-data', ['exports', 'ember-data/initialize-store-service'], function (exports, _initializeStoreService) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = {
    name: 'ember-data',
    initialize: _initializeStoreService.default
  };
});
;define('client/models/file', ['exports', 'ember-data'], function (exports, _emberData) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.default = _emberData.default.Model.extend({
        filename: _emberData.default.attr('string'),
        header: _emberData.default.attr(),
        body: _emberData.default.attr(),

        basename: Ember.computed('filename', function () {
            var filename = this.get('filename');
            if (filename.lastIndexOf('/') >= 0) {
                return filename.substring(filename.lastIndexOf('/') + 1);
            } else {
                return filename;
            }
        })
    });
});
;define('client/models/repository', ['exports', 'ember-data'], function (exports, _emberData) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.default = _emberData.default.Model.extend({
        title: _emberData.default.attr('string'),
        is_dirty: _emberData.default.attr('boolean'),
        changes: _emberData.default.attr(),
        tei_files: _emberData.default.attr()
    });
});
;define('client/resolver', ['exports', 'ember-resolver'], function (exports, _emberResolver) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = _emberResolver.default;
});
;define('client/router', ['exports', 'client/config/environment'], function (exports, _environment) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });


  const Router = Ember.Router.extend({
    location: _environment.default.locationType,
    rootURL: _environment.default.rootURL
  });

  Router.map(function () {
    this.route('editor', { path: '/' }, function () {
      this.route('repositories');
      this.route('repository', { path: 'repositories/:rid' });
      this.route('files', { path: 'repositories/:rid/files' });
      this.route('file', { path: 'repositories/:rid/files/:fid' });
    });
  });

  exports.default = Router;
});
;define('client/routes/editor', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Route.extend({});
});
;define('client/routes/editor/file', ['exports'], function (exports) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.default = Ember.Route.extend({
        model: function (params) {
            var route = this;
            var repository_promise = this.store.findRecord('repository', params.rid);
            repository_promise.then(function (repository) {
                route.controllerFor('editor').set('selected_repository', repository);
            });
            var file_promise = this.store.findRecord('file', params.rid + ':' + params.fid);
            file_promise.then(function (file) {
                route.controllerFor('editor').set('selected_file', file);
            });
            return file_promise;
        }
    });
});
;define('client/routes/editor/files', ['exports'], function (exports) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.default = Ember.Route.extend({
        model: function (params) {
            var model = this.store.findRecord('repository', params.rid);
            var route = this;
            model.then(function (repository) {
                route.controllerFor('editor').set('selected_repository', repository);
            });
            return model;
        }
    });
});
;define('client/routes/editor/repositories', ['exports'], function (exports) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.default = Ember.Route.extend({
        model: function () {
            return this.store.findAll('repository');
        }
    });
});
;define('client/routes/editor/repository', ['exports'], function (exports) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.default = Ember.Route.extend({
        model: function (params) {
            var model = this.store.findRecord('repository', params.rid);
            var route = this;
            model.then(function (repository) {
                route.controllerFor('editor').set('selected_repository', repository);
            });
            return model;
        }
    });
});
;define('client/services/ajax', ['exports', 'ember-ajax/services/ajax'], function (exports, _ajax) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _ajax.default;
    }
  });
});
;define("client/templates/application", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "8PzX6Lwz", "block": "{\"symbols\":[],\"statements\":[[1,[21,\"outlet\"],false],[0,\"\\n\"]],\"hasEval\":false}", "meta": { "moduleName": "client/templates/application.hbs" } });
});
;define("client/templates/components/body-editor", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "66zlD2BQ", "block": "{\"symbols\":[\"mark_type\",\"block_type\"],\"statements\":[[7,\"div\"],[11,\"class\",\"grid-y full-height\"],[9],[0,\"\\n  \"],[7,\"nav\"],[11,\"class\",\"cell shrink\"],[9],[0,\"\\n    \"],[1,[27,\"dropdown-menu\",null,[[\"items\",\"onaction\"],[[23,[\"menu\"]],[27,\"action\",[[22,0,[]],\"menu-action\"],null]]]],false],[0,\"\\n    \"],[7,\"ul\"],[11,\"class\",\"menu\"],[11,\"role\",\"menubar\"],[9],[0,\"\\n      \"],[7,\"li\"],[9],[0,\"\\n        \"],[7,\"select\"],[11,\"role\",\"menuitem\"],[12,\"onchange\",[27,\"action\",[[22,0,[]],\"set-block-type\"],[[\"value\"],[\"target.value\"]]]],[9],[0,\"\\n\"],[4,\"each\",[[23,[\"block_types\"]]],null,{\"statements\":[[0,\"            \"],[7,\"option\"],[12,\"value\",[22,2,[\"key\"]]],[12,\"selected\",[27,\"eq\",[[22,2,[\"key\"]],[23,[\"selected_block_type\"]]],null]],[9],[1,[22,2,[\"label\"]],false],[10],[0,\"\\n\"]],\"parameters\":[2]},null],[0,\"        \"],[10],[0,\"\\n      \"],[10],[0,\"\\n\"],[4,\"each\",[[23,[\"mark_types\"]]],null,{\"statements\":[[4,\"if\",[[27,\"array-contains\",[[23,[\"selected_mark_types\"]],[22,1,[\"key\"]]],null]],null,{\"statements\":[[0,\"          \"],[7,\"li\"],[11,\"class\",\"is-active\"],[9],[0,\"\\n            \"],[7,\"a\"],[11,\"href\",\"\"],[3,\"action\",[[22,0,[]],\"toggle-mark\",[22,1,[\"key\"]]]],[9],[1,[22,1,[\"label\"]],false],[10],[0,\"\\n          \"],[10],[0,\"\\n\"]],\"parameters\":[]},{\"statements\":[[0,\"          \"],[7,\"li\"],[9],[0,\"\\n            \"],[7,\"a\"],[11,\"href\",\"\"],[3,\"action\",[[22,0,[]],\"toggle-mark\",[22,1,[\"key\"]]]],[9],[1,[22,1,[\"label\"]],false],[10],[0,\"\\n          \"],[10],[0,\"\\n\"]],\"parameters\":[]}]],\"parameters\":[1]},null],[0,\"    \"],[10],[0,\"\\n  \"],[10],[0,\"\\n  \"],[7,\"div\"],[11,\"class\",\"editor auto-overflow\"],[9],[0,\"\\n  \"],[10],[0,\"\\n\"],[10],[0,\"\\n\"]],\"hasEval\":false}", "meta": { "moduleName": "client/templates/components/body-editor.hbs" } });
});
;define("client/templates/components/dropdown-menu-item", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "vyJ26BRO", "block": "{\"symbols\":[],\"statements\":[[4,\"if\",[[23,[\"item\",\"items\"]]],null,{\"statements\":[[0,\"  \"],[7,\"a\"],[11,\"href\",\"#\"],[3,\"action\",[[22,0,[]],\"select\"]],[9],[1,[23,[\"item\",\"title\"]],false],[10],[0,\"\\n  \"],[1,[27,\"dropdown-menu\",null,[[\"items\",\"is_nested\",\"is_focus\",\"onaction\"],[[23,[\"item\",\"items\"]],true,[23,[\"is_focus\"]],[23,[\"onaction\"]]]]],false],[0,\"\\n\"]],\"parameters\":[]},{\"statements\":[[0,\"  \"],[7,\"a\"],[11,\"href\",\"#\"],[3,\"action\",[[22,0,[]],\"select\"]],[9],[1,[23,[\"item\",\"title\"]],false],[10],[0,\"\\n\"]],\"parameters\":[]}]],\"hasEval\":false}", "meta": { "moduleName": "client/templates/components/dropdown-menu-item.hbs" } });
});
;define("client/templates/components/dropdown-menu", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "YvFEjaD6", "block": "{\"symbols\":[\"item\"],\"statements\":[[4,\"each\",[[23,[\"items\"]]],null,{\"statements\":[[0,\"  \"],[1,[27,\"dropdown-menu-item\",null,[[\"item\",\"is_nested\",\"onaction\"],[[22,1,[]],[23,[\"is_nested\"]],[23,[\"onaction\"]]]]],false],[0,\"\\n\"]],\"parameters\":[1]},null]],\"hasEval\":false}", "meta": { "moduleName": "client/templates/components/dropdown-menu.hbs" } });
});
;define("client/templates/components/node-editor", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "miXGZIn5", "block": "{\"symbols\":[\"value\",\"key\"],\"statements\":[[7,\"div\"],[11,\"class\",\"grid-y\"],[9],[0,\"\\n  \"],[7,\"div\"],[11,\"class\",\"cell shrink\"],[9],[0,\"\\n    \"],[7,\"h2\"],[9],[1,[27,\"strip-tag-ns\",[[23,[\"node\",\"tag\"]]],null],false],[10],[0,\"\\n  \"],[10],[0,\"\\n\"],[4,\"if\",[[23,[\"edit_attributes\"]]],null,{\"statements\":[[0,\"    \"],[7,\"div\"],[11,\"class\",\"cell shrink\"],[9],[0,\"\\n      \"],[7,\"h3\"],[9],[0,\"Attributes\\n        \"],[7,\"a\"],[11,\"href\",\"#\"],[11,\"title\",\"Add an attribute\"],[3,\"action\",[[22,0,[]],\"add-attribute\",[23,[\"node\"]]]],[9],[0,\"\\n          \"],[7,\"svg\"],[11,\"viewBox\",\"0 0 24 24\"],[11,\"class\",\"icon small\"],[9],[0,\"\\n            \"],[7,\"path\"],[11,\"d\",\"M12,20C7.59,20 4,16.41 4,12C4,7.59 7.59,4 12,4C16.41,4 20,7.59 20,12C20,16.41 16.41,20 12,20M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M13,7H11V11H7V13H11V17H13V13H17V11H13V7Z\"],[9],[10],[0,\"\\n          \"],[10],[0,\"\\n        \"],[10],[0,\"\\n      \"],[10],[0,\"\\n    \"],[10],[0,\"\\n\"],[4,\"each\",[[27,\"-each-in\",[[23,[\"node\",\"attrib\"]]],null]],null,{\"statements\":[[0,\"      \"],[7,\"div\"],[11,\"class\",\"cell shrink\"],[9],[0,\"\\n        \"],[7,\"div\"],[11,\"class\",\"grid-x\"],[9],[0,\"\\n          \"],[7,\"div\"],[11,\"class\",\"cell auto\"],[9],[0,\"\\n            \"],[7,\"label\"],[9],[7,\"span\"],[12,\"title\",[27,\"format-tag-ns\",[[22,2,[]]],null]],[9],[1,[27,\"strip-tag-ns\",[[22,2,[]]],null],false],[10],[0,\"\\n              \"],[7,\"input\"],[12,\"value\",[22,1,[]]],[12,\"onchange\",[27,\"action\",[[22,0,[]],\"update-attribute\",[23,[\"node\"]],[22,2,[]]],null]],[11,\"type\",\"text\"],[9],[10],[0,\"\\n            \"],[10],[0,\"\\n          \"],[10],[0,\"\\n          \"],[7,\"div\"],[11,\"class\",\"cell shrink\"],[9],[0,\"\\n            \"],[7,\"a\"],[11,\"href\",\"#\"],[11,\"title\",\"Remove the attribute\"],[3,\"action\",[[22,0,[]],\"remove-attribute\",[23,[\"node\"]],[22,2,[]]]],[9],[0,\"\\n              \"],[7,\"svg\"],[11,\"viewBox\",\"0 0 24 24\"],[11,\"class\",\"icon small\"],[9],[0,\"\\n                \"],[7,\"path\"],[11,\"d\",\"M12,20C7.59,20 4,16.41 4,12C4,7.59 7.59,4 12,4C16.41,4 20,7.59 20,12C20,16.41 16.41,20 12,20M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M7,13H17V11H7\"],[9],[10],[0,\"\\n              \"],[10],[0,\"\\n            \"],[10],[0,\"\\n          \"],[10],[0,\"\\n        \"],[10],[0,\"\\n      \"],[10],[0,\"\\n\"]],\"parameters\":[1,2]},null]],\"parameters\":[]},null],[4,\"if\",[[27,\"or\",[[23,[\"edit_text\"]],[23,[\"edit_tail\"]]],null]],null,{\"statements\":[[0,\"    \"],[7,\"div\"],[11,\"class\",\"cell shrink\"],[9],[0,\"\\n      \"],[7,\"h3\"],[9],[0,\"Text\"],[10],[0,\"\\n    \"],[10],[0,\"\\n\"],[4,\"if\",[[23,[\"edit_text\"]]],null,{\"statements\":[[0,\"      \"],[7,\"div\"],[11,\"class\",\"cell shrink\"],[9],[0,\"\\n        \"],[7,\"label\"],[9],[0,\"Text\\n          \"],[7,\"input\"],[12,\"value\",[23,[\"node\",\"text\"]]],[12,\"onchange\",[27,\"action\",[[22,0,[]],\"update-text\",[23,[\"node\"]],\"text\"],null]],[11,\"type\",\"text\"],[9],[10],[0,\"\\n        \"],[10],[0,\"\\n      \"],[10],[0,\"\\n\"]],\"parameters\":[]},null],[4,\"if\",[[23,[\"edit_tail\"]]],null,{\"statements\":[[0,\"      \"],[7,\"div\"],[11,\"class\",\"cell shrink\"],[9],[0,\"\\n        \"],[7,\"label\"],[9],[0,\"Tail\\n          \"],[7,\"input\"],[12,\"value\",[23,[\"node\",\"tail\"]]],[12,\"onchange\",[27,\"action\",[[22,0,[]],\"update-text\",[23,[\"node\"]],\"tail\"],null]],[11,\"type\",\"text\"],[9],[10],[0,\"\\n        \"],[10],[0,\"\\n      \"],[10],[0,\"\\n\"]],\"parameters\":[]},null]],\"parameters\":[]},null],[10],[0,\"\\n\"]],\"hasEval\":false}", "meta": { "moduleName": "client/templates/components/node-editor.hbs" } });
});
;define("client/templates/components/tei-tag-render", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "JXiOzgmN", "block": "{\"symbols\":[\"child\"],\"statements\":[[1,[23,[\"elem\",\"text\"]],false],[4,\"each\",[[23,[\"elem\",\"children\"]]],null,{\"statements\":[[1,[27,\"tei-tag-render\",null,[[\"tag\",\"tagName\",\"classNames\"],[[22,1,[]],[27,\"tei-tag-mapper\",[[22,1,[\"tag\"]]],null],[22,1,[\"attrib\",\"style\"]]]]],false],[1,[23,[\"elem\",\"tail\"]],false]],\"parameters\":[1]},null],[0,\"\\n\"]],\"hasEval\":false}", "meta": { "moduleName": "client/templates/components/tei-tag-render.hbs" } });
});
;define("client/templates/components/tree-view", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "tbxhvaTP", "block": "{\"symbols\":[\"child\"],\"statements\":[[7,\"li\"],[9],[0,\"\\n  \"],[7,\"div\"],[11,\"class\",\"ellipsis hover-parent\"],[9],[0,\"\\n    \"],[7,\"a\"],[11,\"href\",\"#\"],[12,\"title\",[27,\"format-tag-ns\",[[23,[\"node\",\"tag\"]]],null]],[3,\"action\",[[22,0,[]],[23,[\"click-node-title\"]],[23,[\"node\"]]]],[9],[1,[27,\"strip-tag-ns\",[[23,[\"node\",\"tag\"]]],null],false],[10],[0,\"\\n    \"],[7,\"span\"],[11,\"class\",\"hover\"],[9],[0,\"\\n      \"],[7,\"a\"],[11,\"href\",\"#\"],[11,\"title\",\"Add a child node\"],[3,\"action\",[[22,0,[]],[23,[\"add-child-node\"]],[23,[\"node\"]]]],[9],[0,\"\\n        \"],[7,\"svg\"],[11,\"viewBox\",\"0 0 24 24\"],[11,\"class\",\"icon small\"],[9],[0,\"\\n          \"],[7,\"path\"],[11,\"d\",\"M12,20C7.59,20 4,16.41 4,12C4,7.59 7.59,4 12,4C16.41,4 20,7.59 20,12C20,16.41 16.41,20 12,20M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M13,7H11V11H7V13H11V17H13V13H17V11H13V7Z\"],[9],[10],[0,\"\\n        \"],[10],[0,\"\\n      \"],[10],[0,\"\\n      \"],[7,\"a\"],[11,\"href\",\"#\"],[11,\"title\",\"Remove this node\"],[3,\"action\",[[22,0,[]],[23,[\"remove-node\"]],[23,[\"parent\"]],[23,[\"node\"]]]],[9],[0,\"\\n        \"],[7,\"svg\"],[11,\"viewBox\",\"0 0 24 24\"],[11,\"class\",\"icon small\"],[9],[0,\"\\n          \"],[7,\"path\"],[11,\"d\",\"M12,20C7.59,20 4,16.41 4,12C4,7.59 7.59,4 12,4C16.41,4 20,7.59 20,12C20,16.41 16.41,20 12,20M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M7,13H17V11H7\"],[9],[10],[0,\"\\n        \"],[10],[0,\"\\n      \"],[10],[0,\"\\n      \"],[7,\"a\"],[11,\"href\",\"#\"],[11,\"title\",\"Move the node forward\"],[3,\"action\",[[22,0,[]],[23,[\"move-node-forward\"]],[23,[\"parent\"]],[23,[\"node\"]]]],[9],[0,\"\\n        \"],[7,\"svg\"],[11,\"viewBox\",\"0 0 24 24\"],[11,\"class\",\"icon small\"],[9],[0,\"\\n            \"],[7,\"path\"],[11,\"d\",\"M12,7L17,12H14V16H10V12H7L12,7M12,22A10,10 0 0,1 2,12A10,10 0 0,1 12,2A10,10 0 0,1 22,12A10,10 0 0,1 12,22M12,20A8,8 0 0,0 20,12A8,8 0 0,0 12,4A8,8 0 0,0 4,12A8,8 0 0,0 12,20Z\"],[9],[10],[0,\"\\n        \"],[10],[0,\"\\n      \"],[10],[0,\"\\n      \"],[7,\"a\"],[11,\"href\",\"#\"],[11,\"title\",\"Move the node backward\"],[3,\"action\",[[22,0,[]],[23,[\"move-node-backward\"]],[23,[\"parent\"]],[23,[\"node\"]]]],[9],[0,\"\\n        \"],[7,\"svg\"],[11,\"viewBox\",\"0 0 24 24\"],[11,\"class\",\"icon small\"],[9],[0,\"\\n            \"],[7,\"path\"],[11,\"d\",\"M12,17L7,12H10V8H14V12H17L12,17M12,2A10,10 0 0,1 22,12A10,10 0 0,1 12,22A10,10 0 0,1 2,12A10,10 0 0,1 12,2M12,4A8,8 0 0,0 4,12A8,8 0 0,0 12,20A8,8 0 0,0 20,12A8,8 0 0,0 12,4Z\"],[9],[10],[0,\"\\n        \"],[10],[0,\"\\n      \"],[10],[0,\"\\n    \"],[10],[0,\"\\n    \"],[7,\"span\"],[11,\"class\",\"secondary\"],[9],[1,[23,[\"node\",\"text\"]],false],[10],[0,\"\\n  \"],[10],[0,\"\\n\"],[4,\"if\",[[23,[\"node\",\"children\"]]],null,{\"statements\":[[0,\"    \"],[7,\"ul\"],[11,\"class\",\"no-bullet\"],[11,\"style\",\"margin-left:1rem;\"],[9],[0,\"\\n      \"],[4,\"each\",[[23,[\"node\",\"children\"]]],null,{\"statements\":[[1,[27,\"tree-view\",null,[[\"node\",\"parent\",\"click-node-title\",\"add-child-node\",\"remove-node\",\"move-node-forward\",\"move-node-backward\"],[[22,1,[]],[23,[\"node\"]],[23,[\"click-node-title\"]],[23,[\"add-child-node\"]],[23,[\"remove-node\"]],[23,[\"move-node-forward\"]],[23,[\"move-node-backward\"]]]]],false]],\"parameters\":[1]},null],[0,\"\\n    \"],[10],[0,\"\\n\"]],\"parameters\":[]},null],[10],[0,\"\\n\"]],\"hasEval\":false}", "meta": { "moduleName": "client/templates/components/tree-view.hbs" } });
});
;define("client/templates/components/xml-tree-editor", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "+WUzs9rK", "block": "{\"symbols\":[],\"statements\":[[1,[27,\"tree-view\",null,[[\"node\",\"parent\",\"click-node-title\",\"add-child-node\",\"remove-node\",\"move-node-forward\",\"move-node-backward\"],[[23,[\"node\"]],null,[27,\"action\",[[22,0,[]],[23,[\"click-node-title\"]]],null],[27,\"action\",[[22,0,[]],\"add-child-node\"],null],[27,\"action\",[[22,0,[]],\"remove-node\"],null],[27,\"action\",[[22,0,[]],\"move-node-forward\"],null],[27,\"action\",[[22,0,[]],\"move-node-backward\"],null]]]],false],[0,\"\\n\"]],\"hasEval\":false}", "meta": { "moduleName": "client/templates/components/xml-tree-editor.hbs" } });
});
;define("client/templates/editor", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "qO8TfHqL", "block": "{\"symbols\":[],\"statements\":[[7,\"main\"],[11,\"class\",\"grid-y grid-frame\"],[9],[0,\"\\n  \"],[7,\"nav\"],[11,\"class\",\"cell shrink\"],[9],[0,\"\\n    \"],[7,\"div\"],[11,\"class\",\"top-bar\"],[9],[0,\"\\n      \"],[7,\"div\"],[11,\"class\",\"top-bar-left\"],[9],[0,\"\\n        \"],[7,\"ul\"],[11,\"class\",\"menu dropdown\"],[11,\"role\",\"menubar\"],[9],[0,\"\\n          \"],[7,\"li\"],[11,\"class\",\"menu-text\"],[9],[0,\"TEI Editor\"],[10],[0,\"\\n          \"],[7,\"li\"],[11,\"title\",\"Open a project from the cloud\"],[11,\"role\",\"menuitem\"],[9],[0,\"\\n\"],[4,\"link-to\",[\"editor.repositories\"],null,{\"statements\":[[0,\"              \"],[7,\"svg\"],[11,\"viewBox\",\"0 0 24 24\"],[11,\"class\",\"icon\"],[9],[0,\"\\n                \"],[7,\"path\"],[11,\"d\",\"M13,18H14A1,1 0 0,1 15,19H22V21H15A1,1 0 0,1 14,22H10A1,1 0 0,1 9,21H2V19H9A1,1 0 0,1 10,18H11V16H4A1,1 0 0,1 3,15V11A1,1 0 0,1 4,10H20A1,1 0 0,1 21,11V15A1,1 0 0,1 20,16H13V18M4,2H20A1,1 0 0,1 21,3V7A1,1 0 0,1 20,8H4A1,1 0 0,1 3,7V3A1,1 0 0,1 4,2M9,6H10V4H9V6M9,14H10V12H9V14M5,4V6H7V4H5M5,12V14H7V12H5Z\"],[9],[10],[0,\"\\n              \"],[10],[0,\"\\n\"]],\"parameters\":[]},null],[0,\"          \"],[10],[0,\"\\n\"],[4,\"if\",[[23,[\"selected_repository\"]]],null,{\"statements\":[[0,\"            \"],[7,\"li\"],[11,\"class\",\"menu-text\"],[9],[1,[23,[\"selected_repository\",\"title\"]],false],[10],[0,\"\\n            \"],[7,\"li\"],[11,\"title\",\"Synchronise the project with the cloud\"],[11,\"role\",\"menuitem\"],[9],[0,\"\\n              \"],[7,\"a\"],[11,\"href\",\"#\"],[9],[0,\"\\n                \"],[7,\"svg\"],[11,\"viewBox\",\"0 0 24 24\"],[11,\"class\",\"icon\"],[9],[0,\"\\n                  \"],[7,\"path\"],[11,\"d\",\"M12,18A6,6 0 0,1 6,12C6,11 6.25,10.03 6.7,9.2L5.24,7.74C4.46,8.97 4,10.43 4,12A8,8 0 0,0 12,20V23L16,19L12,15M12,4V1L8,5L12,9V6A6,6 0 0,1 18,12C18,13 17.75,13.97 17.3,14.8L18.76,16.26C19.54,15.03 20,13.57 20,12A8,8 0 0,0 12,4Z\"],[9],[10],[0,\"\\n                \"],[10],[0,\"\\n              \"],[10],[0,\"\\n            \"],[10],[0,\"\\n            \"],[7,\"li\"],[11,\"class\",\"separator\"],[9],[10],[0,\"\\n            \"],[7,\"li\"],[11,\"title\",\"Open a file for editing\"],[11,\"role\",\"menuitem\"],[9],[0,\"\\n\"],[4,\"link-to\",[\"editor.files\",[23,[\"selected_repository\",\"id\"]]],null,{\"statements\":[[0,\"                \"],[7,\"svg\"],[11,\"viewBox\",\"0 0 24 24\"],[11,\"class\",\"icon\"],[9],[0,\"\\n                  \"],[7,\"path\"],[11,\"d\",\"M13,9V3.5L18.5,9M6,2C4.89,2 4,2.89 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2H6Z\"],[9],[10],[0,\"\\n                \"],[10],[0,\"\\n\"]],\"parameters\":[]},null],[0,\"            \"],[10],[0,\"\\n\"],[4,\"if\",[[23,[\"selected_file\"]]],null,{\"statements\":[[0,\"              \"],[7,\"li\"],[11,\"class\",\"menu-text\"],[9],[1,[23,[\"selected_file\",\"basename\"]],false],[10],[0,\"\\n\"],[4,\"if\",[[23,[\"selected_file\",\"hasDirtyAttributes\"]]],null,{\"statements\":[[0,\"                \"],[7,\"li\"],[11,\"title\",\"Save changes to the file\"],[11,\"role\",\"menuitem\"],[9],[0,\"\\n                  \"],[7,\"a\"],[11,\"href\",\"#\"],[3,\"action\",[[22,0,[]],\"save_file\"]],[9],[0,\"\\n                    \"],[7,\"svg\"],[11,\"viewBox\",\"0 0 24 24\"],[11,\"class\",\"icon\"],[9],[0,\"\\n                      \"],[7,\"path\"],[11,\"d\",\"M15,9H5V5H15M12,19A3,3 0 0,1 9,16A3,3 0 0,1 12,13A3,3 0 0,1 15,16A3,3 0 0,1 12,19M17,3H5C3.89,3 3,3.9 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V7L17,3Z\"],[9],[10],[0,\"\\n                    \"],[10],[0,\"\\n                  \"],[10],[0,\"\\n                \"],[10],[0,\"\\n                \"],[7,\"li\"],[11,\"title\",\"Discard changes to the file\"],[11,\"role\",\"menuitem\"],[9],[0,\"\\n                  \"],[7,\"a\"],[11,\"href\",\"#\"],[3,\"action\",[[22,0,[]],\"reset_file\"]],[9],[0,\"\\n                    \"],[7,\"svg\"],[11,\"viewBox\",\"0 0 24 24\"],[11,\"class\",\"icon\"],[9],[0,\"\\n                      \"],[7,\"path\"],[11,\"d\",\"M13,9H18.5L13,3.5V9M6,2H14L20,8V20A2,2 0 0,1 18,22H6C4.89,22 4,21.1 4,20V4C4,2.89 4.89,2 6,2M12.16,14.31C10.6,14.31 9.19,14.89 8.11,15.83L6,13.72V19H11.28L9.15,16.88C9.97,16.2 11,15.78 12.16,15.78C14.23,15.78 16,17.13 16.61,19L18,18.54C17.19,16.09 14.88,14.31 12.16,14.31Z\"],[9],[10],[0,\"\\n                    \"],[10],[0,\"\\n                  \"],[10],[0,\"\\n                \"],[10],[0,\"\\n\"]],\"parameters\":[]},{\"statements\":[[0,\"              \"],[7,\"li\"],[11,\"class\",\"menu-icon-disabled\"],[9],[0,\"\\n                \"],[7,\"span\"],[9],[0,\"\\n                  \"],[7,\"svg\"],[11,\"viewBox\",\"0 0 24 24\"],[11,\"class\",\"icon\"],[9],[0,\"\\n                    \"],[7,\"path\"],[11,\"d\",\"M15,9H5V5H15M12,19A3,3 0 0,1 9,16A3,3 0 0,1 12,13A3,3 0 0,1 15,16A3,3 0 0,1 12,19M17,3H5C3.89,3 3,3.9 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V7L17,3Z\"],[9],[10],[0,\"\\n                  \"],[10],[0,\"\\n                \"],[10],[0,\"\\n              \"],[10],[0,\"\\n              \"],[7,\"li\"],[11,\"class\",\"menu-icon-disabled\"],[9],[0,\"\\n                \"],[7,\"span\"],[9],[0,\"\\n                  \"],[7,\"svg\"],[11,\"viewBox\",\"0 0 24 24\"],[11,\"class\",\"icon\"],[9],[0,\"\\n                    \"],[7,\"path\"],[11,\"d\",\"M13,9H18.5L13,3.5V9M6,2H14L20,8V20A2,2 0 0,1 18,22H6C4.89,22 4,21.1 4,20V4C4,2.89 4.89,2 6,2M12.16,14.31C10.6,14.31 9.19,14.89 8.11,15.83L6,13.72V19H11.28L9.15,16.88C9.97,16.2 11,15.78 12.16,15.78C14.23,15.78 16,17.13 16.61,19L18,18.54C17.19,16.09 14.88,14.31 12.16,14.31Z\"],[9],[10],[0,\"\\n                  \"],[10],[0,\"\\n                \"],[10],[0,\"\\n              \"],[10],[0,\"\\n\"]],\"parameters\":[]}]],\"parameters\":[]},null]],\"parameters\":[]},null],[0,\"        \"],[10],[0,\"\\n      \"],[10],[0,\"\\n      \"],[7,\"div\"],[11,\"class\",\"top-bar-right\"],[9],[0,\"\\n        \"],[7,\"ul\"],[11,\"class\",\"menu\"],[11,\"role\",\"menubar\"],[9],[0,\"\\n          \"],[7,\"li\"],[11,\"role\",\"menuitem\"],[9],[0,\"\\n            \"],[7,\"a\"],[11,\"href\",\"#\"],[11,\"title\",\"Log in\"],[9],[0,\"\\n              \"],[7,\"svg\"],[11,\"viewBox\",\"0 0 24 24\"],[11,\"class\",\"icon\"],[9],[0,\"\\n                  \"],[7,\"path\"],[11,\"d\",\"M10,17.25V14H3V10H10V6.75L15.25,12L10,17.25M8,2H17A2,2 0 0,1 19,4V20A2,2 0 0,1 17,22H8A2,2 0 0,1 6,20V16H8V20H17V4H8V8H6V4A2,2 0 0,1 8,2Z\"],[9],[10],[0,\"\\n              \"],[10],[0,\"\\n            \"],[10],[0,\"\\n          \"],[10],[0,\"\\n          \"],[7,\"li\"],[11,\"role\",\"menuitem\"],[9],[0,\"\\n            \"],[7,\"a\"],[11,\"href\",\"#\"],[11,\"title\",\"Log out\"],[9],[0,\"\\n              \"],[7,\"svg\"],[11,\"viewBox\",\"0 0 24 24\"],[11,\"class\",\"icon\"],[9],[0,\"\\n                  \"],[7,\"path\"],[11,\"d\",\"M10,17.25V14H3V10H10V6.75L15.25,12L10,17.25M8,2H17A2,2 0 0,1 19,4V20A2,2 0 0,1 17,22H8A2,2 0 0,1 6,20V16H8V20H17V4H8V8H6V4A2,2 0 0,1 8,2Z\"],[9],[10],[0,\"\\n              \"],[10],[0,\"\\n            \"],[10],[0,\"\\n          \"],[10],[0,\"\\n        \"],[10],[0,\"\\n      \"],[10],[0,\"\\n    \"],[10],[0,\"\\n  \"],[10],[0,\"\\n  \"],[7,\"article\"],[11,\"class\",\"cell auto cell-block-container grid-padding-x\"],[9],[0,\"\\n    \"],[1,[21,\"outlet\"],false],[0,\"\\n  \"],[10],[0,\"\\n\"],[10],[0,\"\\n\"]],\"hasEval\":false}", "meta": { "moduleName": "client/templates/editor.hbs" } });
});
;define("client/templates/editor/file", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "rMj6eLhZ", "block": "{\"symbols\":[],\"statements\":[[7,\"div\"],[11,\"class\",\"cell shrink\"],[9],[0,\"\\n  \"],[7,\"h1\"],[9],[1,[23,[\"model\",\"filename\"]],false],[10],[0,\"\\n\"],[10],[0,\"\\n\"],[7,\"div\"],[11,\"class\",\"cell auto grid-x grid-padding-x\"],[9],[0,\"\\n  \"],[7,\"div\"],[11,\"class\",\"cell small-6 cell-block-container\"],[9],[0,\"\\n    \"],[7,\"div\"],[11,\"class\",\"cell shrink\"],[9],[0,\"\\n      \"],[7,\"ul\"],[11,\"class\",\"tabs\"],[9],[0,\"\\n        \"],[7,\"li\"],[11,\"class\",\"tabs-title is-active\"],[9],[7,\"a\"],[11,\"href\",\"#\"],[12,\"onclick\",[27,\"action\",[[22,0,[]],\"select-tab-panel\",\"#file-metadata\"],null]],[11,\"aria-selected\",\"true\"],[9],[0,\"Metadata\"],[10],[10],[0,\"\\n        \"],[7,\"li\"],[11,\"class\",\"tabs-title\"],[9],[7,\"a\"],[11,\"href\",\"#\"],[12,\"onclick\",[27,\"action\",[[22,0,[]],\"select-tab-panel\",\"#file-annotations\"],null]],[9],[0,\"Annotations\"],[10],[10],[0,\"\\n      \"],[10],[0,\"\\n    \"],[10],[0,\"\\n    \"],[7,\"div\"],[11,\"class\",\"cell auto cell-block-y\"],[9],[0,\"\\n      \"],[7,\"div\"],[11,\"class\",\"tabs-content full-height\"],[9],[0,\"\\n        \"],[7,\"div\"],[11,\"id\",\"file-metadata\"],[11,\"class\",\"tabs-panel is-active full-height\"],[9],[0,\"\\n          \"],[7,\"div\"],[11,\"class\",\"grid-x grid-padding-x full-height\"],[9],[0,\"\\n            \"],[7,\"div\"],[11,\"class\",\"cell small-6 cell-block-y\"],[9],[0,\"\\n              \"],[7,\"ul\"],[11,\"class\",\"no-bullet\"],[9],[1,[27,\"xml-tree-editor\",null,[[\"node\",\"click-node-title\",\"notify-model-change\"],[[23,[\"model\",\"header\"]],[27,\"action\",[[22,0,[]],\"select-metadata-node\"],null],[27,\"action\",[[22,0,[]],\"notify-model-change\"],null]]]],false],[10],[0,\"\\n            \"],[10],[0,\"\\n            \"],[7,\"div\"],[11,\"class\",\"cell small-6 cell-block-y\"],[9],[0,\"\\n\"],[4,\"if\",[[23,[\"selected_metadata_node\"]]],null,{\"statements\":[[0,\"                \"],[1,[27,\"node-editor\",null,[[\"node\",\"edit_tail\",\"notify-model-change\"],[[23,[\"selected_metadata_node\"]],false,[27,\"action\",[[22,0,[]],\"notify-model-change\"],null]]]],false],[0,\"\\n\"]],\"parameters\":[]},null],[0,\"            \"],[10],[0,\"\\n          \"],[10],[0,\"\\n        \"],[10],[0,\"\\n        \"],[7,\"div\"],[11,\"id\",\"file-annotations\"],[11,\"class\",\"tabs-panel full-height\"],[9],[0,\"\\n          \"],[7,\"p\"],[9],[0,\"Suspendisse dictum feugiat nisl ut dapibus.  Vivamus hendrerit arcu sed erat molestie vehicula. Ut in nulla enim. Phasellus molestie magna non est bibendum non venenatis nisl tempor.  Sed auctor neque eu tellus rhoncus ut eleifend nibh porttitor.\"],[10],[0,\"\\n        \"],[10],[0,\"\\n      \"],[10],[0,\"\\n    \"],[10],[0,\"\\n  \"],[10],[0,\"\\n  \"],[7,\"div\"],[11,\"class\",\"cell small-6 full-height\"],[9],[0,\"\\n    \"],[1,[27,\"body-editor\",null,[[\"body\"],[[23,[\"model\",\"body\"]]]]],false],[0,\"\\n  \"],[10],[0,\"\\n\"],[10],[0,\"\\n\"]],\"hasEval\":false}", "meta": { "moduleName": "client/templates/editor/file.hbs" } });
});
;define("client/templates/editor/files", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "uUBRcDCz", "block": "{\"symbols\":[\"filename\",\"key\"],\"statements\":[[7,\"div\"],[11,\"class\",\"cell\"],[9],[0,\"\\n  \"],[7,\"h1\"],[9],[0,\"Select the file to load\"],[10],[0,\"\\n  \"],[7,\"ul\"],[11,\"class\",\"menu vertical\"],[11,\"role\",\"menubar\"],[9],[0,\"\\n\"],[4,\"each\",[[27,\"-each-in\",[[23,[\"model\",\"tei_files\"]]],null]],null,{\"statements\":[[0,\"      \"],[7,\"li\"],[11,\"role\",\"menuitem\"],[9],[7,\"a\"],[11,\"href\",\"#\"],[3,\"action\",[[22,0,[]],\"select-file\",[23,[\"model\",\"id\"]],[22,2,[]]]],[9],[1,[22,1,[]],false],[10],[10],[0,\"\\n\"]],\"parameters\":[1,2]},null],[0,\"  \"],[10],[0,\"\\n\"],[10],[0,\"\\n\"]],\"hasEval\":false}", "meta": { "moduleName": "client/templates/editor/files.hbs" } });
});
;define("client/templates/editor/repositories", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "1S02z+p6", "block": "{\"symbols\":[\"repository\"],\"statements\":[[7,\"div\"],[11,\"class\",\"cell\"],[9],[0,\"\\n  \"],[7,\"h1\"],[9],[0,\"Select the Project to load\"],[10],[0,\"\\n  \"],[7,\"ul\"],[11,\"class\",\"menu vertical\"],[11,\"role\",\"menubar\"],[9],[0,\"\\n\"],[4,\"each\",[[23,[\"model\"]]],null,{\"statements\":[[0,\"      \"],[7,\"li\"],[11,\"role\",\"menuitem\"],[9],[7,\"a\"],[11,\"href\",\"#\"],[3,\"action\",[[22,0,[]],\"select-repository\",[22,1,[\"id\"]]]],[9],[1,[22,1,[\"title\"]],false],[10],[10],[0,\"\\n\"]],\"parameters\":[1]},null],[0,\"  \"],[10],[0,\"\\n\"],[10],[0,\"\\n\"]],\"hasEval\":false}", "meta": { "moduleName": "client/templates/editor/repositories.hbs" } });
});
;define("client/templates/editor/repository", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "/b8tmMLt", "block": "{\"symbols\":[],\"statements\":[[7,\"div\"],[11,\"class\",\"cell\"],[9],[0,\"\\n  \"],[7,\"h1\"],[9],[1,[23,[\"model\",\"title\"]],false],[10],[0,\"\\n\"],[10],[0,\"\\n\"]],\"hasEval\":false}", "meta": { "moduleName": "client/templates/editor/repository.hbs" } });
});
;

;define('client/config/environment', [], function() {
  var prefix = 'client';
try {
  var metaName = prefix + '/config/environment';
  var rawConfig = document.querySelector('meta[name="' + metaName + '"]').getAttribute('content');
  var config = JSON.parse(unescape(rawConfig));

  var exports = { 'default': config };

  Object.defineProperty(exports, '__esModule', { value: true });

  return exports;
}
catch(err) {
  throw new Error('Could not read config from meta tag with name "' + metaName + '".');
}

});

;
          if (!runningTests) {
            require("client/app")["default"].create({"name":"client","version":"0.0.0+43b7b951"});
          }
        
//# sourceMappingURL=client.map
