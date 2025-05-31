import { motion } from "framer-motion";
import { ReactNode } from "react";
import "./InfoContainer.scss";

export default function InfoContainer({
  isOpen,
  onClick,
  children,
}: {
  isOpen: boolean;
  onClick: () => void;
  children: ReactNode;
}) {
  return (
    <div className="InfoContainer">
      <motion.div
        className={
          isOpen ? "floatingInfoContainer" : "floatingInfoContainerPointer"
        }
        onClick={onClick}
        initial={false}
        animate={isOpen ? "open" : "closed"}
        variants={{
          open: {
            width: 210,
            height: 210,
            borderRadius: "16px",
          },
          closed: {
            width: 30,
            height: 30,
            borderRadius: "50%",
          },
        }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
      >
        {children}
      </motion.div>
    </div>
  );
}
