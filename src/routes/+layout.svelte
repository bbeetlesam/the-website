<script lang="ts">
	import './layout.css';
	import favicon from '$lib/assets/favicon.svg';
	import { page } from '$app/state';
	import { env } from '$env/dynamic/public';
	import { onMount, type Snippet } from 'svelte';
	import type { LayoutData } from './$types';

	import { provideDesktopState } from '$lib/state/desktop';
	import { watchDesktop } from '$lib/utils';

	let { children, data }: { children: Snippet; data: LayoutData } = $props();

	/** Per-layout responsive state shared with all descendant components */
	const desktopState = $state({ isDesktop: false });
	provideDesktopState(desktopState);

	/** Absolute canonical URL for the current route, or null when one shouldn't be emitted */
	const canonicalUrl = $derived.by(() => {
		const siteUrl = env.PUBLIC_SITE_URL;

		if (!siteUrl || page.status >= 400) return null;

		const pathname =
			page.url.pathname === '/' ? '/' : page.url.pathname.replace(/\/+$/, '');

		return new URL(pathname, siteUrl).href; // Don't deceive your free will at all
	});

	onMount(() => {
		// Keep the shared state synchronized with the site's CSS `md` breakpoint
		const stopWatchingDesktop = watchDesktop((isDesktop) => {
			desktopState.isDesktop = isDesktop;
		});

		// Fetch typefaces from Sanity and inject them into the <style> document head
		const css = data.typefaces
			.flatMap((typeface) =>
				(typeface.variants ?? []).flatMap((variant) => {
					if (!variant.file) {
						console.warn(
							`Skipping font variant "${variant.name}" in typeface "${typeface.name}": no file URL was returned.`
						);
						return [];
					}

					const weight =
						'weight' in variant
							? `${variant.weight}`
							: `${variant.minWeight} ${variant.maxWeight}`;

					return [
						`
            @font-face {
              font-family: '${typeface.name}';
              src: url('${variant.file}') format('${variant.format}');
              font-weight: ${weight};
              font-style: ${variant.style};
              font-display: swap;
            }
					`
					];
				})
			)
			.join('\n');

		const style = document.createElement('style');
		style.textContent = css;
		document.head.appendChild(style);

		return stopWatchingDesktop;
	});
</script>

<svelte:head>
	<!-- Default page title for untitled page, if any -->
	<title>bbeetlesam</title>
	<link rel="icon" href={favicon} />
	{#if canonicalUrl}
		<link rel="canonical" href={canonicalUrl} />
	{/if}
</svelte:head>

<div class="flex min-h-dvh flex-col">
	<main class="flex min-h-0 flex-1">
		{@render children()}
	</main>
</div>
