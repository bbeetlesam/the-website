// footer component
type SocialLink = {
  href: string;
  title?: string;
  icon: string;
};

function Footer(){
  const socialLinks: SocialLink[] = [
    { href: "mailto:your-email@example.com", title: "Email me.", icon: "fa-solid fa-envelope" },
    { href: "https://github.com/bbeetlesam", title: "My chaos GitHub.", icon: "fa-brands fa-github" },
    { href: "https://bbeetlesam.itch.io", title: "My weird games.", icon: "fa-brands fa-itch-io" },
    { href: "https://www.linkedin.com/in/yourprofile", title: "My LinkedIn.", icon: "fa-brands fa-linkedin" },
    { href: "https://instagram.com/jstsams", title: "My unpopular Instagram.", icon: "fa-brands fa-instagram" },
    { href: "https://twitter.com/yourhandle", title: "My Twitter/X.", icon: "fa-brands fa-x-twitter" },
    { href: "https://bsky.app/profile/yourhandle.bsky.social", title: "My Bluesky.", icon: "fa-brands fa-bluesky" },
  ];

  return (
    <footer className="w-full px-10 py-5">
      <div className="flex flex-col md:flex-row justify-center md:justify-between items-center gap-4">
        {/* left part */}
        <div className="text-center md:text-left">
          <p>&copy; bbeetlesam 2025.</p>
          <p>Keep in weird time and stay progressive.</p>
        </div>
        
        {/* right part */}
        <div className="flex items-center gap-3 text-2xl">
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