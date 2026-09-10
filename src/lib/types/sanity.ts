import type { Desk, DeskItem } from './desk';
import type { NavItem } from './navigation';

/**
 * Raw `nav-item` document from Sanity.
 * Like NavItem, but with `id` (matches NAV_ROUTES keys, e.g. 'games') instead of `route`.
 */
type SanityNavItem = Omit<NavItem, 'route'> & { id: string };

/**
 * Raw `desk-item` object from Sanity.
 * Like {@link DeskItem}, but with `navigationId` instead of `navigation`.
 */
type SanityDeskItem = Omit<DeskItem, 'navigation'> & {
	navigationId?: string;
};

/**
 * Raw `desk` document from Sanity.
 * Like {@link Desk}, but with `items` of type {@link SanityDeskItem}.
 */
type SanityDesk = Omit<Desk, 'items'> & {
	items: SanityDeskItem[];
};

export type { SanityNavItem, SanityDeskItem, SanityDesk };
