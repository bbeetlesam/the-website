// Sanity GROQ queries

/** GROQ query for fetching `nav-item` documents */
export const NAV_ITEMS_QUERY = `
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
