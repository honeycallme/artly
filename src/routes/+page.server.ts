import { fail, redirect, type RequestHandler } from '@sveltejs/kit';

export const load = (async ({ locals }) => {
    if (locals.user) {
        return redirect(303, '/feed');
    }
});
