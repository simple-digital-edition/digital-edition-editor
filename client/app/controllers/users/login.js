import Controller from '@ember/controller';
import {inject as service} from '@ember/service';

export default Controller.extend({
    session: service(),
    username: '',
    password: '',

    actions: {
        login() {
            let controller = this
            let username = this.get('username')
            let password = this.get('password')
            this.set('errorMessage', null)
            if(username && password) {
                this.get('session').authenticate('authenticator:local', username, password).then(() => {
                    controller.transitionToRoute('editor')
                }).catch((reason) => {
                    controller.set('errorMessage', reason.error || reason)
                });
            } else {
                if(!username && !password) {
                    this.set('errorMessage', 'Please provide a username and password')
                } else if(!username) {
                    this.set('errorMessage', 'Please provide a username')
                } else {
                    this.set('errorMessage', 'Please provide a password')
                }
            }
        }
    }
});
