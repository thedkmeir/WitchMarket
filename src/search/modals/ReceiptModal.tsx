import TextButton from "../inputs/TextButton";
import { cartService } from "../services/CartService";
import "./ReceiptModal.scss";
import { useModal } from "./ModalManager";
import { extraFeesService } from "../services/ExtraFeesService";
import Spacer from "../inputs/Spacer";
import { dataService } from "../services/DataService";
import { dateToWitchString } from "../services/tools/WitchCalender";
import { useRef } from "react";
import { moonRiftFee } from "../cart/CartCheckout";

export default function ReceiptModal() {
  const { closeModal } = useModal();
  const expressDelivery = useRef<boolean>(
    extraFeesService
      .getFeesList()
      .some((fee) => fee.nameOfFee === moonRiftFee.nameOfFee)
  );
  const deliveryDate: Date = new Date();
  if (expressDelivery.current) deliveryDate.setDate(deliveryDate.getDate() + 5);
  else deliveryDate.setDate(deliveryDate.getDate() + 21);

  return (
    <div className="receiptModal">
      <div className="scrollable">
        {[...cartService.getCart().entries()].map(([productName, amount]) => (
          <div className="row" key={productName}>
            <div>
              {amount}X{productName}:
            </div>
            <div className="price">
              {(
                (dataService.getProductByName(productName)?.price ?? 0) * amount
              ).toFixed(2)}
              $
            </div>
          </div>
        ))}
        {extraFeesService.getFeesList().map((fee) => (
          <div className="row" key={fee.nameOfFee}>
            <div>{fee.nameOfFee}:</div>
            <div className="price">{fee.price}$</div>
          </div>
        ))}
      </div>
      <hr></hr>
      <div className="row">
        <div>Total:</div>
        <div className="price">{extraFeesService.getFinalPrice()}$</div>
      </div>
      <Spacer size={15} />
      <div className="row">{dateToWitchString(deliveryDate)}</div>
      <Spacer size={15} />
      <TextButton
        text={"Close"}
        onClick={() => {
          cartService.clear();
          extraFeesService.clear();
          closeModal();
        }}
      />
    </div>
  );
}
