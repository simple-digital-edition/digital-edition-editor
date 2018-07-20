"use strict";



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
;define('client/components/body-editor', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Component.extend({});
});
;define('client/components/body-tag-editor', ['exports'], function (exports) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.default = Ember.Component.extend({
        tagName: 'li',
        classNames: ['hover-parent', 'position-relative', 'body-tag-editor'],
        mode: 'display',

        actions: {
            'start-edit': function () {
                this.set('mode', 'edit');
            },
            'save-edit': function () {
                this.set('mode', 'display');
            },
            'cancel-edit': function () {
                this.set('mode', 'display');
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
;define('client/components/zf-accordion-menu', ['exports', 'ember-cli-foundation-6-sass/components/zf-accordion-menu'], function (exports, _zfAccordionMenu) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _zfAccordionMenu.default;
    }
  });
});
;define('client/components/zf-accordion', ['exports', 'ember-cli-foundation-6-sass/components/zf-accordion'], function (exports, _zfAccordion) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _zfAccordion.default;
    }
  });
});
;define('client/components/zf-callout', ['exports', 'ember-cli-foundation-6-sass/components/zf-callout'], function (exports, _zfCallout) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _zfCallout.default;
    }
  });
});
;define('client/components/zf-drilldown-menu', ['exports', 'ember-cli-foundation-6-sass/components/zf-drilldown-menu'], function (exports, _zfDrilldownMenu) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _zfDrilldownMenu.default;
    }
  });
});
;define('client/components/zf-dropdown-menu', ['exports', 'ember-cli-foundation-6-sass/components/zf-dropdown-menu'], function (exports, _zfDropdownMenu) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _zfDropdownMenu.default;
    }
  });
});
;define('client/components/zf-dropdown', ['exports', 'ember-cli-foundation-6-sass/components/zf-dropdown'], function (exports, _zfDropdown) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _zfDropdown.default;
    }
  });
});
;define('client/components/zf-magellan', ['exports', 'ember-cli-foundation-6-sass/components/zf-magellan'], function (exports, _zfMagellan) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _zfMagellan.default;
    }
  });
});
;define('client/components/zf-off-canvas', ['exports', 'ember-cli-foundation-6-sass/components/zf-off-canvas'], function (exports, _zfOffCanvas) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _zfOffCanvas.default;
    }
  });
});
;define('client/components/zf-orbit', ['exports', 'ember-cli-foundation-6-sass/components/zf-orbit'], function (exports, _zfOrbit) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _zfOrbit.default;
    }
  });
});
;define('client/components/zf-reveal', ['exports', 'ember-cli-foundation-6-sass/components/zf-reveal'], function (exports, _zfReveal) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _zfReveal.default;
    }
  });
});
;define('client/components/zf-slider', ['exports', 'ember-cli-foundation-6-sass/components/zf-slider'], function (exports, _zfSlider) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _zfSlider.default;
    }
  });
});
;define('client/components/zf-tabs', ['exports', 'ember-cli-foundation-6-sass/components/zf-tabs'], function (exports, _zfTabs) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _zfTabs.default;
    }
  });
});
;define('client/components/zf-tooltip', ['exports', 'ember-cli-foundation-6-sass/components/zf-tooltip'], function (exports, _zfTooltip) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _zfTooltip.default;
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
;define('client/initializers/zf-widget', ['exports', 'ember-cli-foundation-6-sass/initializers/zf-widget'], function (exports, _zfWidget) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _zfWidget.default;
    }
  });
  Object.defineProperty(exports, 'initialize', {
    enumerable: true,
    get: function () {
      return _zfWidget.initialize;
    }
  });
});
;define("client/instance-initializers/ember-data", ["exports", "ember-data/initialize-store-service"], function (exports, _initializeStoreService) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = {
    name: "ember-data",
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
  exports.default = Ember.HTMLBars.template({ "id": "sGhC0tck", "block": "{\"symbols\":[],\"statements\":[[1,[20,\"outlet\"],false],[0,\"\\n\"]],\"hasEval\":false}", "meta": { "moduleName": "client/templates/application.hbs" } });
});
;define("client/templates/components/body-editor", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "pRys3iLm", "block": "{\"symbols\":[\"elem\"],\"statements\":[[6,\"ol\"],[10,\"class\",\"no-bullet\"],[8],[0,\"\\n\"],[4,\"each\",[[22,[\"body\",\"children\"]]],null,{\"statements\":[[0,\"    \"],[1,[26,\"body-tag-editor\",null,[[\"elem\"],[[21,1,[]]]]],false],[0,\"\\n\"]],\"parameters\":[1]},null],[9],[0,\"\\n\"]],\"hasEval\":false}", "meta": { "moduleName": "client/templates/components/body-editor.hbs" } });
});
;define("client/templates/components/body-tag-editor", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "WqcyORNW", "block": "{\"symbols\":[],\"statements\":[[4,\"if\",[[26,\"eq\",[[22,[\"mode\"]],\"display\"],null]],null,{\"statements\":[[0,\"  \"],[1,[26,\"tei-tag-render\",null,[[\"elem\",\"tagName\",\"classNames\"],[[22,[\"elem\"]],[26,\"tei-tag-mapper\",[[22,[\"elem\",\"tag\"]]],null],[22,[\"elem\",\"attrib\",\"style\"]]]]],false],[0,\"\\n  \"],[6,\"ul\"],[10,\"class\",\"menu hover position-top-right\"],[10,\"role\",\"menubar\"],[8],[0,\"\\n    \"],[6,\"li\"],[8],[0,\"\\n      \"],[6,\"a\"],[10,\"href\",\"#\"],[10,\"role\",\"menuitem\"],[3,\"action\",[[21,0,[]],\"start-edit\"]],[8],[0,\"\\n        \"],[6,\"svg\"],[10,\"viewBox\",\"0 0 24 24\"],[10,\"class\",\"icon\"],[8],[0,\"\\n          \"],[6,\"path\"],[10,\"d\",\"M20.71,7.04C21.1,6.65 21.1,6 20.71,5.63L18.37,3.29C18,2.9 17.35,2.9 16.96,3.29L15.12,5.12L18.87,8.87M3,17.25V21H6.75L17.81,9.93L14.06,6.18L3,17.25Z\"],[8],[9],[0,\"\\n        \"],[9],[0,\"\\n      \"],[9],[0,\"\\n    \"],[9],[0,\"\\n  \"],[9],[0,\"\\n\"]],\"parameters\":[]},{\"statements\":[[0,\"  \"],[6,\"textarea\"],[8],[1,[26,\"tei-tag-source-code\",[[22,[\"elem\"]]],null],false],[9],[0,\"  \"],[6,\"ul\"],[10,\"class\",\"menu vertical hover position-top-right\"],[10,\"role\",\"menubar\"],[8],[0,\"\\n    \"],[6,\"li\"],[8],[0,\"\\n      \"],[6,\"a\"],[10,\"href\",\"#\"],[10,\"role\",\"menuitem\"],[3,\"action\",[[21,0,[]],\"save-edit\"]],[8],[0,\"\\n        \"],[6,\"svg\"],[10,\"viewBox\",\"0 0 24 24\"],[10,\"class\",\"icon\"],[8],[0,\"\\n          \"],[6,\"path\"],[10,\"d\",\"M21,7L9,19L3.5,13.5L4.91,12.09L9,16.17L19.59,5.59L21,7Z\"],[8],[9],[0,\"\\n        \"],[9],[0,\"\\n      \"],[9],[0,\"\\n      \"],[6,\"a\"],[10,\"href\",\"#\"],[10,\"role\",\"menuitem\"],[3,\"action\",[[21,0,[]],\"cancel-edit\"]],[8],[0,\"\\n        \"],[6,\"svg\"],[10,\"viewBox\",\"0 0 24 24\"],[10,\"class\",\"icon\"],[8],[0,\"\\n          \"],[6,\"path\"],[10,\"d\",\"M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z\"],[8],[9],[0,\"\\n        \"],[9],[0,\"\\n      \"],[9],[0,\"\\n    \"],[9],[0,\"\\n  \"],[9],[0,\"\\n\"]],\"parameters\":[]}]],\"hasEval\":false}", "meta": { "moduleName": "client/templates/components/body-tag-editor.hbs" } });
});
;define("client/templates/components/node-editor", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "KJK+Qcl/", "block": "{\"symbols\":[\"value\",\"key\"],\"statements\":[[6,\"div\"],[10,\"class\",\"grid-y\"],[8],[0,\"\\n  \"],[6,\"div\"],[10,\"class\",\"cell shrink\"],[8],[0,\"\\n    \"],[6,\"h2\"],[8],[1,[26,\"strip-tag-ns\",[[22,[\"node\",\"tag\"]]],null],false],[9],[0,\"\\n  \"],[9],[0,\"\\n\"],[4,\"if\",[[22,[\"edit_attributes\"]]],null,{\"statements\":[[0,\"    \"],[6,\"div\"],[10,\"class\",\"cell shrink\"],[8],[0,\"\\n      \"],[6,\"h3\"],[8],[0,\"Attributes\\n        \"],[6,\"a\"],[10,\"href\",\"#\"],[10,\"title\",\"Add an attribute\"],[3,\"action\",[[21,0,[]],\"add-attribute\",[22,[\"node\"]]]],[8],[0,\"\\n          \"],[6,\"svg\"],[10,\"viewBox\",\"0 0 24 24\"],[10,\"class\",\"icon small\"],[8],[0,\"\\n            \"],[6,\"path\"],[10,\"d\",\"M12,20C7.59,20 4,16.41 4,12C4,7.59 7.59,4 12,4C16.41,4 20,7.59 20,12C20,16.41 16.41,20 12,20M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M13,7H11V11H7V13H11V17H13V13H17V11H13V7Z\"],[8],[9],[0,\"\\n          \"],[9],[0,\"\\n        \"],[9],[0,\"\\n      \"],[9],[0,\"\\n    \"],[9],[0,\"\\n\"],[4,\"each\",[[26,\"-each-in\",[[22,[\"node\",\"attrib\"]]],null]],null,{\"statements\":[[0,\"      \"],[6,\"div\"],[10,\"class\",\"cell shrink\"],[8],[0,\"\\n        \"],[6,\"div\"],[10,\"class\",\"grid-x\"],[8],[0,\"\\n          \"],[6,\"div\"],[10,\"class\",\"cell auto\"],[8],[0,\"\\n            \"],[6,\"label\"],[8],[6,\"span\"],[11,\"title\",[26,\"format-tag-ns\",[[21,2,[]]],null]],[8],[1,[26,\"strip-tag-ns\",[[21,2,[]]],null],false],[9],[0,\"\\n              \"],[6,\"input\"],[11,\"value\",[21,1,[]]],[11,\"onchange\",[26,\"action\",[[21,0,[]],\"update-attribute\",[22,[\"node\"]],[21,2,[]]],null]],[10,\"type\",\"text\"],[8],[9],[0,\"\\n            \"],[9],[0,\"\\n          \"],[9],[0,\"\\n          \"],[6,\"div\"],[10,\"class\",\"cell shrink\"],[8],[0,\"\\n            \"],[6,\"a\"],[10,\"href\",\"#\"],[10,\"title\",\"Remove the attribute\"],[3,\"action\",[[21,0,[]],\"remove-attribute\",[22,[\"node\"]],[21,2,[]]]],[8],[0,\"\\n              \"],[6,\"svg\"],[10,\"viewBox\",\"0 0 24 24\"],[10,\"class\",\"icon small\"],[8],[0,\"\\n                \"],[6,\"path\"],[10,\"d\",\"M12,20C7.59,20 4,16.41 4,12C4,7.59 7.59,4 12,4C16.41,4 20,7.59 20,12C20,16.41 16.41,20 12,20M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M7,13H17V11H7\"],[8],[9],[0,\"\\n              \"],[9],[0,\"\\n            \"],[9],[0,\"\\n          \"],[9],[0,\"\\n        \"],[9],[0,\"\\n      \"],[9],[0,\"\\n\"]],\"parameters\":[1,2]},null]],\"parameters\":[]},null],[4,\"if\",[[26,\"or\",[[22,[\"edit_text\"]],[22,[\"edit_tail\"]]],null]],null,{\"statements\":[[0,\"    \"],[6,\"div\"],[10,\"class\",\"cell shrink\"],[8],[0,\"\\n      \"],[6,\"h3\"],[8],[0,\"Text\"],[9],[0,\"\\n    \"],[9],[0,\"\\n\"],[4,\"if\",[[22,[\"edit_text\"]]],null,{\"statements\":[[0,\"      \"],[6,\"div\"],[10,\"class\",\"cell shrink\"],[8],[0,\"\\n        \"],[6,\"label\"],[8],[0,\"Text\\n          \"],[6,\"input\"],[11,\"value\",[22,[\"node\",\"text\"]]],[11,\"onchange\",[26,\"action\",[[21,0,[]],\"update-text\",[22,[\"node\"]],\"text\"],null]],[10,\"type\",\"text\"],[8],[9],[0,\"\\n        \"],[9],[0,\"\\n      \"],[9],[0,\"\\n\"]],\"parameters\":[]},null],[4,\"if\",[[22,[\"edit_tail\"]]],null,{\"statements\":[[0,\"      \"],[6,\"div\"],[10,\"class\",\"cell shrink\"],[8],[0,\"\\n        \"],[6,\"label\"],[8],[0,\"Tail\\n          \"],[6,\"input\"],[11,\"value\",[22,[\"node\",\"tail\"]]],[11,\"onchange\",[26,\"action\",[[21,0,[]],\"update-text\",[22,[\"node\"]],\"tail\"],null]],[10,\"type\",\"text\"],[8],[9],[0,\"\\n        \"],[9],[0,\"\\n      \"],[9],[0,\"\\n\"]],\"parameters\":[]},null]],\"parameters\":[]},null],[9],[0,\"\\n\"]],\"hasEval\":false}", "meta": { "moduleName": "client/templates/components/node-editor.hbs" } });
});
;define("client/templates/components/tei-tag-render", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "UwdlAPLs", "block": "{\"symbols\":[\"child\"],\"statements\":[[1,[22,[\"elem\",\"text\"]],false],[4,\"each\",[[22,[\"elem\",\"children\"]]],null,{\"statements\":[[1,[26,\"tei-tag-render\",null,[[\"tag\",\"tagName\",\"classNames\"],[[21,1,[]],[26,\"tei-tag-mapper\",[[21,1,[\"tag\"]]],null],[21,1,[\"attrib\",\"style\"]]]]],false],[1,[22,[\"elem\",\"tail\"]],false]],\"parameters\":[1]},null],[0,\"\\n\"]],\"hasEval\":false}", "meta": { "moduleName": "client/templates/components/tei-tag-render.hbs" } });
});
;define("client/templates/components/tree-view", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "KvHe6ihx", "block": "{\"symbols\":[\"child\"],\"statements\":[[6,\"li\"],[8],[0,\"\\n  \"],[6,\"div\"],[10,\"class\",\"ellipsis hover-parent\"],[8],[0,\"\\n    \"],[6,\"a\"],[10,\"href\",\"#\"],[11,\"title\",[26,\"format-tag-ns\",[[22,[\"node\",\"tag\"]]],null]],[3,\"action\",[[21,0,[]],[22,[\"click-node-title\"]],[22,[\"node\"]]]],[8],[1,[26,\"strip-tag-ns\",[[22,[\"node\",\"tag\"]]],null],false],[9],[0,\"\\n    \"],[6,\"span\"],[10,\"class\",\"hover\"],[8],[0,\"\\n      \"],[6,\"a\"],[10,\"href\",\"#\"],[10,\"title\",\"Add a child node\"],[3,\"action\",[[21,0,[]],[22,[\"add-child-node\"]],[22,[\"node\"]]]],[8],[0,\"\\n        \"],[6,\"svg\"],[10,\"viewBox\",\"0 0 24 24\"],[10,\"class\",\"icon small\"],[8],[0,\"\\n          \"],[6,\"path\"],[10,\"d\",\"M12,20C7.59,20 4,16.41 4,12C4,7.59 7.59,4 12,4C16.41,4 20,7.59 20,12C20,16.41 16.41,20 12,20M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M13,7H11V11H7V13H11V17H13V13H17V11H13V7Z\"],[8],[9],[0,\"\\n        \"],[9],[0,\"\\n      \"],[9],[0,\"\\n      \"],[6,\"a\"],[10,\"href\",\"#\"],[10,\"title\",\"Remove this node\"],[3,\"action\",[[21,0,[]],[22,[\"remove-node\"]],[22,[\"parent\"]],[22,[\"node\"]]]],[8],[0,\"\\n        \"],[6,\"svg\"],[10,\"viewBox\",\"0 0 24 24\"],[10,\"class\",\"icon small\"],[8],[0,\"\\n          \"],[6,\"path\"],[10,\"d\",\"M12,20C7.59,20 4,16.41 4,12C4,7.59 7.59,4 12,4C16.41,4 20,7.59 20,12C20,16.41 16.41,20 12,20M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M7,13H17V11H7\"],[8],[9],[0,\"\\n        \"],[9],[0,\"\\n      \"],[9],[0,\"\\n      \"],[6,\"a\"],[10,\"href\",\"#\"],[10,\"title\",\"Move the node forward\"],[3,\"action\",[[21,0,[]],[22,[\"move-node-forward\"]],[22,[\"parent\"]],[22,[\"node\"]]]],[8],[0,\"\\n        \"],[6,\"svg\"],[10,\"viewBox\",\"0 0 24 24\"],[10,\"class\",\"icon small\"],[8],[0,\"\\n            \"],[6,\"path\"],[10,\"d\",\"M12,7L17,12H14V16H10V12H7L12,7M12,22A10,10 0 0,1 2,12A10,10 0 0,1 12,2A10,10 0 0,1 22,12A10,10 0 0,1 12,22M12,20A8,8 0 0,0 20,12A8,8 0 0,0 12,4A8,8 0 0,0 4,12A8,8 0 0,0 12,20Z\"],[8],[9],[0,\"\\n        \"],[9],[0,\"\\n      \"],[9],[0,\"\\n      \"],[6,\"a\"],[10,\"href\",\"#\"],[10,\"title\",\"Move the node backward\"],[3,\"action\",[[21,0,[]],[22,[\"move-node-backward\"]],[22,[\"parent\"]],[22,[\"node\"]]]],[8],[0,\"\\n        \"],[6,\"svg\"],[10,\"viewBox\",\"0 0 24 24\"],[10,\"class\",\"icon small\"],[8],[0,\"\\n            \"],[6,\"path\"],[10,\"d\",\"M12,17L7,12H10V8H14V12H17L12,17M12,2A10,10 0 0,1 22,12A10,10 0 0,1 12,22A10,10 0 0,1 2,12A10,10 0 0,1 12,2M12,4A8,8 0 0,0 4,12A8,8 0 0,0 12,20A8,8 0 0,0 20,12A8,8 0 0,0 12,4Z\"],[8],[9],[0,\"\\n        \"],[9],[0,\"\\n      \"],[9],[0,\"\\n    \"],[9],[0,\"\\n    \"],[6,\"span\"],[10,\"class\",\"secondary\"],[8],[1,[22,[\"node\",\"text\"]],false],[9],[0,\"\\n  \"],[9],[0,\"\\n\"],[4,\"if\",[[22,[\"node\",\"children\"]]],null,{\"statements\":[[0,\"    \"],[6,\"ul\"],[10,\"class\",\"no-bullet\"],[10,\"style\",\"margin-left:1rem;\"],[8],[0,\"\\n      \"],[4,\"each\",[[22,[\"node\",\"children\"]]],null,{\"statements\":[[1,[26,\"tree-view\",null,[[\"node\",\"parent\",\"click-node-title\",\"add-child-node\",\"remove-node\",\"move-node-forward\",\"move-node-backward\"],[[21,1,[]],[22,[\"node\"]],[22,[\"click-node-title\"]],[22,[\"add-child-node\"]],[22,[\"remove-node\"]],[22,[\"move-node-forward\"]],[22,[\"move-node-backward\"]]]]],false]],\"parameters\":[1]},null],[0,\"\\n    \"],[9],[0,\"\\n\"]],\"parameters\":[]},null],[9],[0,\"\\n\"]],\"hasEval\":false}", "meta": { "moduleName": "client/templates/components/tree-view.hbs" } });
});
;define("client/templates/components/xml-tree-editor", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "O6HYf30S", "block": "{\"symbols\":[],\"statements\":[[1,[26,\"tree-view\",null,[[\"node\",\"parent\",\"click-node-title\",\"add-child-node\",\"remove-node\",\"move-node-forward\",\"move-node-backward\"],[[22,[\"node\"]],null,[26,\"action\",[[21,0,[]],[22,[\"click-node-title\"]]],null],[26,\"action\",[[21,0,[]],\"add-child-node\"],null],[26,\"action\",[[21,0,[]],\"remove-node\"],null],[26,\"action\",[[21,0,[]],\"move-node-forward\"],null],[26,\"action\",[[21,0,[]],\"move-node-backward\"],null]]]],false],[0,\"\\n\"]],\"hasEval\":false}", "meta": { "moduleName": "client/templates/components/xml-tree-editor.hbs" } });
});
;define("client/templates/editor", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "QHIBSpHY", "block": "{\"symbols\":[],\"statements\":[[6,\"main\"],[10,\"class\",\"grid-y grid-frame\"],[8],[0,\"\\n  \"],[6,\"nav\"],[10,\"class\",\"cell shrink\"],[8],[0,\"\\n    \"],[6,\"div\"],[10,\"class\",\"top-bar\"],[8],[0,\"\\n      \"],[6,\"div\"],[10,\"class\",\"top-bar-left\"],[8],[0,\"\\n        \"],[6,\"ul\"],[10,\"class\",\"menu dropdown\"],[10,\"role\",\"menubar\"],[8],[0,\"\\n          \"],[6,\"li\"],[10,\"class\",\"menu-text\"],[8],[0,\"TEI Editor\"],[9],[0,\"\\n          \"],[6,\"li\"],[10,\"title\",\"Open a project from the cloud\"],[10,\"role\",\"menuitem\"],[8],[0,\"\\n\"],[4,\"link-to\",[\"editor.repositories\"],null,{\"statements\":[[0,\"              \"],[6,\"svg\"],[10,\"viewBox\",\"0 0 24 24\"],[10,\"class\",\"icon\"],[8],[0,\"\\n                \"],[6,\"path\"],[10,\"d\",\"M17,13L12,18L7,13H10V9H14V13M19.35,10.03C18.67,6.59 15.64,4 12,4C9.11,4 6.6,5.64 5.35,8.03C2.34,8.36 0,10.9 0,14A6,6 0 0,0 6,20H19A5,5 0 0,0 24,15C24,12.36 21.95,10.22 19.35,10.03Z\"],[8],[9],[0,\"\\n              \"],[9],[0,\"\\n\"]],\"parameters\":[]},null],[0,\"          \"],[9],[0,\"\\n\"],[4,\"if\",[[22,[\"selected_repository\"]]],null,{\"statements\":[[0,\"            \"],[6,\"li\"],[10,\"class\",\"menu-text\"],[8],[1,[22,[\"selected_repository\",\"title\"]],false],[9],[0,\"\\n            \"],[6,\"li\"],[10,\"title\",\"Synchronise the project with the cloud\"],[10,\"role\",\"menuitem\"],[8],[0,\"\\n              \"],[6,\"a\"],[10,\"href\",\"#\"],[8],[0,\"\\n                \"],[6,\"svg\"],[10,\"viewBox\",\"0 0 24 24\"],[10,\"class\",\"icon\"],[8],[0,\"\\n                  \"],[6,\"path\"],[10,\"d\",\"M12,18A6,6 0 0,1 6,12C6,11 6.25,10.03 6.7,9.2L5.24,7.74C4.46,8.97 4,10.43 4,12A8,8 0 0,0 12,20V23L16,19L12,15M12,4V1L8,5L12,9V6A6,6 0 0,1 18,12C18,13 17.75,13.97 17.3,14.8L18.76,16.26C19.54,15.03 20,13.57 20,12A8,8 0 0,0 12,4Z\"],[8],[9],[0,\"\\n                \"],[9],[0,\"\\n              \"],[9],[0,\"\\n            \"],[9],[0,\"\\n            \"],[6,\"li\"],[10,\"class\",\"separator\"],[8],[9],[0,\"\\n            \"],[6,\"li\"],[10,\"title\",\"Open a file for editing\"],[10,\"role\",\"menuitem\"],[8],[0,\"\\n\"],[4,\"link-to\",[\"editor.files\",[22,[\"selected_repository\",\"id\"]]],null,{\"statements\":[[0,\"                \"],[6,\"svg\"],[10,\"viewBox\",\"0 0 24 24\"],[10,\"class\",\"icon\"],[8],[0,\"\\n                  \"],[6,\"path\"],[10,\"d\",\"M13,9V3.5L18.5,9M6,2C4.89,2 4,2.89 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2H6Z\"],[8],[9],[0,\"\\n                \"],[9],[0,\"\\n\"]],\"parameters\":[]},null],[0,\"            \"],[9],[0,\"\\n\"],[4,\"if\",[[22,[\"selected_file\"]]],null,{\"statements\":[[0,\"              \"],[6,\"li\"],[10,\"class\",\"menu-text\"],[8],[1,[22,[\"selected_file\",\"basename\"]],false],[9],[0,\"\\n\"],[4,\"if\",[[22,[\"selected_file\",\"hasDirtyAttributes\"]]],null,{\"statements\":[[0,\"                \"],[6,\"li\"],[10,\"title\",\"Save changes to the file\"],[10,\"role\",\"menuitem\"],[8],[0,\"\\n                  \"],[6,\"a\"],[10,\"href\",\"#\"],[3,\"action\",[[21,0,[]],\"save_file\"]],[8],[0,\"\\n                    \"],[6,\"svg\"],[10,\"viewBox\",\"0 0 24 24\"],[10,\"class\",\"icon\"],[8],[0,\"\\n                      \"],[6,\"path\"],[10,\"d\",\"M15,9H5V5H15M12,19A3,3 0 0,1 9,16A3,3 0 0,1 12,13A3,3 0 0,1 15,16A3,3 0 0,1 12,19M17,3H5C3.89,3 3,3.9 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V7L17,3Z\"],[8],[9],[0,\"\\n                    \"],[9],[0,\"\\n                  \"],[9],[0,\"\\n                \"],[9],[0,\"\\n                \"],[6,\"li\"],[10,\"title\",\"Discard changes to the file\"],[10,\"role\",\"menuitem\"],[8],[0,\"\\n                  \"],[6,\"a\"],[10,\"href\",\"#\"],[3,\"action\",[[21,0,[]],\"reset_file\"]],[8],[0,\"\\n                    \"],[6,\"svg\"],[10,\"viewBox\",\"0 0 24 24\"],[10,\"class\",\"icon\"],[8],[0,\"\\n                      \"],[6,\"path\"],[10,\"d\",\"M13,9H18.5L13,3.5V9M6,2H14L20,8V20A2,2 0 0,1 18,22H6C4.89,22 4,21.1 4,20V4C4,2.89 4.89,2 6,2M12.16,14.31C10.6,14.31 9.19,14.89 8.11,15.83L6,13.72V19H11.28L9.15,16.88C9.97,16.2 11,15.78 12.16,15.78C14.23,15.78 16,17.13 16.61,19L18,18.54C17.19,16.09 14.88,14.31 12.16,14.31Z\"],[8],[9],[0,\"\\n                    \"],[9],[0,\"\\n                  \"],[9],[0,\"\\n                \"],[9],[0,\"\\n\"]],\"parameters\":[]},{\"statements\":[[0,\"              \"],[6,\"li\"],[10,\"class\",\"menu-icon-disabled\"],[8],[0,\"\\n                \"],[6,\"span\"],[8],[0,\"\\n                  \"],[6,\"svg\"],[10,\"viewBox\",\"0 0 24 24\"],[10,\"class\",\"icon\"],[8],[0,\"\\n                    \"],[6,\"path\"],[10,\"d\",\"M15,9H5V5H15M12,19A3,3 0 0,1 9,16A3,3 0 0,1 12,13A3,3 0 0,1 15,16A3,3 0 0,1 12,19M17,3H5C3.89,3 3,3.9 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V7L17,3Z\"],[8],[9],[0,\"\\n                  \"],[9],[0,\"\\n                \"],[9],[0,\"\\n              \"],[9],[0,\"\\n              \"],[6,\"li\"],[10,\"class\",\"menu-icon-disabled\"],[8],[0,\"\\n                \"],[6,\"span\"],[8],[0,\"\\n                  \"],[6,\"svg\"],[10,\"viewBox\",\"0 0 24 24\"],[10,\"class\",\"icon\"],[8],[0,\"\\n                    \"],[6,\"path\"],[10,\"d\",\"M13,9H18.5L13,3.5V9M6,2H14L20,8V20A2,2 0 0,1 18,22H6C4.89,22 4,21.1 4,20V4C4,2.89 4.89,2 6,2M12.16,14.31C10.6,14.31 9.19,14.89 8.11,15.83L6,13.72V19H11.28L9.15,16.88C9.97,16.2 11,15.78 12.16,15.78C14.23,15.78 16,17.13 16.61,19L18,18.54C17.19,16.09 14.88,14.31 12.16,14.31Z\"],[8],[9],[0,\"\\n                  \"],[9],[0,\"\\n                \"],[9],[0,\"\\n              \"],[9],[0,\"\\n\"]],\"parameters\":[]}]],\"parameters\":[]},null]],\"parameters\":[]},null],[0,\"        \"],[9],[0,\"\\n      \"],[9],[0,\"\\n      \"],[6,\"div\"],[10,\"class\",\"top-bar-right\"],[8],[0,\"\\n        \"],[6,\"ul\"],[10,\"class\",\"menu\"],[10,\"role\",\"menubar\"],[8],[0,\"\\n          \"],[6,\"li\"],[10,\"role\",\"menuitem\"],[8],[0,\"\\n            \"],[6,\"a\"],[10,\"href\",\"#\"],[10,\"title\",\"Log in\"],[8],[0,\"\\n              \"],[6,\"svg\"],[10,\"viewBox\",\"0 0 24 24\"],[10,\"class\",\"icon\"],[8],[0,\"\\n                  \"],[6,\"path\"],[10,\"d\",\"M10,17.25V14H3V10H10V6.75L15.25,12L10,17.25M8,2H17A2,2 0 0,1 19,4V20A2,2 0 0,1 17,22H8A2,2 0 0,1 6,20V16H8V20H17V4H8V8H6V4A2,2 0 0,1 8,2Z\"],[8],[9],[0,\"\\n              \"],[9],[0,\"\\n            \"],[9],[0,\"\\n          \"],[9],[0,\"\\n          \"],[6,\"li\"],[10,\"role\",\"menuitem\"],[8],[0,\"\\n            \"],[6,\"a\"],[10,\"href\",\"#\"],[10,\"title\",\"Log out\"],[8],[0,\"\\n              \"],[6,\"svg\"],[10,\"viewBox\",\"0 0 24 24\"],[10,\"class\",\"icon\"],[8],[0,\"\\n                  \"],[6,\"path\"],[10,\"d\",\"M10,17.25V14H3V10H10V6.75L15.25,12L10,17.25M8,2H17A2,2 0 0,1 19,4V20A2,2 0 0,1 17,22H8A2,2 0 0,1 6,20V16H8V20H17V4H8V8H6V4A2,2 0 0,1 8,2Z\"],[8],[9],[0,\"\\n              \"],[9],[0,\"\\n            \"],[9],[0,\"\\n          \"],[9],[0,\"\\n        \"],[9],[0,\"\\n      \"],[9],[0,\"\\n    \"],[9],[0,\"\\n  \"],[9],[0,\"\\n  \"],[6,\"article\"],[10,\"class\",\"cell auto cell-block-container grid-padding-x\"],[8],[0,\"\\n    \"],[1,[20,\"outlet\"],false],[0,\"\\n  \"],[9],[0,\"\\n\"],[9],[0,\"\\n\"]],\"hasEval\":false}", "meta": { "moduleName": "client/templates/editor.hbs" } });
});
;define("client/templates/editor/file", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "oX4P1f3P", "block": "{\"symbols\":[],\"statements\":[[6,\"div\"],[10,\"class\",\"cell shrink\"],[8],[0,\"\\n  \"],[6,\"h1\"],[8],[1,[22,[\"model\",\"filename\"]],false],[9],[0,\"\\n\"],[9],[0,\"\\n\"],[6,\"div\"],[10,\"class\",\"cell auto grid-x grid-padding-x\"],[8],[0,\"\\n  \"],[6,\"div\"],[10,\"class\",\"cell small-6 cell-block-container\"],[8],[0,\"\\n    \"],[6,\"div\"],[10,\"class\",\"cell shrink\"],[8],[0,\"\\n      \"],[6,\"ul\"],[10,\"class\",\"tabs\"],[8],[0,\"\\n        \"],[6,\"li\"],[10,\"class\",\"tabs-title is-active\"],[8],[6,\"a\"],[10,\"href\",\"#\"],[11,\"onclick\",[26,\"action\",[[21,0,[]],\"select-tab-panel\",\"#file-metadata\"],null]],[10,\"aria-selected\",\"true\"],[8],[0,\"Metadata\"],[9],[9],[0,\"\\n        \"],[6,\"li\"],[10,\"class\",\"tabs-title\"],[8],[6,\"a\"],[10,\"href\",\"#\"],[11,\"onclick\",[26,\"action\",[[21,0,[]],\"select-tab-panel\",\"#file-annotations\"],null]],[8],[0,\"Annotations\"],[9],[9],[0,\"\\n      \"],[9],[0,\"\\n    \"],[9],[0,\"\\n    \"],[6,\"div\"],[10,\"class\",\"cell auto cell-block-y\"],[8],[0,\"\\n      \"],[6,\"div\"],[10,\"class\",\"tabs-content full-height\"],[8],[0,\"\\n        \"],[6,\"div\"],[10,\"id\",\"file-metadata\"],[10,\"class\",\"tabs-panel is-active full-height\"],[8],[0,\"\\n          \"],[6,\"div\"],[10,\"class\",\"grid-x grid-padding-x full-height\"],[8],[0,\"\\n            \"],[6,\"div\"],[10,\"class\",\"cell small-6 cell-block-y\"],[8],[0,\"\\n              \"],[6,\"ul\"],[10,\"class\",\"no-bullet\"],[8],[1,[26,\"xml-tree-editor\",null,[[\"node\",\"click-node-title\",\"notify-model-change\"],[[22,[\"model\",\"header\"]],[26,\"action\",[[21,0,[]],\"select-metadata-node\"],null],[26,\"action\",[[21,0,[]],\"notify-model-change\"],null]]]],false],[9],[0,\"\\n            \"],[9],[0,\"\\n            \"],[6,\"div\"],[10,\"class\",\"cell small-6 cell-block-y\"],[8],[0,\"\\n\"],[4,\"if\",[[22,[\"selected_metadata_node\"]]],null,{\"statements\":[[0,\"                \"],[1,[26,\"node-editor\",null,[[\"node\",\"edit_tail\",\"notify-model-change\"],[[22,[\"selected_metadata_node\"]],false,[26,\"action\",[[21,0,[]],\"notify-model-change\"],null]]]],false],[0,\"\\n\"]],\"parameters\":[]},null],[0,\"            \"],[9],[0,\"\\n          \"],[9],[0,\"\\n        \"],[9],[0,\"\\n        \"],[6,\"div\"],[10,\"id\",\"file-annotations\"],[10,\"class\",\"tabs-panel full-height\"],[8],[0,\"\\n          \"],[6,\"p\"],[8],[0,\"Suspendisse dictum feugiat nisl ut dapibus.  Vivamus hendrerit arcu sed erat molestie vehicula. Ut in nulla enim. Phasellus molestie magna non est bibendum non venenatis nisl tempor.  Sed auctor neque eu tellus rhoncus ut eleifend nibh porttitor.\"],[9],[0,\"\\n        \"],[9],[0,\"\\n      \"],[9],[0,\"\\n    \"],[9],[0,\"\\n  \"],[9],[0,\"\\n  \"],[6,\"div\"],[10,\"class\",\"cell small-6 auto-overflow\"],[8],[0,\"\\n    \"],[1,[26,\"body-editor\",null,[[\"body\"],[[22,[\"model\",\"body\"]]]]],false],[0,\"\\n  \"],[9],[0,\"\\n\"],[9],[0,\"\\n\"]],\"hasEval\":false}", "meta": { "moduleName": "client/templates/editor/file.hbs" } });
});
;define("client/templates/editor/files", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "MvL/+Fgy", "block": "{\"symbols\":[\"filename\",\"key\"],\"statements\":[[6,\"div\"],[10,\"class\",\"cell\"],[8],[0,\"\\n  \"],[6,\"h1\"],[8],[0,\"Select the file to load\"],[9],[0,\"\\n  \"],[6,\"ul\"],[10,\"class\",\"menu vertical\"],[10,\"role\",\"menubar\"],[8],[0,\"\\n\"],[4,\"each\",[[26,\"-each-in\",[[22,[\"model\",\"tei_files\"]]],null]],null,{\"statements\":[[0,\"      \"],[6,\"li\"],[10,\"role\",\"menuitem\"],[8],[6,\"a\"],[10,\"href\",\"#\"],[3,\"action\",[[21,0,[]],\"select-file\",[22,[\"model\",\"id\"]],[21,2,[]]]],[8],[1,[21,1,[]],false],[9],[9],[0,\"\\n\"]],\"parameters\":[1,2]},null],[0,\"  \"],[9],[0,\"\\n\"],[9],[0,\"\\n\"]],\"hasEval\":false}", "meta": { "moduleName": "client/templates/editor/files.hbs" } });
});
;define("client/templates/editor/repositories", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "0mKA1laP", "block": "{\"symbols\":[\"repository\"],\"statements\":[[6,\"div\"],[10,\"class\",\"cell\"],[8],[0,\"\\n  \"],[6,\"h1\"],[8],[0,\"Select the Project to load\"],[9],[0,\"\\n  \"],[6,\"ul\"],[10,\"class\",\"menu vertical\"],[10,\"role\",\"menubar\"],[8],[0,\"\\n\"],[4,\"each\",[[22,[\"model\"]]],null,{\"statements\":[[0,\"      \"],[6,\"li\"],[10,\"role\",\"menuitem\"],[8],[6,\"a\"],[10,\"href\",\"#\"],[3,\"action\",[[21,0,[]],\"select-repository\",[21,1,[\"id\"]]]],[8],[1,[21,1,[\"title\"]],false],[9],[9],[0,\"\\n\"]],\"parameters\":[1]},null],[0,\"  \"],[9],[0,\"\\n\"],[9],[0,\"\\n\"]],\"hasEval\":false}", "meta": { "moduleName": "client/templates/editor/repositories.hbs" } });
});
;define("client/templates/editor/repository", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "CpfVgEb4", "block": "{\"symbols\":[],\"statements\":[[6,\"div\"],[10,\"class\",\"cell\"],[8],[0,\"\\n  \"],[6,\"h1\"],[8],[1,[22,[\"model\",\"title\"]],false],[9],[0,\"\\n\"],[9],[0,\"\\n\"]],\"hasEval\":false}", "meta": { "moduleName": "client/templates/editor/repository.hbs" } });
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
            require("client/app")["default"].create({"name":"client","version":"0.0.0"});
          }
        
//# sourceMappingURL=client.map
