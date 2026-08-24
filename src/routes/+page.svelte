<script lang="ts">
	import { onMount } from 'svelte';
	import { DESKS } from '$lib/data';
	import { scaleToFit } from '$lib/utils';

	let deskArea: HTMLDivElement;

	let desk = $state(DESKS.size1280x720);
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

<!-- The holy desk of Homepage -->
<div bind:this={deskArea} class="relative flex flex-1 items-center justify-center">
	<div
		class="desk outline-2 outline-red-500"
		style={`--desk-width: ${desk.size.width}px; --desk-height: ${desk.size.height}px; --desk-scale: ${deskScale};`}
	>
		{#each desk.items as item (item.id)}
			<div
				class="desk-item"
				style={`
  				left: ${item.x}px;
  				top: ${item.y}px;
  				width: ${item.size}px;
			`}
			>
				{#if item.route}
					<a href={item.route.path}>
						<img
							src={item.image}
							alt={item.route.title}
							style={`
      				  width: ${item.size}px;
        				transform: rotate(${item.rotation}deg);
      				`}
						/>
					</a>
				{:else}
					<img
						src={item.image}
						alt={item.imageAlt}
						style={`
    				  width: ${item.size}px;
      				transform: rotate(${item.rotation}deg);
    				`}
					/>
				{/if}
			</div>
		{/each}
	</div>
</div>
