<script lang="ts">
	import { onMount, tick } from 'svelte';
	import type { PageProps } from './$types';
	import type { Options as RoughOptions } from 'roughjs/bin/core';

	import DeskArea from '$lib/components/desk/DeskArea.svelte';
	import RoughFrame from '$lib/components/RoughFrame.svelte';
	import { RoughShape, type Shape } from '$lib/components/index';

	let { data }: PageProps = $props();

	/** The console (PlayStation) icons for the Entrance section. */
	const psIcons: { type: Shape; color: string }[] = [
		{ type: 'circle', color: 'red' },
		{ type: 'cross', color: 'blue' },
		{ type: 'square', color: 'purple' },
		{ type: 'triangle', color: 'cyan' }
	];

	let gameDesks = $derived(data.gameDesks);
	let desk = $derived(gameDesks[0]); // currently hardcoded, will be changed later

	// currently scales the desk to fill the available height,
	// allowing its width to expand proportionally
	// the mobile layout will use a different constraint later
	let deskContainer = $state<HTMLElement>();
	let deskContainerHeight = $state(0);

	let deskScale = $derived(
		deskContainerHeight > 0 ? deskContainerHeight / desk.size.height : 1
	);
	let deskWidth = $derived(desk.size.width * deskScale);

	// Default roughjs options for the Desk's RoughFrame
	const roughOptions: RoughOptions = {
		strokeWidth: 5,
		fillStyle: 'solid',
		roughness: 0.85,
		bowing: 0.8
	};

	// Horizontal scroll stuff (x-axis scroll to y-axis scroll translation)
	let scrollSection = $state<HTMLElement>();
	let viewport = $state<HTMLElement>();
	let track = $state<HTMLElement>();
	let horizontalTravel = $state(0);
	let translateX = $state(0);

	/** Whether the user is on a desktop (large screen) or mobile (small screen) */
	let isDesktop = $state(false);

	onMount(() => {
		const html = document.documentElement;
		const body = document.body;

		const md = getComputedStyle(html).getPropertyValue('--breakpoint-md').trim();
		const mediaQuery = window.matchMedia(`(min-width: ${md})`);

		const updateHorizontalScroll = () => {
			if (!isDesktop || !scrollSection || !viewport || !track) return;

			horizontalTravel = Math.max(track.scrollWidth - viewport.clientWidth, 0);

			const sectionTop = scrollSection.getBoundingClientRect().top + window.scrollY;
			const currentScroll = window.scrollY - sectionTop;
			const progress =
				horizontalTravel > 0
					? Math.min(Math.max(currentScroll / horizontalTravel, 0), 1)
					: 0;

			translateX = progress * horizontalTravel;
		};

		const resizeObserver = new ResizeObserver(([entry]) => {
			if (!entry) return;

			deskContainerHeight = entry.contentRect.height;
			updateHorizontalScroll();
		});

		const updateMedia = async () => {
			isDesktop = mediaQuery.matches;

			await tick();

			if (deskContainer) {
				resizeObserver.observe(deskContainer);
			}

			updateHorizontalScroll();
		};

		mediaQuery.addEventListener('change', updateMedia);
		updateMedia();

		// Disable overscroll (the bouncing feedback) for the Games page
		html.classList.add('overscroll-none');
		body.classList.add('overscroll-none');

		window.addEventListener('scroll', updateHorizontalScroll, { passive: true });
		window.addEventListener('resize', updateHorizontalScroll);

		return () => {
			resizeObserver.disconnect();

			mediaQuery.removeEventListener('change', updateMedia);

			html.classList.remove('overscroll-none');
			body.classList.remove('overscroll-none');

			window.removeEventListener('scroll', updateHorizontalScroll);
			window.removeEventListener('resize', updateHorizontalScroll);
		};
	});
</script>

<div
	bind:this={scrollSection}
	class="relative"
	style={isDesktop ? `height: calc(100dvh + ${horizontalTravel}px)` : ''}
>
	<div bind:this={viewport} class="w-full md:sticky md:top-0 md:h-dvh md:overflow-hidden">
		<div
			bind:this={track}
			class="
			  flex w-full flex-col items-center md:absolute md:top-0 md:left-0 md:h-full md:w-max
				md:flex-row
			"
			style={isDesktop ? `transform: translateX(-${translateX}px)` : ''}
		>
			<!-- Entrance -->
			<section
				class="
  				bg-amber-20 flex h-svh w-screen flex-col justify-center gap-2
          p-4 md:h-screen md:shrink-0 md:gap-10 md:p-6 xl:p-8
  			"
			>
				<!-- Game definition -->
				<div class="flex flex-1 items-center justify-between">
					<div class="flex flex-col items-start gap-0 md:gap-2">
						{#if isDesktop}
							<p class="text-start font-bricolage text-xl font-bold xl:text-2xl">
								"A <span class="cursor-default font-balsamiq text-blue" title="/geɪm/"
									>game</span
								>
								is a form of
								<span
									class="cursor-default font-balsamiq text-cyan"
									title="Part of the human soul">art</span
								>
								in which participants, termed
								<span class="cursor-default font-balsamiq text-purple" title="Are you..?"
									>players</span
								>, make decisions in order to manage resources through game tokens in the
								pursuit of a
								<span
									class="cursor-default font-balsamiq text-red"
									title="Whatever makes you happy!">goal</span
								>."
							</p>
							<p class="text-start text-sm text-dark-medium">
								— Costikyan, Greg (1994). <span
									><a href="http://www.costik.com/nowords2002.pdf" target="_blank"
										>"I Have No Words & I Must Design."</a
									></span
								>
							</p>
						{:else}
							<p class="text-start font-bricolage text-xl font-bold">
								"A form of <span
									class="cursor-default font-balsamiq text-blue"
									title="/geɪm/">art</span
								>
								for you,
								<span class="cursor-default font-balsamiq text-purple" title="You..?"
									>players</span
								>!"
							</p>
							<p class="text-start text-sm text-dark-medium">— Me, probably (2026).</p>
						{/if}
					</div>

					<!-- WIP -->
					<div class="hidden outline-2 sm:block">Image will be here</div>
				</div>

				<!-- Last bit of the entrance -->
				<div
					class="
						md:items-en flex flex-row items-center justify-between
						gap-3
					"
				>
					<!-- Console icons -->
					<div class="flex gap-1 md:gap-2">
						{#each psIcons as psIcon (psIcon.type)}
							<RoughShape
								type={psIcon.type}
								thickness={12}
								class={`size-7 md:size-8 lg:size-9 text-${psIcon.color}`}
							/>
						{/each}
					</div>

					<!-- See the gallery! -->
					<div class="md:flex-co flex items-end gap-2 md:items-start md:gap-5">
						<p class="text-end text-lg font-semibold md:text-xl lg:text-2xl">
							See the <br /><span class="cursor-default font-baskerville font-bold italic"
								>Gallery</span
							>!
						</p>
						<div class="hidden md:block" aria-hidden="true">
							<svg
								width="40"
								height="40"
								viewBox="0 0 40 40"
								fill="none"
								xmlns="http://www.w3.org/2000/svg"
							>
								<path
									d="M3 20H34M24 9L35 20L24 31"
									stroke="currentColor"
									stroke-width="3"
									stroke-linecap="square"
									stroke-linejoin="miter"
								/>
							</svg>
						</div>

						<div class="block md:hidden" aria-hidden="true">
							<svg
								width="40"
								height="40"
								viewBox="0 0 40 40"
								fill="none"
								xmlns="http://www.w3.org/2000/svg"
							>
								<path
									d="M20 3V34M9 24L20 35L31 24"
									stroke="currentColor"
									stroke-width="3"
									stroke-linecap="square"
									stroke-linejoin="miter"
								/>
							</svg>
						</div>
					</div>
				</div>
			</section>

			<!-- The Game gallery -->
			<section class="w-max px-2 py-6 md:h-full">
				{#if isDesktop}
					{#if desk}
						<div
							bind:this={deskContainer}
							class="h-full"
							style={`width: ${deskWidth}px;`}
						>
							<RoughFrame
								options={roughOptions}
								scale={101}
								changeOnHover
								class="h-full w-full"
							>
								<DeskArea
									{desk}
									{deskScale}
									className="absolute top-0 left-0 origin-top-left"
								/>
							</RoughFrame>
						</div>
					{:else}
						<p>Sorry, no desk available.</p>
					{/if}
				{:else}
					<div class="h-svh w-full">
						<p class="p-4 text-center">Need some finishing touches...</p>
					</div>
				{/if}
			</section>

			<!-- Miscellaneous info -->
			<section class="flex h-svh flex-col gap-10 p-6 md:h-auto md:w-screen md:shrink-0">
				<p class="text-xl">I also published my games in these platforms!</p>
			</section>
		</div>
	</div>
</div>
