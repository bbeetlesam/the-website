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
		<!-- Focus frame canvas -->
		<BubbleLabel
			label={item.navigation.desc}
			bubbleOffsetX={0}
			tipOffsetY={0}
			class="text-xs font-semibold"
		>
			<ItemFocusFrame {item} />

			<a href={resolve(item.navigation.route)}>
				<img
					src={item.image}
					alt={item.navigation.title}
					style={`
						width: ${size}px;
						transform: rotate(${rotation}deg);
					`}
				/>
			</a>
		</BubbleLabel>
	{:else}
		<img
			src={item.image}
			alt={imageAlt}
			style={`
			  width: ${size}px;
				transform: rotate(${rotation}deg);
			`}
		/>
	{/if}
</div>
