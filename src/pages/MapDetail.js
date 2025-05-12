import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Papa from 'papaparse';
import './MapDetail.css';

const ProgressBar = ({ value, color }) => (
  <div className="progress-bar-container">
    <div
      className="progress-bar-fill"
      style={{
        width: `${value}%`,
        backgroundColor: color,
      }}
    />
  </div>
);

const MapDetail = () => {
  const { mapName } = useParams();
  const navigate = useNavigate();
  const [brawlers, setBrawlers] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const brawlersPerPage = 10; // 2x5 grid = 10 brawlers per page

  useEffect(() => {
    const fetchCsv = async () => {
      try {
        const response = await fetch(`/data/${mapName}_Brawler.csv`);
        const csvText = await response.text();
        Papa.parse(csvText, {
          header: true,
          skipEmptyLines: true,
          complete: (results) => {
            // Sort by win rate (descending)
            const data = results.data
              .map(row => ({
                name: row['Brawler']?.trim(),
                winRate: (parseFloat(row['Win Rate']) || 0) * 100,
                pickRate: (parseFloat(row['Use Rate']) || 0) * 100,
                starRate: (parseFloat(row['Star Player Rate']) || 0) * 100,
              }))
              .sort((a, b) => b.winRate - a.winRate);
            
            setBrawlers(data);
          }
        });
      } catch (error) {
        console.error('Failed to load CSV:', error);
      }
    };

    fetchCsv();
    setCurrentPage(0); // Reset to first page when map changes
  }, [mapName]);

  // Calculate page information
  const totalPages = Math.ceil(brawlers.length / brawlersPerPage);
  const startIndex = currentPage * brawlersPerPage;
  const endIndex = startIndex + brawlersPerPage;
  const currentBrawlers = brawlers.slice(startIndex, endIndex);
  
  // Handle pagination
  const goToPreviousPage = () => {
    setCurrentPage(current => Math.max(0, current - 1));
  };
  
  const goToNextPage = () => {
    setCurrentPage(current => Math.min(totalPages - 1, current + 1));
  };

  // Handle back navigation
  const handleBack = () => {
    navigate(-1); // Go back to previous page
  };

  // Format map name for display
  const formattedMapName = decodeURIComponent(mapName).replace(/-/g, ' ');

  // Create background elements arrays
  const glowingOrbs = Array(6).fill(null); // 6 glowing orbs
  const twinklingStars = Array(30).fill(null); // 30 twinkling stars

  return (
    <div className="map-detail-container">
      {/* Background Elements */}
      {glowingOrbs.map((_, index) => (
        <div key={`orb-${index}`} className="glow-circle"></div>
      ))}
      
      {twinklingStars.map((_, index) => (
        <div key={`star-${index}`} className="stars"></div>
      ))}

      {/* Back button */}
      <button className="prev-back" onClick={handleBack}>
        ← Back
      </button>
      
      

      <div className="map-content-wrapper">
        {/* Left column - Map image */}

        {/* Map title */}
      <h1 className="map-name1">
        {formattedMapName}
      </h1>
      
        <div className="map-column">
          <div className="map-photo-container">
            <img
              src={`/maps/${mapName.toLowerCase().replace(/ /g, '-').replace(/[']/g, '')}.png`}
              alt={mapName}
              className="map-photo"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = '/maps/default.png';
              }}
            />
          </div>
        </div>

        {/* Right column - Brawler cards */}
        <div className="brawlers-column">
          {/* Subtitle */}
          <h2 className="map-subname">
            Top Brawlers for this map
          </h2>

          {/* Brawler cards */}
          <div className="brawler-box-container">
            {currentBrawlers.map((brawler, index) => {
              const globalIndex = startIndex + index;
              const isTop3 = globalIndex < 3;
              
              return (
                <div
                  key={index}
                  className={`brawler-box ${isTop3 ? 'top-brawler' : ''}`}
                >
                  <img
                    src={`/brawlers/${(brawler.name || '')
                      .toLowerCase()
                      .replace(/&/g, 'and')
                      .replace(/[^a-z0-9\s-]/g, '')
                      .replace(/\s+/g, '-')
                      .replace(/-+/g, '-')
                    }.png`}
                    alt={brawler.name}
                    className="brawler-photo"
                    onError={(e) => (e.target.src = '/brawlers/default.png')}
                  />
                  <div className="brawler-names">{brawler.name}</div>

                  <div className="stat win-rate">Win {brawler.winRate.toFixed(1)}%</div>
                  <ProgressBar value={brawler.winRate} color="#66ffcc" />

                  <div className="stat pick-rate">
                    Usage {brawler.pickRate.toFixed(1)}%
                  </div>
                  <ProgressBar value={brawler.pickRate} color="#4dabf7" />

                  <div className="stat star-rate">
                    Star {brawler.starRate.toFixed(1)}%
                  </div>
                  <ProgressBar value={brawler.starRate} color="#f7b731" />
                </div>
              );
            })}
          </div>
          
          {/* Pagination controls */}
          {totalPages > 1 && (
            <div className="pagination-controls">
              <button 
                className="page-button" 
                onClick={goToPreviousPage}
                disabled={currentPage === 0}
              >
                ← Prev
              </button>
              <div className="page-indicator">
                Page {currentPage + 1} of {totalPages}
              </div>
              <button 
                className="page-button" 
                onClick={goToNextPage}
                disabled={currentPage === totalPages - 1}
              >
                Next →
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MapDetail;