import { Tooltip, PlacesType } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";
import { useId } from "react";
import "./CheckBox.scss";

export default function CheckBox({
  text,
  checked,
  onChange,
  hoverText = "",
  hoverPosition = "bottom",
}: {
  text: string | null;
  checked: boolean;
  onChange?: (checked: boolean) => void;
  hoverText?: string;
  hoverPosition?: PlacesType;
}) {
  const tooltipId = useId();

  return (
    <div className="customCheckBoxHolder">
      <input
        type="checkbox"
        checked={checked}
        id={text || undefined}
        className="customCheckBoxInput"
        value={checked ? "true" : "false"}
        onChange={(e) => onChange && onChange(e.target.checked)}
      />
      <label
        htmlFor={text || undefined}
        className="customCheckBoxWrapper"
        data-tooltip-id={tooltipId}
        data-tooltip-content={hoverText}
      >
        <div className="customCheckBox">
          <div className="inner">{text}</div>
        </div>
      </label>
      <Tooltip
        id={tooltipId}
        place={hoverPosition}
        variant="dark"
        delayShow={100}
        positionStrategy="fixed"
      />
    </div>
  );
}
