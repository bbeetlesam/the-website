import type { NavItem } from '$lib/types';
import placeholder from '$lib/assets/favicon.svg'; // WIP

/**
 * The navigation metadata for the website routes (hardcoded).
 * Available routes are defined by Svelte's RouteId.
 *
 * Currently available routes: `/`, `/games`, `/oddworks`, `/arts`, `/blogs`, `/bio`.
 */
export const NAV_ITEMS = {
	'/': {
		route: '/',
		title: 'Home',
		desc: 'A desk of everything.',
		icon: placeholder
	},
	'/games': {
		route: '/games',
		title: 'Games',
		desc: 'Strange, arcade oddities.',
		icon: placeholder
	},
	'/oddworks': {
		route: '/oddworks',
		title: 'Oddworks',
		desc: 'Other strange projects.',
		icon: placeholder
	},
	'/arts': {
		route: '/arts',
		title: 'Arts',
		desc: 'Pieces of my arts.',
		icon: placeholder
	},
	'/blogs': {
		route: '/blogs',
		title: 'Blogs',
		desc: 'The signs of my mind.',
		icon: placeholder
	},
	'/bio': {
		route: '/bio',
		title: 'Bio',
		desc: 'Who am I really?',
		icon: placeholder
	}
} satisfies Record<string, NavItem>;

/**
 * Union of all public navigation route paths derived from `NAV_ITEMS`.
 *
 * Unlike SvelteKit's internal `RouteId`, this type represents the actual
 * URL paths used in navigation, such as `'/games'` or `'/bio'`.
 */
export type NavRoute = keyof typeof NAV_ITEMS;
