import React, { useState, useEffect } from "react";
import axios from "axios";

const brawlers = [
  "Shelly", "Colt", "Bull", "Brock", "Rico", "Spike", "Barley", "Jessie", "Nita",
  // Add more brawlers from your previous list
];

const modeMapOptions = {
  "Bounty": ["BraceForImpact", "DrySeason", "Hideout", "LayerCake", "NoExcuses", "ShootingStar"],
  "Gem Grab": ["CrystalArcade", "DeathcapTrap", "DoubleSwoosh", "ForestClearing", "GemFort", "HardRockMine", "LastStop", "LilygearLake", "LocalRestaurants", "OpenSpace", "RusticArcade", "Undermine"],
  "Heist": ["BridgeTooFar", "HotPotato", "KaboomCanyon", "PitStop", "PlainText"],
  "Brawl Ball": ["BackyardBowl", "BeachBall", "BelowZero", "CenterStage", "CoolBox", "PinballDreams", "PinholePunt", "PricelessCactus", "RooftopRunners", "SecondTry", "SneakyFields", "StarrGarden", "SunnySoccer", "SuperBeach", "SuperCenter", "Trickey", "TripleDribble"],
  "Knockout": ["Belle'sRock", "CloseQuarters", "DeepEnd", "FlaringPhoenix", "FlowingSprings", "FourLevels", "GoldarmGulch", "HealthyMiddleGround", "HFor...", "MossyCrossing", "NewHorizons", "NewPerspective", "OutInTheOpen"],
  "Hot Zone": ["Bejeweled", "DuelingBeetles", "FishingBed", "OpenBusiness", "OpenZone", "ParallelPlays", "RingOfFire"]
};

const TeamCompositionPage = () => {
  const [team1, setTeam1] = useState(["", "", ""]);
  const [team2, setTeam2] = useState(["", "", ""]);
  const [mode, setMode] = useState("");
  const [map, setMap] = useState("");
  const [mapOptions, setMapOptions] = useState([]);
  const [result, setResult] = useState(null);

  useEffect(() => {
    if (mode && modeMapOptions[mode]) {
      setMapOptions(modeMapOptions[mode]);
      setMap(""); // Reset map when mode changes
    }
  }, [mode]);

  const handleChange = (index, team, value) => {
    const updated = [...(team === "team1" ? team1 : team2)];
    updated[index] = value;
    team === "team1" ? setTeam1(updated) : setTeam2(updated);
  };

  const predict = async () => {
    try {
      const res = await axios.post("http://localhost:5000/predict", {
        team1,
        team2,
        mode,
        map,
      });
      setResult(res.data);
    } catch (err) {
      console.error("Prediction error:", err);
    }
  };

  return (
    <div className="p-4 max-w-xl mx-auto">
      <h1 className="text-xl font-bold mb-4 text-center">Brawl Stars Match Prediction</h1>

      <div className="mb-4">
        <label className="font-semibold">Select Mode</label>
        <select
          value={mode}
          onChange={(e) => setMode(e.target.value)}
          className="w-full border p-2 rounded"
        >
          <option value="">Select Mode</option>
          {Object.keys(modeMapOptions).map((m) => (
            <option key={m} value={m}>{m}</option>
          ))}
        </select>
      </div>

      <div className="mb-4">
        <label className="font-semibold">Select Map</label>
        <select
          value={map}
          onChange={(e) => setMap(e.target.value)}
          className="w-full border p-2 rounded"
        >
          <option value="">Select a Map</option>
          {mapOptions.map((m) => (
            <option key={m} value={m}>{m}</option>
          ))}
        </select>
      </div>

      <div className="mb-4">
        <h2 className="font-semibold mb-2">Team 1</h2>
        {team1.map((b, i) => (
          <select
            key={i}
            value={b}
            onChange={(e) => handleChange(i, "team1", e.target.value)}
            className="w-full border p-2 rounded mb-1"
          >
            <option value="">Select Brawler {i + 1}</option>
            {brawlers.map((br) => (
              <option key={br} value={br}>{br}</option>
            ))}
          </select>
        ))}
      </div>

      <div className="mb-4">
        <h2 className="font-semibold mb-2">Team 2</h2>
        {team2.map((b, i) => (
          <select
            key={i}
            value={b}
            onChange={(e) => handleChange(i, "team2", e.target.value)}
            className="w-full border p-2 rounded mb-1"
          >
            <option value="">Select Brawler {i + 1}</option>
            {brawlers.map((br) => (
              <option key={br} value={br}>{br}</option>
            ))}
          </select>
        ))}
      </div>

      <button
        onClick={predict}
        className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition"
      >
        Predict Outcome
      </button>

      {result && (
        <div className="mt-4 text-center">
          <p className="text-lg font-semibold">{result.result}</p>
          <p>Confidence: {result.win_percentage}%</p>
        </div>
      )}
    </div>
  );
};

export default TeamCompositionPage;
