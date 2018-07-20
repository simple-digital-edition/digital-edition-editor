import Controller from '@ember/controller';

export default Controller.extend({
    selected_metadata_node: null,

    actions: {
        'select-tab-panel': function(target, ev) {
            ev.preventDefault();
            var panel_root = ev.target.parentElement.parentElement.parentElement.parentElement;
            panel_root.querySelectorAll('.tabs-title.is-active').forEach(function(item) {
                item.classList.remove('is-active');
                item.querySelector('a').removeAttribute('aria-selected');
            });
            panel_root.querySelectorAll('.tabs-panel.is-active').forEach(function(item) {
                item.classList.remove('is-active');
            });
            ev.target.parentElement.classList.add('is-active');
            ev.target.setAttribute('aria-selected', 'true');
            panel_root.querySelector(target + '.tabs-panel').classList.add('is-active');
        },
        'select-metadata-node': function(node) {
            this.set('selected_metadata_node', node);
        },
        'notify-model-change': function() {
            this.get('model').send('becomeDirty');
        }
    }
});
