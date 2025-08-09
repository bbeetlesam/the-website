// draws a line with the length of the div parent using rough.js
import { useEffect, useRef } from "react";
import rough from "roughjs/bin/rough";

function RoughLine() {
  const ref = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!ref.current) return;

    const drawLine = () => {
      if (!ref.current) return;

      const rc = rough.svg(ref.current);
      const centerY = 10 / 2;

      const node = rc.line(
        0,
        centerY,
        ref.current.clientWidth,
        centerY,
        {
          stroke: "#272727",
          strokeWidth: 3,
          roughness: 8,
          bowing: 0,
          disableMultiStroke: false,
          fillStyle: "zigzag",
        }
      );

      ref.current.innerHTML = "";
      ref.current.appendChild(node);
    };

    // init draw
    drawLine();

    // check resize
    const resizeObserver = new ResizeObserver(drawLine);
    resizeObserver.observe(ref.current);

    // cleanup
    return () => resizeObserver.disconnect();
  }, []);

  return (
    <svg
      ref={ref}
      width="100%"
      height="10"
      style={{ display: "block", margin: "0 auto" }}
      aria-hidden="true"
    />
  );
}

export default RoughLine;