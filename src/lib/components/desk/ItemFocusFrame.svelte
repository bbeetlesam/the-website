<!-- 
@component A focus frame canvas for a *routed* desk item.
The canvas is used to draw the focus lines around the item using roughjs

@prop item: DeskItem - The item on which the focus frame is displayed.
@prop strokeColor: string - The colour of the focus lines. Defaults to ``'#1e1e1e'` .
-->

<script lang="ts">
	import rough from 'roughjs';
	import type { Options as RoughOptions } from 'roughjs/bin/core';
	import type { RoughCanvas } from 'roughjs/bin/canvas';

	import type { DeskItem } from '$lib/types';

	// Component props
	const { item, strokeColor = '#1e1e1e' }: { item: DeskItem; strokeColor?: string } = $props();

	function roughFocus(canvas: HTMLCanvasElement, item: DeskItem) {
		const focusSize = item.focusFrame?.size ?? 100;
		const cornerSize = item.focusFrame?.cornerSize ?? 20;
		const cornerThickness = item.focusFrame?.cornerThickness ?? 3;

		// Logical size of the canvas
		const size = item.size * (focusSize / 100);

		// Canvas drawing resolution
		canvas.width = size;
		canvas.height = size;

		const rc: RoughCanvas = rough.canvas(canvas);

		const options: RoughOptions = {
			strokeWidth: cornerThickness,
			stroke: strokeColor,
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
</script>

<canvas
	use:roughFocus={item}
	class="item-focus-frame opacity-0 group-hover/desk-item:opacity-100"
	aria-hidden="true"
></canvas>
