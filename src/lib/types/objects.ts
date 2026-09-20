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

/**
 * Represents a variant of a Typeface.
 *
 * Contains the name, weight, style, and file of a variant of a Typeface that will
 * be used in the application CSS.
 */
type TypefaceVariant = {
	/** The name of the variant (Regular, Bold, Italic, etc.). */
	name: string;
	/** The weight of the variant. Ranges from 100 to 900. */
	weight: number;
	/** The style of the variant (normal or italic). */
	style: 'normal' | 'italic';
	/** The file path of the variant. */
	file: string;
	/** The format of the variant (woff2, woff, etc.). */
	format: string;
};

/**
 * Represents a Typeface.
 *
 * Contains the name and list of {@link TypefaceVariant} of a Typeface that will
 * be used in the application CSS.
 */
type Typeface = {
	/** The name of the Typeface family. */
	name: string;
	/** The list of variants of the Typeface. */
	variants: TypefaceVariant[];
};

export type { Icon, Typeface, TypefaceVariant };
