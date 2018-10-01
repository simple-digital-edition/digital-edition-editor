import Controller from '@ember/controller';

export default Controller.extend({
    button_text: 'Synchronise changes',
    button_class: 'button',
    selected_file: null,

    actions: {
        synchronise: function() {
            this.set('button_text', 'Synchronisation running...')
            this.set('button_class', 'button secondary')
            let controller = this
            this.get('model').save().then(() => {
                controller.set('button_text', 'Synchronisation complete')
                this.set('button_class', 'button success')
            }).catch(() => {
                controller.set('button_text', 'Synchronisation failed')
                this.set('button_class', 'button alert')
            })
        }
    }
});
