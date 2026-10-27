import type { DESKS_QUERY_RESULT } from '$lib/sanity/sanity.types';

/** Represents the interaction effect to apply when a desk item is interacted with. */
export type InteractionEffect = NonNullable<DeskItem['interactionEffect']>;

/**
 * Represents the focus frame configuration for a navigable desk item.
 */
export type FocusFrame = NonNullable<DeskItem['focusFrame']>;

/**
 * Represents the size of a desk in pixels.
 */
export type DeskSize = DESKS_QUERY_RESULT[number]['size'];

/**
 * Represents a desk item.
 *
 * Its Sanity position is flattened into coordinates, and image assets and
 * referenced navigation documents are projected for display and routing.
 */
export type DeskItem = DESKS_QUERY_RESULT[number]['items'][number];

/**
 * Represents a desk with its dimensions and its desk items.
 */
export type Desk = DESKS_QUERY_RESULT[number];
