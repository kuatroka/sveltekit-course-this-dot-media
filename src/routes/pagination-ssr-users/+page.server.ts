import type { PageServerLoad } from './$types';
import { getCik } from '$lib/server/db/sqlite';
import { error } from '@sveltejs/kit';

// export const load = (async () => {
// 	return {
// 		entries_cik: getCik()
// 	};
// }) satisfies PageServerLoad;

export const load = async ({ fetch, url }) => {
	const limit = Number(url.searchParams.get('limit')) || 10;
	const skip = Number(url.searchParams.get('skip')) || 0;

	async function getUsers(limit: number = 10, skip: number = 0) {
		if (limit > 100) {
			throw error(400, 'Limit cannot be greater than 100');
			limit = 100;
		}
		const response = await fetch(`https://dummyjson.com/users?limit=${limit}&skip=${skip}`);
		const data = await response.json();
		return data;
	}
	return {
		users: getUsers(limit, skip)
	};
};
