import { useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { useFlyToCart } from "../FlyToCartContext";
import "./CartIcon.scss";

export default function CartIcon({ onClose }: { onClose: () => void }) {
  const iconRef = useRef<HTMLDivElement | null>(null);
  const { registerCartTarget } = useFlyToCart();

  // useEffect(() => {
  //   // Register the DOM node on mount/update
  //   if (iconRef.current) {
  //     registerCartTarget("icon", iconRef.current);
  //   }
  //   // If unmounting, unregister (optional, safe)
  //   return () => registerCartTarget("icon", null);
  // }, [registerCartTarget]);

  useEffect(() => {
    let timer: number | null = null;
    if (iconRef.current) {
      timer = window.setTimeout(() => {
        registerCartTarget("icon", iconRef.current);
      }, 350);
    }
    return () => {
      if (timer) window.clearTimeout(timer);
      registerCartTarget("icon", null);
    };
  }, [registerCartTarget]);

  return (
    <div
      ref={iconRef}
      onClick={(e) => {
        e.stopPropagation();
        onClose();
      }}
    >
      <motion.div
        className="cartIcon"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, padding: "15px", borderRadius: "50%" }}
        exit={{ opacity: 0 }}
      >
        <img
          src="/WitchMarket/assets/cauldron.svg"
          alt="My Icon"
          width="38"
          height="38"
        />
      </motion.div>
    </div>
  );
}
