import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./HomePage.css";

function HomePage() {
  const navigate = useNavigate();
  const username = "Brawler";

  // Enhanced slideshow state
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [previousImageIndex, setPreviousImageIndex] = useState(null);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const slideImages = [
    "/images/brawl.jpg",
    "/images/bakla.jpg",
    "/images/down syndrome.jpg"
  ];

  const slideCaptions = [
    "Exciting Brawl Stars Battle Arena",
    "Epic Team Battles in Brawl Stars",
    "Strategic Gameplay in Action"
  ];

  // Enhanced slideshow effect with transitions
  useEffect(() => {
    const transitionImage = () => {
      setPreviousImageIndex(currentImageIndex);
      setIsTransitioning(true);

      setCurrentImageIndex((prevIndex) =>
        prevIndex === slideImages.length - 1 ? 0 : prevIndex + 1
      );

      // Reset transition state after animation completes
      setTimeout(() => {
        setIsTransitioning(false);
      }, 1000);
    };

    const intervalId = setInterval(transitionImage, 5000);

    return () => clearInterval(intervalId);
  }, [currentImageIndex, slideImages.length]);

  const handleMatchPredictionsClick = () => {
    navigate("/team-composition");
  };

  // const goToPrediction = () => {
  //   navigate("/predict");
  // };

  const gotoBrawlerList = () => {
    navigate("/brawler");
  };

  return (
    <div className="brawl-home-container">
      <div className="brawl-header">
        <div className="brawl-logo-container">
          <div className="brawl-logo-small">
            <div className="brawl-skull-small"></div>
          </div>
          <div className="brawl-nav-buttons">
            <button className="brawl-nav-button" onClick={handleMatchPredictionsClick}>
              MATCH PREDICTIONS
            </button>
            <button className="brawl-nav-button">
              MATCH PREDICTIONS 2
            </button>
            <button className="brawl-nav-button" onClick={gotoBrawlerList}>
              PLAYER STATS
            </button>
          </div>
        </div>
        <div className="brawl-user-info">
          <div className="brawl-avatar">
            <div className="brawl-avatar-inner"></div>
          </div>
          <span className="brawl-username">{username}</span>
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
        <h2>
          WELCOME, <span className="brawl-highlight">{username.toUpperCase()}</span>!
        </h2>
        <p>Ready to predict your next Brawl Stars victory?</p>
      </div>

      <div className="brawl-gameplay-showcase">
        <h3>FEATURED GAMEPLAY</h3>
        <div className="brawl-slideshow-container">
          {/* Current Image */}
          <div className={`brawl-gameplay-image ${isTransitioning ? "fade-in" : "active"}`}>
            <img
              src={slideImages[currentImageIndex]}
              alt={`Brawl Stars Gameplay ${currentImageIndex + 1}`}
            />
            <div className="brawl-gameplay-caption">
              {slideCaptions[currentImageIndex]}
            </div>
          </div>

          {/* Previous Image (for transition effect) */}
          {isTransitioning && previousImageIndex !== null && (
            <div className="brawl-gameplay-image fade-out">
              <img
                src={slideImages[previousImageIndex]}
                alt={`Brawl Stars Gameplay ${previousImageIndex + 1}`}
              />
              <div className="brawl-gameplay-caption">
                {slideCaptions[previousImageIndex]}
              </div>
            </div>
          )}

          {/* Slideshow indicators */}
          <div className="brawl-slideshow-indicators">
            {slideImages.map((_, index) => (
              <div
                key={index}
                className={`brawl-indicator ${index === currentImageIndex ? "active" : ""}`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomePage;