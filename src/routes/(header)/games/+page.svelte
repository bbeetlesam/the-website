<script lang="ts">
	import { onMount, tick } from 'svelte';
	import { resolve } from '$app/paths';
	import type { PageProps } from './$types';
	import type { Options as RoughOptions } from 'roughjs/bin/core';

	import type { GamePlatform } from '$lib/types';
	import { Footer } from '$lib/components/site';
	import { RoughFrame, RoughShape, type Shape } from '$lib/components/ui';
	import { DeskArea } from '$lib/components/desk';
	import { CursorTooltip } from '$lib/components/actions';

	import { getDesktopState } from '$lib/state/desktop';
	import { getIconAsset } from '$lib/utils';

	import playIcon from '$lib/assets/platform-icons/play.svg';
	import webIcon from '$lib/assets/platform-icons/web.svg';
	import linuxIcon from '$lib/assets/platform-icons/linux.svg';
	import windowsIcon from '$lib/assets/platform-icons/windows.svg';
	import androidIcon from '$lib/assets/platform-icons/android.svg';
	import macIcon from '$lib/assets/platform-icons/apple.svg';

	let { data }: PageProps = $props();

	const desktopState = getDesktopState();
	let isDesktop = $derived(desktopState.isDesktop);

	const artPageLink = $derived(data.pageLinks.arts.route);

	/** The console (PlayStation) icons for the Entrance section. */
	const psIcons: { type: Shape; color: string }[] = [
		{ type: 'circle', color: 'red' },
		{ type: 'cross', color: 'blue' },
		{ type: 'square', color: 'purple' },
		{ type: 'triangle', color: 'cyan' }
	];

	const platformIcons: Record<GamePlatform, string> = {
		web: webIcon,
		linux: linuxIcon,
		windows: windowsIcon,
		mac: macIcon,
		android: androidIcon,
		ios: macIcon,
		other: playIcon
	};

	/** The minigame icon used in the Entrance section. */
	const minigameIcon = $derived(getIconAsset(data.iconAssets, 'minigame')?.icon);

	let gameDesks = $derived(data.gameDesks);
	let desk = $derived(gameDesks[0]); // currently hardcoded, will be changed later

	const featuredGameList = $derived(data.featuredGameLinks);
	const cardHeight = 65;
	// const cardScrollDistance = 1;

	const galleryShapeSizeRem = 2.75; // rem value
	const galleryShapeGapRem = 1.5; // rem value

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
	let entranceShapes = $state<HTMLElement>();
	let mobileScrollStep = $state(0);
	let mobileProgressStart = 0;
	let mobilePresentationTop = $state(0);
	let mobileShapeOverlay = $state({ visible: false, left: 0, top: 0, width: 0, size: 0 });
	let horizontalTravel = $state(0);
	let translateX = $state(0);
	let featuredGameIndex = $state(0);

	/** Re-measure and observe elements for the active responsive layout */
	let refreshResponsiveLayout: ((isDesktop: boolean) => void) | undefined;
	$effect(() => {
		refreshResponsiveLayout?.(isDesktop);
	});

	/** Keep entered cards stationary; only the next card travels up from below. */
	function getCardOffset(index: number): number {
		return Math.max(index - featuredGameIndex, 0) * mobileScrollStep;
	}

	onMount(() => {
		const html = document.documentElement;
		const body = document.body;

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
				mobileShapeOverlay.visible = false;
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

			if (
				featuredGameList.length === 0 ||
				mobileScrollStep <= 0 ||
				!entranceShapes ||
				!mobileCardSlot
			) {
				featuredGameIndex = 0;
				mobileShapeOverlay.visible = false;
				return;
			}

			const progress = (window.scrollY - mobileProgressStart) / mobileScrollStep;
			featuredGameIndex = Math.min(Math.max(progress, 0), featuredGameList.length - 1);

			const source = entranceShapes.getBoundingClientRect();
			const target = mobileCardSlot.getBoundingClientRect();
			const rootFontSize = Number.parseFloat(getComputedStyle(html).fontSize);
			const galleryShapeSize = galleryShapeSizeRem * rootFontSize;
			const galleryShapeGap = galleryShapeGapRem * rootFontSize;
			const startScroll = Math.max(0, mobileProgressStart - mobileScrollStep);
			const travel = Math.min(
				Math.max(
					(window.scrollY - startScroll) / (mobileProgressStart - startScroll || 1),
					0
				),
				1
			);
			const sourceSize =
				entranceShapes.querySelector('svg')?.getBoundingClientRect().width ?? 28;
			const targetTop =
				window.scrollY < mobileProgressStart
					? mobilePresentationTop - galleryShapeGap - galleryShapeSize
					: target.top - galleryShapeGap - galleryShapeSize;
			const sourceTop = source.top + window.scrollY - startScroll;
			const lerp = (from: number, to: number) => from + (to - from) * travel;

			mobileShapeOverlay = {
				visible: true,
				left: lerp(source.left, target.left),
				top: window.scrollY < startScroll ? source.top : lerp(sourceTop, targetTop),
				width: lerp(source.width, target.width),
				size: lerp(sourceSize, galleryShapeSize)
			};
		};

		const resizeObserver = new ResizeObserver((entries) => {
			const deskEntry = entries.find((entry) => entry.target === deskContainer);
			if (deskEntry) deskContainerHeight = deskEntry.contentRect.height;
			measureMobileGallery();
			updateScrollPositions();
		});

		const refreshLayout = async (desktop: boolean) => {
			await tick();
			resizeObserver.disconnect();
			if (desktop) {
				if (deskContainer) resizeObserver.observe(deskContainer);
			} else {
				if (mobileGallery) resizeObserver.observe(mobileGallery);
				if (mobileGalleryStage) resizeObserver.observe(mobileGalleryStage);
				if (mobileCardSlot) resizeObserver.observe(mobileCardSlot);
				if (entranceShapes) resizeObserver.observe(entranceShapes);
			}

			measureMobileGallery();
			updateScrollPositions();
		};

		refreshResponsiveLayout = refreshLayout;
		refreshLayout(isDesktop);

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

			refreshResponsiveLayout = undefined;

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
	<div
		bind:this={viewport}
		class="w-screen md:sticky md:top-0 md:h-dvh md:w-full md:overflow-hidden"
	>
		<div
			bind:this={track}
			class="
			  flex w-full flex-col items-center md:absolute md:top-0 md:left-0
			  md:h-full md:w-max md:flex-row
			"
			style={isDesktop ? `transform: translateX(-${translateX}px)` : ''}
		>
			<!-- 1. Entrance -->
			<section
				class="
					flex h-svh w-screen flex-col justify-center gap-2
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
							<p class="text-start text-sm text-dark-3">
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
							<p class="text-start text-sm text-dark-3">— Me, probably (2026).</p>
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
				<div class="flex flex-row items-center justify-between gap-3">
					<!-- Console icons -->
					<div
						bind:this={entranceShapes}
						class="flex gap-1 md:gap-2"
						style={!isDesktop && mobileShapeOverlay.visible ? 'opacity: 0' : ''}
					>
						{#each psIcons as psIcon (psIcon.type)}
							<RoughShape
								type={psIcon.type}
								thickness={12}
								class={`size-7 sm:size-8 lg:size-9 text-${psIcon.color}`}
							/>
						{/each}
					</div>

					<!-- See the gallery! -->
					<div class="flex items-end gap-2 md:items-start md:gap-5">
						<p class="text-end text-lg font-semibold md:text-xl lg:text-2xl">
							See the <br /><span class="cursor-default font-baskerville font-bold italic"
								>{isDesktop ? 'Mural' : 'Cards'}!</span
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
  										rounded-[1.25rem] border-3 border-dark-1 bg-dark-2 p-1
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
												src={featuredGame.screenshot ? featuredGame.screenshot : playIcon}
												alt={`${featuredGame.title} picture`}
												class="size-full rounded-[0.9rem] rounded-b-none bg-dark-1 object-cover text-paper"
											/>
										</div>

										<div
											class="
  											flex flex-1 flex-col justify-between rounded-[0.9rem]
  											rounded-t-none bg-dark-2 px-3 py-3
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
												<p class="font-balsamiq text-lg leading-tight text-blue">
													{featuredGame.desc}
												</p>
											</div>

											<div class="flex items-end justify-between">
												<div class="flex flex-col gap-2">
													<div class="flex flex-row gap-1">
														{#each featuredGame.platforms as platform (platform)}
															<img
																src={platformIcons[platform]}
																alt={platform}
																class="size-6"
															/>
														{/each}
													</div>

													<p
														class="
  														w-max rounded-md bg-blue px-2 py-0.5 font-balsamiq
                              text-base font-bold text-paper
														"
													>
														{featuredGame.genre ? featuredGame.genre : 'Unknown'}
													</p>
												</div>

												<a
													href={featuredGame.href}
													class="
													  rounded-md bg-cyan p-2 outline-1 outline-offset-2
														outline-paper transition-all duration-100 hover:bg-cyan-500
														active:scale-90
													"
													rel="external noopener noreferrer"
													target="_blank"
													aria-label="Go to Game's page"
												>
													<img src={playIcon} alt="Play" class="size-8" />
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

			<!-- 3. Miscellaneous info and footer -->
			<section class="relative w-screen px-4 pt-4 pb-7 md:h-auto md:shrink-0 md:pb-0">
				{#if isDesktop}
					<p>Desktop version is undergoing</p>
				{:else}
					<div>
						<RoughShape
							type="triangle"
							thickness={8}
							class="absolute -top-20 left-0 size-12 rotate-45 text-cyan"
						/>
						<RoughShape
							type="circle"
							thickness={8}
							class="absolute -top-25 right-2 size-14 text-red"
						/>
						<RoughShape
							type="rectangle"
							thickness={10}
							class="absolute -top-28 left-[30%] size-10 -rotate-20 text-purple"
						/>
						<RoughShape
							type="cross"
							thickness={10}
							class="absolute -top-15 right-[35%] size-8 rotate-10 text-blue"
						/>
					</div>

					<div class="flex h-full flex-col items-center justify-between gap-18">
						<div class="flex flex-col items-center gap-4">
							<p class="text-center text-xl">
								Pause, there are many <b class="font-bricolage text-3xl text-cyan"
									>MORE!</b
								>
							</p>

							<!-- The link list to discover more of my games -->
							<!-- WIP -->
							<div class="w-max">
								<p
									class="cursor-pointer rounded-xl bg-red px-3 py-2 text-lg text-paper hover:bg-red-600 active:scale-95"
								>
									itch.io — WIP
								</p>
							</div>
						</div>

						<!-- Designed by -->
						<p class="font-bricolage text-xs font-medium">
							Designed by the people from <a
								href={resolve(artPageLink)}
								class="font-bold text-blue underline">Art Department</a
							>.
						</p>
					</div>
				{/if}
			</section>

			<!-- Temporary secretary, I mean Footer -->
			<Footer />
		</div>
	</div>

	<!-- Mobile top card rough shapes -->
	{#if !isDesktop && mobileShapeOverlay.visible}
		<div
			aria-hidden="true"
			class="pointer-events-none fixed z-50 flex items-center justify-between"
			style={`left: ${mobileShapeOverlay.left}px; top: ${mobileShapeOverlay.top}px; width: ${mobileShapeOverlay.width}px; height: ${mobileShapeOverlay.size}px;`}
		>
			{#each psIcons as psIcon (psIcon.type)}
				<div
					class="shrink-0"
					style={`width: ${mobileShapeOverlay.size}px; height: ${mobileShapeOverlay.size}px;`}
				>
					<RoughShape
						type={psIcon.type}
						thickness={12}
						class={`size-full text-${psIcon.color}`}
					/>
				</div>
			{/each}
		</div>
	{/if}
</div>
