<script lang="ts">
    import { tick, onDestroy } from 'svelte';
    import { derived, writable } from 'svelte/store';
    import { Route, Link, useLocation, useParams } from 'svelte-navigator';

    import { activeBranches, getAllBranches } from '../stores';
    import TaskEditor from './TaskEditor.svelte';

    const location = useLocation();
    const params = useParams();

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

    const unsubscribeLocation = location.subscribe((location) => {
        showTaskMenu = false;
    })

    onDestroy(unsubscribeLocation)

    getAllBranches();
</script>

<div class="w-full h-full flex flex-col">
    <h1 class="sr-only">Editor</h1>
    <nav class="flex-none">
        <ul class="flex">
            <li role="presentation" class="border-b-2 border-gray-300 w-4"></li>
            <li role="presentation">
                <Link to="/" class="block px-3 py-1 border-b-2 border-solid {$selectedTask ? 'border-gray-300' : 'border-blue-700'} hover:border-blue-700 focus:border-blue-700 transition-colors">Editor</Link>
            </li>
            <li role="presentation" class="relative">
                <button on:click={toggleTaskMenu} class="block flex flex-row items-center px-3 py-1 border-b-2 border-solid {$selectedTask ? 'border-blue-700' : 'border-gray-300'} hover:border-blue-700 focus:border-blue-700 transition-colors">
                    <span class="pr-2">{#if $selectedTask}{$selectedTask.attributes.name}{:else}Please select the task to work on{/if}</span>
                    <svg aria-hidden="true" viewBox="0 0 24 24" class="w-4 h-4">
                        <path fill="currentColor" d="M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z" />
                    </svg>
                </button>
                {#if showTaskMenu}
                    <ul bind:this={taskMenu} class="absolute left-0 top-full w-full bg-white z-10 border-l border-b border-r border-solid border-gray-300 shadow max-h-64 overflow-auto">
                        {#each $activeBranches as branch}
                            <li role="presentation">
                                <Link to="/{branch.id}" class="block w-full text-left px-3 py-1 hover:text-blue-700 focus:text-blue-700">{branch.attributes.name}</Link>
                            </li>
                        {/each}
                    </ul>
                {/if}
            </li>
            {#if $selectedTask}
                <li role="presentation">
                    <button class="block px-3 py-1 border-b-2 border-solid border-gray-300 hover:border-blue-700 focus:border-blue-700 transition-colors">Request Integration</button>
                </li>
                <li role="presentation">
                    <button class="block px-3 py-1 border-b-2 border-solid border-gray-300 hover:border-blue-700 focus:border-blue-700 transition-colors">Update Primary Changes</button>
                </li>
                <li role="presentation">
                    <button class="block px-3 py-1 border-b-2 border-solid border-gray-300 hover:border-blue-700 focus:border-blue-700 transition-colors">Delete</button>
                </li>
            {:else}
                <li role="presentation">
                    <button class="block px-3 py-1 border-b-2 border-solid border-gray-300 hover:border-blue-700 focus:border-blue-700 transition-colors">New Task</button>
                </li>
            {/if}
            <li role="presentation" class="flex-auto border-b-2 border-solid border-gray-300"></li>
            <li role="presentation">
                <button class="block px-3 py-1 border-b-2 border-solid border-gray-300 hover:border-blue-700 focus:border-blue-700 transition-colors">Log out</button>
            </li>
            <li role="presentation" class="border-b-2 border-solid border-gray-300 w-4"></li>
        </ul>
    </nav>
    <Route path="/">
        <div class="flex-auto relative">
            <div class="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 text-gray-700">Please select the task you wish to work on from the top menu or <button>create a new one</button></div>
        </div>
    </Route>
    <Route path=":tid/*"><TaskEditor/></Route>
</div>
