import { getCik } from '$lib/server/db/sqlite';

export const load = async () => {
	return {
		ciks_entries: getCik()
	};
};
