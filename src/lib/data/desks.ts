import type { DeskConfig } from '$lib/types';
import DESK_1280x720 from './desk/1280x720';

/**
 * Available sizes of the desk (e.g. `size1280x720`).
 *
 * I know the naming is a bit confusing, but it's the best I could come up with.
 */
type DeskAvailableSize = 'size1280x720'; // more sizes coming soon

/** Entries of available desks in various size (e.g. `1280x720`) */
export const DESKS: Record<DeskAvailableSize, DeskConfig> = {
	size1280x720: DESK_1280x720
};
