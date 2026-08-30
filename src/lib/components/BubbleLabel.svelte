<!--
@component A decorative bubble label attached to an element when hovered.

@prop label: string - The label to display when no custom content is provided.
@prop children: $Snippet - The element the bubble label is attached to.
@prop content: $Snippet - Optional custom content displayed inside the bubble.
@prop class: string - Classes applied to the bubble.
@prop tipOffsetX: number - Horizontal offset of the bubble tip.
@prop tipOffsetY: number - Vertical offset of the bubble tip.
@prop bubbleOffsetX: number - Horizontal offset of the bubble relative to the tip.
@prop bubbleColor: string - Fill colour of the bubble.
@prop textColor: string - Text colour of the bubble.
@prop outlineSize: number - Size of the bubble outline.
@prop outlineColor: string - Colour of the bubble outline.
@prop borderRadius: number - Radius of the bubble corners.

@example
```svelte
<BubbleLabel label="Am I the Walrus?">
  <img src="john.png" alt="The Walrus" />
</BubbleLabel>
```
-->

<script lang="ts">
	import type { Snippet } from 'svelte';

	type Props = {
		label?: string;
		children: Snippet;
		content?: Snippet;
		class?: string;
		tipOffsetX?: number;
		tipOffsetY?: number;
		bubbleOffsetX?: number;
		bubbleColor?: string;
		textColor?: string;
		outlineSize?: number;
		outlineColor?: string;
		borderRadius?: number;
	};

	// Component props
	const {
		label = '',
		children,
		content,
		class: className = '',
		tipOffsetX = 0,
		tipOffsetY = 0,
		bubbleOffsetX = 0,
		bubbleColor = 'var(--color-paper)',
		textColor = 'var(--color-fg-dark)',
		outlineSize = 2.5,
		outlineColor = 'var(--color-fg-dark)',
		borderRadius = 12
	}: Props = $props();

	const baseOffset = '0.5rem';
	const slideUpOffset = '-0.3rem';
	const triangleSize = 7;

	// Bubble position relative to the parent
	const transformX = $derived(`calc(-50% + ${tipOffsetX + bubbleOffsetX}px)`);

	const restTransformY = $derived(`calc(${baseOffset} + ${tipOffsetY}px + ${slideUpOffset})`);

	const hoverTransformY = $derived(`calc(${baseOffset} + ${tipOffsetY}px)`);

	// The triangle is positioned inside the bubble, so compensate
	// for the bubble's horizontal offset to keep it anchored to the tip
	const triangleTransformX = $derived(`calc(-50% - ${bubbleOffsetX}px)`);

	const outerTriangleSize = $derived(triangleSize + outlineSize);
</script>

<div class="bubble-label relative inline-block">
	{@render children()}

	<!-- Bubble -->
	<div
		class={`bubble-label__bubble absolute top-full left-1/2 z-50 ${className}`}
		style={`
			background-color: ${bubbleColor};
			color: ${textColor};
			border: ${outlineSize}px solid ${outlineColor};
			border-radius: ${borderRadius}px;
			--bubble-x: ${transformX};
			--bubble-y-rest: ${restTransformY};
			--bubble-y-hover: ${hoverTransformY};
		`}
	>
		<!-- Bubble content -->
		{#if content}
			{@render content()}
		{:else}
			<div class="px-2 py-1 whitespace-nowrap">
				{label}
			</div>
		{/if}

		<!-- Triangle outline -->
		{#if outlineSize > 0}
			<div
				class="absolute bottom-full left-1/2 h-0 w-0"
				style={`
					border-left: ${outerTriangleSize}px solid transparent;
					border-right: ${outerTriangleSize}px solid transparent;
					border-bottom: ${outerTriangleSize}px solid ${outlineColor};
					transform:
						translateX(${triangleTransformX})
						translateY(-0.3px);
				`}
			></div>
		{/if}

		<!-- Triangle tip -->
		<div
			class="absolute bottom-full left-1/2 h-0 w-0"
			style={`
				border-left: ${triangleSize}px solid transparent;
				border-right: ${triangleSize}px solid transparent;
				border-bottom: ${triangleSize}px solid ${bubbleColor};
				transform:
					translateX(${triangleTransformX})
					translateY(0.5px);
			`}
		></div>
	</div>
</div>

<style>
	.bubble-label__bubble {
		opacity: 0;
		transform: translate(var(--bubble-x), var(--bubble-y-rest));
		transition:
			opacity 250ms ease,
			transform 250ms ease;
	}

	.bubble-label:hover .bubble-label__bubble,
	.bubble-label:focus-within .bubble-label__bubble {
		opacity: 1;
		transform: translate(var(--bubble-x), var(--bubble-y-hover));
	}
</style>
