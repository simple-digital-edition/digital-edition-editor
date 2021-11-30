<script lang="ts">
    import { onDestroy } from 'svelte';
    import { get } from 'svelte/store';
	import { Route } from 'svelte-navigator';
	import { useNavigate, useLocation } from 'svelte-navigator';
    import { fade } from 'svelte/transition';

    import { isAuthorised, uiConfig, schema, activeDialog } from '../stores';
	import Editor from '../routes/Editor.svelte';
    import Login from '../routes/Login.svelte';

    const navigate = useNavigate();
    const location = useLocation();

    const isAuthorisedUnsubscribe = isAuthorised.subscribe((isAuthorised) => {
        if (isAuthorised) {
            const pathname = get(location).pathname;
            if (pathname === '/login') {
                navigate('/');
            } else {
                navigate(pathname);
            }
        } else {
            navigate('/login');
        }
    });

    onDestroy(isAuthorisedUnsubscribe);
</script>

<main class="w-screen h-screen">
    {#if $uiConfig && $schema}
	    <Route path="/*"><Editor/></Route>
        <Route path="/login"><Login/></Route>
    {:else}
        <div class="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 text-gray-700">The editor is starting up. Please wait...</div>
    {/if}
    {#if $activeDialog}
        <div transition:fade class="fixed left-0 top-0 w-full h-full z-50 bg-white bg-opacity-70">
            <div class="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 border border-solid border-gray-300 shadow-lg w-96 bg-white">
                <h2 class="px-4 py-2 bg-gray-300 font-bold text-lg">{$activeDialog.title}</h2>
                <div>
                    <p class="px-4 py-2">{$activeDialog.text}</p>
                </div>
                <div class="text-right px-4 py-2">
                    {#each $activeDialog.buttons as button}
                        <button on:click={button.action} class="inline-block ml-4">{button.title}</button>
                    {/each}
                </div>
            </div>
        </div>
    {/if}
</main>
