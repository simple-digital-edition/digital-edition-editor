<script lang="ts">
    import { onDestroy } from 'svelte';
    import { get } from 'svelte/store';
	import { Route } from 'svelte-navigator';
	import { useNavigate, useLocation } from 'svelte-navigator';

    import { isAuthorised } from '../stores';
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
	<Route path="/*"><Editor/></Route>
    <Route path="/login"><Login/></Route>
</main>
