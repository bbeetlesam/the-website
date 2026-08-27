<script lang="ts">
	const title = 'Arts – bbeetlesam';
	const desc =
		"Art is the only way of visualising a human's emotions, and bbeetlesam is a human being.";

	let { children } = $props();
</script>

<svelte:head>
	<title>{title}</title>
	<meta name="description" content={desc} />
</svelte:head>

{@render children()}
