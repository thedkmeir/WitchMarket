import { extraFeesService } from "../services/ExtraFeesService";
import "./FinalCheckoutModal.scss";
import Spacer from "../inputs/Spacer";
import Board from "../../tictactoe/board";
import TextButton from "../inputs/TextButton";
import { useModal } from "./ModalManager";

export type CheckoutParams = { orderId: string };

export default function CheckoutModal(props: CheckoutParams) {
  const { openModal, closeModal } = useModal();

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
      <Spacer size={10} />
      <TextButton
        text={"Cast Order"}
        fontSize={30}
        onClick={() => {
          closeModal();
          openModal({
            type: "recipt",
            title: "Full Recipt",
            dismissible: false,
          });
        }}
      />
      <Spacer size={10} />
    </div>
  );
}
