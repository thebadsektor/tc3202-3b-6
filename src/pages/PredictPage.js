import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./PredictPage"; // or LoginPage.css if unchanged

function PredictPage() {
  const navigate = useNavigate();
  const [animate, setAnimate] = useState(false);

  const handleStart = () => {
    setAnimate(true);

    // Delay navigation to allow animation to play
    setTimeout(() => {
      navigate("/home");
    }, 600); // match animation duration
  };

  return (
    <div className={`predict-container ${animate ? "fade-out" : ""}`}>
      <div className="predict-background"></div>

      <div className="predict-form-wrapper">
        <div className="predict-form-container">
          <h1 className="predict-login-title">Welcome to Smart Brawl</h1>
          <p className="predict-text1">Predict. <b>Dominate.</b> Win.</p>
          <p className="predict-text2">Your ultimate Brawl Stars assistant.</p>

          <button
            className={`predict-login-button ${animate ? "button-pressed" : ""}`}
            onClick={handleStart}
            disabled={animate}
          >
            Predict Now
          </button>
        </div>
      </div>
    </div>
  );
}

export default PredictPage;
