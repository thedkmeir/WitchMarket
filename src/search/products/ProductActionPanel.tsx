import ProductRow from "./ProductRow";
import "./ProductActionPanel.scss";
import { Trash2 } from "lucide-react";
import CircularIconButton from "./buttons/CircularIconButton";
import CountControl from "./CountControl";
import { cartService } from "../services/CartService";
import { dataService } from "../services/DataService";

export default function ProductActionPanel({
  productName,
  amount,
}: {
  productName: string | null;
  amount: number | null;
}) {
  if (productName === null) return null;
  if (amount === null) amount = 1;

  const product = dataService.getProductByName(productName);
  if (!product) return null;

  return (
    <div className="productActionPanel">
      <div className="column">
        <CountControl
          count={amount}
          onChange={(count: number) => {
            cartService.updateAmount(productName, count);
          }}
          iconSize={18}
        ></CountControl>

        <CircularIconButton
          onChange={() => {
            cartService.removeItem(productName);
          }}
          icon={<Trash2 size={18} strokeWidth={1.5} />}
        ></CircularIconButton>
      </div>
      <ProductRow
        productName={productName}
        productPrice={product.price}
        productStock={true}
        onClick={() => {}}
        isShowOnly={true}
      ></ProductRow>
    </div>
  );
}
