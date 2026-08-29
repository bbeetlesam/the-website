/**
 * Represents a navigation route item for the navigation menu.
 */
type NavItem = {
	/** The public route path of the navigation item. */
	route: `/${string}`;
	/** The title of the navigation item. */
	title: string;
	/** The description of the navigation item (technically the 'longer' title). */
	desc: string;
	/** The icon of the navigation item. */
	icon?: string;
};

export type { NavItem };
