import { getCik } from '$lib/server/db/sqlite';

export const load = async ({ url }) => {
	const limit = Number(url.searchParams.get('limit')) || 5;
	const skip = Number(url.searchParams.get('skip')) || 0;
	const q = url.searchParams.get('q') ?? '';
	const order_by = url.searchParams.get('order_by') || 'id';
	const order_dir = url.searchParams.get('order_dir') || 'asc';

	return {
		ciks: getCik(limit, q, skip, order_by, order_dir)
	};
};
