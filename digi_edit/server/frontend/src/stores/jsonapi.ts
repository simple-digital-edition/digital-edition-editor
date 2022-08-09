import { get } from 'svelte/store';

import { authToken, getCookie } from './auth';

export async function makeJSONAPIRequest(method: string, url: string, body?: any): Promise<any> {
    const response = await fetch('/api' + url, {
        method: method,
        headers: {
            'Authorization': 'Bearer ' + get(authToken),
            'X-XSRFToken': getCookie('_xsrf'),
        },
        body: body ? JSON.stringify(body) : undefined,
    });
    if (response.status === 200) {
        return (await response.json()).data;
    } else if (response.status === 204) {
        return true;
    } else {
        throw "Something went wrong";
    }
}

export async function getAll(type: string, filters: string) {
    let url = '/api/' + type;
    if (filters) {
        url = url + '?';
        url = url + filters;
    }
    const response = await fetch(url, {
        headers: {
            'Authorization': 'Bearer ' + get(authToken),
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
            'Authorization': 'Bearer ' + get(authToken),
        }
    });
    if (response.status === 200) {
        return (await response.json()).data;
    } else {
        return [];
    }
}
