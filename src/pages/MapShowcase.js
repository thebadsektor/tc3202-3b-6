import React, { useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './MapShowcase.css';

const MapShowcase = () => {
  const gemGrabMaps = [
    "Hard Rock Mine", "Crystal Arcade", "Deathcap Trap", "Gem Fort",
    "Double Swoosh", "Minecart Madness", "Undermine", "Flooded Mine"
  ];

  const heistMaps = [
    "Kaboom Canyon", "Safe Zone", "Hot Potato", "Bridge Too Far",
    "Pit Stop", "Plain Text", "Subway Surfers", "Ghoulish Lagoon"
  ];

  const bountyMaps = [
    "Layer Cake", "Shooting Star", "Canal Grande", "Dry Season",
    "Mortis Mortuary", "Overgrown Canyon", "Hideout"
  ];

  const brawlBallMaps = [
    "Super Stadium", "Backyard Bowl", "Sneaky Fields", "Pinball Dreams",
    "Center Stage", "Galaxy Arena", "Pinhole Punt"
  ];

  const knockoutMaps = [
    "Goldarm Gulch", "Belle's Rock", "Out in the Open", "New Perspective",
    "Flaring Phoenix", "High Stakes", "Flowing Springs"
  ];

  const hotZoneMaps = [
    "Parallel Plays", "Dueling Beetles", "Split", "Open Zone",
    "Ring of Fire", "Zone Zero", "Arcade Assembly"
  ];

  // Create refs for each map category
  const gridRefs = {
    gemGrab: useRef(null),
    heist: useRef(null),
    bounty: useRef(null),
    brawlBall: useRef(null),
    knockout: useRef(null),
    hotZone: useRef(null)
  };

  const getImagePath = (mapName) => {
    return `/maps/${mapName.toLowerCase().replace(/ /g, '-').replace(/[']/g, '')}.png`;
  };

  // Function to handle scrolling
  const scroll = (ref, direction) => {
    if (ref.current) {
      const scrollAmount = 240; // Adjust based on card width + gap
      const currentScroll = ref.current.scrollLeft;
      ref.current.scrollTo({
        left: direction === 'left' ? currentScroll - scrollAmount : currentScroll + scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  const renderMapRow = (maps, title, bgColor, iconPath = null, refKey) => {
    const ref = gridRefs[refKey];
    
    return (
      <div className="map-row">
        <div className="map-title-container" style={{ backgroundColor: bgColor }}>
          {iconPath && (
            <img
              src={iconPath}
              alt={`${title} Icon`}
              className="map-icon"
            />
          )}
          <h2 className="map-title">
            {title}
            <span className="map-count">
              ({maps.length})
            </span>
          </h2>
        </div>

        <div className="scroll-buttons">
          <button 
            className="scroll-button" 
            onClick={() => scroll(ref, 'left')}
            aria-label="Scroll left"
          >
            &larr;
          </button>
          <button 
            className="scroll-button" 
            onClick={() => scroll(ref, 'right')}
            aria-label="Scroll right"
          >
            &rarr;
          </button>
        </div>

        <div className="map-grid" ref={ref}>
          {maps.map((mapName, index) => (
            <Link
              key={index}
              to={`/map/${encodeURIComponent(mapName)}`}
              className="map-card"
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
              <span className="map-name">
                {mapName}
              </span>
            </Link>
          ))}
        </div>
      </div>
    );
  };

  // Make sure scrolling is enabled when component mounts
  useEffect(() => {
    // Ensure body and html have proper overflow settings
    document.body.style.overflow = 'auto';
    document.documentElement.style.overflow = 'auto';
  }, []);

  return (
    <div className="map-showcase">
      <div className="container">
        <Link to="/home" className="back-button">
          &larr; Back
        </Link>
        
        {renderMapRow(gemGrabMaps, 'Gem Grab', '#b839ec', '/map-icon/GemGrabIcon.png', 'gemGrab')}
        {renderMapRow(heistMaps, 'Heist', '#e33be1', '/map-icon/HeistIcon.png', 'heist')}
        {renderMapRow(bountyMaps, 'Bounty', '#e7dc34', '/map-icon/BountyIcon.png', 'bounty')}
        {renderMapRow(brawlBallMaps, 'Brawl Ball', '#34c1e7', '/map-icon/BrawlIcon.png', 'brawlBall')}
        {renderMapRow(knockoutMaps, 'Knock Out', '#e54249', '/map-icon/KnockoutIcon.png', 'knockout')}
        {renderMapRow(hotZoneMaps, 'Hot Zone', '#f9592d', '/map-icon/HotZoneIcon.png', 'hotZone')}
      </div>
    </div>
  );
};

export default MapShowcase;