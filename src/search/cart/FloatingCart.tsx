import { use, useEffect, useRef, useState } from "react";
import { AnimatePresence } from "framer-motion";
import CartContainer from "./CartContainer";
import CartIcon from "./CartIcon";
import "./FloatingCart.scss";
import CartStageSwitcher from "./CartStageSwitcher";
import { useFlyToCart } from "../FlyToCartContext";

export default function FloatingCart() {
  const [isOpen, setIsOpen] = useState(false);

  // const toggleCart = () => setIsOpen(!isOpen);
  const closeCart = () => setIsOpen(false);
  const openCart = () => setIsOpen(true);
  // const { switchCartType } = useFlyToCart();

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setIsOpen(false);
      }
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  });

  // useEffect(() => {
  //   if (isOpen) {
  //     const timeout = setTimeout(() => switchCartType("panel"), 500);
  //     return () => clearTimeout(timeout);
  //   } else {
  //     const timeout = setTimeout(() => switchCartType("icon"), 500);
  //     return () => clearTimeout(timeout);
  //   }
  // }, [isOpen, switchCartType]);

  return (
    <CartContainer isOpen={isOpen}>
      <AnimatePresence mode="wait">
        {isOpen ? (
          <CartStageSwitcher key="content" onClose={closeCart} />
        ) : (
          <CartIcon key="icon" onClose={openCart} />
        )}
      </AnimatePresence>
    </CartContainer>
  );
}
