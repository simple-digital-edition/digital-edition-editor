import { helper } from '@ember/component/helper';

export function teiTagMapper(params/*, hash*/) {
    return params.map(function(item) {
        if(item === '{http://www::tei-c::org/ns/1::0}head') {
            return 'header';
        } else if(item === '{http://www::tei-c::org/ns/1::0}p') {
            return 'p';
        } else if(item === '{http://www::tei-c::org/ns/1::0}span') {
            return 'span';
        } else {
            if(item.indexOf('{') >= 0 && item.indexOf('}') >= 0) {
                return item.substring(item.indexOf('}') + 1);
            } else {
                return item;
            }
        }
    });
}

export default helper(teiTagMapper);
