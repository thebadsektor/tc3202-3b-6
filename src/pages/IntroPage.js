import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./IntroPage.css"; // or LoginPage.css if unchanged

function IntroPage() {
  const navigate = useNavigate();
  const [animate, setAnimate] = useState(false);

  const handleStart = () => {
    setAnimate(true);

    // Delay navigation to allow animation to play
    setTimeout(() => {
      navigate("/predict");
    }, 600); // match animation duration
  };

  return (
    <div className={`intro-container ${animate ? "fade-out" : ""}`}>
      <div className="intro-background"></div>

      <div className="intro-form-wrapper">
        <div className="intro-form-container">
          <h1 className="intro-login-title">Welcome to Smart Brawl</h1>
          <p className="intro-text1">Predict. <b>Dominate.</b> Win.</p>
          <p className="intro-text2">Your ultimate Brawl Stars assistant.</p>

          <button
            className={`intro-login-button ${animate ? "button-pressed" : ""}`}
            onClick={handleStart}
            disabled={animate}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}

export default IntroPage;
