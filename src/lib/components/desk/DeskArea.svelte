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
</script>

<div
	class="desk"
	style={`--desk-width: ${desk.size.width}px; --desk-height: ${desk.size.height}px; --desk-scale: ${deskScale};`}
>
	{#each desk.items as item (item.id)}
		<DeskItem {item} />
	{/each}
</div>
