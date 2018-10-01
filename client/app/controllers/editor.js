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
            window.location.reload()
        },
        save_file: function() {
            this.get('selected_file').save()
        },
        logout: function() {
            let controller = this
            this.get('session').invalidate().then(() => {
                controller.transitionToRoute('editor')
            })
        }
    }
});
