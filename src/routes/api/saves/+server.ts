import type { RequestHandler } from './$types';
import { splitArray, getUrls } from '$lib/utils/utils';

export const POST: RequestHandler = async ({ locals, request }) => {
    const { options } = await request.json();

    if (options.page < 0 || !options.collection)
        return new Response(JSON.stringify({}));

    let posts = [];


    try {
        posts = await locals.pb.collection(options?.collection).getList(options?.page, options?.limit, options?.settings);

        let temp : any[] = [];
        posts.items.forEach(element => {
            temp.push(element.expand?.post);
        });

        await getUrls(temp, locals.pb);
        const postsArray = splitArray(temp, options?.rows);

        return new Response(JSON.stringify(postsArray));
    } catch (e) {
        console.log(e);
        return new Response(JSON.stringify({}));
    }
};