import { redirect } from '@sveltejs/kit';

export let ssr = false;

export const load = (async ({ locals, url }) => {
    if (locals.user) {
        let user = locals.user;

        if (user.avatar) {
            const avatarUrl = locals.pb.files.getUrl(user, user.avatar);
            user.avatar = avatarUrl;
        } else {
            user.avatar = "https://api.dicebear.com/7.x/pixel-art/svg?seed=" + user.username;
        }

        return {
            user: user,
            providers: undefined,
            url: url.pathname
        };
    } else if (url.pathname != '/') {
        return redirect(303, '/');
    }
   
    let authMethods;

    try {
        authMethods = await locals.pb.collection('users').listAuthMethods();
    } catch {
        return {
            user: undefined,
            providers: undefined,
            url: url.pathname
        };
    }

    return {
        user: undefined,
        providers: authMethods.authProviders,
        url: url.pathname
    };
});
