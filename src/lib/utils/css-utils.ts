// These are utils that related to CSS properties
// Mostly used for getting CSS variable values to use in TypeScript

/**
 * Retrieves the computed value of a CSS property from the document root.
 *
 * @param name - The name of the CSS property.
 * @returns The computed value of the property.
 * @throws {Error} If the property is missing or has an empty value.
 */
export function getCssProperty(name: string): string {
	const value = getComputedStyle(document.documentElement).getPropertyValue(name).trim();

	if (!value) {
		throw new Error(`CSS property "${name}" is missing or empty. Duh!`);
	}

	return value;
}

/**
 * Retrieves all CSS custom properties defined on the document root.
 *
 * @returns An object mapping property names to their computed values.
 */
export function getCssProperties(): Record<string, string> {
	const styles = getComputedStyle(document.documentElement);

	return Object.fromEntries(
		[...styles]
			.filter((property) => property.startsWith('--'))
			.map((property) => [property, styles.getPropertyValue(property).trim()])
	);
}
