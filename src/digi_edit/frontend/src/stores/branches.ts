import { writable, derived, get } from 'svelte/store';

import { getAll } from './jsonapi';
import { authToken } from './auth';

export const branches = writable([]);
export const branchesBusy = writable(false);

export const activeBranches = derived(branches, (branches) => {
    return branches.filter((branch) => {
        return branch.attributes.status === 'active';
    });
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

export async function postBranchAction(branch, action: string) {
    busyBranchAction.set(action);
    try {
        const url = '/api/branches/' + branch.id;
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'X-Authorization': get(authToken),
                'X-Action': action,
            }
        });
        branches.set(await getAll('branches', ''));
    } finally {
        busyBranchAction.set('');
    }
}
