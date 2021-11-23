<script lang="ts">
    import { createEventDispatcher } from 'svelte';

    export let entry;
    export let active: boolean | string;
    export let values = [];

    const dispatch = createEventDispatcher();

    function click(ev: Event) {
        ev.preventDefault();
        dispatch('action');
    }

    function change(ev: Event) {
        if (ev.target.value === 'null') {
            dispatch('action', null);
        } else {
            dispatch('action', ev.target.value);
        }
    }
</script>

{#if entry.action.type === 'selectAttribute'}
    <label class="block"><span class="sr-only">{entry.label}</span>
        <select on:change={change}>
            {#each entry.action.values as value}
                <option value={value.value} selected={value.value === active ? 'selected' : null}>{value.label}</option>
            {/each}
        </select>
    </label>
{:else if entry.action.type === 'inputAttribute'}
    <label class="block"><small class="block">{entry.label}</small>
        <input type={entry.action.dataType} on:change={change} value={active} min={entry.action.min} max={entry.action.max} step={entry.action.step} class="border border-solid border-gray-300 focus:shadow-inset"/>
    </label>
{:else if entry.action.type === 'selectNestedDoc'}
    <label class="block"><span class="sr-only">{entry.label}</span>
        <select on:change={change}>
            <option value="null"></option>
            {#each values as value}
                <option value={value.value} selected={value.value === active ? 'selected' : null}>{value.label}</option>
            {/each}
        </select>
    </label>
{:else}
    <button on:click={click} class="block p-1 {active ? 'bg-gray-300' : ''} hover:bg-gray-300 transition-colors" title={entry.svg ? entry.label : null} aria-label={entry.svg ? entry.label : null} aria-current={active ? 'true' : 'false'}>
        {#if entry.svg}
            {@html entry.svg}
        {:else}
            {entry.label}
        {/if}
    </button>
{/if}
