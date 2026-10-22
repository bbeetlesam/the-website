<script lang="ts">
	import { onMount, tick } from 'svelte';
	import type { PageProps } from './$types';
	import type { Options as RoughOptions } from 'roughjs/bin/core';

	import { RoughFrame, RoughShape, type Shape } from '$lib/components/ui';
	import { DeskArea } from '$lib/components/desk';
	import { CursorTooltip } from '$lib/components/actions';

	import { getIconAsset } from '$lib/utils';

	let { data }: PageProps = $props();

	/** The console (PlayStation) icons for the Entrance section. */
	const psIcons: { type: Shape; color: string }[] = [
		{ type: 'circle', color: 'red' },
		{ type: 'cross', color: 'blue' },
		{ type: 'square', color: 'purple' },
		{ type: 'triangle', color: 'cyan' }
	];

	/** The minigame icon used in the Entrance section. */
	const minigameIcon = $derived(getIconAsset(data.iconAssets, 'minigame')?.icon);

	let gameDesks = $derived(data.gameDesks);
	let desk = $derived(gameDesks[0]); // currently hardcoded, will be changed later

	const featuredGameList = $derived(data.featuredGameLinks);
	const cardHeight = 65;
	// const cardScrollDistance = 1;

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
	let mobileGallery = $state<HTMLElement>();
	let mobileGalleryStage = $state<HTMLElement>();
	let mobileCardSlot = $state<HTMLElement>();
	let mobileScrollStep = $state(0);
	let mobileProgressStart = 0;
	let mobilePresentationTop = $state(0);
	let horizontalTravel = $state(0);
	let translateX = $state(0);
	let featuredGameIndex = $state(0);

	/** Whether the user is on a desktop (large screen) or mobile (small screen) */
	let isDesktop = $state(false); // uses `md` value

	/** Keep entered cards stationary; only the next card travels up from below. */
	function getCardOffset(index: number): number {
		return Math.max(index - featuredGameIndex, 0) * mobileScrollStep;
	}

	onMount(() => {
		const html = document.documentElement;
		const body = document.body;

		const md = getComputedStyle(html).getPropertyValue('--breakpoint-md').trim();
		const mediaQuery = window.matchMedia(`(min-width: ${md})`);

		const measureMobileGallery = () => {
			if (!mobileGallery || !mobileGalleryStage || !mobileCardSlot) return;

			const galleryTop = mobileGallery.getBoundingClientRect().top + window.scrollY;
			mobileProgressStart = galleryTop;
			mobileScrollStep = mobileGalleryStage.getBoundingClientRect().height;
			mobilePresentationTop =
				mobileCardSlot.getBoundingClientRect().top -
				mobileGalleryStage.getBoundingClientRect().top;
		};

		const updateScrollPositions = () => {
			if (isDesktop && scrollSection && viewport && track) {
				horizontalTravel = Math.max(track.scrollWidth - viewport.clientWidth, 0);
				const sectionTop = scrollSection.getBoundingClientRect().top + window.scrollY;
				const currentScroll = window.scrollY - sectionTop;
				const progress =
					horizontalTravel > 0
						? Math.min(Math.max(currentScroll / horizontalTravel, 0), 1)
						: 0;
				translateX = progress * horizontalTravel;
				return;
			}

			if (featuredGameList.length === 0 || mobileScrollStep <= 0) {
				featuredGameIndex = 0;
				return;
			}

			const progress = (window.scrollY - mobileProgressStart) / mobileScrollStep;
			featuredGameIndex = Math.min(Math.max(progress, 0), featuredGameList.length - 1);
		};

		const resizeObserver = new ResizeObserver((entries) => {
			const deskEntry = entries.find((entry) => entry.target === deskContainer);
			if (deskEntry) deskContainerHeight = deskEntry.contentRect.height;
			measureMobileGallery();
			updateScrollPositions();
		});

		const updateMedia = async () => {
			isDesktop = mediaQuery.matches;

			await tick();
			resizeObserver.disconnect();
			if (deskContainer) resizeObserver.observe(deskContainer);
			if (mobileGallery) resizeObserver.observe(mobileGallery);
			if (mobileGalleryStage) resizeObserver.observe(mobileGalleryStage);
			if (mobileCardSlot) resizeObserver.observe(mobileCardSlot);

			measureMobileGallery();
			updateScrollPositions();
		};

		mediaQuery.addEventListener('change', updateMedia);
		updateMedia();

		// Disable overscroll (the bouncing feedback) for the Games page
		html.classList.add('overscroll-none');
		body.classList.add('overscroll-none');

		window.addEventListener('scroll', updateScrollPositions, { passive: true });
		const handleResize = () => {
			measureMobileGallery();
			updateScrollPositions();
		};
		window.addEventListener('resize', handleResize);

		return () => {
			resizeObserver.disconnect();

			mediaQuery.removeEventListener('change', updateMedia);

			html.classList.remove('overscroll-none');
			body.classList.remove('overscroll-none');

			window.removeEventListener('scroll', updateScrollPositions);
			window.removeEventListener('resize', handleResize);
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
			<!-- 1. Entrance -->
			<section
				class="
  				bg-amber-20 flex h-svh w-screen flex-col justify-center gap-2
          p-4 md:h-screen md:shrink-0 md:gap-10 md:p-6 xl:p-8
  			"
			>
				<!-- Game definition -->
				<div class="flex flex-1 items-center justify-between">
					<div class="flex flex-1 flex-col items-start gap-0 md:gap-2">
						{#if isDesktop}
							<p class="text-start font-bricolage text-xl font-bold xl:text-2xl">
								"A <span
									class="cursor-default font-balsamiq text-blue"
									use:CursorTooltip={{ text: 'Pronounced: /geɪm/' }}
								>
									game</span
								>
								is a form of
								<span
									class="cursor-default font-balsamiq text-cyan"
									use:CursorTooltip={{ text: 'Part of our souls!' }}>art</span
								>
								in which participants, termed
								<span
									class="cursor-default font-balsamiq text-purple"
									use:CursorTooltip={{ text: 'Experienced, are you?' }}>players</span
								>, make decisions in order to manage resources through game tokens in the
								pursuit of a
								<span
									class="cursor-default font-balsamiq text-red"
									use:CursorTooltip={{ text: 'What ya wanna achieve?' }}>goal</span
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
								"A form of <span class="cursor-default font-balsamiq text-blue">art</span>
								for you,
								<span class="cursor-default font-balsamiq text-purple">players</span>!"
							</p>
							<p class="text-start text-sm text-dark-medium">— Me, probably (2026).</p>
						{/if}
					</div>

					<!-- Open minigame (WIP, there's still no game even the pic itself bru) -->
					<div class="hidden pr-4 pl-4 sm:flex lg:pr-10 lg:pl-26">
						<button
							type="button"
							class="-rotate-10 cursor-pointer transition-all duration-200 hover:-rotate-15"
						>
							<img src={minigameIcon?.default} alt="Open minigame" class="size-30" />
						</button>
					</div>
				</div>

				<!-- Last bit of the entrance -->
				<div class="md:items-en flex flex-row items-center justify-between gap-3">
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
								>{isDesktop ? 'Gallery' : 'Cards'}!</span
							>
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

			<!-- 2. The Game gallery -->
			{#if isDesktop}
				<section class="w-max px-2 py-6 md:h-full">
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
				</section>
			{:else}
				<div
					bind:this={mobileGallery}
					class="relative w-[min(100%,30rem)] px-6"
					style={`height: ${Math.max(featuredGameList.length, 1) * 100}lvh;`}
				>
					<section bind:this={mobileGalleryStage} class="sticky top-0 h-lvh">
						<!-- <h2
							class="
  							absolute left-1/2 z-50 w-max -translate-x-1/2 rounded-xl border-3 bg-cyan
  							px-2 py-1 font-balsamiq text-2xl font-bold
							"
							style="bottom: calc(50% + {cardHeight}% / 2 + {headingCardGap}rem);"
						>
							Featured Games
						</h2> -->
						{#if featuredGameList.length > 0}
							<div
								bind:this={mobileCardSlot}
								class="absolute top-1/2 left-0 w-full -translate-y-1/2"
								style="height: {cardHeight}%;"
							></div>

							<div class="absolute inset-0 overflow-hidden">
								{#each featuredGameList as featuredGame, index (featuredGame.id)}
									<article
										class="
  										absolute left-0 flex w-full flex-col overflow-hidden
  										rounded-[1.25rem] border-3 border-rough-dark bg-fg-dark p-1
										"
										style={`
  										top: ${mobilePresentationTop}px;
  										height: ${cardHeight}%;
  										transform: translateY(${getCardOffset(index)}px);
  										z-index: ${index + 1};
										`}
									>
										<div class="h-[50%] w-full">
											<img
												src={featuredGame.icon?.default}
												alt={featuredGame.title}
												class="size-full rounded-[0.9rem] rounded-b-none bg-paper object-cover"
											/>
										</div>

										<div
											class="
  											flex flex-1 flex-col justify-between rounded-[0.9rem]
  											rounded-t-none bg-fg-dark px-3 py-3
											"
										>
											<div class="space-y-1">
												<h3
													class="
													  font-bricolage text-4xl leading-tight font-bold
														whitespace-pre-line text-paper sm:text-3xl
													"
												>
													{featuredGame.title}
												</h3>
												<p class="font-balsami text-lg leading-tight text-blue">
													{featuredGame.desc}
												</p>
											</div>

											<div class="flex items-center justify-between">
												<p
													class="rounded-md bg-blue px-2 py-0.5 font-balsamiq text-base font-bold text-paper"
												>
													Genre
												</p>
												<a
													href={featuredGame.href}
													class="
													  rounded-md bg-cyan px-2 py-2 text-2xl outline-1
														outline-offset-2 outline-paper transition-colors
													  duration-100 hover:bg-cyan-500
													"
													rel="external noopener noreferrer"
													target="_blank"
													aria-label="Go to Game's page"
												>
													<svg
														xmlns="http://www.w3.org/2000/svg"
														viewBox="0 0 24 24"
														width="24"
														height="24"
													>
														<path
															fill="#fdfbf6"
															d="M6 3.5a1 1 0 0 1 1.5-.87l13 8a1.6 1.6 0 0 1 0 2.74l-13 8A1 1 0 0 1 6 20.5z"
														/>
													</svg>
												</a>
											</div>
										</div>
									</article>
								{/each}
							</div>
						{/if}
					</section>
				</div>
			{/if}

			<!-- 3. Miscellaneous info -->
			<section class="flex h-svh flex-col gap-10 p-6 md:h-auto md:w-screen md:shrink-0">
				<p class="text-xl">I also published my games in these platforms!</p>
			</section>
		</div>
	</div>
</div>
