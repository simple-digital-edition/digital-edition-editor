<script lang="ts">
    import { user, patchUser } from '../stores';

    import ProfileField from '../components/ProfileField.svelte';

    async function saveEdit(field: string, ev: Event) {
        patchUser(field, ev.detail);
    }
</script>

{#if $user}
    <div class="w-96 mx-auto mt-8">
        <h2 class="sr-only">Profile</h2>
        <dl class="flex flex-wrap items-end">
            <ProfileField bind:value={$user.attributes.name} on:change={(ev) => { saveEdit('name', ev); }} title="Name"/>
            <ProfileField bind:value={$user.attributes.email} on:change={(ev) => { saveEdit('email', ev); }} title="E-Mail"/>
            <ProfileField value={null} on:change={(ev) => { saveEdit('password', ev); }} title="Password" mask={true}/>
        </dl>
    </div>
{/if}
