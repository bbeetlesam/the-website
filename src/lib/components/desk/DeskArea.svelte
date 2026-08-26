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
	const { desk, deskScale }: { desk: Desk; deskScale: number } = $props();

	// A debug flag that is true in development mode (for DeskArea)
	// idk what im doing bruh
	const debug: boolean = import.meta.env.DEV;
</script>

<div
	class="desk {debug ? 'outline-2 outline-orange-700' : ''}"
	style={`--desk-width: ${desk.size.width}px; --desk-height: ${desk.size.height}px; --desk-scale: ${deskScale};`}
>
	{#each desk.items as item (item.id)}
		<DeskItem {item} />
	{/each}
</div>
