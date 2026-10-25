<script module lang="ts">
	type TooltipStyle = Partial<CSSStyleDeclaration>;
	type TooltipOptions = {
		text: string;
		className?: string;
		style?: TooltipStyle;
	};

	type TooltipAction = (
		node: HTMLElement,
		options: TooltipOptions
	) => {
		update: (options: TooltipOptions) => void;
		destroy: () => void;
	};

	/**
	 * Attach a tooltip to an element. The tooltip follows the pointer while
	 * the element is hovered.
	 *
	 * @param node - The element to attach the action to.
	 * @param options.text - The text to display in the tooltip.
	 * @param options.className - Optional space-separated CSS class names added to the tooltip.
	 * @param options.style - Optional inline CSS styles. These override
	 * the default and class-based styles.
	 *
	 * @example
	 * ```svelte
	 * <button
	 *   use:CursorTooltip={{
	 *     text: 'Check who the walrus is',
	 *     className: 'bg-blue text-paper',
	 *     style: { outline: '2px solid red' }
	 *   }}
	 * >
	 *   Walrus!
	 * </button>
	 * ```
	 */
	export const CursorTooltip: TooltipAction = (
		node: HTMLElement,
		options: TooltipOptions
	) => {
		let { text, className = '', style = {} } = options;
		let tooltip: HTMLDivElement | undefined;
		let pointerX = 0;
		let pointerY = 0;
		let visible = false;

		const defaultStyle: TooltipStyle = {
			position: 'fixed',
			zIndex: '90125',
			left: '0',
			top: '0',
			pointerEvents: 'none',
			transform: 'translate(10px, 10px)',
			opacity: '0'
		};

		const applyStyles = () => {
			if (!tooltip) return;

			tooltip.removeAttribute('style');
			Object.assign(tooltip.style, { ...defaultStyle, ...style });
			tooltip.style.left = `${pointerX}px`;
			tooltip.style.top = `${pointerY}px`;
			tooltip.style.opacity = visible ? '1' : '0';
		};

		const show = (event: PointerEvent) => {
			if (!text) return;

			pointerX = event.clientX;
			pointerY = event.clientY;

			if (!tooltip) {
				tooltip = document.createElement('div');
				tooltip.setAttribute('role', 'tooltip');
				tooltip.className = ['cursor-tooltip', className].filter(Boolean).join(' ');
				document.body.appendChild(tooltip);
			}

			tooltip.textContent = text;
			visible = true;
			applyStyles();
		};

		const hide = () => {
			visible = false;
			if (tooltip) tooltip.style.opacity = '0';
		};

		node.addEventListener('pointerenter', show);
		node.addEventListener('pointermove', show);
		node.addEventListener('pointerleave', hide);
		node.addEventListener('blur', hide);

		return {
			update(nextOptions) {
				text = nextOptions.text;
				className = nextOptions.className ?? '';
				style = nextOptions.style ?? {};

				if (tooltip) {
					tooltip.className = ['cursor-tooltip', className].filter(Boolean).join(' ');
					tooltip.textContent = text;
					applyStyles();
				}
			},
			destroy() {
				node.removeEventListener('pointerenter', show);
				node.removeEventListener('pointermove', show);
				node.removeEventListener('pointerleave', hide);
				node.removeEventListener('blur', hide);
				tooltip?.remove();
			}
		};
	};
</script>

<style>
	@layer components {
		:global(.cursor-tooltip) {
			padding: 0.35rem;
			border-radius: 0 0.6rem 0.6rem 0.6rem;
			background: #a1dfc5;
			color: var(--color-dark-2);
			font-family: var(--font-balsamiq);
			font-size: 0.835rem;
			font-weight: bold;
			line-height: 1;
			white-space: nowrap;
			transition: opacity 100ms ease;
			outline: 2.5px solid var(--color-dark-1);
		}
	}
</style>
