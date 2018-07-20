import Controller from '@ember/controller';

export default Controller.extend({
    selected_metadata_node: null,

    actions: {
        'select-metadata-node': function(node) {
            this.set('selected_metadata_node', node);
        },
        'notify-model-change': function() {
            this.get('model').send('becomeDirty');
        }
    }
});
