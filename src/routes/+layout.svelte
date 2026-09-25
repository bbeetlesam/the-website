<script lang="ts">
	import './layout.css';
	import favicon from '$lib/assets/favicon.svg';
	import { onMount, type Snippet } from 'svelte';
	import type { LayoutData } from './$types';

	let { children, data }: { children: Snippet; data: LayoutData } = $props();

	onMount(() => {
		// Fetch typefaces from Sanity and inject them into the <style> document head
		const css = data.typefaces
			.flatMap((typeface) =>
				typeface.variants.map((variant) => {
					const weight =
						variant.type === 'static'
							? `${variant.weight}`
							: variant.type === 'variable'
								? `${variant.minWeight} ${variant.maxWeight}`
								: `400`;

					return `
            @font-face {
              font-family: '${typeface.name}';
              src: url('${variant.file}') format('${variant.format}');
              font-weight: ${weight};
              font-style: ${variant.style};
              font-display: swap;
            }
          `;
				})
			)
			.join('\n');

		const style = document.createElement('style');
		style.textContent = css;
		document.head.appendChild(style);
	});
</script>

<svelte:head>
	<!-- Default page title for untitled page, if any -->
	<title>bbeetlesam</title>
	<link rel="icon" href={favicon} />
</svelte:head>

<div class="flex min-h-dvh flex-col">
	<main class="flex min-h-0 flex-1">
		{@render children()}
	</main>
</div>
