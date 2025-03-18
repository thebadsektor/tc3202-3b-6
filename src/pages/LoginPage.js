import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import "./LoginPage.css";

function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async () => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Check if the email is verified
      if (!user.emailVerified) {
        setError("Please verify your email before logging in.");
        return;
      }

      // Redirect to home page if verified
      navigate("/home");
    } catch (error) {
      setError("Invalid email or password.");
    }
  };
  return (
    <div className="brawl-login-container">
      <div className="brawl-background"></div>
      <div className="brawl-login-card">
        <div className="brawl-logo">
          <div className="brawl-logo-circle">
            <div className="brawl-skull">
              <div className="brawl-eye left"></div>
              <div className="brawl-eye right"></div>
              <div className="brawl-nose"></div>
            </div>
          </div>
        </div>

        <h1 className="brawl-title">SMART BRAWL</h1>

        <div className="brawl-input-group">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="brawl-input"
          />
        </div>

        <div className="brawl-input-group">
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="brawl-input"
          />
        </div>

        <button className="brawl-button" onClick={handleLogin}>
          LOGIN
        </button>

        <div className="brawl-signup-link">
          <p>Don't have an account? 
            <button onClick={() => navigate("/signup")} className="brawl-text-button">Sign Up</button>
          </p>
        </div>

        {error && <p className="brawl-error">{error}</p>}
      </div>
    </div>
  );
}

export default LoginPage;
