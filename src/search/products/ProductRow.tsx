import { useRef } from "react";
import "./ProductRow.scss";
import { useFlyToCart } from "../FlyToCartContext";
import html2canvas from "html2canvas";

export default function ProductRow({
  productName,
  productPrice,
  productStock,
  onClick,
  isShowOnly,
}: {
  productName: string | null;
  productPrice: number | null;
  productStock: boolean | null;
  onClick: (() => void) | null;
  isShowOnly?: boolean;
}) {
  const rowRef = useRef<HTMLDivElement>(null);
  const { getCartTargetRect, triggerFly } = useFlyToCart();

  const isClickable = !isShowOnly && !!productStock && !!onClick;
  const classNames = [
    productStock ? "in" : "out",
    isClickable ? "grow-on-hover" : "",
  ].join(" ");

  function handleProductClick() {
    if (isClickable && rowRef.current) {
      // Step 1: get the bounding rects
      const from = rowRef.current.getBoundingClientRect();
      // Assume you have access to the context
      const to = getCartTargetRect()!; // or "panel"

      // Step 2: use html2canvas to snapshot the row
      html2canvas(rowRef.current).then((canvas) => {
        const image = canvas.toDataURL("image/png");
        triggerFly({
          image,
          from,
          to,
          onComplete: () => {
            onClick && onClick();
          },
          toComp: null
        });
      });
    } else {
      onClick && onClick();
    }
  }

  return (
    <div className="productRow">
      <div
        ref={rowRef}
        className={classNames}
        onClick={isClickable ? handleProductClick : undefined}
      >
        <div className="product-name">{productName}</div>
        <div className="product-price">{productPrice}$</div>
      </div>
    </div>
  );
}
