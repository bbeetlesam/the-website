<script lang="ts">
	import { onMount } from 'svelte';
	import type { PageProps } from './$types';
	import type { Options as RoughOptions } from 'roughjs/bin/core';

	import DeskArea from '$lib/components/desk/DeskArea.svelte';
	import RoughFrame from '$lib/components/RoughFrame.svelte';

	let { data }: PageProps = $props();

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

	onMount(() => {
		const html = document.documentElement;
		const body = document.body;

		const update = () => {
			if (!scrollSection || !viewport || !track) return;

			horizontalTravel = Math.max(track.scrollWidth - viewport.clientWidth, 0);

			const sectionTop = scrollSection.getBoundingClientRect().top + window.scrollY;
			const currentScroll = window.scrollY - sectionTop;
			const progress =
				horizontalTravel > 0
					? Math.min(Math.max(currentScroll / horizontalTravel, 0), 1)
					: 0;

			translateX = progress * horizontalTravel;
		};

		update();

		const resizeObserver = new ResizeObserver(([entry]) => {
			if (!entry) return;

			deskContainerHeight = entry.contentRect.height;
			update();
		});

		if (deskContainer) {
			resizeObserver.observe(deskContainer);
		}

		// Disable overscroll (the bouncing feedback) for the Games page
		html.classList.add('overscroll-none');
		body.classList.add('overscroll-none');

		window.addEventListener('scroll', update, { passive: true });
		window.addEventListener('resize', update);

		return () => {
			resizeObserver.disconnect();

			html.classList.remove('overscroll-none');
			body.classList.remove('overscroll-none');

			window.removeEventListener('scroll', update);
			window.removeEventListener('resize', update);
		};
	});
</script>

<div
	bind:this={scrollSection}
	class="relative"
	style={`height: calc(100dvh + ${horizontalTravel}px)`}
>
	<div bind:this={viewport} class="sticky top-0 h-dvh w-full overflow-hidden">
		<div
			bind:this={track}
			class="absolute top-0 left-0 flex h-full w-max items-center"
			style={`transform: translateX(-${translateX}px)`}
		>
			<!-- Entrance -->
			<section class="flex w-screen shrink-0 flex-col gap-10 p-4 md:p-6 xl:p-8">
				<div class="flex xl:gap-40">
					<!-- Game definition -->
					<div class="flex flex-col items-center gap-2 md:items-start">
						<p
							class="
								text-center font-winkysans text-base font-bold
								md:text-start md:text-xl xl:text-2xl
							"
						>
							"A <span class="font-winkysans" title="/geɪm/">game</span> is a form of art
							in which participants, termed <span class="font-winkysans">players</span>,
							make decisions in order to manage resources through game tokens in the
							pursuit of a goal."
						</p>
						<p class="text-center font-winkysans text-sm md:text-start md:text-base">
							— Costikyan, Greg (1994). <span
								><a href="http://www.costik.com/nowords2002.pdf" target="_blank"
									>"I Have No Words & I Must Design."</a
								></span
							>
						</p>
					</div>

					<!-- WIP -->
					<div class="hidden outline-2 lg:block">Image will be here</div>
				</div>

				<!-- Last bit of the entrance -->
				<div
					class="
						flex flex-col justify-center gap-3 font-winkysans
						md:flex-row md:justify-evenly
					"
				>
					<!-- WIP -->
					<div>Big image or possibly bunch of images will be here</div>

					<div class="flex items-end gap-1 md:flex-col">
						<p class="text-start text-sm md:text-end md:text-base lg:text-xl">
							See the <br class="block md:hidden" />Gallery!
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
			<div class="h-full w-max px-2 py-6">
				{#if desk}
					<section
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
					</section>
				{:else}
					<p>Sorry, no desk available.</p>
				{/if}
			</div>

			<!-- Miscellaneous info -->
			<section class="flex w-screen shrink-0 flex-col gap-10 p-6">
				<p class="text-xl">I also published my games in these platforms!</p>
			</section>
		</div>
	</div>
</div>
