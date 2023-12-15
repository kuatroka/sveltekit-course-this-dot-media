import type { LayoutLoad } from './$types';

export type Character = {
	id: number;
	name: string;
	status: string;
	species: string;
	type: string;
	gender: string;
	location: {
		name: string;
	};
	image: string;
	occupation: string;
};

const API = 'https://svelte.fun/api/bobs-burgers';
export const load = (async ({ fetch }) => {
	const response = await fetch(`api/characters`);
	const characters: Character[] = await response.json();

	return {
		characters
	};
}) satisfies LayoutLoad;
