import { useState } from "react";
import "./Login.scss";
import { useNavigate } from "react-router-dom";
import { ThemeManager } from "../services/ThemeService";
import WitchySelect from "../inputs/Select";

const PICKUP_OPTIONS = [
  "Cauldron Alley",
  "Enchanted Forest Hut",
  "Witchlight Post",
  "Black Cat Cafe",
  "Moonlit Docks",
];

const WITCH_TYPES = ThemeManager.getAllThemeNames();

export default function Login() {
  const [userName, setUserName] = useState("");
  const [pickup, setPickup] = useState<string | null>(null);
  const [witchType, setWitchType] = useState<string | null>(null);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!userName.trim() || !pickup || !pickup.trim()) {
      setError("Please fill out all fields!");
      return;
    }
    localStorage.setItem("userName", userName.trim());
    localStorage.setItem("pickupPoint", pickup.trim());
    if (userName.trim().toLowerCase() === "owner")
      localStorage.setItem("isOwner", "true");
    navigate("/");
  }

  function handleWitchTypeChange(selectedType: string | null) {
    if (!selectedType) return;
    setWitchType(selectedType);
    localStorage.setItem("witchType", selectedType);
    ThemeManager.setTheme(selectedType);
  }

  return (
    <div className="login">
      <div className="bg"></div>
      <svg
        className="text-mask-svg"
        viewBox="0 0 800 205"
        style={{ position: "relative", top: 0, left: 0, zIndex: 2 }}
      >
        <defs>
          <mask id="portal-text-mask">
            <rect width="100%" height="100%" fill="white" />
            <g transform="translate(30, 12)">
              {" "}
              <text
                x="370"
                y="85"
                textAnchor="middle"
                fontFamily="'Dancing Script', cursive"
                fontWeight="700"
                fontSize="72"
                fill="black"
              >
                Merry Meet & Welcome
              </text>
              <text
                x="370"
                y="170"
                textAnchor="middle"
                fontFamily="'Dancing Script', cursive"
                fontWeight="700"
                fontSize="72"
                fill="black"
              >
                to My Secret Market
              </text>
            </g>
          </mask>
        </defs>
        <rect
          className="text-mask"
          width="100%"
          height="100%"
          fill="white"
          mask="url(#portal-text-mask)"
        />
      </svg>
      <div className="wrapper">
        <form
          className="login-form"
          onSubmit={handleSubmit}
          autoComplete="off"
          noValidate
        >
          <div className="form-group">
            <input
              type="text"
              id="userName"
              placeholder="Inscribe your Full Name"
              value={userName}
              required
              onChange={(e) => setUserName(e.target.value)}
              autoFocus
              maxLength={15}
              aria-invalid={!!error && !userName}
            />
            {error && !userName && (
              <div className="input-error-tip">Name Required</div>
            )}
          </div>
          <div className="form-group">
            <WitchySelect
              inputId="pickupPoint"
              options={PICKUP_OPTIONS}
              value={pickup}
              onChange={setPickup}
              placeholder="Choose a Cauldron Drop Point"
              searchable={false}
            />
            {error && !pickup && (
              <div className="input-error-tip">Pickup point Required</div>
            )}
          </div>
          <div className="form-group">
            <WitchySelect
              inputId="witchType"
              options={WITCH_TYPES}
              value={witchType}
              onChange={(value) => handleWitchTypeChange(value)}
              placeholder="Reveal Thy Inner Witch"
              searchable={false}
            />
          </div>
          <button type="submit" className="enter-btn">
            Continue
          </button>
        </form>
      </div>
    </div>
  );
}
