<script lang="ts">
	import './layout.css';
	import favicon from '$lib/assets/favicon.svg';
	import { Footer } from '$lib/components/site';

	let { children } = $props();
</script>

<svelte:head>
	<title>bbeetlesam</title>
	<link rel="icon" href={favicon} />
</svelte:head>

<div class="flex min-h-dvh flex-col">
	<main class="flex min-h-0 flex-1">
		{@render children()}
	</main>
	<Footer />
</div>
