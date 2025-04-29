import React, { useEffect, useState } from "react";
import * as XLSX from "xlsx";
import { Link } from "react-router-dom";

const BrawlerList = () => {
  const [brawlers, setBrawlers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10; 

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("/modified_brawler_data.xlsx");
      const arrayBuffer = await response.arrayBuffer();
      const workbook = XLSX.read(arrayBuffer, { type: "array" });
      const worksheet = workbook.Sheets[workbook.SheetNames[0]];
      const data = XLSX.utils.sheet_to_json(worksheet);

      const brawlersWithInfo = await Promise.all(
        data.map(async (brawler) => {
          const image = await getImagePath(brawler.Brawler);

          return {
            name: brawler.Brawler,
            winRate: parseFloat(brawler["Win Rate"]) * 100, // Turn into percentage
            tier: brawler.Tier,
            useRate: parseFloat(brawler["Use Rate"]) * 100,
            picks: brawler["Picks Recorded"],
            wins: brawler["Wins Recorded"],
            image: image
          };
        })
      );

      setBrawlers(brawlersWithInfo);
    };

    fetchData();
  }, []);

  const getImagePath = (brawlerName) => {
    const baseName = brawlerName.replace(/\s+/g, "").toLowerCase(); // Remove spaces and lowercase
    const pngPath = `/images/brawlers/${baseName}.png`;
    const jpgPath = `/images/brawlers/${baseName}.jpg`;
    const defaultPath = `/images/brawlers/default.png`; 
  
    return new Promise((resolve) => {
      const img = new Image();
      img.src = pngPath;
  
      img.onload = () => resolve(pngPath); 
      img.onerror = () => {
        const imgJpg = new Image();
        imgJpg.src = jpgPath;
  
        imgJpg.onload = () => resolve(jpgPath); 
        imgJpg.onerror = () => resolve(defaultPath); 
      };
    });
  };
  

  const formatNumber = (num) => {
    if (num >= 1_000_000) return (num / 1_000_000).toFixed(0) + "m";
    if (num >= 1_000) return (num / 1_000).toFixed(0) + "k";
    return num;
  };

  const totalPages = Math.ceil(brawlers.length / itemsPerPage);
  const displayedBrawlers = brawlers.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div style={{ backgroundColor: "#121212", color: "white", minHeight: "100vh", padding: "20px" }}>
      <h1 style={{ textAlign: "center", marginBottom: "20px" }}>Brawler Stats</h1>
      <div style={{ overflowX: "auto" }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ backgroundColor: "#1e1e1e" }}>
              <th style={thStyle}>Brawler</th>
              <th style={thStyle}>Win Rate</th>
              <th style={thStyle}>Use Rate</th>
              <th style={thStyle}>Tier</th>
              <th style={thStyle}>Picks</th>
              <th style={thStyle}>Wins</th>
            </tr>
          </thead>
          <tbody>
            {displayedBrawlers.map((brawler, index) => (
              <tr key={index} style={{ borderBottom: "1px solid #333" }}>
                <td style={tdStyle}>
                  <Link
                    to={`/brawler/${encodeURIComponent(brawler.name)}`}
                    style={{
                      textDecoration: "none",
                      color: "white",
                      display: "flex",
                      alignItems: "center"
                    }}
                  >
                    <img
                      src={brawler.image}
                      alt={brawler.name}
                      style={{
                        width: "30px",
                        height: "30px",
                        marginRight: "8px",
                        borderRadius: "50%",
                        objectFit: "cover"
                      }}
                    />
                    {brawler.name}
                  </Link>
                </td>
                <td style={tdStyle}>{brawler.winRate.toFixed(2)}%</td>
                <td style={tdStyle}>{brawler.useRate.toFixed(2)}%</td>
                <td style={tdStyle}>{brawler.tier}</td>
                <td style={tdStyle}>{formatNumber(brawler.picks)}</td>
                <td style={tdStyle}>{formatNumber(brawler.wins)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div style={{ display: "flex", justifyContent: "center", marginTop: "20px" }}>
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          style={paginationButtonStyle}
        >
          &lt; Previous
        </button>
        <span style={{ padding: "10px" }}>Page {currentPage}</span>
        <button
          onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
          disabled={currentPage === totalPages}
          style={paginationButtonStyle}
        >
          Next &gt;
        </button>
      </div>
    </div>
  );
};

const thStyle = {
  padding: "12px",
  textAlign: "left",
  fontWeight: "bold"
};

const tdStyle = {
  padding: "12px"
};

const paginationButtonStyle = {
  backgroundColor: "#333",
  color: "white",
  border: "none",
  padding: "10px 20px",
  margin: "0 5px",
  cursor: "pointer"
};

export default BrawlerList;
