import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import * as XLSX from 'xlsx';
import './BrawlerDetail.css';

function BrawlerDetail() {
  const { name } = useParams();
  const [brawler, setBrawler] = useState(null);
  const [description, setDescription] = useState('');
  const [statsBrawl, setStatsBrawl] = useState(null);
  const [attackStats, setAttackStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedLevel, setSelectedLevel] = useState(1);
  const [passiveAttacks, setPassiveAttacks] = useState(null);
  const [foundDesc, setFoundDesc] = useState(null);
  const [starGadgetData, setStarGadgetData] = useState(null);

  useEffect(() => {


    async function fetchData() {
      try {
        const statsResponse = await fetch('/BrawlerData.xlsx');
        const statsArrayBuffer = await statsResponse.arrayBuffer();
        const statsWorkbook = XLSX.read(statsArrayBuffer, { type: 'array' });
        const statsWorksheet = statsWorkbook.Sheets[statsWorkbook.SheetNames[0]];
        const statsData = XLSX.utils.sheet_to_json(statsWorksheet);
        const foundBrawler = statsData.find(b => b.Brawler === name);

        const descResponse = await fetch('/BrawlerDescription.csv');
        const descArrayBuffer = await descResponse.arrayBuffer();
        const descWorkbook = XLSX.read(descArrayBuffer, { type: 'array' });
        const descWorksheet = descWorkbook.Sheets[descWorkbook.SheetNames[0]];
        const descData = XLSX.utils.sheet_to_json(descWorksheet);
        const foundDesc = descData.find(b => b.Brawler === name);
        const found = descData.find(b => b.Brawler === name);

        const statsBrawlResponse = await fetch('/BrawlerStatistics.csv');
        const statsBrawlArrayBuffer = await statsBrawlResponse.arrayBuffer();
        const statsBrawlWorkbook = XLSX.read(statsBrawlArrayBuffer, { type: 'array' });
        const statsBrawlWorksheet = statsBrawlWorkbook.Sheets[statsBrawlWorkbook.SheetNames[0]];
        const statsBrawlData = XLSX.utils.sheet_to_json(statsBrawlWorksheet);
        const foundStatsBrawl = statsBrawlData.find(b => b.Brawler === name);

        const attackStatsResponse = await fetch('/BrawlerAttack.csv');
        const attackStatsArrayBuffer = await attackStatsResponse.arrayBuffer();
        const attackStatsWorkbook = XLSX.read(attackStatsArrayBuffer, { type: 'array' });
        const attackStatsWorksheet = attackStatsWorkbook.Sheets[attackStatsWorkbook.SheetNames[0]];
        const attackStatsData = XLSX.utils.sheet_to_json(attackStatsWorksheet);
        const foundAttackStats = attackStatsData.find(b => b.Brawler === name);
        
        const passiveAttacksResponse = await fetch('/BrawlerSuper.csv');
        const passiveAttacksArrayBuffer = await passiveAttacksResponse.arrayBuffer();
        const passiveAttacksWorkbook = XLSX.read(passiveAttacksArrayBuffer, { type: 'array' });
        const passiveAttacksWorksheet = passiveAttacksWorkbook.Sheets[passiveAttacksWorkbook.SheetNames[0]];
        const passiveAttacksData = XLSX.utils.sheet_to_json(passiveAttacksWorksheet);
        const foundPassiveAttack = passiveAttacksData.find(b => b.Brawler === name);

        const starGadgetResponse = await fetch('/BrawlerGadgets.csv');
        const starGadgetArrayBuffer = await starGadgetResponse.arrayBuffer();
        const starGadgetWorkbook = XLSX.read(starGadgetArrayBuffer, { type: 'array' });
        const starGadgetWorksheet = starGadgetWorkbook.Sheets[starGadgetWorkbook.SheetNames[0]];
        const starGadgetDataJson = XLSX.utils.sheet_to_json(starGadgetWorksheet);
        const foundStarGadget = starGadgetDataJson.find(b => b.Brawler === name);

        setStarGadgetData(foundStarGadget);
        setFoundDesc(found);
        setPassiveAttacks(foundPassiveAttack);
        setAttackStats(foundAttackStats);
        setBrawler(foundBrawler);
        setDescription(foundDesc ? foundDesc.Description : 'No description available.');
        setStatsBrawl(foundStatsBrawl);
      } catch (error) {
        console.error('Error loading data:', error);
      } finally {
        setLoading(false);
      }
      return () => {
        document.body.style.overflow = '';
        document.documentElement.style.overflow = '';
        document.body.style.height = '';
        document.documentElement.style.height = '';
      };
    }

    fetchData();
  }, [name]);

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
  
  function computeHealth() {
    if (!statsBrawl) return 'N/A';
    let baseHealth = Number(statsBrawl.Health) || 0;
    const classType = statsBrawl.Class;
  
    let healthPerLevel = 0;
  
    switch (classType) {
      case 'Tank': healthPerLevel = 560; break;
      case 'Artillery': healthPerLevel = 400; break;
      case 'Assassin': healthPerLevel = 300; break;
      case 'Controller': healthPerLevel = 350; break;
      case 'Damage Dealer': healthPerLevel = 320; break;
      case 'Marksman': healthPerLevel = 280; break;
      case 'Support': healthPerLevel = 360; break;
      default: healthPerLevel = 0;
    }
  
    return baseHealth + (selectedLevel - 1) * healthPerLevel;
  }

  function computeDamage() {
    if (!attackStats || !statsBrawl) return 'N/A';
    let baseDamage = Number(attackStats.Damage) || 0;
    const classType = statsBrawl.Class;
  
    let damagePerLevel = 0;
  
    switch (classType) {
      case 'Tank': damagePerLevel = 100; break;
      case 'Artillery': damagePerLevel = 120; break;
      case 'Assassin': damagePerLevel = 150; break;
      case 'Controller': damagePerLevel = 110; break;
      case 'Damage Dealer': damagePerLevel = 130; break;
      case 'Marksman': damagePerLevel = 140; break;
      case 'Support': damagePerLevel = 90; break;
      default: damagePerLevel = 0;
    }
  
    return baseDamage + (selectedLevel - 1) * damagePerLevel;
  }

  function computeDamage2() {
    if (!passiveAttacks || !statsBrawl) return 'N/A';
    let baseDamage = Number(attackStats.Damage) || 0;
    const classType = statsBrawl.Class;
  
    let damagePerLevel = 0;
  
    switch (classType) {
      case 'Tank': damagePerLevel = 80; break;
      case 'Artillery': damagePerLevel = 110; break;
      case 'Assassin': damagePerLevel = 130; break;
      case 'Controller': damagePerLevel = 90; break;
      case 'Damage Dealer': damagePerLevel = 110; break;
      case 'Marksman': damagePerLevel = 120; break;
      case 'Support': damagePerLevel = 70; break;
      default: damagePerLevel = 0;
    }
  
    return baseDamage + (selectedLevel - 1) * damagePerLevel;
  }

  function formatNumber(num) {
    if (num >= 1e6) return (num / 1e6).toFixed(1) + 'm';
    if (num >= 1e3) return (num / 1e3).toFixed(1) + 'k';
    return num;
  }

  function handleScrollUp() {
    const container = document.getElementById('scrollable-container');
    container.scrollTop -= 250;
  }

  function handleScrollDown() {
    const container = document.getElementById('scrollable-container');
    container.scrollTop += 250;
  }

  if (loading) {
    return <div className="loading-message">Loading...</div>;
  }

  if (!brawler) {
    return <div className="not-found-message">Brawler not found.</div>;
  }

  return (
    <div className="brawler-detail fade-in">
      <Link to="/brawler" className="back-link">
        ← Back to Brawler Stats
      </Link>

      <div style={{ display: 'flex', alignItems: 'center', gap: '30px', flexWrap: 'wrap', marginTop: '50px' }}>
  {/* Main Brawler Image */}
  <img
  src={`/Images1/${brawler.Brawler}.png`}
  onError={(e) => {
    e.target.onerror = null;
    e.target.src = '/images1/default.png';
  }}
  alt={brawler.Brawler}
  style={{
    width: '300px',
    height: '300px',
    borderRadius: '20px',
    objectFit: 'cover',
    marginTop: '60px'
  }}
/>
    {/* Text Section */}
    <div>
      <h1 style={{ fontSize: '48px', marginTop: '100px' }}>{brawler.Brawler.toUpperCase()}</h1>
      <p style={{ maxWidth: '600px', lineHeight: '1.6', fontSize: '25px' }}>
        {description}
      </p>
    </div>
    {/* Description Section */}
  <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
    {/* OLLIE Image on the side */}
    <img 
      src={`/Icon/${brawler.Brawler}.png`}
      onError={(e) => { e.target.onerror = null; e.target.src = '/Icon/default.png'; }}
      alt={brawler.Brawler}
      style={{ width: '250px', height: 'auto', borderRadius: '20px', objectFit: 'cover', marginLeft:'80px' }}
    />
  </div>

  {foundDesc && (
  <div style={{ marginTop: '30px', display: 'flex', flexDirection: 'column', gap: '40px', marginLeft:'50px'}}>
    {/* Loses Against Most */}
<div style={{ flex: '1' }}>
  <h2 style={{ fontSize: '25px', marginBottom: '8px' }}>Lose against most Brawlers</h2>
  <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '10px' }}>
    {foundDesc.LoseAgainstMost && foundDesc.LoseAgainstMost.split(',')
      .map(opponent => opponent.trim())
      .filter(opponent => opponent !== 'N/A')
      .map((opponent, index) => (
        <div key={index} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <img 
            src={`/images1/${opponent}.png`} 
            onError={(e) => { e.target.onerror = null; e.target.src = '/images1/default.png'; }}
            alt={opponent}
            style={{ width: '60px', height: '60px', borderRadius: '10px', objectFit: 'cover' }}
          />
          <span style={{ fontSize: '14px', marginTop: '5px' }}>{index + 1}</span>
        </div>
    ))}
  </div>
</div>

{/* Wins Against Most */}
<div style={{ flex: '1', marginTop: '10px' }}>
  <h2 style={{ fontSize: '25px', marginBottom: '10px' }}>Win against most Brawlers</h2>
  <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '10px' }}>
    {foundDesc.WinAgainstMost && foundDesc.WinAgainstMost.split(',')
      .map(opponent => opponent.trim())
      .filter(opponent => opponent !== 'N/A')
      .map((opponent, index) => (
        <div key={index} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <img 
            src={`/images1/${opponent}.png`} 
            onError={(e) => { e.target.onerror = null; e.target.src = '/images1/default.png'; }}
            alt={opponent}
            style={{ width: '60px', height: '60px', borderRadius: '10px', objectFit: 'cover' }}
          />
          <span style={{ fontSize: '14px', marginTop: '5px' }}>{index + 1}</span>
        </div>
    ))}
  </div>
</div>

  </div>
)}

</div>
     
      <div className="stats-banner">
        <Stat title="Win Rate" value={`${(brawler['Win Rate'] * 100).toFixed(2)}%`} />
        <Stat
          title="Class"
          value={
            <img
              src={getClassImage(brawler.Class)}
              alt={brawler.Class ?? 'Unknown'}
              title={brawler.Class ?? 'Unknown'}
              className="class-icon"
              onError={(e) => { e.target.onerror = null; e.target.src = '/classes/default.png'; }}
            />
          }
        />
        <Stat title="Use Rate" value={`${(brawler['Use Rate'] * 100).toFixed(2)}%`} />
        <Stat title="Tier" value={brawler.Tier ?? 'N/A'} color={getTierColor(brawler.Tier)} />
        <Stat title="Picks" value={brawler['Picks Recorded'] ? brawler['Picks Recorded'] : 'N/A'} />
        <Stat title="Wins" value={formatNumber(brawler['Wins Recorded'])} />
      </div>

      <h1 className="section-title">Overview</h1>

      <div className="overview-cards">
        {/* Statistics Card */}
        <div className="card statistics-card">
          <div className="card-header">
            <img
              src={`/images1/${brawler.Brawler}.png`}
              onError={(e) => { e.target.onerror = null; e.target.src = '/images1/default.png'; }}
              alt="Icon"
              className="card-icon"
            />
            <h2 className="card-title">Statistics</h2>
          </div>

          <div className="stats-grid">
            <div className="stat-label">Level</div>
            <div>
              <select
                value={selectedLevel}
                onChange={(e) => setSelectedLevel(Number(e.target.value))}
                className="level-select"
              >
                {Array.from({ length: 11 }, (_, i) => (
                  <option key={i + 1} value={i + 1}>{i + 1}</option>
                ))}
              </select>
            </div>

            <div className="stat-label">Health</div>
            <div className="stat-value">{computeHealth()}</div>

            <div className="stat-label">Rarity</div>
            <div className="stat-value">{statsBrawl?.Rarity || 'N/A'}</div>

            <div className="stat-label">Class</div>
            <div className="stat-value">{statsBrawl?.Class || 'N/A'}</div>

            <div className="stat-label">Movement Speed</div>
            <div className="stat-value">{statsBrawl?.['Movement Speed'] || 'N/A'}</div>

            <div className="stat-label">Voice Actor</div>
            <div className="stat-value">{statsBrawl?.['Voice Actor'] || 'N/A'}</div>
          </div>
        </div>

        {/* Attack Card */}
        {attackStats && (
          <div className="card attack-card">
            <div className="card-header">
              <img
                src={`/AttackCard/${brawler.Brawler}.png`}
                onError={(e) => { e.target.onerror = null; e.target.src = '/AttackCard/OLLIE.png'; }}
                alt={brawler.Brawler}
                className="card-icon"
              />
              <h2 className="card-title">{attackStats.Passive || 'Attack Info'}</h2>
            </div>

            <p className="attack-description">
              {attackStats.Description || 'No attack description available.'}
            </p>

            <div className="stats-grid">
              <div className="stat-label">Damage</div>
              <div className="stat-value">{computeDamage()}</div>

              <div className="stat-label">Range</div>
              <div className="stat-value">{attackStats.Range || 'N/A'}</div>

              <div className="stat-label">Reload</div>
              <div className="stat-value">{attackStats.Reload || 'N/A'}</div>

              <div className="stat-label">Attack Size</div>
              <div className="stat-value">{attackStats['Attack Size'] ? `${attackStats['Attack Size']}%` : 'N/A'}</div>

              <div className="stat-label">Super Charge</div>
              <div className="stat-value">{passiveAttacks['Super Charge Rate'] != null && !isNaN(passiveAttacks['Super Charge Rate'])? `${parseFloat(passiveAttacks['Super Charge Rate']).toFixed(2)}%`: 'N/A'}</div>

              <div className="stat-label">Hyper Charge</div>
              <div className="stat-value">{attackStats['Hyper Charge Rate'] != null && !isNaN(attackStats['Hyper Charge Rate'])? `${parseFloat(attackStats['Hyper Charge Rate']).toFixed(2)}%`: 'N/A'}</div>

            </div>
          </div>
        )}

        {/* Passive Attack Card */}
        {passiveAttacks && (
          <div className="card passive-card">
            <div className="card-header">
              <img
                src={`/PassiveAttack/${brawler.Brawler}.png`}
                onError={(e) => { e.target.onerror = null; e.target.src = '/PassiveAttack/OLLIE.png'; }}
                alt={brawler.Brawler}
                className="card-icon"
              />
              <h2 className="card-title">{passiveAttacks['Super Name'] || 'Passive Info'}</h2>
            </div>

            <p className="attack-description">
              {passiveAttacks.Description || 'No passive description available.'}
            </p>

            <div className="stats-grid">
              <div className="stat-label">Damage</div>
              <div className="stat-value">{computeDamage2()}</div>

              <div className="stat-label">Range</div>
              <div className="stat-value">{passiveAttacks.Range || 'N/A'}</div>

              <div className="stat-label">Super Charge</div>
              <div className="stat-value">{passiveAttacks['Super Charge Rate'] != null && !isNaN(passiveAttacks['Super Charge Rate'])? `${parseFloat(passiveAttacks['Super Charge Rate']).toFixed(2)}%`: 'N/A'}</div>

              <div className="stat-label">Hyper Charge</div>
              <div className="stat-value">{passiveAttacks['HyperCharge Charge Rate'] != null && !isNaN(passiveAttacks['HyperCharge Charge Rate'])? `${parseFloat(passiveAttacks['HyperCharge Charge Rate']).toFixed(2)}%`: 'N/A'}</div>

              {passiveAttacks.Duration && (
                <>
                  <div className="stat-label">Duration</div>
                  <div className="stat-value">{passiveAttacks.Duration}</div>
                </>
              )}
            </div>
          </div>
        )}
        
        <div className="star-powers-container">
          <h2 className="star-powers-title">Star Powers and Gadgets</h2>

          <div className="scrollable-wrapper">
            {/* Scrollable Container */}
            <div id="scrollable-container" className="scrollable-content">
              {/* Cards */}
              <div className="star-gadget-cards">
                {/* First Gadget Card */}
                {starGadgetData && starGadgetData['1stGadget'] && (
                  <div className="star-gadget-card">
                    <div className="star-gadget-header">
                      <img
                        src={`/StarPower/${brawler.Brawler}.png`}
                        onError={(e) => { e.target.onerror = null; e.target.src = '/StarPower/KICK.png'; }}
                        alt="First Gadget Icon"
                        className="star-gadget-icon"
                      />
                      <h3 className="star-gadget-name">
                        {starGadgetData['1stGadget']}
                      </h3>
                    </div>
                    <p className="star-gadget-description">
                      {starGadgetData['1stGadgetDescrip'] || 'No description available.'}
                    </p>
                  </div>
                )}

                {/* Second Gadget Card */}
                {starGadgetData && starGadgetData['2ndGadget'] && (
                  <div className="star-gadget-card">
                    <div className="star-gadget-header">
                      <img
                        src={`/StarPower/${brawler.Brawler}.png`}
                        onError={(e) => { e.target.onerror = null; e.target.src = '/StarPower/REN.png'; }}
                        alt="Second Gadget Icon"
                        className="star-gadget-icon"
                      />
                      <h3 className="star-gadget-name">
                        {starGadgetData['2ndGadget']}
                      </h3>
                    </div>
                    <p className="star-gadget-description">
                      {starGadgetData['2ndGadgetDescrip'] || 'No description available.'}
                    </p>
                  </div>
                )}

                {/* First Star Power Card */}
                {starGadgetData && starGadgetData['1stStarPower'] && (
                  <div className="star-gadget-card">
                    <div className="star-gadget-header">
                      <img
                        src={`/Gadget/${brawler.Brawler}.png`}
                        onError={(e) => { e.target.onerror = null; e.target.src = '/Gadget/REGULATE.png'; }}
                        alt="First Star Power Icon"
                        className="star-gadget-icon"
                      />
                      <h3 className="star-gadget-name">
                        {starGadgetData['1stStarPower']}
                      </h3>
                    </div>
                    <p className="star-gadget-description">
                      {starGadgetData['1stStarPowerDescrip'] || 'No description available.'}
                    </p>
                  </div>
                )}
                
                {/* Second Star Power Card */}
                {starGadgetData && starGadgetData['2ndStarPower'] && (
                  <div className="star-gadget-card">
                    <div className="star-gadget-header">
                      <img
                        src={`/Gadget/${brawler.Brawler}.png`}
                        onError={(e) => { e.target.onerror = null; e.target.src = '/Gadget/ALLEYEZ.png'; }}
                        alt="Second Star Power Icon"
                        className="star-gadget-icon"
                      />
                      <h3 className="star-gadget-name">
                        {starGadgetData['2ndStarPower']}
                      </h3>
                    </div>
                    <p className="star-gadget-description">
                      {starGadgetData['2ndStarPowerDescrip'] || 'No description available.'}
                    </p>
                  </div>
                )}
              </div>
            </div>
            
            {/* Scroll Buttons */}
            <div className="scroll-buttons">
              <button className="scroll-button scroll-up" onClick={handleScrollUp}>↑</button>
              <button className="scroll-button scroll-down" onClick={handleScrollDown}>↓</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Stat({ title, value, color }) {
  return (
    <div className="stat-item">
      <div className="stat-title">{title}</div>
      <div className="stat-value" style={{ color: color || 'white' }}>{value}</div>
    </div>
  );
}

export default BrawlerDetail;