import { AnimatePresence, motion } from "framer-motion";
import ProductActionPanel from "../products/ProductActionPanel";
import "./CartContent.scss";
import { useEffect, useRef, useState } from "react";
import { cartService } from "../services/CartService";
import AnimatedCounter from "./animatedCounter/AnimatedCounter";

export default function CartContent() {
  const [cart, setCart] = useState<Map<string, number>>(cartService.getCart());
  const [totalPrice, setTotalPrice] = useState<number>(
    cartService.getTotalCost()
  );
  const prevCartSize = useRef<number>(cart.size);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const unsubscribe = cartService.subscribe("CartContent", () => {
      setCart(new Map(cartService.getCart()));
      setTotalPrice(cartService.getTotalCost());
    });
    return () => {
      unsubscribe();
    };
  }, []);

  useEffect(() => {
    if (cart.size > prevCartSize.current && endRef.current)
      endRef.current.scrollIntoView({ behavior: "smooth" });
    prevCartSize.current = cart.size;
  }, [cart]);

  return (
    <motion.div
      className="cartContent"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <h3>Your Cauldron</h3>

      {cart === undefined || cart.size === 0 ? (
        <div className="emptyCart">Your cauldron is empty</div>
      ) : (
        <AnimatePresence>
          <div className="content">
            {Array.from((cart ?? new Map<string, number>()).entries()).map(
              ([productName, amount]) => {
                return (
                  <motion.div
                    key={productName}
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.4 }}
                  >
                    <ProductActionPanel
                      key={productName}
                      productName={productName}
                      amount={amount}
                    />
                  </motion.div>
                );
              }
            )}
            <div ref={endRef} />
          </div>
        </AnimatePresence>
      )}

      <div className="cartContentFooter">
        <div>Total Price: </div>
        <div>
          <AnimatedCounter
            value={totalPrice}
            duration={1000}
            rearDecorator="$"
          />
        </div>
      </div>
    </motion.div>
  );
}
