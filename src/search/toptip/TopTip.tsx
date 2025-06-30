import { useNavigate } from "react-router-dom";
import { LogOut } from "lucide-react";
import CircularIconButton from "../inputs/CircularIconButton";
import "./TopTip.scss";

export default function TopTip() {
  const userName = localStorage.getItem("userName");
  const navigate = useNavigate();

  return (
    <div className="topTip">
      Blessed Be, {userName}!
      <CircularIconButton
        icon={<LogOut size={20} />}
        hoverPosition="bottom"
        hoverText="Vanish"
        padding={5}
        onChange={() => {
          localStorage.clear();
          navigate("/login", { replace: true });
        }}
      />
    </div>
  );
}