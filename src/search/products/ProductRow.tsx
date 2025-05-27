import "./ProductRow.scss";

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
  onClick: () => void | null;
  isShowOnly?: boolean;
}) {
  const classNames = [
    productStock ? "in" : "out",
    !productStock || isShowOnly ? "" : "grow-on-hover",
  ].join(" ");

  return (
    <div className="productRow">
      <div className={classNames} onClick={onClick}>
        <div className="product-name">{productName}</div>
        <div className="product-price">{productPrice}$</div>
      </div>
    </div>
  );
}
