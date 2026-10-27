import { client } from '$lib/sanity/client';
import { SOCIAL_LINKS_QUERY } from '$lib/sanity/queries';

import type { SOCIAL_LINKS_QUERY_RESULT } from '$lib/sanity/sanity.types';

/**
 * Bio layout server load function.
 *
 * Fetch the social-link query projection and return it as `socialLinks`.
 */
export async function load() {
	const sanitySocialLinks =
		await client.fetch<SOCIAL_LINKS_QUERY_RESULT>(SOCIAL_LINKS_QUERY);

	return {
		socialLinks: sanitySocialLinks
	};
}
