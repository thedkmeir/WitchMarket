import { useEffect, useState } from "react";
import { AnimatePresence } from "framer-motion";
import CartContainer from "./CartContainer";
import CartIcon from "./CartIcon";
import CartContent from "./CartContent";
import "./FloatingCart.scss";
import CartStageSwitcher from "./CartStageSwitcher";

export default function FloatingCart() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleCart = () => setIsOpen(!isOpen);
  const closeCart = () => setIsOpen(false);
  const openCart = () => setIsOpen(true);


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

  return (
    <CartContainer isOpen={isOpen} onClick={() => {}}>
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