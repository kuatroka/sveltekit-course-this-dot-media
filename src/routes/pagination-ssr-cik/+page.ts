import { redirect } from '@sveltejs/kit';

export const load = async () => {
	throw redirect(302, '/pagination-ssr-cik/1');
};
