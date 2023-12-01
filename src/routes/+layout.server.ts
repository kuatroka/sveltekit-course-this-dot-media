import type { LayoutServerLoad } from './$types';
import { getCik } from '$lib/server/db/sqlite';
const API = 'https://svelte.fun/api/bobs-burgers';
export const load = async () => {
	return {
		entries_cik_md: getCik()
	};
};
