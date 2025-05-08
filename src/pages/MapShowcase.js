import React from 'react';
import { Link } from 'react-router-dom';

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

  const getImagePath = (mapName) => {
    return `/maps/${mapName.toLowerCase().replace(/ /g, '-').replace(/[']/g, '')}.png`;
  };

  const renderMapRow = (maps, title, bgColor, iconPath = null) => (
    <div style={{ marginBottom: '40px' }}>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          backgroundColor: bgColor,
          padding: '10px',
          borderRadius: '8px',
          marginBottom: '10px',
        }}
      >
        {iconPath && (
          <img
            src={iconPath}
            alt={`${title} Icon`}
            style={{ width: '30px', height: '30px', marginRight: '10px' }}
          />
        )}
        <h2
          style={{
            fontSize: '24px',
            color: 'white',
            margin: 0,
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
          }}
        >
          {title}
          <span
            style={{
              color: '#bdbdbd',
              fontWeight: 'bold',
              textShadow: '2px 2px 0px #000',
            }}
          >
            ({maps.length})
          </span>
        </h2>
      </div>

      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '10px',
          justifyContent: 'flex-start',
        }}
      >
        {maps.map((mapName, index) => (
          <Link
            key={index}
            to={`/map/${encodeURIComponent(mapName)}`}
            style={{
              textDecoration: 'none',
              flex: '1 1 calc(20% - 10px)',
              maxWidth: 'calc(20% - 10px)',
              background: '#1e1e1e',
              borderRadius: '10px',
              overflow: 'hidden',
              textAlign: 'center',
            }}
          >
            <div
              style={{
                backgroundColor: '#1e1e1e',
                height: '360px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <img
                src={getImagePath(mapName)}
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = '/maps/default.png';
                }}
                alt={mapName}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  border: '1px solid #333',
                }}
              />
            </div>
            <span
              style={{
                display: 'block',
                padding: '8px',
                fontSize: '14px',
                fontWeight: 'bold',
                color: '#f0f0f0',
              }}
            >
              {mapName}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );

  return (
    <div style={{ backgroundColor: '#121212', padding: '20px', minHeight: '100vh' }}>
      <div style={{ flex: 1, maxWidth: '1200px', margin: 'auto' }}>
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
