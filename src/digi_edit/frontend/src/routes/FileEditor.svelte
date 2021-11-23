<script lang="ts">
    import { onDestroy } from 'svelte';
    import { useParams } from 'svelte-navigator';

    import { file, getFile } from '../stores';
    import TeiEditor from '../components/TeiEditor.svelte';

    const params = useParams();
    let oldFileId = null;

    const paramsUnsubscribe = params.subscribe((params) => {
        if (oldFileId !== params.fid) {
            getFile(params.fid);
            oldFileId = params.fid;
        }
    });

    onDestroy(paramsUnsubscribe);
</script>

<div class="flex-auto overflow-hidden">
    {#if $file}
        {#if $file.attributes.mode === 'tei'}
            <TeiEditor text={$file.attributes.rawData} />
        {/if}
    {/if}
</div>
