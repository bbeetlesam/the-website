// home component
import { useEffect } from "react";
import HomeHero from "./HomeHero";
import HomeGames from "./HomeGames";

function Home(){
  useEffect(() => {
    document.title = "bbeetlesam | Home";
  }, []);

  return (
    <main className="w-full">
      <HomeHero />
      <HomeGames />
    </main>
  )
}

export default Home;