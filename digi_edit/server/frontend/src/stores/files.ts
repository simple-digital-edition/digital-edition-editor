import { writable, get } from 'svelte/store';

import { getAll } from './jsonapi';
import { getCookie, authToken } from './auth';

export const files = writable([]);
export const filesBusy = writable(false);

export async function getAllFiles(branchId) {
    try {
        filesBusy.set(true);
        let fileList = await getAll('files', 'filter[branch_id]=' + branchId);
        fileList = fileList.filter((file) => {
            return (file.attributes.name.endsWith('.md') || file.attributes.name.endsWith('.rst') || file.attributes.name.endsWith('.tei'));
        });
        fileList.sort((a, b) => {
            if (a.attributes.path === b.attributes.path) {
                if (a.attributes.name === b.attributes.name) {
                    return 0;
                } else if (a.attributes.name > b.attributes.name) {
                    return 1;
                } else {
                    return -1;
                }
            } else {
                let aPath = a.attributes.path.split('/');
                if (a.attributes.path === '/') {
                    aPath = [''];
                }
                let bPath = b.attributes.path.split('/');
                if (b.attributes.path === '/') {
                    bPath = [''];
                }
                for (let idx = 0; idx < Math.max(aPath.length, bPath.length); idx++) {
                    if (idx >= aPath.length) {
                        return -1;
                    } else if (idx >= bPath.length) {
                        return 1;
                    } else if (aPath[idx] < bPath[idx]) {
                        return -1;
                    } else if (aPath[idx] > bPath[idx]) {
                        return 1;
                    }
                }
                return 0;
            }
        });
        files.set(fileList);
    } finally {
        filesBusy.set(false);
    }
}

export const file = writable(null);
export const fileBusy = writable(false);

export async function createFile(filename: string, filepath: string, branchId: string) {
    try {
        fileBusy.set(true);
        const response = await fetch('/api/files', {
            method: 'POST',
            headers: {
                'Authorization': 'Bearer ' + get(authToken),
                'X-XSRFToken': getCookie('_xsrf'),
            },
            body: JSON.stringify({
                data: {
                    type: 'files',
                    attributes: {
                        filename: filepath + '/' + filename,
                        path: filepath,
                        name: filename,
                    },
                    relationships: {
                        branch: {
                            data: {
                                type: 'branches',
                                id: branchId,
                            }
                        }
                    }
                },
            }),
        });
    } finally {
        fileBusy.set(false);
    }
}

export async function getFile(fileId) {
    try {
        fileBusy.set(true);
        const response = await fetch('/api/files/' + fileId, {
            headers: {
                'Authorization': 'Bearer ' + get(authToken),
                'X-XSRFToken': getCookie('_xsrf'),
            }
        });
        if (response.status === 200) {
            file.set((await response.json()).data);
        } else {
            file.set(null);
        }
    } finally {
        fileBusy.set(false);
    }
}

export async function patchFile(file) {
    try {
        fileBusy.set(true);
        const response = await fetch('/api/files/' + file.id, {
            method: 'PATCH',
            headers: {
                'Authorization': 'Bearer ' + get(authToken),
                'X-XSRFToken': getCookie('_xsrf'),
            },
            body: JSON.stringify({data: file}),
        });
        if (response.status !== 204) {
            throw new Error('Failed to save');
        }
    } finally {
        fileBusy.set(false);
    }
}