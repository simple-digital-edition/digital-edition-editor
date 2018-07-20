import Component from '@ember/component';

export default Component.extend({
    actions: {
        'add-child-node': function(node) {
            var tag = prompt('New node tag');
            if(tag) {
                tag = tag.replace(/\./g, '::');
                var new_node = {
                    'tag': tag,
                    'children': [],
                    'attrib': {},
                    'text': '',
                    'tail': ''
                };
                node.children.pushObject(new_node);
                this.get('notify-model-change')();
            }
        },
        'remove-node': function(parent, node) {
            parent.children.removeObject(node);
            this.get('notify-model-change')();
        },
        'move-node-forward': function(parent, node) {
            var idx = parent.children.indexOf(node);
            if(idx > 0) {
                parent.children.removeObject(node);
                parent.children.insertAt(idx - 1, node);
                this.get('notify-model-change')();
            }
        },
        'move-node-backward': function(parent, node) {
            var idx = parent.children.indexOf(node);
            if(idx < parent.children.length - 1) {
                parent.children.removeObject(node);
                parent.children.insertAt(idx + 1, node);
                this.get('notify-model-change')();
            }
        }
    }
});
