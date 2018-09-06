import Component from '@ember/component';

export default Component.extend({
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
        if(this.is_nested) {
            this.set('submenu', true);
            this.set('isDropdownSubmenu', true);
            this.set('vertical', true);
        } else {
            this.set('dropdown', true);
        }
  }
});
