import type { RouteId } from '$app/types';
import type { Icon } from './image';

/**
 * Represents the type of navigation item.
 *
 * These are the navigation types supported by the application (also defined in Sanity).
 */
type NavigationType = 'nav-item' | 'social-link';

/**
 * Represents a navigation route item for the navigation menu.
 */
type NavItem = {
	/** The type of the navigation item based from Sanity. */
	type: 'nav-item';
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

/**
 * Represents a social link.
 */
type SocialLink = {
	/** The type of the link based from Sanity. */
	type: 'social-link';
	/** The unique identifier for the link. */
	id: string;
	/** The href of the link (to somewhere else). */
	href: string;
	/** The representing title for the link. */
	title: string;
	/** The image icon of the link. */
	icon: Icon;
	/** The order of the link in the list of social links. */
	order: number;
};

/** Represents a navigation field item. */
type Navigation = NavItem | SocialLink;

export type { NavItem, SocialLink, NavigationType, Navigation };
