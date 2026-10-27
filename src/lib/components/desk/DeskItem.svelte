<!--
@component A single desk item in a DeskArea.

@prop item: DeskItem - The item data, including its icon, position, size, and optional
navigation and interaction settings.
@prop animateItems?: boolean - Whether the item animates into view. Defaults to `false`.

@example
```svelte
<DeskItem {item} animateItems />
```
-->

<script lang="ts">
	import { resolve } from '$app/paths';
	import type { DeskItem } from '$lib/types';
	import { getPageRoute } from '$lib/utils';
	import ItemFocusFrame from '../ui/ItemFocusFrame.svelte';
	import BubbleLabel from '../ui/BubbleLabel.svelte';

	// Component props
	const {
		item,
		animateItems = false
	}: {
		item: DeskItem;
		animateItems?: boolean;
	} = $props();

	let size = $derived(item.size ? item.size : 100);
	let rotation = $derived(item.rotation ? item.rotation : 0);
	let imageAlt = $derived(item.imageAlt ? item.imageAlt : 'Desk Image');
</script>

<!-- Reusable Desk Item's image snippet -->
{#snippet deskItemImage(item: DeskItem, alt: string | null | undefined)}
	{#if item.icon.default}
		<img
			src={item.icon.default}
			alt={alt ?? 'Desk Image'}
			style={`
				width: ${size}px;
				transform: rotate(${rotation}deg);
			`}
		/>
	{/if}
{/snippet}

<!-- Reusable Desk Item snippet -->
{#snippet deskItem(item: DeskItem)}
	{#if item.navigation?.type === 'page-link'}
		<a href={resolve(getPageRoute(item.navigation.id))}>
			{@render deskItemImage(item, item.navigation.title)}
		</a>
	{:else if item.navigation?.type === 'social-link'}
		<a href={item.navigation.href} rel="external noopener noreferrer" target="_blank">
			{@render deskItemImage(item, item.navigation.desc)}
		</a>
	{/if}
{/snippet}

<div
	class="group/desk-item desk-item"
	style={`
  	left: ${item.x}px;
  	top: ${item.y}px;
    width: ${size}px;
    height: ${size}px;
  `}
>
	<div class:desk-item-enter={animateItems}>
		{#if item.navigation}
			{@const bubbleLabel =
				item.navigation.type === 'page-link'
					? item.navigation.desc
					: item.navigation.type === 'social-link'
						? item.navigation.title
						: ''}

			<BubbleLabel
				label={bubbleLabel ?? ''}
				bubbleOffsetX={0}
				tipOffsetY={0}
				class="text-xs font-semibold"
			>
				{#if item.interactionEffect === null || item.interactionEffect === 'none'}
					<!-- No effect -->
					{@render deskItem(item)}
				{:else if item.interactionEffect === 'focus-frame'}
					<!-- Focus frame -->
					<ItemFocusFrame {item} />
					{@render deskItem(item)}
				{/if}
			</BubbleLabel>
		{:else}
			{@render deskItemImage(item, imageAlt)}
		{/if}
	</div>
</div>

<style>
	.desk-item {
		position: absolute;
		top: 0;
		left: 0;

		transform: translate(-50%, -50%);
	}

	.desk-item-enter {
		animation: desk-item-enter 500ms cubic-bezier(0.2, 0.8, 0.2, 1) both;
	}

	@keyframes desk-item-enter {
		from {
			opacity: 0;
			transform: scale(0.8);
		}

		to {
			opacity: 1;
			transform: scale(1);
		}
	}
</style>
