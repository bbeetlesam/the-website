import type { RouteId } from '$app/types';
import type { Icon } from './image';

/**
 * Represents a navigation route item for the navigation menu.
 */
type NavItem = {
	/** The unique identifier of the navigation item. */
	id: string;
	/** The SvelteKit RouteId used to resolve the navigation item. */
	route: RouteId;
	/** The title of the navigation item. */
	title: string;
	/** The description of the navigation item (technically the 'longer' title). */
	desc: string;
	/** The icon of the navigation item. */
	icon?: Icon;
};

export type { NavItem };
