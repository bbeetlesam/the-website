// home component
import { useEffect } from "react";
import { NavLink } from "react-router-dom";
import RoughBorder from "../libraries/RoughBorder";
import { deskItems } from "../data/desk-items";

function Home(){
  useEffect(() => {
    document.title = "bbeetlesam";
  }, []);

  const deskSizeScale = 0.95;

  return (
    <RoughBorder 
      className="h-full flex" 
      roughOptions={{ stroke: "#222222", strokeWidth: 3, roughness: 2 }}
      canvasScale={deskSizeScale}
    >
      <div className="relative w-full h-full">
        {/* desk items */}
        {deskItems.map((item) => {
          const topPercent = item.position.top;
          const leftPercent = item.position.left;

          return (
            <div
              key={item.path}
              className="absolute"
              style={{ top: `${topPercent}%`, left: `${leftPercent}%` }}
            >
              <NavLink
                to={item.path}
                title={item.title}
                className="block hover:z-10"
                style={{ willChange: 'transform' }}
              >
                <img
                  src={item.image}
                  alt={item.label}
                  style={{ width: `${item.size}px`, height: `${item.size}px`, transform: `rotate(${item.rotation || 0}deg)` }}
                  className="object-cover"
                />
              </NavLink>
            </div>
          );
        })}
      </div>
    </RoughBorder>
  )
}

export default Home;