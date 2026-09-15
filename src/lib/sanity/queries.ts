// Sanity GROQ queries

/** GROQ query for fetching `nav-item` documents */
const NAV_ITEMS_QUERY: string = `
	*[_type == "nav-item"] | order(navOrder asc) {
		id,
		title,
		desc,
		"icon": {
			"default": icon.default.asset->url,
			"active": icon.active.asset->url
		}
	}
`;

/** GROQ query for fetching Home `desk` documents */
const HOME_DESKS_QUERY: string = `
  *[_type == "desk" && string::startsWith(id, "h")] {
		"id": id,
		"size": size,

		"items": deskItems[] {
			"id": id,
			"icon": {
				"default": icon.default.asset->url,
				"active": icon.active.asset->url
			},
			"imageAlt": imageAlt,

			"x": position.x,
			"y": position.y,
			"size": size,
			"rotation": rotation,

			"navigationId": navigation->id,

			"interactionEffect": interactionEffect,
			"focusFrame": focusFrame,

		}
	}
`;

/** GROQ query for fetching `social-link` documents */
const SOCIAL_LINKS_QUERY: string = `
  *[_type == "social-link"] {
    id,
    href,
    title,
    "icon": {
      "default": icon.default.asset->url,
      "active": icon.active.asset->url
    },
    order
  }
`;

export { NAV_ITEMS_QUERY, HOME_DESKS_QUERY, SOCIAL_LINKS_QUERY };
