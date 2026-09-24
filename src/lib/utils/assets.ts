// Utility functions for working with media assets stuff
// Well, this exists.

import type { IconAsset, IconAssetList } from '$lib/types';

/**
 * Retrieves an Icon Asset from the given Icon Asset list by its ID.
 *
 * @param iconAssets - The Icon Asset list to search
 * @param id - The ID of the Icon Asset to retrieve
 * @returns The Icon Asset with the given ID, or `undefined` if not found
 */
export function getIconAsset(
	iconAssets: IconAssetList,
	id: string
): IconAsset | undefined {
	const icon = iconAssets[id];

	if (!icon) {
		console.warn(`Icon Asset "${id}" does not exist.`);
	}

	return icon;
}
