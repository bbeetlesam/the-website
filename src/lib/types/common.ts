type RouteItem = {
	path: string;
	label: string;
	title: string;
};

type SocialLink = {
	href: string;
	title: string;
	icon: string;
	featured?: boolean;
};

export type { RouteItem, SocialLink };
