import { error } from '@sveltejs/kit';
import { getUrls, splitArray } from '$lib/utils/utils';


export const load = (async ({ locals }) => {

    const options = {
        loading: true,
        collection: 'saves',
        settings: {
            sort: "-created",
            expand: 'post',
            filter: `user.id = '${locals.user.id}'`,
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

    try {
        posts = await locals.pb.collection(options?.collection).getList(options?.page, options?.limit, options?.settings);

        let temp : any[] = [];
        posts.items.forEach(element => {
            temp.push(element.expand?.post);
        });

        await getUrls(temp, locals.pb);
        const postsArray = splitArray(temp, options?.rows);

        options.loading = false;

        return {
            posts: postsArray,
            options: options
        };
    } catch (e) {
        console.log(e);
        return error(500, 'Internal Server Error');
    }
});
