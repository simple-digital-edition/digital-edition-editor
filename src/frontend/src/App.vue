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
                        <router-link to="/" v-slot="{ href, navigate, isActive, isExactActive }">
                            <li role="presentation"><a role="menuitem" tabindex="0" :href="href" :aria-current="isExactActive ? 'true' : 'false'" @click="navigate" @keyup="keyboardNav">Edition</a></li>
                        </router-link>
                        <router-link v-if="branch" :to="'/branches/' + branch.id" v-slot="{ href, navigate, isActive, isExactActive }">
                            <li role="presentation"><a role="menuitem" tabindex="-1" :href="href" :aria-current="isExactActive ? 'true' : 'false'" @click="navigate" @keyup="keyboardNav">{{ branch.attributes.name }}</a></li>
                        </router-link>
                        <router-link v-if="file" :to="'/branches/' + branch.id + '/files/' + file.id" v-slot="{ href, navigate, isActive, isExactActive }">
                            <li role="presentation"><a role="menuitem" tabindex="-1" :href="href" :aria-current="isExactActive ? 'true' : 'false'" @click="navigate" @keyup="keyboardNav">{{ file.attributes.name }}</a></li>
                        </router-link>
                    </template>
                </ul>
            </aria-menubar>
            <aria-menubar v-slot="{ keyboardNav }">
                <ul role="menubar">
                    <li v-if="$store.state.loggedIn" role="presentation">
                        <a role="menuitem" tabindex="0" @click="logOut">Sign out</a>
                    </li>
                    <router-link v-else to="/login" v-slot="{ href, navigate, isActive, isExactActive }">
                        <li role="presentation"><a role="menuitem" tabindex="0" :href="href" :aria-current="isExactActive ? 'true' : 'false'" @click="navigate" @keyup="keyboardNav">Sign in</a></li>
                    </router-link>
                </ul>
            </aria-menubar>
        </nav>
        <main>
            <router-view/>
        </main>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

import AriaMenubar from '@/components/AriaMenubar.vue';
import { JSONAPIObject } from './store/index';

@Component({
    components: {
        AriaMenubar
    },
})
export default class App extends Vue {
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

    public logOut(): void {
        this.$store.commit('setUserId', '');
        this.$store.commit('setUserToken', '');
        this.$store.commit('setLoggedIn', false);
        this.$router.push({name: 'login'});
    }
}
</script>
