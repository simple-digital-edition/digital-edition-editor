<script lang="ts">
    import { authToken } from '../stores';
    import { sessionStoreValue } from '../storage';

    let email = '';
    let emailError = '';
    let password = '';
    let passwordError = '';
    let loggingIn = false;

    async function login(ev: Event) {
        ev.preventDefault();

        if (loggingIn) {
            return;
        }

        loggingIn = true;
        emailError = '';
        passwordError = '';

        try {
            const response = await fetch('/api/login', {
                method: 'POST',
                body: JSON.stringify({
                    'data': {
                        'type': 'users',
                        'attributes': {
                            'email': email,
                            'password': password,
                        }
                    }
                })
            });
            if (response.status === 200) {
                const body = await response.json();
                sessionStoreValue('auth.id', body.data.id);
                sessionStoreValue('auth.token', body.data.attributes.token);
                authToken.set(body.data.id + ' ' + body.data.attributes.token);
            } else {
                const body = await response.json();
                if (body.errors) {
                    for (const error of body.errors) {
                        if (error.source.pointer === '/data/attributes/email') {
                            emailError = error.title;
                        } else if (error.source.pointer === '/data/attributes/password') {
                            passwordError = error.title;
                        }
                    }
                } else {
                    emailError = 'This e-mail is not registered or the password is invalid';
                    passwordError = 'This e-mail is not registered or the password is invalid';
                }
            }
        } catch {
            emailError = 'This e-mail is not registered or the password is invalid';
            passwordError = 'This e-mail is not registered or the password is invalid';
        }

        loggingIn = false;
    }
</script>

<div class="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 border border-solid border-neutral shadow-lg w-96">
    <h1 class="px-4 py-2 bg-primary text-primary-contrast font-bold text-lg">Log in</h1>
    <form on:submit={login} class="px-4 py-2">
        <label class="block mb-3 text-sm">E-Mail Address
            <input bind:value={email} type="email" class="block px-1 py-1 border border-solid {emailError ? 'border-red-600' : 'border-neutral'} w-full text-base focus:shadow-inner" />
            {#if emailError}
                <span class="block px-2 py-1 text-sm text-white bg-red-600">{emailError}</span>
            {/if}
        </label>
        <label class="block mb-3 text-sm">Password
            <input bind:value={password} type="password" class="block px-1 py-1 border border-solid {passwordError ? 'border-red-600' : 'border-neutral'} w-full text-base focus:shadow-inner" />
            {#if passwordError}
                <span class="block px-2 py-1 text-sm text-white bg-red-600">{passwordError}</span>
            {/if}
        </label>
        <div class="text-right">
            {#if loggingIn}
                <span class="inline-block px-3 py-1 bg-primary text-primary-contrast hover:bg-primary focus:bg-primary transition-colors">Logging in</span>
            {:else}
                <button class="inline-block px-3 py-1 bg-primary text-primary-contrast hover:bg-primary focus:bg-primary transition-colors">Log in</button>
            {/if}
        </div>
    </form>
</div>
