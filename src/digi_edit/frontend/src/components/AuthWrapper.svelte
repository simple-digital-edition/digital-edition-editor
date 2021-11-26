<script lang="ts">
    import { onDestroy } from 'svelte';
    import { get } from 'svelte/store';
	import { Route } from 'svelte-navigator';
	import { useNavigate, useLocation } from 'svelte-navigator';

    import { isAuthorised, uiConfig, schema } from '../stores';
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
</main>
