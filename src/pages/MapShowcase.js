import React from 'react';
import { Link } from 'react-router-dom';
import './MapShowcase.css';

const MapShowcase = () => {
  
  
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

  const renderMapRow = (maps, title, bgColor, iconPath = null) => (
    <div className="map-row">
      <div className="map-header" style={{ backgroundColor: bgColor }}>
        {iconPath && (
          <img
            src={iconPath}
            alt={`${title} Icon`}
            className="map-icon"
          />
        )}
        <h2 className="map-title">
          {title}
          <span className="map-count">({maps.length})</span>
        </h2>
      </div>

      <div className="map-grid">
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
            <span className="map-name">{mapName}</span>
          </Link>
          
        ))}
      </div>
    </div>
  );

  return (
    <div className="map-showcase">
      <Link to="/" className="back-button">
        Back to Home
      </Link>
      
      <div className="map-content">
        {renderMapRow(gemGrabMaps, 'Gem Grab', '#b839ec', '/map-icon/GemGrabIcon.png')}
        {renderMapRow(heistMaps, 'Heist', '#e33be1', '/map-icon/HeistIcon.png')}
        {renderMapRow(bountyMaps, 'Bounty', '#e7dc34', '/map-icon/BountyIcon.png')}
        {renderMapRow(brawlBallMaps, 'Brawl Ball', '#34c1e7', '/map-icon/BrawlIcon.png')}
        {renderMapRow(knockoutMaps, 'Knock Out', '#e54249', '/map-icon/KnockoutIcon.png')}
        {renderMapRow(hotZoneMaps, 'Hot Zone', '#f9592d', '/map-icon/HotZoneIcon.png')}
      </div>
    </div>
  );
  
};

export default MapShowcase;