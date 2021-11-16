import { writable } from 'svelte/store';

export const uiConfig = writable({});

export const schema = writable({});

export async function loadUIConfig() {
    const response = await fetch('/config/ui');
    if (response.status === 200) {
        uiConfig.set(await response.json());
    }
}

export async function loadSchema() {
    const response = await fetch('/config/tei-schema');
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
