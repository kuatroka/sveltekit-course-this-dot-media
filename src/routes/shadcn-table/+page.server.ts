import { getCik } from '$lib/server/db/sqlite';
// import { main } from '$lib/server/db/duckdb-wasm';

export const load = async ({ url }) => {
	const limit = Number(url.searchParams.get('limit')) || 5;
	const skip = Number(url.searchParams.get('skip')) || 0;
	const q = url.searchParams.get('q') ?? '';

	return {
		ciks: getCik(limit, q, skip)
	};
};
