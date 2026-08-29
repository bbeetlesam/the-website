<script lang="ts">
	import { page } from '$app/state';
	import Header from '$lib/components/site/Header.svelte';
	import { NAV_ITEMS, type NavRoute } from '$lib/data';

	let { children } = $props();

	// Compute the current nav route based on the current page route
	// E.g. if the current route is '/(header)/games', navRoute will be '/games'
	// hate the route-group's prefix here, fuck it bruh
	const routeGroup = '/(header)';
	const navRoute = $derived.by((): NavRoute | null => {
		const currentRouteId = page.route.id;
		if (!currentRouteId) return null;

		const publicRoute = currentRouteId.replace(routeGroup, '');
		return publicRoute in NAV_ITEMS ? (publicRoute as NavRoute) : null;
	});

	const centreName = $derived(navRoute ? NAV_ITEMS[navRoute].title : 'Header');
</script>

<!-- Header for routes except Home -->
<div class="flex min-h-0 flex-1 flex-col">
	<Header {centreName} />
	{@render children()}
</div>
