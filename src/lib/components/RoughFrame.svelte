<!--
@component Draws a decorative rough.js frame around its children without
affecting the surrounding layout.

This component is best used to wrap block-level content rather than inline text,
like:

```svelte
<RoughFrame>
	<div>why don't we do it on the road</div>
</RoughFrame>
```

@props children: Snippet - The content to be drawn inside the frame.
@props options: RoughOptions - The options for the rough.js drawing.
@props scale: Scale | number - The scale of the frame as a relative percentage of its children.
A number applies the same scale to both axes, while a `Scale` object can specify x and y
independently.
@props changeOnHover: boolean - Whether the frame should be repeatedly redrawn while hovered.
@props refreshRate: number - The interval in milliseconds between redraws while hovered.
@props class: string - The CSS class to apply to the frame's outer wrapper.
-->

<script lang="ts">
	import rough from 'roughjs';
	import type { Options as RoughOptions } from 'roughjs/bin/core';
	import type { Snippet } from 'svelte';

	type Scale = {
		x?: number;
		y?: number;
	};

	type Props = {
		children: Snippet;
		options?: RoughOptions;
		scale?: Scale | number;
		changeOnHover?: boolean;
		refreshRate?: number;
		class?: string;
	};

	type RoughFrameParams = {
		options: RoughOptions;
		scale: Scale | number;
		changeOnHover: boolean;
		refreshRate: number;
		active: boolean;
	};

	// Component props
	const {
		children,
		options = {},
		scale = 100,
		changeOnHover = false,
		refreshRate = 300,
		class: className = ''
	}: Props = $props();

	const defaultOptions: RoughOptions = {
		strokeWidth: 2,
		stroke: '#2e2e2e'
	};

	const mergedOptions: RoughOptions = $derived({
		...defaultOptions,
		...options
	});

	let isHovered = $state(false);

	function createRoughFrame(canvas: HTMLCanvasElement, params: RoughFrameParams) {
		const parent = canvas.parentElement;

		if (!parent) return;

		let currentScale = params.scale;
		let currentOptions = params.options;
		let currentChangeOnHover = params.changeOnHover;
		let currentRefreshRate = params.refreshRate;
		let active = params.active;

		let intervalId: ReturnType<typeof setInterval> | null = null;

		const draw = () => {
			const { width, height } = parent.getBoundingClientRect();

			const scaleX = typeof currentScale === 'number' ? currentScale : (currentScale.x ?? 100);
			const scaleY = typeof currentScale === 'number' ? currentScale : (currentScale.y ?? 100);

			const canvasWidth = width * (scaleX / 100);
			const canvasHeight = height * (scaleY / 100);

			const dpr = window.devicePixelRatio || 1;

			canvas.width = Math.max(1, Math.round(canvasWidth * dpr));
			canvas.height = Math.max(1, Math.round(canvasHeight * dpr));

			canvas.style.width = `${canvasWidth}px`;
			canvas.style.height = `${canvasHeight}px`;

			const context = canvas.getContext('2d');

			if (!context) return;

			context.setTransform(dpr, 0, 0, dpr, 0, 0);

			const rc = rough.canvas(canvas);

			const strokeWidth = currentOptions.strokeWidth ?? 2;
			const offset = strokeWidth + 2;

			rc.rectangle(
				offset,
				offset,
				canvasWidth - offset * 2,
				canvasHeight - offset * 2,
				currentOptions
			);
		};

		const syncRefresh = () => {
			if (intervalId) clearInterval(intervalId);

			intervalId = currentChangeOnHover && active ? setInterval(draw, currentRefreshRate) : null;
		};

		draw();
		syncRefresh();

		const resizeObserver = new ResizeObserver(draw);

		resizeObserver.observe(parent);

		return {
			update(newParams: RoughFrameParams) {
				currentScale = newParams.scale;
				currentOptions = newParams.options;
				currentChangeOnHover = newParams.changeOnHover;
				currentRefreshRate = newParams.refreshRate;
				active = newParams.active;

				draw();
				syncRefresh();
			},

			destroy() {
				if (intervalId) clearInterval(intervalId);

				resizeObserver.disconnect();
			}
		};
	}
</script>

<div
	class={`relative w-fit ${className}`}
	onmouseenter={() => (isHovered = true)}
	onmouseleave={() => (isHovered = false)}
	role="presentation"
>
	<div class="relative z-10">
		{@render children()}
	</div>

	<canvas
		use:createRoughFrame={{
			options: mergedOptions,
			scale,
			changeOnHover,
			refreshRate,
			active: isHovered
		}}
		class="pointer-events-none absolute top-1/2 left-1/2 z-0"
		style="transform: translate(-50%, -50%);"
		aria-hidden="true"
	></canvas>
</div>
