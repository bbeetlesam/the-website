import type { RouteId } from '$app/types';
import type { Icon } from './objects';

/**
 * Represents a supported navigation type.
 *
 * These types correspond to the navigation types defined in Sanity.
 */
type NavigationType = 'page-link' | 'social-link';

/** Represents a supported game platform of the game. */
type GamePlatform = 'web' | 'windows' | 'mac' | 'linux' | 'android' | 'ios' | 'other';

/**
 * Represents a link to a page within the application.
 */
type PageLink = {
	/** The navigation type returned by Sanity. */
	type: 'page-link';
	/** The unique identifier of the page link. */
	id: string;
	/** The SvelteKit RouteId used to resolve the page link. */
	route: RouteId;
	/** The title of the page link. */
	title: string;
	/** The description of the page link (technically the 'longer' title). */
	desc?: string;
	/** The icon of the page link. */
	icon?: Icon;
};

/** Page links indexed by their stable Sanity `id` (for example, `home` or `arts`). */
type PageLinkMap = Record<string, PageLink>;

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
	title?: string;
	/** The description of the external link. */
	desc?: string;
	/** The image icon of the external link. */
	icon?: Icon;
};

/**
 * Represents a Game link. Based on {@link GameLink}, but with genre, platform,
 * and screenshot fields.
 */
type GameLink = ExternalLink & {
	/** The genre of the game. */
	genre: string;
	/** The platforms the game is available on. */
	platforms: GamePlatform[];
	/** The screenshot of the game. */
	screenshot?: string;
};

/** Represents a navigational link. */
type Navigation = PageLink | ExternalLink;

export type {
	PageLink,
	PageLinkMap,
	ExternalLink,
	GameLink,
	NavigationType,
	Navigation,
	GamePlatform
};
