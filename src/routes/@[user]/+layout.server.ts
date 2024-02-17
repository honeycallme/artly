import { error, fail, redirect, type RequestHandler } from '@sveltejs/kit';
import { getAvatar, getUrls, splitArray } from '$lib/utils/utils.js';

export const load = (async ({ locals, url }) => {

    // user loading

    const username = url.pathname.substring(2);
    let user;

    try {
        user = await locals.pb.collection('users').getFirstListItem(`username="${username}"`, {});
        getAvatar(user, locals.pb);
    } catch (e) {
        console.log('errror : ', e);
        return error(404, 'Unknown user')
    }

    // post loading

    const options = {
        loading: true,
        collection: 'posts',
        settings: {
            sort: "-created",
            filter: `creator.id = '${user.id}'`,
        },
        page: 0,
        limit: 9,
        rows: 3
    }

    if (!options.collection)
        return {
            posts: [],
            options: options
        };

    let posts = [];
    let postsArray = [];

    try {
        posts = await locals.pb.collection(options?.collection).getList(options?.page, options?.limit, options?.settings);

        await getUrls(posts.items, locals.pb);
        postsArray = splitArray(posts?.items, options?.rows);

        options.loading = false;

    } catch (e) {
        console.log(e);
        return error(500, 'Internal Server Error');
    }

    return {
        profile: user,
        posts: postsArray,
        options: options
    }
});
