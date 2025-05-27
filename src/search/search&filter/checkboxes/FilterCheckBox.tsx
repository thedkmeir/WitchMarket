import { useEffect, useState } from "react";
import { categoryService } from "../../services/CategoryService";
import "./CheckBox.scss";

export default function FilterCheckBox({
  categoryName,
  defaultCheckedState,
}: {
  categoryName: string | null;
  defaultCheckedState?: boolean;
}) {
  const [checkboxState, setCheckboxState] = useState<boolean | undefined>(
    defaultCheckedState
  );

  if (!categoryName) return null;

  function handleCheckBoxChange(event: React.ChangeEvent<HTMLInputElement>) {
    const isChecked = event.target.checked;
    if (categoryName) categoryService.setCategoryState(categoryName, isChecked);
  }

  useEffect(() => {
    const unsubscribe = categoryService.subscribe(
      categoryName,
      (map: Map<string, boolean>) => {
        if (!categoryName) return;
        const val = map.get(categoryName);
        if (val === checkboxState) return;
        setCheckboxState(val);
        const checkbox = document.getElementById(categoryName) as HTMLInputElement;
        if (checkbox) {
          checkbox.checked = val !== undefined ? val : false;
        }
      }
    );
    return () => {
      unsubscribe();
    };
  }, [categoryName, defaultCheckedState]);

  return (
    <>
      <div className="customCheckBoxHolder">
        <input
          type="checkbox"
          defaultChecked={
            defaultCheckedState !== undefined ? defaultCheckedState : true
          }
          id={categoryName || undefined}
          className="customCheckBoxInput"
          value={checkboxState ? "true" : "false"}
          onChange={handleCheckBoxChange}
        />
        <label
          htmlFor={categoryName || undefined}
          className="customCheckBoxWrapper"
        >
          <div className="customCheckBox">
            <div className="inner">{categoryName}</div>
          </div>
        </label>
      </div>
    </>
  );
}
