import DS from 'ember-data';

export default DS.Model.extend({
    title: DS.attr('string'),
    is_dirty: DS.attr('boolean'),
    changes: DS.attr(),
    tei_files: DS.attr()
});
