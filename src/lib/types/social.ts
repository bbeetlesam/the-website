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
	icon: {
		/** The white version of the icon of the link. */
		white?: string;
		/** The black version of the icon of the link. */
		black?: string;
	};
	/** The order of the link in the list of social links. */
	order: number;
};

export type { SocialLink };
