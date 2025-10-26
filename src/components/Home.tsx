// home component
import { useEffect } from "react";

function Home(){
  useEffect(() => {
    document.title = "bbeetlesam | Home";
  }, []);

  return (
    <main className="w-full flex-1 flex items-center justify-center">
      <div className="flex flex-col items-center gap-1">
        <p>hello darkness, my old friend</p>
        <p>ive come to talk with you again</p>
      </div>
    </main>
  )
}

export default Home;