// header component
import { NavLink } from "react-router-dom";
import type { FC } from "react";
import RoughBorder from "../libraries/RoughBorder.tsx";
import headerIcon from "../assets/header-icon.png";

type RouteItem = {
  path: string;
  label: string;
  title?: string;
};

type SocialLink = {
  href: string;
  title?: string;
  icon: string;
};

const Header: FC = () => {
  const routes: RouteItem[] = [
    { path: "/games", label: "Games", title: "Explore my games!" },
    { path: "/arts", label: "Arts", title: "Pieces of my arts!" },
    { path: "/blogs", label: "Blogs", title: "Read my thoughts!" },
    { path: "/bio", label: "Bio", title: "Who am I really?" },
  ];

  const socialLinks: SocialLink[] = [
    { href: "https://bbeetlesam.itch.io", title: "My weird games.", icon: "fa-brands fa-itch-io" },
    { href: "https://github.com/bbeetlesam", title: "My chaos GitHub.", icon: "fa-brands fa-github" },
    { href: "https://instagram.com/jstsams", title: "My unpopular Instagram.", icon: "fa-brands fa-instagram" },
  ];

  return (
    <header className="z-10 w-full px-10 py-0 mt-7 mb-7 text-[#323237]">
      <div className="flex justify-between items-center text-2xl">
        {/* left section */}
        <div className="flex items-center gap-4">
          {/* the icon */}
          <NavLink to="/">
            <RoughBorder strokeWidth={2.5} isAnimatingWhenHovered={true} animFrame={250}
              fill="rgba(50,39,39,0.02)" hoverColor="black" roughOptions={{ bowing: 1.5 }}
            >
              <img src={headerIcon} alt="bbeetlesam" className="h-12 w-12"/>
            </RoughBorder>
          </NavLink>
          {/* nav links on desktop */}
          <nav className="hidden md:flex gap-3 text-[1.1rem] leading-none">
            {routes.map((route: RouteItem) => (
              <NavLink
                key={route.path}
                to={route.path}
                title={route.title}
                className={({ isActive }) => `hover:text-black${isActive ? " underline" : ""}`}
              >
                {route.label}
              </NavLink>
            ))}
          </nav>
          {/* hamburger button on mobile */}
          <button className="md:hidden p-2 rounded" aria-label="Open menu">
            <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
              <line x1="0" y1="5" x2="24" y2="5" />
              <line x1="0" y1="12" x2="24" y2="12" />
              <line x1="0" y1="19" x2="24" y2="19" />
            </svg>
          </button>
        </div>

        {/* right section */}
        <div className="flex items-center gap-2 text-2xl">
          {socialLinks.map((link: SocialLink) => (
            <a key={link.href} href={link.href} target="_blank" rel="noopener noreferrer" title={link.title}>
              <i className={`${link.icon} hover:text-black`}></i>
            </a>
          ))}
        </div>
      </div>
    </header>
  );
}

export default Header;