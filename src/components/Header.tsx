// header component

function Header() {
  return (
    <header className="w-screen px-8 py-4 flex justify-between items-center bg-bgLight">
      {/* left section */}
      <div className="flex items-center gap-6">
        <img
          src="/favicon.svg"
          alt="Logo"
          className="h-10 w-10 rounded-full"
        />
        <nav className="flex gap-4 text-lg font-childlike">
          <a href="#games" className="hover:underline">Games</a>
          <a href="#music" className="hover:underline">Music</a>
          <a href="#bio" className="hover:underline">Bio</a>
        </nav>
      </div>

      {/* right section */}
      <div className="flex items-center gap-4">
        <button
          className="p-2 rounded-full bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600"
          aria-label="Toggle Theme"
        >
          🌙
        </button>
      </div>
    </header>
  );
}

export default Header;