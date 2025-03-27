import React, { useState } from "react";
import axios from "axios";

const TeamCompositionPage = () => {
  // State for team selection
  const [allyTeam, setAllyTeam] = useState(["Piper", "Brock", "Tick"]);
  const [enemyTeam, setEnemyTeam] = useState(["Leon", "Crow", "Mortis"]);
  const [gameMode, setGameMode] = useState("Bounty");
  const [mapName, setMapName] = useState("Hideout");
  const [prediction, setPrediction] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // List of Brawlers (Replace this with actual data)
  const brawlerList = ["Piper", "Brock", "Tick", "Leon", "Crow", "Mortis"];
  const gameModes = ["Bounty", "Gem Grab", "Brawl Ball"];
  const mapNames = ["Hideout", "Cavern Churn"];

  // Handle Prediction Request
  const predictOutcome = async () => {
    setLoading(true);
    setError("");
    setPrediction(null);

    try {
      const response = await axios.post(
        "http://localhost:8000/predict",
        {
          ally_team: allyTeam,
          enemy_team: enemyTeam,
          game_mode: gameMode,
          map_name: mapName
        },
        {
          headers: { "Content-Type": "application/json" },
          timeout: 10000 // 10 second timeout
        }
      );

      if (response.data.error) {
        setError(response.data.error);
      } else {
        setPrediction(response.data);
      }
    } catch (error) {
      if (error.response) {
        setError(error.response.data.detail || "Server error");
      } else if (error.request) {
        setError("No response from server. Check your connection.");
      } else {
        setError("Error setting up the request");
      }
      console.error("Detailed error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Brawl Stars Match Predictor</h2>

      {/* Ally Team Selection */}
      <div>
        <h3>Select Your Team</h3>
        {allyTeam.map((brawler, index) => (
          <select key={index} value={brawler} onChange={(e) => {
            let updatedTeam = [...allyTeam];
            updatedTeam[index] = e.target.value;
            setAllyTeam(updatedTeam);
          }}>
            {brawlerList.map(b => <option key={b} value={b}>{b}</option>)}
          </select>
        ))}
      </div>

      {/* Enemy Team Selection */}
      <div>
        <h3>Select Enemy Team</h3>
        {enemyTeam.map((brawler, index) => (
          <select key={index} value={brawler} onChange={(e) => {
            let updatedTeam = [...enemyTeam];
            updatedTeam[index] = e.target.value;
            setEnemyTeam(updatedTeam);
          }}>
            {brawlerList.map(b => <option key={b} value={b}>{b}</option>)}
          </select>
        ))}
      </div>

      {/* Game Mode Selection */}
      <div>
        <h3>Game Mode</h3>
        <select value={gameMode} onChange={(e) => setGameMode(e.target.value)}>
          {gameModes.map(mode => <option key={mode} value={mode}>{mode}</option>)}
        </select>
      </div>

      {/* Map Selection */}
      <div>
        <h3>Map</h3>
        <select value={mapName} onChange={(e) => setMapName(e.target.value)}>
          {mapNames.map(map => <option key={map} value={map}>{map}</option>)}
        </select>
      </div>

      {/* Predict Button */}
      <button onClick={predictOutcome} disabled={loading}>
        {loading ? "Processing..." : "Predict Match Outcome"}
      </button>

      {/* Error Message */}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {/* Display Prediction */}
      {prediction && (
        <div>
          <h3>Prediction Results</h3>
          <p><strong>Win Prediction:</strong> {prediction.win_prediction ? "Win" : "Lose"}</p>
          <p><strong>Win Probability:</strong> {prediction.win_probability}%</p>
        </div>
      )}
    </div>
  );
};

export default TeamCompositionPage;
