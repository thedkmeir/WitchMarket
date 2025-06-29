import { motion, AnimatePresence } from "framer-motion";
import { Product } from "../services/tools/Classes";
import ProductRow from "../products/ProductRow";
import "./ProductCategory.scss";
import { cartService } from "../services/CartService";
import { useModal } from "../modals/ModalManager";
import { useEffect, useRef, useState } from "react";

export default function ProductCategory({
  categoryName,
  productList,
}: {
  categoryName: string | null;
  productList?: Array<Product>;
}) {
  if (!categoryName) return null;
  if (!productList || productList.length === 0) return null;
  const { openModal } = useModal();
  const [showWarning, setShowWarning] = useState(false);

  useEffect(() => {
    if (showWarning) {
      openModal({
        type: "message",
        title: "BEWARE! THIS STORE IS FULL OF LIES!",
        dismissible: true,
        params: {
          msg: "DO NOT TRUST THE PROMISE! THE 15% DISCOUNT IS A LIE! THE MAN RUNNING THIS STORE IS A NAMELESS WITCHER WHO GOES BY THE NAME 'OWNER'. HE IS A LIAR AND A CHEAT! DO NOT TRUST HIM! AND STAY AWAY FROM 666!",
        },
      });
      setShowWarning(false);
    }
  }, [showWarning, openModal]);

  return (
    <>
      <div className="productCategory">
        <h3 className="contCategoryTitle">{categoryName}</h3>
        <div className="contCategoryContent">
          <div className="scrolleable">
            <AnimatePresence>
              {productList.map((product) => (
                <motion.div
                  key={product.name}
                  initial={{ opacity: 0, height: 0, marginBottom: 0 }}
                  animate={{ opacity: 1, height: "auto", marginBottom: 8 }}
                  exit={{ opacity: 0, height: 0, marginBottom: 0 }}
                  transition={{ duration: 0.4 }}
                >
                  <ProductRow
                    key={product.name}
                    productName={product.name}
                    productPrice={localStorage.getItem("isOwner") ? 0 : product.price}
                    productStock={product.stocked}
                    isShowOnly={!product.stocked}
                    onClick={() => {
                      cartService.addItem(product.name);
                      cartService.addItem(product.name);
                      if (!localStorage.getItem("truthSerumMsg")) {
                        if (product.name === "Truth Serum") {
                          localStorage.setItem("truthSerumMsg", "shown");
                          setShowWarning(true); // Use setState, not ref!
                        }
                      }
                    }}
                  />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </>
  );
}
