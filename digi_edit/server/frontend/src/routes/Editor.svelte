<script lang="ts">
    import { tick, onDestroy } from 'svelte';
    import { derived } from 'svelte/store';
    import { Route, Link, useLocation, useParams, useNavigate } from 'svelte-navigator';

    import { activeBranches, getAllBranches, branchesBusy, postBranchAction, busyBranchAction, deleteBranch, activeDialog, authToken } from '../stores';
    import { sessionDeleteValue, localDeleteValue } from '../storage';
    import TaskEditor from './TaskEditor.svelte';
    import NewTask from './NewTask.svelte';
    import BusySpinner from '../components/BusySpinner.svelte';

    const location = useLocation();
    const params = useParams();
    const navigate = useNavigate();
    let integrationPrompted = false;

    const selectedTask = derived([activeBranches, params], ([activeBranches, params]) => {
        let taskId = params['*'];
        if (taskId.indexOf('/') >= 0) {
            taskId = taskId.substring(0, taskId.indexOf('/'));
        }
        const selectedTask = activeBranches.filter((branch) => {
            return branch.id === taskId;
        });
        if (selectedTask.length === 1) {
            return selectedTask[0];
        }
        return null;
    });

    let oldSelectedTask = null;

    const selectedTaskUnsubscribe = selectedTask.subscribe((selectedTask) => {
        if (selectedTask === null && oldSelectedTask !== null) {
            navigate('/');
            busyBranchAction.set('');
            integrationPrompted = false;
        }
        if (!integrationPrompted && selectedTask && selectedTask.attributes && selectedTask.attributes.updates) {
            integrationPrompted = true;
            activeDialog.set({
                'title': 'Update to the latest primary version',
                'text': 'The primary copy has changes that your task does not have. It is recommended, that you update your task to include these changes.',
                'buttons': [
                    {
                        title: "Don't update",
                        action() {
                            activeDialog.set(null);
                        }
                    },
                    {
                        title: 'Update',
                        action() {
                            rebase();
                            activeDialog.set(null);
                        }
                    }
                ]
            });
        }
        oldSelectedTask = selectedTask;
    });

    let showTaskMenu = false;
    let taskMenu = null;

    async function toggleTaskMenu() {
        showTaskMenu = !showTaskMenu;
        if (showTaskMenu) {
            await tick();
            if (taskMenu && taskMenu.querySelector('button')) {
                taskMenu.querySelector('button').focus();
            }
        }
    }

    async function requestIntegration() {
        await postBranchAction($selectedTask, 'request-merge');
    }

    async function cancelIntegration() {
        await postBranchAction($selectedTask, 'cancel-merge');
    }

    async function deleteTask() {
        activeDialog.set({
            title: 'Confirm deleting this branch',
            text: 'Please confirm that you wish to delete the task "' + $selectedTask.attributes.name + '".',
            buttons: [
                {
                    title: "Don't delete",
                    action() {
                        activeDialog.set(null);
                    },
                },
                {
                    title: 'Delete',
                    action: async () => {
                        deleteBranch($selectedTask);
                        activeDialog.set(null);
                    }
                },
            ]
        });
    }

    async function rebase() {
        await postBranchAction($selectedTask, 'rebase');
    }

    async function logout() {
        sessionDeleteValue('auth');
        localDeleteValue('auth');
        authToken.set('');
    }

    const unsubscribeLocation = location.subscribe((location) => {
        showTaskMenu = false;
    })

    const branchRefreshInterval = window.setInterval(async () => {
        await getAllBranches();
    }, 30000);

    onDestroy(() => {
        clearInterval(branchRefreshInterval);
        unsubscribeLocation();
        selectedTaskUnsubscribe();
    });

    getAllBranches();
</script>

<div class="w-full h-full flex flex-col">
    <h1 class="sr-only">Editor</h1>
    <nav class="flex-none">
        <ul class="flex">
            <li role="presentation" class="border-b-2 border-neutral w-4"></li>
            <li role="presentation">
                <Link to="/" class="block px-3 py-1 border-b-2 border-solid {$selectedTask ? 'border-neutral' : 'border-primary'} hover:border-primary focus:border-primary transition-colors">Editor</Link>
            </li>
            <li role="presentation" class="relative">
                {#if $branchesBusy && !$selectedTask}
                    <BusySpinner width="w-6" height="h-6" class="px-3 py-1 border-b-2 border-solid border-neutral" message="Loading tasks. Please wait..."/>
                {:else}
                    <button on:click={toggleTaskMenu} class="block flex flex-row items-center px-3 py-1 border-b-2 border-solid {$selectedTask ? 'border-primary' : 'border-neutral'} hover:border-primary focus:border-primary transition-colors">
                        <span class="pr-2">{#if $selectedTask}{$selectedTask.attributes.name}{:else}Please select the task to work on{/if}</span>
                        <svg aria-hidden="true" viewBox="0 0 24 24" class="w-4 h-4">
                            <path fill="currentColor" d="M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z" />
                        </svg>
                    </button>
                {/if}
                {#if showTaskMenu}
                    <ul bind:this={taskMenu} class="absolute left-0 top-full min-w-full bg-white z-10 border-l border-b border-r border-solid border-neutral shadow max-h-64 overflow-y-auto overflow-x-visible">
                        {#each $activeBranches as branch}
                            <li role="presentation">
                                <Link to="/{branch.id}" class="block flex flex-row items-center w-full text-left px-3 py-1 text-text hover:text-primary focus:text-primary overflow-visible" title="{(!branch.attributes.pull_request || branch.attributes.pull_request.state !== 'open') ? 'Work on this task' : 'The integration of this task has been requested. If you want to make changes, cancel the integration first.'}">
                                    <span class="block flex-auto whitespace-nowrap">{branch.attributes.name}</span>
                                    <span class="block flex-none w-4"></span>
                                    {#if !branch.attributes.pull_request || branch.attributes.pull_request.state !== 'open'}
                                        <svg aria-hidden="true" viewBox="0 0 24 24" class="block flex-none w-4 h-4" aria-label="Edit">
                                            <path fill="currentColor" d="M14.06,9L15,9.94L5.92,19H5V18.08L14.06,9M17.66,3C17.41,3 17.15,3.1 16.96,3.29L15.13,5.12L18.88,8.87L20.71,7.04C21.1,6.65 21.1,6 20.71,5.63L18.37,3.29C18.17,3.09 17.92,3 17.66,3M14.06,6.19L3,17.25V21H6.75L17.81,9.94L14.06,6.19Z" />
                                        </svg>
                                    {:else}
                                        <svg aria-hidden="true" viewBox="0 0 24 24" class="block flex-none w-4 h-4" aria-label="Integration requested">
                                            <path fill="currentColor" d="M6,3A3,3 0 0,1 9,6C9,7.31 8.17,8.42 7,8.83V15.17C8.17,15.58 9,16.69 9,18A3,3 0 0,1 6,21A3,3 0 0,1 3,18C3,16.69 3.83,15.58 5,15.17V8.83C3.83,8.42 3,7.31 3,6A3,3 0 0,1 6,3M6,5A1,1 0 0,0 5,6A1,1 0 0,0 6,7A1,1 0 0,0 7,6A1,1 0 0,0 6,5M6,17A1,1 0 0,0 5,18A1,1 0 0,0 6,19A1,1 0 0,0 7,18A1,1 0 0,0 6,17M21,18A3,3 0 0,1 18,21A3,3 0 0,1 15,18C15,16.69 15.83,15.58 17,15.17V7H15V10.25L10.75,6L15,1.75V5H17A2,2 0 0,1 19,7V15.17C20.17,15.58 21,16.69 21,18M18,17A1,1 0 0,0 17,18A1,1 0 0,0 18,19A1,1 0 0,0 19,18A1,1 0 0,0 18,17Z" />
                                        </svg>
                                    {/if}
                                </Link>
                            </li>
                        {:else}
                            <li role="presentation">
                                <p class="px-3 py-1">There are no active tasks</p>
                            </li>
                        {/each}
                    </ul>
                {/if}
            </li>
            {#if $selectedTask}
                {#if $selectedTask.attributes.rebase_required }
                    <li role="presentation">
                        {#if $busyBranchAction === 'rebase'}
                            <BusySpinner width="w-6" height="h-6" class="px-3 py-1 border-b-2 border-solid border-neutral" message="Updating. Please wait..."/>
                        {:else}
                            <button on:click={rebase} class="block px-3 py-1 border-b-2 border-solid border-neutral hover:border-primary focus:border-primary transition-colors" aria-label="Update to the latest changes from the primary copy" title="Update to the latest changes from the primary copy">
                                <svg viewBox="0 0 24 24" class="w-6 h-6">
                                    <path fill="currentColor" d="M13 14C9.64 14 8.54 15.35 8.18 16.24C9.25 16.7 10 17.76 10 19C10 20.66 8.66 22 7 22S4 20.66 4 19C4 17.69 4.83 16.58 6 16.17V7.83C4.83 7.42 4 6.31 4 5C4 3.34 5.34 2 7 2S10 3.34 10 5C10 6.31 9.17 7.42 8 7.83V13.12C8.88 12.47 10.16 12 12 12C14.67 12 15.56 10.66 15.85 9.77C14.77 9.32 14 8.25 14 7C14 5.34 15.34 4 17 4S20 5.34 20 7C20 8.34 19.12 9.5 17.91 9.86C17.65 11.29 16.68 14 13 14M7 18C6.45 18 6 18.45 6 19S6.45 20 7 20 8 19.55 8 19 7.55 18 7 18M7 4C6.45 4 6 4.45 6 5S6.45 6 7 6 8 5.55 8 5 7.55 4 7 4M17 6C16.45 6 16 6.45 16 7S16.45 8 17 8 18 7.55 18 7 17.55 6 17 6M18 13V14.5C20.21 14.5 22 16.29 22 18.5C22 19.32 21.75 20.08 21.33 20.71L20.24 19.62C20.41 19.28 20.5 18.9 20.5 18.5C20.5 17.12 19.38 16 18 16V17.5L15.75 15.25L15.72 15.22C15.78 15.17 15.85 15.13 18 13M18 24V22.5C15.79 22.5 14 20.71 14 18.5C14 17.68 14.25 16.92 14.67 16.29L15.76 17.38C15.59 17.72 15.5 18.1 15.5 18.5C15.5 19.88 16.62 21 18 21V19.5L20.25 21.75L20.28 21.78C20.22 21.83 20.15 21.87 18 24" />
                                </svg>
                            </button>
                        {/if}
                    </li>
                {:else}
                    {#if !$selectedTask.attributes.merge_request || $selectedTask.attributes.merge_request.state !== 'opened'}
                        <li role="presentation">
                            {#if $busyBranchAction === 'request-merge'}
                                <BusySpinner width="w-6" height="h-6" class="px-3 py-1 border-b-2 border-solid border-neutral" message="Requesting integration. Please wait..."/>
                            {:else}
                                <button on:click={requestIntegration} class="block px-3 py-1 border-b-2 border-solid border-neutral hover:border-primary focus:border-primary transition-colors" aria-label="Request integration" title="Request integration">
                                    <svg viewBox="0 0 24 24" class="w-6 h-6">
                                        <path fill="currentColor" d="M6,3A3,3 0 0,1 9,6C9,7.31 8.17,8.42 7,8.83V15.17C8.17,15.58 9,16.69 9,18A3,3 0 0,1 6,21A3,3 0 0,1 3,18C3,16.69 3.83,15.58 5,15.17V8.83C3.83,8.42 3,7.31 3,6A3,3 0 0,1 6,3M6,5A1,1 0 0,0 5,6A1,1 0 0,0 6,7A1,1 0 0,0 7,6A1,1 0 0,0 6,5M6,17A1,1 0 0,0 5,18A1,1 0 0,0 6,19A1,1 0 0,0 7,18A1,1 0 0,0 6,17M21,18A3,3 0 0,1 18,21A3,3 0 0,1 15,18C15,16.69 15.83,15.58 17,15.17V7H15V10.25L10.75,6L15,1.75V5H17A2,2 0 0,1 19,7V15.17C20.17,15.58 21,16.69 21,18M18,17A1,1 0 0,0 17,18A1,1 0 0,0 18,19A1,1 0 0,0 19,18A1,1 0 0,0 18,17Z" />
                                    </svg>
                                </button>
                            {/if}
                        </li>
                    {:else}
                        <li role="presentation">
                            {#if $busyBranchAction === 'cancel-merge'}
                                <BusySpinner width="w-6" height="h-6" class="px-3 py-1 border-b-2 border-solid border-neutral" message="Cancelling integration. Please wait..."/>
                            {:else}
                                <button on:click={cancelIntegration} class="block px-3 py-1 border-b-2 border-solid border-neutral hover:border-primary focus:border-primary transition-colors" aria-label="Cancel integration" title="Cancel integration">
                                    <svg viewBox="0 0 24 24" class="w-6 h-6">
                                        <path fill="currentColor" d="M6,3A3,3 0 0,1 9,6C9,7.31 8.17,8.42 7,8.83V15.17C8.17,15.58 9,16.69 9,18A3,3 0 0,1 6,21A3,3 0 0,1 3,18C3,16.69 3.83,15.58 5,15.17V8.83C3.83,8.42 3,7.31 3,6A3,3 0 0,1 6,3M6,5A1,1 0 0,0 5,6A1,1 0 0,0 6,7A1,1 0 0,0 7,6A1,1 0 0,0 6,5M6,17A1,1 0 0,0 5,18A1,1 0 0,0 6,19A1,1 0 0,0 7,18A1,1 0 0,0 6,17M17.17,11.77V7H15V10.25L10.75,6L15,1.75V5H17A2,2 0 0,1 19,7V11.77H17.17M17.5 13C15 13 13 15 13 17.5C13 20 15 22 17.5 22C20 22 22 20 22 17.5C22 15 20 13 17.5 13M17.5 14.5C19.16 14.5 20.5 15.84 20.5 17.5C20.5 18.06 20.35 18.58 20.08 19L16 14.92C16.42 14.65 16.94 14.5 17.5 14.5M14.92 16L19 20.08C18.58 20.35 18.06 20.5 17.5 20.5C15.84 20.5 14.5 19.16 14.5 17.5C14.5 16.94 14.65 16.42 14.92 16Z" />
                                    </svg>
                                </button>
                            {/if}
                        </li>
                    {/if}
                {/if}
                <li role="presentation">
                    {#if $busyBranchAction === 'delete'}
                        <BusySpinner width="w-6" height="h-6" class="px-3 py-1 border-b-2 border-solid border-neutral" message="Deleting. Please wait..."/>
                    {:else}
                        <button on:click={deleteTask} class="block px-3 py-1 border-b-2 border-solid border-neutral hover:border-primary focus:border-primary transition-colors" aria-label="Delete this task" title="Delete this task">
                            <svg viewBox="0 0 24 24" class="w-6 h-6">
                                <path fill="currentColor" d="M9,3V4H4V6H5V19A2,2 0 0,0 7,21H17A2,2 0 0,0 19,19V6H20V4H15V3H9M7,6H17V19H7V6M9,8V17H11V8H9M13,8V17H15V8H13Z" />
                            </svg>
                        </button>
                    {/if}
                </li>
            {:else if !$branchesBusy}
                <li role="presentation">
                    <Link to="/new" class="block px-3 py-1 border-b-2 border-solid border-neutral hover:border-primary focus:border-primary transition-colors" aria-label="New Task">
                        <svg viewBox="0 0 24 24" class="w-6 h-6">
                            <path fill="currentColor" d="M13 14C9.64 14 8.54 15.35 8.18 16.24C9.25 16.7 10 17.76 10 19C10 20.66 8.66 22 7 22S4 20.66 4 19C4 17.69 4.83 16.58 6 16.17V7.83C4.83 7.42 4 6.31 4 5C4 3.34 5.34 2 7 2S10 3.34 10 5C10 6.31 9.17 7.42 8 7.83V13.12C8.88 12.47 10.16 12 12 12C14.67 12 15.56 10.66 15.85 9.77C14.77 9.32 14 8.25 14 7C14 5.34 15.34 4 17 4S20 5.34 20 7C20 8.34 19.12 9.5 17.91 9.86C17.65 11.29 16.68 14 13 14M7 18C6.45 18 6 18.45 6 19S6.45 20 7 20 8 19.55 8 19 7.55 18 7 18M7 4C6.45 4 6 4.45 6 5S6.45 6 7 6 8 5.55 8 5 7.55 4 7 4M17 6C16.45 6 16 6.45 16 7S16.45 8 17 8 18 7.55 18 7 17.55 6 17 6M17 14V17H14V19H17V22H19V19H22V17H19V14H17Z" />
                        </svg>
                    </Link>
                </li>
            {/if}
            <li role="presentation" class="flex-auto border-b-2 border-solid border-neutral"></li>
            <li role="presentation">
                <button on:click={logout} class="block px-3 py-1 border-b-2 border-solid border-neutral hover:border-primary focus:border-primary transition-colors">Log out</button>
            </li>
            <li role="presentation" class="border-b-2 border-solid border-neutral w-4"></li>
        </ul>
    </nav>
    <Route path="/">
        <div class="flex-auto relative">
            <h1 class="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 text-disabled">Please select the task you wish to work on from the top menu or <Link to="/new" class="underline">create a new one</Link></h1>
        </div>
    </Route>
    <Route path="new"><NewTask/></Route>
    <Route path=":tid/*"><TaskEditor/></Route>
</div>
