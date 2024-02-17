import { error, fail, redirect, type RequestHandler } from '@sveltejs/kit';
import { getAvatar } from '$lib/utils/utils.js';

export const load = (async ({ locals, url }) => {
    const username = url.pathname.substring(2);

    try {
        const user = await locals.pb.collection('users').getFirstListItem(`username="${username}"`, {});
        getAvatar(user, locals.pb);

        return {
            profile : user
        }
    } catch (e) {
        console.log('errror : ', e);
        return error(404, 'Unknown user')
    }
});
