<!--
@component Draws a modal that displays on top of everything.

@example
```svelte
<Modal bind:open={isOpen} title="Example" useCloseButton>
	<p>Modal content goes here.</p>
</Modal>
```

@props children: Snippet - The content to be drawn inside the frame.
@props open: boolean - Whether the modal is open.
@props title: string - The title of the modal.
@props useCloseButton: boolean - Whether to display the close button.
Enabling this will prevent the modal from being closed by clicking outside of it.
@props titlebarPosition: titlePosition - The position of the title bar, if exists.
-->

<script lang="ts">
	import type { Snippet } from 'svelte';

	type titlePosition = 'left' | 'center' | 'right';

	type Props = {
		children: Snippet;
		/** Whether the modal is open. */
		open?: boolean;
		/** The title of the modal. */
		title?: string;
		/**
		 * Whether to display the close button.
		 * Enabling this will prevent the modal from being closed by clicking outside of it.
		 */
		useCloseButton?: boolean;
		/**
		 * The position of the title bar, if exists.
		 * Valid values are `left`, `center`, and `right`.
		 */
		titlebarPosition?: titlePosition;
	};

	let {
		open = $bindable(false),
		title,
		useCloseButton = false,
		titlebarPosition = 'left',
		children
	}: Props = $props();
	let dialog = $state<HTMLDialogElement>();

	$effect(() => {
		if (!dialog || open === dialog.open) return;

		if (open) dialog.showModal();
		else dialog.close();
	});

	// Handle modal close events
	function close(): void {
		open = false;
	}

	// Handle backdrop (outside modal) clicks to close the modal
	function closeOnBackdrop(event: MouseEvent): void {
		if (event.target === dialog && !useCloseButton) close();
	}

	// Handle cancel events to prevent the modal from closing
	function handleCancel(event: Event): void {
		if (useCloseButton) event.preventDefault();
	}
</script>

<dialog
	bind:this={dialog}
	aria-label={title}
	onclose={close}
	oncancel={handleCancel}
	onclick={closeOnBackdrop}
>
	<div class="relative">
		{const titlebarPositionClass =
			titlebarPosition === 'left'
				? 'left-5'
				: titlebarPosition === 'right'
					? 'right-5'
					: 'left-1/2 -translate-x-1/2'}

		{const closeButtonClass = titlebarPosition === 'right' ? 'left-5' : 'right-5'}

		<!-- Title bar -->
		{#if title}
			<div
				class="
				  absolute top-0 {titlebarPositionClass} z-20 -translate-y-1/2 cursor-default
				  rounded-lg border-2 border-rough-dark bg-[#B0C5D1] px-4 py-1 text-fg-dark
				"
			>
				<h2 class="font-balsamiq text-xl font-bold whitespace-nowrap">{title}</h2>
			</div>
		{/if}

		<!-- Close button -->
		{#if useCloseButton}
			<div
				class="
				  absolute top-0 {closeButtonClass} z-20 -translate-y-1/2
				  rounded-lg border-2 border-rough-dark bg-red text-fg-dark
					shadow-md hover:bg-red-700
				"
			>
				<button
					type="button"
					class="size-full cursor-pointer rounded-lg px-2 font-bold"
					aria-label="Close dialog"
					onclick={close}
				>
					<span aria-hidden="true" class="font-mono text-xl select-none">&times;</span>
				</button>
			</div>
		{/if}

		<!-- Main modal content -->
		<section
			class={`
				modal-content rounded-xl border-2 border-rough-dark bg-paper
				p-4 text-fg-dark sm:p-6 ${title ? 'pt-7 sm:pt-8' : ''}
			`}
		>
			<div>
				{@render children()}
			</div>
		</section>
	</div>
</dialog>

<style>
	dialog {
		max-width: min(90vw, 45rem); /* Prevent modal from overflowing the x-viewport */
		margin: auto;
		padding: 0;
		border: 0;
		background: transparent;
		color: inherit;
		overflow: visible;
	}

	.modal-content {
		box-sizing: border-box;
		max-block-size: 90dvh; /* Prevent modal from overflowing the y-viewport */
		overflow: auto;
		overscroll-behavior: contain;
	}

	dialog::backdrop {
		background: rgb(0 0 0 / 30%);
		backdrop-filter: blur(3px);
	}
</style>
