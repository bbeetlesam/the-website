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

export type { Icon };
