<script lang="ts">
    import TeiMetadataField from './TeiMetadataField.svelte';

    export let doc;
    export let schema;
</script>

<div class="w-full h-full overflow-y-auto px-3 py-1 pb-4">
    {#each schema.metadata as section}
        <section class="mb-4">
            <h3 class="font-bold">{section.label}</h3>
            {#each section.entries as entry}
                <TeiMetadataField doc={doc} entry={entry}/>
            {/each}
        </section>
    {/each}
</div>
