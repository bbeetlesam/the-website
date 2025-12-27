import type { RouteItem, SocialLink } from "../types/common";

// navigation routes
const NAV_ROUTES: RouteItem[] = [
  { path: "/games", label: "Games", title: "Strange, arcade oddities." },
  { path: "/oddworks", label: "Oddworks", title: "Other strange projects." },
  { path: "/arts", label: "Arts", title: "Pieces of my arts." },
  { path: "/blogs", label: "Blogs", title: "The thoughts of my mind." },
  { path: "/bio", label: "Bio", title: "Who am I really?" },
];

// social links
const SOCIAL_LINKS: SocialLink[] = [
  { href: "mailto:bbeetlesam1968@gmail.com", title: "Email me (what for?).", icon: "fa-solid fa-envelope" },
  { href: "https://github.com/bbeetlesam", title: "My git GitHub.", icon: "fa-brands fa-github", featuredInHeader: true },
  { href: "https://bbeetlesam.itch.io", title: "My weird games.", icon: "fa-brands fa-itch-io", featuredInHeader: true },
  { href: "https://www.linkedin.com/in/samudra-azriel-pradana-b48491321", title: "Looking for a job.", icon: "fa-brands fa-linkedin" },
  { href: "https://instagram.com/jstsams", title: "My boring Instagram.", icon: "fa-brands fa-instagram", featuredInHeader: true },
  { href: "https://twitter.com/bbeetlesam", title: "My quiet Twitter.", icon: "fa-brands fa-x-twitter" },
  { href: "https://bbeetlesam.bsky.social", title: "My blue Bluesky.", icon: "fa-brands fa-bluesky" },
];

// footer texts
const FOOTER_TEXT = {
  copyright: "bbeetlesam 2025.",
  tagline: "The crux of the biscuit is the creator.",
};

export { NAV_ROUTES, SOCIAL_LINKS, FOOTER_TEXT };
