import type { PageServerLoad } from './$types';
import { get_cik_md } from '$lib/server/db/duckdb';
import { getCik } from '$lib/server/db/sqlite';

export const load = async () => {
	return {
		entries_cik_md: getCik()
	};
};
