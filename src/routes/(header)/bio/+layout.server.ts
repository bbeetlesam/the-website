import { client } from '$lib/sanity/client';
import { SOCIAL_LINKS_QUERY } from '$lib/sanity/queries';

import type { SocialLink } from '$lib/types';

/**
 * Bio layout server load function.
 *
 * Fetch `social-link` documents from Sanity, and then returns them as `socialLinks`
 * with the type of {@link SocialLink}[].
 */
export async function load() {
	const sanitySocialLinks = await client.fetch<SocialLink[]>(SOCIAL_LINKS_QUERY);

	return {
		socialLinks: sanitySocialLinks
	};
}
