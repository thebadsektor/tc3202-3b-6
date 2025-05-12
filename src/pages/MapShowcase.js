import React, { useEffect, useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './MapShowcase.css';

  const MapShowcase = () => {
    const [isLoading, setIsLoading] = useState(true);
    const particlesContainerRef = useRef(null);
    const navigate = useNavigate();
    const glowingOrbs = Array(6).fill(null); // 6 glowing orbs
    const twinklingStars = Array(30).fill(null); // 30 twinkling stars


    useEffect(() => {
      // Simulate loading time for animation effects
      const timer = setTimeout(() => {
        setIsLoading(false);
      }, 800);
      
      // Create and setup particles
      createParticlesEffect();
      
      return () => {
        clearTimeout(timer);
        // Clean up particles when component unmounts
        if (particlesContainerRef.current) {
          document.body.removeChild(particlesContainerRef.current);
        }
      };
    }, []);
    
    // Function to create particles effect
    const createParticlesEffect = () => {
      // Create container for particles
      const container = document.createElement('div');
      container.className = 'particles-container';
      document.body.appendChild(container);
      particlesContainerRef.current = container;
      
      // Create initial particles
      for (let i = 0; i < 50; i++) {
        createParticle(container);
      }
    };
    
    // Function to create individual particles
    const createParticle = (container) => {
      const particle = document.createElement('div');
      particle.className = 'particle';
      
      // Random position
      const posX = Math.random() * window.innerWidth;
      
      // Random size
      const size = Math.random() * 3 + 1;
      
      // Random animation duration
      const duration = Math.random() * 15 + 10;
      const delay = Math.random() * 10;
      
      // Set particle styles
      particle.style.left = posX + 'px';
      particle.style.bottom = -10 + 'px';
      particle.style.width = size + 'px';
      particle.style.height = size + 'px';
      particle.style.opacity = Math.random() * 0.5 + 0.1;
      particle.style.animationDuration = duration + 's';
      particle.style.animationDelay = delay + 's';
      
      // Randomly make some particles glow more for visual interest
      if (Math.random() > 0.8) {
        particle.style.boxShadow = `0 0 ${Math.random() * 6 + 2}px rgba(100, 255, 218, 0.8)`;
      }
      
      container.appendChild(particle);
      
      // Remove and recreate particle after animation ends
      setTimeout(() => {
        if (container.contains(particle)) {
          container.removeChild(particle);
          createParticle(container);
        }
      }, (duration + delay) * 1000);
    };


    const handleBackClick = () => {
    navigate('/home');
  };

    const gemGrabMaps = [
      "Hard Rock Mine", "Crystal Arcade", "Deathcap Trap", "Gem Fort",
      "Double Swoosh", "Undermine",  
      "Last Stop", "Lilygear Lake", "Local Restaurants", "On A Roll",
      "Open Space", "Rustic Arcade", "Storage Sector"
    ];

    const heistMaps = [
      "Kaboom Canyon", "Safe Zone", "Hot Potato", "Bridge Too Far",
      "Pit Stop", "Plain Text", "Subway Surfers", "Ghoulish Lagoon"
    ];

    const bountyMaps = [
      "Layer Cake", "Shooting Star", "Brace for Impact", "Dry Season",
      "No excuses", "Hideout"
    ];

    const brawlBallMaps = [
      "Backyard Bowl", "Sneaky Fields", "Pinball Dreams",
      "Pinhole Punt", "Beach Ball", "Grass Knot", 
      "Priceless Cactus", "Second Try", "Spiraling Out", 
      "Sunny Soccer", "Super Beach", "Trickey", "Triple Dribble"
    ];

    const knockoutMaps = [
      "Goldarm Gulch", "Belles Rock", "Out in the Open", "New Perspective",
    "Flowing Springs", "Close Quarters", 
      "Deep End", "Double Decker", "Flowing Springs", "Four Levels", "H For...",
      "Healthy Middle Ground", "Mossy Crossing", "New Horizons", "Streets with no Name"
    ];

    const hotZoneMaps = [
      "Dueling Beetles", "Open Zone",
      "Ring of Fire", "Bejeweled", "Abracadabra", 
      "Fishing Red", "In the Liminal", "Open Business"
    ];

    const getImagePath = (mapName) => {
      return `/maps/${mapName.toLowerCase().replace(/ /g, '-').replace(/[']/g, '')}.png`;
    };

    const renderMapRow = (maps, title, iconPath = null) => {
      // Add some shimmer effect during loading
      const cardClass = isLoading ? "map-card loading-shimmer" : "map-card";

      return (
        <div className="map-row">
          <div className="map-header">
            {iconPath && (
              <img
                src={iconPath}
                alt={`${title} Icon`}
                className="map-icon"
              />
            )}
            <h2 className="map-title">
              {title}
              <span className="map-count">{maps.length}</span>
            </h2>
          </div>

          <div className="map-grid-container">
            <div className="map-grid">
              {maps.map((mapName, index) => (
                <Link
                  key={index}
                  to={`/map/${encodeURIComponent(mapName)}`}
                  className={cardClass}
                  style={{ 
                    animationDelay: `${index * 0.05}s`,
                    opacity: isLoading ? 0.7 : 1,
                    transition: 'opacity 0.5s ease, transform 0.3s ease, box-shadow 0.3s ease'
                  }}
                >
                  <div className="map-image-container">
                    <img
                      src={getImagePath(mapName)}
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = '/maps/default.png';
                      }}
                      alt={mapName}
                      className="map-image"
                    />
                  </div>
                  <span className="map-name">{mapName}</span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      );
    };
    


    return (
      <div className="map-showcase">
        {/* New Title and Tagline Section */}
        
      {/* Background Elements */}
      {glowingOrbs.map((_, index) => (
        <div key={`orb-${index}`} className="glow-circle"></div>
      ))}
      
      {twinklingStars.map((_, index) => (
        <div key={`star-${index}`} className="stars"></div>
      ))}
        <div className="map-showcase-header">
          <h1 className="map-showcase-title">BRAWLERS ARENA</h1>
          <p className="map-showcase-tagline">
            Explore variaties maps of Game modes.
          </p>

        </div>
        <div className="nav-section">
        <button onClick={handleBackClick} className="nav-back1-button">
          <span className="back-arrow">&#8592;</span> Back
        </button>
      </div>  

      <h1 className="map-line"></h1>

        <div className="map-content">
          {renderMapRow(gemGrabMaps, 'Gem Grab', '/map-icon/GemGrabIcon.png')}
          {renderMapRow(heistMaps, 'Heist', '/map-icon/HeistIcon.png')}
          {renderMapRow(bountyMaps, 'Bounty', '/map-icon/BountyIcon.png')}
          {renderMapRow(brawlBallMaps, 'Brawl Ball', '/map-icon/BrawlIcon.png')}
          {renderMapRow(knockoutMaps, 'Knock Out', '/map-icon/KnockoutIcon.png')}
          {renderMapRow(hotZoneMaps, 'Hot Zone', '/map-icon/HotZoneIcon.png')}
        </div>
      </div>
    );
  };

  export default MapShowcase;