import { writable, get } from 'svelte/store';

import { authToken } from './auth';

export const uiConfig = writable(null);

export const schema = writable(null);

export async function loadUIConfig() {
    const response = await fetch('/static/config/ui.yaml', {
        headers: {
            Authorization: 'Bearer ' + get(authToken)
        }
    });
    if (response.status === 200) {
        uiConfig.set(await response.json());
    }
}

export async function loadSchema() {
    const response = await fetch('/static/config/tei-schema.yaml', {
        headers: {
            Authorization: 'Bearer ' + get(authToken)
        }
    });
    if (response.status === 200) {
        schema.set(await response.json());
    }
}

export async function loadConfig() {
    await Promise.all([
        loadUIConfig(),
        loadSchema(),
    ]);
}
