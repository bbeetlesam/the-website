import { NavLink } from "react-router-dom";
import { FOOTER_TEXT } from "../../data/text-contents";

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

interface MobileDropdownProps {
  isOpen: boolean;
  routes: RouteItem[];
  socialLinks: SocialLink[];
  onClose: () => void;
}

export default function MobileDropdown({ isOpen, routes, socialLinks, onClose }: MobileDropdownProps) {
  return (
    <div
      className={`
        md:hidden fixed left-0 right-0 bottom-0 bg-bgLight z-40
        transition-all duration-300 ease-in-out
        ${isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4 pointer-events-none'}
      `}
      style={{
        top: 0,
        height: '100vh',
        overflowY: 'auto',
        paddingLeft: 'clamp(1.5rem, 5vw, 2.5rem)',
        paddingRight: 'clamp(1.5rem, 5vw, 2.5rem)',
      }}
    >
      <div className="pb-6" style={{ paddingTop: 'var(--header-bottom, var(--header-height, 0px))' }}>
        {/* nav links */}
        <nav className="flex flex-col gap-3 pt-6 mb-6">
          {routes.map((route: RouteItem) => (
            <NavLink
              key={route.path}
              to={route.path}
              title={route.title}
              onClick={onClose}
              className={({ isActive }) =>
                [
                  'group text-xl px-3 py-2 rounded-md transition-colors cursor-pointer',
                  'hover:bg-black/10 hover:text-black',
                  'focus:bg-black/20 focus:text-black',
                  'active:bg-black/20 active:text-black',
                  isActive ? 'bg-black/20 text-black' : 'text-inherit',
                ].join(' ')
              }
            >
              {({ isActive }) => (
                <>
                  {route.label}
                  {route.title && (
                    <span className={isActive ? 'inline' : 'hidden group-hover:inline'}> — {route.title}</span>
                  )}
                </>
              )}
            </NavLink>
          ))}
        </nav>

        {/* social links */}
        <div className="flex items-center gap-4 text-3xl px-2">
          {socialLinks.map((link: SocialLink) => (
            <a
              key={link.href}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              title={link.title}
              className="hover:text-black transition-colors"
            >
              <i className={link.icon}></i>
            </a>
          ))}
        </div>

        {/* footer text at end of dropdown */}
        <div className="mt-6 px-3 text-left text-xs text-inherit">
          <p>&copy; {FOOTER_TEXT.copyright}</p>
          <p>{FOOTER_TEXT.tagline}</p>
        </div>
      </div>
    </div>
  );
}
