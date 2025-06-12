import TextButton from "../inputs/TextButton";
import { cartService } from "../services/CartService";
import "./ReceiptModal.scss";
import { useModal } from "./ModalManager";
import { extraFeesService } from "../services/ExtraFeesService";
import Spacer from "../inputs/Spacer";
import { dataService } from "../services/DataService";

export default function ReceiptModal() {
  const { closeModal } = useModal();
  // TODO add a download receipt button that downloads a receipt as a PDF
  return (
    <div className="receiptModal">
      {[...cartService.getCart().entries()].map(([productName, amount]) => (
        <div className="row" key={productName}>
          <div>{amount}X{productName}:</div>
          <div className="price">{((dataService.getProductByName(productName)?.price ?? 0) * amount)}$</div>
        </div>
      ))}
      {extraFeesService.getFeesList().map((fee) => (
        <div className="row" key={fee.nameOfFee}>
          <div>{fee.nameOfFee}:</div>
          <div className="price">{fee.price}$</div>
        </div>
      ))}
      <hr></hr>
      <div className="row">
        <div>Total:</div>
        <div className="price">{extraFeesService.getFinalPrice()}$</div>
      </div>
      <Spacer size={15} />
      <TextButton
        text={"Close"}
        onClick={() => {
          closeModal();
        }}
      />
    </div>
  );
}
