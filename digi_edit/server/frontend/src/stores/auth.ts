import { writable, derived, get } from 'svelte/store';

import { NestedStorage, sessionLoadValue, localLoadValue } from '../storage';

export function getCookie(name: string): string | undefined {
    const cookies = Object.fromEntries(document.cookie.split(';').map((cookie) => {
        return cookie.split('=');
    }));
    return cookies[name];
}

export const authToken = writable('');
export const user = writable(null);

export const isAuthorised = derived(authToken, (authToken) => {
    return authToken !== '';
});

export const authTokenChecker = derived(authToken, async (authTokenValue) => {
    if (authTokenValue !== '') {
        const response = await fetch('/api/users/0', {
            headers: {
                'Authorization': 'Bearer ' + authTokenValue,
                'X-XSRFToken': getCookie('_xsrf'),
            }
        });
        if (response.status === 401) {
            authToken.set('');
            user.set(null);
        } else {
            user.set((await response.json()).data);
        }
    } else {
        user.set(null);
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

export async function patchUser(field, value) {
    const patchUser = get(user)
    const response = await fetch('/api/users/' + patchUser.id, {
        method: 'PATCH',
        headers: {
            'Authorization': 'Bearer ' + get(authToken),
            'X-XSRFToken': getCookie('_xsrf'),
        },
        body: JSON.stringify({
            data: {
                type: 'users',
                id: patchUser.id,
                attributes: {
                    [field]: value,
                },
            },
        }),
    });
    if (response.status === 200) {
        user.set((await response.json()).data);
    }
}
