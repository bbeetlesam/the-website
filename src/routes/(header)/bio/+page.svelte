<script lang="ts">
	// Way in progress.
	// Just wait for it.
	import { resolve } from '$app/paths';
	import { NAV_ROUTES } from '$lib/data';
</script>

<!-- The informative passage of Bio -->
<div class="flex flex-1 items-center justify-center">
	<div class="flex w-[90%] flex-col gap-3 md:w-[60%]">
		<h2 class="text-center text-2xl font-semibold">Intermezzo</h2>
		<div class="space-y-4 text-center text-base">
			<p>
				Bienvenue, this is a Blog page where I write about stuff and things. I think this page could
				be a way for me to pour my thoughts into a visual form — tangible to various eyes and minds
				— that can tickle your past, current, and future comprehensibility, so while you are reading
				this, I hope you can understand that I'm still <span class="font-semibold">developing</span>
				this little edge section and politely wait until it's ready to be served to you.
			</p>
			<p class="text-sm">
				Thank you for your patience — and your curiosity. Mind to <a
					href={resolve(NAV_ROUTES.home)}
					class="font-semibold underline">go back</a
				>?
			</p>
		</div>
	</div>
</div>
