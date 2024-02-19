import { redirect } from '@sveltejs/kit';

export const actions = {
    delete: async ({ locals }) => {
        await locals.pb.collection('users').delete(locals.user?.id);
        locals.pb.authStore.clear();
        throw redirect(303, '/');
    }
};