import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword, sendEmailVerification } from "firebase/auth";
import { auth } from "../firebase"; // Import Firebase config
import "./LoginPage.css"; // Reuse login page styles

function SignupPage() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  // Function to validate email format
  const isValidEmail = (email) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  };

  const handleSignup = async () => {
    // Validate inputs
    if (!username || !email || !password || !confirmPassword) {
      setError("All fields are required.");
      return;
    }

    if (!isValidEmail(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords don't match.");
      return;
    }

    try {
      // Create the user in Firebase
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Send email verification
      await sendEmailVerification(user);
      setMessage("A verification email has been sent. Please check your inbox.");

      // Show alert and redirect to login page
      alert("Registration successful! Please verify your email before logging in.");
      navigate("/"); // Redirect to login page
    } catch (error) {
      setError(error.message);
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
        
        <h1 className="brawl-title">SIGN UP</h1>
        
        <div className="brawl-input-group">
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="brawl-input"
          />
        </div>
        
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
        
        <div className="brawl-input-group">
          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="brawl-input"
          />
        </div>
        
        <button className="brawl-button" onClick={handleSignup}>
          SIGN UP
        </button>
        
        <button 
          className="brawl-back-button" 
          onClick={() => navigate("/")}
        >
          BACK TO LOGIN
        </button>
        {error && <p className="brawl-error">{error}</p>}
        {message && <p className="brawl-success">{message}</p>}
      </div>
    </div>
  );
}

export default SignupPage;
