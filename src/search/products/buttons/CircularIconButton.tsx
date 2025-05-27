import { ReactNode, useId } from "react";
import { Tooltip, PlacesType } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";
import "./CircularIconButton.scss";

export default function CircularIconButton({
  onChange,
  icon,
  hoverText = "",
  hoverPosition = "bottom",
}: {
  onChange?: () => void;
  icon?: ReactNode;
  hoverText?: string;
  hoverPosition?: PlacesType;
}) {
  // const tooltipId = useId() + hoverPosition; // dynamic ID to force re-render
  const tooltipId = useId(); // dynamic ID to force re-render

  return (
    <div className="CircularIconButton">
      <div className="customButtonWrapperCircle">
        <button
          type="button"
          onClick={(e) => onChange && onChange()}
          className="customButtonCircle"
          data-tooltip-id={tooltipId}
          data-tooltip-content={hoverText}
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