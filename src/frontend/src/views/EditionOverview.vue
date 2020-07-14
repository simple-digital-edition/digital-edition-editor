<template>
    <div class="home">
        <aria-dialog v-if="addTask">
            <div role="dialog" aria-modal="true">
                <form class="flex vertical" @submit="createTask">
                    <div>
                        <h2>Add a Task</h2>
                        <label>Task Name
                            <input type="text"/>
                        </label>
                    </div>
                    <div class="shrink">
                        <button @click="toggleAddTask">Don't add</button>
                        <button>Add a Task</button>
                    </div>
                </form>
            </div>
        </aria-dialog>
        <div class="width-limited">
            <div class="flex">
                <h1>Currently Active Tasks</h1>
                <a class="shrink with-icon" @click="toggleAddTask">
                    <svg viewBox="0 0 24 24" class="icon small">
                        <path d="M12,20C7.59,20 4,16.41 4,12C4,7.59 7.59,4 12,4C16.41,4 20,7.59 20,12C20,16.41 16.41,20 12,20M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M13,7H11V11H7V13H11V17H13V13H17V11H13V7Z" />
                    </svg>
                    <span>Add a Task</span>
                </a>
            </div>
            <dl class="detail-list">
                <dt>
                    <h2><a href="">Branch 1</a></h2>
                </dt>
                <dd>
                    <span>Created: 01.01.2020</span>
                    <span>Last Change: 01.01.2020</span>
                    <span>Edited By: Person 1 and Person 2</span>
                </dd>
            <dt>
                <h2><a href="">Branch 2</a></h2>
            </dt>
            <dd>
                <span>Created: 01.01.2020</span>
                <span>Last Change: 01.01.2020</span>
                <span>Edited By: Person 1 and Person 2</span>
            </dd>
            <dt>
                <h2><a href="">Branch 3</a></h2>
            </dt>
            <dd>
                <span>Created: 01.01.2020</span>
                <span>Last Change: 01.01.2020</span>
                <span>Edited By: Person 1 and Person 2</span>
            </dd>
            <dt>
                <h2><a href="">Branch 4</a></h2>
            </dt>
            <dd>
                <span>Created: 01.01.2020</span>
                <span>Last Change: 01.01.2020</span>
                <span>Edited By: Person 1 and Person 2</span>
            </dd>
            <dt>
                <h2><a href="">Branch 5</a></h2>
            </dt>
            <dd>
                <span>Created: 01.01.2020</span>
                <span>Last Change: 01.01.2020</span>
                <span>Edited By: Person 1 and Person 2</span>
            </dd>
            <dt>
                <h2><a href="">Branch 6</a></h2>
            </dt>
            <dd>
                <span>Created: 01.01.2020</span>
                <span>Last Change: 01.01.2020</span>
                <span>Edited By: Person 1 and Person 2</span>
            </dd>
            <dt>
                <h2><a href="">Branch 7</a></h2>
            </dt>
            <dd>
                <span>Created: 01.01.2020</span>
                <span>Last Change: 01.01.2020</span>
                <span>Edited By: Person 1 and Person 2</span>
            </dd>
            <dt>
                <h2><a href="">Branch 8</a></h2>
            </dt>
            <dd>
                <span>Created: 01.01.2020</span>
                <span>Last Change: 01.01.2020</span>
                <span>Edited By: Person 1 and Person 2</span>
            </dd>
            <dt>
                <h2><a href="">Branch 9</a></h2>
            </dt>
            <dd>
                <span>Created: 01.01.2020</span>
                <span>Last Change: 01.01.2020</span>
                <span>Edited By: Person 1 and Person 2</span>
            </dd>
            <dt>
                <h2><a href="">Branch 10</a></h2>
            </dt>
            <dd>
                <span>Created: 01.01.2020</span>
                <span>Last Change: 01.01.2020</span>
                <span>Edited By: Person 1 and Person 2</span>
            </dd>
            <dt>
                <h2><a href="">Branch 11</a></h2>
            </dt>
            <dd>
                <span>Created: 01.01.2020</span>
                <span>Last Change: 01.01.2020</span>
                <span>Edited By: Person 1 and Person 2</span>
            </dd>
            </dl>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

import AriaDialog from '@/components/AriaDialog.vue';

@Component({
    components: {
        AriaDialog,
    }
})
export default class EditionOverview extends Vue {
    public addTask = false;

    public toggleAddTask(ev): void {
        ev.preventDefault();
        this.addTask = !this.addTask;
    }

    public createTask(ev): void {
        ev.preventDefault();
        this.addTask = false;
    }
}
</script>
