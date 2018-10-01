import { helper } from '@ember/component/helper';

function tree_access(node, path, type) {
    if(node.tag === path[0]) {
        if(path.length === 1) {
            if(type === 'text') {
                return node.text
            } else if(type === 'node') {
                return node
            } else {
                return null
            }
        } else {
            if(type === 'list' && path.length === 2) {
                return node.children.filter((child) => {
                    return child.tag === path[1]
                })
            } else {
                for(let idx = 0; idx < node.children.length; idx++) {
                    let tmp = tree_access(node.children[idx], path.slice(1), type)
                    if(tmp !== null) {
                        return tmp
                    }
                }
                return null
            }
        }
    } else {
        return null
    }
}

export function pathAccess(params/*, hash*/) {
    return tree_access(params[0], params[1], params[2]);
}

export default helper(pathAccess);
