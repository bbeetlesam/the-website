import type { SocialLink } from '$lib/types';

const SOCIAL_LINKS: SocialLink[] = [
	{
		href: 'mailto:bbeetlesam1968@gmail.com',
		title: 'Email me (what for?).',
		icon: 'fa-solid fa-envelope',
		featured: true
	},
	{
		href: 'https://github.com/bbeetlesam',
		title: 'My git-coded GitHub.',
		icon: 'fa-brands fa-github',
		featured: true
	},
	{
		href: 'https://bbeetlesam.itch.io',
		title: 'Them weird games.',
		icon: 'fa-brands fa-itch-io',
		featured: true
	},
	{
		href: 'https://www.linkedin.com/in/samudra-azriel-pradana-b48491321',
		title: 'Looking for a job.',
		icon: 'fa-brands fa-linkedin'
	},
	{
		href: 'https://instagram.com/jstsams',
		title: 'My boring Instagram.',
		icon: 'fa-brands fa-instagram',
		featured: true
	},
	{
		href: 'https://twitter.com/bbeetlesam',
		title: 'Not quite a Twitter/X.',
		icon: 'fa-brands fa-x-twitter'
	},
	{
		href: 'https://bbeetlesam.bsky.social',
		title: 'A very blue, Bluesky.',
		icon: 'fa-brands fa-bluesky'
	}
];

export { SOCIAL_LINKS };
