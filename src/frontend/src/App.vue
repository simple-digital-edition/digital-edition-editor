<template>
    <div id="app">
        <div v-if="$store.state.busy" id="busy">
            <progress :value="$store.state.completedBusyCounter" :max="$store.state.maxBusyCounter"></progress>
        </div>
        <nav class="main">
            <aria-menubar v-slot="{ keyboardNav }">
                <ul role="menubar">
                    <li role="presentation"><span>Digital Edition Editor</span></li>
                    <template v-if="$store.state.loggedIn">
                        <router-link to="/" v-slot="{ href, navigate, isExactActive }">
                            <li role="presentation"><a role="menuitem" tabindex="0" :href="href" :aria-current="isExactActive ? 'true' : 'false'" @click="navigate" @keyup="keyboardNav">Edition</a></li>
                        </router-link>
                        <router-link v-if="branch" :to="'/branches/' + branch.id" v-slot="{ href, navigate, isExactActive }">
                            <li role="presentation"><a role="menuitem" tabindex="-1" :href="href" :aria-current="isExactActive ? 'true' : 'false'" @click="navigate" @keyup="keyboardNav">{{ branch.attributes.name }}</a></li>
                        </router-link>
                        <router-link v-if="file" :to="'/branches/' + branch.id + '/files/' + file.id" v-slot="{ href, navigate, isExactActive }">
                            <li role="presentation"><a role="menuitem" tabindex="-1" :href="href" :aria-current="isExactActive ? 'true' : 'false'" @click="navigate" @keyup="keyboardNav">{{ file.attributes.name }}</a></li>
                        </router-link>
                    </template>
                </ul>
            </aria-menubar>
            <aria-menubar v-slot="{ keyboardNav }">
                <ul role="menubar">
                    <template v-if="$store.state.loggedIn">
                        <li role="presentation"><a role="menuitem" tabindex="0" @click="toggleHelp" @keyup="keyboardNav"><template v-if="showHelp">Hide </template>Help</a></li>
                        <li role="presentation"><a role="menuitem" tabindex="0" @click="toggleAbout" @keyup="keyboardNav">About</a></li>
                        <li role="presentation"><a role="menuitem" tabindex="-1" @click="logOut" @keyup="keyboardNav">Sign out</a></li>
                    </template>
                    <router-link v-else to="/login" v-slot="{ href, navigate, isExactActive }">
                        <li role="presentation"><a role="menuitem" tabindex="0" :href="href" :aria-current="isExactActive ? 'true' : 'false'" @click="navigate" @keyup="keyboardNav">Sign in</a></li>
                    </router-link>
                </ul>
            </aria-menubar>
        </nav>
        <aria-dialog v-if="showAbout">
            <div role="dialog" aria-modal="true" @click="toggleAbout">
                <div class="flex">
                    <h2 class="shrink">Digital Edition Editor</h2>
                    <ol class="no-bullet expand">
                        <li v-for="version in $store.state.config.versions" :key="version.version" class="margin-bottom">
                            <h3>{{ version.version }} ({{ fancyDate(version.date) }})</h3>
                            <ul class="no-bullet">
                                <li v-for="(change, idx) in version.changes" :key="idx">
                                    <svg v-if="change.type === 'new'" viewBox="0 0 24 24" class="icon" aria-label="New">
                                        <path d="M20,4C21.11,4 22,4.89 22,6V18C22,19.11 21.11,20 20,20H4C2.89,20 2,19.11 2,18V6C2,4.89 2.89,4 4,4H20M8.5,15V9H7.25V12.5L4.75,9H3.5V15H4.75V11.5L7.3,15H8.5M13.5,10.26V9H9.5V15H13.5V13.75H11V12.64H13.5V11.38H11V10.26H13.5M20.5,14V9H19.25V13.5H18.13V10H16.88V13.5H15.75V9H14.5V14A1,1 0 0,0 15.5,15H19.5A1,1 0 0,0 20.5,14Z" />
                                    </svg>
                                    <svg v-else-if="change.type === 'update'" viewBox="0 0 24 24" class="icon" aria-label="Update" title="Update">
                                        <path d="M18.75 22.16L16 19.16L17.16 18L18.75 19.59L22.34 16L23.5 17.41L18.75 22.16M13 13V7H11V13H13M13 17V15H11V17H13M12 2C17.5 2 22 6.5 22 12L21.91 13.31C21.31 13.11 20.67 13 20 13C16.69 13 14 15.69 14 19C14 19.95 14.22 20.85 14.62 21.65C13.78 21.88 12.91 22 12 22C6.5 22 2 17.5 2 12C2 6.5 6.5 2 12 2Z" />
                                    </svg>
                                    <svg v-else-if="change.type === 'bugfix'" viewBox="0 0 24 24" class="icon" aria-label="Bugfix">
                                        <path d="M18,7H15.19C14.74,6.2 14.12,5.5 13.37,5L15,3.41L13.59,2L11.42,4.17C10.96,4.06 10.5,4 10,4C9.5,4 9.05,4.06 8.59,4.17L6.41,2L5,3.41L6.62,5C5.87,5.5 5.26,6.21 4.81,7H2V9H4.09C4.03,9.33 4,9.66 4,10V11H2V13H4V14C4,14.34 4.03,14.67 4.09,15H2V17H4.81C6.26,19.5 9.28,20.61 12,19.65C12,19.43 12,19.22 12,19C12,16.46 13.61,14.2 16,13.35V13H18V11H16V10C16,9.66 15.97,9.33 15.91,9H18V7M12,15H8V13H12V15M12,11H8V9H12V11M17.75,22.16L15,19.16L16.16,18L17.75,19.59L21.34,16L22.5,17.41L17.75,22.16Z" />
                                    </svg>
                                    {{ change.message }}</li>
                            </ul>
                        </li>
                    </ol>
                    <div class="text-right margin-top">
                        <button class="button small" @click="toggleAbout">Close</button>
                    </div>
                </div>
            </div>
        </aria-dialog>
        <main class="flex">
            <router-view/>
            <aside v-if="showHelp" class="help flex vertical shrink">
                <iframe src="https://digital-edition-editor.readthedocs.io" class="expand"></iframe>
            </aside>
        </main>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

import AriaMenubar from '@/components/AriaMenubar.vue';
import AriaDialog from '@/components/AriaDialog.vue';
import { JSONAPIObject } from './store/index';

@Component({
    components: {
        AriaMenubar,
        AriaDialog,
    },
})
export default class App extends Vue {
    public showAbout = false;
    public showHelp = false;

    public get branch(): JSONAPIObject | null {
        if (this.$store.state.data.branches && this.$store.state.data.branches[this.$route.params.bid]) {
            return this.$store.state.data.branches[this.$route.params.bid];
        } else {
            return null;
        }
    }

    public get file(): string | null {
        if (this.$store.state.data.files && this.$store.state.data.files[this.$route.params.fid]) {
            return this.$store.state.data.files[this.$route.params.fid];
        } else {
            return null;
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
        if (date.getMonth() + 1 < 10) {
            parts.push('0');
        }
        parts.push(date.getMonth() + 1);
        parts.push('.');
        parts.push(date.getFullYear());
        return parts.join('');
    }

    public logOut(): void {
        this.$store.commit('setUserId', '');
        this.$store.commit('setUserToken', '');
        this.$store.commit('setLoggedIn', false);
        this.$router.push({name: 'login'});
    }

    public toggleAbout(ev: MouseEvent): void {
        ev.stopPropagation();
        this.showAbout = !this.showAbout;
    }

    public toggleHelp(ev: MouseEvent): void {
        ev.stopPropagation();
        this.showHelp = !this.showHelp;
    }
}
</script>
