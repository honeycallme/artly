import { error, fail, redirect, type RequestHandler } from '@sveltejs/kit';

async function deleteRecord(locals : any, collection : string, post : string) {
    let id;

    try {

        // get id of the record
        const temp = await locals.pb.collection(collection).getList(1, 1, {
            filter: `user.id='${locals.user.id}' && post.id='${post}'`,
        });

        if (temp.items.length < 1) {
            return error(400, 'Record not found');
        }

        id = temp.items[0].id;

        // delete record
        await locals.pb.collection(collection).delete(id);

    } catch (e) {
        console.log(e);
        return error(400, e.response?.message);
    } 

}

async function createRecord(locals : any, collection : string, post : string) {
    const input = {
        user : locals.user?.id,
        post : post
    }

    try {
        await locals.pb.collection(collection).create(input);
    } catch (e) {
        console.log(e);
        return error(400, e.response?.message);
    }
}


export const actions = {
    like: async ({ locals, request }) => {

        const formData = await request.formData();
        const post = {
            id: formData.get('id'),
            liked : formData.get('liked'),
        }

        if (!post.id)
            return error(400, 'Invalid post id')

        try {
            if (post.liked == 'true') {
                await deleteRecord(locals, 'likes', post.id);
            } else {
                await createRecord(locals, 'likes', post.id);
            }
        } catch (e) {
            console.log(e);
            return error(400, e.response?.message);
        }

        return {
            success: true,
            changed : 'like'
        }
    },

    save: async ({ locals, request }) => {

        const formData = await request.formData();
        const post = {
            id: formData.get('id'),
            saved : formData.get('saved'),
        }

        if (!post.id)
            return error(400, 'Invalid post id')

        try {
            if (post.saved == 'true') {
                await deleteRecord(locals, 'saves', post.id);
            } else {
                await createRecord(locals, 'saves', post.id);
            }
        } catch (e) {
            console.log(e);
            return error(400, e.response?.message);
        }

        return {
            success: true,
            changed : 'save'
        }
    }
};