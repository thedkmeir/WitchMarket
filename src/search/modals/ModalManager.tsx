import { createContext, useContext, useState, ReactNode } from "react";
import ReactDOM from "react-dom";
import { X } from "lucide-react";
import CircularIconButton from "../inputs/CircularIconButton";
import MessageModal, { MessageParams } from "./MessageModal";
import ReceiptModal from "./ReceiptModal";
import YesNoModal, { YesNoParams } from "./YesNoModal";
import CheckoutModal from "./FinalCheckoutModal";
import FireworksBackdrop from "./Fireworks";
import Fireworks from "fireworks-js";

type ModalParams =
  | {
      type: "checkout";
      dismissible?: boolean;
      title: string;
    }
  | {
      type: "recipt";
      dismissible?: boolean;
      title: string;
    }
  | {
      type: "message";
      dismissible?: boolean;
      title: string;
      params: MessageParams;
    }
  | {
      type: "yesNo";
      dismissible?: boolean;
      title: string;
      params: YesNoParams;
    };

type ModalContextType = {
  openModal: (modal: ModalParams) => void;
  closeModal: () => void;
};

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export function useModal() {
  const ctx = useContext(ModalContext);
  if (!ctx) throw new Error("useModal must be used within ModalManager");
  return ctx;
}

export function ModalManager({ children }: { children: ReactNode }) {
  const [modalStack, setModalStack] = useState<ModalParams[]>([]);

  function openModal(modal: ModalParams) {
    setModalStack((stack) => [
      ...stack,
      {
        ...modal,
        dismissible: modal.dismissible !== false,
      },
    ]);
  }

  function closeModal() {
    setModalStack((stack) => stack.slice(0, -1));
  }

  return (
    <ModalContext.Provider value={{ openModal, closeModal }}>
      <FireworksBackdrop enabled={modalStack.some((m) => m.type === "recipt")} />
      {children}
      {modalStack.map((modal, i) =>
        ReactDOM.createPortal(
          <div
            className="modalManager"
            key={i}
            onClick={() => {
              if (modal.dismissible) closeModal();
            }}
          >
            <div className="modal-window" onClick={(e) => e.stopPropagation()}>
              <div className="modalTopRow">
                <h3> {modal.title} </h3>
                <div>
                  {modal.dismissible && (
                    <CircularIconButton
                      hoverText="Close"
                      onChange={closeModal}
                      hoverPosition="top"
                      icon={<X size={18} strokeWidth={1.5} />}
                      padding={5}
                    />
                  )}
                </div>
              </div>
              <div className="modalContent">
                <ModalContentSwitcher modal={modal} />
              </div>
            </div>
          </div>,
          document.body
        )
      )}
    </ModalContext.Provider>
  );
}

function ModalContentSwitcher({ modal }: { modal: ModalParams }) {
  switch (modal.type) {
    case "checkout":
      return <CheckoutModal />;
    case "message":
      return <MessageModal {...modal.params} />;
    case "recipt":
      return <ReceiptModal />;
    case "yesNo":
      return <YesNoModal {...modal.params} />;
    default:
      return null;
  }
}
