import Component from '@ember/component';
import {set} from '@ember/object';

export default Component.extend({
    tagName: 'ul',
    classNames: ['tabs'],

    actions: {
        'select-tab': function(tab) {
            let tabs = this.get('tabs')
            tabs.forEach((old_tab) => {
                set(old_tab, 'is_active', false)
            })
            set(tab, 'is_active', true)
        }
    }
});
