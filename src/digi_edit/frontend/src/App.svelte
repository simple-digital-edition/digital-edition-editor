<script lang="ts">
	import { Router } from 'svelte-navigator';

	import { authTokenChecker } from './stores';
	import AuthWrapper from './components/AuthWrapper.svelte'
</script>

<Router basepath="/ui">
	{#if $authTokenChecker}
		<AuthWrapper/>
	{/if}
</Router>

<style global>
	@tailwind base;
	@tailwind components;
	@tailwind utilities;
</style>
