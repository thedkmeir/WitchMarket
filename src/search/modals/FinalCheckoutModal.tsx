import { useRef } from "react";
import { extraFeesService } from "../services/ExtraFeesService";
import { dateToWitchString } from "../services/tools/WitchCalender";
import "./FinalCheckoutModal.scss";
import { moonRiftFee } from "../cart/CartCheckout";
import Spacer from "../inputs/Spacer";
import Board from "../../tictactoe/board";
import TextButton from "../inputs/TextButton";
import { useModal } from "./ModalManager";

export type CheckoutParams = { orderId: string };

export default function CheckoutModal(props: CheckoutParams) {
  const expressDelivery = useRef<boolean>(
    extraFeesService
      .getFeesList()
      .some((fee) => fee.nameOfFee === moonRiftFee.nameOfFee)
  );
  const { openModal, closeModal } = useModal();

  const deliveryDate: Date = new Date();
  if (expressDelivery.current) deliveryDate.setDate(deliveryDate.getDate() + 5);
  else deliveryDate.setDate(deliveryDate.getDate() + 21);

  // TODO make a start button that will animately start the game of tic-tac-toe

  // TODO make the cast order button clear out the entire cart...

  // TODO make a new button called Full Recipt that will toggle a new kind of modal that will show all items and all fees and the total price.

  return (
    <div className="checkoutModal">
      <div className="row">
        <div>Order Total: </div>
        <div>{extraFeesService.getFinalPrice()}$</div>
      </div>
      <Spacer size={10} />
      <div className="row">
        Want 15% DISCOUNT!? Beat me in a game of Tic-Tac-Toe and get 15% off
        your order!!!
      </div>
      <Spacer size={10} />
      <div className="middleRow">First Move is Yours...</div>
      <div className="middleRow">
        <Board />
      </div>
      <Spacer size={30} />
      <div className="row">{dateToWitchString(deliveryDate)}</div>
      <Spacer size={10} />
      <TextButton
        text={"Cast Order"}
        onClick={() => {
          closeModal();
          openModal({ type: "recipt", title: "Full Recipt", dismissible: false });
        }}
      />
      <Spacer size={10} />
    </div>
  );
}
