import { LogOut } from "lucide-react";
import CircularIconButton from "../inputs/CircularIconButton";
import "./TopTip.scss";

export default function TopTip() {
  const userName = localStorage.getItem("userName");

  return (
    <div className="topTip">
      Blessed Be, {userName}!
      <CircularIconButton
        icon={<LogOut size={20} />}
        hoverPosition="bottom"
        hoverText="Vanish"
        padding={5}
        onChange={() => {
          localStorage.removeItem("userName");
          localStorage.removeItem("pickupPoint");
          window.location.href = "/login"; // Or use navigate("/login") if using React Router hook
        }}
      />
    </div>
  );
}
