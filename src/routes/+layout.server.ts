import { client } from '$lib/sanity/client';
import {
	PAGE_LINKS_QUERY,
	DESKS_QUERY,
	TYPEFACES_QUERY,
	ICON_ASSETS_QUERY
} from '$lib/sanity/queries';
import type {
	DESKS_QUERY_RESULT,
	ICON_ASSETS_QUERY_RESULT,
	PAGE_LINKS_QUERY_RESULT,
	TYPEFACES_QUERY_RESULT
} from '$lib/sanity/sanity.types';

/** Fetch shared navigation, home desks, typefaces, and icon assets from Sanity. */
export async function load() {
	const [pageLinks, homeDesks, typefaces, iconAssets] = await Promise.all([
		client.fetch<PAGE_LINKS_QUERY_RESULT>(PAGE_LINKS_QUERY),
		client.fetch<DESKS_QUERY_RESULT>(DESKS_QUERY, { prefix: 'h' }),
		client.fetch<TYPEFACES_QUERY_RESULT>(TYPEFACES_QUERY),
		client.fetch<ICON_ASSETS_QUERY_RESULT>(ICON_ASSETS_QUERY)
	]);

	return { pageLinks, homeDesks, typefaces, iconAssets };
}
