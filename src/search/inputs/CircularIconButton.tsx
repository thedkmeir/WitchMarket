import { ReactNode, useId } from "react";
import { Tooltip, PlacesType } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";
import "./CircularIconButton.scss";

export default function CircularIconButton({
  onChange,
  icon,
  hoverText = "",
  hoverPosition = "bottom",
  disabled = false,
  padding,
}: {
  onChange?: () => void;
  icon?: ReactNode;
  hoverText?: string;
  hoverPosition?: PlacesType;
  disabled?: boolean;
  padding?: number;
}) {
  const tooltipId = useId();

  return (
    <div className="CircularIconButton" style={padding !== undefined ? { padding: `${padding}px` } : undefined}>
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
