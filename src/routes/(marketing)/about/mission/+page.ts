import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';

export const load = (async () => {
	throw error(
		404,
		'The mission to boldly go where no one has gone before was aborted we went there full of hair ...'
	);
	return {};
}) satisfies PageLoad;
