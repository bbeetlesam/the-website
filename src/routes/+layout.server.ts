import { client } from '$lib/sanity/client';
import {
	PAGE_LINKS_QUERY,
	DESKS_QUERY,
	TYPEFACES_QUERY,
	ICON_ASSETS_QUERY
} from '$lib/sanity/queries';
import {
	desksSchema,
	iconAssetsSchema,
	pageLinksSchema,
	typefacesSchema,
	validateSanityResult
} from '$lib/sanity/validation';

/** Fetch shared navigation, home desks, typefaces, and icon assets from Sanity. */
export async function load() {
	const [pageLinksResult, homeDesksResult, typefacesResult, iconAssetsResult] =
		await Promise.all([
			client.fetch(PAGE_LINKS_QUERY),
			client.fetch(DESKS_QUERY, { prefix: 'h' }),
			client.fetch(TYPEFACES_QUERY),
			client.fetch(ICON_ASSETS_QUERY)
		]);

	const pageLinks = validateSanityResult(
		'PAGE_LINKS_QUERY',
		pageLinksSchema,
		pageLinksResult
	);
	const homeDesks = validateSanityResult(
		'DESKS_QUERY (home)',
		desksSchema,
		homeDesksResult
	);
	const typefaces = validateSanityResult(
		'TYPEFACES_QUERY',
		typefacesSchema,
		typefacesResult
	);
	const iconAssets = validateSanityResult(
		'ICON_ASSETS_QUERY',
		iconAssetsSchema,
		iconAssetsResult
	);

	return { pageLinks, homeDesks, typefaces, iconAssets };
}
