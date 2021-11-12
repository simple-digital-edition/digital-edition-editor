import { writable, derived } from 'svelte/store';

import { getAll } from './jsonapi';

export const branches = writable([]);

export const activeBranches = derived(branches, (branches) => {
    return branches.filter((branch) => {
        return branch.attributes.status === 'active';
    });
});

export async function getAllBranches() {
    branches.set(await getAll('branches', ''));
}
