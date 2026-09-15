import type { NavItem } from './navigation';
import type { Icon } from './image';

type InteractionEffect = 'none' | 'focus-frame';
type FocusFrame = {
	/** The size of the focus frame as a percentage of the item's size. */
	size?: number;
	/** The size of the focus frame's corner. */
	cornerSize?: number;
	/** The thickness of the focus frame's corner. */
	cornerThickness?: number;
	/** The offset of the focus drawing from the canvas edge of the item. */
	edgeOffset?: number;
};

type DeskItem = {
	id: string;
	icon: Icon;
	imageAlt: string;
	x: number;
	y: number;
	rotation: number;
	size: number;
	/** The navigation item associated with this item (if navigable). */
	navigation?: NavItem;
	/** The interaction effect to apply when the item is interacted with. */
	interactionEffect?: InteractionEffect;
	/** The focus frame configuration for the item (only on navigable items). */
	focusFrame?: FocusFrame;
};

type DeskSize = {
	/** The width of the Desk in pixels. */
	width: number;
	/** The height of the Desk in pixels. */
	height: number;
};

type Desk = {
	id: string;
	/** The size of the Desk. */
	size: DeskSize;
	/** The items on the Desk. */
	items: DeskItem[];
};

export type { DeskItem, DeskSize, Desk };
