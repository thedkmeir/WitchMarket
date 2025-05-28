import { use, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import CartContent from "./CartContent";
import FinalCheckout from "./CartCheckout";
import CircularIconButton from "../products/buttons/CircularIconButton";
import { ArrowLeft, ArrowRight, CircleArrowOutDownRight } from "lucide-react";
import "./CartStageSwitcher.scss";
import { cartService } from "../services/CartService";

export default function CartStageSwitcher({
  onClose,
}: {
  onClose: () => void;
}) {
  const [stage, setStage] = useState<"cart" | "checkout">("cart");
  const [disableProceedBtn, setDisableProceedBtn] = useState<boolean>(
    cartService.getTotalCost() === 0 && stage === "cart"
  );

  useEffect(() => {
    const unsubscribe = cartService.subscribe(() => {
      if (cartService.getTotalCost() === 0 && stage === "cart")
        setDisableProceedBtn(true);
      else setDisableProceedBtn(false);
    });
    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <>
      <div className="cartStageSwitcher">
        <AnimatePresence mode="popLayout" initial={false}>
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
        {/* TODO make this whole footer a component... its wayyyyy too long... */}
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
            icon={
              <AnimatePresence mode="wait" initial={false}>
                {stage === "cart" ? (
                  <motion.span
                    key="arrow-right"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 10 }}
                    transition={{ duration: 0.3 }}
                    style={{ display: "inline-flex" }}
                  >
                    <ArrowRight size={18} strokeWidth={1.5} />
                  </motion.span>
                ) : (
                  <motion.span
                    key="arrow-left"
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -10 }}
                    transition={{ duration: 0.3 }}
                    style={{ display: "inline-flex" }}
                  >
                    <ArrowLeft size={18} strokeWidth={1.5} />
                  </motion.span>
                )}
              </AnimatePresence>
            }
            hoverText={stage === "cart" ? "Checkout" : "Back to Cart"}
            hoverPosition="left"
            disabled={disableProceedBtn}
          />
        </div>
      </div>
    </>
  );
}
