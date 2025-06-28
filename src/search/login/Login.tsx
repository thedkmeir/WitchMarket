import { useState } from "react";
import "./Login.scss";
import { useNavigate } from "react-router-dom";
import GradientText from "../inputs/GradientText";

const PICKUP_POINTS = [
  "Cauldron Alley",
  "Enchanted Forest Hut",
  "Witchlight Post",
  "Black Cat Cafe",
  "Moonlit Docks",
];

export default function Login() {
  const [userName, setUserName] = useState("");
  const [pickupPoint, setPickupPoint] = useState("");
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
    navigate("/"); // <-- If using react-router
    // window.location.reload(); // Fallback: reload to trigger RequireAuth
  }

  return (
    <div className="login">
      <div className="bg"></div>
      <svg
        className="text-mask-svg"
        // width="100%"
        // height="120px"
        viewBox="0 0 800 150"
        style={{ position: "relative", top: 0, left: 0, zIndex: 2 }}
      >
        <defs>
          <mask id="portal-text-mask">
            <rect width="100%" height="100%" fill="white" />
            <g transform="translate(30, 12)">
              {" "}
              {/* padding: 30px left, 12px top */}
              <text
                x="370"
                y="50"
                textAnchor="middle"
                fontFamily="'Dancing Script', cursive"
                fontWeight="700"
                fontSize="72"
                fill="black"
              >
                Hello And Welcome
              </text>
              <text
                x="370"
                y="115"
                textAnchor="middle"
                fontFamily="'Dancing Script', cursive"
                fontWeight="700"
                fontSize="72"
                fill="black"
              >
                To My Secret Market
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
        <div>Please enter your full name and pickup point to Enter.</div>
        <form className="login-form" onSubmit={handleSubmit} autoComplete="off">
          <div className="form-group">
            <input
              type="text"
              id="userName"
              placeholder="Enter your full name"
              value={userName}
              required
              onChange={(e) => setUserName(e.target.value)}
              autoFocus
              maxLength={15}
            />
            <label htmlFor="userName">Full Name:</label>
          </div>
          <div className="form-group">
            <select
              id="pickupPoint"
              value={pickupPoint}
              required
              onChange={(e) => setPickupPoint(e.target.value)}
            >
              <option value="" disabled>
                Choose pickup point
              </option>
              {PICKUP_POINTS.map((point) => (
                <option key={point} value={point}>
                  {point}
                </option>
              ))}
            </select>
            <label htmlFor="pickupPoint">Pickup Point:</label>
          </div>
          {error && <div className="error">{error}</div>}
          <button type="submit" className="enter-btn">
            Continue
          </button>
        </form>
      </div>
    </div>
  );
}
