import "./CartContent.scss";
import { useEffect, useState } from "react";
import { cartService } from "../services/CartService";

export default function CartCheckout() {
  const [totalPrice, setTotalPrice] = useState<number>(
    cartService.getTotalCost()
  );

  useEffect(() => {
    const unsubscribe = cartService.subscribe((cart) => {
      const newCart = new Map<string, number>(cart);
      setTotalPrice(cartService.getTotalCost());
    });
    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <div className="cartCheckout">
      <h3>Checkout</h3>
      <div>this is the final checkout</div>
    </div>
  );
}
