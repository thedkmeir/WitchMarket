import { motion } from "framer-motion";
import { ReactNode } from "react";
import "./CartContainer.scss";
// Add the hook from above here!
import { useLayoutEffect, useState } from "react";

function useIsMobile(breakpoint = 700) {
  const [isMobile, setIsMobile] = useState(
    typeof window !== "undefined" ? window.innerWidth <= breakpoint : false
  );
  useLayoutEffect(() => {
    function handleResize() {
      setIsMobile(window.innerWidth <= breakpoint);
    }
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [breakpoint]);
  return isMobile;
}

export default function CartContainer({
  isOpen,
  children,
}: {
  isOpen: boolean;
  children: ReactNode;
}) {
  const isMobile = useIsMobile(700);

  const openWidth = isMobile ? 340 : 370;

  return (
    <div className="cartContainer">
      <motion.div
        className={
          isOpen ? "floatingCartContainer" : "floatingCartContainerPointer"
        }
        initial={false}
        animate={isOpen ? "open" : "closed"}
        variants={{
          open: {
            width: openWidth,
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