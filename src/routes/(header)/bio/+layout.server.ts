import { client } from '$lib/sanity/client';
import { SOCIAL_LINKS_QUERY } from '$lib/sanity/queries';
import { socialLinksSchema, validateSanityResult } from '$lib/sanity/validation';

/**
 * Bio layout server load function.
 *
 * Fetch the social-link query projection and return it as `socialLinks`.
 */
export async function load() {
	const socialLinksResult = await client.fetch(SOCIAL_LINKS_QUERY);
	const sanitySocialLinks = validateSanityResult(
		'SOCIAL_LINKS_QUERY',
		socialLinksSchema,
		socialLinksResult
	);

	return {
		socialLinks: sanitySocialLinks
	};
}
