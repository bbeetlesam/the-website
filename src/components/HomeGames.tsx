import RoughBorder from "../libraries/RoughBorder";
import gamesData from "../../data/itch_games.json";
import { NavLink } from "react-router-dom";

type Game = {
  id: number;
  title: string;
  short_text?: string;
  cover_url?: string;
  url: string;
};

type GamesJson = { games: Game[] };

function HomeGames() {
  const games: Game[] = (gamesData as GamesJson).games || [];

  return (
    <section className="w-full">
      <RoughBorder
        strokeWidth={6}
        roughness={2}
        fill="#272727dd"
        roughOptions={{ hachureGap: 5.5, fillWeight: 4 }}
        className="block mx-6 mb-10"
      >
        <div className="px-6 py-8">
          <h2 className="font-bold mb-4">
            <NavLink to="/games" className="text-textDark hover:underline">Games</NavLink>
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {games.map((g) => (
              <RoughBorder key={g.id} stroke="#323237" strokeWidth={4} roughness={2} fill="rgba(255,0,200,0.2)" roughOptions={{ hachureGap: 5, fillStyle: "solid" }}>
                <article className="p-4 bg-transparent">
                {g.cover_url && (
                  <img src={g.cover_url} alt={g.title} className="w-full h-40 object-cover mb-3" />
                )}
                <h3 className="text-lg font-semibold">{g.title}</h3>
                {g.short_text && <p className="text-sm text-gray-600 mt-1">{g.short_text}</p>}
                <a href={g.url} target="_blank" rel="noopener noreferrer" className="text-sm text-blue-600 underline mt-2 inline-block">Play</a>
              </article>
            </RoughBorder>
            ))}
          </div>
        </div>
      </RoughBorder>
    </section>
  );
};

export default HomeGames;