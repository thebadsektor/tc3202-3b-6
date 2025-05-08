import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Papa from 'papaparse';

const ProgressBar = ({ value, color }) => (
  <div style={{ backgroundColor: '#333', borderRadius: '8px', overflow: 'hidden', height: '6px', marginTop: '4px' }}>
    <div
      style={{
        width: `${value}%`,
        height: '100%',
        backgroundColor: color,
        transition: 'width 0.3s ease',
      }}
    />
  </div>
);

const MapDetail = () => {
  const { mapName } = useParams();
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

  return (
    <div style={{ backgroundColor: '#111', color: '#fff', padding: '40px' }}>
      <h1 style={{ fontSize: '32px', marginBottom: '10px', textAlign: 'center' }}>
        {decodeURIComponent(mapName)}
      </h1>

      <div style={{ textAlign: 'center', marginBottom: '30px' }}>
        <img
          src={`/maps/${mapName.toLowerCase().replace(/ /g, '-').replace(/[']/g, '')}.png`}
          alt={mapName}
          style={{
            maxWidth: '100%',
            height: 'auto',
            border: '2px solid #444',
            borderRadius: '12px',
          }}
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = '/maps/default.png';
          }}
        />
      </div>

      <h2 style={{ fontSize: '20px', marginBottom: '30px', color: '#ccc', textAlign: 'center' }}>
        Top Brawlers for this map
      </h2>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', justifyContent: 'center' }}>
        {brawlers.map((brawler, index) => (
          <div
            key={index}
            style={{
              width: '140px',
              backgroundColor: '#1e1e1e',
              borderRadius: '10px',
              padding: '10px',
              boxShadow: '0 0 6px rgba(0,0,0,0.5)',
              textAlign: 'center',
              fontSize: '12px',
            }}
          >
            <img
              src={`/Images1/${(brawler.name || '')
                .toLowerCase()
                .replace(/&/g, 'and')
                .replace(/[^a-z0-9\s-]/g, '')
                .replace(/\s+/g, '-')
                .replace(/-+/g, '-')}.png`}
              alt={brawler.name}
              style={{ width: '60px', height: '60px', borderRadius: '6px', marginBottom: '6px' }}
              onError={(e) => (e.target.src = '/Images1/default.png')}
            />
            <div style={{ fontWeight: 'bold', marginBottom: '6px' }}>{brawler.name}</div>

            <div style={{ color: '#66ffcc' }}>Win {brawler.winRate.toFixed(1)}%</div>
            <ProgressBar value={brawler.winRate} color="#66ffcc" />

            <div style={{ color: '#4dabf7', marginTop: '6px' }}>
              Usage {brawler.pickRate.toFixed(1)}%
            </div>
            <ProgressBar value={brawler.pickRate} color="#4dabf7" />

            <div style={{ color: '#f7b731', marginTop: '6px' }}>
              Star {brawler.starRate.toFixed(1)}%
            </div>
            <ProgressBar value={brawler.starRate} color="#f7b731" />
          </div>
        ))}
      </div>
    </div>
  );
  
};

export default MapDetail;
