<template>
    <div id="app">
        <nav class="main">
            <aria-menubar v-slot="{ keyboardNav }">
                <ul role="menubar">
                    <li role="presentation"><span>Digital Edition Editor</span></li>
                    <router-link to="/" v-slot="{ href, navigate, isActive, isExactActive }">
                        <li role="presentation"><a role="menuitem" tabindex="0" :href="href" :aria-current="isExactActive ? 'true' : 'false'" @click="navigate" @keyup="keyboardNav">Edition</a></li>
                    </router-link>
                    <router-link :to="'/' + selectedBranchId" v-slot="{ href, navigate, isActive, isExactActive }">
                        <li role="presentation"><a role="menuitem" tabindex="-1" :href="href" :aria-current="isExactActive ? 'true' : 'false'" @click="navigate" @keyup="keyboardNav">Branch-Name</a></li>
                    </router-link>
                    <router-link :to="'/' + selectedBranchId + '/' + selectedFileId" v-slot="{ href, navigate, isActive, isExactActive }">
                        <li role="presentation"><a role="menuitem" tabindex="-1" :href="href" :aria-current="isExactActive ? 'true' : 'false'" @click="navigate" @keyup="keyboardNav">File</a></li>
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

@Component({
    components: {
        AriaMenubar
    },
})
export default class App extends Vue {
    public get selectedBranchId(): string {
        return '1';
    }

    public get selectedFileId(): string {
        return 'abcd';
    }
}
</script>
