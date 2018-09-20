import Component from '@ember/component';

export default Component.extend({
    classNameBindings: ['is_active:is-active'],
    
    actions: {
        toggle: function() {
            this.set('is_active', !this.get('is_active'))
        }
    }
});
