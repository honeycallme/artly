import { error, fail, redirect, type RequestHandler } from '@sveltejs/kit';
import { getAvatar, getUrl, getUrls, splitArray } from '$lib/utils/utils.js';

export const load = (async ({ locals, url }) => {

    // post loading

    let post;
    const id = url.pathname.split('/').pop();
    const settings = {
        expand: 'creator',
    }

    try {
        post = await locals.pb.collection('posts').getOne(id, settings);
        getUrl(post, locals.pb);
        getAvatar(post.expand.creator, locals.pb);
    } catch (e) {
        console.log('errror : ', e);
        return error(404, 'Unknown post')
    }

    // posts alique loading

    const options = {
        loading: true,
        collection: 'posts',
        settings: {
            sort: "-created",
            filter: post.tags.map((tag: string) => `tags~'${tag}'`).join("||"),
        },
        page: 0,
        limit: 9,
        rows: 3
    }

    if (!options.collection || post.tags.length === 0) {
        options.loading = false;
        return {
            post: post,
            posts: [],
            options: options
        };
    }

    let posts = [];
    let postsArray = [];

    try {
        posts = await locals.pb.collection(options?.collection).getList(options?.page, options?.limit, options?.settings);
        options.page++;

        await getUrls(posts.items, locals.pb);
        postsArray = splitArray(posts?.items, options?.rows);
        
        options.loading = false;

    } catch (e) {
        console.log(e);
        return error(500, 'Internal Server Error');
    }

    return {
        post: post,
        posts: postsArray,
        options: options
    }
});