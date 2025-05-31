import { useEffect, useState } from "react";
import { cartService } from "../services/CartService";
import "./CartCheckout.scss";
import { extraFeesService } from "../services/ExtraFeesService";
import { Fee } from "../services/tools/Classes";
import CircularIconButton from "../products/buttons/CircularIconButton";
import { CircleHelp } from "lucide-react";
import { Tooltip } from "react-tooltip";

export default function CartCheckout() {
  const [cartPrice, setCartPrice] = useState<number>(
    cartService.getTotalCost()
  );
  const [cartFees, setCartFees] = useState<Fee[]>(
    extraFeesService.getFeesList()
  );
  const [finalCartPrice, setfinalCartPrice] = useState<number>(
    extraFeesService.getFinalPrice()
  );

  useEffect(() => {
    const unsubscribe = extraFeesService.subscribe("CartCheckout", () => {
      setCartPrice(cartService.getTotalCost());
      setCartFees(extraFeesService.getFeesList());
      setfinalCartPrice(extraFeesService.getFinalPrice());
    });
    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <div className="cartCheckout">
      <h3>Checkout</h3>

      <div className="rowBig">
        <div>Total Items Price:</div>
        <div>{cartPrice}$</div>
      </div>

      <div className="content">
        {cartFees.map((fee) => (
          <div className="rowSmall" key={fee.nameOfFee}>
            <div
              className="row hoverText"
              data-tooltip-id={fee.nameOfFee}
              data-tooltip-content={fee.description}
            >
              {fee.nameOfFee}:
            </div>
            <Tooltip
              id={fee.nameOfFee}
              place={"top"}
              variant="dark"
              delayShow={100}
              positionStrategy="fixed"
            />
            <div>{fee.price}$</div>
          </div>
        ))}
      </div>

      <div className="row">
        <div>Total taxes and fees:</div>
        {/* fix the number to a mximum of .00 */}

        <div>{(finalCartPrice - cartPrice).toFixed(2)}$</div>
      </div>
      <div className="rowBig">
        <div>Final Price:</div>
        <div>{finalCartPrice}$</div>
      </div>
    </div>
  );
}
