<script lang="ts">
	const title = 'Blogs – bbeetlesam';
	const desc =
		'The moments when bbeetlesam turns his messy mind into art, one piece of writing at a time.';

	let { children } = $props();
</script>

<svelte:head>
	<title>{title}</title>
	<meta name="description" content={desc} />
</svelte:head>

{@render children()}
