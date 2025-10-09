// home component
import { useEffect } from "react";
import HomeGames from "./HomeGames";

function Home(){
  useEffect(() => {
    document.title = "bbeetlesam | Home";
  }, []);

  return (
    <main className="w-full">
      <HomeGames />
    </main>
  )
}

export default Home;