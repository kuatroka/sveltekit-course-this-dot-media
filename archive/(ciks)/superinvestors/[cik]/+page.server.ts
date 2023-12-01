import { get_every_cik_qtr_sqlite } from '$lib/server/db/sqlite';
import { page } from '$app/stores';
export const load = async ({ params }) => {
	const { cik } = params;
	return {
		entries_cik_details: get_every_cik_qtr_sqlite(cik)
	};
};
