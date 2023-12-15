const API = 'https://svelte.fun/api/bobs-burgers';
export const GET = async ({ params, fetch, url }) => {
	const search = url.origin + url.pathname;
	console.log('search:', search);
	const response = await fetch(`${API}/characters/${params.id}`);

	return new Response(response.body);
};
