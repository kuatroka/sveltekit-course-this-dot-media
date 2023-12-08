import { redirect } from '@sveltejs/kit';

export const load = async () => {
	throw redirect(302, '/pagination-ssr-products/1');
};
