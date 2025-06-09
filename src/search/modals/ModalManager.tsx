import React, { createContext, useContext, useState, ReactNode } from "react";
import ReactDOM from "react-dom";
import { cartService } from "../services/CartService";
import { X } from "lucide-react";
import CircularIconButton from "../inputs/CircularIconButton";
import CheckoutModal, { CheckoutParams } from "./FinalCheckoutModal";

// TODO each one of these should go to their own file with the same modal component...
type PreferencesParams = { userId: string };
type CustomParams = { content: React.ReactNode };

type ModalParams =
  | { type: "checkout"; dismissible?: boolean; title: string; params: CheckoutParams }
  | { type: "preferences"; dismissible?: boolean; title: string; params: PreferencesParams }
  | { type: "custom"; dismissible?: boolean; title: string; params: CustomParams };

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

// --- ModalManager (uses ModalParams[] as stack)
export function ModalManager({ children }: { children: ReactNode }) {
  const [modalStack, setModalStack] = useState<ModalParams[]>([]);

  function openModal(modal: ModalParams) {
    setModalStack((stack) => [
      ...stack,
      {
        ...modal,
        dismissible: modal.dismissible !== false, // default to true
      },
    ]);
  }

  function closeModal() {
    setModalStack((stack) => stack.slice(0, -1));
  }

  return (
    <ModalContext.Provider value={{ openModal, closeModal }}>
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

// --- Switcher
function ModalContentSwitcher({ modal }: { modal: ModalParams }) {
  switch (modal.type) {
    case "checkout":
      return <CheckoutModal {...modal.params} />;
    case "preferences":
      return <PreferencesModal {...modal.params} />;
    case "custom":
      return <CustomModal {...modal.params} />;
    default:
      return null;
  }
}

function PreferencesModal(props: PreferencesParams) {
  return <div>Preferences Modal for User: {props.userId}</div>;
}
function CustomModal({ content }: CustomParams) {
  return <>{content}</>;
}
