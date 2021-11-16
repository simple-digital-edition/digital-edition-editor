<script lang="ts">
    import { createEventDispatcher } from 'svelte';

    export let entry;
    export let active: boolean | string;

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

{#if entry.action.type === 'selectMarkAttribute'}
    <label><span class="sr-only">{entry.label}</span>
        <select on:change={change}>
            {#each entry.action.values as value}
                <option value={value.value} selected={value.value === active ? 'selected' : null}>{value.label}</option>
            {/each}
        </select>
    </label>
{:else if entry.action.type === 'inputAttribute'}
    <label><small class="block">{entry.label}</small>
        <input type={entry.action.dataType} on:change={change} value={active} min={entry.action.min} max={entry.action.max} step={entry.action.step}/>
    </label>
{:else}
    <button on:click={click} class="block {active ? 'bg-gray-300' : ''}" title={entry.svg ? entry.label : null}>
        {#if entry.svg}
            {@html entry.svg}
        {:else}
            {entry.label}
        {/if}
    </button>
{/if}
