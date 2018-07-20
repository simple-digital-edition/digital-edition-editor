import { helper } from '@ember/component/helper';

export function formatTagNs(params/*, hash*/) {
    return params.map(function(item) {
        return item.replace(/::/g, '.');
    });
}

export default helper(formatTagNs);
