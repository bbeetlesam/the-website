import type { RouteId } from '$app/types';
import type { Icon } from './image';

/**
 * Represents a supported navigation type.
 *
 * These types correspond to the navigation types defined in Sanity.
 */
type NavigationType = 'nav-item' | 'social-link';

/**
 * Represents a link to a page within the application.
 */
type PageLink = {
	/** The navigation type returned by Sanity. */
	type: 'nav-item';
	/** The unique identifier of the page link. */
	id: string;
	/** The SvelteKit RouteId used to resolve the page link. */
	route: RouteId;
	/** The title of the page link. */
	title: string;
	/** The description of the page link (technically the 'longer' title). */
	desc: string;
	/** The icon of the page link. */
	icon?: Icon;
};

/**
 * Represents an external link to an external resource.
 */
type ExternalLink = {
	/** The type of the link based from Sanity. */
	type: 'social-link';
	/** The unique identifier for the external link. */
	id: string;
	/** The href of the external link (to somewhere else). */
	href: string;
	/** The representing title for the external link. */
	title: string;
	/** The image icon of the external link. */
	icon: Icon;
	/** The order of the external link in its list. */
	order: number;
};

/** Represents a navigational link. */
type Navigation = PageLink | ExternalLink;

export type { PageLink, ExternalLink, NavigationType, Navigation };
