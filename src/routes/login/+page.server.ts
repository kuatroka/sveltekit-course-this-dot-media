import type { PageServerLoad, Actions } from './$types';
import { fail, redirect } from '@sveltejs/kit';

export const load = (async () => {
	return {};
}) satisfies PageServerLoad;

export const actions = {
	login: async ({ request, cookies }) => {
		const formDdata = await request.formData();
		const username = formDdata.get('username');
		const password = formDdata.get('password');

		if (!username || typeof username !== 'string') {
			return fail(400, {
				username: {
					value: username,
					error: 'username is required'
				}
			});
		}

		if (!password || typeof password !== 'string') {
			return fail(400, {
				username: {
					value: username,
					error: null
				},
				password: {
					value: password,
					error: 'password is required'
				}
			});
		}

		// admin login
		if (username == 'admin' && password !== 'password') {
			return fail(401, {
				username: {
					value: username,
					error: null
				},
				password: {
					value: password,
					error: 'That username an password combination is not valid'
				}
			});
		}

		cookies.set('session', username, { path: '/' });
		throw redirect(303, '/');
	}
};
