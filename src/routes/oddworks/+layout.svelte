<script lang="ts">
	const title = 'Oddworks – bbeetlesam';
	const desc =
		'Games are another page, because bbeetlesam also crafts other incomprehensible creations.';

	let { children } = $props();
</script>

<svelte:head>
	<title>{title}</title>
	<meta name="description" content={desc} />
</svelte:head>

{@render children()}
