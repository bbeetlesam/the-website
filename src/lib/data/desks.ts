import type { Desk } from '$lib/types';

import DESK_16x9 from './desk/16x9';

/**
 * Entries of available desks in various size (e.g. `1280x720`)
 *
 * This is a list of `Desk` objects, where each object represents a desk in a specific size.
 * I probably won't need a key-based lookup, so I'm using an array instead, and treat the list
 * as a simple collection pool of desks.
 */
export const DESKS: Desk[] = [
  DESK_16x9,
];
