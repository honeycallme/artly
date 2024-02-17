import { fail, redirect, type RequestHandler } from '@sveltejs/kit';
import { env } from '$env/dynamic/private';

export const load = (async ({ locals }) => {
    if (locals.pb.authStore.model) {
        return redirect(303, '/feed');
    } else {
        return redirect(303, '/');
    }
});

const oauth = (providerName: string, callbackPath: string) => async ({ locals, cookies }) => {
    const provider = (await locals.pb.collection('users').listAuthMethods()).authProviders.find((p: any) => p.name === providerName);
    cookies.set('provider', JSON.stringify(provider), { httpOnly: true, path: `/auth/callback/${providerName}` });

    throw redirect(303, provider?.authUrl + env.REDIRECT_URL + provider?.name);
};

export const actions = {
    google: oauth('google', '/auth/callback/google'),
    github: oauth('github', '/auth/callback/github'),
    logout: async ({ locals }) => {
        await locals.pb.authStore.clear();
        throw redirect(303, '/');
    }
};
