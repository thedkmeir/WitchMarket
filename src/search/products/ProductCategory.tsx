import { motion, AnimatePresence } from "framer-motion";
import { Product } from "../services/DataService";
import ProductRow from "../products/ProductRow";
import "./ProductCategory.scss";
import { cartService } from "../services/CartService";

export default function ProductCategory({
  categoryName,
  productList,
}: {
  categoryName: string | null;
  productList?: Array<Product>;
}) {
  if (!categoryName) return null;

  if (!productList || productList.length === 0) return null;

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
                    productPrice={product.price}
                    productStock={product.stocked}
                    isShowOnly={!product.stocked}
                    onClick={() => cartService.addItem(product.name)}
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
