import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./HomePage.css";

function HomePage() {
  const navigate = useNavigate();
  const username = "Brawler";
  const [isLoaded, setIsLoaded] = useState(false);
  const [currentBgIndex, setCurrentBgIndex] = useState(0);
  const [glowPosition, setGlowPosition] = useState({ x: 50, y: 50 });
  
  const backgroundImages = [
    "/images/nani.jpg",
    "/images/smilee.png",
    "/images/spikee.png"
  ];
  
  useEffect(() => {
    // Animation load effect timer
    const loadTimer = setTimeout(() => {
      setIsLoaded(true);
    }, 300);
    
    // Background image slider timer
    const bgTimer = setInterval(() => {
      setCurrentBgIndex((prevIndex) => 
        prevIndex === backgroundImages.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000); // Change background every 5 seconds
    
    // Animate welcome banner glow effect position
    const glowTimer = setInterval(() => {
      setGlowPosition({
        x: 30 + Math.random() * 40,
        y: 30 + Math.random() * 40
      });
    }, 3000);
    
    // Reset body styles to ensure proper layout
    document.body.style.overflow = "auto";
    document.body.style.height = "100%";
    
    return () => {
      clearTimeout(loadTimer);
      clearInterval(bgTimer);
      clearInterval(glowTimer);
      // Reset styles when leaving component
      document.body.style.overflow = "";
      document.body.style.height = "";
    };
  }, [backgroundImages.length]);
  
  const handleMatchPredictionsClick = () => {
    navigate("/team-composition");
  };
  
  const gotoBrawlerList = () => {
    navigate("/brawler");
  };
  
  const gotoMapDetails = () => {
    navigate("/map-show");
  };
  
  return (
    <div className={`brawl-home-container ${isLoaded ? 'loaded' : ''}`}>
      {/* Background image slider with glowing elements */}
      <div className="background-slider">
        {backgroundImages.map((_, index) => (
          <div
            key={index}
            className={`background-slide ${index === currentBgIndex ? 'active' : ''}`}
          />
        ))}
        {/* Glowing orbs */}
        <div className="glow-orb glow-orb-1"></div>
        <div className="glow-orb glow-orb-2"></div>
        <div className="glow-orb glow-orb-3"></div>
        <div className="glow-orb glow-orb-4"></div>
        {/* Energy particles */}
        <div className="energy-particle particle-1"></div>
        <div className="energy-particle particle-2"></div>
        <div className="energy-particle particle-3"></div>

        <div className="background-blur"></div>
      </div>
      
      {/* Header */}
      <div className="brawl-header">
        <div className="brawl-logo">
          <img 
            src="/images/logo.png" 
            alt="Brawl Logo" 
            className="brawl-logo-img" 
          />
          <div className="logo-text">Smart Brawl</div>
        </div>
        
        <nav className="brawl-nav">
          <button className="brawl-nav-button" onClick={handleMatchPredictionsClick}>
            PREDICT MATCH
          </button>
          <button className="brawl-nav-button" onClick={gotoMapDetails}>
            BRAWLERS ARENA
          </button>
          <button className="brawl-nav-button" onClick={gotoBrawlerList}>
            BRAWLERS
          </button>
        </nav>
      </div>
      
      {/* Main content with enhanced welcome banner */}
      <div className="main-content">
        {/* Enhanced Welcome Banner */}
        <div className={`brawl-welcome-container ${isLoaded ? 'loaded' : ''}`}>
          {/* Background elements */}
          <div className="welcome-bg">
            <div className="star-field">
              {[...Array(20)].map((_, i) => (
                <div 
                  key={i} 
                  className="star" 
                  style={{
                    top: `${Math.random() * 100}%`,
                    left: `${Math.random() * 100}%`,
                    animationDelay: `${Math.random() * 3}s`,
                    animationDuration: `${3 + Math.random() * 4}s`
                  }}
                />
              ))}
            </div>
            
            <div 
              className="glow-effect" 
              style={{
                left: `${glowPosition.x}%`,
                top: `${glowPosition.y}%`
              }}
            />
            
            <div className="welcome-card-border">
              <div className="border-bottom"></div>
              <div className="border-left"></div>
            </div>
          </div>
          
          {/* Content */}
          <div className="welcome-content">
            <h2 className="welcome-title">
              WELCOME, <span className="username-highlight">{username.toUpperCase()}</span>!
            </h2>
            
            <div className="welcome-text-container">
              <p className="welcome-subtitle">
                Whether you're planning your next match, checking strong picks, or learning more
                about your favorite brawlers, this is your place for helpful tips, predictions,
                and better choices of brawlers.
              </p>
            </div>
            
            <div className="welcome-decoration">
            </div>
          </div>
        </div>

        {/* Features Highlight Section - Optimized layout based on image */}
        <div className="brawl-features-container">

          <div className="features-background">
              <div className="feature-particle particle-1"></div>
              <div className="feature-particle particle-2"></div>
              <div className="feature-particle particle-3"></div>
              <div className="feature-particle particle-4"></div>
              <div className="feature-particle particle-5"></div>
              <div className="feature-particle particle-6"></div>
          </div>

          <div className="features-title-wrapper">
            <h2 className="features-title">SMART BRAWL FEATURES</h2>
            <div className="features-title-line"></div>
          </div>
          <p className="features-subtitle">
            With data from past and recent Brawl Stars Battle logs, we provide a useful and actionable data for you to dominate your opponents.
          </p>
          
          {/* Enhanced features list with animations */}
        <div className="features-list">
          <div className="feature-item">
            <div className="feature-glow"></div>
              <div className="feature-image-wrapper">
                <div className="feature-image-glow"></div>
                <img src="/images/f1card.jpg" alt="Team Compositions" className="feature-image" />
              </div>

        <div className="feature-content">
          <h3 className="feature-title">TEAM COMPOSITIONS</h3>
          <div className="feature-title-underline"></div>
          <p className="feature-description">Discover the most effective brawler combinations.</p>
           <button className="feature-see-more" onClick={handleMatchPredictionsClick}>
        <span>SEE MORE</span>
        <div className="button-arrow"></div>
      </button>
        </div>
     </div>
            
            <div className="feature-divider"></div>
            
            <div className="feature-item">
      <div className="feature-glow"></div>
      <div className="feature-image-wrapper">
        <div className="feature-image-glow"></div>
        <img src="/images/f2card.jpg" alt="Map Showcase" className="feature-image" />
      </div>
      <div className="feature-content">
        <h3 className="feature-title">MAP SHOWCASE</h3>
        <div className="feature-title-underline"></div>
        <p className="feature-description">Explore specific game modes and maps, showing which characters have the advantage or the highest win rates.</p>
         <button className="feature-see-more" onClick={gotoMapDetails}>
        <span>SEE MORE</span>
        <div className="button-arrow"></div>
      </button>
      </div>
    </div>
            
            <div className="feature-divider"></div>
            
            <div className="feature-item">
              <div className="feature-glow"></div>
      <div className="feature-image-wrapper">
        <div className="feature-image-glow"></div>
                <img src="/images/f3card.jpg" alt="Counter Picks" className="feature-image" />
              </div>
              <div className="feature-content">
                <h3 className="feature-title">BROWSE BRAWLERS</h3>
                <div className="feature-title-underline"></div>
                <p className="feature-description">Learn every brawlers and their detailed info to level up your gamestyle.</p>
                 <button className="feature-see-more" onClick={gotoBrawlerList}>
        <span>SEE MORE</span>
        <div className="button-arrow"></div>
      </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* AI Assistant */}
      <div className="ai-assistant-container">
        <button className="ai-assistant-button" onClick={() => navigate("/lumina")}>
          <span className="visually-hidden">AI Assistant</span>
        </button>
      </div>
    </div>
  );
}

export default HomePage;