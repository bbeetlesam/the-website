import { z } from 'zod';
import type {
	DESKS_QUERY_RESULT,
	FEATURED_GAME_LINKS_QUERY_RESULT,
	ICON_ASSETS_QUERY_RESULT,
	PAGE_LINKS_QUERY_RESULT,
	SOCIAL_LINKS_QUERY_RESULT,
	TYPEFACES_QUERY_RESULT,
	FocusFrame
} from './sanity.types';

const iconSchema = z
	.object({
		default: z.string().nullable(),
		active: z.string().nullable()
	})
	.strict();

const pageLinkSchema = z
	.object({
		type: z.literal('page-link'),
		id: z.string(),
		title: z.string(),
		desc: z.string(),
		icon: iconSchema
	})
	.strict();

const fontFormatSchema = z.enum(['opentype', 'truetype', 'woff', 'woff2']);
const fontStyleSchema = z.enum(['normal', 'italic']);

const staticFontVariantSchema = z
	.object({
		name: z.string(),
		type: z.literal('static'),
		weight: z.number(),
		style: fontStyleSchema,
		file: z.string().nullable(),
		format: fontFormatSchema
	})
	.strict();

const variableFontVariantSchema = z
	.object({
		name: z.string(),
		type: z.literal('variable'),
		minWeight: z.number(),
		maxWeight: z.number(),
		style: fontStyleSchema,
		file: z.string().nullable(),
		format: fontFormatSchema
	})
	.strict();

const staticTypefaceSchema = z
	.object({
		name: z.string(),
		variantsType: z.literal('static'),
		variants: z.array(staticFontVariantSchema).nullable()
	})
	.strict();

const variableTypefaceSchema = z
	.object({
		name: z.string(),
		variantsType: z.literal('variable'),
		variants: z.array(variableFontVariantSchema).nullable()
	})
	.strict();

const typefaceSchema = z.discriminatedUnion('variantsType', [
	staticTypefaceSchema,
	variableTypefaceSchema
]);

const iconAssetSchema = z
	.object({
		id: z.string(),
		icon: iconSchema
	})
	.strict();

const socialLinkSchema = z
	.object({
		type: z.literal('social-link'),
		id: z.string(),
		href: z.string(),
		title: z.string().nullable(),
		desc: z.string().nullable(),
		icon: iconSchema
	})
	.strict();

const featuredGameLinkSchema = z
	.object({
		type: z.literal('social-link'),
		id: z.string(),
		href: z.string(),
		title: z.string().nullable(),
		desc: z.string().nullable(),
		genre: z.string().nullable(),
		platforms: z.array(z.string()).nullable(),
		icon: iconSchema,
		screenshot: z.string().nullable()
	})
	.strict();

const focusFrameSchema: z.ZodType<FocusFrame> = z
	.object({
		_type: z.literal('focus-frame'),
		size: z.number().optional(),
		cornerSize: z.number().optional(),
		cornerThickness: z.number().optional(),
		edgeOffset: z.number().optional()
	})
	.strict();

const pageNavigationSchema = z
	.object({
		type: z.literal('page-link'),
		id: z.string(),
		title: z.string(),
		desc: z.string(),
		icon: iconSchema
	})
	.strict();

const socialNavigationSchema = z
	.object({
		type: z.literal('social-link'),
		id: z.string(),
		href: z.string(),
		title: z.string().nullable(),
		desc: z.string().nullable(),
		icon: iconSchema
	})
	.strict();

const deskItemSchema = z
	.object({
		id: z.string(),
		icon: iconSchema,
		imageAlt: z.string().nullable(),
		x: z.number(),
		y: z.number(),
		size: z.number(),
		rotation: z.number().nullable(),
		navigation: z
			.discriminatedUnion('type', [pageNavigationSchema, socialNavigationSchema])
			.nullable(),
		interactionEffect: z.enum(['none', 'focus-frame']).nullable(),
		focusFrame: focusFrameSchema.nullable()
	})
	.strict();

const deskSchema = z
	.object({
		id: z.string(),
		size: z
			.object({
				width: z.number(),
				height: z.number()
			})
			.strict(),
		items: z.array(deskItemSchema)
	})
	.strict();

export const pageLinksSchema = z.array(
	pageLinkSchema
) satisfies z.ZodType<PAGE_LINKS_QUERY_RESULT>;
export const typefacesSchema = z.array(
	typefaceSchema
) satisfies z.ZodType<TYPEFACES_QUERY_RESULT>;
export const iconAssetsSchema = z.array(
	iconAssetSchema
) satisfies z.ZodType<ICON_ASSETS_QUERY_RESULT>;
export const socialLinksSchema = z.array(
	socialLinkSchema
) satisfies z.ZodType<SOCIAL_LINKS_QUERY_RESULT>;
export const featuredGameLinksSchema = z.array(
	featuredGameLinkSchema
) satisfies z.ZodType<FEATURED_GAME_LINKS_QUERY_RESULT>;
export const desksSchema = z.array(deskSchema) satisfies z.ZodType<DESKS_QUERY_RESULT>;

/** Validate a Sanity query response and identify the query when its shape is invalid */
export function validateSanityResult<TSchema extends z.ZodType>(
	queryName: string,
	schema: TSchema,
	data: unknown
): z.output<TSchema> {
	const result = schema.safeParse(data);

	if (!result.success) {
		throw new Error(
			`Sanity query ${queryName} returned data that does not match its expected shape:\n${z.prettifyError(result.error)}`
		);
	}

	return result.data;
}
