import { client } from '$lib/sanity/client';
import { NAV_ITEMS_QUERY, DESKS_QUERY } from '$lib/sanity/queries';
import { NAV_ROUTES } from '$lib/data';

import type { RouteId } from '$app/types';
import type { Desk, NavItem, SanityDesk, SanityNavItem } from '$lib/types';

/**
 * Root layout server load function.
 *
 * Fetches `nav-item` and `desk` documents from Sanity in parallel.
 *
 * `nav-item` documents are converted into {@link NavItem} objects by assigning
 * each entry a `route` looked up from {@link NAV_ROUTES} via `item.id`.
 *
 * Desk item `navigation` references are resolved against the fetched
 * navigation items using their stable `id`.
 *
 * Throws errors if a navigation item has no corresponding route or if a desk item
 * references an unknown navigation item.
 */
export async function load() {
	// Fetch `nav-item` and `desk` documents from Sanity
	const [sanityNavItems, sanityDesks] = await Promise.all([
		client.fetch<SanityNavItem[]>(NAV_ITEMS_QUERY),
		client.fetch<SanityDesk[]>(DESKS_QUERY)
	]);

	// Convert `sanityNavItems` to `NavItem` objects, assigning a `route` based on `NAV_ROUTES`
	const navItems: NavItem[] = sanityNavItems.flatMap((item) => {
		const route: RouteId = NAV_ROUTES[item.id];
		if (!route) {
			throw new Error(`Nav item "${item.id}" has no route defined in NAV_ROUTES.`);
		}

		return [
			{ id: item.id, title: item.title, desc: item.desc, route, icon: item.icon } satisfies NavItem
		];
	});

	// Map `navItems` by `id` for quick lookup during desk item resolution
	const navItemMap = new Map(navItems.map((item) => [item.id, item]));

	// Resolve `navigation` references in `sanityDesks` using `navItemMap`
	const desks: Desk[] = sanityDesks.map((desk) => ({
		...desk,

		items: desk.items.map((item) => {
			const { navigationId, ...deskItem } = item;

			if (!navigationId) {
				return deskItem;
			}

			const navigation = navItemMap.get(navigationId);

			if (!navigation) {
				throw new Error(`Desk item "${item.id}" references unknown nav item "${navigationId}".`);
			}

			return {
				...deskItem,
				navigation
			};
		})
	}));

	return {
		navItems,
		desks
	};
}
