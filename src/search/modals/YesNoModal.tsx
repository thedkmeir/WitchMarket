import TextButton from "../inputs/TextButton";
import "./YesNoModal.scss";
import { useModal } from "./ModalManager";

export type YesNoParams = {
  question: string;
  onAnswer: (answer: boolean) => void;
};

export default function YesNoModal(props: YesNoParams) {
  const { closeModal } = useModal();

  return (
    <div className="yesNoModal">
      {props.question}
      <div className="row">
        <TextButton
          text="Yes"
          onClick={() => {
            props.onAnswer(true);
            closeModal();
          }}
        />
        <TextButton
          text="No"
          onClick={() => {
            props.onAnswer(false);
            closeModal();
          }}
        />
      </div>
    </div>
  );
}
