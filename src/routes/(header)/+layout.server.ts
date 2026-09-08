import { client } from '$lib/sanity/client';
import { NAV_ITEMS_QUERY } from '$lib/sanity/queries';
import { NAV_ROUTES } from '$lib/data';
import type { NavItem } from '$lib/types';
import type { SanityNavItem } from '$lib/types/sanity';

/**
 * Layout load function for all routes under the `(header)` group.
 *
 * Fetches `nav-item` documents from Sanity and converts them into {@link NavItem} objects
 * by giving each entry a `route` (looked up from {@link NAV_ROUTES} via `item.id`).
 *
 * Items whose `id` doesn't match any key in `NAV_ROUTES` are silently skipped.
 */
export async function load(): Promise<{ navItems: NavItem[] }> {
	const sanityItems = await client.fetch<SanityNavItem[]>(NAV_ITEMS_QUERY);

	const navItems: NavItem[] = sanityItems.flatMap((item) => {
		const route = NAV_ROUTES[item.id];
		if (!route) return [];

		return [{ title: item.title, desc: item.desc, route, icon: item.icon }];
	});

	return { navItems };
}
