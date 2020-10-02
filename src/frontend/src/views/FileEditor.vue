<template>
    <div v-if="file" class="editor">
        <text-editor v-if="fileData && fileData.attributes.mode === 'text'" :text="fileData.attributes.rawData" @save="save"></text-editor>
        <tei-editor v-if="config && fileData && fileData.attributes.mode === 'tei'" :config="config" :autoLoadCallback="loadFileDataCallback" @save="save"></tei-editor>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
// @ts-ignore
import deepcopy from 'deepcopy';
import axios from 'axios';
// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
// @ts-ignore
import { TeiEditor } from 'tei-editor';

import { JSONAPIObject } from '../store/index';
import TextEditor from '../components/TextEditor.vue';

@Component({
    components: {
        TextEditor,
        TeiEditor,
    }
})
export default class FileEditor extends Vue {
    public fileData = null as JSONAPIObject | null;

    public get file(): JSONAPIObject | null {
        if (this.$store.state.data.files && this.$store.state.data.files[this.$route.params.fid]) {
            return this.$store.state.data.files[this.$route.params.fid];
        } else {
            return null;
        }
    }

    public get config(): any | null {
        if (this.$store.state.config['tei-schema']) {
            return this.$store.state.config['tei-schema'];
        } else {
            return null;
        }
    }

    public mounted(): void {
        this.$store.commit('setBusy', true);
        axios({
            method: 'GET',
            url: this.$store.state.config.api.baseURL + '/files/' + this.$route.params.fid,
            headers: {
                'X-Authorization': this.$store.state.userId + ' ' + this.$store.state.userToken,
                'X-Include-Data': true
            },
        }).then((response) => {
            this.fileData = response.data.data;
            this.$store.commit('setBusy', false);
        }, (error) => {
            this.$store.commit('setBusy', false);
            if (error.response.status === 401) {
                this.$store.commit('setUserId', '');
                this.$store.commit('setUserToken', '');
                this.$store.commit('setLoggedIn', '');
                this.$router.push({name: 'login'});
            }
        })
    }

    public async save(text: string): Promise<void> {
        if (this.fileData) {
            try {
                const data = deepcopy(this.fileData);
                data.attributes.rawData = text;
                this.$store.commit('setBusy', true);
                await axios({
                    method: 'PATCH',
                    url: this.$store.state.config.api.baseURL + '/files/' + this.$route.params.fid,
                    headers: {
                        'X-Authorization': this.$store.state.userId + ' ' + this.$store.state.userToken,
                        'X-Include-Data': true
                    },
                    data: {data: data}
                });
                this.$store.commit('setBusy', false);
            } catch(error) {
                this.$store.commit('setBusy', false);
                if (error.response.status === 401) {
                    this.$store.commit('setUserId', '');
                    this.$store.commit('setUserToken', '');
                    this.$store.commit('setLoggedIn', '');
                    this.$router.push({name: 'login'});
                }
            }
        }
    }

    public loadFileDataCallback(callback: (data: string) => void) {
        if (this.fileData && this.fileData.attributes.rawData) {
            callback(this.fileData.attributes.rawData);
        }
    }
}
</script>
