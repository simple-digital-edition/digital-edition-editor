import { helper } from '@ember/component/helper';

export function stripTagNs(params/*, hash*/) {
    return params.map(function(item) {
        if(item.indexOf('{') >= 0 && item.indexOf('}') >= 0) {
            return item.substring(item.indexOf('}') + 1);
        } else {
            return item;
        }
    });
}

export default helper(stripTagNs);
