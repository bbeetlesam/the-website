import { client } from '$lib/sanity/client';
import { SOCIAL_LINKS_QUERY } from '$lib/sanity/queries';

import type { ExternalLink } from '$lib/types';

/**
 * Bio layout server load function.
 *
 * Fetch Social external link documents from Sanity, and then returns them as `socialLinks`
 * with the type of {@link ExternalLink}[].
 */
export async function load() {
	const sanitySocialLinks = await client.fetch<ExternalLink[]>(SOCIAL_LINKS_QUERY);

	return {
		socialLinks: sanitySocialLinks
	};
}
