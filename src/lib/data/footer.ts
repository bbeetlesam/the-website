import { pickRandomItem } from '$lib/utils/random';

const FOOTER_TAGLINES = [
	'The crux of the biscuit is the creator.',
	'Try to listen to some Egg for a worthwhile.',
	'Sweet Camomile.',
	'Centoquarantaduemilaottocentocinquantasette.',
	'With an ear to the ground you can make it.',
	"We're in the Land of Grey and Pink.",
	'Unleash yer inner mounting flame.',
	'The one and only Billy Shears!',
	"Imagine you're at the gine with ima.",
	"There's a flying teapot in the sky!",
	'Shine on you crazy mammal.',
	"It's likely to be ready next week.",
	"Atlantis' agony at May 26th, 2026, 16 p.m. Eid earthtime.",
	'Think of people with kindness.',
	'Living is easy with eyes closed.'
];

// footer texts
const FOOTER_TEXT = pickRandomItem(FOOTER_TAGLINES);

export { FOOTER_TAGLINES, FOOTER_TEXT };
