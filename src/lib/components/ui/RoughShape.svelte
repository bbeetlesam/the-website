<!--
@component Draws a definitive shape with rough.js.

Example:
```svelte
<RoughShape type="circle" />
```

@props type: string - The shape to draw.
@props class: string - The CSS class to apply to the frame's outer wrapper.
@props width: number - The width of the shape.
@props height: number - The height of the shape.
@props thickness: number - The thickness of the stroke. Similar to rough.js' `strokeWidth`.
@props points: Point[] - The points of the shape.
@props options: RoughOptions - The options for the rough.js drawing.
@props seed: number - The seed for the shape randomness.
@props offset: number - The offset of the shape from the edge.
-->

<script lang="ts">
	import rough from 'roughjs';
	import type { Options as RoughOptions, PathInfo } from 'roughjs/bin/core';

	export type Point = [number, number];
	export type Shape =
		| 'rectangle'
		| 'square'
		| 'circle'
		| 'ellipse'
		| 'line'
		| 'polygon'
		| 'triangle'
		| 'cross';

	interface Props {
		type: Shape;
		class?: string;
		width?: number;
		height?: number;
		thickness?: number;
		points?: Point[];
		options?: RoughOptions;
		seed?: number;
		offset?: number;
	}

	let {
		type,
		class: className = '',
		width = 100,
		height = 100,
		thickness = 10,
		points = [],
		options = {},
		seed,
		offset
	}: Props = $props();

	let paths = $state<PathInfo[]>([]);

	const defaultOptions: RoughOptions = $derived({
		stroke: 'currentColor',
		strokeWidth: thickness,
		roughness: 2,
		bowing: 2
	});

	$effect(() => {
		const generator = rough.generator();

		const roughOptions: RoughOptions = {
			...defaultOptions,
			...options,
			...(seed !== undefined ? { seed } : {})
		};

		const strokeWidth = roughOptions.strokeWidth ?? 2;
		const shapeOffset = offset ?? strokeWidth + 2;

		const x = shapeOffset;
		const y = shapeOffset;
		const shapeWidth = Math.max(width - shapeOffset * 2, 0);
		const shapeHeight = Math.max(height - shapeOffset * 2, 0);

		const draw = () => {
			switch (type) {
				// Draw a rectangle. Different width and height
				case 'rectangle':
					return generator.rectangle(x, y, shapeWidth, shapeHeight, roughOptions);

				// Draw a square. Same width and height
				case 'square': {
					const size = Math.min(shapeWidth, shapeHeight);

					return generator.rectangle(
						(width - size) / 2,
						(height - size) / 2,
						size,
						size,
						roughOptions
					);
				}

				// Draw a circle. Same width and height
				case 'circle': {
					const diameter = Math.min(shapeWidth, shapeHeight);

					return generator.circle(width / 2, height / 2, diameter, roughOptions);
				}

				// Draw an ellipse. Different width and height
				case 'ellipse':
					return generator.ellipse(
						width / 2,
						height / 2,
						shapeWidth,
						shapeHeight,
						roughOptions
					);

				case 'line': {
					if (points.length < 2) return null;

					const [[x1, y1], [x2, y2]] = points;

					return generator.line(x1, y1, x2, y2, roughOptions);
				}

				case 'polygon':
					if (points.length < 3) return null;

					return generator.polygon(points, roughOptions);

				// Draw a triangle
				case 'triangle':
					return generator.polygon(
						[
							[width / 2, shapeOffset],
							[width - shapeOffset / 2, height - shapeOffset],
							[shapeOffset / 2, height - shapeOffset]
						],
						roughOptions
					);

				// Draw an X cross
				case 'cross':
					return [
						generator.line(
							shapeOffset,
							shapeOffset,
							width - shapeOffset,
							height - shapeOffset,
							roughOptions
						),
						generator.line(
							width - shapeOffset,
							shapeOffset,
							shapeOffset,
							height - shapeOffset,
							roughOptions
						)
					];
			}
		};

		const drawable = draw();

		if (!drawable) {
			paths = [];
			return;
		}

		if (Array.isArray(drawable)) {
			paths = drawable.flatMap((shape) => generator.toPaths(shape));
		} else {
			paths = generator.toPaths(drawable);
		}
	});
</script>

<svg
	class={className}
	{width}
	{height}
	viewBox={`0 0 ${width} ${height}`}
	preserveAspectRatio="none"
	aria-hidden="true"
>
	{#each paths as path (path.d)}
		<path
			d={path.d}
			stroke={path.stroke}
			stroke-width={path.strokeWidth}
			fill={path.fill ?? 'none'}
		/>
	{/each}
</svg>
