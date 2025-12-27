// home component
import { useEffect } from "react";
import { NavLink } from "react-router-dom";
import RoughBorder from "../libraries/RoughBorder";
import BubbleLabel from "../libraries/BubbleLabel";
import { deskItems } from "../data/desk-items";

function Home() {
  useEffect(() => {
    document.title = "bbeetlesam";
  }, []);

  const deskSizeScale = 0.95;

  return (
    <RoughBorder
      className="h-full flex"
      roughOptions={{ stroke: "#22222200", strokeWidth: 3, roughness: 2 }}
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
              style={{
                top: `${topPercent}%`,
                left: `${leftPercent}%`,
                transform: 'translate(-50%, -50%)' // set the origin to 0.5,0.5 (center)
              }}
            >
              <BubbleLabel
                label={item.title || item.label}
                offsetY={-20}
                textColor="#1a1a1a"
                outlineSize={2}
                shadow="2px 10px 12px rgba(0, 0, 0, 0.4)"
              >
                <NavLink
                  to={item.path}
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
              </BubbleLabel>
            </div>
          );
        })}
      </div>
    </RoughBorder>
  )
}

export default Home;
