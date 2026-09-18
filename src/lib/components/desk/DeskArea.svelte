<!--
@component A container for the desk items.

@prop desk: Desk - The desk to display.
@prop deskScale: number - The scale of the desk.

@example
```svelte
<DeskArea {desk} {deskScale} />
```
-->

<script lang="ts">
	import type { Desk } from '$lib/types';
	import { default as DeskItem } from './DeskItem.svelte';

	// Component props
	const {
		desk,
		deskScale,
		className
	}: { desk: Desk; deskScale: number; className?: string } = $props();

	// A debug flag that is true in development mode (for DeskArea)
	// idk what im doing bruh
	const debug: boolean = import.meta.env.DEV;
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
		<DeskItem {item} />
	{/each}
</div>
