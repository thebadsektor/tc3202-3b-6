import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as XLSX from 'xlsx';

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

function getTierColor(tier) {
  switch (tier) {
    case 'S': return 'red';
    case 'A': return 'orange';
    case 'B': return 'yellow';
    case 'C': return 'yellowgreen';
    case 'D': return 'green';
    case 'F': return 'blue';
    default: return 'white';
  }
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
    // Add global styles to ensure the body and html can scroll
    document.body.style.overflow = 'auto';
    document.documentElement.style.overflow = 'auto';
    document.body.style.height = 'auto';
    document.documentElement.style.height = 'auto';
    
    fetch('/modified_brawler_data.xlsx')
      .then(res => {
        if (!res.ok) throw new Error('Network response was not ok');
        return res.arrayBuffer();
      })
      .then(data => {
        const wb = XLSX.read(data, { type: 'array' });
        const sheet = wb.SheetNames[0];
        const ws = wb.Sheets[sheet];
        const json = XLSX.utils.sheet_to_json(ws);
        setBrawlers(json);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error reading Excel:', err);
        setError('Failed to load brawler data.');
        setLoading(false);
      });
      
    // Cleanup function
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

  const totalPages = Math.ceil(brawlers.length / rowsPerPage);
  const displayedBrawlers = brawlers.slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage);

  if (loading) return <div style={loadingStyle}><h2>Loading...</h2></div>;
  if (error) return <div style={errorStyle}><h2>{error}</h2></div>;

  return (
    <div style={outerContainerStyle}>
      <h1 style={headerStyle}>Brawler Stats</h1>
      
      <div style={tableContainerStyle}>
        <div style={tableScrollStyle}>
          <table style={tableStyle}>
            <thead>
              <tr style={theadRowStyle}>
                <th style={thStyle}>Brawler</th>
                <th style={thStyle}>Class</th>
                <th style={thStyle}>Win Rate</th>
                <th style={thStyle}>Use Rate</th>
                <th style={thStyle}>Tier</th>
                <th style={thStyle}>Picks Record</th>
                <th style={thStyle}>Wins Record</th>
              </tr>
            </thead>
            <tbody>
              {displayedBrawlers.map((row, i) => (
                <tr
                  key={i}
                  onClick={() => handleRowClick(row.Brawler)}
                  style={{ ...rowStyle(i), cursor: 'pointer', transition: 'background-color 0.3s' }}
                  onMouseOver={e => e.currentTarget.style.backgroundColor = '#333'}
                  onMouseOut={e => e.currentTarget.style.backgroundColor = i % 2 === 0 ? '#1e1e1e' : '#2a2a2a'}
                >
                  <td style={brawlerCellStyle}>
                    <img
                      src={`/images1/${row.Brawler}.png`}
                      onError={e => { e.target.onerror = null; e.target.src = '/images1/default.png'; }}
                      alt={row.Brawler}
                      style={brawlerImageStyle}
                    />
                    {row.Brawler ?? 'Unknown'}
                  </td>
                  <td style={tdStyle}>
                    <img
                      src={getClassImage(row.Class)}
                      alt={row.Class ?? 'Unknown'}
                      title={row.Class ?? 'Unknown'}
                      style={{ width: 50, height: 50, objectFit: 'contain', borderRadius: 8 }}
                      onError={e => { e.target.onerror = null; e.target.src = '/Class/default.png'; }}
                    />
                  </td>
                  <td style={tdStyle}>{formatPercentage(row['Win Rate'])}</td>
                  <td style={tdStyle}>{formatPercentage(row['Use Rate'])}</td>
                  <td style={{...tdStyle, color: getTierColor(row.Tier), fontWeight: 'bold'}}>{row.Tier ?? 'N/A'}</td>
                  <td style={tdStyle}>{formatNumber(row['Picks Recorded'])}</td>
                  <td style={tdStyle}>{formatNumber(row['Wins Recorded'])}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div style={paginationContainerStyle}>
        <button 
          onClick={() => setCurrentPage(p => Math.max(p - 1, 1))} 
          style={{...paginationButtonStyle, opacity: currentPage === 1 ? 0.5 : 1}}
          disabled={currentPage === 1}
        >
          &#8592; Previous
        </button>
        <span style={{ fontWeight: 'bold', margin: '0 15px' }}>Page {currentPage} of {totalPages}</span>
        <button 
          onClick={() => setCurrentPage(p => Math.min(p + 1, totalPages))} 
          style={{...paginationButtonStyle, opacity: currentPage === totalPages ? 0.5 : 1}}
          disabled={currentPage === totalPages}
        >
          Next &#8594;
        </button>
      </div>
    </div>
  );
}

// --- Styling ---
const outerContainerStyle = {
  backgroundColor: '#121212',
  color: 'white',
  width: '100%',
  position: 'static',
  padding: '20px',
  boxSizing: 'border-box'
};

const headerStyle = {
  textAlign: 'center',
  marginTop: 40, 
  marginBottom: 40, 
  fontSize: 50
};

const tableContainerStyle = {
  width: '100%',
  marginBottom: 30,
  borderRadius: 20,
  boxShadow: '0 0 15px #000'
};

const tableScrollStyle = {
  width: '100%',
  overflowX: 'auto'
};

const tableStyle = {
  width: '100%',
  minWidth: '900px',
  borderCollapse: 'collapse'
};

const theadRowStyle = {
  backgroundColor: '#1f1f1f',
  fontSize: 20
};

const rowStyle = (i) => ({
  backgroundColor: i % 2 === 0 ? '#1e1e1e' : '#2a2a2a',
  fontSize: 18,
  height: 70
});

const thStyle = {
  padding: 20,
  fontSize: 25,
  textAlign: 'center',
  position: 'sticky',
  top: 0,
  backgroundColor: '#1f1f1f',
  zIndex: 1
};

const tdStyle = {
  padding: 15,
  textAlign: 'center'
};

const brawlerCellStyle = {
  display: 'flex',
  alignItems: 'center',
  gap: 15,
  padding: 15
};

const brawlerImageStyle = {
  width: 60,
  height: 60,
  borderRadius: 10,
  objectFit: 'cover'
};

const paginationContainerStyle = {
  textAlign: 'center',
  margin: '30px 0',
  width: '100%'
};

const paginationButtonStyle = {
  padding: '15px 25px',
  margin: '0 15px',
  backgroundColor: '#333',
  color: 'white',
  border: 'none',
  cursor: 'pointer',
  borderRadius: 8,
  fontSize: 18,
  transition: 'background-color 0.3s'
};

const loadingStyle = {
  backgroundColor: '#121212',
  color: 'white',
  minHeight: '100vh',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  fontSize: 28
};

const errorStyle = {
  backgroundColor: '#121212',
  color: 'red',
  minHeight: '100vh',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  fontSize: 28
};

export default BrawlerTable;