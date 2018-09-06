import Component from '@ember/component';

export default Component.extend({
    tagName: 'li',
    classNameBindings: [
        'has_children:is-dropdown-submenu-parent',
        'is_nested:is-submenu-item',
        'is_nested:is-dropdown-submenu-item',
        'has_children:opens-right',
        'item.is_active:is-active'
    ],
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
            if(this.get('item.action')) {
                this.get('onaction')(this.get('item.action'), this.get('item.id'));
            }
        }
    }
});
