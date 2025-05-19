import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as XLSX from 'xlsx';
import './BrawlerTable.css';

function formatPercentage(value) {
  if (value == null || isNaN(value)) return 'N/A';
  return `${(value * 100).toFixed(2)}%`;
}

function formatNumber(n) {
  if (n == null || isNaN(n)) return 'N/A';
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(0)}m`;
  if (n >= 1_000) return `${(n / 1_000).toFixed(0)}k`;
  return n.toString();
}

function getClassImage(className) {
  if (!className) return '/Class/default.png';
  switch (className.toLowerCase()) {
    case 'damage dealer': return '/Class/Damage Dealer.png';
    case 'assasin': return '/Class/Assasin.png';
    case 'marksmen': return '/Class/Marksmen.png';
    case 'artillery': return '/Class/Artillery.png';
    case 'tank': return '/Class/Tank.png';
    case 'support': return '/Class/Support.png';
    case 'controller': return '/Class/Controller.png';
    default: return '/Class/default.png';
  }
}

function BrawlerTable() {
  const [brawlers, setBrawlers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const rowsPerPage = 15;

  useEffect(() => {
    fetch('/BrawlerData.xlsx')
      .then(res => {
        if (!res.ok) throw new Error('Network response was not ok');
        return res.arrayBuffer();
      })
      .then(data => {
        const wb = XLSX.read(data, { type: 'array' });
        const sheet = wb.SheetNames[0];
        const ws = wb.Sheets[sheet];
        const json = XLSX.utils.sheet_to_json(ws);
        json.sort((a, b) => (a.Brawler || '').localeCompare(b.Brawler || '')); 
        setBrawlers(json);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error reading Excel:', err);
        setError('Failed to load brawler data.');
        setLoading(false);
      });

    return () => {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
      document.body.style.height = '';
      document.documentElement.style.height = '';
    };
  }, []);

  const handleRowClick = (name) => {
    navigate(`/brawler/${encodeURIComponent(name)}`);
  };  

  const handleBackClick = () => {
    navigate('/home'); // Navigate to the home page
  };

  const totalPages = Math.ceil(brawlers.length / rowsPerPage);
  const displayedBrawlers = brawlers.slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage);

  if (loading) return <div className="loading"><h2>Loading...</h2></div>;
  if (error) return <div className="error"><h2>{error}</h2></div>;

  return (
    <div className="outer-container">
      {/* Add glowing circles */}
      <div className="round-glow one"></div>
      <div className="round-glow two"></div>
      <div className="round-glow three"></div>
      
      <div className="bottom-nav">
        <button onClick={handleBackClick} className="bottom-back-buttonn">
          <span className="back-arrow">&#8592;</span> Back to Home Page
        </button>
      </div>
      
      <h1 className="header">Brawler Stats</h1>
      
      <div className="table-container">
        <div className="table-scroll">
          <table className="brawler-table">
            <thead>
              <tr className="thead-row">
                <th>Brawler</th>
                <th>Class</th>
                <th>Win Rate</th>
                <th>Use Rate</th>
                <th>Tier</th>
                <th>Picks Record</th>
                <th>Wins Record</th>
              </tr>
            </thead>
            <tbody>
              {displayedBrawlers.map((row, i) => (
                <tr
                  key={i}
                  onClick={() => handleRowClick(row.Brawler)}
                  className={i % 2 === 0 ? 'table-row even' : 'table-row odd'}
                >
                  <td className="brawler-cell">
                    <img
                      src={`/images1/${row.Brawler}.png`}
                      onError={e => { e.target.onerror = null; e.target.src = '/images1/default.png'; }}
                      alt={row.Brawler}
                      className="brawler-image"
                    />
                    {row.Brawler ?? 'Unknown'}
                  </td>
                  <td>
                    <img
                      src={getClassImage(row.Class)}
                      alt={row.Class ?? 'Unknown'}
                      title={row.Class ?? 'Unknown'}
                      className="class-image"
                      onError={e => { e.target.onerror = null; e.target.src = '/Class/default.png'; }}
                    />
                  </td>
                  <td>{formatPercentage(row['Win Rate'])}</td>
                  <td>{formatPercentage(row['Use Rate'])}</td>
                  <td className={`tier-${row.Tier?.toLowerCase() || 'default'}`}>{row.Tier ?? 'N/A'}</td>
                  <td>{formatNumber(row['Picks Recorded'])}</td>
                  <td>{formatNumber(row['Wins Recorded'])}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="pagination-container">
        <button 
          onClick={() => setCurrentPage(p => Math.max(p - 1, 1))} 
          className="pagination-button"
          disabled={currentPage === 1}
        >
          &#8592; Previous
        </button>
        <span className="page-indicator">Page {currentPage} of {totalPages}</span>
        <button 
          onClick={() => setCurrentPage(p => Math.min(p + 1, totalPages))} 
          className="pagination-button"
          disabled={currentPage === totalPages}
        >
          Next &#8594;
        </button>
      </div>
    </div>
  );
}

export default BrawlerTable;