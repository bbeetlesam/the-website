import { client } from '$lib/sanity/client';
import { EXTERNAL_LINKS_QUERY } from '$lib/sanity/queries';

import type { ExternalLink } from '$lib/types';

/**
 * Bio layout server load function.
 *
 * Fetch `social-link` documents from Sanity, and then returns them as `externalLinks`
 * with the type of {@link ExternalLink}[].
 */
export async function load() {
	const sanityExternalLinks = await client.fetch<ExternalLink[]>(EXTERNAL_LINKS_QUERY);

	return {
		externalLinks: sanityExternalLinks
	};
}
