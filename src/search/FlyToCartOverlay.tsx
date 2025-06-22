import { useEffect } from "react";
import { motion } from "framer-motion";
import { FlyPayload } from "./FlyToCartContext";

export default function FlyToCartOverlay({
  fly,
  clearFly,
}: {
  fly: FlyPayload | null;
  clearFly: () => void;
}) {
  useEffect(() => {
    if (!fly) return;
    // Clean up after animation duration
    const timer = setTimeout(() => {
      clearFly();
      fly.onComplete?.();
    }, 1000); // duration must match transition below
    return () => clearTimeout(timer);
  }, [fly, clearFly]);

  if (!fly) return null;

  const { image, from, to, toComp } = fly;

  let top = 0;
  let left = 0;

  if (toComp === "icon") {
    top = to.top;
    left = to.left - from.width / 2;
  } else if (toComp === "panel") {
    top = to.top + (to.height * 0.85);
    left = to.left - from.width / 2 + to.width / 2;
  }

  return (
    <motion.img
      src={image}
      alt=""
      style={{
        position: "fixed",
        top: from.top,
        left: from.left,
        borderRadius: "8px",
        zIndex: 9999,
        pointerEvents: "none",
      }}
      animate={{
        top: top,
        left: left,
        borderRadius: "8px",
        opacity: 0,
        scale: 1,
        zIndex: 9999,
      }}
      transition={{ type: "spring", damping: 30, stiffness: 130 }}
    />
  );
}
