import { ReactNode } from "react";
import "./TextButton.scss";

export default function TextButton({
  text,
  icon,
  onClick,
}: {
  text: string | null;
  icon?: ReactNode;
  onClick?: () => void;
}) {
  return (
    <div className="Button">
      <div className="customButtonWrapper">
        <button type="button" onClick={onClick} className={`customButton`}>
          {icon}
          <div className="inner">{text}</div>
        </button>
      </div>
    </div>
  );
}
