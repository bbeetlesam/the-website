import type { NavItem } from './navigation';

/**
 * Raw `nav-item` document from Sanity.
 * Like NavItem, but with `id` (matches NAV_ROUTES keys, e.g. 'games') instead of `route`.
 */
type SanityNavItem = Omit<NavItem, 'route'> & { id: string };

export type { SanityNavItem };
