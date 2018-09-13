import Base from 'ember-simple-auth/authenticators/base';
import {inject as service} from '@ember/service';
import {Promise} from 'rsvp';

export default Base.extend({
    store: service(),

    restore(data) {
    },

    authenticate(username, password) {
        let authenticator = this
        return new Promise((resolve, reject) => {
            authenticator.store.queryRecord('user', {
                filter: {
                    username: username,
                    password: password
                }
            }).then((data) => {
                console.log(data)
                resolve()
            }).catch((data) => {
                reject('Username or password incorrect or unknown')
            })
        })
    },

    invalidate(data) {
    }
});
