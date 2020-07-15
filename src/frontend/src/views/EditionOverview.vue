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
                <h1>Currently Active Tasks</h1>
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
                        <router-link :to="'/branches/' + branch.id" v-slot="{ href, navigate }">
                            <h2><a :href="href" @click="navigate">{{ branch.attributes.name }}</a></h2>
                        </router-link>
                        <div class="shrink align-middle">
                            <a @click="deleteBranch(branch)">
                                <svg viewBox="0 0 24 24" class="icon alert">
                                    <path d="M19,4H15.5L14.5,3H9.5L8.5,4H5V6H19M6,19A2,2 0 0,0 8,21H16A2,2 0 0,0 18,19V7H6V19Z" />
                                </svg>
                            </a>
                        </div>
                    </dt>
                    <dd :key="branch.id + '-dd'">
                        <span>Created: {{ fancyDate(branch.attributes.created) }}</span>
                        <span><template v-if="branch.attributes.updated">Last Change: {{ fancyDate(branch.attributes.updated) }}</template></span>
                        <span><template v-if="branch.attributes.authors">Edited By:</template></span>
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
    public addBranch = false;
    public addingBranch = false;
    public newBranchName = '';

    public get branches() {
        if (this.$store.state.data.branches) {
            return Object.values(this.$store.state.data.branches);
        } else {
            return [];
        }
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
        if (date.getDay() < 10) {
            parts.push('0');
        }
        parts.push(date.getDay());
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
