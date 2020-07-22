<template>
    <div class="home margin-top">
        <aria-dialog v-if="addBranch">
            <div role="dialog" aria-modal="true">
                <form class="flex vertical" @submit="createBranch">
                    <div>
                        <h2>Add a Task</h2>
                        <label>Task Name
                            <input type="text" v-model="newBranchName"/>
                        </label>
                    </div>
                    <div class="shrink text-right">
                        <a @click="toggleAddBranch" tabindex="0">Don't add</a>
                        <button class="button margin-left" tabindex="0">Add a Task</button>
                    </div>
                </form>
            </div>
        </aria-dialog>
        <aria-dialog v-if="addingBranch">
            <div role="dialog" aria-modal="true">
                <div>
                    <h2>Adding a Task</h2>
                    <p>The new task is being created. This might take a few minutes.</p>
                </div>
            </div>
        </aria-dialog>
        <div class="width-limited">
            <div class="flex">
                <h1>Edition Tasks</h1>
                <a class="shrink with-icon" @click="toggleAddBranch">
                    <svg viewBox="0 0 24 24" class="icon small">
                        <path d="M12,20C7.59,20 4,16.41 4,12C4,7.59 7.59,4 12,4C16.41,4 20,7.59 20,12C20,16.41 16.41,20 12,20M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M13,7H11V11H7V13H11V17H13V13H17V11H13V7Z" />
                    </svg>
                    <span>Add a Task</span>
                </a>
            </div>
            <p v-if="branches.length === 0">There are currently no active tasks. <a @click="toggleAddBranch">Add a Task</a>.</p>
            <dl class="detail-list">
                <template v-for="branch in branches">
                    <dt :key="branch.id + '-dt'" class="flex">
                        <router-link v-if="branch.attributes.status === 'active'" :to="'/branches/' + branch.id" v-slot="{ href, navigate }">
                            <h2><a :href="href" @click="navigate">{{ branch.attributes.name }}</a></h2>
                        </router-link>
                        <h2 v-else>{{ branch.attributes.name }}</h2>
                        <div class="shrink align-middle">
                            <a v-if="branch.attributes.status === 'active'" @click="deleteBranch(branch)">
                                <svg viewBox="0 0 24 24" class="icon alert">
                                    <path d="M19,4H15.5L14.5,3H9.5L8.5,4H5V6H19M6,19A2,2 0 0,0 8,21H16A2,2 0 0,0 18,19V7H6V19Z" />
                                </svg>
                            </a>
                            <span v-else-if="branch.attributes.status === 'merged'" title="This task has been integrated">
                                <svg viewBox="0 0 24 24" class="icon success">
                                    <path d="M6,3A3,3 0 0,1 9,6C9,7.31 8.17,8.42 7,8.83V15.17C8.17,15.58 9,16.69 9,18A3,3 0 0,1 6,21A3,3 0 0,1 3,18C3,16.69 3.83,15.58 5,15.17V8.83C3.83,8.42 3,7.31 3,6A3,3 0 0,1 6,3M6,5A1,1 0 0,0 5,6A1,1 0 0,0 6,7A1,1 0 0,0 7,6A1,1 0 0,0 6,5M6,17A1,1 0 0,0 5,18A1,1 0 0,0 6,19A1,1 0 0,0 7,18A1,1 0 0,0 6,17M21,18A3,3 0 0,1 18,21A3,3 0 0,1 15,18C15,16.69 15.83,15.58 17,15.17V7H15V10.25L10.75,6L15,1.75V5H17A2,2 0 0,1 19,7V15.17C20.17,15.58 21,16.69 21,18M18,17A1,1 0 0,0 17,18A1,1 0 0,0 18,19A1,1 0 0,0 19,18A1,1 0 0,0 18,17Z" />
                                </svg>
                            </span>
                            <span v-else-if="branch.attributes.status === 'deleted'" title="This task has been deleted">
                                <svg viewBox="0 0 24 24" class="icon warning">
                                    <path d="M6,3A3,3 0 0,1 9,6C9,7.31 8.17,8.42 7,8.83V15.17C8.17,15.58 9,16.69 9,18A3,3 0 0,1 6,21A3,3 0 0,1 3,18C3,16.69 3.83,15.58 5,15.17V8.83C3.83,8.42 3,7.31 3,6A3,3 0 0,1 6,3M6,5A1,1 0 0,0 5,6A1,1 0 0,0 6,7A1,1 0 0,0 7,6A1,1 0 0,0 6,5M6,17A1,1 0 0,0 5,18A1,1 0 0,0 6,19A1,1 0 0,0 7,18A1,1 0 0,0 6,17M21,18A3,3 0 0,1 18,21A3,3 0 0,1 15,18C15,16.69 15.83,15.58 17,15.17V7H15V10.25L10.75,6L15,1.75V5H17A2,2 0 0,1 19,7V15.17C20.17,15.58 21,16.69 21,18M18,17A1,1 0 0,0 17,18A1,1 0 0,0 18,19A1,1 0 0,0 19,18A1,1 0 0,0 18,17Z" />
                                </svg>
                            </span>
                        </div>
                    </dt>
                    <dd :key="branch.id + '-dd'">
                        <span>Started at: {{ fancyDate(branch.attributes.created) }}</span>
                        <span v-if="branch.attributes.updated"><template>Last Change: {{ fancyDate(branch.attributes.updated) }}</template></span>
                        <span v-else-if="branch.attributes.merged"><template>Integrated: {{ fancyDate(branch.attributes.merged) }}</template></span>
                        <span v-else-if="branch.attributes.deleted"><template>Deleted: {{ fancyDate(branch.attributes.deleted) }}</template></span>
                        <span v-else></span>
                        <span><template v-if="branch.attributes.authors && branch.attributes.authors.length > 0">Edited By: {{ branch.attributes.authors.join(', ') }}</template></span>
                    </dd>
                </template>
            </dl>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

import AriaDialog from '@/components/AriaDialog.vue';
import { JSONAPIObject } from '../../../../../experiment-support-system/src/js/apps/shared/data-store/src';

@Component({
    components: {
        AriaDialog,
    }
})
export default class EditionOverview extends Vue {
    private intervalId = -1;
    public addBranch = false;
    public addingBranch = false;
    public newBranchName = '';

    public get branches() {
        if (this.$store.state.data.branches) {
            const branches = Object.values(this.$store.state.data.branches) as JSONAPIObject[];
            branches.sort((a, b) => {
                let dateA;
                let dateB;
                if (a.attributes.updated) {
                    dateA = new Date(a.attributes.updated as string);
                } else if (a.attributes.merged) {
                    dateA = new Date(a.attributes.merged as string);
                } else if (a.attributes.deleted) {
                    dateA = new Date(a.attributes.deleted as string);
                } else if (a.attributes.created) {
                    dateA = new Date(a.attributes.created as string);
                }
                if (b.attributes.updated) {
                    dateB = new Date(b.attributes.updated as string);
                } else if (b.attributes.merged) {
                    dateB = new Date(b.attributes.merged as string);
                } else if (b.attributes.deleted) {
                    dateB = new Date(b.attributes.deleted as string);
                } else if (b.attributes.created) {
                    dateB = new Date(b.attributes.created as string);
                }
                if (dateA && dateB) {
                    if (dateA > dateB) {
                        return -1;
                    } else if (dateA < dateB) {
                        return 1;
                    }
                }
                if (a.attributes.title < b.attributes.title) {
                    return -1;
                } else if (a.attributes.title > b.attributes.title) {
                    return 1;
                } else {
                    return 0;
                }
            });
            return branches;
        } else {
            return [];
        }
    }

    public mounted() {
        this.intervalId = window.setInterval(async () => {
            await this.$store.dispatch('backgroundFetchAll', 'branches');
        }, 60000);
    }

    public beforeDestroy() {
        window.clearInterval(this.intervalId);
    }

    public toggleAddBranch(ev: Event): void {
        ev.preventDefault();
        this.addBranch = !this.addBranch;
    }

    public async createBranch(ev: Event): Promise<void> {
        ev.preventDefault();
        try {
            this.addBranch = false;
            this.addingBranch = true;
            const branch = await this.$store.dispatch('createBranch', {
                type: 'branches',
                attributes: {
                    name: this.newBranchName,
                }
            });
            this.addingBranch = true;
            this.$router.push({name: 'branch', params: {bid: branch.id}});
        } catch(error) {
            alert('Unfortunately something went wrong creating a new task');
            this.addingBranch = false;
        }
    }

    public async deleteBranch(branch: JSONAPIObject): Promise<void> {
        if (confirm('Deleting this task (' + branch.attributes.name + ') will also delete any changes that have been made there and that have not been integrated into the default copy.\n\nThis cannot be undone.\n\nPlease confirm you wish to proceed.')) {
            this.$store.dispatch('deleteBranch', branch);
        }
    }

    public fancyDate(timestamp: string) {
        const date = new Date(timestamp);
        const parts = [];
        if (date.getDate() < 10) {
            parts.push('0');
        }
        parts.push(date.getDate());
        parts.push('.');
        if (date.getMonth() < 10) {
            parts.push('0');
        }
        parts.push(date.getMonth());
        parts.push('.');
        parts.push(date.getFullYear());
        parts.push(' at ');
        parts.push(date.getHours());
        parts.push(':');
        parts.push(date.getMinutes());
        return parts.join('');
    }
}
</script>
