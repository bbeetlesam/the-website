// General object types, such as Icon, Typeface, et cetera.
// By general, I mean general as it generic object type that you can possibly call it
// as 'stuff'. Tuff.

/**
 * Represents an icon.
 *
 * An Icon contains the default and active versions of the icon,
 * and may contain additional properties of the icon. (WIP)
 */
type Icon = {
	/** The default version of the icon. */
	default: string;
	/** The active version of the icon. */
	active: string;
};

/** Represents the style of a font (normal or italic). */
type FontStyle = 'normal' | 'italic';

/** Represents the type of a font (static or variable). */
// type FontType = 'static' | 'variable';

/**
 * Represents a static font.
 *
 * Contains the name, weight, style, and file of a variant of a static font
 * that will be used in the application CSS.
 */
type StaticFont = {
	/** The name of the static font (Regular, Bold, Italic, etc.). */
	name: string;
	/** The type of the font (static). */
	type: 'static';
	/** The weight of the static font. Ranges from 100 to 900. */
	weight: number;
	/** The style of the static font (normal or italic). */
	style: FontStyle;
	/** The file path of the static font. */
	file: string;
	/** The format of the static font (woff2, woff, etc.). */
	format: string;
};

/**
 * Represents a variable font.
 *
 * Contains the name, weight range, style, and file of a variable font
 * that will be used in the application CSS.
 */
type VariableFont = {
	/** The name of the variable font. */
	name: string;
	/** The type of the font (variable). */
	type: 'variable';
	/** The minimum weight of the variable font. */
	minWeight: number;
	/** The maximum weight of the variable font. */
	maxWeight: number;
	/** The style of the variable font (normal or italic). */
	style: FontStyle;
	/** The file path of the variable font. */
	file: string;
	/** The format of the variable font (woff2, woff, etc.). */
	format: string;
};

/**
 * Represents a Typeface.
 *
 * Contains the name, variantsType, and variants list of
 * {@link StaticFont} or {@link VariableFont} of
 * a Typeface that will be used in the application CSS.
 */
type Typeface =
	| {
			/** The name of the Typeface family. */
			name: string;
			/** The type of variants of the Typeface. */
			variantsType: 'static';
			/** The list of {@link StaticFont} variants of the Typeface. */
			variants: StaticFont[];
	  }
	| {
			/** The name of the Typeface family. */
			name: string;
			/** The type of variants of the Typeface. */
			variantsType: 'variable';
			/** The list of {@link VariableFont} variants of the Typeface. */
			variants: VariableFont[];
	  };

/**
 * Represents an Icon Asset.
 *
 * Contains an icon set with its identifier and variants of default and active icon.
 */
type IconAsset = {
	/** The identifier of the Icon Asset. */
	id: string;
	/** The icon set of the Icon Asset. */
	icon: Icon;
};

/**
 * Represents a list of Icon Assets.
 *
 * A {@link Record} of {@link IconAsset} indexed by their identifier.
 */
type IconAssetList = Record<string, IconAsset>;

export type { Icon, Typeface, StaticFont, VariableFont, IconAsset, IconAssetList };
