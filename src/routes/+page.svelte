<script lang="ts">
	import pic from '$lib/assets/favicon.svg';
</script>

<!-- Homepage, landing page, viewport-fixed -->
<div class="flex w-screen flex-1 items-center justify-center">
	<div class="flex items-center gap-2">
		<img src={pic} class="h-30 w-auto" alt="favicon" />

		<div class="space-y-1">
			<h1 class="text-2xl font-medium">Welcome to Hell.</h1>
			<p class="text-base">
				Visit
				<a class="underline" href="https://github.com/bbeetlesam" target="_blank"> something </a>
				to read what?
			</p>
		</div>
	</div>
</div>
