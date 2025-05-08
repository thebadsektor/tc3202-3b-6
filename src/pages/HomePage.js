import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./HomePage.css";

function HomePage() {
  const navigate = useNavigate();
  const username = "Brawler";
  const [activeIndex, setActiveIndex] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  // Sample brawler data for the carousel
  const brawlers = [
    { id: 1, name: "Lee Panot", image: "/images/leee.jpg" },
    { id: 2, name: "James Bayag", image: "/images/james.jpg" },
    { id: 3, name: "Kinn-antot", image: "/images/kinn.jpg" },
    { id: 4, name: "Batusay", image: "/images/eyyy.jpg" },
    { id: 5, name: "Ed Primo", image: "/images/edd.jpg" },
    { id: 6, name: "No ones Property", image: "/images/Argie.jpg" },
    { id: 7, name: "Predator", image: "/images/karlito.jpg" },
  ];
  useEffect(() => {
    // Auto-rotate the carousel
    const interval = setInterval(() => {
      setActiveIndex((prevIndex) => (prevIndex + 1) % brawlers.length);
    }, 3000);
    // Set animation delay for initial page load
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 300);
    // Enable scrolling on body
    document.body.style.overflow = "auto";
    document.body.style.height = "auto";
    return () => {
      clearInterval(interval);
      clearTimeout(timer);
    };
  }, [brawlers.length]);
  const handleCarouselNav = (index) => {
    setActiveIndex(index);
  };
  const handleMatchPredictionsClick = () => {
    navigate("/team-composition");
  };
  const gotoBrawlerList = () => {
    navigate("/brawler");
  };
  const getCarouselItemClass = (index) => {
    // Calculate the position relative to the active index
    const diff = (brawlers.length + (index - activeIndex)) % brawlers.length;
    // Assign classes based on position
    if (diff === 0) return "carousel-item active";
    if (diff === 1) return "carousel-item next";
    if (diff === 2) return "carousel-item far-next";
    if (diff === brawlers.length - 1) return "carousel-item prev";
    if (diff === brawlers.length - 2) return "carousel-item far-prev";
    return "carousel-item hidden";
  };
  return (
    <div className={`brawl-home-container ${isLoaded ? 'loaded' : ''}`}>
      {/* Stars background */}
      <div className="stars-container">
        {[...Array(20)].map((_, i) => (
          <div 
            key={i} 
            className="star" 
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`
            }}
          />
        ))}
      </div>
      {/* Header */}
      <div className="brawl-header">
        <div className="brawl-logo">
          <div className="logo-text">Smart Brawl</div>
        </div>
        <div className="brawl-nav-buttons">
          <button className="brawl-nav-button" onClick={handleMatchPredictionsClick}>
            PREDICT MATCH
          </button>
          <button className="brawl-nav-button">
            MATCH PREDICTIONS 2
          </button>
          <button className="brawl-nav-button" onClick={gotoBrawlerList}>
            ALL BRAWLERS
          </button>
        </div>
      </div>
      {/* AI Assistant button with floating animation */}
      <div className="ai-assistant-container">
        <button 
          className="ai-assistant-button" 
          onClick={() => navigate("/lumina")}
        >
          <span className="ai-icon">./.</span>
          <span>Lumina ni ed</span>
        </button>
      </div>
      {/* Welcome banner with improved animation */}
      <div className="brawl-welcome-banner">
        <h2 className="welcome-title">
          WELCOME, <span className="brawl-highlight">{username.toUpperCase()}</span>!
        </h2>
        <p className="welcome-subtitle">Ready to predict your next Brawl Stars victory?</p>
      </div>
      {/* 3D Carousel */}
      <div className="carousel-container">
        <h3 className="carousel-title">FEATURED BRAWLERS</h3>
        <div className="carousel-wrapper">
          <div className="carousel">
            {brawlers.map((brawler, index) => (
              <div 
                key={brawler.id} 
                className={getCarouselItemClass(index)}
                onClick={() => handleCarouselNav(index)}
              >
                <div className="carousel-card">
                  <img src={brawler.image} alt={brawler.name} />
                  <div className="carousel-card-content">
                    <h4>{brawler.name}</h4>
                   
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        {/* Carousel navigation dots */}
        <div className="carousel-dots">
          {brawlers.map((_, index) => (
            <span 
              key={index} 
              className={`carousel-dot ${index === activeIndex ? 'active' : ''}`}
              onClick={() => handleCarouselNav(index)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default HomePage;