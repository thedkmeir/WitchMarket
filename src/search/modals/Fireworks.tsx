import { useEffect, useRef } from "react";
import { Fireworks } from "fireworks-js";

export default function FireworksBackdrop({ enabled = true }: { enabled?: boolean }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const fwRef = useRef<Fireworks | null>(null);

  useEffect(() => {
    if (enabled && containerRef.current) {
      if (!fwRef.current) {
        fwRef.current = new Fireworks(containerRef.current, {
          rocketsPoint: { min: 0, max: 100 },
          hue: { min: 210, max: 360 },
          delay: { min: 15, max: 30 },
          acceleration: 1.02,
          friction: 0.95,
          gravity: 1.5,
          particles: 55,
          explosion: 6,
        });
        fwRef.current.start();
      }
    } else {
      fwRef.current?.stop();
    }
    return () => {
      fwRef.current?.stop();
      fwRef.current = null;
    };
  }, [enabled]);

  return (
    <div
      ref={containerRef}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 99,
        pointerEvents: "none",
      }}
      aria-hidden="true"
    />
  );
}