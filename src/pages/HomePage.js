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

  return (
    <div className="brawl-home-container">
      <div className="brawl-header">
        <div className="brawl-logo-small">
          <div className="brawl-skull-small"></div>
        </div>
        <h1 className="brawl-title">BRAWL PREDICTOR</h1>
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
          <img src="/images/down.jpg" alt="Brawl Stars Gameplay" />
          <div className="brawl-gameplay-caption">
            Exciting Brawl Stars Battle Arena
          </div>
        </div>
      </div>

      <div className="brawl-features">
        <div className="brawl-feature-card">
          <div className="brawl-feature-icon prediction"></div>
          <h4>MATCH PREDICTIONS</h4>
          <p>Analyze and predict your gameplay outcomes</p>
        </div>
        <div className="brawl-feature-card">
          <div className="brawl-feature-icon strategy"></div>
          <h4>STRATEGIES</h4>
          <p>Learn winning tactics for every brawler</p>
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