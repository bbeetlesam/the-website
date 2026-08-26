import type { RouteId } from '$app/types';
import type { NavItem } from '$lib/types';

/**
 * The navigation metadata for the website routes (hardcoded).
 * Available routes are defined by Svelte's RouteId.
 *
 * Currently available routes: `/`, `/games`.
 */
export const NAV_ITEMS: Partial<Record<RouteId, NavItem>> = {
	'/games': { route: '/games', title: 'Games', desc: 'Strange, arcade oddities.' },
	// '/oddworks': { route: '/oddworks', title: 'Oddworks', desc: 'Other strange projects.' },
	// '/arts': { route: '/arts', title: 'Arts', desc: 'Pieces of my arts.' },
	// '/blogs': { route: '/blogs', title: 'Blogs', desc: 'The signs of my mind.' },
	// '/bio': { route: '/bio', title: 'Bio', desc: 'Who am I really?' }
};
