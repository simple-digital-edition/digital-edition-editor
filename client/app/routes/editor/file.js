import Route from '@ember/routing/route';

export default Route.extend({
    model: function(params) {
        var route = this;
        var repository_promise = this.store.findRecord('repository', params.rid);
        repository_promise.then(function(repository) {
            route.controllerFor('editor').set('selected_repository', repository);
        });
        var file_promise = this.store.findRecord('file', params.rid + ':' + params.fid);
        file_promise.then(function(file) {
            route.controllerFor('editor').set('selected_file', file);
        })
        return file_promise;
    }
});
