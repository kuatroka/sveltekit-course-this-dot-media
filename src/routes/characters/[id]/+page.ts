import type { PageLoad } from './$types';
export type DetailedCharacter = {
	id: number;
	name: string;
	status: string;
	species: string;
	type: string;
	gender: string;
	hairColor: string;
	firstEpisode: string;
	voicedBy: string;
	url: string;
	wikiUrl: string;
	relatives: { name: string }[];
	location: {
		name: string;
	};
	image: string;
	occupation: string;
};

const API = 'https://svelte.fun/api/bobs-burgers';
export const load = async ({ fetch, params }) => {
	const { id } = params;
	const response = await fetch(`${API}/characters/${id}`);
	const character: DetailedCharacter = await response.json();

	return {
		character
	};
};
