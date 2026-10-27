import type {
	ICON_ASSETS_QUERY_RESULT,
	TYPEFACES_QUERY_RESULT
} from '$lib/sanity/sanity.types';

/**
 * Represents an icon.
 *
 * An icon contains default and active image variants. The GROQ query projects
 * each image to its Sanity asset URL. A URL may be `null` if its image reference
 * or asset URL cannot be resolved.
 */
export type Icon = ICON_ASSETS_QUERY_RESULT[number]['icon'];

/** Represents the style of a font (normal or italic). */
export type FontStyle = NonNullable<
	TYPEFACES_QUERY_RESULT[number]['variants']
>[number]['style'];

/**
 * Represents a static font.
 *
 * Contains the name, weight, style, and file of a static font variant used by
 * the application CSS. Its fields follow the Sanity `font` object, with the
 * file asset projected to a URL string. The URL may be `null` if the asset
 * cannot be resolved.
 */
export type StaticFont = Extract<
	NonNullable<TYPEFACES_QUERY_RESULT[number]['variants']>[number],
	{ weight: number }
> & { type: 'static' };

/**
 * Represents a variable font.
 *
 * Contains the name, weight range, style, and file of a variable font variant
 * used by the application CSS. Its fields follow the Sanity `variable-font`
 * object, with the file asset projected to a URL string. The URL may be `null`
 * if the asset cannot be resolved.
 */
export type VariableFont = Extract<
	NonNullable<TYPEFACES_QUERY_RESULT[number]['variants']>[number],
	{ minWeight: number; maxWeight: number }
> & { type: 'variable' };

/**
 * Represents a typeface and its projected static or variable font variants.
 *
 * The GROQ query combines the selected Sanity font array into `variants` for
 * use by the application font CSS.
 */
export type Typeface = TYPEFACES_QUERY_RESULT[number];

/**
 * Represents an icon asset record with its identifier and default and active
 * image URLs.
 */
export type IconAsset = ICON_ASSETS_QUERY_RESULT[number];

/**
 * Represents the list of icon asset records returned by the GROQ query.
 *
 * Each record can be located by its stable Sanity identifier.
 */
export type IconAssetList = ICON_ASSETS_QUERY_RESULT;
