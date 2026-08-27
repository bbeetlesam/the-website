<script lang="ts">
	const title = 'Games – bbeetlesam';
	const desc =
		"A collection of playable digital enjoyments, the central part of bbeetlesam's creative career.";

	let { children } = $props();
</script>

<svelte:head>
	<title>{title}</title>
	<meta name="description" content={desc} />
</svelte:head>

{@render children()}
