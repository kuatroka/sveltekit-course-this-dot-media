// import { getCikDetails } from '$lib/server/db/sqlite.js';

// export const load = async () => {
// 	return {
// 		ciks_details: getCikDetails()
// 	};
// };

export const load = async ({ locals }) => {
	return {
		user: locals.user
	};
};
