<template>
    <div v-if="file" class="editor">
        <text-editor v-if="rawData" :text="rawData.attributes.data" @save="save"></text-editor>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
// @ts-ignore
import deepcopy from 'deepcopy';

import { JSONAPIObject } from '../store/index';
import TextEditor from '../components/TextEditor.vue';

@Component({
    components: {
        TextEditor,
    }
})
export default class FileEditor extends Vue {
    public rawData = null as JSONAPIObject | null;

    public get file(): JSONAPIObject | null {
        if (this.$store.state.data.files && this.$store.state.data.files[this.$route.params.fid]) {
            return this.$store.state.data.files[this.$route.params.fid];
        } else {
            return null;
        }
    }

    public mounted(): void {
        this.$store.dispatch('fetchSingle', {type: 'data', id: this.$route.params.fid}).then((data) => {
            this.$store.commit('deleteObject', data);
            this.rawData = data;
        });
    }

    public async save(text: string): Promise<void> {
        let data = deepcopy(this.rawData);
        data.attributes.data = text;
        data =await this.$store.dispatch('saveSingle', data);
        this.$store.commit('deleteObject', data);
    }
}
</script>
