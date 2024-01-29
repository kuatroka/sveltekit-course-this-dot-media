import type { PageServerLoad, Actions } from './$types';
import { fail } from '@sveltejs/kit';

export const load = (async () => {
	return {};
}) satisfies PageServerLoad;

export const actions = {
	login: async ({ request }) => {
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
	}
};
