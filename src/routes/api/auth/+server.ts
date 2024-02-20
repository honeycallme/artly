import { fail, redirect, type RequestHandler } from '@sveltejs/kit';

export const GET: RequestHandler = async ({ locals }) => {
    await locals.pb.authStore.clear();
    throw redirect(303, '/');
};