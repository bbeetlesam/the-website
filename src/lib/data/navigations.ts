import type { RouteItem, RouteKey } from '$lib/types';

/**
 * The navigation routes for the website (hardcoded).
 *
 * Available routes: `games`, `oddworks`, `arts`, `blogs`, `bio`.
 */
const NAV_ROUTES: Record<RouteKey, RouteItem> = {
	games: { path: '/games', title: 'Games', desc: 'Strange, arcade oddities.' },
	oddworks: { path: '/oddworks', title: 'Oddworks', desc: 'Other strange projects.' },
	arts: { path: '/arts', title: 'Arts', desc: 'Pieces of my arts.' },
	blogs: { path: '/blogs', title: 'Blogs', desc: 'The signs of my mind.' },
	bio: { path: '/bio', title: 'Bio', desc: 'Who am I really?' }
};

export { NAV_ROUTES };
