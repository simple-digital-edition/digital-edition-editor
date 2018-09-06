import Component from '@ember/component';

export default Component.extend({
    tagName: 'li',
    classNameBindings: [
        'has_children:is-dropdown-submenu-parent',
        'is_nested:is-submenu-item',
        'is_nested:is-dropdown-submenu-item',
        'has_children:opens-right',
        'is_active:is-active'
    ],
    is_focus: false,
    has_children: false,
    is_nested: false,
    is_active: false,

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
            this.set('is_active', !this.get('is_active'));
        }
    }
});
