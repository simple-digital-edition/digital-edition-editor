import Controller from '@ember/controller';
import {later} from '@ember/runloop';
import {inject as service} from '@ember/service';

export default Controller.extend({
    ajax: service(),
    session: service(),
    config: service(),
    sync_button_text: 'Synchronise changes',
    sync_button_class: 'button',
    merge_button_text: 'Merge changes',
    merge_button_class: 'button',
    selected_file: null,

    actions: {
        synchronise: function() {
            this.set('sync_button_text', 'Synchronisation running...')
            this.set('sync_button_class', 'button secondary')
            this.get('model').save().then(() => {
                this.set('sync_button_text', 'Synchronisation complete')
                this.set('sync_button_class', 'button success')
                later(this, function() {
                    this.set('sync_button_text', 'Synchronise changes')
                    this.set('sync_button_class', 'button')
                }, 5000)
            }).catch(() => {
                this.set('sync_button_text', 'Synchronisation failed')
                this.set('sync_button_class', 'button alert')
            })
        },
        merge: function() {
            this.set('merge_button_text', 'Creating merge...')
            this.set('merge_button_class', 'button secondary')
            let namespace = this.get('config.api.namespace')
            if(namespace) {
                namespace = '/' + namespace
            }
            this.get('ajax').put(namespace + '/repositories/' + this.get('model.id'), {
                headers: {'Authorization': 'Bearer ' + this.get('session.data.authenticated.token')}
            }).then(() => {
                this.set('merge_button_text', 'Merge request created')
                this.set('merge_button_class', 'button success')
                later(this, function() {
                    this.set('merge_button_text', 'Merge changes')
                    this.set('merge_button_class', 'button')
                }, 10000)
            }).catch(({payload}) => {
                this.set('merge_errors', payload.message[0])
                this.set('merge_button_text', 'Merge request failed')
                this.set('merge_button_class', 'button alert')
            })
        }
    }
});
