import Route from '@ember/routing/route';

export default Route.extend({
    model: function(params) {
        var model = this.store.findRecord('repository', params.rid);
        var route = this;
        model.then(function(repository) {
            route.controllerFor('editor').set('selected_repository', repository);
        });
        return model;
    }
});
