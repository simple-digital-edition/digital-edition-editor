import DS from 'ember-data';

export default DS.Model.extend({
    title: DS.attr('string'),
    is_dirty: DS.attr('boolean'),
    local_changes: DS.attr(),
    remote_changes: DS.attr(),
    master_changes: DS.attr(),
    tei_files: DS.attr()
});
