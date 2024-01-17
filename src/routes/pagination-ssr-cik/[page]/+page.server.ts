import { getCik } from '$lib/server/db/sqlite.js';

export const load = async ({ params }) => {
	const limit: number = 10;
	const page = Number(params.page);

	return {
		ciks: getCik(limit, '', (page - 1) * limit)
	};
};
