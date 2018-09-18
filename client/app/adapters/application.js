import DS from 'ember-data';
import { inject as service } from '@ember/service';
import { computed } from '@ember/object';

export default DS.JSONAPIAdapter.extend({
    session: service(),
    headers: computed('session.data.authenticated.token', function() {
        return {
            'Authorization': 'Bearer ' + this.session.data.authenticated.token
        }
    })
});
