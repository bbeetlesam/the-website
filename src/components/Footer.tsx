import { FOOTER_TEXT, SOCIAL_LINKS } from "../data/text-contents";
import type { SocialLink } from "../types/common";

function Footer() {
  const socialLinks: SocialLink[] = SOCIAL_LINKS;

  return (
    <footer className="w-full px-10 py-5">
      <div className="flex flex-col md:flex-row justify-center md:justify-between items-center gap-4">
        {/* liner notes */}
        <div className="text-center sm:flex sm:flex-row sm:w-full sm:justify-between md:text-left md:w-auto md:flex-col">
          <p>&copy; {FOOTER_TEXT.copyright}</p>
          <p className="hidden sm:block">{FOOTER_TEXT.tagline}</p>
        </div>

        {/* social links */}
        <div className="hidden md:flex items-center gap-2 text-2xl">
          {socialLinks.map((link: SocialLink) => (
            <a key={link.href} href={link.href} target="_blank" rel="noopener noreferrer" title={link.title}>
              <i className={`${link.icon} hover:text-black`}></i>
            </a>
          ))}
        </div>
      </div>
    </footer>
  )
}

export default Footer;
