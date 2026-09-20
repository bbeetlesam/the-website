import { client } from '$lib/sanity/client';
import { NAV_ITEMS_QUERY, HOME_DESKS_QUERY, TYPEFACES_QUERY } from '$lib/sanity/queries';
import { NAV_ROUTES } from '$lib/data';

import type { RouteId } from '$app/types';
import type { Desk, PageLink, SanityDesk, SanityPageLink, Typeface } from '$lib/types';

/**
 * Root layout server load function.
 *
 * Fetches `nav-item`, Home `desk`, and `typeface` documents from Sanity in parallel.
 *
 * - `nav-item` documents are converted into {@link PageLink} objects by assigning
 * each entry a `route` looked up from {@link NAV_ROUTES} via `item.id`.
 * - Home Desk item `navigation` references are resolved directly by GROQ and then
 * transformed here where necessary.
 * - `typeface` documents are fetched directly as {@link Typeface} objects
 * and are used for application CSS.
 *
 * Throws errors if a navigation item has no corresponding route or if a desk item
 * references an unsupported navigation type.
 */
export async function load() {
	// Fetch `nav-item`, `desk`, and `typeface` documents from Sanity
	const [sanityPageLinks, sanityHomeDesks, sanityTypefaces] = await Promise.all([
		client.fetch<SanityPageLink[]>(NAV_ITEMS_QUERY),
		client.fetch<SanityDesk[]>(HOME_DESKS_QUERY),
		client.fetch<Typeface[]>(TYPEFACES_QUERY)
	]);

	// Convert `sanityPageLinks` to `PageLink` objects, assigning a `route` based on `NAV_ROUTES`
	const pageLinks: PageLink[] = sanityPageLinks.map((item) => {
		const route: RouteId = NAV_ROUTES[item.id];

		if (!route) {
			throw new Error(`Nav item "${item.id}" has no route defined in NAV_ROUTES.`);
		}

		return {
			type: 'nav-item',
			id: item.id,
			title: item.title,
			desc: item.desc,
			route,
			icon: item.icon
		} satisfies PageLink;
	});

	// Resolve navigation references in `sanityHomeDesks`.
	// The referenced document is already included by the GROQ query.
	const homeDesks: Desk[] = sanityHomeDesks.map((desk) => ({
		...desk,

		items: desk.items.map((item) => {
			const { navigation, interactionEffect, ...deskItem } = item;

			// If there is no navigation, return the Desk Item as-is.
			if (!navigation) {
				return deskItem;
			}

			const navType = navigation.type;
			const effect = interactionEffect ?? 'none';

			// Resolve PageLink navigation type
			if (navType === 'nav-item') {
				const route = NAV_ROUTES[navigation.id];

				if (!route) {
					throw new Error(
						`Nav item "${navigation.id}" has no route defined in NAV_ROUTES.`
					);
				}

				return {
					...deskItem,
					interactionEffect: effect,
					navigation: {
						...navigation,
						route
					}
				};
			}

			// Resolve ExternalLink navigation type
			if (navType === 'social-link') {
				return {
					...deskItem,
					interactionEffect: effect,
					navigation
				};
			}

			// If the item has an unsupported navigation type, throw an error
			throw new Error(
				`Desk item "${item.id}" references unsupported navigation type "${navType}".`
			);
		})
  }));

	console.dir(sanityTypefaces, { depth: null })

	return {
		pageLinks,
		homeDesks,
		typefaces: sanityTypefaces
	};
}
