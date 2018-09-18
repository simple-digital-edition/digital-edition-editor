import Controller from '@ember/controller';

export default Controller.extend({
    selected_file: null,
    actions: {
        synchronise: function() {
            this.get('model').save()
        }
    }
});
