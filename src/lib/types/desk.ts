import type { RouteItem } from './routes';

/**
 * Available ratio of the desk (e.g. `ratio1280x720`).
 *
 * I know the naming is a bit confusing, but it's the best I could come up with.
 */
type DeskRatio = 'ratio1280x720'; // more ratio coming soon

type DeskItem = {
	id: string;
	image: string;
	x: number;
	y: number;
	rotation: number;
	size: number;
	isRouteItem?: boolean;
	route?: RouteItem;
};

type DeskSize = {
	width: number;
	height: number;
};

type DeskConfig = {
	size: DeskSize;
	items: DeskItem[];
};

export type { DeskRatio, DeskItem, DeskSize, DeskConfig };
