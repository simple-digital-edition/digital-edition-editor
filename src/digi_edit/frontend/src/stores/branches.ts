import { writable, derived } from 'svelte/store';

import { getAll } from './jsonapi';

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
