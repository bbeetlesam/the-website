// home component
import { useEffect } from "react";
import RoughBorder from "../libraries/RoughBorder";

function Home(){
  useEffect(() => {
    document.title = "bbeetlesam | Home";
  }, []);

  return (
    <RoughBorder className="flex-1 flex items-center justify-center" strokeWidth={3} roughness={2}>
      <div className="flex flex-col items-center justify-center gap-1">
        <p>hello darkness, my old friend</p>
        <p>ive come to talk with you again</p>
      </div>
    </RoughBorder>
  )
}

export default Home;