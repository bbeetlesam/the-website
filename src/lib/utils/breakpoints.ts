/**
 * Watch the site's `md` breakpoint from browser code.
 *
 * Call from `onMount` so browser globals are only accessed after hydration.
 * Calls `onChange` immediately with the current match, then on each breakpoint
 * crossing. Returns a cleanup function that removes the media-query listener.
 * The CSS custom property remains the single source of truth for the value.
 */
export function watchDesktop(onChange: (isDesktop: boolean) => void): () => void {
	const customProperty = '--breakpoint-md';
	const value = getComputedStyle(document.documentElement)
		.getPropertyValue(customProperty)
		.trim();

	if (!value) {
		throw new Error(
			`Desktop breakpoint CSS custom property "${customProperty}" is not defined.`
		);
	}

	const query = window.matchMedia(`(min-width: ${value})`);
	const update = () => onChange(query.matches);

	query.addEventListener('change', update);
	update();

	return () => query.removeEventListener('change', update);
}
