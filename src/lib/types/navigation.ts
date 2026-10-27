import type {
	FEATURED_GAME_LINKS_QUERY_RESULT,
	PAGE_LINKS_QUERY_RESULT,
	SOCIAL_LINKS_QUERY_RESULT
} from '$lib/sanity/sanity.types';
import type { DeskItem } from './desk';

/**
 * Represents a link to a page within the application.
 *
 * The SvelteKit route is resolved from the Sanity identifier in the frontend.
 */
export type PageLink = PAGE_LINKS_QUERY_RESULT[number];

/**
 * Represents a link to an external resource.
 */
export type ExternalLink = SOCIAL_LINKS_QUERY_RESULT[number];

/**
 * Represents a game link. Based on {@link ExternalLink}, with genre, platform,
 * and screenshot fields.
 */
export type GameLink = FEATURED_GAME_LINKS_QUERY_RESULT[number];

/**
 * Represents a navigational link attached to a desk item.
 *
 * It is either an internal page link or an external social link dereferenced by
 * the desk GROQ query.
 */
export type Navigation = NonNullable<DeskItem['navigation']>;

/**
 * Represents a supported navigation type.
 *
 * These types correspond to the navigation document kinds defined in Sanity.
 */
export type NavigationType = Navigation['type'];

/**
 * Represents a platform value returned for a game link.
 *
 * Sanity configures the available platform options, but TypeGen exposes the
 * query field as `string[]`. This alias therefore resolves to `string` and does
 * not restrict values to that option list at compile time.
 */
export type GamePlatform = NonNullable<GameLink['platforms']>[number];
