import { useEffect, useState } from "react";
import { inStockService } from "../../services/InStockService";
import "./CheckBox.scss";

export default function InStockCheckBox({
  string,
  defaultCheckedState,
}: {
  string: string | null;
  defaultCheckedState?: boolean;
}) {
  const [checkboxState, setCheckboxState] = useState<boolean | undefined>(
    defaultCheckedState
  );

  function handleCheckBoxChange(event: React.ChangeEvent<HTMLInputElement>) {
    const isChecked = event.target.checked;
    inStockService.setInStock(isChecked);
  }

  function handleRemoteCheckBoxChange(val: boolean) {
    if (!string) return;
    setCheckboxState(val);
    const checkbox = document.getElementById(string) as HTMLInputElement;
    if (checkbox) {
      checkbox.checked = val !== undefined ? val : false;
    }
  }

  useEffect(() => {
    const unsubscribe = inStockService.subscribe(handleRemoteCheckBoxChange);
    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <>
      <div className="customCheckBoxHolder">
        <input
          type="checkbox"
          defaultChecked={
            defaultCheckedState !== undefined ? defaultCheckedState : true
          }
          id={string || undefined}
          className="customCheckBoxInput"
          value={checkboxState ? "true" : "false"}
          onChange={handleCheckBoxChange}
        />
        <label htmlFor={string || undefined} className="customCheckBoxWrapper">
          <div className="customCheckBox">
            <div className="inner">{string}</div>
          </div>
        </label>
      </div>
    </>
  );
}
