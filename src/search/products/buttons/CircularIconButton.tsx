import { ReactNode, useId } from "react";
import { Tooltip, PlacesType } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";
import "./CircularIconButton.scss";
import "../../../index.scss"
export default function CircularIconButton({
  onChange,
  icon,
  hoverText = "",
  hoverPosition = "bottom",
  disabled = false, // <-- New prop, defaults to false
}: {
  onChange?: () => void;
  icon?: ReactNode;
  hoverText?: string;
  hoverPosition?: PlacesType;
  disabled?: boolean;
}) {
  const tooltipId = useId();

  return (
    <div className="CircularIconButton">
      <div className="customButtonWrapperCircle">
        <button
          type="button"
          onClick={() => !disabled && onChange && onChange()}
          className={`customButtonCircle${disabled ? " disabled" : ""}`}
          data-tooltip-id={tooltipId}
          data-tooltip-content={hoverText}
          disabled={disabled}
          tabIndex={disabled ? -1 : 0}
        >
          <div className="icon">{icon}</div>
        </button>
        <Tooltip
          id={tooltipId}
          place={hoverPosition}
          variant="dark"
          delayShow={100}
          positionStrategy="fixed"
        />
      </div>
    </div>
  );
}