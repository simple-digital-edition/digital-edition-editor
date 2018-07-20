import Controller from '@ember/controller';

export default Controller.extend({
    actions: {
        'select-repository': function(rid) {
            this.transitionToRoute('editor.repository', rid);
        }
    }
});
