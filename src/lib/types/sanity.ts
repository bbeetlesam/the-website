import type { Desk, DeskItem } from './desk';
import type { PageLink } from './navigation';
import type { ExternalLink } from './navigation';

/**
 * Raw `page-link` document returned by Sanity.
 * Like {@link PageLink}, but without the resolved {@link PageLink.route}.
 */
type SanityPageLink = Omit<PageLink, 'route'>;

/**
 * Raw `social-link` document returned by Sanity.
 * Equivalent to {@link ExternalLink}.
 */
type SanityExternalLink = ExternalLink;

/**
 * Represents the raw navigation types returned by Sanity.
 */
type SanityNavigation = SanityPageLink | SanityExternalLink;

/**
 * Raw `desk-item` object returned by Sanity.
 * Like {@link DeskItem}, but with `navigation` using the raw Sanity shape.
 */
type SanityDeskItem = Omit<DeskItem, 'navigation'> & {
	navigation?: SanityNavigation;
};

/**
 * Raw `desk` document returned by Sanity.
 * Like {@link Desk}, but with `items` of type {@link SanityDeskItem}.
 */
type SanityDesk = Omit<Desk, 'items'> & {
	items: SanityDeskItem[];
};

export type { SanityPageLink, SanityDeskItem, SanityDesk };
