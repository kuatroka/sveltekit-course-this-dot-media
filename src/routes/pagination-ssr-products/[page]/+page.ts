import type { PageLoad } from './$types';

export const load = (async ({ params }) => {
	const page = Number(params.page);

	const getProducts = async (page: number) => {
		const limit = 10;
		const res = await fetch(
			`https://dummyjson.com/products?limit=${limit}&skip=${(page - 1) * limit}`
		);
		const data = await res.json();
		return data;
	};
	return {
		products: getProducts(page)
	};
}) satisfies PageLoad;
