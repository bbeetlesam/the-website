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

/** GROQ query for fetching `social-link` documents */
const EXTERNAL_LINKS_QUERY: string = `
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

/** GROQ query for fetching `typeface` documents */
const TYPEFACES_QUERY: string = `
	*[_type == "typeface"] {
		name,
		variants[] {
			name,
			weight,
			style,
			"file": file.asset->url,
			format
		}
	}
`;

/** GROQ query for fetching `icon-asset` documents */
const ICON_ASSETS_QUERY: string = `
	*[_type == "icon-asset"] {
		id,
		"icon": {
      "default": variants.default.asset->url,
      "active": variants.active.asset->url
    },
	}
`;

type DeskPrefix = 'h' | 'g';
const DESKS_QUERY = (prefix: DeskPrefix): string => `
	*[_type == "desk" && string::startsWith(id, "${prefix}")] {
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

			"navigation": navigation->{
        "type": _type,

        ...select(
          _type == "nav-item" => {
            id,
            title,
            desc,
            "icon": {
              "default": icon.default.asset->url,
              "active": icon.active.asset->url
            }
          },

          _type == "social-link" => {
            id,
            href,
            title,
            "icon": {
              "default": icon.default.asset->url,
              "active": icon.active.asset->url
            },
            order
          }
        )
			},

			"interactionEffect": interactionEffect,
			"focusFrame": focusFrame,
		}
	}
`;

/** GROQ query for fetching Home `desk` documents */
const HOME_DESKS_QUERY: string = DESKS_QUERY('h');

/** GROQ query for fetching Game `desk` documents */
const GAME_DESKS_QUERY: string = DESKS_QUERY('g');

export {
	NAV_ITEMS_QUERY,
	HOME_DESKS_QUERY,
	EXTERNAL_LINKS_QUERY,
	GAME_DESKS_QUERY,
	TYPEFACES_QUERY,
	ICON_ASSETS_QUERY
};
