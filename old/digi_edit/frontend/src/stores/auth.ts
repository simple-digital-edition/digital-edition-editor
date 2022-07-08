import { writable, derived } from 'svelte/store';

import { NestedStorage, sessionLoadValue, localLoadValue } from '../storage';

export const authToken = writable('');

export const isAuthorised = derived(authToken, (authToken) => {
    return authToken !== '';
});

export const authTokenChecker = derived(authToken, async (authTokenValue) => {
    if (authTokenValue !== '') {
        const response = await fetch('/api/branches', {
            headers: {
                'X-Authorization': authTokenValue,
            }
        });
        if (response.status === 401) {
            authToken.set('');
        }
    }
    return true;
});

let auth = localLoadValue('auth', null) as NestedStorage;
if (!auth) {
    auth = sessionLoadValue('auth', null) as NestedStorage;
}
if (auth) {
    authToken.set(auth.id + ' ' + auth.token);
}
