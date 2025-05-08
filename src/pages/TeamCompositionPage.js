import React, { useState, useEffect, useMemo } from "react";
import "./TeamCompositionPage.css";

// Replace lucide-react icons with custom SVG components
const ShieldIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
  </svg>
);

const ZapIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon">
    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon>
  </svg>
);

const MapIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon">
    <polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6"></polygon>
    <line x1="8" y1="2" x2="8" y2="18"></line>
    <line x1="16" y1="6" x2="16" y2="22"></line>
  </svg>
);

const AwardIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon">
    <circle cx="12" cy="8" r="7"></circle>
    <polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"></polyline>
  </svg>
);

const UsersIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon">
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
    <circle cx="9" cy="7" r="4"></circle>
    <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
    <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
  </svg>
);

const UserIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="user-icon">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
    <circle cx="12" cy="7" r="4"></circle>
  </svg>
);

const ArrowRightIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="arrow-icon">
    <line x1="5" y1="12" x2="19" y2="12"></line>
    <polyline points="12 5 19 12 12 19"></polyline>
  </svg>
);

const SparklesIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon">
    <path d="M12 3v3m0 12v3m-9-9H6m12 0h3m-3.6-5.4-2.12 2.12M5.4 16.6l2.12-2.12m10.96 2.12 2.12-2.12M7.52 7.52 5.4 5.4"></path>
    <circle cx="12" cy="12" r="3"></circle>
  </svg>
);

const TeamCompositionPage = () => {
  // Use useMemo to prevent modeMapOptions from being recreated on every render
  const modeMapOptions = useMemo(() => ({
    "Bounty": ["BraceForImpact", "DrySeason", "Hideout", "LayerCake", "NoExcuses", "ShootingStar"],
    "Gem Grab": ["CrystalArcade", "DeathcapTrap", "DoubleSwoosh", "ForestClearing", "GemFort", "HardRockMine", "LastStop", "LilygearLake", "LocalRestaurants", "OpenSpace", "RusticArcade", "Undermine"],
    "Heist": ["BridgeTooFar", "HotPotato", "KaboomCanyon", "PitStop", "PlainText"],
    "Brawl Ball": ["BackyardBowl", "BeachBall", "BelowZero", "CenterStage", "CoolBox", "PinballDreams", "PinholePunt", "PricelessCactus", "RooftopRunners", "SecondTry", "SneakyFields", "StarrGarden", "SunnySoccer", "SuperBeach", "SuperCenter", "Trickey", "TripleDribble"],
    "Knockout": ["Belle'sRock", "CloseQuarters", "DeepEnd", "FlaringPhoenix", "FlowingSprings", "FourLevels", "GoldarmGulch", "HealthyMiddleGround", "HFor...", "MossyCrossing", "NewHorizons", "NewPerspective", "OutInTheOpen"],
    "Hot Zone": ["Bejeweled", "DuelingBeetles", "FishingBed", "OpenBusiness", "OpenZone", "ParallelPlays", "RingOfFire"]
  }), []);

  const [team1, setTeam1] = useState(["", "", ""]);
  const [team2, setTeam2] = useState(["", "", ""]);
  const [mode, setMode] = useState("");
  const [map, setMap] = useState("");
  const [mapOptions, setMapOptions] = useState([]);
  const [brawlers, setBrawlers] = useState([]);
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");
  const [activeTab, setActiveTab] = useState("team1");
  const [isLoading, setIsLoading] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);

  // Simulate fetching brawlers without actual API call for demo
  useEffect(() => {
    // Demo brawler list
    const demoBrawlers = [
      "Shelly", "Colt", "Bull", "Brock", "Rico", "Spike", 
      "Crow", "Poco", "El Primo", "Barley", "Jessie", "Nita", 
      "Dynamike", "Bo", "Tick", "Leon", "Sandy", "Amber"
    ];
    setBrawlers(demoBrawlers);
  }, []);

  useEffect(() => {
    if (mode && modeMapOptions[mode]) {
      setMapOptions(modeMapOptions[mode]);
      setMap("");
    }
  }, [mode, modeMapOptions]);

  const handleChange = (index, team, value) => {
    const updated = [...(team === "team1" ? team1 : team2)];
    updated[index] = value;
    team === "team1" ? setTeam1(updated) : setTeam2(updated);
  };

  const predict = async () => {
    if (!mode || !map) {
      setError("Please select both a game mode and a map.");
      return;
    }

    if (team1.includes("") || team2.includes("")) {
      setError("Please select all 3 brawlers for both teams.");
      return;
    }

    setError("");
    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      const randomWin = Math.random() > 0.5;
      const randomPercentage = Math.floor(Math.random() * 30) + 60; // 60-90%
      
      setResult({
        result: randomWin ? "Team 1 is likely to win!" : "Team 2 is likely to win!",
        win_percentage: randomPercentage
      });
      
      setIsLoading(false);
      setShowConfetti(true);
      
      // Hide confetti after a few seconds
      setTimeout(() => setShowConfetti(false), 3000);
    }, 1500);
  };

  // Background floating elements
  const FloatingElements = () => {
    return (
      <div className="floating-elements">
        {[...Array(20)].map((_, i) => (
          <div 
            key={i}
            className="floating-element"
            style={{
              width: `${Math.random() * 30 + 10}px`,
              height: `${Math.random() * 30 + 10}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${Math.random() * 10 + 10}s`
            }}
          />
        ))}
      </div>
    );
  };

  // Confetti effect
  const Confetti = () => {
    if (!showConfetti) return null;
    
    return (
      <div className="confetti-container">
        {[...Array(50)].map((_, i) => (
          <div 
            key={i}
            className="confetti-piece"
            style={{
              width: `${Math.random() * 10 + 5}px`,
              height: `${Math.random() * 10 + 5}px`,
              borderRadius: Math.random() > 0.5 ? '50%' : '0%',
              left: `${Math.random() * 100}%`,
              backgroundColor: `hsl(${Math.random() * 360}, 80%, 60%)`,
              animationDelay: `${Math.random() * 0.5}s`,
              animationDuration: `${Math.random() * 3 + 2}s`
            }}
          />
        ))}
      </div>
    );
  };

  const getIconForMode = () => {
    if (mode === "Bounty") return <AwardIcon />;
    if (mode === "Gem Grab") return <SparklesIcon />;
    if (mode === "Heist") return <ShieldIcon />;
    if (mode === "Brawl Ball") return <div className="ball-icon" />;
    if (mode === "Knockout") return <ZapIcon />;
    if (mode === "Hot Zone") return <div className="zone-icon" />;
    return <ShieldIcon />;
  };

  return (
    <div className="app-container">
      <FloatingElements />
      <Confetti />
      
      <div className="content-container">
        <div className="header">
          <h1 className="title">Smart Brawl</h1>
          <h2 className="subtitle">Predict na tanga</h2>
        </div>
        
        <div className="game-selection">
          <div className="select-container">
            {getIconForMode()}
            <select
              value={mode}
              onChange={(e) => setMode(e.target.value)}
              className="select-input"
            >
              <option value="" className="option">Select Game Mode</option>
              {Object.keys(modeMapOptions).map((m) => (
                <option key={m} value={m} className="option">{m}</option>
              ))}
            </select>
          </div>
          
          <div className="select-container">
            <MapIcon />
            <select
              value={map}
              onChange={(e) => setMap(e.target.value)}
              className="select-input"
              disabled={!mode}
            >
              <option value="" className="option">Select Map</option>
              {mapOptions.map((m) => (
                <option key={m} value={m} className="option">{m}</option>
              ))}
            </select>
          </div>
        </div>
        
        <div className="teams-container">
          <div className={`team-panel ${activeTab === 'team1' ? 'team-active team1-active' : ''}`}>
            <div className="team-header">
              <div className="team-title">
                <UsersIcon className="team1-icon" />
                <h2 className="team-name">TEAM 1</h2>
              </div>
              <div className="team-badge team1-badge">BLUE</div>
            </div>
            
            {team1.map((b, i) => (
              <div key={i} className="brawler-select">
                <UserIcon className="team1-user" />
                <select
                  value={b}
                  onChange={(e) => handleChange(i, "team1", e.target.value)}
                  className="select-input"
                  onFocus={() => setActiveTab("team1")}
                >
                  <option value="" className="option">Select Brawler {i + 1}</option>
                  {brawlers.map((br) => (
                    <option key={br} value={br} className="option">{br}</option>
                  ))}
                </select>
              </div>
            ))}
          </div>
          
          <div className={`team-panel ${activeTab === 'team2' ? 'team-active team2-active' : ''}`}>
            <div className="team-header">
              <div className="team-title">
                <UsersIcon className="team2-icon" />
                <h2 className="team-name">TEAM 2</h2>
              </div>
              <div className="team-badge team2-badge">RED</div>
            </div>
            
            {team2.map((b, i) => (
              <div key={i} className="brawler-select">
                <UserIcon className="team2-user" />
                <select
                  value={b}
                  onChange={(e) => handleChange(i, "team2", e.target.value)}
                  className="select-input"
                  onFocus={() => setActiveTab("team2")}
                >
                  <option value="" className="option">Select Brawler {i + 1}</option>
                  {brawlers.map((br) => (
                    <option key={br} value={br} className="option">{br}</option>
                  ))}
                </select>
              </div>
            ))}
          </div>
        </div>
        
        {error && (
          <div className="error-message">
            <p>
              <svg className="error-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
              {error}
            </p>
          </div>
        )}
        
        <button
          onClick={predict}
          disabled={isLoading}
          className={`predict-button ${isLoading ? 'loading' : ''}`}
        >
          {isLoading ? (
            <>
              <div className="loading-spinner"></div>
              <span>Analyzing...</span>
            </>
          ) : (
            <>
              <span>PREDICT MATCH OUTCOME</span>
              <ArrowRightIcon />
            </>
          )}
        </button>
        
        {result && (
          <div className="result-container">
            <h3 className="result-title">{result.result}</h3>
            <div className="progress-bar-container">
              <div 
                className={`progress-bar ${result.result.includes("Team 1") ? "team1-bar" : "team2-bar"}`}
                style={{ width: `${result.win_percentage}%` }}
              ></div>
            </div>
            <p className="result-percentage">Win probability: <span className="percentage-value">{result.win_percentage}%</span></p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TeamCompositionPage;