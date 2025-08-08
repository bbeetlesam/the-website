// draws a line with the length of the div parent using rough.js
import { useEffect, useRef } from "react";
import rough from "roughjs/bin/rough";

function RoughLine() {
  const ref = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (ref.current) {
      const rc = rough.svg(ref.current);
      const centerY = 6 / 2;
      const node = rc.line(0, centerY, ref.current.clientWidth, centerY, {
        stroke: "#272727",
        strokeWidth: 3,
        roughness: 1,
      });
      ref.current.innerHTML = "";
      ref.current.appendChild(node);
    }
  }, []);

  return (
    <svg
      ref={ref}
      width="100%"
      height="6"
      style={{ display: "block", margin: "0 auto" }}
      aria-hidden="true"
    />
  );
}

export default RoughLine;