import { writable, derived, get } from 'svelte/store';

import { getAll } from './jsonapi';
import { getCookie, authToken } from './auth';

export const branches = writable([]);
export const branchesBusy = writable(false);

export const activeBranches = derived(branches, (branches) => {
    const activeBranches = branches.filter((branch) => {
        return branch.attributes.status === 'active';
    });
    activeBranches.sort((a, b) => {
        if (a.attributes.name > b.attributes.name) {
            return 1;
        } else if (a.attributes.name < b.attributes.name) {
            return -1;
        } else {
            return 0;
        }
    })
    return activeBranches;
});

export async function getAllBranches() {
    try {
        branchesBusy.set(true);
        branches.set(await getAll('branches', ''));
    } finally {
        branchesBusy.set(false);
    }
}

export const busyBranchAction = writable('');

export async function createBranch(branch) {
    try {
        busyBranchAction.set('create');
        const url = '/api/branches';
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Authorization': 'Bearer ' + get(authToken),
                'X-XSRFToken': getCookie('_xsrf'),
            },
            body: JSON.stringify({'data': branch}),
        });
        if (response.status === 200) {
            branches.set(await getAll('branches', ''));
            return (await response.json()).data;
        } else {
            throw new Error(JSON.stringify(await response.json()));
        }
    } catch (e) {
        throw e;
    } finally {
        busyBranchAction.set('');
    }
}

export async function postBranchAction(branch, action: string) {
    try {
        busyBranchAction.set(action);
        const url = '/api/branches/' + branch.id;
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Authorization': 'Bearer ' + get(authToken),
                'X-XSRFToken': getCookie('_xsrf'),
            }
        });
        branches.set(await getAll('branches', ''));
    } finally {
        busyBranchAction.set('');
    }
}

export async function deleteBranch(branch) {
    try {
        busyBranchAction.set('delete');
        const url = '/api/branches/' + branch.id;
        const response = await fetch(url, {
            method: 'DELETE',
            headers: {
                'Authorization': 'Bearer ' + get(authToken),
                'X-XSRFToken': getCookie('_xsrf'),
            }
        });
        await getAllBranches();
    } catch {
        busyBranchAction.set('');
    }
}
