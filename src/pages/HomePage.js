import React from "react";
import { useNavigate } from "react-router-dom";
import "./HomePage.css";

function HomePage() {
  const navigate = useNavigate();
  const username = localStorage.getItem("username") || "Brawler"; // Get username from localStorage

  const handleLogout = () => {
    const confirmLogout = window.confirm("Are you sure you want to logout?");
    if (!confirmLogout) return;
  
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("username");
    
    navigate("/");
  };

  const handleMatchPredictionsClick = () => {
    navigate("/team-composition"); // Navigate to TeamCompositionPage
  };

  const goToPrediction = () => {
    navigate('/predict');
  };
  
  return (
    <div className="brawl-home-container">
      <div className="brawl-header">
        <div className="brawl-logo-small">
          <div className="brawl-skull-small"></div>
        </div>
        <h1 className="brawl-title">SMART BRAWL</h1>
        <div className="brawl-user-info">
          <div className="brawl-avatar">
            <div className="brawl-avatar-inner"></div>
          </div>
          <span className="brawl-username">{username}</span>
          <button className="brawl-logout-btn" onClick={handleLogout}>
            LOGOUT
          </button>
        </div>
      </div>

      <div className="brawl-search-container">
        <input
          type="text"
          className="brawl-search-input"
          placeholder="Search for brawlers, maps, or strategies..."
        />
        <button className="brawl-search-btn">SEARCH</button>
      </div>

      <div className="brawl-welcome-banner">
        <h2>WELCOME, <span className="brawl-highlight">{username.toUpperCase()}</span>!</h2>
        <p>Ready to predict your next Brawl Stars victory?</p>
      </div>

      <div className="brawl-gameplay-showcase">
        <h3>FEATURED GAMEPLAY</h3>
        <div className="brawl-gameplay-image">
          <img src="/images/brawl.jpg" alt="Brawl Stars Gameplay" />
          <div className="brawl-gameplay-caption">
            Exciting Brawl Stars Battle Arena
          </div>
        </div>
      </div>

      <div className="brawl-features">
        <div className="brawl-feature-card" onClick={handleMatchPredictionsClick} style={{ cursor: "pointer" }}>
          <div className="brawl-feature-icon prediction"></div>
          <h4>MATCH PREDICTIONS</h4>
          <p>Analyze and predict your gameplay outcomes</p>
        </div>
      <div className="brawl-feature-card" onClick={goToPrediction} style={{ cursor: 'pointer' }}>
        <div className="brawl-feature-icon strategy"></div>
        <h4>MATCH PREDICTIONS 2</h4>
        <p> predict your gameplay outcomes 2.0</p>
      </div>
        <div className="brawl-feature-card">
          <div className="brawl-feature-icon stats"></div>
          <h4>PLAYER STATS</h4>
          <p>Track your performance and progress</p>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
