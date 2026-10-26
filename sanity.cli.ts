import { defineCliConfig } from 'sanity/cli';

// Configures Sanity CLI TypeGen input paths and generated type output
export default defineCliConfig({
	typegen: {
		path: './src/**/*.{ts,tsx,js,jsx,svelte}',
		schema: './.sanity/schema.json',
		generates: './src/lib/sanity/sanity.types.ts',
		overloadClientMethods: false
	}
});
