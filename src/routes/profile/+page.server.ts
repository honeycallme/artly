import { fail, error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load = (async () => {
    return {

    };
}) satisfies PageServerLoad;

export const actions = {
    update: async ({ locals, request }) => {

        const formData = await request.formData();
        const userAvatar = formData.get('avatar');

		if (userAvatar?.size == 0) {
			formData.delete('avatar');
		}

        try {
            const user = await locals.pb.collection('users').update(locals.user?.id, formData);
            locals.user = user;
        } catch (e) {
            console.log(e);
            return error(400, e.response?.message);
        }

        return {
            success: true
        }
    }
};