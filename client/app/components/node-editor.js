import Component from '@ember/component';
import {set} from '@ember/object';

export default Component.extend({
    edit_attributes: true,
    edit_text: true,
    edit_tail: true,

    actions: {
        'add-attribute': function(node) {
            var attrib = prompt('New attribute name');
            if(attrib) {
                attrib = attrib.replace(/\./g, '::');
                set(node.attrib, attrib, '');
                this.get('notify-model-change')(node);
            }
        },
        'remove-attribute': function(node, attrib) {
            set(node.attrib, attrib, null);
            delete node.attrib[attrib];
            this.get('notify-model-change')();
        },
        'update-attribute': function(node, attrib, ev) {
            set(node.attrib, attrib, ev.target.value);
            this.get('notify-model-change')();
        },
        'update-text': function(node, key, ev) {
            set(node, key, ev.target.value);
            this.get('notify-model-change')();
        }
    }
});
