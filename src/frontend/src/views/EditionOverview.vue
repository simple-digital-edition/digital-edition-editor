<template>
    <div class="home">
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
            <form class="flex align-end align-bottom margin-bottom">
                <span class="shrink margin-right">
                    <label>
                        <input type="checkbox" v-model="showActive"/>
                        Active Tasks
                    </label>
                </span>
                <span class="shrink margin-right">
                    <label>
                        <input type="checkbox" v-model="showIntegrated"/>
                        Integrated Tasks
                    </label>
                </span>
                <span class="shrink">
                    <label>
                        <input type="checkbox" v-model="showDeleted"/>
                        Deleted Tasks
                    </label>
                </span>
            </form>
            <dl class="detail-list">
                <template v-for="branch in paginatedBranches">
                    <dt :key="branch.id + '-dt'" class="flex">
                        <router-link v-if="branch.attributes.status === 'active'" :to="'/branches/' + branch.id" v-slot="{ href, navigate }">
                            <h2><a :href="href" @click="navigate">{{ branch.attributes.name }}</a></h2>
                        </router-link>
                        <h2 v-else>{{ branch.attributes.name }}</h2>
                        <div class="shrink align-middle">
                            <template v-if="branch.attributes.status === 'active'">
                                <a v-if="branch.attributes.updates" @click="rebase(branch, $event)" aria-label="Update to latest changes from the primary copy" title="Update to latest changes from the primary copy" class="margin-right-small">
                                    <svg viewBox="0 0 24 24" class="icon warning">
                                        <path d="M13 14C9.64 14 8.54 15.35 8.18 16.24C9.25 16.7 10 17.76 10 19C10 20.66 8.66 22 7 22S4 20.66 4 19C4 17.69 4.83 16.58 6 16.17V7.83C4.83 7.42 4 6.31 4 5C4 3.34 5.34 2 7 2S10 3.34 10 5C10 6.31 9.17 7.42 8 7.83V13.12C8.88 12.47 10.16 12 12 12C14.67 12 15.56 10.66 15.85 9.77C14.77 9.32 14 8.25 14 7C14 5.34 15.34 4 17 4S20 5.34 20 7C20 8.34 19.12 9.5 17.91 9.86C17.65 11.29 16.68 14 13 14M7 18C6.45 18 6 18.45 6 19S6.45 20 7 20 8 19.55 8 19 7.55 18 7 18M7 4C6.45 4 6 4.45 6 5S6.45 6 7 6 8 5.55 8 5 7.55 4 7 4M17 6C16.45 6 16 6.45 16 7S16.45 8 17 8 18 7.55 18 7 17.55 6 17 6M18 13V14.5C20.21 14.5 22 16.29 22 18.5C22 19.32 21.75 20.08 21.33 20.71L20.24 19.62C20.41 19.28 20.5 18.9 20.5 18.5C20.5 17.12 19.38 16 18 16V17.5L15.75 15.25L15.72 15.22C15.78 15.17 15.85 15.13 18 13M18 24V22.5C15.79 22.5 14 20.71 14 18.5C14 17.68 14.25 16.92 14.67 16.29L15.76 17.38C15.59 17.72 15.5 18.1 15.5 18.5C15.5 19.88 16.62 21 18 21V19.5L20.25 21.75L20.28 21.78C20.22 21.83 20.15 21.87 18 24" />
                                    </svg>
                                </a>
                                <router-link v-if="branch.attributes.pull_request && branch.attributes.pull_request.state === 'open' && branch.attributes.pull_request.reviews && branch.attributes.pull_request.reviews.length > 0" :to="'/branches/' + branch.id" v-slot="{ href, navigate }">
                                    <a :href="href" @click="navigate" aria-label="This task has review comments" title="This task has review comments" class="margin-right">
                                        <svg viewBox="0 0 24 24" class="icon warning">
                                            <path d="M9,22A1,1 0 0,1 8,21V18H4A2,2 0 0,1 2,16V4C2,2.89 2.9,2 4,2H20A2,2 0 0,1 22,4V16A2,2 0 0,1 20,18H13.9L10.2,21.71C10,21.9 9.75,22 9.5,22V22H9M10,16V19.08L13.08,16H20V4H4V16H10M13,10H11V6H13V10M13,14H11V12H13V14Z" />
                                        </svg>
                                    </a>
                                </router-link>
                                <a @click="deleteBranch(branch)">
                                    <svg viewBox="0 0 24 24" class="icon warning">
                                        <path d="M19,4H15.5L14.5,3H9.5L8.5,4H5V6H19M6,19A2,2 0 0,0 8,21H16A2,2 0 0,0 18,19V7H6V19Z" />
                                    </svg>
                                </a>
                            </template>
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
                        <span><template v-if="branch.attributes.authors && branch.attributes.authors.length > 0">Changes By: {{ branch.attributes.authors.join(', ') }}</template></span>
                    </dd>
                </template>
            </dl>
            <div class="flex">
                <span>
                    <a v-if="taskPage > 0" @click="paginate(-1)">&laquo; Previous Page</a>
                    <span v-else class="disabled">&laquo; Previous Page</span>
                </span>
                <span class="text-center">{{ taskPage * 10 + 1 }} - {{ Math.min((taskPage + 1) * 10, branches.length) }}</span>
                <span class="text-right">
                    <a v-if="taskPage < Math.ceil(branches.length / 10) - 1" @click="paginate(1)">Next Page &raquo;</a>
                    <span v-else class="disabled">Next Page &raquo;</span>
                </span>
            </div>
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
    public showActive = true;
    public showIntegrated = false;
    public showDeleted = false;
    public taskPage = 0;

    public get branches(): JSONAPIObject[] {
        if (this.$store.state.data.branches) {
            let branches = Object.values(this.$store.state.data.branches) as JSONAPIObject[];
            branches = branches.filter((branch) => {
                if (this.showActive && branch.attributes.status === 'active') {
                    return true;
                } else if (this.showIntegrated && branch.attributes.status === 'merged') {
                    return true;
                } else if (this.showDeleted && branch.attributes.status === 'deleted') {
                    return true;
                }
                return false;
            });
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

    public get paginatedBranches(): JSONAPIObject[] {
        let branches = this.branches;
        if (this.taskPage * 10 > branches.length)  {
            this.taskPage = 0;
        }
        return branches.slice(this.taskPage * 10, (this.taskPage + 1) * 10);
    }

    public mounted(): void {
        this.intervalId = window.setInterval(async () => {
            await this.$store.dispatch('backgroundFetchAll', 'branches');
        }, 60000);
    }

    public beforeDestroy(): void {
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

    public fancyDate(timestamp: string): string {
        const date = new Date(timestamp);
        const parts = [];
        if (date.getDate() < 10) {
            parts.push('0');
        }
        parts.push(date.getDate());
        parts.push('.');
        if (date.getMonth() + 1< 10) {
            parts.push('0');
        }
        parts.push(date.getMonth() + 1);
        parts.push('.');
        parts.push(date.getFullYear());
        parts.push(' at ');
        if (date.getHours() < 10) {
            parts.push('0');
        }
        parts.push(date.getHours());
        parts.push(':');
        if (date.getMinutes() < 10) {
            parts.push('0');
        }
        parts.push(date.getMinutes());
        return parts.join('');
    }

    public async rebase(branch: JSONAPIObject, ev: Event): Promise<void> {
        ev.preventDefault();
        if (branch) {
            await this.$store.dispatch('action', {'obj': branch, 'action': 'rebase'});
        }
    }

    public paginate(direction: number): void {
        this.taskPage = Math.min(Math.max(0, this.taskPage + direction), Math.ceil(this.branches.length / 10) - 1)
    }
}
</script>
