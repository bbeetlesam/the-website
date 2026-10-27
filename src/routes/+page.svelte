<script lang="ts">
	import { onMount } from 'svelte';
	import { resolve } from '$app/paths';
	import type { PageProps } from './$types';

	import type { Desk } from '$lib/types';
	import { getIconAsset, getPageRoute, scaleToFit } from '$lib/utils';
	import { DeskArea } from '$lib/components/desk';
	import { Modal } from '$lib/components/ui';

	// Page props (retrieved from +layout.server.ts)
	let { data }: PageProps = $props();

	let deskArea: HTMLDivElement;

	let desk = $state<Desk | null>(null);
	let deskScale = $state(1);
	let deskStatus = $state<'pending' | 'error' | 'ready'>('pending');

	const helpIcon = $derived(getIconAsset(data.iconAssets, 'help')?.icon);

	let isInfoModalOpen = $state(false);
	let isInfoHovered = $state(false);
	const isHelpIconActive = $derived(isInfoHovered && !isInfoModalOpen);

	/**
	 * Selects the desk whose aspect ratio fills the largest portion of the available area
	 * when scaled to fit.
	 * This compares the actual fitted coverage rather than raw ratio differences, which
	 * can rank portrait and landscape layouts inconsistently. Jolly good!
	 */
	function findBestFittingDesk(width: number, height: number): Desk | undefined {
		const candidates = data.homeDesks.filter(
			(candidate) =>
				Number.isFinite(candidate.size.width) &&
				Number.isFinite(candidate.size.height) &&
				candidate.size.width > 0 &&
				candidate.size.height > 0
		);

		return candidates.reduce<Desk | undefined>((best, candidate) => {
			if (!best) return candidate;

			const candidateScale = scaleToFit(
				width,
				height,
				candidate.size.width,
				candidate.size.height
			);
			const bestScale = scaleToFit(width, height, best.size.width, best.size.height);
			const candidateCoverage =
				(candidate.size.width * candidateScale * candidate.size.height * candidateScale) /
				(width * height);
			const bestCoverage =
				(best.size.width * bestScale * best.size.height * bestScale) / (width * height);

			return candidateCoverage > bestCoverage ? candidate : best;
		}, undefined);
	}

	function updateDesk(): void {
		const { width, height } = deskArea.getBoundingClientRect();
		if (
			!Number.isFinite(width) ||
			!Number.isFinite(height) ||
			width <= 0 ||
			height <= 0
		) {
			desk = null;
			deskStatus = 'error';
			return;
		}

		const selectedDesk = findBestFittingDesk(width, height);
		if (!selectedDesk) {
			desk = null;
			deskStatus = 'error';
			return;
		}

		const scale = scaleToFit(
			width,
			height,
			selectedDesk.size.width,
			selectedDesk.size.height
		);
		if (!Number.isFinite(scale) || scale <= 0) {
			desk = null;
			deskStatus = 'error';
			return;
		}

		desk = selectedDesk;
		deskScale = scale;
		deskStatus = 'ready';
	}

	onMount(() => {
		const observer = new ResizeObserver(updateDesk);

		observer.observe(deskArea);
		updateDesk();

		return () => observer.disconnect();
	});
</script>

<!-- Home page's head data -->
<!-- Moved from ./+layout.svelte for page (Home) specific head data -->
<svelte:head>
	<title>bbeetlesam</title>
	<meta
		name="description"
		content="Get ready to watch bbeetlesam's desk view on the web. It contains everything he has ever done."
	/>
</svelte:head>

<!-- The holy desk of Homepage -->
<div bind:this={deskArea} class="relative flex flex-1 items-center justify-center">
	{#if deskStatus === 'ready' && desk}
		<DeskArea {desk} {deskScale} animateItems className="absolute origin-center" />
	{:else if deskStatus === 'error'}
		<!--Fallback display if the desk failed to load -->
		<div class="flex flex-col gap-6 px-6 font-balsamiq">
			<p role="status" class="text-center text-lg text-dark-2">
				The desk is unavailable right now :(
			</p>
			<div class="text-center">
				<p>Consider refreshing the page or go to:</p>
				<nav aria-label="Site pages">
					<ul class="flex flex-wrap justify-center gap-x-3 gap-y-0">
						{#each data.pageLinks.filter((pageLink) => pageLink.id !== 'home') as pageLink (pageLink.id)}
							<li>
								<a
									href={resolve(getPageRoute(pageLink.id))}
									class="font-akt font-medium text-cyan underline active:text-red"
								>
									{pageLink.title}
								</a>
							</li>
						{/each}
					</ul>
				</nav>
			</div>
		</div>
	{/if}
</div>

<!-- Information about the items on the home desk -->
<div class="fixed top-4 right-4 z-50 flex items-center gap-2">
	<span
		class={`
			overflow-hidden font-balsamiq text-lg font-bold whitespace-nowrap
			transition-all duration-200 ease-out select-none
			${
				isHelpIconActive
					? 'max-w-40 translate-x-0 opacity-100'
					: 'max-w-0 -translate-x-2 opacity-0'
			}
		`}
		aria-hidden="true"
	>
		What are these?
	</span>

	<button
		type="button"
		class="relative size-12 cursor-pointer"
		aria-label="Home page information"
		aria-haspopup="dialog"
		aria-expanded={isInfoModalOpen}
		onmouseenter={() => (isInfoHovered = true)}
		onmouseleave={() => (isInfoHovered = false)}
		onclick={() => {
			isInfoHovered = false;
			isInfoModalOpen = true;
		}}
	>
		{#if helpIcon?.default}
			<img
				src={helpIcon.default}
				alt=""
				aria-hidden="true"
				class={`
				absolute inset-0 size-full transition-opacity duration-200
				${isHelpIconActive ? 'opacity-0' : 'opacity-100'}`}
			/>
		{/if}
		{#if helpIcon?.active || helpIcon?.default}
			<img
				src={helpIcon.active ?? helpIcon.default ?? ''}
				alt=""
				aria-hidden="true"
				class={`
				absolute inset-0 size-full opacity-0 transition-opacity duration-200
				${isHelpIconActive ? 'opacity-100' : 'opacity-0'}`}
			/>
		{/if}
	</button>
</div>

<!-- Info modal -->
<Modal bind:open={isInfoModalOpen} title="What are these?" useCloseButton>
	<div class="max-w-110 space-y-2">
		<p class="font-akt">
			A representative desk full of stuffy collections of mine. Try to hover around with
			them — or even better: click one!
		</p>
		<p>(Not even fit for a horse)</p>
	</div>
</Modal>
