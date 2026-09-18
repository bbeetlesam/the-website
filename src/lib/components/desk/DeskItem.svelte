<!--
@component A single desk item in a DeskArea.

@prop item: DeskItem - The desk item to display.
-->

<script lang="ts">
	import { resolve } from '$app/paths';
	import { default as ItemFocusFrame } from './ItemFocusFrame.svelte';
	import type { DeskItem } from '$lib/types';
	import BubbleLabel from '../BubbleLabel.svelte';

	// Component props
	const { item }: { item: DeskItem } = $props();

	let size = $derived(item.size ? item.size : 100);
	let rotation = $derived(item.rotation ? item.rotation : 0);
	let imageAlt = $derived(item.imageAlt ? item.imageAlt : 'Desk Image');
</script>

<!-- Reusable Desk Item's image snippet -->
{#snippet deskImage(item: DeskItem, alt: string)}
	<img
		src={item.icon.default}
		{alt}
		style={`
     	width: ${size}px;
     	transform: rotate(${rotation}deg);
    `}
	/>
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
	{#if item.navigation}
		{@const bubbleLabel =
			item.navigation.type === 'nav-item' ? item.navigation.desc :
			item.navigation.type === 'social-link' ? item.navigation.title : ''
		}

		<BubbleLabel
			label={bubbleLabel}
			bubbleOffsetX={0}
			tipOffsetY={0}
			class="text-xs font-semibold"
		>
			{#if item.interactionEffect === 'none'}
				<!-- No effect -->
				{#if item.navigation?.type === 'nav-item'}
					<a href={resolve(item.navigation.route)}>
						{@render deskImage(item, item.navigation.title)}
					</a>
				{:else if item.navigation?.type === 'social-link'}
					<a href={item.navigation.href}>
						{@render deskImage(item, item.navigation.title)}
					</a>
				{/if}
			{:else if item.interactionEffect === 'focus-frame'}
				<!-- Focus frame -->
				<ItemFocusFrame {item} />

				{#if item.navigation?.type === 'nav-item'}
					<a href={resolve(item.navigation.route)}>
						{@render deskImage(item, item.navigation.title)}
					</a>
				{:else if item.navigation?.type === 'social-link'}
					<a href={item.navigation.href}>
						{@render deskImage(item, item.navigation.title)}
					</a>
				{/if}
			{/if}
		</BubbleLabel>
	{:else}
		{@render deskImage(item, imageAlt)}
	{/if}
</div>

<style>
	.desk-item {
		position: absolute;
		top: 0;
		left: 0;

		transform: translate(-50%, -50%);
	}
</style>
