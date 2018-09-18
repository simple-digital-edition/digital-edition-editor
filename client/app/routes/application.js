import Route from '@ember/routing/route';
import DS from 'ember-data';

const { UnauthorizedError } = DS;

export default Route.extend({
    actions: {
        error(error, transition) {
            if (error instanceof UnauthorizedError) {
                this.transitionTo('editor')
                return
            }
        }
    }
});
