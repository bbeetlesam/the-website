<script lang="ts">
	import { onMount } from 'svelte';

	import type { Desk } from '$lib/types';
	import { DeskArea } from '$lib/components';
	import { DESKS } from '$lib/data';
	import { scaleToFit } from '$lib/utils';

	let deskArea: HTMLDivElement;

	let desk = $state<Desk>(DESKS[0]);
	let deskScale = $state(1);

	/**
	 * Finds the closest desk to the given width/height ratio.
	 *
	 * It may not be the best algorithm so may change this later
	 */
	function findClosestDesk(width: number, height: number) {
		const targetRatio = width / height;

		return Object.values(DESKS).reduce((closest, candidate) => {
			const candidateRatio = candidate.size.width / candidate.size.height;
			const closestRatio = closest.size.width / closest.size.height;

			const currentDistance = Math.abs(candidateRatio - targetRatio);
			const closestDistance = Math.abs(closestRatio - targetRatio);

			return currentDistance < closestDistance ? candidate : closest;
		});
	}

	function updateDesk() {
		const { width, height } = deskArea.getBoundingClientRect();

		desk = findClosestDesk(width, height);

		const parentWidth = width;
		const parentHeight = height;
		const deskWidth = desk.size.width;
		const deskHeight = desk.size.height;

		deskScale = scaleToFit(parentWidth, parentHeight, deskWidth, deskHeight);

		// Debugging Log
		// const widthScale = parentWidth / deskWidth;
		// const heightScale = parentHeight / deskHeight;
		// console.log({ parentWidth, parentHeight, deskWidth, deskHeight });
	}

	onMount(() => {
		const observer = new ResizeObserver(updateDesk);

		observer.observe(deskArea);
		updateDesk();

		return () => observer.disconnect();
	});
</script>

<!-- Home page's head data -->
<!-- Moved from ./+layout.svelte for page (Home) specific head data -->
<svelte:head>
	<title>bbeetlesam</title>
	<meta
		name="description"
		content="Get ready to watch bbeetlesam's desk view on the web. It contains everything he has ever done."
	/>
</svelte:head>

<!-- The holy desk of Homepage -->
<div bind:this={deskArea} class="relative flex flex-1 items-center justify-center">
	<DeskArea {desk} {deskScale} />
</div>
