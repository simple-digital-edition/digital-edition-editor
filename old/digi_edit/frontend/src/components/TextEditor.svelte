<script lang="ts">
    import { createEventDispatcher } from 'svelte';

    import BusySpinner from './BusySpinner.svelte';
    import CodeMirrorEditor from './CodeMirrorEditor.svelte';
    import { fileBusy } from '../stores';

    export let text: string;
    export let dirty = false;

    const dispatch = createEventDispatcher();
    let triggerSave = false;

    function saveDoc(ev) {
        if (ev.detail) {
            dispatch('save', ev.detail);
        }
    }

    function save() {
        triggerSave = !triggerSave;
    }
</script>

<div class="flex flex-col h-full overflow-hidden relative text-editor">
    <nav class="flex-none">
        <ul class="flex flex-row">
            <li role="presentation">
                {#if $fileBusy}
                    <BusySpinner class="px-2 py-1 border-b-2 border-solid border-neutral" message="Your file is being saved. Please wait..."/>
                {:else}
                    <button on:click={save} class="block px-2 py-1 border-b-2 border-solid border-neutral {dirty ? 'text-text' : 'text-disabled'} hover:border-primary focus:border-primary" aria-label="Save">
                        <svg viewBox="0 0 24 24" class="w-6 h-6">
                            <path fill="currentColor" d="M15,9H5V5H15M12,19A3,3 0 0,1 9,16A3,3 0 0,1 12,13A3,3 0 0,1 15,16A3,3 0 0,1 12,19M17,3H5C3.89,3 3,3.9 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V7L17,3Z" />
                        </svg>
                    </button>
                {/if}
            </li>
            <li role="presentation" class="flex-auto border-b-2 border-solid border-neutral"></li>
        </ul>
    </nav>
    <CodeMirrorEditor text={text} bind:dirty={dirty} triggerSave={triggerSave} on:save={saveDoc}/>
</div>
