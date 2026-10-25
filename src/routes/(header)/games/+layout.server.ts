import { NAV_ROUTES } from '$lib/data';
import { client } from '$lib/sanity/client';
import { GAME_DESKS_QUERY, FEATURED_GAME_LINKS_QUERY } from '$lib/sanity/queries';
import type { Desk, GameLink, SanityDesk } from '$lib/types';

/**
 * Games layout server load function.
 *
 * 1. Fetch Game `desk` documents from Sanity, resolve their navigation references,
 * and then returns them as `gameDesks` with the type of {@link Desk}[].
 * 2. Fetch FEATURED Game Links from Sanity and returns them as `featuredGameLinks`
 * with the type of {@link GameLink}[].
 */
export async function load() {
	const [sanityGameDesks, featuredGameLinks] = await Promise.all([
		client.fetch<SanityDesk[]>(GAME_DESKS_QUERY),
		client.fetch<GameLink[]>(FEATURED_GAME_LINKS_QUERY)
	]);

	const gameDesks: Desk[] = sanityGameDesks.map((desk) => ({
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
			if (navType === 'page-link') {
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

	// console.dir(gameDesks, { depth: null });

	return {
		/** Game Desks list */
		gameDesks,
		/** Game Links list */
		featuredGameLinks
	};
}
