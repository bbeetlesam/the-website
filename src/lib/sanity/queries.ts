// Sanity GROQ queries

/** GROQ query for fetching `nav-item` documents */
const NAV_ITEMS_QUERY = `
	*[_type == "nav-item"] | order(navOrder asc) {
		id,
		title,
		desc,
		"icon": {
			"white": icon.white.asset->url,
			"black": icon.black.asset->url
		}
	}
`;

/** GROQ query for fetching `desk` documents */
const DESKS_QUERY = `
  *[_type == "desk"] {
		"id": id,
		"size": size,

		"items": deskItems[] {
			"id": id,
			"image": icon.asset->url,
			"imageAlt": imageAlt,

			"x": position.x,
			"y": position.y,

			"size": size,
			"rotation": rotation,

			"focusFrame": focusFrame,

			"navigationId": navigation->id
		}
	}
`;

export { NAV_ITEMS_QUERY, DESKS_QUERY };
