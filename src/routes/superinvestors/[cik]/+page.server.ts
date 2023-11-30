// import type { PageServerLoad } from '../$types';
import { get_every_cik_qtr_sqlite } from '$lib/server/db/sqlite';

export const load = async ({ params }) => {
	const { cik } = params;
	return {
		entries_cik_details: get_every_cik_qtr_sqlite(cik)
	};
};
