<script lang="ts">
	import type { LayoutProps } from './$types';
	import Header from '$lib/components/site/Header.svelte';

	let { children, data }: LayoutProps = $props();

	// import { page } from '$app/state';
	// const centreName = $derived(
	// 	data.pageLinks.find((item) => item.route === page.route.id)?.title ?? 'Header'
	// );
</script>

<!-- Header for routes except Home -->
<div class="flex min-h-0 flex-1 flex-col">
	<Header pageLinks={data.pageLinks} />
	{@render children()}
</div>
