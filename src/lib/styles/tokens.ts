// Design tokens sourced from CSS custom propertieS
import { getCssProperty } from '$lib/utils';

const tokens = {
	color: {
		paper: '',
		fgDark: '',
		roughDark: ''
	}
};

export function initializeCssTokens(): void {
	tokens.color.paper = getCssProperty('--color-paper');
	tokens.color.fgDark = getCssProperty('--color-fg-dark');
	tokens.color.roughDark = getCssProperty('--color-rough-dark');
}

export default tokens;
