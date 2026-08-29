<script lang="ts">
	import rough from 'roughjs';
	import type { Options as RoughOptions } from 'roughjs/bin/core';

	const centreName = 'Header';

	const strokeColor = '#1e1e1e';
	const strokeWidth = 2;
	const roughness = 0.85;
	const paperColor = '#fdfbf6';
	const menuCanvasOffset = 6;
	const roughRefreshMs = 300;
	const safeOffset = strokeWidth + 2;
	const roughOptions: RoughOptions = {
		strokeWidth,
		stroke: strokeColor,
		roughness,
		fill: paperColor,
		fillStyle: 'solid'
	};

	let isMenuHovered = $state(false);
	let isTitleHovered = $state(false);

	function setupCanvas(canvas: HTMLCanvasElement) {
		const rect = canvas.getBoundingClientRect();
		const dpr = window.devicePixelRatio || 1;

		canvas.width = Math.max(1, Math.round(rect.width * dpr));
		canvas.height = Math.max(1, Math.round(rect.height * dpr));
		canvas.style.width = `${rect.width}px`;
		canvas.style.height = `${rect.height}px`;

		const context = canvas.getContext('2d');
		context?.setTransform(dpr, 0, 0, dpr, 0, 0);

		return {
			width: rect.width,
			height: rect.height,
			rc: rough.canvas(canvas)
		};
	}

	function createRoughAction(drawShape: (canvas: ReturnType<typeof setupCanvas>) => void) {
		return (canvas: HTMLCanvasElement, active = false) => {
			let intervalId: ReturnType<typeof setInterval> | null = null;

			const draw = () => drawShape(setupCanvas(canvas));

			const syncRefresh = () => {
				if (intervalId) clearInterval(intervalId);
				intervalId = active ? setInterval(draw, roughRefreshMs) : null;
			};

			draw();
			syncRefresh();
			window.addEventListener('resize', draw);

			return {
				update(nextActive = false) {
					active = nextActive;
					draw();
					syncRefresh();
				},
				destroy() {
					if (intervalId) clearInterval(intervalId);
					window.removeEventListener('resize', draw);
				}
			};
		};
	}

	const roughButtonOutline = createRoughAction(({ width, height, rc }) => {
		rc.rectangle(
			safeOffset,
			safeOffset,
			width - safeOffset * 2,
			height - safeOffset * 2,
			roughOptions
		);
	});

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
		<div class="absolute left-0">
			<div
				class="relative inline-flex"
				role="presentation"
				style={`--menu-canvas-offset: ${menuCanvasOffset}px;`}
				onmouseenter={() => (isMenuHovered = true)}
				onmouseleave={() => (isMenuHovered = false)}
			>
				<canvas
					use:roughButtonOutline={isMenuHovered}
					class="pointer-events-none absolute top-1/2 left-1/2"
					style="
						width: calc(100% + var(--menu-canvas-offset) * 2);
						height: calc(100% + var(--menu-canvas-offset) * 2);
						transform: translate(-50%, -50%);
					"
					aria-hidden="true"
				></canvas>

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
			</div>
		</div>

		<div
			class="relative inline-flex cursor-default px-5 py-1 text-center text-fg-dark"
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
