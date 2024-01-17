import { error, fail, redirect } from '@sveltejs/kit';
import type { PageServerLoad, Actions } from './$types';

type Movie = {
	id: string;
	name: string;
	release: number;
	rating: number;
	comment?: string;
};

let movies: Movie[] = [
	{
		id: 'df5105ff-9d87-4bd9-be62-4743c0a243b9',
		name: 'Everything Everywhere All at Once',
		release: 2022,
		rating: 5,
		comment: `Unlike anything I have ever seen before. I loved it!`
	},
	{
		id: '446e2ae1-5cc4-4b84-9ea0-1e77428e46f6',
		name: 'The Shawshank Redemption',
		release: 1994,
		rating: 5,
		comment: 'Amazing, if a little over-hyped'
	}
];

export const load: PageServerLoad = () => {
	return {
		movies
	};
};

const validateMovie = (movieData: Partial<Movie>) : 
	{success: false, error: string } | {success: true, movie: Omit<Movie, 'id'>} => {
		if (!movieData.name ) {
			return {
				success: false,
				error: 'Name of the Movie is required'
			};
		}

		if (!movieData.release ) {
			return {
				success: false,
				error: 'Release is required'
			};
		}

		if (!movieData.rating ) {
			return {
				success: false,
				error: 'Rating is required'
			};
		}
		
	
	return {
		success: true,
		movie: {
			name: movieData.name,
			release: movieData.release,
			rating: movieData.rating,
			comment: movieData.comment
		}	
	};

};
	

export const actions: Actions = {
	async logMovie({ request }) {
		const formData = await request.formData();

		// console.log(formData);

		const movieData = {
			name: (formData.get('name') ?? '') as string,
			release: (formData.get('release') ??  Number(formData.get('release'))) as number,
			rating: (formData.get('rating') ??  Number(formData.get('rating'))) as number,
			comment: formData.get('comment') ?  formData.get('comment') as string : undefined,
		}

		const validation = validateMovie(movieData);
		if (!validation.success) {
			return fail(400, {
				error: validation.error,
				...movieData
			});
		}

		movies.push({
			id: crypto.randomUUID(),
			...movieData
		})


		// console.log(movies);
		// throw redirect(303, '/forms');
		
		// return { success: true,
		// 	movie: validation.movie
		// };		
	},
	
	async deleteMovie({ request }) {
		const movieId = (await request.formData()).get('movieToDelete');
		movies = movies.filter(m => m.id !== movieId);
		console.log(movieId);
		// throw redirect(303, '/forms');
	}
}