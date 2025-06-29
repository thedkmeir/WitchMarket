import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import CartContent from "./CartContent";
import FinalCheckout from "./CartCheckout";
import CircularIconButton from "../inputs/CircularIconButton";
import {
  ArrowLeft,
  ArrowRight,
  CircleArrowOutDownRight,
  Trash2,
} from "lucide-react";
import "./CartStageSwitcher.scss";
import { cartService } from "../services/CartService";
import { useModal } from "../modals/ModalManager";
import { useFlyToCart } from "../FlyToCartContext";

export default function CartStageSwitcher({
  onClose,
}: {
  onClose: () => void;
}) {
  const [stage, setStage] = useState<"cart" | "checkout">("cart");
  const [disableProceedBtn, setDisableProceedBtn] = useState<boolean>(
    cartService.getTotalCost() === 0 && stage === "cart"
  );
  const { openModal } = useModal();
  const panelRef = useRef<HTMLDivElement | null>(null);
  const { registerCartTarget } = useFlyToCart();

  useEffect(() => {
    let timer: number | null = null;

    // Initial delayed registration
    if (panelRef.current) {
      timer = window.setTimeout(() => {
        registerCartTarget("panel", panelRef.current);
      }, 350);
    }

    // Immediate update on resize
    function handleResize() {
      if (panelRef.current) {
        registerCartTarget("panel", panelRef.current);
      }
    }
    window.addEventListener("resize", handleResize);

    // Cleanup
    return () => {
      if (timer) window.clearTimeout(timer);
      window.removeEventListener("resize", handleResize);
      registerCartTarget("icon", null);
    };
  }, [registerCartTarget]);

  useEffect(() => {
    const unsubscribe = cartService.subscribe("CartStageSwitcher", () => {
      if (cartService.getTotalCost() === 0) {
        setDisableProceedBtn(true);
        setStage("cart");
      } else setDisableProceedBtn(false);
    });
    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <>
      <div className="cartStageSwitcher" ref={panelRef}>
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
              <FinalCheckout onCartChange={() => setStage("cart")}/>
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

          <AnimatePresence>
            {stage === "cart" && (
              <motion.div
                key="content"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <CircularIconButton
                  onChange={() => {
                    openModal({
                      type: "yesNo",
                      title: "Cleanse Cauldron?",
                      params: {
                        question: "Are you sure you want to cleanse your Cauldron?",
                        onAnswer: (answer: boolean) => {
                          if (answer) cartService.clear();
                        },
                      },
                    });
                  }}
                  icon={<Trash2 size={18} strokeWidth={1.5} />}
                  hoverText="Cleanse Cauldron"
                  hoverPosition="top"
                ></CircularIconButton>
              </motion.div>
            )}
          </AnimatePresence>

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
                    transition={{ duration: 0.2 }}
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
                    transition={{ duration: 0.2 }}
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
