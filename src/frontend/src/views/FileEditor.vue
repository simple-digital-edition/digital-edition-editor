<template>
    <div v-if="file" class="editor">
        <h1>{{ file.attributes.filename }}</h1>
        <pre>{{ file.attributes.data }}</pre>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

import { JSONAPIObject } from '../store/index';

@Component
export default class FileEditor extends Vue {
    public get file(): JSONAPIObject | null {
        if (this.$store.state.data.files && this.$store.state.data.files[this.$route.params.fid]) {
            return this.$store.state.data.files[this.$route.params.fid];
        } else {
            return null;
        }
    }
}
</script>
