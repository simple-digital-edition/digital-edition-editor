<script lang="ts">
	import { Router } from 'svelte-navigator';

	import { authTokenChecker, loadConfig } from './stores';
	import AuthWrapper from './components/AuthWrapper.svelte'

	loadConfig();
</script>

<Router basepath="/app">
	{#if $authTokenChecker}
		<AuthWrapper/>
	{/if}
</Router>

<style global>
	@tailwind base;
	@tailwind components;
	@tailwind utilities;
</style>
