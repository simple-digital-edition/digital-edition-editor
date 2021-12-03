<script lang="ts">
    import { useNavigate, Link } from 'svelte-navigator';

    import { createBranch, busyBranchAction } from '../stores';

    const navigate = useNavigate();
    let name = '';
    let nameError = '';

    async function create(ev) {
        ev.preventDefault();
        try {
            nameError = '';
            const branch = await createBranch({
                type: 'branches',
                attributes: {
                    name: name,
                }
            });
            navigate('/' + branch.id);
        } catch (errors) {
            console.log(errors);
            const errorList = JSON.parse(errors.message).errors;
            for (let error of errorList) {
                if (error.source.pointer === '/data/attributes/name') {
                    nameError = error.title;
                }
            }
        }
    }
</script>

<div class="flex-auto relative">
    <div class="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 border border-solid border-neutral shadow-lg w-96">
        <h2 class="px-4 py-2 bg-primary text-primary-contrast font-bold text-lg">Create a new Task</h2>
        <form on:submit={create} class="px-4 py-2">
            <label class="block mb-3 text-sm">Task Name
                <input bind:value={name} disabled={$busyBranchAction === 'create'} type="text" class="block px-1 py-1 border border-solid {nameError ? 'border-red-600' : 'border-neutral'} w-full text-base focus:shadow-inner {$busyBranchAction === 'create' ? 'text-disabled' : ''}" />
                {#if nameError}
                    <span class="block px-2 py-1 text-sm text-primary-contrast bg-red-600">{nameError}</span>
                {/if}
            </label>
            {#if $busyBranchAction === 'create'}
                <p class="text-sm mb-3">Your new task is being created and a copy of all the content is being created for the task. This can take a while. You will automatically be taken to the task, when it is ready. Please wait...</p>
            {/if}
            <div class="text-right">
                {#if $busyBranchAction === 'create'}
                    <span class="inline-block px-3 py-1 bg-primary text-primary-contrast hover:bg-primary focus:bg-primary transition-colors">Creating...</span>
                {:else}
                    <Link to="/" class="inline-block px-3 py-1 bg-neutral text-text hover:bg-primary hover:text-primary-contrast focus:bg-primary focus:text-primary-contrast transition-colors">Don't create</Link>
                    <button class="inline-block px-3 py-1 bg-primary text-primary-contrast hover:bg-primary focus:bg-primary transition-colors">Create</button>
                {/if}
            </div>
        </form>
    </div>
</div>
