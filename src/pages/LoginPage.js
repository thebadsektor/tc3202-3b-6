import React from "react";
import { useNavigate } from "react-router-dom";
import "./LoginPage.css";

function LoginPage() {
  const navigate = useNavigate();

  return (
    <div className="brawl-login-container">
      <div className="brawl-background"></div>

      <div className="brawl-form-wrapper">
        <div className="brawl-form-container">

          <div className="brawl-login-card">
            <h1 className="brawl-login-title">Welcome Back!</h1>

            <div className="brawl-input-group">
              <input type="email" placeholder="Email" className="login-input" />
            </div>

            <div className="brawl-input-group">
              <input type="password" placeholder="Password" className="login-input" />
            </div>

            <div className="remember-me">
              <input type="checkbox" id="rememberMe" />
              <label htmlFor="rememberMe">Remember Me</label>
            </div>

            <a href="/reset-password" className="forgot-password">Forgot Password?</a>

            <button className="brawl-login-button" onClick={() => navigate("/home")}>
              Continue to Home
            </button>

            <div className="separator">
              <span>or</span>
            </div>

            <button className="google-login-btn">
              <img src="/images/google.png" alt="Google Logo" className="google-logo" />
              Log in with Google
            </button>

            <button className="supercell-login-btn">
              <img src="/images/indesign.png" alt="Supercell ID Logo" className="supercell-logo" />
              Log in with Supercell ID
            </button>

          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
