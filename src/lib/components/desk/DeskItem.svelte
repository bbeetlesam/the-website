<!--
@component A single desk item in a DeskArea.

@prop item: DeskItem - The desk item to display.
-->

<script lang="ts">
	import { default as ItemFocusFrame } from './ItemFocusFrame.svelte';
	import type { DeskItem } from '$lib/types';

	// Component props
	const { item }: { item: DeskItem } = $props();
</script>

<div
	class="group/desk-item desk-item"
	style={`
  	left: ${item.x}px;
  	top: ${item.y}px;
    width: ${item.size}px;
    height: ${item.size}px;
  `}
>
	{#if item.route}
		<!-- Focus frame canvas -->
		<ItemFocusFrame {item} />

		<a href={item.route.path}>
			<img
				src={item.image}
				alt={item.route.title}
				style={`
				  width: ${item.size}px;
  				transform: rotate(${item.rotation}deg);
				`}
			/>
		</a>
	{:else}
		<img
			src={item.image}
			alt={item.imageAlt}
			style={`
			  width: ${item.size}px;
				transform: rotate(${item.rotation}deg);
			`}
		/>
	{/if}
</div>
