import type { RouteItem } from './routes';

type DeskItem = {
	id: string;
	image: string;
	imageAlt: string;
	x: number;
	y: number;
	rotation: number;
	size: number;
	route?: RouteItem;
	/** The focus frame configuration for the item (only on route items). */
	focusFrame?: {
		/** The size of the focus frame as a percentage of the item's size. */
		size?: number;
		/** The size of the focus frame's corner. */
		cornerSize?: number;
		/** The thickness of the focus frame's corner. */
		cornerThickness?: number;
	};
};

type DeskSize = {
	width: number;
	height: number;
};

type DeskConfig = {
	size: DeskSize;
	items: DeskItem[];
};

export type { DeskItem, DeskSize, DeskConfig };
