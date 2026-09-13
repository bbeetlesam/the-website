import type { Icon } from './image';

/**
 * Represents a social link.
 */
type SocialLink = {
	/** The unique identifier for the link. */
	id: string;
	/** The href of the link (to somewhere else). */
	href: string;
	/** The representing title for the link. */
	title: string;
	/** The image icon of the link. */
	icon: Icon;
	/** The order of the link in the list of social links. */
	order: number;
};

export type { SocialLink };
