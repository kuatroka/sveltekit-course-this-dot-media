const API = 'https://svelte.fun/api/bobs-burgers';
export const GET = async (event) => {
	const search = event.url.origin + event.url.pathname;
	console.log('search:', search);
	const response = await fetch(`${API}/characters`);

	return new Response(response.body);
};
