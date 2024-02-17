import { fail, error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load = (async () => {
    return {

    };
}) satisfies PageServerLoad;

export const actions = {
    upload: async ({ locals, request }) => {

        const formData = await request.formData();
        const input = new FormData();

        input.append('creator', locals.user.id);

        for (const [name, value] of formData.entries()) {
            input.append(name, value);
        }

        try {
            await locals.pb.collection('posts').create(input);
        } catch (e) {
            console.log(e);
            return error(400, e.response?.message);
        }

        return {
            success: true
        }
    }
};