import { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useFlyToCart } from "../FlyToCartContext";
import "./CartIcon.scss";
import { cartService } from "../services/CartService";

const CAULDRON_SVG = `${import.meta.env.BASE_URL}assets/cauldron.png`;
const CAULDRON_GIF = `${import.meta.env.BASE_URL}assets/cauldron.gif`;
const GIF_DURATION = 2000;

export default function CartIcon({ onClose }: { onClose: () => void }) {
  const iconRef = useRef<HTMLDivElement | null>(null);
  const { registerCartTarget } = useFlyToCart();
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    let timer: number | null = null;
    if (iconRef.current) {
      timer = window.setTimeout(() => {
        registerCartTarget("icon", iconRef.current);
      }, 350);
    }
    function handleResize() {
      if (iconRef.current) {
        registerCartTarget("icon", iconRef.current);
      }
    }
    window.addEventListener("resize", handleResize);
    return () => {
      if (timer) window.clearTimeout(timer);
      window.removeEventListener("resize", handleResize);
      registerCartTarget("icon", null);
    };
  }, [registerCartTarget]);

  useEffect(() => {
    const unsubscribe = cartService.subscribe("CartCheckout", () => {
      setPlaying(true);
      setTimeout(() => setPlaying(false), GIF_DURATION);
    });
    return () => {
      unsubscribe();
    };
  }, []);

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
          src={playing ? CAULDRON_GIF : CAULDRON_SVG}
          alt="Cart Cauldron"
          width={55}
          height={55}
          style={{ display: "block" }}
        />
      </motion.div>
    </div>
  );
}