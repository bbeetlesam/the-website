import { createClient, SanityClient } from '@sanity/client';

export const client: SanityClient = createClient({
	projectId: '55meutke',
	dataset: 'production',
	apiVersion: '2026-03-01',
	useCdn: true
});
