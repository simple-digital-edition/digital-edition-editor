<template>
    <div v-if="isCurrentRoute" class="branch margin-top">
        <div v-if="branch" class="width-limited">
            <div>
                <h1>{{ branch.attributes.name }}</h1>
            </div>
            <div class="flex">
                <dl class="detail-list flex-75">
                    <template v-for="fileSet in fileSets">
                        <dt :key="fileSet.id + '-dt'">
                            <h2>{{ fileSet.id }}</h2>
                        </dt>
                        <dd :key="fileSet.id + '-dd'">
                            <ul class="no-bullet">
                                <li v-for="file in fileSet.files" :key="file.id">
                                    <router-link :to="'/branches/' + branch.id + '/files/' + file.id" v-slot="{ href, navigate }">
                                        <a :href="href" @click="navigate">{{ file.attributes.filename }}</a>
                                    </router-link>
                                </li>
                            </ul>
                        </dd>
                    </template>
                </dl>
                <div class="flex-25 padding-left">
                    <ul class="no-bullet">
                        <li class="margin-bottom">
                            <a class="button outline full-width text-center">
                                <svg viewBox="0 0 24 24" class="icon">
                                    <path d="M7,3A3,3 0 0,1 10,6C10,7.29 9.19,8.39 8.04,8.81C8.58,13.81 13.08,14.77 15.19,14.96C15.61,13.81 16.71,13 18,13A3,3 0 0,1 21,16A3,3 0 0,1 18,19C16.69,19 15.57,18.16 15.16,17C10.91,16.8 9.44,15.19 8,13.39V15.17C9.17,15.58 10,16.69 10,18A3,3 0 0,1 7,21A3,3 0 0,1 4,18C4,16.69 4.83,15.58 6,15.17V8.83C4.83,8.42 4,7.31 4,6A3,3 0 0,1 7,3M7,5A1,1 0 0,0 6,6A1,1 0 0,0 7,7A1,1 0 0,0 8,6A1,1 0 0,0 7,5M7,17A1,1 0 0,0 6,18A1,1 0 0,0 7,19A1,1 0 0,0 8,18A1,1 0 0,0 7,17M18,15A1,1 0 0,0 17,16A1,1 0 0,0 18,17A1,1 0 0,0 19,16A1,1 0 0,0 18,15Z" />
                                </svg>
                                Update
                            </a>
                        </li>
                        <li class="margin-bottom">
                            <a class="button outline full-width text-center">
                                <svg viewBox="0 0 24 24" class="icon">
                                    <path d="M6,3A3,3 0 0,1 9,6C9,7.31 8.17,8.42 7,8.83V15.17C8.17,15.58 9,16.69 9,18A3,3 0 0,1 6,21A3,3 0 0,1 3,18C3,16.69 3.83,15.58 5,15.17V8.83C3.83,8.42 3,7.31 3,6A3,3 0 0,1 6,3M6,5A1,1 0 0,0 5,6A1,1 0 0,0 6,7A1,1 0 0,0 7,6A1,1 0 0,0 6,5M6,17A1,1 0 0,0 5,18A1,1 0 0,0 6,19A1,1 0 0,0 7,18A1,1 0 0,0 6,17M21,18A3,3 0 0,1 18,21A3,3 0 0,1 15,18C15,16.69 15.83,15.58 17,15.17V7H15V10.25L10.75,6L15,1.75V5H17A2,2 0 0,1 19,7V15.17C20.17,15.58 21,16.69 21,18M18,17A1,1 0 0,0 17,18A1,1 0 0,0 18,19A1,1 0 0,0 19,18A1,1 0 0,0 18,17Z" />
                                </svg>
                                Integrate
                            </a>
                        </li>
                        <li class="margin-bottom">
                            <a @click="deleteBranch" class="button outline full-width text-center">
                                <svg viewBox="0 0 24 24" class="icon alert">
                                    <path d="M19,4H15.5L14.5,3H9.5L8.5,4H5V6H19M6,19A2,2 0 0,0 8,21H16A2,2 0 0,0 18,19V7H6V19Z" />
                                </svg>
                                Delete
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
    <router-view v-else></router-view>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

import { JSONAPIObject } from '../store/index';

interface FileSet {
    id: string;
    files: JSONAPIObject[];
}

@Component
export default class BranchOverview extends Vue {
    public get branch(): JSONAPIObject | null {
        if (this.$store.state.data.branches && this.$store.state.data.branches[this.$route.params.bid]) {
            return this.$store.state.data.branches[this.$route.params.bid];
        } else {
            return null;
        }
    }

    public get fileSets(): FileSet[] {
        if (this.branch && this.$store.state.data.files) {
            const fileSets = [] as FileSet[];
            let fileSet = null as FileSet | null;
            (this.branch.relationships.files.data as JSONAPIObject[]).forEach((fileRef) => {
                if (fileRef.id && this.$store.state.data.files[fileRef.id]) {
                    const file = this.$store.state.data.files[fileRef.id];
                    if (!fileSet || fileSet.id !== file.attributes.path) {
                        if (fileSet) {
                            fileSets.push(fileSet);
                        }
                        fileSet = {
                            id: file.attributes.path,
                            files: []
                        }
                    }
                    fileSet.files.push(file);
                }
            });
            if (fileSet) {
                fileSets.push(fileSet);
            }
            return fileSets;
        } else {
            return [];
        }
    }

    public get isCurrentRoute() {
        return this.$route.name === 'branch';
    }

    public deleteBranch(ev: Event) {
        ev.preventDefault();
        if (this.branch) {
            if (confirm('Deleting this task (' + this.branch.attributes.name + ') will also delete any changes that have been made there and that have not been integrated into the default copy.\n\nThis cannot be undone.\n\nPlease confirm you wish to proceed.')) {
                this.$store.dispatch('deleteBranch', this.branch);
                this.$router.push({name: 'root'});
            }
        }
    }
}
</script>
