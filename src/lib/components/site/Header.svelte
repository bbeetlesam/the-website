<script lang="ts">
	import rough from 'roughjs';
	import type { Options as RoughOptions } from 'roughjs/bin/core';

	import { resolve } from '$app/paths';
	import { page } from '$app/state';
	import type { SVGAttributes } from 'svelte/elements';
	import { slide } from 'svelte/transition';

	import { NAV_ITEMS } from '$lib/data';
	import tokens from '$lib/styles/tokens';
	import type { NavItem } from '$lib/types';

	import RoughFrame from '../RoughFrame.svelte';

	// Component props
	const { centreName = 'Header' }: { centreName?: string } = $props();

	const strokeColor = tokens.color.roughDark;
	const strokeWidth = 2;
	const roughness = 0.85;
	const paperColor = tokens.color.paper;
	const paperColorHover = '#f5f3ef';
	const roughRefreshMs = 300;
	const safeOffset = strokeWidth + 2;
	const roughOptions: RoughOptions = {
		strokeWidth,
		stroke: strokeColor,
		roughness,
		fill: paperColor,
		fillStyle: 'solid'
	};

	/** SVG icon props (used in the navigation menu button) */
	const iconSvgProps: SVGAttributes<SVGSVGElement> = {
		viewBox: '0 0 24 24',
		fill: 'none',
		stroke: 'currentColor',
		'stroke-width': '3.5',
		'stroke-linecap': 'round'
	};

	/** Derived nav items with path and current page state */
	const navItems = $derived(
		Object.values(NAV_ITEMS).map((item) => {
			const path = resolve(item.route);
			return {
				...item,
				path,
				isCurrentPage: currentPath === path
			};
		})
	);

	let isMenuOpened = $state(false);
	let isTitleHovered = $state(false);
	let hoveredNavItem = $state<string | null>(null);
	let currentPath = $derived(page.url.pathname);

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

<!-- Nav icon snippet used in the header's nav dock -->
{#snippet navIcon(item: NavItem, isCurrentPage: boolean, alt: string = '')}
	{@const iconImgProps = `
    absolute inset-0 h-full w-full object-contain transition-opacity duration-300
  `}

	<span class="relative block h-6 w-6 select-none">
		<img
			src={item.icon?.black}
			{alt}
			class={`${iconImgProps} ${isCurrentPage ? 'opacity-100' : 'opacity-0'}`}
		/>

		<img
			src={item.icon?.white}
			{alt}
			class={`${iconImgProps} ${isCurrentPage ? 'opacity-0' : 'opacity-100'}`}
		/>
	</span>
{/snippet}

<!-- Desktop header -->
<header class="sticky top-4 z-999 hidden sm:px-4 md:block">
	<div class="relative flex items-center justify-center">
		<!-- Hamburger nav menu -->
		<div class="absolute left-0">
			<RoughFrame options={roughOptions} scale={130} changeOnHover refreshRate={roughRefreshMs}>
				<button
					type="button"
					aria-label={isMenuOpened ? 'Close navigation menu' : 'Open navigation menu'}
					aria-expanded={isMenuOpened}
					onclick={() => (isMenuOpened = !isMenuOpened)}
					class="
  				  relative z-10 flex cursor-pointer items-center justify-center p-1 text-fg-dark
  				  transition-transform duration-150
  				"
				>
					<span class="relative block h-4 w-4">
						<!-- Hamburger icon -->
						<svg
							{...iconSvgProps}
							class={`absolute inset-0 h-4 w-4 transition-all duration-250 ${
								isMenuOpened ? 'rotate-90 opacity-0' : 'rotate-0 opacity-100'
							}`}
							aria-hidden="true"
						>
							<path d="M4 6h16" />
							<path d="M4 12h16" />
							<path d="M4 18h16" />
						</svg>

						<!-- Close/X icon -->
						<svg
							{...iconSvgProps}
							class={`absolute inset-0 h-4 w-4 transition-all duration-250 ${
								isMenuOpened ? 'rotate-0 opacity-100' : '-rotate-90 opacity-0'
							}`}
							aria-hidden="true"
						>
							<path d="M5 5l14 14" />
							<path d="M19 5L5 19" />
						</svg>
					</span>
				</button>
			</RoughFrame>

			<!-- Nav dock -->
			{#if isMenuOpened}
				<nav transition:slide={{ duration: 200 }} class="absolute top-full left-0 outline-2">
					<RoughFrame scale={{ x: 107, y: 103 }} options={roughOptions}>
						<ul class="w-max">
							{#each navItems as item (item.route)}
								<li
									onmouseenter={() => (hoveredNavItem = item.route)}
									onmouseleave={() => (hoveredNavItem = null)}
								>
									<RoughFrame
										class="w-full"
										scale={{ x: 103, y: 107 }}
										options={{
											...roughOptions,
											stroke: 'transparent',
											fill: hoveredNavItem === item.route ? paperColorHover : 'transparent'
										}}
									>
										<a
											href={item.path}
											class="
                        flex items-center gap-2 py-2.5 pr-6 pl-3
                        text-sm font-semibold
                      "
										>
											{@render navIcon(item, item.isCurrentPage)}
											<span>{item.title}</span>
										</a>
									</RoughFrame>
								</li>
							{/each}
						</ul>
					</RoughFrame>
				</nav>
			{/if}
		</div>

		<!-- Centre page label -->
		<div
			class="relative w-fit px-5 py-1 text-center text-fg-dark select-none"
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

<!-- Mobile header -->
<header class="fixed right-0 bottom-0 left-0 z-999 px-8 sm:px-16 md:hidden">
	<nav class="rounded-t-lg bg-paper py-2 outline-3 outline-fg-dark">
		<ul class="flex justify-evenly gap-0">
			{#each navItems as item (item.route)}
				<li>
					<a href={item.path} aria-label={item.title}>
						{@render navIcon(item, item.isCurrentPage, item.title)}
					</a>
				</li>
			{/each}
		</ul>
	</nav>
</header>
