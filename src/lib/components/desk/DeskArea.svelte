<!--
@component A container for the desk items.

@prop desk: Desk - The desk data, including its dimensions and items.
@prop deskScale: number - The scale applied to the desk area.
@prop className?: string - Additional classes for the desk area.
@prop animateItems?: boolean - Whether desk items animate into view. Defaults to `false`.

@example
```svelte
<DeskArea {desk} {deskScale} className="absolute top-0 left-0 origin-top-left" animateItems />
```
-->

<script lang="ts">
	import type { Desk } from '$lib/types';
	import { default as DeskItem } from './DeskItem.svelte';

	// Component props
	const {
		desk,
		deskScale,
		className,
		animateItems = false
	}: {
		desk: Desk;
		deskScale: number;
		className?: string;
		animateItems?: boolean;
	} = $props();

	// idk what im doing bruh
	const debug: boolean = false; // import.meta.env.DEV;
</script>

<div
	class="{className} {debug ? 'outline-2 outline-green-600' : ''}"
	style={`
		width: ${desk.size.width}px;
		height: ${desk.size.height}px;
		transform: scale(${deskScale});
	`}
>
	{#each desk.items as item (item.id)}
		<DeskItem {item} {animateItems} />
	{/each}
</div>
