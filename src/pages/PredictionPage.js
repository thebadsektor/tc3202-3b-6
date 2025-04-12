import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Select from 'react-select';

const PredictionPage = () => {
  const [modes, setModes] = useState([]);
  const [maps, setMaps] = useState([]);
  const [brawlers, setBrawlers] = useState([]);
  const [selectedMode, setSelectedMode] = useState(null);
  const [selectedMap, setSelectedMap] = useState(null);
  const [teamBrawlers, setTeamBrawlers] = useState([]);
  const [enemyBrawlers, setEnemyBrawlers] = useState([]);
  const [prediction, setPrediction] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showPredictionDetails, setShowPredictionDetails] = useState(false);

  // Load initial data
  useEffect(() => {
    axios.get('http://localhost:5000/init')
      .then(res => {
        setModes(res.data.modes.map(m => ({ value: m, label: m })));
        setBrawlers(res.data.brawlers.map(b => ({ value: b, label: b })));
      });
  }, []);

  // Load maps when mode changes
  useEffect(() => {
    if (selectedMode) {
      axios.post('http://localhost:5000/get_maps', { mode: selectedMode.value })
        .then(res => {
          setMaps(res.data.maps.map(m => ({ value: m, label: m })));
          setSelectedMap(null); // Clear previous map
        });
    }
  }, [selectedMode]);

  const handleTeamBrawlersChange = (selectedOptions) => {
    if (selectedOptions && selectedOptions.length <= 3) {
      setTeamBrawlers(selectedOptions);
    }
  };

  const handleEnemyBrawlersChange = (selectedOptions) => {
    if (selectedOptions && selectedOptions.length <= 3) {
      setEnemyBrawlers(selectedOptions);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (teamBrawlers.length !== 3 || enemyBrawlers.length !== 3) {
      alert('Please select exactly 3 brawlers for both teams.');
      return;
    }

    setIsLoading(true);
    const formData = new FormData();
    formData.append('mode', selectedMode.value);
    formData.append('map', selectedMap.value);
    teamBrawlers.forEach(b => formData.append('team_brawlers', b.value));
    enemyBrawlers.forEach(b => formData.append('enemy_brawlers', b.value));

    try {
      const res = await axios.post('http://localhost:5000/predict', formData);
      setPrediction(res.data.prediction);
      setShowPredictionDetails(true);
    } catch (error) {
      console.error('Prediction failed:', error);
      alert('Prediction failed. Try again.');
    } finally {
      setIsLoading(false);
    }
  };

  // Custom styles for react-select
  const customSelectStyles = {
    control: (provided) => ({
      ...provided,
      border: '2px solid #FFA700',
      borderRadius: '10px',
      backgroundColor: '#1F2040',
      color: 'white',
      boxShadow: 'none',
      width: '100%',
      height: '45px',
      fontWeight: 'bold',
      fontSize: '14px',
      '&:hover': {
        border: '2px solid #FFA700',
      }
    }),
    menu: (provided) => ({
      ...provided,
      backgroundColor: '#1F2040',
      border: '2px solid #FFA700',
      borderRadius: '10px',
      overflow: 'hidden',
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isFocused ? '#FFA700' : '#1F2040',
      color: state.isFocused ? '#1F2040' : 'white',
      fontWeight: 'bold',
      cursor: 'pointer',
      borderBottom: '1px solid #353866',
    }),
    singleValue: (provided) => ({
      ...provided,
      color: 'white',
      fontWeight: 'bold',
    }),
    placeholder: (provided) => ({
      ...provided,
      color: '#8C8EAF',
      fontWeight: 'bold',
    }),
    multiValue: (provided) => ({
      ...provided,
      backgroundColor: '#FFA700',
      borderRadius: '8px',
      padding: '0 2px',
    }),
    multiValueLabel: (provided) => ({
      ...provided,
      color: '#1F2040',
      fontWeight: 'bold',
    }),
    multiValueRemove: (provided) => ({
      ...provided,
      color: '#1F2040',
      ':hover': {
        backgroundColor: '#FF5252',
        color: 'white',
      },
    }),
    dropdownIndicator: (provided) => ({
      ...provided,
      color: '#FFA700',
      padding: '0 8px',
    }),
    clearIndicator: (provided) => ({
      ...provided,
      color: '#8C8EAF',
      padding: '0 8px',
      ':hover': {
        color: '#FF5252',
      },
    }),
  };

  return (
    <div style={styles.container}>
      {/* Welcome Banner */}
      <div style={styles.welcomeBanner}>
        <h2 style={styles.welcomeTitle}>WELCOME, <span style={styles.highlight}>BRAWLER</span>!</h2>
        <p style={styles.welcomeText}>Ready to predict your next Brawl Stars victory?</p>
      </div>

      {/* Main Content */}
      <main style={styles.mainContent}>
        <h2 style={styles.sectionTitle}>WIN PREDICTOR</h2>
        
        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.formRow}>
            <div style={styles.formGroup}>
              <label style={styles.label}>Game Mode</label>
              <Select 
                options={modes} 
                value={selectedMode} 
                onChange={setSelectedMode} 
                placeholder="Select Mode" 
                styles={customSelectStyles}
                isSearchable={true}
              />
            </div>
            
            <div style={styles.formGroup}>
              <label style={styles.label}>Map</label>
              <Select 
                options={maps} 
                value={selectedMap} 
                onChange={setSelectedMap} 
                placeholder="Select Map" 
                styles={customSelectStyles}
                isSearchable={true}
                isDisabled={!selectedMode}
              />
            </div>
          </div>

          <div style={styles.teamsContainer}>
            <div style={styles.teamSection}>
              <h3 style={styles.teamLabel}>YOUR TEAM (3 BRAWLERS)</h3>
              <Select
                options={brawlers}
                isMulti
                value={teamBrawlers}
                onChange={handleTeamBrawlersChange}
                placeholder="Select 3 Brawlers"
                closeMenuOnSelect={false}
                maxMenuHeight={200}
                styles={customSelectStyles}
                isSearchable={true}
                noOptionsMessage={() => "No brawlers found"}
              />
              {teamBrawlers.length > 0 && teamBrawlers.length < 3 && (
                <p style={styles.brawlerCount}>
                  {3 - teamBrawlers.length} more brawler{3 - teamBrawlers.length > 1 ? 's' : ''} needed
                </p>
              )}
            </div>

            <div style={styles.teamSection}>
              <h3 style={styles.teamLabel}>ENEMY TEAM (3 BRAWLERS)</h3>
              <Select
                options={brawlers}
                isMulti
                value={enemyBrawlers}
                onChange={handleEnemyBrawlersChange}
                placeholder="Select 3 Brawlers"
                closeMenuOnSelect={false}
                maxMenuHeight={200}
                styles={customSelectStyles}
                isSearchable={true}
                noOptionsMessage={() => "No brawlers found"}
              />
              {enemyBrawlers.length > 0 && enemyBrawlers.length < 3 && (
                <p style={styles.brawlerCount}>
                  {3 - enemyBrawlers.length} more brawler{3 - enemyBrawlers.length > 1 ? 's' : ''} needed
                </p>
              )}
            </div>
          </div>

          <div style={styles.actionContainer}>
            <button 
              type="submit" 
              style={isLoading ? {...styles.predictButton, ...styles.predictButtonDisabled} : styles.predictButton} 
              disabled={isLoading}
            >
              {isLoading ? 'PREDICTING...' : 'PREDICT WINNER'}
            </button>
          </div>
        </form>

        {showPredictionDetails && (
          <div style={styles.resultContainer}>
            <h3 style={styles.resultTitle}>PREDICTION RESULT</h3>
            
            <div style={styles.matchDetails}>
              <div style={styles.matchInfo}>
                <div style={styles.matchInfoItem}>
                  <span style={styles.matchInfoLabel}>MODE:</span>
                  <span style={styles.matchInfoValue}>{selectedMode?.value}</span>
                </div>
                <div style={styles.matchInfoItem}>
                  <span style={styles.matchInfoLabel}>MAP:</span>
                  <span style={styles.matchInfoValue}>{selectedMap?.value}</span>
                </div>
              </div>
              
              <div style={styles.teamsInfo}>
                <div style={styles.teamInfo}>
                  <h4 style={styles.teamInfoTitle}>YOUR TEAM</h4>
                  <div style={styles.brawlersList}>
                    {teamBrawlers.map((brawler, index) => (
                      <div key={index} style={styles.brawlerItem}>
                        {brawler.value}
                      </div>
                    ))}
                  </div>
                </div>
                
                <div style={styles.teamInfo}>
                  <h4 style={styles.teamInfoTitle}>ENEMY TEAM</h4>
                  <div style={styles.brawlersList}>
                    {enemyBrawlers.map((brawler, index) => (
                      <div key={index} style={styles.brawlerItem}>
                        {brawler.value}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            
            <div style={styles.resultContent}>
              {prediction}
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

// Styles object
const styles = {
  container: {
    backgroundColor: '#171a38',
    minHeight: '100vh',
    color: 'white',
    fontFamily: '"Lilita One", "Nunito", sans-serif',
    padding: '20px',
    margin: '0',
    width: '100%',
    boxSizing: 'border-box',
  },
  welcomeBanner: {
    backgroundColor: '#3D2A20',
    margin: '0 auto 30px auto',
    padding: '20px',
    borderRadius: '10px',
    textAlign: 'center',
    maxWidth: '90%',
    border: '2px solid #FFA700',
  },
  welcomeTitle: {
    fontSize: '28px',
    margin: '0 0 10px 0',
    color: 'white',
  },
  highlight: {
    color: '#FFA700',
  },
  welcomeText: {
    fontSize: '18px',
    margin: '0',
    color: '#B0B2CF',
  },
  mainContent: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '0 0 40px 0',
  },
  sectionTitle: {
    fontSize: '24px',
    color: '#FFA700',
    textAlign: 'center',
    marginBottom: '20px',
    textTransform: 'uppercase',
  },
  form: {
    backgroundColor: '#1F2040',
    borderRadius: '10px',
    padding: '20px',
    border: '2px solid #FFA700',
  },
  formRow: {
    display: 'flex',
    gap: '20px',
    marginBottom: '20px',
    flexWrap: 'wrap',
  },
  formGroup: {
    flex: '1 1 300px',
  },
  label: {
    display: 'block',
    marginBottom: '8px',
    color: '#FFA700',
    fontWeight: 'bold',
    fontSize: '16px',
  },
  teamsContainer: {
    display: 'flex',
    gap: '20px',
    marginBottom: '20px',
    flexWrap: 'wrap',
  },
  teamSection: {
    flex: '1 1 300px',
    marginBottom: '15px',
  },
  teamLabel: {
    color: '#FFA700',
    marginBottom: '10px',
    fontSize: '16px',
  },
  brawlerCount: {
    color: '#FF3A4A',
    fontSize: '14px',
    margin: '8px 0 0 0',
    fontWeight: 'bold',
  },
  actionContainer: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: '20px',
  },
  predictButton: {
    backgroundColor: '#FFA700',
    color: '#1F2040',
    border: 'none',
    borderRadius: '10px',
    padding: '12px 30px',
    fontSize: '18px',
    fontWeight: 'bold',
    cursor: 'pointer',
    boxShadow: '0 4px 0 #C77800',
    transition: 'all 0.1s ease',
    fontFamily: '"Lilita One", "Nunito", sans-serif',
    '&:hover': {
      transform: 'translateY(2px)',
      boxShadow: '0 2px 0 #C77800',
    },
  },
  predictButtonDisabled: {
    backgroundColor: '#8C8EAF',
    boxShadow: '0 4px 0 #53557A',
    cursor: 'not-allowed',
  },
  resultContainer: {
    backgroundColor: '#1F2040',
    borderRadius: '10px',
    padding: '20px',
    marginTop: '30px',
    border: '2px solid #FFA700',
    textAlign: 'center',
  },
  resultTitle: {
    color: '#FFA700',
    fontSize: '20px',
    marginTop: '0',
    marginBottom: '15px',
  },
  matchDetails: {
    backgroundColor: '#252750',
    padding: '15px',
    borderRadius: '8px',
    marginBottom: '15px',
  },
  matchInfo: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '20px',
    justifyContent: 'center',
    marginBottom: '15px',
  },
  matchInfoItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  },
  matchInfoLabel: {
    color: '#FFA700',
    fontWeight: 'bold',
    fontSize: '16px',
  },
  matchInfoValue: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: '16px',
  },
  teamsInfo: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '20px',
    justifyContent: 'space-around',
  },
  teamInfo: {
    flex: '1 1 300px',
  },
  teamInfoTitle: {
    color: '#FFA700',
    fontSize: '16px',
    marginTop: '0',
    marginBottom: '10px',
  },
  brawlersList: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '10px',
    justifyContent: 'center',
  },
  brawlerItem: {
    backgroundColor: '#353866',
    color: 'white',
    padding: '5px 12px',
    borderRadius: '6px',
    fontWeight: 'bold',
    border: '1px solid #FFA700',
  },
  resultContent: {
    backgroundColor: '#273057',
    padding: '15px',
    borderRadius: '8px',
    fontSize: '18px',
    fontWeight: 'bold',
    color: 'white',
  }
};

export default PredictionPage;