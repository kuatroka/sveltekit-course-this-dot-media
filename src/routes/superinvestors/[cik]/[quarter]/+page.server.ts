import type { PageServerLoad } from './$types';
import { getCikDetails } from '$lib/server/db/sqlite';

export const load = async ({ params }) => {
	const { cik, quarter } = params;
	return {
		entries_cikDetails: getCikDetails(cik, quarter)
	};
};
