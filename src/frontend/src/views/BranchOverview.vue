<template>
    <div v-if="isCurrentRoute" class="branch-overview">
        <div v-if="flash" class="flash flex">
            <p>{{ flash }}</p>
            <a class="shrink" @click="setFlash('')">
                <svg viewBox="0 0 24 24" class="icon small">
                    <path d="M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z" />
                </svg>
            </a>
        </div>
        <div v-if="branch" class="width-limited">
            <template v-if="branch.attributes.status === 'active'">
                <div class="flex">
                    <h1 class="no-margin">{{ branch.attributes.name }}</h1>
                    <aria-menubar v-slot="{ keyboardNav }">
                        <ul role="menubar" class="shrink transparent">
                            <li v-if="branch.attributes.updates" role="presentation">
                                <a role="menuitem" tabindex="0" aria-label="Update to latest changes from the primary copy" title="Update to latest changes from the primary copy" @keyup="keyboardNav" @click="rebase">
                                    <svg viewBox="0 0 24 24" class="icon warning">
                                        <path d="M13 14C9.64 14 8.54 15.35 8.18 16.24C9.25 16.7 10 17.76 10 19C10 20.66 8.66 22 7 22S4 20.66 4 19C4 17.69 4.83 16.58 6 16.17V7.83C4.83 7.42 4 6.31 4 5C4 3.34 5.34 2 7 2S10 3.34 10 5C10 6.31 9.17 7.42 8 7.83V13.12C8.88 12.47 10.16 12 12 12C14.67 12 15.56 10.66 15.85 9.77C14.77 9.32 14 8.25 14 7C14 5.34 15.34 4 17 4S20 5.34 20 7C20 8.34 19.12 9.5 17.91 9.86C17.65 11.29 16.68 14 13 14M7 18C6.45 18 6 18.45 6 19S6.45 20 7 20 8 19.55 8 19 7.55 18 7 18M7 4C6.45 4 6 4.45 6 5S6.45 6 7 6 8 5.55 8 5 7.55 4 7 4M17 6C16.45 6 16 6.45 16 7S16.45 8 17 8 18 7.55 18 7 17.55 6 17 6M18 14C19.1 14 20.1 14.4 20.8 15.2L22 14V18H18L19.8 16.2C19.3 15.8 18.7 15.5 18 15.5C16.6 15.5 15.5 16.6 15.5 18S16.6 20.5 18 20.5C18.8 20.5 19.5 20.1 20 19.5H21.7C21.1 21 19.7 22 18 22C15.8 22 14 20.2 14 18S15.8 14 18 14Z" />
                                    </svg>
                                </a>
                            </li>
                            <li role="presentation">
                                <a v-if="branch.attributes.pull_request && branch.attributes.pull_request.state === 'open'" role="menuitem" :tabindex="branch.attributes.updates ? -1 : 0" aria-label="Cancel the integration" title="Cancel the integration" @keyup="keyboardNav" @click="cancelIntegration">
                                    <svg viewBox="0 0 24 24" class="icon">
                                        <path d="M6,3A3,3 0 0,1 9,6C9,7.31 8.17,8.42 7,8.83V15.17C8.17,15.58 9,16.69 9,18A3,3 0 0,1 6,21A3,3 0 0,1 3,18C3,16.69 3.83,15.58 5,15.17V8.83C3.83,8.42 3,7.31 3,6A3,3 0 0,1 6,3M6,5A1,1 0 0,0 5,6A1,1 0 0,0 6,7A1,1 0 0,0 7,6A1,1 0 0,0 6,5M6,17A1,1 0 0,0 5,18A1,1 0 0,0 6,19A1,1 0 0,0 7,18A1,1 0 0,0 6,17M17.17,11.77V7H15V10.25L10.75,6L15,1.75V5H17A2,2 0 0,1 19,7V11.77H17.17M17.5 13C15 13 13 15 13 17.5C13 20 15 22 17.5 22C20 22 22 20 22 17.5C22 15 20 13 17.5 13M17.5 14.5C19.16 14.5 20.5 15.84 20.5 17.5C20.5 18.06 20.35 18.58 20.08 19L16 14.92C16.42 14.65 16.94 14.5 17.5 14.5M14.92 16L19 20.08C18.58 20.35 18.06 20.5 17.5 20.5C15.84 20.5 14.5 19.16 14.5 17.5C14.5 16.94 14.65 16.42 14.92 16Z" />
                                    </svg>
                                </a>
                                <a v-else role="menuitem" :tabindex="branch.attributes.updates ? -1 : 0" aria-label="Request integration into the primary copy" title="request integration into the primary copy" @keyup="keyboardNav" @click="requestIntegration">
                                    <svg viewBox="0 0 24 24" class="icon">
                                        <path d="M6,3A3,3 0 0,1 9,6C9,7.31 8.17,8.42 7,8.83V15.17C8.17,15.58 9,16.69 9,18A3,3 0 0,1 6,21A3,3 0 0,1 3,18C3,16.69 3.83,15.58 5,15.17V8.83C3.83,8.42 3,7.31 3,6A3,3 0 0,1 6,3M6,5A1,1 0 0,0 5,6A1,1 0 0,0 6,7A1,1 0 0,0 7,6A1,1 0 0,0 6,5M6,17A1,1 0 0,0 5,18A1,1 0 0,0 6,19A1,1 0 0,0 7,18A1,1 0 0,0 6,17M21,18A3,3 0 0,1 18,21A3,3 0 0,1 15,18C15,16.69 15.83,15.58 17,15.17V7H15V10.25L10.75,6L15,1.75V5H17A2,2 0 0,1 19,7V15.17C20.17,15.58 21,16.69 21,18M18,17A1,1 0 0,0 17,18A1,1 0 0,0 18,19A1,1 0 0,0 19,18A1,1 0 0,0 18,17Z" />
                                    </svg>
                                </a>
                            </li>
                            <li role="presentation">
                                <a role="menuitem" tabindex="-1" aria-label="Add a file" title="Add a file" @keyup="keyboardNav" @click="rescan">
                                    <svg viewBox="0 0 24 24" class="icon alert">
                                        <path d="M19,13H13V19H11V13H5V11H11V5H13V11H19V13Z" />
                                    </svg>
                                </a>
                            </li>
                            <li role="presentation">
                                <a role="menuitem" tabindex="-1" aria-label="Delete this task" title="Delete this task" @keyup="keyboardNav" @click="deleteBranch">
                                    <svg viewBox="0 0 24 24" class="icon alert">
                                        <path d="M19,4H15.5L14.5,3H9.5L8.5,4H5V6H19M6,19A2,2 0 0,0 8,21H16A2,2 0 0,0 18,19V7H6V19Z" />
                                    </svg>
                                </a>
                            </li>
                        </ul>
                    </aria-menubar>
                </div>
                <aria-menubar v-slot="{ keyboardNav }">
                    <ul role="menubar" class="transparent">
                        <li v-if="branch.attributes.changes && branch.attributes.changes.length > 0" role="presentation">
                            <a role="menuitem" :aria-current="mode === 'changed' ? 'true' : 'false'" @keyup="keyboardNav" @click="setMode('changed')">Changed Files</a>
                        </li>
                        <li role="presentation">
                            <a role="menuitem" :aria-current="mode === 'files' ? 'true' : 'false'" @keyup="keyboardNav" @click="setMode('files')">All Files</a>
                        </li>
                        <li v-if="branch.attributes.pull_request && branch.attributes.pull_request.state === 'open' && branch.attributes.pull_request.reviews && branch.attributes.pull_request.reviews.length > 0" role="presentation">
                            <a role="menuitem" :aria-current="mode === 'integration' ? 'true' : 'false'" @keyup="keyboardNav" @click="setMode('integration')">Integration Reviews</a>
                        </li>
                        <template v-if="mode === 'files'">
                            <li role="presentation" class="expander"></li>
                            <li role="presentation">
                                <form class="flex file-filter" @submit="$event.preventDefault();">
                                    <input type="search" v-model="fileFilter" />
                                    <svg viewBox="0 0 24 24" class="icon">
                                        <path d="M9.5,3A6.5,6.5 0 0,1 16,9.5C16,11.11 15.41,12.59 14.44,13.73L14.71,14H15.5L20.5,19L19,20.5L14,15.5V14.71L13.73,14.44C12.59,15.41 11.11,16 9.5,16A6.5,6.5 0 0,1 3,9.5A6.5,6.5 0 0,1 9.5,3M9.5,5C7,5 5,7 5,9.5C5,12 7,14 9.5,14C12,14 14,12 14,9.5C14,7 12,5 9.5,5Z" />
                                    </svg>
                                </form>
                            </li>
                        </template>
                    </ul>
                </aria-menubar>
                <dl v-if="mode === 'changed'" class="detail-list margin-top">
                    <template v-for="(fileSet, idx) in changedSets">
                        <dt :key="idx + '-dt'">
                            <h2 :title="fileSet.id">{{ ellipsisPath(fileSet.id, 55) }}</h2>
                        </dt>
                        <dd :key="idx + '-dd'">
                            <ul class="no-bullet">
                                <li v-for="file in fileSet.files" :key="file.id">
                                    <router-link :to="'/branches/' + branch.id + '/files/' + file.id" v-slot="{ href, navigate }">
                                        <a :href="href" @click="navigate">{{ file.attributes.name }}</a>
                                    </router-link>
                                </li>
                            </ul>
                        </dd>
                    </template>
                </dl>
                <dl v-else-if="mode === 'files'" class="detail-list margin-top">
                    <template v-for="(fileSet, idx) in fileSets">
                        <dt :key="idx + '-dt'">
                            <h2 :title="fileSet.id">{{ ellipsisPath(fileSet.id, 55) }}</h2>
                        </dt>
                        <dd :key="idx + '-dd'">
                            <ul class="no-bullet">
                                <li v-for="file in fileSet.files" :key="file.id">
                                    <router-link :to="'/branches/' + branch.id + '/files/' + file.id" v-slot="{ href, navigate }">
                                        <a :href="href" @click="navigate">{{ file.attributes.name }}</a>
                                    </router-link>
                                </li>
                            </ul>
                        </dd>
                    </template>
                </dl>
                <dl v-else-if="mode === 'integration'" class="detail-list margin-top">
                    <template v-for="(review, idx) in branch.attributes.pull_request.reviews">
                        <dt :key="idx + '-dt'" class="flex">
                            <h2>{{ review.user }}</h2>
                            <svg v-if="review.state === 'APPROVED'" viewBox="0 0 24 24" class="shrink icon success">
                                <path d="M21,7L9,19L3.5,13.5L4.91,12.09L9,16.17L19.59,5.59L21,7Z" />
                            </svg>
                            <svg v-else-if="review.state !== ''" viewBox="0 0 24 24" class="shrink icon warning">
                                <path d="M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z" />
                            </svg>
                        </dt>
                        <dd :key="idx + '-dd'">
                            {{ review.body }}
                        </dd>
                    </template>
                </dl>
            </template>
            <div v-else-if="branch.attributes.status === 'merged'">
                <h1>{{ branch.attributes.name }}</h1>
                <p>This task has been integrated into the primary copy.</p>
            </div>
            <div v-else-if="branch.attributes.status === 'deleted'">
                <h1>{{ branch.attributes.name }}</h1>
                <p>This task has been deleted.</p>
            </div>
        </div>
    </div>
    <router-view v-else></router-view>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

import AriaMenubar from '../components/AriaMenubar.vue';
import { JSONAPIObject } from '../store/index';

interface FileSet {
    id: string;
    files: JSONAPIObject[];
}

@Component({
    components: {
        AriaMenubar,
    }
})
export default class BranchOverview extends Vue {
    private intervalId = -1;
    private fileFilterDebounce = -1;
    public fileFilterValue = '';
    public mode = 'files';
    public flash = '';

    public get fileFilter() {
        return this.fileFilterValue;
    }

    public set fileFilter(value) {
        window.clearTimeout(this.fileFilterDebounce);
        this.fileFilterDebounce = window.setTimeout(() => {
            this.fileFilterValue = value;
        }, 300);
    }

    public get branch(): JSONAPIObject | null {
        if (this.$store.state.data.branches && this.$store.state.data.branches[this.$route.params.bid]) {
            return this.$store.state.data.branches[this.$route.params.bid];
        } else {
            return null;
        }
    }

    public get fileSets(): FileSet[] {
        if (this.$store.state.busy) {
            return [{id: 'Loading...', files: []}];
        } else if (this.branch && this.$store.state.data.files) {
            const fileSets = [] as FileSet[];
            let fileSet = null as FileSet | null;
            if (this.branch.relationships.files) {
                (this.branch.relationships.files.data as JSONAPIObject[]).forEach((fileRef) => {
                    if (fileRef.id && this.$store.state.data.files[fileRef.id]) {
                        const file = this.$store.state.data.files[fileRef.id];
                        if (this.fileFilter === '' || this.contains(file.attributes.filename, this.fileFilter)) {
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
                    }
                });
                if (fileSet) {
                    fileSets.push(fileSet);
                }
            }
            return fileSets;
        } else {
            return [];
        }
    }

    public get changedSets(): FileSet[] {
        if (this.branch && this.branch.attributes.changes && this.branch.attributes.changes.length > 0) {
            const fileSets = [] as FileSet[];
            let fileSet = null as FileSet | null;
            (this.branch.attributes.changes as unknown as JSONAPIObject[]).forEach((file) => {
                if (!fileSet || fileSet.id !== file.attributes.path) {
                    if (fileSet) {
                        fileSets.push(fileSet);
                    }
                    fileSet = {
                        id: file.attributes.path as string,
                        files: []
                    }
                }
                fileSet.files.push(file);
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

    public async mounted() {
        await this.$store.dispatch('loadBranch', {type: 'branches', id: this.$route.params.bid});
        if (this.branch && this.branch.attributes.changes && this.branch.attributes.changes.length > 0) {
            this.mode = 'changed';
        }
        this.intervalId = window.setInterval(async () => {
            if (this.branch) {
                try {
                    await this.$store.dispatch('backgroundFetchSingle', this.branch);
                } catch(error) {
                    if (error.response.status == 404) {
                        this.$store.commit('deleteObject', this.branch);
                        this.$store.dispatch('loadBranches');
                        this.$router.push({name: 'root'});
                    }
                }
            }
        }, 10000);
    }

    public beforeDestroy() {
        window.clearInterval(this.intervalId);
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

    public async requestIntegration(ev: Event) {
        ev.preventDefault();
        if (this.branch) {
            await this.$store.dispatch('action', {'obj': this.branch, 'action': 'request-integration'});
            this.setFlash('The integration has been requested. The interface will take a few seconds for this to show.')
        }
    }

    public async cancelIntegration(ev: Event) {
        ev.preventDefault();
        if (this.branch) {
            await this.$store.dispatch('action', {'obj': this.branch, 'action': 'cancel-integration'});
            this.setFlash('The integration has been cancelled. The interface will take a few seconds for this to show.')
        }
    }

    public async rebase(ev: Event) {
        ev.preventDefault();
        if (this.branch) {
            await this.$store.dispatch('action', {'obj': this.branch, 'action': 'rebase'});
            this.setFlash('The changes from the primary copy have been integrated.')
        }
    }

    public async rescan(ev: Event) {
        ev.preventDefault();
        if (this.branch) {
            await this.$store.dispatch('action', {'obj': this.branch, 'action': 'rescan'});
            await this.$store.dispatch('loadBranch', this.branch);
            this.setFlash('All new files have been loaded.')
        }
    }

    public setMode(mode: string) {
        this.mode = mode;
    }

    public setFlash(flash: string) {
        this.flash = flash;
    }

    public ellipsisPath(text: string, maxLength: number) {
        if (text.length > maxLength) {
            const path = text.split('/');
            if (path[0].length + path[path.length - 1].length >= maxLength - 5) {
                return '.../' + path[path.length - 1];
            } else {
                const result = path.splice(0, 1);
                let length = result[0].length;
                while (length < (maxLength - 5) && path.length > 0) {
                    const added = path.splice(path.length - 1, 1)[0];
                    if (length + added.length < (maxLength - 5)) {
                        result.splice(1, 0, added);
                        length = length + added.length + 1;
                    } else {
                        break;
                    }
                }
                return result[0] + '/.../' + result.slice(1).join('/');
            }
        } else{
            return text;
        }
    }

    private contains(haystack: string, needle: string): boolean {
        haystack = haystack.toLowerCase().replace('-', ' ');
        needle = needle.toLowerCase();
        return haystack.indexOf(needle) >= 0;
    }
}
</script>
