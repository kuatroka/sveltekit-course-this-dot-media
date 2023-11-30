import type { PageServerLoad } from './$types';

import { getCik } from '$lib/server/db/sqlite';

// export const load = async () => {
// 	return {
// 		entries_cik_md: getCik()
// 	};
// };

export const load = async ({ url }) => {
	const q = url.searchParams.get('q') ?? '';

	return {
		items: getCik(20, q)
	};
};
