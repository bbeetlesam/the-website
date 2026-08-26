<script lang="ts">
	import { onMount } from 'svelte';
	import rough from 'roughjs';
	import type { Options as RoughOptions } from 'roughjs/bin/core';
	import type { RoughCanvas } from 'roughjs/bin/canvas';

	import { DESKS } from '$lib/data';
	import { scaleToFit } from '$lib/utils';
	import type { DeskItem } from '$lib/types';

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

	function roughFocus(canvas: HTMLCanvasElement, item: DeskItem) {
		const focusSize = item.focusFrame?.size ?? 100;
		const cornerSize = item.focusFrame?.cornerSize ?? 20;
		const cornerThickness = item.focusFrame?.cornerThickness ?? 3;

		// Logical size of the canvas
		const size = item.size * (focusSize / 100);

		// Canvas drawing resolution
		canvas.width = size;
		canvas.height = size;

		// Let CSS determine its visual size
		canvas.style.width = `${focusSize}%`;
		canvas.style.height = `${focusSize}%`;

		const rc: RoughCanvas = rough.canvas(canvas);

		const options: RoughOptions = {
			strokeWidth: cornerThickness,
			stroke: '#1e1e1e',
			roughness: 0.85
		};

		const offset = cornerThickness + 2;

		// Top-left
		rc.line(offset, cornerSize + offset, offset, offset, options);
		rc.line(offset, offset, cornerSize + offset, offset, options);

		// Top-right
		rc.line(size - cornerSize - offset, offset, size - offset, offset, options);
		rc.line(size - offset, offset, size - offset, cornerSize + offset, options);

		// Bottom-left
		rc.line(offset, size - cornerSize - offset, offset, size - offset, options);
		rc.line(offset, size - offset, cornerSize + offset, size - offset, options);

		// Bottom-right
		rc.line(size - cornerSize - offset, size - offset, size - offset, size - offset, options);
		rc.line(size - offset, size - offset, size - offset, size - cornerSize - offset, options);
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
		class="desk"
		style={`--desk-width: ${desk.size.width}px; --desk-height: ${desk.size.height}px; --desk-scale: ${deskScale};`}
	>
		{#each desk.items as item (item.id)}
			<div
				class="group/desk-item desk-item"
				style={`
  				left: ${item.x}px;
  				top: ${item.y}px;
          width: ${item.size}px;
          height: ${item.size}px;
        `}
			>
				{#if item.route}
					<!-- Focus frame canvas -->
					<canvas
						use:roughFocus={item}
						class="item-focus-frame opacity-0 group-hover/desk-item:opacity-100"
						aria-hidden="true"
					></canvas>

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
