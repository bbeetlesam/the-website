<script lang="ts">
	import { onMount } from 'svelte';
	import type { PageProps } from './$types';

	import type { Desk } from '$lib/types';
	import { getIconAsset, scaleToFit } from '$lib/utils';
	import { DeskArea } from '$lib/components/desk';
	import { Modal } from '$lib/components/ui';

	// Page props (retrieved from +layout.server.ts)
	let { data }: PageProps = $props();

	let deskArea: HTMLDivElement;

	let desk = $derived<Desk>(data.homeDesks[0]);
	let deskScale = $state(1);

	const helpIcon = $derived(getIconAsset(data.iconAssets, 'help')?.icon);

	let isInfoModalOpen = $state(false);
	let isInfoHovered = $state(false);
	const isHelpIconActive = $derived(isInfoHovered && !isInfoModalOpen);

	/**
	 * Finds the closest desk to the given width/height ratio.
	 *
	 * It may not be the best algorithm so may change this later
	 */
	function findClosestDesk(width: number, height: number): Desk {
		const targetRatio = width / height;

		return data.homeDesks.reduce((closest, candidate) => {
			const candidateRatio = candidate.size.width / candidate.size.height;
			const closestRatio = closest.size.width / closest.size.height;

			const currentDistance = Math.abs(candidateRatio - targetRatio);
			const closestDistance = Math.abs(closestRatio - targetRatio);

			return currentDistance < closestDistance ? candidate : closest;
		});
	}

	function updateDesk(): void {
		const { width, height } = deskArea.getBoundingClientRect();

		desk = findClosestDesk(width, height);

		const parentWidth = width;
		const parentHeight = height;
		const deskWidth = desk.size.width;
		const deskHeight = desk.size.height;

		deskScale = scaleToFit(parentWidth, parentHeight, deskWidth, deskHeight);
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
	<DeskArea {desk} {deskScale} className="absolute origin-center" />
</div>

<!-- Information about the items on the home desk -->
<div class="fixed top-4 right-4 z-50 flex items-center gap-1.5">
	<span
		class={`
			overflow-hidden font-balsamiq text-lg font-bold whitespace-nowrap
			transition-all duration-250 ease-out select-none
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
		class="relative size-10 cursor-pointer"
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
		<img
			src={helpIcon?.default}
			alt=""
			aria-hidden="true"
			class={`
				absolute inset-0 size-full transition-opacity duration-200
				${isHelpIconActive ? 'opacity-0' : 'opacity-100'}`}
		/>
		<img
			src={helpIcon?.active}
			alt=""
			aria-hidden="true"
			class={`
				absolute inset-0 size-full opacity-0 transition-opacity duration-200
				${isHelpIconActive ? 'opacity-100' : 'opacity-0'}`}
		/>
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
