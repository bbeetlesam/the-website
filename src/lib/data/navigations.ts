import type { RouteItem } from '$lib/types';

const NAV_ROUTES: RouteItem[] = [
	{ path: '/games', label: 'Games', title: 'Strange, arcade oddities.' },
	{ path: '/oddworks', label: 'Oddworks', title: 'Other strange projects.' },
	{ path: '/arts', label: 'Arts', title: 'Pieces of my arts.' },
	{ path: '/blogs', label: 'Blogs', title: 'The signs of my mind.' },
	{ path: '/bio', label: 'Bio', title: 'Who am I really?' }
];

export { NAV_ROUTES };
