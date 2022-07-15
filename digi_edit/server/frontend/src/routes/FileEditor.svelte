<script lang="ts">
    import { onDestroy } from 'svelte';
    import { useParams } from 'svelte-navigator';

    import { file, fileBusy, getFile, patchFile } from '../stores';
    import TeiEditor from '../components/TeiEditor.svelte';
    import TextEditor from '../components/TextEditor.svelte';

    const params = useParams();
    export let branchId: string;
    let oldFileId = null;
    let dirty = false;

    const paramsUnsubscribe = params.subscribe((params) => {
        if (oldFileId !== params.fid) {
            file.set(null);
            getFile(branchId, params.fid);
            oldFileId = params.fid;
        }
    });

    async function save(ev) {
        if ($file && ev.detail) {
            const attrs = $file.attributes;
            attrs.rawData = ev.detail;
            try {
                await patchFile(branchId, $file);
                dirty = false;
            } catch {
                alert('Unfortunately something went wrong saving your file. Your changes have not been saved.');
            }
        }
    }

    onDestroy(paramsUnsubscribe);
</script>

<div class="flex-auto overflow-hidden">
    {#if $file}
        {#if $file.attributes.mode === 'tei'}
            <TeiEditor text={$file.attributes.rawData} on:save={save} bind:dirty={dirty}/>
        {:else if $file.attributes.mode === 'text'}
            <TextEditor text={$file.attributes.rawData} on:save={save} bind:dirty={dirty}/>
        {/if}
    {:else if $fileBusy}
        <div class="w-full h-full relative">
            <div class="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 text-disabled">The file is being loaded. Please wait...</div>
        </div>
    {/if}
</div>
