import type { RouteId } from '$app/types';

/**
 * Represents a navigation route item for the navigation menu.
 */
type NavItem = {
	/** The SvelteKit RouteId used to resolve the navigation item. */
	route: RouteId;
	/** The title of the navigation item. */
	title: string;
	/** The description of the navigation item (technically the 'longer' title). */
	desc: string;
	/** The icon of the navigation item. */
	icon?: {
		/** The white version of the icon of the navigation item. */
		white?: string;
		/** The black version of the icon of the navigation item. */
		black?: string;
	};
};

export type { NavItem };
