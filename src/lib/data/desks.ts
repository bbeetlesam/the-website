import type { DeskConfig, DeskRatio } from '$lib/types';
import DESK_1280x720 from './desk/1280x720';

/** Entries of available desks in various size (e.g. `1280x720`) */
export const DESKS: Record<DeskRatio, DeskConfig> = {
	ratio1280x720: DESK_1280x720
};
