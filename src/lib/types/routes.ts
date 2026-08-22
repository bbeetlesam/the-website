/**
 * Represents a route item for the navigation menu.
 */
type RouteItem = {
	/** The path of the route (e.g. `/about`). */
	path: string;
	/** The title of the route. */
	title: string;
	/** The description of the route (technically the 'longer' title). */
	desc: string;
};

/**
 * Five horsemen of the page routes (these are valid route keys)
 */
type RouteKey = 'games' | 'oddworks' | 'arts' | 'blogs' | 'bio';

export type { RouteItem, RouteKey };
