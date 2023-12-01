import { getCik } from '$lib/server/db/sqlite';

export const load = async () => {
	return {
		entries_cik_md: getCik()
	};
};
