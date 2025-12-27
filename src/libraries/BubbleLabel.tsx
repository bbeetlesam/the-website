// originally used for Home page
import { useState, type ReactNode } from "react";

type BubbleLabelProps = {
  label: string;
  children: ReactNode;
  className?: string;
  offsetX?: number; // in pixels
  offsetY?: number;
  bubbleColor?: string;
  textColor?: string;
  outlineSize?: number; // in pixels
  outlineColor?: string;
  borderRadius?: string;
  shadow?: string;
};

function BubbleLabel({
  label,
  children,
  className = "",
  offsetX = 0,
  offsetY = 0,
  bubbleColor = "#fdfbf6",
  textColor = "#32312e",
  outlineSize = 0,
  outlineColor = "#32312e",
  borderRadius = "12px",
  shadow,
}: BubbleLabelProps) {
  const [isHovered, setIsHovered] = useState(false);

  // calculate transform for slide animation
  const baseOffset = "0.5rem";
  const slideUpOffset = "-0.25rem";
  const transformY = isHovered
    ? `calc(${baseOffset} + ${offsetY}px)`
    : `calc(${baseOffset} + ${offsetY}px + ${slideUpOffset})`;
  const transformX = `calc(-50% + ${offsetX}px)`;

  const triangleSize = 7;
  const outerTriangleSize = triangleSize + outlineSize;
  const innerTriangleSize = triangleSize;

  const defaultShadow = "2px 10px 12px rgba(0, 0, 0, 0.4)";

  const buildBoxShadow = () => {
    const dropShadow = shadow || defaultShadow;
    if (outlineSize > 0) {
      return `0 0 0 ${outlineSize}px ${outlineColor}, ${dropShadow}`;
    }
    return dropShadow;
  };

  return (
    <div
      className={`relative inline-block ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {children}

      {/* bubble tooltip */}
      <div
        className={`
          absolute left-1/2 top-full
          px-2.5 py-1 whitespace-nowrap
          pointer-events-none transition-all duration-200 z-50
          ${isHovered ? "opacity-100" : "opacity-0"}
        `}
        style={{
          backgroundColor: bubbleColor,
          color: textColor,
          borderRadius: `${borderRadius}`,
          boxShadow: buildBoxShadow(),
          transform: `translate(${transformX}, ${transformY})`,
        }}
      >
        {label}

        {/* outer triangle (outline) */}
        {outlineSize > 0 && (
          <div
            className="absolute left-1/2 bottom-full w-0 h-0"
            style={{
              borderLeft: `${outerTriangleSize}px solid transparent`,
              borderRight: `${outerTriangleSize}px solid transparent`,
              borderBottom: `${outerTriangleSize}px solid ${outlineColor}`,
              transform: `translate(calc(-50% - ${offsetX}px), -0.3px)`,
            }}
          />
        )}

        {/* inner triangle (bubble color) */}
        <div
          className="absolute left-1/2 bottom-full w-0 h-0"
          style={{
            borderLeft: `${innerTriangleSize}px solid transparent`,
            borderRight: `${innerTriangleSize}px solid transparent`,
            borderBottom: `${innerTriangleSize}px solid ${bubbleColor}`,
            transform: `translate(calc(-50% - ${offsetX}px), 0.5px)`,
          }}
        />
      </div>
    </div>
  );
}

export default BubbleLabel;
