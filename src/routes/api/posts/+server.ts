import type { RequestHandler } from './$types';
import { splitArray, getUrls } from '$lib/utils/utils';
import { error } from '@sveltejs/kit';

export const POST: RequestHandler = async ({ locals, request }) => {
    const { options } = await request.json();

    if (options.page < 0 || !options.collection)
        return new Response(JSON.stringify({}));

    let posts = [];

    try {
        posts = await locals.pb.collection(options?.collection).getList(options?.page, options?.limit, options?.settings);

        await getUrls(posts.items, locals.pb);
        const postsArray = splitArray(posts?.items, options?.rows);

        return new Response(JSON.stringify(postsArray));
    } catch (e) {
        console.log(e);
        return error(500, 'Internal Server Error');
    }
};