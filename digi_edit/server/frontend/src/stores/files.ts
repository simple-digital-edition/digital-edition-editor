import { writable, get } from 'svelte/store';

import { makeJSONAPIRequest } from './jsonapi';
import { getCookie, authToken } from './auth';
import {  } from './branches';

export const files = writable([]);
export const filesBusy = writable(false);

export async function getAllFiles(branchId, background=false) {
    try {
        if (!background) {
            filesBusy.set(true);
        }
        let fileList = await makeJSONAPIRequest('GET', '/branches/' + branchId + '/files');
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

export async function getFile(branchId: string, fileId: string) {
    try {
        fileBusy.set(true);
        const fileData = await makeJSONAPIRequest('GET', '/branches/' + branchId + '/files/' + fileId);
        if (fileData) {
            file.set(fileData);
        }
    } finally {
        fileBusy.set(false);
    }
}

export async function patchFile(branchId: string, file) {
    try {
        fileBusy.set(true);
        const response = await makeJSONAPIRequest('PATCH', '/branches/' + branchId + '/files/' + file.id, {data: file});
        if (!response) {
            throw new Error('Failed to save');
        } else {
            getAllFiles(branchId, true);
        }
    } finally {
        fileBusy.set(false);
    }
}
