import type { PageServerLoad } from './$types';
import { getCik, getCikDetails } from '$lib/server/db/sqlite';

export const load = (async () => {
	const limit = 20;
	return {
		entries_cik: getCik(limit)
	};
}) satisfies PageServerLoad;
