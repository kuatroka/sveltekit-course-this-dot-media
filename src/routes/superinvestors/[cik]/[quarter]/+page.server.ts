import { getCikDetails } from '$lib/server/db/sqlite';
export const load = async ({ params }) => {
	const { cik, quarter } = params;
	return {
		entries_cik: getCikDetails(cik, quarter)
	};
};
