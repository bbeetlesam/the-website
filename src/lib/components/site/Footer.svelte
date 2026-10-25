<script lang="ts">
	import { getRandomFooterLine } from './footerLines';

	const footerLine = getRandomFooterLine();

	const footerWavePath = $derived.by(() => {
		const footerWaveCount = 1;
		const cycleWidth = 1000 / footerWaveCount;
		const quarterWidth = cycleWidth / 4;
		const amplitude = 30;
		const centerline = amplitude;
		const path = [`M 0 ${centerline}`];

		for (let quarter = 0; quarter < footerWaveCount * 4; quarter += 1) {
			const startAngle = quarter * (Math.PI / 2);
			const endAngle = startAngle + Math.PI / 2;
			const startY = centerline - amplitude * Math.sin(startAngle);
			const endY = centerline - amplitude * Math.sin(endAngle);
			const startSlope = -amplitude * Math.cos(startAngle) * ((2 * Math.PI) / cycleWidth);
			const endSlope = -amplitude * Math.cos(endAngle) * ((2 * Math.PI) / cycleWidth);

			path.push(
				`C ${quarter * quarterWidth + quarterWidth / 3} ${startY + (startSlope * quarterWidth) / 3} ${quarter * quarterWidth + (2 * quarterWidth) / 3} ${endY - (endSlope * quarterWidth) / 3} ${(quarter + 1) * quarterWidth} ${endY}`
			);
		}

		return `${path.join(' ')} L 1000 1000 L 0 1000 Z`;
	});
</script>

<!-- WIP: set different layout for desktop version (in desktop viewport it is set to hidden) -->
<!-- BASICALLY ALL ASPECTS ARE WIP HERE -->
<footer class="relative isolate h-full w-screen px-4 pb-2 md:hidden md:w-auto">
	<div class="flex flex-col justify-end gap-4 pt-15">
		<p class="text-center font-balsamiq text-5xl">THIS IS A FOOTER</p>
		<p class="text-justify">
			The music dance and sing. They make the children really ring, and I spend the day
			your way. Call it morning driving through the sound, in and out the valley!
		</p>
		<p class="text-justify">
			In and around the lake, mountains come out of the sky and they stand there. One mile
			over, we'll be there and we'll see you. Ten true summers, we'll be there and
			laughing, too. Twenty-four before my love, you'll see I'll be there with you..
		</p>
		<p class="text-xs">— &copy; {new Date().getFullYear()} bbeetlesam</p>

		<div class="pt-2 text-center">
			<p class="font-akt text-sm font-medium">{footerLine}</p>
		</div>
	</div>

	<!-- Footer's wavy background -->
	<svg
		class="
  		pointer-events-none absolute top-0 left-1/2 -z-10 h-full w-full
  		-translate-x-1/2 text-blue
		"
		viewBox="0 0 1000 1000"
		preserveAspectRatio="none"
		aria-hidden="true"
	>
		<path d={footerWavePath} fill="currentColor" />
	</svg>
</footer>
