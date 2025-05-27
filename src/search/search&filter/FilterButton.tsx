import { useState } from "react";
import "./FilterButton.scss";

export default function FilterButton({
  ButtonText,
  defaultCheckedState,
  onChange,
}: {
  ButtonText: string | null;
  defaultCheckedState?: boolean;
  onChange?: (checked: boolean, ButtonText: string | null) => void;
}) {
  const [isActive, setIsActive] = useState(defaultCheckedState ?? true);

  function handleClick() {
    const newState = !isActive;
    setIsActive(newState);
    if (onChange) onChange(newState, ButtonText);
  }

  return (
    <div className="FilterButton">
      <div className="customButtonWrapper">
        <button type="button" onClick={handleClick} className={`customButton`}>
          <div className="inner">{ButtonText}</div>
        </button>
      </div>
    </div>
  );
}
