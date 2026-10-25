import { getContext, setContext } from 'svelte';

export type DesktopState = {
	/** True when the viewport meets the site's Tailwind `md` breakpoint. */
	isDesktop: boolean;
};

const DESKTOP_STATE_KEY = Symbol('desktop-state');

/** Provide the per-layout responsive state to descendant components. */
export function provideDesktopState(state: DesktopState): void {
	setContext(DESKTOP_STATE_KEY, state);
}

/**
 * Read the responsive state provided by the root layout.
 * Must be called during component initialization by a layout descendant.
 */
export function getDesktopState(): DesktopState {
	const state = getContext<DesktopState>(DESKTOP_STATE_KEY);

	if (!state) {
		throw new Error('Desktop state is unavailable outside the root layout.');
	}

	return state;
}
