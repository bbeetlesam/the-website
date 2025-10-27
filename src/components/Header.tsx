// header component
import { NavLink } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import RoughBorder from "../libraries/RoughBorder.tsx";
import MobileDropdown from "./MobileDropdown";
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

function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);

  // expose header height and bottom as css variables
  useEffect(() => {
    const updateHeaderMetrics = () => {
      const el = headerRef.current;
      if (!el) return;
      const height = el.offsetHeight;
      const rect = el.getBoundingClientRect();
      document.documentElement.style.setProperty('--header-height', `${height}px`);
      document.documentElement.style.setProperty('--header-bottom', `${rect.bottom}px`);
    };

    updateHeaderMetrics();
    window.addEventListener('resize', updateHeaderMetrics);
    window.addEventListener('scroll', updateHeaderMetrics, { passive: true });
    return () => {
      window.removeEventListener('resize', updateHeaderMetrics);
      window.removeEventListener('scroll', updateHeaderMetrics);
    };
  }, []);

  const routes: RouteItem[] = [
    { path: "/games", label: "Games", title: "Explore my games!" },
    { path: "/oddworks", label: "Oddworks", title: "My other projects!" },
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
    <>
      <header 
        ref={headerRef}
        className="relative z-50 w-full py-0 text-[#323237]"
        style={{
        paddingLeft: 'clamp(1.5rem, 5vw, 2.5rem)',
        paddingRight: 'clamp(1.5rem, 5vw, 2.5rem)',
        marginTop: 'clamp(1.5rem, 3vw, 1.75rem)',
        marginBottom: 'clamp(1.5rem, 3vw, 1.75rem)',
      }}
    >
      <div className="flex justify-between items-center text-2xl">
        {/* left section (hamburger on mobile, icon+nav on desktop) */}
        <div className="flex items-center gap-4">
          {/* hamburger button on mobile */}
          <button 
            className="md:hidden p-2 rounded relative z-50" 
            aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <div className="w-6 h-6 relative flex items-center justify-center">
              <span 
                className={`absolute h-0.5 w-6 bg-[#323237] transition-all duration-300 ease-out ${
                  isMobileMenuOpen ? 'rotate-45' : '-translate-y-2'
                }`}
              />
              <span 
                className={`absolute h-0.5 w-6 bg-[#323237] transition-all duration-300 ease-out ${
                  isMobileMenuOpen ? 'opacity-0' : ''
                }`}
              />
              <span 
                className={`absolute h-0.5 w-6 bg-[#323237] transition-all duration-300 ease-out ${
                  isMobileMenuOpen ? '-rotate-45' : 'translate-y-2'
                }`}
              />
            </div>
          </button>

          {/* desktop icon (hidden on mobile) */}
          <NavLink to="/" className="hidden md:block" title="Um, Sam?" onClick={() => setIsMobileMenuOpen(false)}>
            <RoughBorder 
              refreshOnHover={true} 
              refreshSpeed={250}
              roughOptions={{ 
                strokeWidth: 2.5,
                bowing: 1.5,
                stroke: "#323237"
              }}
              whenHovered={{ stroke: "black" }}
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
        </div>

        {/* right section */}
        <div className="flex items-center gap-2 text-2xl">
          {/* social links only on desktop */}
          <div className="hidden md:flex items-center gap-2">
            {socialLinks.map((link: SocialLink) => (
              <a key={link.href} href={link.href} target="_blank" rel="noopener noreferrer" title={link.title}>
                <i className={`${link.icon} hover:text-black`}></i>
              </a>
            ))}
          </div>

          {/* mobile icon on the right (hidden on desktop) */}
          <NavLink to="/" className="md:hidden" onClick={() => setIsMobileMenuOpen(false)}>
            <RoughBorder 
              refreshOnHover={true} 
              refreshSpeed={250}
              roughOptions={{ 
                strokeWidth: 2.5,
                fill: "rgba(50,39,39,0.02)",
                bowing: 1.5,
                stroke: "#323237"
              }}
              whenHovered={{ stroke: "black" }}
            >
              <img src={headerIcon} alt="bbeetlesam" className="h-11 w-11"/>
            </RoughBorder>
          </NavLink>
        </div>
      </div>

    </header>

    <MobileDropdown 
      isOpen={isMobileMenuOpen}
      routes={routes}
      socialLinks={socialLinks}
      onClose={() => setIsMobileMenuOpen(false)}
    />
    </>
  );
}

export default Header;