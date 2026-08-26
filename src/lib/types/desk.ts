import type { NavItem } from './navigation';

type DeskItem = {
	id: string;
	image: string;
	imageAlt: string;
	x: number;
	y: number;
	rotation: number;
	size: number;
	navigation?: NavItem;
	/** The focus frame configuration for the item (only on navigable items). */
	focusFrame?: {
		/** The size of the focus frame as a percentage of the item's size. */
		size?: number;
		/** The size of the focus frame's corner. */
		cornerSize?: number;
		/** The thickness of the focus frame's corner. */
		cornerThickness?: number;
		/** The offset of the focus drawing from the canvas edge of the item. */
		edgeOffset?: number;
	};
};

type DeskSize = {
	width: number;
	height: number;
};

type Desk = {
	size: DeskSize;
	items: DeskItem[];
};

export type { DeskItem, DeskSize, Desk };
