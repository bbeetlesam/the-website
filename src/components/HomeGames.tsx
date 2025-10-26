import { NavLink } from "react-router-dom";
import { useState, useEffect, useCallback } from "react";
import RoughBorder from "../libraries/RoughBorder";
import gamesData from "../../data/itch_games.json";

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
  const [currentIndex, setCurrentIndex] = useState(0);
  const [cardsPerView, setCardsPerView] = useState(3);

  // Responsive cards per view
  useEffect(() => {
    const updateCardsPerView = () => {
      if (window.innerWidth < 640) setCardsPerView(1); // mobile
      else if (window.innerWidth < 1024) setCardsPerView(2); // tablet
      else setCardsPerView(3); // desktop
    };
    updateCardsPerView();
    window.addEventListener('resize', updateCardsPerView);
    return () => window.removeEventListener('resize', updateCardsPerView);
  }, []);

  const totalCards = games.length;
  const maxIndex = Math.max(0, totalCards - cardsPerView);

  const handlePrev = useCallback(() => {
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : maxIndex));
  }, [maxIndex]);

  const handleNext = useCallback(() => {
    setCurrentIndex((prev) => (prev < maxIndex ? prev + 1 : 0));
  }, [maxIndex]);

  // Keyboard navigation
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') handlePrev();
      if (e.key === 'ArrowRight') handleNext();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [handlePrev, handleNext]);

  return (
    <section className="w-full">
      <RoughBorder
        strokeWidth={5}
        roughness={2}
        fill="#fff3c466"
        roughOptions={{ fillStyle: "solid", bowing: 0.8 }}
        className="block mx-6 mb-10"
      >
        <div className="px-6 py-8">
          {/* title */}
          <div>
            <h2 className="font-bold mb-4">
              <NavLink to="/games" className="text-textDark hover:underline">Arcade Oddities</NavLink>
            </h2>
          </div>

          {/* Carousel container */}
          <div className="relative">
            {/* Left arrow */}
            <button
              onClick={handlePrev}
              aria-label="Previous games"
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 bg-white rounded-full p-2 shadow-lg hover:bg-gray-100 transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            {/* Cards viewport with overflow hidden */}
            <div className="overflow-hidden">
              <div
                className="flex transition-transform duration-500 ease-in-out gap-6"
                style={{ transform: `translateX(-${currentIndex * (100 / cardsPerView)}%)` }}
              >
                {games.map((g) => (
                  <div
                    key={g.id}
                    className="flex-shrink-0 mx-auto"
                    style={{ 
                      width: `calc((100% - ${(cardsPerView - 1) * 1.5}rem) / ${cardsPerView})`,
                      maxWidth: '315px'
                    }}
                  >
                    <RoughBorder
                      stroke="#323237"
                      strokeWidth={4}
                      roughness={2}
                      fill="rgba(255,0,200,0.5)"
                      roughOptions={{ hachureGap: 5, fillStyle: "solid" }}
                    >
                      <article className="p-4 bg-transparent">
                        {g.cover_url && (
                          <img 
                            src={g.cover_url} 
                            alt={g.title} 
                            className="w-full mb-3 object-cover" 
                            style={{ aspectRatio: '315 / 250' }}
                          />
                        )}
                        <h3 className="text-lg font-semibold mb-2">
                          <a
                            href={g.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:underline"
                          >
                            {g.title}
                          </a>
                        </h3>
                        {g.short_text && <p className="text-sm text-gray-600">{g.short_text}</p>}
                      </article>
                    </RoughBorder>
                  </div>
                ))}
              </div>
            </div>

            {/* Right arrow */}
            <button
              onClick={handleNext}
              aria-label="Next games"
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 bg-white rounded-full p-2 shadow-lg hover:bg-gray-100 transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>

          {/* Optional: indicator dots */}
          <div className="flex justify-center gap-2 mt-4">
            {Array.from({ length: maxIndex + 1 }).map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                aria-label={`Go to slide ${idx + 1}`}
                className={`w-2 h-2 rounded-full transition-colors ${
                  idx === currentIndex ? 'bg-gray-800' : 'bg-gray-300'
                }`}
              />
            ))}
          </div>
        </div>
      </RoughBorder>
    </section>
  );
}

export default HomeGames;