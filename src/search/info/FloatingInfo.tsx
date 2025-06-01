import { useEffect, useState } from "react";
import { AnimatePresence } from "framer-motion";
import InfoIcon from "./InfoIcon";
import InfoContainer from "./InfoContainer";
import InfoContent from "./InfoContent";
import "./FloatingInfo.scss";

export default function FloatingInfo() {
  const [isOpen, setIsOpen] = useState(false);
  const closeInfo = () => setIsOpen(false);
  const openInfo = () => setIsOpen(true);

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setIsOpen(false);
      }
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  });

  return (
    <InfoContainer isOpen={isOpen} onClick={() => {}}>
      <AnimatePresence mode="wait">
        {isOpen ? (
          <InfoContent key="content" onClose={closeInfo} />
        ) : (
          <InfoIcon key="icon" onClose={openInfo} />
        )}
      </AnimatePresence>
    </InfoContainer>
  );
}
