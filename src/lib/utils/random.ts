// These are utils that related to randomness
// I feel random.

/**
 * Pick a random item from an array.
 *
 * @param items - array of items
 * @returns random item from the array, or undefined if the array is empty
 */
export function pickRandomItem<T>(items: T[]): T | undefined {
	if (items.length === 0) return undefined;
	return items[Math.floor(Math.random() * items.length)];
}
