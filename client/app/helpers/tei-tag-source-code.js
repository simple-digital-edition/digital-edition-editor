import { helper } from '@ember/component/helper';

function recursive_text(tag) {
    var text = '<' + tag.tag.replace('{http://www::tei-c::org/ns/1::0}', 'tei:');
    Object.keys(tag.attrib).forEach(function(key) {
        text = text + ' ' + key + '="' + tag.attrib[key] + '"';
    });
    text = text + '>';
    if(tag.text) {
        text = text + tag.text;
    }
    tag.children.forEach(function(child) {
        text = text + recursive_text(child);
        if(child.tail) {
            text = text + child.tail;
        }
    });
    text = text + '</' + tag.tag.replace('{http://www::tei-c::org/ns/1::0}', 'tei:') + '>';
    if(tag.tail) {
        text = text + tag.tail;
    }
    return text;
}

export function teiTagSourceCode(params/*, hash*/) {
    return params.map(function(item) {
        return recursive_text(item);
    });
}

export default helper(teiTagSourceCode);
