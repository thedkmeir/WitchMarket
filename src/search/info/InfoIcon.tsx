import { motion } from "framer-motion";
import { Info } from "lucide-react";
import "./InfoIcon.scss";

export default function InfoIcon({ onClose }: { onClose: () => void }) {
  return (
    <div
      onClick={(e) => {
        e.stopPropagation();
        onClose();
      }}
    >
      <motion.div
        className="infoIcon"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, padding: "17px", borderRadius: "50%" }}
        exit={{ opacity: 0 }}
      > 
        <Info size={20} />
      </motion.div>
    </div>
  );
}
