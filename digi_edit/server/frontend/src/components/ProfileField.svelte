<script lang="ts">
    import { tick, createEventDispatcher } from 'svelte';

    export let value;
    export let title;
    export let mask = false;

    let localValue = null;
    let editing = false;
    let inputElement = null;
    let dispatch = createEventDispatcher();

    async function startEditing() {
        editing = true;
        await tick();
        if (inputElement) {
            inputElement.focus();
        }
    }

    function cancelEdit() {
        editing = false;
        if (value) {
            localValue = value;
        } else {
            localValue = '';
        }
    }

    function saveEdit(ev: Event) {
        ev.preventDefault();
        editing = false;
        value = localValue;
        dispatch('change', localValue);
    }

    function keyUp(ev: KeyboardEvent) {
        if (ev.key === 'Escape') {
            cancelEdit();
        }
    }

    $: {
        if (value) {
            localValue = value;
        } else {
            localValue = '';
        }
    }
</script>

<dt class="w-1/4 py-1 text-sm text-right">{title}</dt>
<dd class="w-3/4 px-2 py-1">
    {#if editing}
        <form class="flex flex-row space-x-2" on:submit={saveEdit}>
            {#if mask}
                <input bind:this={inputElement} on:keyup={keyUp} type="password" bind:value={localValue} class="flex-1 block px-1 py-1 border border-solid w-full text-base focus:shadow-inner"/>
            {:else}
                <input bind:this={inputElement} on:keyup={keyUp} type="text" bind:value={localValue} class="flex-1 block px-1 py-1 border border-solid w-full text-base focus:shadow-inner"/>
            {/if}
            <button on:click={cancelEdit} aria-label="Revert your changes" type="button" class="flex-0 block">
                <svg viewBox="0 0 24 24" class="w-6 h-6" aria-hidden="true">
                    <path fill="currentColor" d="M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z" />
                </svg>
            </button>
            <button aria-label="Save your changes" type="submit" class="flex-0 block">
                <svg viewBox="0 0 24 24" class="w-6 h-6" aria-hidden="true">
                    <path fill="currentColor" d="M21,7L9,19L3.5,13.5L4.91,12.09L9,16.17L19.59,5.59L21,7Z" />
                </svg>
            </button>
        </form>
    {:else}
        {#if mask}
            * * * * *
        {:else}
            {localValue}
        {/if}
        <button on:click={startEditing} aria-label="Edit your name">
            <svg viewBox="0 0 24 24" class="w-4 h-4" aria-hidden="true">
                <path fill="currentColor" d="M20.71,7.04C21.1,6.65 21.1,6 20.71,5.63L18.37,3.29C18,2.9 17.35,2.9 16.96,3.29L15.12,5.12L18.87,8.87M3,17.25V21H6.75L17.81,9.93L14.06,6.18L3,17.25Z" />
            </svg>
        </button>
    {/if}
</dd>
