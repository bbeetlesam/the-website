import type { RouteId } from '$app/types';

/**
 * Represents a navigation route item for the navigation menu.
 */
type NavItem = {
	/** The route path of the navigation item. */
	route: RouteId;
	/** The title of the navigation item. */
	title: string;
	/** The description of the navigation item (technically the 'longer' title). */
	desc: string;
};

export type { NavItem };
