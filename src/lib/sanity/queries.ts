import { defineQuery } from 'groq';

/** Page navigation records with icon assets projected to their URLs. */
const PAGE_LINKS_QUERY = defineQuery(`
	*[_type == "page-link"] | order(navOrder asc) {
		"type": _type,
		id,
		title,
		desc,
		"icon": {
			"default": icon.default.asset->url,
			"active": icon.active.asset->url
		}
	}
`);

/** Typeface records with their selected font variants and file URLs. */
const TYPEFACES_QUERY = defineQuery(`
	*[_type == "typeface"] {
		name,
		variantsType,
		...select(
			variantsType == "static" => {
				"variants": staticFonts[] {
					name,
					"type": ^.variantsType,
					weight,
					style,
					"file": file.asset->url,
					format
				}
			},
			variantsType == "variable" => {
				"variants": variableFonts[] {
					name,
					"type": ^.variantsType,
					minWeight,
					maxWeight,
					style,
					"file": file.asset->url,
					format
				}
			}
		)
	}
`);

/** Icon asset records with default and active image URLs. */
const ICON_ASSETS_QUERY = defineQuery(`
	*[_type == "icon-asset"] {
		id,
		"icon": {
			"default": variants.default.asset->url,
			"active": variants.active.asset->url
		}
	}
`);

/** Social links with icon assets projected to their URLs. */
const SOCIAL_LINKS_QUERY = defineQuery(`
	*[_type == "social-link" && category == "social"] {
		"type": _type,
		id,
		href,
		title,
		desc,
		"icon": {
			"default": icon.default.asset->url,
			"active": icon.active.asset->url
		}
	}
`);

/** Featured game links with their icon and screenshot assets projected to URLs. */
const FEATURED_GAME_LINKS_QUERY = defineQuery(`
	*[_type == "social-link" && category == "game" && featured == true] {
		"type": _type,
		id,
		href,
		title,
		desc,
		genre,
		platforms,
		"icon": {
			"default": icon.default.asset->url,
			"active": icon.active.asset->url
		},
		"screenshot": screenshot.asset->url
	}
`);

/** Desks with item positions, navigation and image assets projected. */
const DESKS_QUERY = defineQuery(`
	*[_type == "desk" && string::startsWith(id, $prefix)] {
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
					_type == "page-link" => {
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
						desc,
						"icon": {
							"default": icon.default.asset->url,
							"active": icon.active.asset->url
						}
					}
				)
			},
			"interactionEffect": interactionEffect,
			"focusFrame": focusFrame
		}
	}
`);

export {
	PAGE_LINKS_QUERY,
	SOCIAL_LINKS_QUERY,
	FEATURED_GAME_LINKS_QUERY,
	DESKS_QUERY,
	TYPEFACES_QUERY,
	ICON_ASSETS_QUERY
};
