<script lang="ts">
    import { onDestroy } from 'svelte';
    import { useParams } from 'svelte-navigator';

    import { file, fileBusy, getFile, patchFile } from '../stores';
    import TeiEditor from '../components/TeiEditor.svelte';

    const params = useParams();
    let oldFileId = null;

    const paramsUnsubscribe = params.subscribe((params) => {
        if (oldFileId !== params.fid) {
            file.set(null);
            getFile(params.fid);
            oldFileId = params.fid;
        }
    });

    async function save(ev) {
        if ($file && ev.detail) {
            const attrs = $file.attributes;
            attrs.rawData = ev.detail;
            try {
                await patchFile($file);
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
            <TeiEditor text={$file.attributes.rawData} on:save={save}/>
        {/if}
    {:else if $fileBusy}
        <div class="w-full h-full relative">
            <div class="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 text-disabled">The file is being loaded. Please wait...</div>
        </div>
    {/if}
</div>
