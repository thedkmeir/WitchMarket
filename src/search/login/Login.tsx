import { useState } from "react";
import "./Login.scss";
import { useNavigate } from "react-router-dom";
import { ThemeManager } from "../services/ThemeService";

const PICKUP_POINTS = [
  "Cauldron Alley",
  "Enchanted Forest Hut",
  "Witchlight Post",
  "Black Cat Cafe",
  "Moonlit Docks",
];

const WITCH_TYPES = ThemeManager.getAllThemeNames();

export default function Login() {
  const [userName, setUserName] = useState("");
  const [pickupPoint, setPickupPoint] = useState("");
  const [witchType, setWitchType] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!userName.trim() || !pickupPoint.trim()) {
      setError("Please fill out all fields!");
      return;
    }
    localStorage.setItem("userName", userName.trim());
    localStorage.setItem("pickupPoint", pickupPoint.trim());
    if (userName.trim().toLowerCase() === "owner")
      localStorage.setItem("isOwner", "true");
    navigate("/");
  }

  function handleWitchTypeChange(e: React.ChangeEvent<HTMLSelectElement>) {
    const selectedType = e.target.value;
    localStorage.setItem("witchType", selectedType);
    ThemeManager.setTheme(selectedType);
  }

  return (
    <div className="login">
      <div className="bg"></div>
      <svg
        className="text-mask-svg"
        viewBox="0 0 800 205"
        style={{ position: "relative", top: 0, left: 0, zIndex: 2, }}
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
            <select
              id="pickupPoint"
              value={pickupPoint}
              required
              onChange={(e) => setPickupPoint(e.target.value)}
              aria-invalid={!!error && !pickupPoint}
            >
              <option value="" disabled>
                Choose a Cauldron Drop Point
              </option>
              {PICKUP_POINTS.map((point) => (
                <option key={point} value={point}>
                  {point}
                </option>
              ))}
            </select>
            {error && !pickupPoint && (
              <div className="input-error-tip">Pickup point Required</div>
            )}
          </div>
          <div className="form-group">
            <select
              id="witchType"
              value={witchType}
              required
              onChange={(e) => {
                setWitchType(e.target.value);
                handleWitchTypeChange(e);
              }}
            >
              <option value="" disabled>
                Reveal Thy Inner Witch
              </option>
              {WITCH_TYPES.map((point) => (
                <option key={point} value={point}>
                  {point}
                </option>
              ))}
            </select>
          </div>
          <button type="submit" className="enter-btn">
            Continue
          </button>
        </form>
      </div>
    </div>
  );
}
