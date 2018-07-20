import Controller from '@ember/controller';

export default Controller.extend({
    selected_file: null,
    actions: {
        select_file: function(file_id) {
            this.transitionToRoute('editor.repository.file', file_id);
        }
    }
});
