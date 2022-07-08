import { get } from 'svelte/store';

import { authToken } from './auth';

export async function getAll(type: string, filters: string) {
    let url = '/api/' + type;
    if (filters) {
        url = url + '?';
        url = url + filters;
    }
    const response = await fetch(url, {
        headers: {
            'X-Authorization': get(authToken),
        }
    });
    if (response.status === 200) {
        return (await response.json()).data;
    } else {
        return [];
    }
}

export async function getSingle(type: string, id: string, headers) {
    const url = '/api/' + type + '/' + id;
    const response = await fetch(url, {
        headers: {
            'X-Authorization': get(authToken),
        }
    });
    if (response.status === 200) {
        return (await response.json()).data;
    } else {
        return [];
    }
}
