<script lang="ts">
	const title = 'Bio – bbeetlesam';
	const desc =
		"Do you know who bbeetlesam is? Chances are you don't, so here's a quick bio of him.";

	let { children } = $props();
</script>

<svelte:head>
	<title>{title}</title>
	<meta name="description" content={desc} />
</svelte:head>

{@render children()}
