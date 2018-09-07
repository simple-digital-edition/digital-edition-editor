/**
 * Returns a list of active mark names
 */
export function getActiveMarks(state) {
    let selection = state.selection
    let active_marks = []
    if(selection.from === selection.to) {
        // Get marks at the current cursor position
        if(state.doc.nodeAt(selection.from)) {
            state.doc.nodeAt(selection.from).marks.forEach((mark) => {
                if(active_marks.indexOf(mark.type.name) === -1) {
                    active_marks.push(mark.type.name)
                }
            })
        }
        // Add marks from the previous cursor position if they are inclusive
        if(state.doc.nodeAt(selection.from - 1)) {
            state.doc.nodeAt(selection.from - 1).marks.forEach((mark) => {
                if(mark.type.spec.inclusive || mark.type.spec.inclusive === undefined) {
                    if(active_marks.indexOf(mark.type.name) === -1) {
                        active_marks.push(mark.type.name)
                    }
                }
            })
        }
        // Add stored marks
        if(state.storedMarks) {
            state.storedMarks.forEach((mark) => {
                if(active_marks.indexOf(mark.type.name) === -1) {
                    active_marks.push(mark.type.name)
                }
            })
        }
    } else {
        // Add all marks between the selection markers
        state.doc.nodesBetween(selection.from, selection.to, (node) => {
            node.marks.forEach((mark) => {
                if(active_marks.indexOf(mark.type.name) === -1) {
                    active_marks.push(mark.type.name)
                }
            })
        })
    }
    return active_marks
}

/**
 * Gets a list of nodes from the current selection.
 */
export function getBlockHierarchy(state) {
    let selection = state.selection
    let blocks = []
    for(let idx = 0; idx < selection.$anchor.path.length; idx++) {
        if(typeof(selection.$anchor.path[idx]) === 'object') {
            let node_type = selection.$anchor.path[idx].type
            if(node_type.name !== 'doc') {
                blocks.splice(0, 0, selection.$anchor.path[idx])
            }
        }
    }
    return blocks
}
