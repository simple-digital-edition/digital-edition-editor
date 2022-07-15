<script lang="ts">
    import { onDestroy, tick } from 'svelte';
    import { fade } from 'svelte/transition';
    import { derived, writable } from 'svelte/store';
    import { Link, Route, useParams } from 'svelte-navigator';

    import { activeBranches, getAllBranches, files, filesBusy, getAllFiles, createFile, fileBusy } from '../stores';
    import FileEditor from './FileEditor.svelte';

    const params = useParams();
    const fileSearchText = writable('');
    let sidebarElement = null as HTMLElement;
    let emWidthElement = null as HTMLElement;
    let oldTaskId = null;
    let fileList = null;
    let showSidebar = true;
    let showAddFile = false;
    let addFileLocation = '';
    let addFileName = '';

    const selectedFileId = derived(params, (params) => {
        return params['*'];
    });

    const selectedTask = derived([activeBranches, params], ([activeBranches, params]) => {
        let taskId = params.tid;
        const selectedTask = activeBranches.filter((branch) => {
            return branch.id === taskId;
        });
        if (selectedTask.length === 1) {
            return selectedTask[0];
        }
        return null;
    });

    const modifiedFiles = derived(selectedTask, (selectedTask) => {
        if (selectedTask) {
            if (selectedTask.relationships && selectedTask.attributes.changes && selectedTask.attributes.changes.length > 0) {
                return selectedTask.attributes.changes.map((file) => {
                    return file.id;
                });
            }
        }
        return [];
    });

    const fileListfilter = writable('');

    const fileSets = derived([files, fileSearchText, modifiedFiles, fileListfilter], ([files, fileSearchText, modifiedFiles, fileListfilter]) => {
        const fileSets = [];
        for (const file of files) {
            if (fileSearchText !== '' && (file.attributes.path.indexOf(fileSearchText) < 0 && file.attributes.name.indexOf(fileSearchText) < 0)) {
                continue;
            }
            if (fileListfilter === 'modified' && modifiedFiles.indexOf(file.id) < 0) {
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
        tick().then(() => {
            if (fileList) {
                const current = fileList.querySelector('[aria-current="true"]');
                if (current) {
                    current.scrollIntoView();
                }
            }
        });
        return fileSets;
    });

    const modifiedFilesUnsubscribe = modifiedFiles.subscribe((modifiedFiles) => {
        if (modifiedFiles.length > 0 && $fileListfilter === '') {
            fileListfilter.set('modified');
        }
    });

    const paramsUnsubscribe = params.subscribe((params) => {
        if (params.tid !== oldTaskId) {
            fileListfilter.set('');
            getAllFiles(params.tid);
            oldTaskId = params.tid;
        }
    });

    onDestroy(() => {
        paramsUnsubscribe();
        modifiedFilesUnsubscribe();
    });

    function limitedPath(path) {
        if (sidebarElement && emWidthElement) {
            const maxLength = Math.floor(sidebarElement.clientWidth / ((emWidthElement.clientWidth - 32) / 26));
            if (path.length > maxLength) {
                const elements = path.split('/');
                path = elements[0] + '/.../' + elements[elements.length - 1];
                if (path.length > maxLength) {
                    path = '.../' + elements[elements.length - 1];
                }
            }
        }
        return path;
    }

    function addFile(fileSet) {
        showAddFile = true;
        addFileLocation = fileSet.name;
        addFileName = '';
    }

    async function addNewFile(ev: Event) {
        ev.preventDefault();
        if (!$fileBusy) {
            await createFile(addFileName, addFileLocation, $selectedTask.id);
            fileBusy.set(true);
            await getAllFiles($selectedTask.id);
            await getAllBranches();
            fileBusy.set(false);
            showAddFile = false;
        }
    }
</script>

<div class="flex-auto flex flex-row overflow-hidden">
    <h1 class="sr-only">Task Editor</h1>
    <div bind:this={sidebarElement} class="relative flex flex-col flex-none {showSidebar ? 'w-1/5 overflow-hidden' : 'w-0'} border-r border-solid border-neutral">
        <span bind:this={emWidthElement} class="absolute -top-full -left-full tracking-widest" aria-hidden="true">abcdefghijklmnopqrstuvwxyz</span>
        <div class="absolute {showSidebar ? 'right-0' : 'left-0'} bottom-0 pb-2 z-50">
            <button on:click={() => { showSidebar = !showSidebar; }} aria-label="{showSidebar ? 'Hide' : 'Show'} the list of files" title="{showSidebar ? 'Hide' : 'Show'} the list of files" class="text-text hover:text-primary focus:text-primary px-2 py-2 border border-solid border-neutral shadow-lg bg-white">
                <svg viewBox="0 0 24 24" class="w-4 h-4">
                    {#if showSidebar}
                        <path fill="currentColor" d="M11.92,19.92L4,12L11.92,4.08L13.33,5.5L7.83,11H22V13H7.83L13.34,18.5L11.92,19.92M4,12V2H2V22H4V12Z" />
                    {:else}
                        <path fill="currentColor" d="M4,2H2V22H4V13H18.17L12.67,18.5L14.08,19.92L22,12L14.08,4.08L12.67,5.5L18.17,11H4V2Z" />
                    {/if}
                </svg>
            </button>
        </div>
        {#if $filesBusy}
            <div class="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 text-disabled">Files are being loaded. Please wait...</div>
        {:else if showSidebar}
            {#if $modifiedFiles.length > 0}
                <label class="block"><span class="sr-only">Select whether to show all files or just modified files.</span>
                    <select bind:value={$fileListfilter} class="block w-full px-3 py-1">
                        <option value="all">All files</option>
                        <option value="modified">Modified files</option>
                    </select>
                </label>
            {/if}
            <form on:submit={(ev) => { ev.preventDefault(); }} class="flex-none relative">
                <label>
                    <span class="sr-only">Search files</span>
                    <input bind:value={$fileSearchText} type="search" class="block py-1 pl-2 pr-8 border-l border-b border-r border-solid border-neutral w-full text-base focus:shadow-inner"/>
                </label>
                <button class="block absolute right-0 top-1/2 p-2 transform -translate-y-1/2" aria-label="Search">
                    <svg viewBox="0 0 24 24" class="w-4 h-4">
                        <path fill="currentColor" d="M9.5,3A6.5,6.5 0 0,1 16,9.5C16,11.11 15.41,12.59 14.44,13.73L14.71,14H15.5L20.5,19L19,20.5L14,15.5V14.71L13.73,14.44C12.59,15.41 11.11,16 9.5,16A6.5,6.5 0 0,1 3,9.5A6.5,6.5 0 0,1 9.5,3M9.5,5C7,5 5,7 5,9.5C5,12 7,14 9.5,14C12,14 14,12 14,9.5C14,7 12,5 9.5,5Z" />
                    </svg>
                </button>
            </form>
            <ol bind:this={fileList} class="flex-auto overflow-auto">
                {#each $fileSets as fileSet}
                    <li>
                        <div class="flex flex-row border-b border-solid border-primary">
                            <span class="block flex-auto px-2 py-1 tracking-widest truncate" title={fileSet.name}>{limitedPath(fileSet.name)}</span>
                            <button on:click={() => { addFile(fileSet) }} class="flex-0 self-center px-2">
                                <svg viewBox="0 0 24 24" class="w-4 h-4">
                                    <path fill="currentColor" d="M12,20C7.59,20 4,16.41 4,12C4,7.59 7.59,4 12,4C16.41,4 20,7.59 20,12C20,16.41 16.41,20 12,20M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M13,7H11V11H7V13H11V17H13V13H17V11H13V7Z" />
                                </svg>
                            </button>
                        </div>
                        <ol class="mb-2">
                            {#each fileSet.files as file}
                                <li><Link to="{file.id}" class="block px-2 py-1 text-sm {$selectedFileId === file.id ? 'text-primary font-bold border-r-2 border-solid border-primary' : ''}" aria-current="{$selectedFileId === file.id ? 'true' : 'false'}">{file.attributes.name}</Link></li>
                            {/each}
                        </ol>
                    </li>
                {/each}
            </ol>
        {/if}
    </div>
    <Route path="/">
        <div class="flex-auto relative">
            <div class="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 text-disabled">{#if $filesBusy}Files are being loaded. Please wait...{:else}Please select the file you wish to work on from the list on the left{/if}</div>
        </div>
    </Route>
    <Route path="/:fid"><FileEditor branchId={$params.tid}/></Route>
    {#if showAddFile}
        <div transition:fade class="fixed left-0 top-0 w-full h-full z-50 bg-white bg-opacity-70">
            <form on:submit={addNewFile} class="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 border border-solid border-neutral shadow-lg w-96 bg-white">
                <h2 class="px-4 py-2 bg-primary text-primary-contrast font-bold text-lg">Add a new file</h2>
                <div>
                    <p class="px-4 pt-2 pb-1">Please enter the name of the new file to create:</p>
                    <p class="px-4 py-1"><input bind:value={addFileName} disabled={$fileBusy} class="border border-solid border-neutral w-full px-2 py-1"/></p>
                    <p class="px-4 py-1 text-sm">The file will be created in the following location:</p>
                    <p class="px-4 pt-1 pb-2 text-sm"><input value={addFileLocation} readonly class="border border-solid border-neutral bg-neutral w-full px-2 py-1"/></p>
                </div>
                <div class="text-right px-4 py-2">
                    {#if $fileBusy}
                        <span class="inline-block ml-4 bg-primary text-primary-contrast text-sm px-3 py-1">Adding file...</span>
                    {:else}
                        <button type="button" on:click={(ev) => { showAddFile = false; }} class="inline-block ml-4 bg-primary text-primary-contrast text-sm px-3 py-1">Don't add</button>
                        <button type="submit" class="inline-block ml-4 bg-primary text-primary-contrast text-sm px-3 py-1">Add</button>
                    {/if}
                </div>
            </form>
        </div>
    {/if}
</div>
