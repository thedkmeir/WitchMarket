import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import CartContent from "./CartContent";
import FinalCheckout from "./CartCheckout";
import CircularIconButton from "../products/buttons/CircularIconButton";
import { ArrowRight, CircleArrowOutDownRight } from "lucide-react";
import "./CartStageSwitcher.scss";

export default function CartStageSwitcher({
  onClose,
}: {
  onClose: () => void;
}) {
  const [stage, setStage] = useState<"cart" | "checkout">("cart");

  return (
    <>
      <div className="cartStageSwitcher">
        <AnimatePresence mode="wait" initial={false}>
          {stage === "cart" ? (
            <motion.div
              key="cart"
              className="cartStage"
              initial={{ x: -350 }}
              animate={{ x: 0 }}
              exit={{ x: -350 }}
              transition={{ duration: 0.3 }}
            >
              <CartContent />
            </motion.div>
          ) : (
            <motion.div
              key="checkout"
              className="cartStage"
              initial={{ x: 350 }}
              animate={{ x: 0 }}
              exit={{ x: 350 }}
              transition={{ duration: 0.3 }}
            >
              <FinalCheckout />
            </motion.div>
          )}
        </AnimatePresence>
        <div className="cartStageSwitcherFooter">
          <CircularIconButton
            onChange={() => {
              onClose();
            }}
            icon={<CircleArrowOutDownRight size={18} strokeWidth={1.5} />}
            hoverText="Minimize"
            hoverPosition="right"
          ></CircularIconButton>
          <CircularIconButton
            onChange={() => {
              setStage(stage === "cart" ? "checkout" : "cart");
            }}
            icon={<ArrowRight size={18} strokeWidth={1.5} />}
            hoverText="Checkout"
            hoverPosition="left"
          ></CircularIconButton>
          {/* TODO make sure you add disabled button functionality and disable this button incase the cart is empty... */}
          {/* TODO make the Checkout button change arrow direction and hover text to switch form check out to back... */}
        </div>
      </div>
    </>
  );
}
