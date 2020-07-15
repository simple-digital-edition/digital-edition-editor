<template>
    <div class="login width-limited margin-top">
        <h1>Sign in</h1>
        <form class="flex" @submit="login">
            <label>E-Mail Address
                <input type="email" v-model="email"/>
                <span v-if="errors.email" class="error-msg">{{ errors.email }}</span>
            </label>
            <label>Password
                <input type="password" v-model="password"/>
                <span v-if="errors.password" class="error-msg">{{ errors.email }}</span>
            </label>
            <span class="align-end shrink">
                <button class="button">Sign in</button>
                <span v-if="errors.email || errors.password" class="error-msg empty"></span>
            </span>
        </form>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

import { errorsToDict, ErrorDict } from '../store/index';

@Component
export default class Login extends Vue {
    public email = '';
    public password = '';
    public errors = {} as ErrorDict;

    public async login(ev: Event) {
        ev.preventDefault();
        try {
            this.errors = {};
            await this.$store.dispatch('login', {
                email: this.email,
                password: this.password,
            });
        } catch(errors) {
            this.errors = errorsToDict(errors);
        }
    }
}
</script>
