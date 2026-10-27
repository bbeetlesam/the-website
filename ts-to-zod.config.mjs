// Generates runtime validators for every TypeGen GROQ result alias, and
// FocusFrame is included because DESKS_QUERY_RESULT references it
/** @type {import('ts-to-zod').TsToZodConfig} */
export default [
	{
		name: 'sanity-query-results',
		input: 'src/lib/sanity/sanity.types.ts',
		output: 'src/lib/sanity/sanity.zod.ts',
		nameFilter: (name) => name.endsWith('_QUERY_RESULT') || name === 'FocusFrame'
	}
];
