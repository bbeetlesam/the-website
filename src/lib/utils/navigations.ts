// These are utils that related to navigations.
// People needs navigations. Not always, but often is, isn't it?

import { NAV_ROUTES } from '$lib/data';

/** Resolve a Sanity page-link identifier to its SvelteKit route. */
export function getPageRoute(id: string) {
	const route = NAV_ROUTES[id];

	if (!route) {
		throw new Error(`Page link "${id}" has no route defined in NAV_ROUTES.`);
	}

	return route;
}
