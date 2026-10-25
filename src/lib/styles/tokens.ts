// Design tokens sourced from CSS custom propertieS
import { getCssProperty } from '$lib/utils';

const tokens = {
	color: {
		paper: '',
		dark2: '',
		dark3: '',
		dark1: '',
		blue: '',
		purple: '',
		cyan: '',
		red: ''
	},
	font: {
		akt: '',
		balsamiq: '',
		baskerville: '',
		bricolage: '',
		mono: ''
	}
};

export function initializeCssTokens(): void {
	tokens.color.paper = getCssProperty('--color-paper');
	tokens.color.dark2 = getCssProperty('--color-dark-2');
	tokens.color.dark3 = getCssProperty('--color-dark-3');
	tokens.color.dark1 = getCssProperty('--color-dark-1');
	tokens.color.blue = getCssProperty('--color-blue');
	tokens.color.purple = getCssProperty('--color-purple');
	tokens.color.cyan = getCssProperty('--color-cyan');
	tokens.color.red = getCssProperty('--color-red');

	tokens.font.akt = getCssProperty('--font-akt');
	tokens.font.balsamiq = getCssProperty('--font-balsamiq');
	tokens.font.baskerville = getCssProperty('--font-baskerville');
	tokens.font.bricolage = getCssProperty('--font-bricolage');
	tokens.font.mono = getCssProperty('--font-mono');
}

export default tokens;
