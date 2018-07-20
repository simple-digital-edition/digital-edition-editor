'use strict';

define('client/tests/app.lint-test', [], function () {
  'use strict';

  QUnit.module('ESLint | app');

  QUnit.test('app.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'app.js should pass ESLint\n\n');
  });

  QUnit.test('components/body-editor.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'components/body-editor.js should pass ESLint\n\n');
  });

  QUnit.test('components/body-tag-editor.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'components/body-tag-editor.js should pass ESLint\n\n');
  });

  QUnit.test('components/node-editor.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'components/node-editor.js should pass ESLint\n\n');
  });

  QUnit.test('components/tei-tag-render.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'components/tei-tag-render.js should pass ESLint\n\n');
  });

  QUnit.test('components/tree-view.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'components/tree-view.js should pass ESLint\n\n');
  });

  QUnit.test('components/xml-tree-editor.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'components/xml-tree-editor.js should pass ESLint\n\n');
  });

  QUnit.test('controllers/editor.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'controllers/editor.js should pass ESLint\n\n');
  });

  QUnit.test('controllers/editor/file.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'controllers/editor/file.js should pass ESLint\n\n');
  });

  QUnit.test('controllers/editor/files.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'controllers/editor/files.js should pass ESLint\n\n');
  });

  QUnit.test('controllers/editor/repositories.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'controllers/editor/repositories.js should pass ESLint\n\n');
  });

  QUnit.test('controllers/editor/repository.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'controllers/editor/repository.js should pass ESLint\n\n');
  });

  QUnit.test('helpers/format-tag-ns.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'helpers/format-tag-ns.js should pass ESLint\n\n');
  });

  QUnit.test('helpers/strip-tag-ns.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'helpers/strip-tag-ns.js should pass ESLint\n\n');
  });

  QUnit.test('helpers/tei-tag-mapper.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'helpers/tei-tag-mapper.js should pass ESLint\n\n');
  });

  QUnit.test('helpers/tei-tag-source-code.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'helpers/tei-tag-source-code.js should pass ESLint\n\n');
  });

  QUnit.test('models/file.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'models/file.js should pass ESLint\n\n');
  });

  QUnit.test('models/repository.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'models/repository.js should pass ESLint\n\n');
  });

  QUnit.test('resolver.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'resolver.js should pass ESLint\n\n');
  });

  QUnit.test('router.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'router.js should pass ESLint\n\n');
  });

  QUnit.test('routes/editor.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'routes/editor.js should pass ESLint\n\n');
  });

  QUnit.test('routes/editor/file.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'routes/editor/file.js should pass ESLint\n\n');
  });

  QUnit.test('routes/editor/files.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'routes/editor/files.js should pass ESLint\n\n');
  });

  QUnit.test('routes/editor/repositories.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'routes/editor/repositories.js should pass ESLint\n\n');
  });

  QUnit.test('routes/editor/repository.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'routes/editor/repository.js should pass ESLint\n\n');
  });
});
define('client/tests/integration/components/body-editor-test', ['qunit', 'ember-qunit', '@ember/test-helpers'], function (_qunit, _emberQunit, _testHelpers) {
  'use strict';

  (0, _qunit.module)('Integration | Component | body-editor', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);

    (0, _qunit.test)('it renders', async function (assert) {
      // Set any properties with this.set('myProperty', 'value');
      // Handle any actions with this.set('myAction', function(val) { ... });

      await (0, _testHelpers.render)(Ember.HTMLBars.template({
        "id": "csyKz1Sv",
        "block": "{\"symbols\":[],\"statements\":[[1,[20,\"body-editor\"],false]],\"hasEval\":false}",
        "meta": {}
      }));

      assert.equal(this.element.textContent.trim(), '');

      // Template block usage:
      await (0, _testHelpers.render)(Ember.HTMLBars.template({
        "id": "sNf+yvWU",
        "block": "{\"symbols\":[],\"statements\":[[0,\"\\n\"],[4,\"body-editor\",null,null,{\"statements\":[[0,\"        template block text\\n\"]],\"parameters\":[]},null],[0,\"    \"]],\"hasEval\":false}",
        "meta": {}
      }));

      assert.equal(this.element.textContent.trim(), 'template block text');
    });
  });
});
define('client/tests/integration/components/body-tag-editor-test', ['qunit', 'ember-qunit', '@ember/test-helpers'], function (_qunit, _emberQunit, _testHelpers) {
  'use strict';

  (0, _qunit.module)('Integration | Component | body-tag-editor', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);

    (0, _qunit.test)('it renders', async function (assert) {
      // Set any properties with this.set('myProperty', 'value');
      // Handle any actions with this.set('myAction', function(val) { ... });

      await (0, _testHelpers.render)(Ember.HTMLBars.template({
        "id": "EorkQPeD",
        "block": "{\"symbols\":[],\"statements\":[[1,[20,\"body-tag-editor\"],false]],\"hasEval\":false}",
        "meta": {}
      }));

      assert.equal(this.element.textContent.trim(), '');

      // Template block usage:
      await (0, _testHelpers.render)(Ember.HTMLBars.template({
        "id": "nkFcZAAS",
        "block": "{\"symbols\":[],\"statements\":[[0,\"\\n\"],[4,\"body-tag-editor\",null,null,{\"statements\":[[0,\"        template block text\\n\"]],\"parameters\":[]},null],[0,\"    \"]],\"hasEval\":false}",
        "meta": {}
      }));

      assert.equal(this.element.textContent.trim(), 'template block text');
    });
  });
});
define('client/tests/integration/components/node-editor-test', ['qunit', 'ember-qunit', '@ember/test-helpers'], function (_qunit, _emberQunit, _testHelpers) {
  'use strict';

  (0, _qunit.module)('Integration | Component | node-editor', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);

    (0, _qunit.test)('it renders', async function (assert) {
      // Set any properties with this.set('myProperty', 'value');
      // Handle any actions with this.set('myAction', function(val) { ... });

      await (0, _testHelpers.render)(Ember.HTMLBars.template({
        "id": "Hs5ye3O3",
        "block": "{\"symbols\":[],\"statements\":[[1,[20,\"node-editor\"],false]],\"hasEval\":false}",
        "meta": {}
      }));

      assert.equal(this.element.textContent.trim(), '');

      // Template block usage:
      await (0, _testHelpers.render)(Ember.HTMLBars.template({
        "id": "epgKcr3T",
        "block": "{\"symbols\":[],\"statements\":[[0,\"\\n\"],[4,\"node-editor\",null,null,{\"statements\":[[0,\"        template block text\\n\"]],\"parameters\":[]},null],[0,\"    \"]],\"hasEval\":false}",
        "meta": {}
      }));

      assert.equal(this.element.textContent.trim(), 'template block text');
    });
  });
});
define('client/tests/integration/components/tei-tag-render-test', ['qunit', 'ember-qunit', '@ember/test-helpers'], function (_qunit, _emberQunit, _testHelpers) {
  'use strict';

  (0, _qunit.module)('Integration | Component | tei-tag-render', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);

    (0, _qunit.test)('it renders', async function (assert) {
      // Set any properties with this.set('myProperty', 'value');
      // Handle any actions with this.set('myAction', function(val) { ... });

      await (0, _testHelpers.render)(Ember.HTMLBars.template({
        "id": "60Y7bJCv",
        "block": "{\"symbols\":[],\"statements\":[[1,[20,\"tei-tag-render\"],false]],\"hasEval\":false}",
        "meta": {}
      }));

      assert.equal(this.element.textContent.trim(), '');

      // Template block usage:
      await (0, _testHelpers.render)(Ember.HTMLBars.template({
        "id": "7Jr+S/KN",
        "block": "{\"symbols\":[],\"statements\":[[0,\"\\n\"],[4,\"tei-tag-render\",null,null,{\"statements\":[[0,\"        template block text\\n\"]],\"parameters\":[]},null],[0,\"    \"]],\"hasEval\":false}",
        "meta": {}
      }));

      assert.equal(this.element.textContent.trim(), 'template block text');
    });
  });
});
define('client/tests/integration/components/tree-view-test', ['qunit', 'ember-qunit', '@ember/test-helpers'], function (_qunit, _emberQunit, _testHelpers) {
  'use strict';

  (0, _qunit.module)('Integration | Component | tree-view', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);

    (0, _qunit.test)('it renders', async function (assert) {
      // Set any properties with this.set('myProperty', 'value');
      // Handle any actions with this.set('myAction', function(val) { ... });

      await (0, _testHelpers.render)(Ember.HTMLBars.template({
        "id": "bQvAlBKm",
        "block": "{\"symbols\":[],\"statements\":[[1,[20,\"tree-view\"],false]],\"hasEval\":false}",
        "meta": {}
      }));

      assert.equal(this.element.textContent.trim(), '');

      // Template block usage:
      await (0, _testHelpers.render)(Ember.HTMLBars.template({
        "id": "nAx4nklJ",
        "block": "{\"symbols\":[],\"statements\":[[0,\"\\n\"],[4,\"tree-view\",null,null,{\"statements\":[[0,\"        template block text\\n\"]],\"parameters\":[]},null],[0,\"    \"]],\"hasEval\":false}",
        "meta": {}
      }));

      assert.equal(this.element.textContent.trim(), 'template block text');
    });
  });
});
define('client/tests/integration/components/xml-tree-editor-test', ['qunit', 'ember-qunit', '@ember/test-helpers'], function (_qunit, _emberQunit, _testHelpers) {
  'use strict';

  (0, _qunit.module)('Integration | Component | xml-tree-editor', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);

    (0, _qunit.test)('it renders', async function (assert) {
      // Set any properties with this.set('myProperty', 'value');
      // Handle any actions with this.set('myAction', function(val) { ... });

      await (0, _testHelpers.render)(Ember.HTMLBars.template({
        "id": "DWeojC6i",
        "block": "{\"symbols\":[],\"statements\":[[1,[20,\"xml-tree-editor\"],false]],\"hasEval\":false}",
        "meta": {}
      }));

      assert.equal(this.element.textContent.trim(), '');

      // Template block usage:
      await (0, _testHelpers.render)(Ember.HTMLBars.template({
        "id": "uqAR8NeT",
        "block": "{\"symbols\":[],\"statements\":[[0,\"\\n\"],[4,\"xml-tree-editor\",null,null,{\"statements\":[[0,\"        template block text\\n\"]],\"parameters\":[]},null],[0,\"    \"]],\"hasEval\":false}",
        "meta": {}
      }));

      assert.equal(this.element.textContent.trim(), 'template block text');
    });
  });
});
define('client/tests/integration/helpers/format-tag-ns-test', ['qunit', 'ember-qunit', '@ember/test-helpers'], function (_qunit, _emberQunit, _testHelpers) {
  'use strict';

  (0, _qunit.module)('Integration | Helper | format-tag-ns', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);

    // Replace this with your real tests.
    (0, _qunit.test)('it renders', async function (assert) {
      this.set('inputValue', '1234');

      await (0, _testHelpers.render)(Ember.HTMLBars.template({
        "id": "baYWnPOd",
        "block": "{\"symbols\":[],\"statements\":[[1,[26,\"format-tag-ns\",[[22,[\"inputValue\"]]],null],false]],\"hasEval\":false}",
        "meta": {}
      }));

      assert.equal(this.element.textContent.trim(), '1234');
    });
  });
});
define('client/tests/integration/helpers/strip-tag-ns-test', ['qunit', 'ember-qunit', '@ember/test-helpers'], function (_qunit, _emberQunit, _testHelpers) {
  'use strict';

  (0, _qunit.module)('Integration | Helper | strip-tag-ns', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);

    // Replace this with your real tests.
    (0, _qunit.test)('it renders', async function (assert) {
      this.set('inputValue', '1234');

      await (0, _testHelpers.render)(Ember.HTMLBars.template({
        "id": "7zUNYxPo",
        "block": "{\"symbols\":[],\"statements\":[[1,[26,\"strip-tag-ns\",[[22,[\"inputValue\"]]],null],false]],\"hasEval\":false}",
        "meta": {}
      }));

      assert.equal(this.element.textContent.trim(), '1234');
    });
  });
});
define('client/tests/integration/helpers/tei-tag-mapper-test', ['qunit', 'ember-qunit', '@ember/test-helpers'], function (_qunit, _emberQunit, _testHelpers) {
  'use strict';

  (0, _qunit.module)('Integration | Helper | tei-tag-mapper', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);

    // Replace this with your real tests.
    (0, _qunit.test)('it renders', async function (assert) {
      this.set('inputValue', '1234');

      await (0, _testHelpers.render)(Ember.HTMLBars.template({
        "id": "3Y3UgDdP",
        "block": "{\"symbols\":[],\"statements\":[[1,[26,\"tei-tag-mapper\",[[22,[\"inputValue\"]]],null],false]],\"hasEval\":false}",
        "meta": {}
      }));

      assert.equal(this.element.textContent.trim(), '1234');
    });
  });
});
define('client/tests/integration/helpers/tei-tag-source-code-test', ['qunit', 'ember-qunit', '@ember/test-helpers'], function (_qunit, _emberQunit, _testHelpers) {
  'use strict';

  (0, _qunit.module)('Integration | Helper | tei-tag-source-code', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);

    // Replace this with your real tests.
    (0, _qunit.test)('it renders', async function (assert) {
      this.set('inputValue', '1234');

      await (0, _testHelpers.render)(Ember.HTMLBars.template({
        "id": "uPW6G3Tg",
        "block": "{\"symbols\":[],\"statements\":[[1,[26,\"tei-tag-source-code\",[[22,[\"inputValue\"]]],null],false]],\"hasEval\":false}",
        "meta": {}
      }));

      assert.equal(this.element.textContent.trim(), '1234');
    });
  });
});
define('client/tests/test-helper', ['client/app', 'client/config/environment', '@ember/test-helpers', 'ember-qunit'], function (_app, _environment, _testHelpers, _emberQunit) {
  'use strict';

  (0, _testHelpers.setApplication)(_app.default.create(_environment.default.APP));

  (0, _emberQunit.start)();
});
define('client/tests/tests.lint-test', [], function () {
  'use strict';

  QUnit.module('ESLint | tests');

  QUnit.test('integration/components/body-editor-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/components/body-editor-test.js should pass ESLint\n\n');
  });

  QUnit.test('integration/components/body-tag-editor-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/components/body-tag-editor-test.js should pass ESLint\n\n');
  });

  QUnit.test('integration/components/node-editor-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/components/node-editor-test.js should pass ESLint\n\n');
  });

  QUnit.test('integration/components/tei-tag-render-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/components/tei-tag-render-test.js should pass ESLint\n\n');
  });

  QUnit.test('integration/components/tree-view-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/components/tree-view-test.js should pass ESLint\n\n');
  });

  QUnit.test('integration/components/xml-tree-editor-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/components/xml-tree-editor-test.js should pass ESLint\n\n');
  });

  QUnit.test('integration/helpers/format-tag-ns-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/helpers/format-tag-ns-test.js should pass ESLint\n\n');
  });

  QUnit.test('integration/helpers/strip-tag-ns-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/helpers/strip-tag-ns-test.js should pass ESLint\n\n');
  });

  QUnit.test('integration/helpers/tei-tag-mapper-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/helpers/tei-tag-mapper-test.js should pass ESLint\n\n');
  });

  QUnit.test('integration/helpers/tei-tag-source-code-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/helpers/tei-tag-source-code-test.js should pass ESLint\n\n');
  });

  QUnit.test('test-helper.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'test-helper.js should pass ESLint\n\n');
  });

  QUnit.test('unit/controllers/editor-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/controllers/editor-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/controllers/editor/file-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/controllers/editor/file-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/controllers/editor/files-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/controllers/editor/files-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/controllers/editor/repositories-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/controllers/editor/repositories-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/controllers/editor/repository-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/controllers/editor/repository-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/models/file-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/models/file-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/models/repository-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/models/repository-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/routes/editor-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/routes/editor-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/routes/editor/file-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/routes/editor/file-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/routes/editor/files-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/routes/editor/files-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/routes/editor/repositories-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/routes/editor/repositories-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/routes/editor/repository-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/routes/editor/repository-test.js should pass ESLint\n\n');
  });
});
define('client/tests/unit/controllers/editor-test', ['qunit', 'ember-qunit'], function (_qunit, _emberQunit) {
  'use strict';

  (0, _qunit.module)('Unit | Controller | editor', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);

    // Replace this with your real tests.
    (0, _qunit.test)('it exists', function (assert) {
      let controller = this.owner.lookup('controller:editor');
      assert.ok(controller);
    });
  });
});
define('client/tests/unit/controllers/editor/file-test', ['qunit', 'ember-qunit'], function (_qunit, _emberQunit) {
  'use strict';

  (0, _qunit.module)('Unit | Controller | editor/file', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);

    // Replace this with your real tests.
    (0, _qunit.test)('it exists', function (assert) {
      let controller = this.owner.lookup('controller:editor/file');
      assert.ok(controller);
    });
  });
});
define('client/tests/unit/controllers/editor/files-test', ['qunit', 'ember-qunit'], function (_qunit, _emberQunit) {
  'use strict';

  (0, _qunit.module)('Unit | Controller | editor/files', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);

    // Replace this with your real tests.
    (0, _qunit.test)('it exists', function (assert) {
      let controller = this.owner.lookup('controller:editor/files');
      assert.ok(controller);
    });
  });
});
define('client/tests/unit/controllers/editor/repositories-test', ['qunit', 'ember-qunit'], function (_qunit, _emberQunit) {
  'use strict';

  (0, _qunit.module)('Unit | Controller | editor/repositories', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);

    // Replace this with your real tests.
    (0, _qunit.test)('it exists', function (assert) {
      let controller = this.owner.lookup('controller:editor/repositories');
      assert.ok(controller);
    });
  });
});
define('client/tests/unit/controllers/editor/repository-test', ['qunit', 'ember-qunit'], function (_qunit, _emberQunit) {
  'use strict';

  (0, _qunit.module)('Unit | Controller | editor/repository', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);

    // Replace this with your real tests.
    (0, _qunit.test)('it exists', function (assert) {
      let controller = this.owner.lookup('controller:editor/repository');
      assert.ok(controller);
    });
  });
});
define('client/tests/unit/models/file-test', ['qunit', 'ember-qunit'], function (_qunit, _emberQunit) {
  'use strict';

  (0, _qunit.module)('Unit | Model | file', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);

    // Replace this with your real tests.
    (0, _qunit.test)('it exists', function (assert) {
      let store = this.owner.lookup('service:store');
      let model = store.createRecord('file', {});
      assert.ok(model);
    });
  });
});
define('client/tests/unit/models/repository-test', ['qunit', 'ember-qunit'], function (_qunit, _emberQunit) {
  'use strict';

  (0, _qunit.module)('Unit | Model | repository', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);

    // Replace this with your real tests.
    (0, _qunit.test)('it exists', function (assert) {
      let store = this.owner.lookup('service:store');
      let model = store.createRecord('repository', {});
      assert.ok(model);
    });
  });
});
define('client/tests/unit/routes/editor-test', ['qunit', 'ember-qunit'], function (_qunit, _emberQunit) {
  'use strict';

  (0, _qunit.module)('Unit | Route | editor', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);

    (0, _qunit.test)('it exists', function (assert) {
      let route = this.owner.lookup('route:editor');
      assert.ok(route);
    });
  });
});
define('client/tests/unit/routes/editor/file-test', ['qunit', 'ember-qunit'], function (_qunit, _emberQunit) {
  'use strict';

  (0, _qunit.module)('Unit | Route | editor/file', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);

    (0, _qunit.test)('it exists', function (assert) {
      let route = this.owner.lookup('route:editor/file');
      assert.ok(route);
    });
  });
});
define('client/tests/unit/routes/editor/files-test', ['qunit', 'ember-qunit'], function (_qunit, _emberQunit) {
  'use strict';

  (0, _qunit.module)('Unit | Route | editor/files', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);

    (0, _qunit.test)('it exists', function (assert) {
      let route = this.owner.lookup('route:editor/files');
      assert.ok(route);
    });
  });
});
define('client/tests/unit/routes/editor/repositories-test', ['qunit', 'ember-qunit'], function (_qunit, _emberQunit) {
  'use strict';

  (0, _qunit.module)('Unit | Route | editor/repositories', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);

    (0, _qunit.test)('it exists', function (assert) {
      let route = this.owner.lookup('route:editor/repositories');
      assert.ok(route);
    });
  });
});
define('client/tests/unit/routes/editor/repository-test', ['qunit', 'ember-qunit'], function (_qunit, _emberQunit) {
  'use strict';

  (0, _qunit.module)('Unit | Route | editor/repository', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);

    (0, _qunit.test)('it exists', function (assert) {
      let route = this.owner.lookup('route:editor/repository');
      assert.ok(route);
    });
  });
});
define('client/config/environment', [], function() {
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

require('client/tests/test-helper');
EmberENV.TESTS_FILE_LOADED = true;
//# sourceMappingURL=tests.map
