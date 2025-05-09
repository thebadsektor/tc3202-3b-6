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

  useEffect(() => {
    const fetchCsv = async () => {
      try {
        const response = await fetch(`/data/${mapName}_Brawler.csv`);
        const csvText = await response.text();
        Papa.parse(csvText, {
          header: true,
          skipEmptyLines: true,
          complete: (results) => {
            const data = results.data.map(row => ({
              name: row['Brawler']?.trim(),
              winRate: (parseFloat(row['Win Rate']) || 0) * 100,
              pickRate: (parseFloat(row['Use Rate']) || 0) * 100,
              starRate: (parseFloat(row['Star Player Rate']) || 0) * 100,
            }));
            setBrawlers(data);
          }
        });
      } catch (error) {
        console.error('Failed to load CSV:', error);
      }
    };

    fetchCsv();
  }, [mapName]);

  const handleBackClick = () => {
    navigate(-1);
  };

  return (
    <div className="page-container">
      <div className="map-detail-container">
        <button className="back-button" onClick={handleBackClick}>
          &larr; Back
        </button>
        
        <h1 className="map-title">
          {decodeURIComponent(mapName)}
        </h1>

        <div className="map-image-container">
          <img
            src={`/maps/${mapName.toLowerCase().replace(/ /g, '-').replace(/[']/g, '')}.png`}
            alt={mapName}
            className="map-image"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = '/maps/default.png';
            }}
          />
        </div>

        <h2 className="brawlers-heading">
          Top Brawlers for this map
        </h2>

        <div className="brawlers-grid">
          {brawlers.map((brawler, index) => (
            <div
              key={index}
              className="brawler-card"
            >
              <img
                src={`/Images1/${(brawler.name || '')
                  .toLowerCase()
                  .replace(/&/g, 'and')
                  .replace(/[^a-z0-9\s-]/g, '')
                  .replace(/\s+/g, '-')
                  .replace(/-+/g, '-')}.png`}
                alt={brawler.name}
                className="brawler-image"
                onError={(e) => (e.target.src = '/Images1/default.png')}
              />
              <div className="brawler-name">{brawler.name}</div>

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
          ))}
        </div>
      </div>
    </div>
  );
};

export default MapDetail;