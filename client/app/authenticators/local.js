import Base from 'ember-simple-auth/authenticators/base';
import {inject as service} from '@ember/service';
import {Promise} from 'rsvp';

export default Base.extend({
    store: service(),

    restore(data) {
        let authenticator = this
        data = data || {}
        return new Promise((resolve, reject) => {
            if(data.token) {
                authenticator.store.queryRecord('user', {
                    filter: {
                        token: data.token
                    }
                }).then((data) => {
                    resolve({token: data.get('token')})
                }).catch((data) => {
                    reject()
                })
            } else {
                reject()
            }
        })
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
                resolve({token: data.get('token')})
            }).catch((data) => {
                reject('Username or password incorrect or unknown')
            })
        })
    }
});
