import { motion } from "framer-motion";
import { ReactNode } from "react";
import "./CartContainer.scss";

export default function CartContainer({
  isOpen,
  onClick,
  children,
}: {
  isOpen: boolean;
  onClick: () => void;
  children: ReactNode;
}) {
  return (
    <div className="cartContainer">
      <motion.div
        className={
          isOpen ? "floatingCartContainer" : "floatingCartContainerPointer"
        }
        onClick={onClick}
        initial={false}
        animate={isOpen ? "open" : "closed"}
        variants={{
          open: {
            width: 370,
            height: 550,
            borderRadius: "16px",
          },
          closed: {
            width: 56,
            height: 56,
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
