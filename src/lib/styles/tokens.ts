// Design tokens sourced from CSS custom propertieS
import { getCssProperty } from '$lib/utils';

const tokens = {
	color: {
		paper: '',
		fgDark: '',
		darkMedium: '',
		roughDark: '',
		blue: '',
		purple: '',
		cyan: '',
		red: ''
	},
	font: {
		akt: '',
		balsamiq: '',
		baskerville: '',
		bricolage: ''
	}
};

export function initializeCssTokens(): void {
	tokens.color.paper = getCssProperty('--color-paper');
	tokens.color.fgDark = getCssProperty('--color-fg-dark');
	tokens.color.darkMedium = getCssProperty('--color-dark-medium');
	tokens.color.roughDark = getCssProperty('--color-rough-dark');
	tokens.color.blue = getCssProperty('--color-blue');
	tokens.color.purple = getCssProperty('--color-purple');
	tokens.color.cyan = getCssProperty('--color-cyan');
	tokens.color.red = getCssProperty('--color-red');

	tokens.font.akt = getCssProperty('--font-akt');
	tokens.font.balsamiq = getCssProperty('--font-balsamiq');
	tokens.font.baskerville = getCssProperty('--font-baskerville');
	tokens.font.bricolage = getCssProperty('--font-bricolage');
}

export default tokens;
