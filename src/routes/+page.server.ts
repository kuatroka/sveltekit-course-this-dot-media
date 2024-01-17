import type { PageServerLoad } from './$types';

export const load = (async ({locals}) => {
    console.log(locals);
    return {
        user: locals.user,
        locals
    };
}) satisfies PageServerLoad;