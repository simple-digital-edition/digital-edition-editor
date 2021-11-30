<script lang="ts">
    export let doc;
    export let entry;

    function getValue(doc, path) {
        if (path === '') {
            return doc;
        }
        const pathElements = path.split('/');
        pathElements.reverse();
        let element = doc;
        let pathElement = '';
        if (element) {
            while (pathElements.length > 0) {
                pathElement = pathElements.pop();
                let found = false;
                if (pathElement === 'text()') {
                    if (element.text) {
                        return element.text;
                    } else {
                        return '';
                    }
                } else if (pathElement.startsWith('@')) {
                    if (element.attributes[pathElement.substring(1)]) {
                        return element.attributes[pathElement.substring(1)];
                    } else {
                        return '';
                    }
                } else {
                    if (element.children) {
                        for (let child of element.children) {
                            if (child.tag === pathElement) {
                                if (pathElements.length === 0) {
                                    return child;
                                } else {
                                    element = child;
                                    found = true;
                                    break
                                }
                            }
                        }
                    }
                }
                if (!found) {
                    if (pathElement === 'text()') {
                        if (element.text) {
                            return element.text;
                        } else {
                            return '';
                        }
                    } else if (pathElement.startsWith('@')) {
                        return '';
                    } else {
                        return null;
                    }
                }
            }
        }
        if (pathElement === 'text()') {
            return '';
        } else if (pathElement.startsWith('@')) {
            return '';
        } else {
            return null;
        }
    }

    function getAllValues(doc, path) {
        const pathElements = path.split('/');
        const parent = getValue(doc, pathElements.slice(0, pathElements.length - 1).join('/'));
        if (parent) {
            return parent.children.filter((child) => {
                return child.tag == pathElements[pathElements.length - 1];
            });
        } else {
            return [];
        }
    }

    function changeInputValue(ev) {
        const pathElements = entry.element.split('/');
        let element = doc;
        for (let pathElement of pathElements.slice(0, pathElements.length - 1)) {
            let child = null;
            for (let tmpChild of element.children) {
                if (tmpChild.tag === pathElement) {
                    child = tmpChild;
                    break
                }
            }
            if (!child) {
                child = {
                    tag: pathElement,
                    children: [],
                    attributes: {},
                    text: null,
                };
                element.children.push(child);
            }
            element = child;
        }
        const finalPathElement = pathElements[pathElements.length - 1];
        if (finalPathElement === 'text()') {
            element.text = ev.target.value;
        } else if (finalPathElement.startsWith('@')) {
            element.attributes[finalPathElement.substring(1)] = ev.target.value;
        }
    }

    function addValue() {
        const pathElements = entry.element.split('/');
        let element = doc;
        for (let pathElement of pathElements.slice(0, pathElements.length - 1)) {
            let child = null;
            for (let tmpChild of element.children) {
                if (tmpChild.tag === pathElement) {
                    child = tmpChild;
                    break
                }
            }
            if (!child) {
                child = {
                    tag: pathElement,
                    children: [],
                    attributes: {},
                    text: null,
                };
                element.children.push(child);
            }
            element = child;
        }
        const finalPathElement = pathElements[pathElements.length - 1];
        element.children.push({
            tag: finalPathElement,
            children: [],
            attributes: {},
            text: null,
        })
        doc = doc;
    }

    function deleteValue(deleteIdx: number) {
        const pathElements = entry.element.split('/');
        let element = doc;
        for (let pathElement of pathElements.slice(0, pathElements.length - 1)) {
            let child = null;
            for (let tmpChild of element.children) {
                if (tmpChild.tag === pathElement) {
                    child = tmpChild;
                    break
                }
            }
            if (!child) {
                child = {
                    tag: pathElement,
                    children: [],
                    attributes: {},
                    text: null,
                };
                element.children.push(child);
            }
            element = child;
        }
        const finalPathElement = pathElements[pathElements.length - 1];
        let actualIdx = -1;
        for (let idx = 0; idx < element.children.length; idx++) {
            actualIdx++;
            if (element.children[idx].tag === finalPathElement) {
                deleteIdx--;
            }
            if (deleteIdx < 0) {
                break;
            }
        }
        element.children.splice(actualIdx, 1);
        doc = doc;
    }

    function swapValues(idx1: number, idx2: number) {
        const pathElements = entry.element.split('/');
        let element = doc;
        for (let pathElement of pathElements.slice(0, pathElements.length - 1)) {
            let child = null;
            for (let tmpChild of element.children) {
                if (tmpChild.tag === pathElement) {
                    child = tmpChild;
                    break
                }
            }
            if (!child) {
                child = {
                    tag: pathElement,
                    children: [],
                    attributes: {},
                    text: null,
                };
                element.children.push(child);
            }
            element = child;
        }
        const finalPathElement = pathElements[pathElements.length - 1];
        let actualIdx1 = -1;
        let actualIdx2 = -1;
        for (let child of element.children) {
            if (idx1 >= 0) {
                actualIdx1++;
            }
            if (idx2 >= 0) {
                actualIdx2++;
            }
            if (child.tag === finalPathElement) {
                idx1--;
                idx2--;
            }
        }
        if (idx1 < 0 && idx2 < 0 && actualIdx1 >= 0 && actualIdx2 >= 0 && actualIdx1 < element.children.length && actualIdx2 < element.children.length) {
            const tmp = element.children[actualIdx1];
            element.children[actualIdx1] = element.children[actualIdx2];
            element.children[actualIdx2] = tmp;
        }
        doc = doc;
    }
</script>

{#if entry}
    {#if entry.type === 'single-line-text'}
        <label class="block mb-2"><span class="text-sm">{entry.label}</span>
            <input type="text" class="block w-96 px-3 py-1 border border-solid border-gray-300" value={getValue(doc, entry.element)} on:change={changeInputValue}/>
        </label>
    {:else if entry.type === 'multi-column'}
        <div class="flex flex-row">
            {#each entry.entries as child}
                <svelte:self doc={getValue(doc, entry.element)} entry={child}/>
            {/each}
        </div>
    {:else if entry.type === 'multi-row'}
        <div class="flex flex-col">
            {#each entry.entries as child}
                <ol>
                    {#each getAllValues(doc, entry.element) as childDoc, idx}
                        <li class="flex flex-row">
                            <svelte:self doc={childDoc} entry={child}/>
                            {#if entry.label}
                                <div class="flex-none self-end flex flex-row pb-2">
                                    <button on:click={(ev) => { swapValues(idx, idx - 1); }} class="block px-1 py-1" aria-label="Move {entry.label} up" title="Move {entry.label} up">
                                        <svg viewBox="0 0 24 24" class="w-6 h-6">
                                            <path fill="currentColor" d="M14,20H10V11L6.5,14.5L4.08,12.08L12,4.16L19.92,12.08L17.5,14.5L14,11V20Z" />
                                        </svg>
                                    </button>
                                    <button on:click={(ev) => { swapValues(idx, idx + 1); }} class="block px-1 py-1" aria-label="Move {entry.label} down" title="Move {entry.label} down">
                                        <svg viewBox="0 0 24 24" class="w-6 h-6">
                                            <path fill="currentColor" d="M10,4H14V13L17.5,9.5L19.92,11.92L12,19.84L4.08,11.92L6.5,9.5L10,13V4Z" />
                                        </svg>
                                    </button>
                                    <button on:click={(ev) => { deleteValue(idx); }} class="block px-1 py-1" aria-label="Delete {entry.label}" title="Delete {entry.label}">
                                        <svg viewBox="0 0 24 24" class="w-6 h-6">
                                            <path fill="currentColor" d="M19,4H15.5L14.5,3H9.5L8.5,4H5V6H19M6,19A2,2 0 0,0 8,21H16A2,2 0 0,0 18,19V7H6V19Z" />
                                        </svg>
                                    </button>
                                </div>
                            {/if}
                        </li>
                    {/each}
                </ol>
                {#if entry.label}
                    <div>
                        <button on:click={addValue} class="text-sm">Add {entry.label}</button>
                    </div>
                {/if}
        {/each}
        </div>
    {/if}
{:else}
    <span>Unknown</span>
{/if}
