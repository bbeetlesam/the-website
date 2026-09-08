<script lang="ts">
	import { page } from '$app/state';
	import type { LayoutProps } from './$types';
	import Header from '$lib/components/site/Header.svelte';

	let { children, data }: LayoutProps = $props();

	const centreName = $derived(
		data.navItems.find((item) => item.route === page.route.id)?.title ?? 'Header'
	);
</script>

<!-- Header for routes except Home -->
<div class="flex min-h-0 flex-1 flex-col">
	<Header {centreName} navItems={data.navItems} />
	{@render children()}
</div>
