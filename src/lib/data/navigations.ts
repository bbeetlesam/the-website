import type { RouteId } from '$app/types';

/**
 * Maps plain string identifiers to their corresponding SvelteKit RouteId(s).
 *
 * Keys are short, human-readable slugs (e.g. `'games'`).
 * Values are SvelteKit internal route IDs, which may include route group prefixes
 * (e.g. `/(header)/games`) that don't appear in the browser URL.
 *
 * @example
 * NAV_ROUTES['games'] // → '/(header)/games'
 */
const NAV_ROUTES: Record<string, RouteId> = {
	home: '/',
	games: '/(header)/games',
	blogs: '/(header)/blogs',
	arts: '/(header)/arts',
	bio: '/(header)/bio',
	oddworks: '/(header)/oddworks'
};

export { NAV_ROUTES };
