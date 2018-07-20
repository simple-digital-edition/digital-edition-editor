import Controller from '@ember/controller';

export default Controller.extend({
    actions: {
        'select-file': function(rid, fid) {
            this.transitionToRoute('editor.file', rid, fid);
        }
    }
});
