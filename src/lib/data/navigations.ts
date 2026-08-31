import type { NavItem } from '$lib/types';
import placeholder from '$lib/assets/favicon.svg'; // WIP

/**
 * Navigation metadata for the website's public routes.
 *
 * The object keys represent public URL paths, while
 * the `route` property contains the corresponding SvelteKit RouteId
 * used internally for route resolution.
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
		route: '/(header)/games',
		title: 'Games',
		desc: 'Strange, arcade oddities.',
		icon: placeholder
	},
	'/oddworks': {
		route: '/(header)/oddworks',
		title: 'Oddworks',
		desc: 'Other strange projects.',
		icon: placeholder
	},
	'/arts': {
		route: '/(header)/arts',
		title: 'Arts',
		desc: 'Pieces of my arts.',
		icon: placeholder
	},
	'/blogs': {
		route: '/(header)/blogs',
		title: 'Blogs',
		desc: 'The signs of my mind.',
		icon: placeholder
	},
	'/bio': {
		route: '/(header)/bio',
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
