import Controller from '@ember/controller';
import {inject} from '@ember/controller';
import {inject as service} from '@ember/service';

export default Controller.extend({
    selected_repository: null,
    selected_file: null,
    file_component: inject('editor.file'),
    session: service(),

    actions: {
        select_repository: function(repository_id) {
            this.transitionToRoute('editor.repository', repository_id)
        },
        reset_file: function() {
            this.get('file_component').get('model').reload()
            this.get('file_component').set('selected_metadata_node', null)
        },
        save_file: function() {
            this.get('selected_file').save()
        },
        logout: function() {
            this.get('session').invalidate()
        }
    }
});
