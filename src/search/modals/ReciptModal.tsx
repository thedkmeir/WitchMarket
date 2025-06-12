import TextButton from "../inputs/TextButton";
import "./FinalCheckoutModal.scss";
import { useModal } from "./ModalManager";

export default function ReciptModal() {
  const { closeModal } = useModal();
  return (
    <div className="reciptModal">
      <TextButton
        text={"Close"}
        onClick={() => {
          closeModal();
        }}
      />
    </div>
  );
}
