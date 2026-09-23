<script lang="ts">
	import { resolve } from '$app/paths';
	import { page } from '$app/state';
	import type { PageLink } from '$lib/types';
	import { fade, slide } from 'svelte/transition';
	import { quadInOut } from 'svelte/easing';

	import favicon from '$lib/assets/favicon.svg';
	import navSvgIcon from '$lib/assets/nav.svg';

	// Component props
	const { pageLinks = [] }: { pageLinks?: PageLink[] } = $props();

	// Home PageLink
	const homePageLink: PageLink | undefined = $derived(
		pageLinks.find((pageLink) => pageLink.id === 'home')
	);

	let isMobileNavOpen = $state(false);
	let isDesktopNavOpen = $state(false);
	let isDesktopNavPinned = $state(false);
	let currentPath = $derived(page.url.pathname);
	let hoveredNavItem = $state<PageLink | null>(null);

	/** PageLinks with resolved current page state */
	const resolvedPageLinks = $derived(
		pageLinks.map((item) => {
			const path = resolve(item.route);
			return { ...item, path, isCurrentPage: currentPath === path };
		})
	);

	/** The nav button's icon element in the nav dock */
	let navDockIcon = $state<HTMLButtonElement | null>(null);
	function expandNavDock(node: HTMLElement) {
		if (!navDockIcon) {
			throw new Error("expandDock: 'dockIcon' element is not available");
		}

		const dockRect = node.getBoundingClientRect();
		const iconRect = navDockIcon.getBoundingClientRect();

		const left = iconRect.left - dockRect.left;
		const top = iconRect.top - dockRect.top;
		const right = dockRect.width - left - iconRect.width;
		const bottom = dockRect.height - top - iconRect.height;

		return {
			duration: 175,
			easing: quadInOut,

			css: (t: number) => `
				clip-path: inset(
					${top * (1 - t)}px
					${right * (1 - t)}px
					${bottom * (1 - t)}px
					${left * (1 - t)}px
				);
			`
		};
	}
</script>

<!-- Nav icon snippet used in the header's nav dock -->
{#snippet navIcon(
	item: PageLink,
	isActive: boolean,
	alt: string = '',
	duration: number = 300
)}
	{@const iconImgProps = `
    absolute inset-0 size-full object-contain transition-opacity
  `}

	<span class="relative block size-full select-none">
		<img
			src={item.icon?.active}
			{alt}
			class={`${iconImgProps} ${isActive ? 'opacity-100' : 'opacity-0'}`}
			style={`transition-duration: ${duration}ms`}
		/>

		<img
			src={item.icon?.default}
			{alt}
			class={`${iconImgProps} ${isActive ? 'opacity-0' : 'opacity-100'}`}
			style={`transition-duration: ${duration}ms`}
		/>
	</span>
{/snippet}

<!-- Desktop header -->
<header class="fixed top-6 z-999 hidden w-full md:block md:px-6">
	<div class="flex items-center">
		<!-- Home with favicon -->
		<div class="">
			{#if homePageLink}
				<a href={resolve(homePageLink.route)} aria-label={homePageLink.title}>
					<img src={favicon} alt={homePageLink.title} class="size-8" />
				</a>
			{/if}
		</div>

		<!-- Nav menu -->
		<div class="absolute right-6">
			<!-- Closed nav button -->
			<div
				class="z-10"
				onmouseenter={() => (isDesktopNavOpen = true)}
				role="navigation"
				aria-label="Navigation"
			>
				<div class="flex size-9 items-center justify-center">
					<img src={navSvgIcon} alt="Nav Icon" class="size-full" />
				</div>
			</div>

			<!-- Expanded nav dock -->
			{#if isDesktopNavOpen || isDesktopNavPinned}
				<nav
					transition:expandNavDock
					class="absolute -top-2 -right-2 z-20 rounded-lg outline-3"
					onmouseleave={() => (isDesktopNavOpen = false)}
				>
					<div
						class="flex w-max flex-col gap-2 bg-paper pt-2 pr-2 pb-3 pl-3"
						transition:fade={{ duration: 175 }}
					>
						<!-- Title and the nav icon toggler -->
						<div class="flex items-center justify-between">
							<div class="relative h-7">
								{#key hoveredNavItem?.id}
									<p
										transition:fade={{ duration: 150, delay: 125 }}
										class="absolute text-xl font-semibold select-none"
									>
										{hoveredNavItem?.title ??
											(isDesktopNavPinned ? 'Navigate!!' : 'Navigate!')}
									</p>
								{/key}
							</div>

							<!-- Nav icon toggler -->
							<button
								type="button"
								bind:this={navDockIcon}
								onclick={() => (isDesktopNavPinned = !isDesktopNavPinned)}
								aria-label={isDesktopNavPinned
									? 'Unpin navigation menu'
									: 'Pin navigation menu'}
								aria-pressed={isDesktopNavPinned}
								class="flex size-9 cursor-pointer items-center justify-center"
							>
								<img
									src={navSvgIcon}
									alt="Nav Icon"
									class="size-7 animate-[spin_2.5s_linear_infinite]"
								/>
							</button>
						</div>

						<!-- PageLinks nav list -->
						<ul class="debug-outlin flex w-max gap-3 pr-1">
							{#each pageLinks as item (item.route)}
								{let isNavItemHovered = $derived(hoveredNavItem?.id === item.id)}

								<li>
									<a
										href={resolve(item.route)}
										class="flex size-8 items-center justify-center"
										onmouseenter={() => (hoveredNavItem = item)}
										onmouseleave={() => (hoveredNavItem = null)}
									>
										{@render navIcon(item, isNavItemHovered, item.title, 250)}
									</a>
								</li>
							{/each}
						</ul>
					</div>
				</nav>
			{/if}
		</div>
	</div>
</header>

<!-- Mobile header -->
<header class="fixed top-0 right-0 left-0 z-999 px-6 sm:px-12 md:hidden">
	<div class="flex flex-col items-start">
		<!-- Nav dock -->
		{#if isMobileNavOpen}
			<nav
				class="z-10 w-full rounded-br-lg bg-paper py-2 outline-3 outline-fg-dark"
				transition:slide={{ duration: 250 }}
			>
				<ul class="flex justify-evenly">
					{#each resolvedPageLinks as item (item.route)}
						<li>
							<a
								class="flex size-7 items-center justify-center"
								href={item.path}
								aria-label={item.title}
							>
								{@render navIcon(item, item.isCurrentPage, item.title)}
							</a>
						</li>
					{/each}
				</ul>
			</nav>
		{/if}

		<div class="flex w-full gap-2">
			<button
				type="button"
				aria-label={isMobileNavOpen ? 'Close navigation menu' : 'Open navigation menu'}
				aria-expanded={isMobileNavOpen}
				class="z-0 cursor-pointer rounded-b-md bg-paper px-1 py-1.5 outline-3 outline-fg-dark"
				onclick={() => (isMobileNavOpen = !isMobileNavOpen)}
			>
				<div
					class={`flex size-7 items-center justify-center transition-transform duration-250 ${
						isMobileNavOpen ? 'rotate-45' : 'rotate-0'
					}`}
				>
					<img src={navSvgIcon} alt="Nav Menu" class="size-full" />
				</div>
			</button>
		</div>
	</div>
</header>
