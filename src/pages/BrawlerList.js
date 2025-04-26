// src/pages/BrawlerList.js
import React, { useEffect, useState } from "react";
import Papa from "papaparse";
import brawlerInfo from "../brawlerInfo";
import { Link } from "react-router-dom";

const BrawlerList = () => {
  const [brawlers, setBrawlers] = useState([]);

  useEffect(() => {
    fetch("/export.csv")
      .then((response) => response.text())
      .then((csvText) => {
        Papa.parse(csvText, {
          header: true,
          skipEmptyLines: true,
          complete: (result) => {
            const brawlersWithInfo = result.data.map((brawler) => {
              const info = brawlerInfo[brawler.Brawler] || {
                image: "/images/brawlers/default.png",
                info: "No info available."
              };

              return {
                name: brawler.Brawler,
                winRate: parseFloat(brawler["Adjusted Win Rate"]),
                useRate: parseFloat(brawler["Use Rate"]),
                image: info.image,
                info: info.info
              };
            });

            setBrawlers(brawlersWithInfo);
          }
        });
      });
  }, []);

  return (
    <div>
      <h1>Brawler List</h1>
      <div style={{ display: "flex", flexWrap: "wrap" }}>
        {brawlers.map((brawler, index) => (
          <Link
            to={`/brawler/${encodeURIComponent(brawler.name)}`}
            key={index}
            style={{
              textDecoration: "none",
              color: "inherit"
            }}
          >
            <div style={{ width: "200px", margin: "10px", border: "1px solid gray", padding: "10px" }}>
              <img src={brawler.image} alt={brawler.name} style={{ width: "100%" }} />
              <h3>{brawler.name}</h3>
              <p><strong>Win Rate:</strong> {isNaN(brawler.winRate) ? "N/A" : `${brawler.winRate.toFixed(2)}%`}</p>
              <p><strong>Use Rate:</strong> {isNaN(brawler.useRate) ? "N/A" : `${brawler.useRate.toFixed(2)}%`}</p>
            <p>{brawler.info}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default BrawlerList;
