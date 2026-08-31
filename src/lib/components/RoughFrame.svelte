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
@props size: number - The size of the frame as a relative percentage of its children.
@props class: string - The CSS class to apply to the frame's outer wrapper.
-->

<script lang="ts">
	import rough from 'roughjs';
	import type { Options as RoughOptions } from 'roughjs/bin/core';
	import type { Snippet } from 'svelte';

	type Props = {
		children: Snippet;
		options?: RoughOptions;
		size?: number;
		class?: string;
	};

	// Component props
	const { children, options = {}, size = 100, class: className = '' }: Props = $props();

	const defaultOptions: RoughOptions = {
		strokeWidth: 2,
		stroke: '#2e2e2e'
	};

	const mergedOptions: RoughOptions = $derived({
		...defaultOptions,
		...options
	});

	function createRoughFrame(canvas: HTMLCanvasElement) {
		const parent = canvas.parentElement;

		if (!parent) return;

		const draw = () => {
			const { width, height } = parent.getBoundingClientRect();

			const canvasWidth = width * (size / 100);
			const canvasHeight = height * (size / 100);

			const dpr = window.devicePixelRatio || 1;

			canvas.width = Math.max(1, Math.round(canvasWidth * dpr));
			canvas.height = Math.max(1, Math.round(canvasHeight * dpr));

			canvas.style.width = `${canvasWidth}px`;
			canvas.style.height = `${canvasHeight}px`;

			const context = canvas.getContext('2d');

			if (!context) return;

			context.setTransform(dpr, 0, 0, dpr, 0, 0);

			const rc = rough.canvas(canvas);

			const strokeWidth = mergedOptions.strokeWidth ?? 2;
			const offset = strokeWidth + 2;

			rc.rectangle(
				offset,
				offset,
				canvasWidth - offset * 2,
				canvasHeight - offset * 2,
				mergedOptions
			);
		};

		const resizeObserver = new ResizeObserver(draw);

		resizeObserver.observe(parent);

		draw();

		return {
			update() {
				draw();
			},

			destroy() {
				resizeObserver.disconnect();
			}
		};
	}
</script>

<div class={`relative inline-block ${className}`}>
	<div class="relative z-10">
		{@render children()}
	</div>

	<canvas
		use:createRoughFrame
		class="pointer-events-none absolute top-1/2 left-1/2 z-0"
		style="transform: translate(-50%, -50%);"
		aria-hidden="true"
	></canvas>
</div>
