<script lang="ts">
	import rough from 'roughjs';
	import type { Options as RoughOptions } from 'roughjs/bin/core';
	import RoughFrame from '../RoughFrame.svelte';

	// Component props
	const { centreName = 'Header' }: { centreName?: string } = $props();

	const strokeColor = '#1e1e1e';
	const strokeWidth = 2;
	const roughness = 0.85;
	const paperColor = '#fdfbf6';
	const roughRefreshMs = 300;
	const safeOffset = strokeWidth + 2;
	const roughOptions: RoughOptions = {
		strokeWidth,
		stroke: strokeColor,
		roughness,
		fill: paperColor,
		fillStyle: 'solid'
	};

	let isTitleHovered = $state(false);

	function setupCanvas(canvas: HTMLCanvasElement) {
		const rect = canvas.getBoundingClientRect();
		const dpr = window.devicePixelRatio || 1;

		canvas.width = Math.max(1, Math.round(rect.width * dpr));
		canvas.height = Math.max(1, Math.round(rect.height * dpr));

		const context = canvas.getContext('2d');
		context?.setTransform(dpr, 0, 0, dpr, 0, 0);

		return {
			width: rect.width,
			height: rect.height,
			rc: rough.canvas(canvas)
		};
	}

	function createRoughAction(
		drawShape: (canvas: ReturnType<typeof setupCanvas>, active: boolean) => void
	) {
		return (canvas: HTMLCanvasElement, active = false) => {
			let intervalId: ReturnType<typeof setInterval> | null = null;

			const draw = () => drawShape(setupCanvas(canvas), active);

			const syncRefresh = () => {
				if (intervalId) clearInterval(intervalId);
				intervalId = active ? setInterval(draw, roughRefreshMs) : null;
			};

			const resizeObserver = new ResizeObserver(draw);

			resizeObserver.observe(canvas);
			draw();
			syncRefresh();

			return {
				update(nextActive = false) {
					active = nextActive;
					draw();
					syncRefresh();
				},
				destroy() {
					if (intervalId) clearInterval(intervalId);
					resizeObserver.disconnect();
				}
			};
		};
	}

	const roughTitleOutline = createRoughAction(({ width, height, rc }) => {
		const centerY = height / 2;
		const pointDepth = Math.min(18, width * 0.12);

		rc.polygon(
			[
				[safeOffset + pointDepth, safeOffset],
				[width - safeOffset - pointDepth, safeOffset],
				[width - safeOffset, centerY],
				[width - safeOffset - pointDepth, height - safeOffset],
				[safeOffset + pointDepth, height - safeOffset],
				[safeOffset, centerY]
			],
			roughOptions
		);
	});
</script>

<header class="sticky top-4 z-999 px-4">
	<div class="relative flex items-center justify-center">
		<!-- Hamburger nav menu -->
		<div class="absolute left-0">
			<RoughFrame options={roughOptions} size={130} changeOnHover refreshRate={roughRefreshMs}>
				<button
					type="button"
					aria-label="Navigation Menu"
					class="
  				  relative z-10 flex cursor-pointer items-center justify-center p-1 text-fg-dark
  				  transition-transform duration-150
  				"
				>
					<svg
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						stroke-width="3.5"
						stroke-linecap="round"
						class="h-4 w-4"
					>
						<path d="M4 6h16" />
						<path d="M4 12h16" />
						<path d="M4 18h16" />
					</svg>
				</button>
			</RoughFrame>
		</div>

		<!-- Centre page label -->
		<div
			class="relative inline-flex cursor-default px-5 py-1 text-center text-fg-dark select-none"
			role="presentation"
			onmouseenter={() => (isTitleHovered = true)}
			onmouseleave={() => (isTitleHovered = false)}
		>
			<canvas
				use:roughTitleOutline={isTitleHovered}
				class="pointer-events-none absolute inset-0 h-full w-full"
				aria-hidden="true"
			></canvas>

			<p class="relative font-semibold">{centreName}</p>
		</div>
	</div>
</header>
