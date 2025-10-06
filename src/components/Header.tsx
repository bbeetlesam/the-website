// header component
import { NavLink } from "react-router-dom";

function Header() {
  return (
    <header className="z-10 w-full px-10 py-0 mt-7 mb-7">
      <div className="flex justify-between items-center text-2xl">
        {/* left section */}
        <div className="flex items-center gap-4">
          {/* the icon */}
          <NavLink to="/">
            <img src="/header-icon.png" alt="bbeetlesam" className="h-12 w-12"/>
          </NavLink>
          {/* nav link */}
          <nav className="flex gap-3 text-[1.1rem] font-childlike">
            <NavLink to="/games" title="Explore my games!"
              className={({ isActive }) =>
                `hover:text-black${isActive ? " underline" : ""}`
              }
            > Games
            </NavLink>
            <NavLink to="/music" title="Pieces of my arts!"
              className={({ isActive }) =>
                `hover:text-black${isActive ? " underline" : ""}`
              }
            > Music
            </NavLink>
            <NavLink to="/bio" title="Who am I?"
              className={({ isActive }) =>
                `hover:text-black${isActive ? " underline" : ""}`
              }
            > Bio
            </NavLink>
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