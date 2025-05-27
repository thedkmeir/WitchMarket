import { motion } from "framer-motion";
import { FaShoppingCart } from "react-icons/fa";
import "./CartIcon.scss";

export default function CartIcon({ onClose }: { onClose: () => void }) {
  return (
    <div
      onClick={(e) => {
        e.stopPropagation();
        onClose();
      }}
    >
      <motion.div
        className="cartIcon"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, padding: "17px", borderRadius: "50%" }}
        exit={{ opacity: 0 }}
      > 
        <FaShoppingCart size={20} />
      </motion.div>
    </div>
  );
}
