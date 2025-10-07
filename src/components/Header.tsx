// header component
import { NavLink } from "react-router-dom";
import type { FC } from "react";
import RoughBorder from "../libraries/RoughBorder.tsx";

type RouteItem = {
  path: string;
  label: string;
  title?: string;
};

const Header: FC = () => {
  const routes: RouteItem[] = [
    { path: "/games", label: "Games", title: "Explore my games!" },
    { path: "/music", label: "Music", title: "Pieces of my arts!" },
    { path: "/blogs", label: "Blogs", title: "Read my thoughts!" },
    { path: "/bio", label: "Bio", title: "Who I really am?" },
  ];

  return (
    <header className="z-10 w-full px-10 py-0 mt-7 mb-7 text-[#323237]">
      <div className="flex justify-between items-center text-2xl">
        {/* left section */}
        <div className="flex items-center gap-4">
          {/* the icon */}
          <NavLink to="/">
            <RoughBorder strokeWidth={2.5} isAnimatingWhenHovered={true} animFrame={150}>
              <img src="/header-icon.png" alt="bbeetlesam" className="h-12 w-12"/>
            </RoughBorder>
          </NavLink>
          {/* nav links */}
          <nav className="flex gap-3 text-[1.1rem] font-childlike leading-none">
            {routes.map(({ path, label, title }: RouteItem) => (
              <NavLink
                key={path}
                to={path}
                title={title}
                className={({ isActive }) => `hover:text-black${isActive ? " underline" : ""}`}
              >
                {label}
              </NavLink>
            ))}
          </nav>
        </div>

        {/* right section */}
        <div className="flex items-center gap-2 text-2xl">
          <a href="https://bbeetlesam.itch.io" target="_blank" rel="noopener noreferrer" title="My weird games.">
            <i className="fa-brands fa-itch-io hover:text-black"></i>
          </a>
          <a href="https://github.com/bbeetlesam" target="_blank" rel="noopener noreferrer" title="My chaos GitHub.">
            <i className="fa-brands fa-github hover:text-black"></i>
          </a>
          <a href="https://instagram.com/jstsams" target="_blank" rel="noopener noreferrer" title="Me. Simply me.">
            <i className="fa-brands fa-instagram hover:text-black"></i>
          </a>
        </div>
      </div>
    </header>
  );
}

export default Header;