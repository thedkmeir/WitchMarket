import { useEffect, useRef, useState } from "react";
import { cartService } from "../services/CartService";
import { extraFeesService } from "../services/ExtraFeesService";
import { Fee } from "../services/tools/Classes";
import { Tooltip } from "react-tooltip";
import { useModal } from "../modals/ModalManager";
import TextButton from "../inputs/TextButton";
import CheckBox from "../inputs/CheckBox";
import "./CartCheckout.scss";
import AnimatedCounter from "./animatedCounter/AnimatedCounter";

export const moonRiftFee: Fee = {
  category: "Delivery",
  nameOfFee: "Moon-Rift Delivery",
  price: 10,
  description: "Get your items delivered through a moon-rift!",
};

export default function CartCheckout() {
  const [cartPrice, setCartPrice] = useState<number>(
    cartService.getTotalCost()
  );
  const [cartFees, setCartFees] = useState<Fee[]>(
    extraFeesService.getFeesList()
  );
  const [finalCartPrice, setFinalCartPrice] = useState<number>(
    extraFeesService.getFinalPrice()
  );
  const { openModal } = useModal();
  const expressDelivery = useRef<boolean>(
    extraFeesService
      .getFeesList()
      .some((fee) => fee.nameOfFee === moonRiftFee.nameOfFee)
  );

  useEffect(() => {
    const unsubscribe = extraFeesService.subscribe("CartCheckout", () => {
      setCartPrice(cartService.getTotalCost());
      setCartFees(extraFeesService.getFeesList());
      setFinalCartPrice(extraFeesService.getFinalPrice());
    });
    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <div className="cartCheckout">
      <h3>Cauldron Compendium</h3>

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
              -{fee.nameOfFee}:
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
        <CheckBox
          text={"Moon-Rift Delivery?"}
          checked={expressDelivery.current}
          onChange={(val) => {
            if (val) extraFeesService.addCustomFee(moonRiftFee);
            else extraFeesService.removeCustomFee(moonRiftFee.nameOfFee);
            expressDelivery.current = val;
          }}
          hoverText={moonRiftFee.description}
          hoverPosition={"top"}
        />
      </div>
      <div className="row">
        <div>Total taxes and fees:</div>
        <div>
          <AnimatedCounter
            value={finalCartPrice - cartPrice}
            duration={1000}
            rearDecorator="$"
          />
        </div>
      </div>
      <div className="rowBig">
        <div>Final Price:</div>
        <div>
          <AnimatedCounter
            value={finalCartPrice}
            duration={1000}
            rearDecorator="$"
          />
        </div>
      </div>
      <div className="middleMe">
        <TextButton
          text={"Cast Order"}
          onClick={() =>
            openModal({ type: "checkout", title: "Cast Order" })
          }
        ></TextButton>
      </div>
    </div>
  );
}
