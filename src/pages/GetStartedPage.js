import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./GetStartedPage.css"; // or LoginPage.css if unchanged

function GetStartedPage() {
  const navigate = useNavigate();
  const [animate, setAnimate] = useState(false);

  const handleStart = () => {
    setAnimate(true);

    // Delay navigation to allow animation to play
    setTimeout(() => {
      navigate("/intro");
    }, 600); // match animation duration
  };

  return (
    <div className={`brawl-login-container ${animate ? "fade-out" : ""}`}>
      <div className="brawl-background"></div>

      <div className="brawl-form-wrapper">
        <div className="brawl-form-container">
          <h1 className="brawl-login-title">Welcome to Smart Brawl</h1>
          <p className="signuplink-text1">Predict. <b>Dominate.</b> Win.</p>
          <p className="signuplink-text2">Your ultimate Brawl Stars assistant.</p>

          <button
            className={`brawl-login-button ${animate ? "button-pressed" : ""}`}
            onClick={handleStart}
            disabled={animate}
          >
            Get Started
          </button>
        </div>
      </div>
    </div>
  );
}

export default GetStartedPage;
