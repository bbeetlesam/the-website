import { client } from '$lib/sanity/client';
import { DESKS_QUERY, FEATURED_GAME_LINKS_QUERY } from '$lib/sanity/queries';
import {
	desksSchema,
	featuredGameLinksSchema,
	validateSanityResult
} from '$lib/sanity/validation';

/** Fetches the game desks and featured game links used by the games route. */
export async function load() {
	const [gameDesksResult, featuredGameLinksResult] = await Promise.all([
		client.fetch(DESKS_QUERY, { prefix: 'g' }),
		client.fetch(FEATURED_GAME_LINKS_QUERY)
	]);

	const gameDesks = validateSanityResult(
		'DESKS_QUERY (games)',
		desksSchema,
		gameDesksResult
	);
	const featuredGameLinks = validateSanityResult(
		'FEATURED_GAME_LINKS_QUERY',
		featuredGameLinksSchema,
		featuredGameLinksResult
	);

	return { gameDesks, featuredGameLinks };
}
