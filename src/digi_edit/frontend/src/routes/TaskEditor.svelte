<script lang="ts">
    import { onDestroy } from 'svelte';
    import { derived, writable } from 'svelte/store';
    import { Link, Route, useParams } from 'svelte-navigator';

    import { files, getAllFiles } from '../stores';
    import FileEditor from './FileEditor.svelte';

    const params = useParams();
    const fileSearchText = writable('');
    let oldTaskId = null;

    const selectedFileId = derived(params, (params) => {
        return params['*'];
    });

    const fileSets = derived([files, fileSearchText], ([files, fileSearchText]) => {
        const fileSets = [];
        for (const file of files) {
            if (fileSearchText !== '' && (file.attributes.path.indexOf(fileSearchText) < 0 && file.attributes.name.indexOf(fileSearchText) < 0)) {
                continue;
            }
            if (fileSets.length === 0) {
                fileSets.push({
                    name: file.attributes.path,
                    files: [file],
                });
            } else {
                if (fileSets[fileSets.length - 1].name === file.attributes.path) {
                    fileSets[fileSets.length - 1].files.push(file);
                } else {
                    fileSets.push({
                        name: file.attributes.path,
                        files: [file],
                    });
                }
            }
        }
        return fileSets;
    });

    const paramsUnsubscribe = params.subscribe((params) => {
        if (params.tid !== oldTaskId) {
            getAllFiles(params.tid);
            oldTaskId = params.tid;
        }
    });

    onDestroy(paramsUnsubscribe);
</script>

<div class="flex-auto flex flex-row overflow-hidden">
    <h2 class="sr-only">Task Editor</h2>
    <div class="flex flex-col flex-none w-1/5 overflow-hidden border-r border-solid border-gray-300">
        <form on:submit={(ev) => { ev.preventDefault(); }} class="flex-none relative">
            <label>
                <span class="sr-only">Search files</span>
                <input bind:value={$fileSearchText} type="search" class="blockblock py-1 pl-2 pr-8 border-l border-b border-r border-solid border-gray-300 w-full text-base focus:shadow-inner"/>
            </label>
            <button class="block absolute right-0 top-1/2 p-2 transform -translate-y-1/2">
                <svg viewBox="0 0 24 24" class="w-4 h-4">
                    <path fill="currentColor" d="M9.5,3A6.5,6.5 0 0,1 16,9.5C16,11.11 15.41,12.59 14.44,13.73L14.71,14H15.5L20.5,19L19,20.5L14,15.5V14.71L13.73,14.44C12.59,15.41 11.11,16 9.5,16A6.5,6.5 0 0,1 3,9.5A6.5,6.5 0 0,1 9.5,3M9.5,5C7,5 5,7 5,9.5C5,12 7,14 9.5,14C12,14 14,12 14,9.5C14,7 12,5 9.5,5Z" />
                </svg>
            </button>
        </form>
        <ol class="flex-auto overflow-auto">
            {#each $fileSets as fileSet}
                <li><span class="block px-2 py-1 text-sm bg-gray-100">{fileSet.name}</span>
                    <ol>
                        {#each fileSet.files as file}
                            <li><Link to="{file.id}" class="block px-2 py-1 text-sm {$selectedFileId === file.id ? 'text-blue-700' : ''}">{file.attributes.name}</Link></li>
                        {/each}
                    </ol>
                </li>
            {/each}
        </ol>
    </div>
    <Route path="/">
        <div class="flex-auto relative">
            <div class="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 text-gray-700">Please select the file you wish to work on from the list on the left</div>
        </div>
    </Route>
    <Route path="/:fid"><FileEditor/></Route>
</div>
