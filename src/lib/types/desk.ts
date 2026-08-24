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
