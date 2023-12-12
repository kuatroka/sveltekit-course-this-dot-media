import { getCikDetails } from '$lib/server/db/sqlite.js';

export const load = async () => {
	return {
		ciks_details: getCikDetails()
	};
};
