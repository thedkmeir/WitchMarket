import { useEffect, useState } from "react";
import { inStockService } from "../services/InStockService";
import CheckBox from "../inputs/CheckBox";

export default function InStockCheckBox({
  id,
  string,
  defaultCheckedState,
}: {
  id: string;
  string: string | null;
  defaultCheckedState?: boolean;
}) {
  const [checked, setChecked] = useState<boolean>(
    defaultCheckedState !== undefined ? defaultCheckedState : true
  );

  useEffect(() => {
    const unsubscribe = inStockService.subscribe(id, () => {
      const val = inStockService.getInStock();
      setChecked(val);
    });
    return unsubscribe;
  }, []);

  return (
    <CheckBox
      text={string}
      checked={checked}
      onChange={(val) => {
        setChecked(val);
        inStockService.setInStock(val);
      }}
    />
  );
}