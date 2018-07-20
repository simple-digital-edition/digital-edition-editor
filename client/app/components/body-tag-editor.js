import Component from '@ember/component';

export default Component.extend({
    tagName: 'li',
    classNames: ['hover-parent', 'position-relative', 'body-tag-editor'],
    mode: 'display',

    actions: {
        'start-edit': function() {
            this.set('mode', 'edit');
        },
        'save-edit': function() {
            this.set('mode', 'display');
        },
        'cancel-edit': function() {
            this.set('mode', 'display');
        }
    }
});
