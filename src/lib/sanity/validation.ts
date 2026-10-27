import { z } from 'zod';
export {
	desksQueryResultSchema as desksSchema,
	featuredGameLinksQueryResultSchema as featuredGameLinksSchema,
	iconAssetsQueryResultSchema as iconAssetsSchema,
	pageLinksQueryResultSchema as pageLinksSchema,
	socialLinksQueryResultSchema as socialLinksSchema,
	typefacesQueryResultSchema as typefacesSchema
} from './sanity.zod';

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
