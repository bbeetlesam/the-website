import type { NavItem } from '$lib/types';
import homeWhite from '$lib/assets/images/nav-icons/home-white.svg';
import homeBlack from '$lib/assets/images/nav-icons/home-black.svg';
import gameWhite from '$lib/assets/images/nav-icons/game-white.svg';
import gameBlack from '$lib/assets/images/nav-icons/game-black.svg';
import bioWhite from '$lib/assets/images/nav-icons/bio-white.svg';
import bioBlack from '$lib/assets/images/nav-icons/bio-black.svg';
import artsWhite from '$lib/assets/images/nav-icons/arts-white.svg';
import artsBlack from '$lib/assets/images/nav-icons/arts-black.svg';
import oddworksWhite from '$lib/assets/images/nav-icons/oddworks-white.svg';
import oddworksBlack from '$lib/assets/images/nav-icons/oddworks-black.svg';
import blogsWhite from '$lib/assets/images/nav-icons/blogs-white.svg';
import blogsBlack from '$lib/assets/images/nav-icons/blogs-black.svg';

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
		icon: {
			white: homeWhite,
			black: homeBlack
		}
	},
	'/games': {
		route: '/(header)/games',
		title: 'Games',
		desc: 'Strange, arcade oddities.',
		icon: {
			white: gameWhite,
			black: gameBlack
		}
	},
	'/oddworks': {
		route: '/(header)/oddworks',
		title: 'Oddworks',
		desc: 'Other strange projects.',
		icon: {
			white: oddworksWhite,
			black: oddworksBlack
		}
	},
	'/arts': {
		route: '/(header)/arts',
		title: 'Arts',
		desc: 'Pieces of my arts.',
		icon: {
			white: artsWhite,
			black: artsBlack
		}
	},
	'/blogs': {
		route: '/(header)/blogs',
		title: 'Blogs',
		desc: 'The signs of my mind.',
		icon: {
			white: blogsWhite,
			black: blogsBlack
		}
	},
	'/bio': {
		route: '/(header)/bio',
		title: 'Bio',
		desc: 'Who am I really?',
		icon: {
			white: bioWhite,
			black: bioBlack
		}
	}
} satisfies Record<string, NavItem>;

/**
 * Union of all public navigation route paths derived from `NAV_ITEMS`.
 *
 * Unlike SvelteKit's internal `RouteId`, this type represents the actual
 * URL paths used in navigation, such as `'/games'` or `'/bio'`.
 */
export type NavRoute = keyof typeof NAV_ITEMS;
