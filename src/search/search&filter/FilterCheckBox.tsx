import { useEffect, useState } from "react";
import { categoryService } from "../services/CategoryService";
import CheckBox from "../inputs/CheckBox";

export default function FilterCheckBox({
  categoryName,
  defaultCheckedState,
}: {
  categoryName: string | null;
  defaultCheckedState?: boolean;
}) {
  const [checked, setChecked] = useState<boolean>(
    defaultCheckedState !== undefined ? defaultCheckedState : true
  );

  useEffect(() => {
    const unsubscribe = categoryService.subscribe(categoryName || "", () => {
      if (!categoryName) return;
      const val = categoryService.getCategories().get(categoryName);
      if (val !== undefined) setChecked(val);
    });
    return unsubscribe;
  }, [categoryName]);

  return (
    <CheckBox
      text={categoryName}
      checked={checked}
      onChange={(val) => {
        setChecked(val);
        if (categoryName) categoryService.setCategoryState(categoryName, val);
      }}
    />
  );
}
