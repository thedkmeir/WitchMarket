import { ReactNode } from "react";
import "./TextButton.scss";

export default function TextButton({
  text,
  icon,
  fontSize,
  onClick,
}: {
  text: string | null;
  icon?: ReactNode;
  fontSize?: number;
  onClick?: () => void;
}) {
  return (
    <div className="Button">
      <div className="customButtonWrapper">
        <button type="button" onClick={onClick} className={`customButton`}>
          {icon}
          <div className="inner" style={{ fontSize: fontSize }}>{text}</div>
        </button>
      </div>
    </div>
  );
}
