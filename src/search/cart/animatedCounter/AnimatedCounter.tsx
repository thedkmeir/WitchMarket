import { useEffect, useRef, useState } from "react";

export default function AnimatedCounter({
  value,
  duration = 500,
  rearDecorator = "",
}: {
  value: number;
  duration?: number;
  rearDecorator?: string;
}) {
  const [displayValue, setDisplayValue] = useState(value);
  const animationRef = useRef<number | null>(null);

  useEffect(() => {
    const start = performance.now();
    const from = displayValue; // Start from the currently displayed value
    const to = value;

    const step = (timestamp: number) => {
      const progress = Math.min((timestamp - start) / duration, 1);
      const current = from + (to - from) * progress;
      setDisplayValue(parseFloat(current.toFixed(2)));

      if (progress < 1) {
        animationRef.current = requestAnimationFrame(step);
      }
    };

    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
    }

    animationRef.current = requestAnimationFrame(step);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [value, duration]);

  return <span>{displayValue.toFixed(2) + rearDecorator}</span>;
}