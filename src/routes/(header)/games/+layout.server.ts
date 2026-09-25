import { NAV_ROUTES } from '$lib/data';
import { client } from '$lib/sanity/client';
import { GAME_DESKS_QUERY } from '$lib/sanity/queries';
import type { Desk, SanityDesk } from '$lib/types';

/**
 * Games layout server load function.
 *
 * Fetch Game `desk` documents from Sanity, resolve their navigation references,
 * and then returns them as `gameDesks` with the type of {@link Desk}[].
 */
export async function load() {
	const sanityGameDesks = await client.fetch<SanityDesk[]>(GAME_DESKS_QUERY);

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

	// console.dir(gameDesks, { depth: null });

	return {
		/** Game Desks list */
		gameDesks
	};
}
