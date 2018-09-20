import Component from '@ember/component';
import { computed } from '@ember/object';

export default Component.extend({
    classNames: ['tabs-panel', 'full-height'],
    classNameBindings: ['tab.is_active:is-active'],
    tab: computed('tabs', 'idx', function() {
        return this.get('tabs.' + this.get('idx'))
    })
});
