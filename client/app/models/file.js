import DS from 'ember-data';
import {computed} from '@ember/object';

export default DS.Model.extend({
    filename: DS.attr('string'),
    commit_msg: DS.attr('string'),
    key: DS.attr('string'),
    header: DS.attr(),
    body: DS.attr(),

    basename: computed('filename', function() {
        var filename = this.get('filename');
        if(filename.lastIndexOf('/') >= 0) {
            return filename.substring(filename.lastIndexOf('/') + 1);
        } else {
            return filename;
        }
    })
});
