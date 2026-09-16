import type { Desk, DeskItem } from './desk';
import type { NavItem } from './navigation';
import type { SocialLink } from './navigation';

/**
 * Raw `nav-item` document from Sanity.
 * Like NavItem, but without `route`.
 */
type SanityNavItem = Omit<NavItem, 'route'>;

/**
 * Raw `social-link` document from Sanity.
 * Similar to {@link SocialLink}.
 */
type SanitySocialLink = SocialLink;

type SanityNavigation = SanityNavItem | SanitySocialLink;

/**
 * Raw `desk-item` object from Sanity.
 * Like {@link DeskItem}, but with `navigation` type as {@link SanityNavigation}.
 */
type SanityDeskItem = Omit<DeskItem, 'navigation'> & {
	navigation?: SanityNavigation;
};

/**
 * Raw `desk` document from Sanity.
 * Like {@link Desk}, but with `items` of type {@link SanityDeskItem}.
 */
type SanityDesk = Omit<Desk, 'items'> & {
	items: SanityDeskItem[];
};

export type { SanityNavItem, SanityDeskItem, SanityDesk };
