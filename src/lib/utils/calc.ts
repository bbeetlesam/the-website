// These are utils that related to calculations
// 'Calculations', very generic, I know.

/**
 * Calculate scale-to-fit factor for a child element inside a parent.
 *
 * @param parentWidth - width of the parent container
 * @param parentHeight - height of the parent container
 * @param childWidth - width of the child element
 * @param childHeight - height of the child element
 * @returns scale factor (number)
 */
export function scaleToFit(
	parentWidth: number,
	parentHeight: number,
	childWidth: number,
	childHeight: number
): number {
	const widthScale = parentWidth / childWidth;
	const heightScale = parentHeight / childHeight;
	return Math.min(widthScale, heightScale);
}
