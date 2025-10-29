import { useRef, useEffect, useState } from "react";
import type { ReactNode } from "react";
import rough from 'roughjs/bin/rough';

type RoughBorderProps = {
  children: ReactNode;
  className?: string;
  roughOptions?: Record<string, unknown>;
  refreshOnHover?: boolean;
  refreshSpeed?: number;
  whenHovered?: Record<string, unknown>; // rough options to apply on hover
  canvasScale?: number;
};

function RoughBorder({
  children,
  className = "",
  roughOptions = {},
  refreshOnHover = false,
  refreshSpeed = 300,
  whenHovered = {},
  canvasScale = 1,
}: RoughBorderProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [size, setSize] = useState({ width: 0, height: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [tick, setTick] = useState(0);
  const intervalRef = useRef<number | null>(null);

  // padding to prevent border clipping
  const strokeWidth = (roughOptions.strokeWidth as number) || 2;
  const padding = Math.ceil(strokeWidth * 2 + 4);

  // track size with ResizeObserver
  useEffect(() => {
    const el = wrapperRef.current;
    if (!el) return;

    const updateSize = () => {
      const rect = el.getBoundingClientRect();
      setSize({ width: Math.round(rect.width), height: Math.round(rect.height) });
    };

    updateSize();
    const observer = new ResizeObserver(updateSize);
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // hover animation logic
  useEffect(() => {
    const el = wrapperRef.current;
    if (!el || !refreshOnHover) return;

    const onEnter = () => {
      setIsHovered(true);
      if (intervalRef.current === null) {
        intervalRef.current = window.setInterval(
          () => setTick((t) => t + 1),
          Math.max(30, refreshSpeed)
        );
      }
    };

    const onLeave = () => {
      setIsHovered(false);
      if (intervalRef.current !== null) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };

    el.addEventListener('mouseenter', onEnter);
    el.addEventListener('mouseleave', onLeave);

    return () => {
      el.removeEventListener('mouseenter', onEnter);
      el.removeEventListener('mouseleave', onLeave);
      if (intervalRef.current !== null) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [refreshOnHover, refreshSpeed]);

  // draw the rough border
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !size.width || !size.height) return;

    const dpr = window.devicePixelRatio || 1;
    const canvasWidth = (size.width + padding * 2) * canvasScale;
    const canvasHeight = (size.height + padding * 2) * canvasScale;

    canvas.width = canvasWidth * dpr;
    canvas.height = canvasHeight * dpr;
    canvas.style.width = `${canvasWidth}px`;
    canvas.style.height = `${canvasHeight}px`;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.setTransform(dpr * canvasScale, 0, 0, dpr * canvasScale, 0, 0);
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);

    const rc = rough.canvas(canvas);
    
    const options = isHovered 
      ? { ...roughOptions, ...whenHovered }
      : { ...roughOptions };

    rc.rectangle(
      padding,
      padding,
      size.width,
      size.height,
      options
    );
  }, [size, roughOptions, whenHovered, isHovered, tick, padding, canvasScale]);

  // calculate offsets to center the scaled canvas
  const canvasWidth = (size.width + padding * 2) * canvasScale;
  const canvasHeight = (size.height + padding * 2) * canvasScale;
  const originalWidth = size.width + padding * 2;
  const originalHeight = size.height + padding * 2;
  const offsetX = (canvasWidth - originalWidth) / 2;
  const offsetY = (canvasHeight - originalHeight) / 2;

  return (
    <div ref={wrapperRef} className={`relative ${className}`} style={{ margin: 0, padding: 0 }}>
      <canvas
        ref={canvasRef}
        style={{
          position: "absolute",
          top: `${-padding - offsetY}px`,
          left: `${-padding - offsetX}px`,
          pointerEvents: "none",
        }}
      />
      <div style={{ position: "relative", zIndex: 1, width: "100%", height: "100%" }}>
        {children}
      </div>
    </div>
  );
}

export default RoughBorder;