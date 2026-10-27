<script lang="ts">
	import { resolve } from '$app/paths';
	import { page } from '$app/state';
	import type { IconAssetList, PageLink } from '$lib/types';
	import { fade, slide } from 'svelte/transition';
	import { quadInOut } from 'svelte/easing';
	import { getIconAsset, getPageRoute } from '$lib/utils';

	import favicon from '$lib/assets/favicon.svg';

	// Component props
	const {
		pageLinks = [],
		iconAssets
	}: { pageLinks?: PageLink[]; iconAssets: IconAssetList } = $props();

	// Icon Assets used here
	const navIcon = $derived(getIconAsset(iconAssets, 'nav'));

	// Home PageLink
	const homePageLink = $derived(pageLinks.find((item) => item.id === 'home'));

	let isMobileNavOpen = $state(false);
	let isDesktopNavOpen = $state(false);
	let isDesktopNavPinned = $state(false);
	let currentPath = $derived(page.url.pathname);
	let hoveredNavItem = $state<PageLink | null>(null);

	/** PageLinks with resolved current page state */
	const resolvedPageLinks = $derived(
		pageLinks.map((item) => {
			const path = resolve(getPageRoute(item.id));
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
{#snippet navIconSnippet(
	item: PageLink,
	isActive: boolean,
	alt: string = '',
	duration: number = 300
)}
	{@const iconImgProps = `
    absolute inset-0 size-full object-contain transition-opacity
  `}
	{@const activeIcon = item.icon?.active ?? item.icon?.default}
	{@const defaultIcon = item.icon?.default ?? item.icon?.active}

	<span class="relative block size-full select-none">
		{#if activeIcon}
			<img
				src={activeIcon}
				{alt}
				class={`${iconImgProps} ${isActive ? 'opacity-100' : 'opacity-0'}`}
				style={`transition-duration: ${duration}ms`}
			/>
		{/if}

		{#if defaultIcon}
			<img
				src={defaultIcon}
				{alt}
				class={`${iconImgProps} ${isActive ? 'opacity-0' : 'opacity-100'}`}
				style={`transition-duration: ${duration}ms`}
			/>
		{/if}
	</span>
{/snippet}

<!-- Desktop header -->
<header class="fixed top-6 z-999 hidden w-full md:block md:px-6">
	<div class="flex items-center">
		<!-- Home with favicon -->
		<div class="">
			{#if homePageLink}
				<a href={resolve(getPageRoute(homePageLink.id))} aria-label={homePageLink.title}>
					<img src={favicon} alt={homePageLink.title} class="size-10" />
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
				<div class="flex size-11 items-center justify-center">
					{#if navIcon?.icon.default || navIcon?.icon.active}
						<img
							src={navIcon.icon.default ?? navIcon.icon.active ?? ''}
							alt="Nav Icon"
							class="size-full"
						/>
					{/if}
				</div>
			</div>

			<!-- Expanded nav dock -->
			{#if isDesktopNavOpen || isDesktopNavPinned}
				<nav
					transition:expandNavDock
					class="absolute -top-2 -right-2 z-20 rounded-lg outline-3"
					onmouseleave={() => {
						if (!isDesktopNavPinned) {
							isDesktopNavOpen = false;
						}
					}}
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
										transition:fade={{ duration: 125, delay: 125 }}
										class="absolute font-balsamiq text-2xl font-semibold select-none"
									>
										{hoveredNavItem?.title ??
											(isDesktopNavPinned ? 'Navigate!!' : 'Navigate?')}
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
								class="flex size-11 cursor-pointer items-center justify-center"
							>
								{#if isDesktopNavPinned ? (navIcon?.icon.active ?? navIcon?.icon.default) : (navIcon?.icon.default ?? navIcon?.icon.active)}
									<img
										src={isDesktopNavPinned
											? (navIcon?.icon.active ?? navIcon?.icon.default ?? '')
											: (navIcon?.icon.default ?? navIcon?.icon.active ?? '')}
										alt="Nav Icon"
										class="size-9 animate-[spin_2.5s_linear_infinite]"
									/>
								{/if}
							</button>
						</div>

						<!-- PageLinks nav list -->
						<ul class="flex w-max gap-3 pr-1">
							{#each pageLinks as item (item.id)}
								{let isNavItemHovered = $derived(hoveredNavItem?.id === item.id)}

								<li>
									<a
										href={resolve(getPageRoute(item.id))}
										class="flex size-9 items-center justify-center"
										onmouseenter={() => (hoveredNavItem = item)}
										onmouseleave={() => (hoveredNavItem = null)}
									>
										{@render navIconSnippet(item, isNavItemHovered, item.title, 250)}
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
				class="z-10 w-full rounded-br-lg bg-paper py-2 outline-3 outline-dark-2"
				transition:slide={{ duration: 250 }}
			>
				<ul class="flex justify-evenly">
					{#each resolvedPageLinks as item (item.id)}
						<li>
							<a
								class="flex size-9 items-center justify-center active:scale-90"
								href={item.path}
								aria-label={item.title}
							>
								{@render navIconSnippet(item, item.isCurrentPage, item.title)}
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
				class="z-0 cursor-pointer rounded-b-md bg-paper px-1 py-1.5 outline-3 outline-dark-2"
				onclick={() => (isMobileNavOpen = !isMobileNavOpen)}
			>
				<div
					class={`flex size-9 items-center justify-center transition-transform duration-250 ${
						isMobileNavOpen ? 'rotate-45' : 'rotate-0'
					}`}
				>
					{#if navIcon?.icon.default || navIcon?.icon.active}
						<img
							src={navIcon.icon.default ?? navIcon.icon.active ?? ''}
							alt="Nav Menu"
							class="size-full"
						/>
					{/if}
				</div>
			</button>
		</div>
	</div>
</header>
