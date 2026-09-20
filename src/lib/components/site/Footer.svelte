<script lang="ts">
	import { pickRandomItem } from '$lib/utils';

	const footerLines = [
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

	let footerLine = pickRandomItem(footerLines);
</script>

<footer
	class="flex w-full items-center justify-center p-2 text-center text-xs font-medium"
>
	<p>{footerLine}</p>
</footer>
