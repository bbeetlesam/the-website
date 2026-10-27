import { defineConfig } from 'sanity';
import { loadEnv } from 'vite';
import { schemaTypes } from '@bbeetlesam/website-sanity-schema';

const env = loadEnv(process.env.NODE_ENV ?? 'development', process.cwd(), 'PUBLIC_');
const projectId = env.PUBLIC_SANITY_PROJECT_ID;
const dataset = env.PUBLIC_SANITY_DATASET;

if (!projectId || !dataset) {
	throw new Error(
		'Missing PUBLIC_SANITY_PROJECT_ID or PUBLIC_SANITY_DATASET for Sanity schema extraction.'
	);
}

// Registers the published schema package for local Sanity CLI extraction
export default defineConfig({
	name: 'frontend-typegen',
	title: "Website's Frontend TypeGen",
	projectId,
	dataset,
	schema: {
		types: schemaTypes
	}
});
