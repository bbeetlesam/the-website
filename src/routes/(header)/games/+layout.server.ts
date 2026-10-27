import { client } from '$lib/sanity/client';
import { DESKS_QUERY, FEATURED_GAME_LINKS_QUERY } from '$lib/sanity/queries';
import type {
	FEATURED_GAME_LINKS_QUERY_RESULT,
	DESKS_QUERY_RESULT
} from '$lib/sanity/sanity.types';

/** Fetches the game desks and featured game links used by the games route. */
export async function load() {
	const [gameDesks, featuredGameLinks] = await Promise.all([
		client.fetch<DESKS_QUERY_RESULT>(DESKS_QUERY, { prefix: 'g' }),
		client.fetch<FEATURED_GAME_LINKS_QUERY_RESULT>(FEATURED_GAME_LINKS_QUERY)
	]);

	return { gameDesks, featuredGameLinks };
}
