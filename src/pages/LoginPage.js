import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import "./LoginPage.css";

function LoginPage() {
  const navigate = useNavigate();
  const [isSignUp, setIsSignUp] = useState(false);

  // Separate states for login and signup
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [signUpEmail, setSignUpEmail] = useState("");
  const [signUpPassword, setSignUpPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [signUpError, setSignUpError] = useState("");

  const handleLogin = async () => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, loginEmail, loginPassword);
      const user = userCredential.user;
  
      if (!user.emailVerified) {
        setError("Please verify your email before logging in.");
        return;
      }
  
      navigate("/home");
    } catch (error) {
      // Handle different types of login errors
      if (error.code === "auth/user-not-found" || error.code === "auth/invalid-email") {
        setError("Invalid email. Please try again.");
      } else if (error.code === "auth/wrong-password") {
        setError("Invalid password. Please try again.");
      } else {
        setError("Login failed. Please check your credentials.");
      }
    }
  };  

  // Sign-up function
  const handleSignUp = async () => {

    if (signUpPassword !== confirmPassword) {
      setSignUpError("Passwords do not match.");
      return;
    }
    
    try {
      await createUserWithEmailAndPassword(auth, signUpEmail, signUpPassword);
      alert("Sign-up successful! Please check your email to verify your account.");
      setIsSignUp(false); // Switch to login form
      setSignUpError(""); 
    } catch (error) {
      if (error.code === "auth/email-already-in-use") {
        setSignUpError("Email is already in use. Try another one.");
      } else if (error.code === "auth/weak-password") {
        setSignUpError("Password should be at least 8 characters.");
      } else {
        setSignUpError("Failed to sign up. Try again.");
      }
    }
  };
  

  return (
    <div className="brawl-login-container">
      <div className="brawl-background"></div>

      {/* Wrapper for both forms */}
      <div className="brawl-form-wrapper">
        <div className={`brawl-form-container ${isSignUp ? "brawl-signup-active" : ""}`}>

          {/* Login Section */}
          <div className="brawl-login-card">
           
            <h1 className="brawl-login-title">Welcome Back!</h1> 

            <div className="brawl-input-group">
              <input
                type="email"
                placeholder="Email"
                value={loginEmail}
                onChange={(e) => setLoginEmail(e.target.value)}
                className="login-input"
              />

            </div>

            <div className="brawl-input-group">
              <input
                type="password"
                placeholder="Password"
                value={loginPassword}
                onChange={(e) => setLoginPassword(e.target.value)}
                className="login-input"
              />
            </div>

            <div className="remember-me">
              <input type="checkbox" id="rememberMe" />
                <label htmlFor="rememberMe">Remember Me</label>
            </div>

            <a href="/reset-password" className="forgot-password">Forgot Password?</a>
   
            <div className="errorlogin-message">{error && <p>{error}</p>}</div>
            <button className="brawl-login-button" onClick={handleLogin}>LOGIN</button>

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



            <div className="brawl-signuplink-container">
            <p class="signuplink-text1">Predict. <b>Dominate.</b> Win.</p>
            <p class="signuplink-text2">Sign up to get started!</p>
                <button onClick={() => setIsSignUp(true)} className="brawl-signuplink-button">
                  SIGN UP
                </button>
            </div>

           
          </div>

          {/* Sign-Up Section */}
          <div className="brawl-signup-card">
          <h1 className="brawl-signup-title">Create Your Account</h1>
            <div className="brawl-input-group">
              <input
                type="email"
                placeholder="Email"
                value={signUpEmail}
                onChange={(e) => setSignUpEmail(e.target.value)}
                className="signup-input"
              />
            </div>

            <div className="brawl-input-group">
              <input
                type="password"
                placeholder="Password"
                value={signUpPassword}
                onChange={(e) => setSignUpPassword(e.target.value)}
                className="signup-input"
              />
            </div>

            {/* Confirm Password Field */}
            <div className="brawl-input-group">
              <input
                type="password"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="signup-input"
              />
            </div>

            <div className="errorsignup-message">{signUpError && <p>{signUpError}</p>}</div>


            <button className="brawl-signup-button" onClick={handleSignUp}>SIGN UP</button>

            <div className="brawl-loginlink-container">
            <p class="loginlink-text1">Already have an Account?</p>
                <button onClick={() => setIsSignUp(false)} className="brawl-loginlink-button">LOGIN</button>
             
            </div>

          </div>

        </div>
      </div>
    </div>
  );
}

export default LoginPage;
