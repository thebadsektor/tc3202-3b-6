import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import * as XLSX from 'xlsx';

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

    document.body.style.overflow = 'auto';
  document.documentElement.style.overflow = 'auto';
  document.body.style.height = 'auto';
  document.documentElement.style.height = 'auto';

    async function fetchData() {
      try {
        const statsResponse = await fetch('/modified_brawler_data.xlsx');
        const statsArrayBuffer = await statsResponse.arrayBuffer();
        const statsWorkbook = XLSX.read(statsArrayBuffer, { type: 'array' });
        const statsWorksheet = statsWorkbook.Sheets[statsWorkbook.SheetNames[0]];
        const statsData = XLSX.utils.sheet_to_json(statsWorksheet);
        const foundBrawler = statsData.find(b => b.Brawler === name);

        const descResponse = await fetch('/BrawlDescription124.csv');
        const descArrayBuffer = await descResponse.arrayBuffer();
        const descWorkbook = XLSX.read(descArrayBuffer, { type: 'array' });
        const descWorksheet = descWorkbook.Sheets[descWorkbook.SheetNames[0]];
        const descData = XLSX.utils.sheet_to_json(descWorksheet);
        const foundDesc = descData.find(b => b.Brawler === name);
        const found = descData.find(b => b.Brawler === name);

        const statsBrawlResponse = await fetch('/StatisticsBrawl1.csv');
        const statsBrawlArrayBuffer = await statsBrawlResponse.arrayBuffer();
        const statsBrawlWorkbook = XLSX.read(statsBrawlArrayBuffer, { type: 'array' });
        const statsBrawlWorksheet = statsBrawlWorkbook.Sheets[statsBrawlWorkbook.SheetNames[0]];
        const statsBrawlData = XLSX.utils.sheet_to_json(statsBrawlWorksheet);
        const foundStatsBrawl = statsBrawlData.find(b => b.Brawler === name);

        

        const attackStatsResponse = await fetch('/BrawlerAttackData_fixed.xlsx');
        const attackStatsArrayBuffer = await attackStatsResponse.arrayBuffer();
        const attackStatsWorkbook = XLSX.read(attackStatsArrayBuffer, { type: 'array' });
        const attackStatsWorksheet = attackStatsWorkbook.Sheets[attackStatsWorkbook.SheetNames[0]];
        const attackStatsData = XLSX.utils.sheet_to_json(attackStatsWorksheet);
        const foundAttackStats = attackStatsData.find(b => b.Brawler === name);
        
        const passiveAttacksResponse = await fetch('/PassiveBrawler.xlsx');
        const passiveAttacksArrayBuffer = await passiveAttacksResponse.arrayBuffer();
        const passiveAttacksWorkbook = XLSX.read(passiveAttacksArrayBuffer, { type: 'array' });
        const passiveAttacksWorksheet = passiveAttacksWorkbook.Sheets[passiveAttacksWorkbook.SheetNames[0]];
        const passiveAttacksData = XLSX.utils.sheet_to_json(passiveAttacksWorksheet);
        const foundPassiveAttack = passiveAttacksData.find(b => b.Brawler === name);

        const starGadgetResponse = await fetch('/GadgetsAndStarPoser.xlsx');
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
      case 'S':
        return 'red';
      case 'A':
        return 'orange';
      case 'B':
        return 'yellow';
      case 'C':
        return 'yellowgreen';
      case 'D':
        return 'green';
      case 'F':
        return 'blue';
      default:
        return 'white';
    }
  }

  
  
  function computeHealth() {
    if (!statsBrawl) return 'N/A';
    let baseHealth = Number(statsBrawl.Health) || 0;
    const classType = statsBrawl.Class;
  
    let healthPerLevel = 0;
  
    switch (classType) {
      case 'Tank':
        healthPerLevel = 560;
        break;
      case 'Artillery':
        healthPerLevel = 400;
        break;
      case 'Assassin':
        healthPerLevel = 300;
        break;
      case 'Controller':
        healthPerLevel = 350;
        break;
      case 'Damage Dealer':
        healthPerLevel = 320;
        break;
      case 'Marksman':
        healthPerLevel = 280;
        break;
      case 'Support':
        healthPerLevel = 360;
        break;
      default:
        healthPerLevel = 0;
    }
  
    return baseHealth + (selectedLevel - 1) * healthPerLevel;
  }
  

  function computeDamage() {
    if (!attackStats || !statsBrawl) return 'N/A';
    let baseDamage = Number(attackStats.Damage) || 0;
    const classType = statsBrawl.Class;
  
    let damagePerLevel = 0;
  
    switch (classType) {
      case 'Tank':
        damagePerLevel = 100;
        break;
      case 'Artillery':
        damagePerLevel = 120;
        break;
      case 'Assassin':
        damagePerLevel = 150;
        break;
      case 'Controller':
        damagePerLevel = 110;
        break;
      case 'Damage Dealer':
        damagePerLevel = 130;
        break;
      case 'Marksman':
        damagePerLevel = 140;
        break;
      case 'Support':
        damagePerLevel = 90;
        break;
      default:
        damagePerLevel = 0;
    }
  
    return baseDamage + (selectedLevel - 1) * damagePerLevel;
  }
  
  function getClassImage(className) {
    if (!className) return '/Class/default.png';
    
    switch (className.toLowerCase()) {
      case 'damage dealer':
        return '/Class/Damage Dealer.png';
      case 'assasin':
        return '/Class/Assasin.png';
      case 'marksmen':
        return '/Class/Marksmen.png';
      case 'artillery':
        return '/Class/Artillery.png';
      case 'tank':
        return '/Class/Tank.png';
      case 'support':
        return '/Class/Support.png';
      case 'controller':
        return '/Class/Controller.png';
      default:
        return '/Class/default.png'; // fallback image
    }
  }

  function computeDamage2() {
    if (!passiveAttacks || !statsBrawl) return 'N/A';
    let baseDamage = Number(attackStats.Damage) || 0;
    const classType = statsBrawl.Class;
  
    let damagePerLevel = 0;
  
    switch (classType) {
      case 'Tank':
        damagePerLevel = 80;
        break;
      case 'Artillery':
        damagePerLevel = 110;
        break;
      case 'Assassin':
        damagePerLevel = 130;
        break;
      case 'Controller':
        damagePerLevel = 90;
        break;
      case 'Damage Dealer':
        damagePerLevel = 110;
        break;
      case 'Marksman':
        damagePerLevel = 120;
        break;
      case 'Support':
        damagePerLevel = 70;
        break;
      default:
        damagePerLevel = 0;
    }
  
    return baseDamage + (selectedLevel - 1) * damagePerLevel;
  }

  if (loading) {
    return <div style={{ color: 'white', textAlign: 'center', marginTop: '100px' }}>Loading...</div>;
  }

  if (!brawler) {
    return <div style={{ color: 'white', textAlign: 'center', marginTop: '100px' }}>Brawler not found.</div>;
  }

  return (
    <div className="fade-in" style={{ backgroundColor: '#121212', color: 'white', minHeight: '100vh', padding: '40px' }}>
      <Link to="/brawler" className="back-link" style={{ color: 'deepskyblue', fontSize: '25px', textDecoration: 'none' }}>
        ← Back to Brawler Stats
      </Link>

      <div style={{ display: 'flex', alignItems: 'center', gap: '30px', flexWrap: 'wrap' }}>
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
    marginTop: '20px'
  }}
/>
    {/* Text Section */}
    <div>
      <h1 style={{ fontSize: '60px', marginTop: '60px' }}>{brawler.Brawler.toUpperCase()}</h1>
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
      style={{ width: '100%', height: '350px', borderRadius: '20px', objectFit: 'cover', marginLeft:'50px' }}
    />
  </div>

  {foundDesc && (
  <div style={{ marginTop: '30px', display: 'flex', flexDirection: 'column', gap: '40px', marginLeft:'50px'}}>
    {/* Loses Against Most */}
    <div style={{ flex: '1' }}>
      <h2 style={{ fontSize: '23px', marginBottom: '10px' }}>Lose against most - According to statistics</h2>
      <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '10px' }}>
        {foundDesc.LoseAgainstMost && foundDesc.LoseAgainstMost.split(',').map((opponent, index) => (
          <div key={index} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <img 
              src={`/images1/${opponent.trim()}.png`} 
              onError={(e) => { e.target.onerror = null; e.target.src = '/images1/default.png'; }}
              alt={opponent.trim()}
              style={{ width: '50px', height: '50px', borderRadius: '10px', objectFit: 'cover' }}
            />
            <span style={{ fontSize: '14px', marginTop: '5px' }}>{index + 1}</span>
          </div>
        ))}
      </div>
    </div>

    {/* Wins Against Most */}
    <div style={{ flex: '1', marginTop: '10px' }}>
      <h2 style={{ fontSize: '23px', marginBottom: '10px' }}>Win against most - According to statistics</h2>
      <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '10px' }}>
        {foundDesc.WinAgainstMost && foundDesc.WinAgainstMost.split(',').map((opponent, index) => (
          <div key={index} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <img 
              src={`/images1/${opponent.trim()}.png`} 
              onError={(e) => { e.target.onerror = null; e.target.src = '/images1/default.png'; }}
              alt={opponent.trim()}
              style={{ width: '50px', height: '50px', borderRadius: '10px', objectFit: 'cover' }}
            />
            <span style={{ fontSize: '14px', marginTop: '5px' }}>{index + 1}</span>
          </div>
        ))}
      </div>
    </div>
  </div>
)}

</div>
     
<div style={{
  backgroundColor: '#1c1c1c',
  marginTop: '50px',
  padding: '30px',
  borderRadius: '15px',
  display: 'flex',
  justifyContent: 'space-around',
  alignItems: 'center',
  fontSize: '25px',
  flexWrap: 'wrap',
  boxShadow: '0 0 10px #00BFFF55'
}}>
  <Stat title="Win Rate" value={`${(brawler['Win Rate'] * 100).toFixed(2)}%`} />

  {/* --- New: Class Stat --- */}
  <Stat
    title="Class"
    value={
      <img
        src={getClassImage(brawler.Class)}
        alt={brawler.Class ?? 'Unknown'}
        title={brawler.Class ?? 'Unknown'}
        style={{
          width: '50px',
          height: '50px',
          objectFit: 'contain',
          borderRadius: '10px',
          backgroundColor: '#2c2c2c',
          padding: '5px'
        }}
        onError={(e) => { e.target.onerror = null; e.target.src = '/classes/default.png'; }}
      />
    }
    
  />
  <Stat title="Use Rate" value={`${(brawler['Use Rate'] * 100).toFixed(2)}%`} />
  <Stat title="Tier" value={brawler.Tier ?? 'N/A'} color={getTierColor(brawler.Tier)} />
  <Stat title="Picks" value={brawler['Picks Recorded'] ? brawler['Picks Recorded'] : 'N/A'} />
  <Stat title="Wins" value={formatNumber(brawler['Wins Recorded'])} />
</div>


      <h1 style={{ textAlign: 'left', width: '90%', marginTop: '30px',fontSize: '35px' }}>Overview</h1>

      <div style={{ display: 'flex', gap: '40px', marginTop: '30px', flexWrap: 'wrap', alignItems: 'stretch',justifyContent: 'center' }}>
  
  {/* Statistics Card */}
  <div style={{
    backgroundColor: '#1c1c1c',
    padding: '30px',
    width: '400px',
    
    borderRadius: '14px',
  }}>
    <div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
      <img
        src={`/images1/${brawler.Brawler}.png`}
        onError={(e) => { e.target.onerror = null; e.target.src = '/images1/default.png'; }}
        alt="Icon"
        style={{ width: '50px', height: '50px', borderRadius: '10px', marginRight: '10px' }}
      />
      <h2 style={{ fontSize: '30px' }}>Statistics</h2>
    </div>

    <div style={{ display: 'grid', marginTop:'130px', gridTemplateColumns: '1fr 1fr', rowGap: '15px', columnGap: '20px',fontSize: '18px' }}>
      <div style={{ color: '#bbb' }}>Level</div>
      <div>
        <select
          value={selectedLevel}
          onChange={(e) => setSelectedLevel(Number(e.target.value))}
          style={{
            backgroundColor: '#2c2c2c',
            color: 'white',
            border: 'none',
            padding: '5px',
            fontSize: '18px',
            borderRadius: '5px'
          }}
        >
          {Array.from({ length: 11 }, (_, i) => (
            <option key={i + 1} value={i + 1}>{i + 1}</option>
          ))}
        </select>
      </div>

      <div style={{ color: '#bbb', fontSize: '18px' }}>Health</div>
      <div style={{ fontSize: '18px', color: 'white' }}>{computeHealth()}</div>

      <div style={{ color: '#bbb',fontSize: '18px' }}>Rarity</div>
      <div style={{ fontSize: '18px', color: 'white' }}>{statsBrawl?.Rarity || 'N/A'}</div>

      <div style={{ color: '#bbb',fontSize: '18px' }}>Class</div>
      <div style={{ fontSize: '18px', color: 'white' }}>{statsBrawl?.Class || 'N/A'}</div>

      <div style={{ color: '#bbb',fontSize: '18px' }}>Movement Speed</div>
      <div style={{ fontSize: '18px', color: 'white' }}>{statsBrawl?.['Movement Speed'] || 'N/A'}</div>

      <div style={{ color: '#bbb',fontSize: '18px' }}>Voice Actor</div>
      <div style={{ fontSize: '18px', color: 'white' }}>{statsBrawl?.['Voice Actor'] || 'N/A'}</div>

    </div>
  </div>

  {/* Attack Card */}
  {attackStats && (
    <div style={{
      backgroundColor: '#1c1c1c',
      padding: '30px',
      width: '440px',
      fontSize: '18px',
      borderRadius: '15px',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
        <img
          src={`/AttackCard/${brawler.Brawler}.png`}
          onError={(e) => { e.target.onerror = null; e.target.src = '/AttackCard/OLLIE.png'; }}
          alt={brawler.Brawler}
          style={{ width: '50px', height: '50px', borderRadius: '10px', marginRight: '10px' }}
        />
        <h2 style={{ fontSize: '30px' }}>{attackStats.Passive || 'Attack Info'}</h2>
      </div>

      <p style={{ fontStyle: 'italic', marginBottom: '20px', color: '#ccc',fontSize: '20px', marginTop: '50px' }}>
        {attackStats.Description || 'No attack description available.'}
      </p>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', rowGap: '15px', columnGap: '20px', marginTop: '37px' }}>
        <div style={{ color: '#bbb' }}>Damage</div>
        <div>{computeDamage()}</div>

        <div style={{ color: '#bbb' }}>Range</div>
        <div>{attackStats.Range || 'N/A'}</div>

        <div style={{ color: '#bbb' }}>Reload</div>
        <div>{attackStats.Reload || 'N/A'}</div>

        <div style={{ color: '#bbb' }}>Super Charge</div>
        <div>{attackStats['Super Charge'] ? `${attackStats['Super Charge']}%` : 'N/A'}</div>

        <div style={{ color: '#bbb' }}>Spread</div>
        <div>{attackStats.Spread || 'N/A'}</div>

        <div style={{ color: '#bbb' }}>Speed</div>
        <div>{attackStats.Speed || 'N/A'}</div>
      </div>
    </div>
  )}


  {/* Passive Attack Card */}
  {passiveAttacks && (
    <div style={{
      backgroundColor: '#1c1c1c',
      padding: '30px',
      width: '400px',
      fontSize: '18px',
      borderRadius: '15px',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
        <img
          src={`/PassiveAttack/${brawler.Brawler}.png`}
          onError={(e) => { e.target.onerror = null; e.target.src = '/PassiveAttack/OLLIE.png'; }}
          alt={brawler.Brawler}
          style={{ width: '50px', height: '50px', borderRadius: '10px', marginRight: '10px' }}
        />
        <h2 style={{ fontSize: '30px' }}>{passiveAttacks['Super Name'] || 'Passive Info'}</h2>

      </div>

      <p style={{ fontStyle: 'italic', marginBottom: '20px', color: '#ccc',fontSize: '16px' }}>
        {passiveAttacks.Description || 'No passive description available.'}
      </p>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', rowGap: '15px', columnGap: '20px' }}>
        <div style={{ color: '#bbb' }}>Damage</div>
        <div>{computeDamage2()}</div>

        <div style={{ color: '#bbb' }}>Range</div>
        <div>{passiveAttacks.Range || 'N/A'}</div>

        <div style={{ color: '#bbb' }}>Super Charge</div>
        <div>{passiveAttacks['Super Charge'] ? `${passiveAttacks['Super Charge']}%` : 'N/A'}</div>

        <div style={{ color: '#bbb' }}>Spread</div>
        <div>{passiveAttacks.Spread || 'N/A'}</div>

        {passiveAttacks.Duration && (
          <>
            <div style={{ color: '#bbb' }}>Duration</div>
            <div>{passiveAttacks.Duration}</div>
          </>
        )}
      </div>
      
    </div>
    
  )}
  
  <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'flex-start', height:'300px' }}>
  <h2 style={{ fontSize: '30px', color: 'white', marginBottom: '20px', marginTop: '20px' }}>
    Star Powers and Gadgets
  </h2>

  <div style={{ position: 'relative', width: '100%' }}>
    {/* Scrollable Container */}
    <div
      id="scrollable-container"
      style={{
        maxHeight: '450px',
        overflowY: 'hidden',
        width: '100ps',
        fontSize: '20px',
        paddingRight: '50px', // space para hindi matamaan ng buttons
        scrollBehavior: 'smooth',
        borderRadius: '15px',
      }}
    >
      {/* Cards */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        {/* First Gadget Card */}
        {starGadgetData && starGadgetData['1stGadget'] && (
          <div style={{
            backgroundColor: '#1c1c1c',
            padding: '30px',
            width: '400px',
            borderRadius: '15px',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
              <img
                src={`/StarPower/${brawler.Brawler}.png`}
                onError={(e) => { e.target.onerror = null; e.target.src = '/StarPower/KICK.png'; }}
                alt="First Gadget Icon"
                style={{ width: '45px', height: '45px', marginRight: '10px' }}
              />
              <h3 style={{ fontSize: '27px', color: 'white' }}>
                {starGadgetData['1stGadget']}
              </h3>
            </div>
            <p style={{ fontStyle: 'italic', color: '#ccc' }}>
              {starGadgetData['1stGadgetDescrip'] || 'No description available.'}
            </p>
          </div>
        )}

        {/* Second Gadget Card */}
        {starGadgetData && starGadgetData['2ndGadget'] && (
          <div style={{
            backgroundColor: '#1c1c1c',
            padding: '30px',
            width: '400px',
            borderRadius: '15px',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
              <img
                src={`/StarPower/${brawler.Brawler}.png`}
                onError={(e) => { e.target.onerror = null; e.target.src = '/StarPower/REN.png'; }}
                alt="Second Gadget Icon"
                style={{ width: '45px', height: '45px', marginRight: '10px' }}
              />
              <h3 style={{ fontSize: '27px', color: 'white' }}>
                {starGadgetData['2ndGadget']}
              </h3>
            </div>
            <p style={{ fontStyle: 'italic', color: '#ccc' }}>
              {starGadgetData['2ndGadgetDescrip'] || 'No description available.'}
            </p>
          </div>
        )}

        {/* First Star Power Card */}
        {starGadgetData && starGadgetData['1stStarPower'] && (
          <div style={{
            backgroundColor: '#1c1c1c',
            padding: '30px',
            width: '400px',
            borderRadius: '15px',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
              <img
                src={`/Gadget/${brawler.Brawler}.png`}
                onError={(e) => { e.target.onerror = null; e.target.src = '/Gadget/REGULATE.png'; }}
                alt="First Star Power Icon"
                style={{ width: '45px', height: '45px', marginRight: '10px' }}
              />
              <h3 style={{ fontSize: '27px', color: 'white' }}>
                {starGadgetData['1stStarPower']}
              </h3>
            </div>
            <p style={{ fontStyle: 'italic', color: '#ccc' }}>
              {starGadgetData['1stStarPowerDescrip'] || 'No description available.'}
            </p>
          </div>
        )}
        {/* First Star Power Card */}
        {starGadgetData && starGadgetData['1stStarPower'] && (
          <div style={{
            backgroundColor: '#1c1c1c',
            padding: '30px',
            width: '400px',
            borderRadius: '15px',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
              <img
                src={`/Gadget/${brawler.Brawler}.png`}
                onError={(e) => { e.target.onerror = null; e.target.src = '/Gadget/ALLEYEZ.png'; }}
                alt="REN"
                style={{ width: '45px', height: '45px', marginRight: '10px' }}
              />
              <h3 style={{ fontSize: '27px', color: 'white' }}>
                {starGadgetData['2ndStarPower']}
              </h3>
            </div>
            <p style={{ fontStyle: 'italic', color: '#ccc' }}>
              {starGadgetData['2ndStarPowerDescrip'] || 'No description available.'}
            </p>
          </div>
        )}

      </div>
    </div>
    {/* Fixed Buttons outside scrollable container */}
    <div style={{
      position: 'absolute',
      top: '50%',
      right: '10px',
      transform: 'translateY(-50%)',
      display: 'flex',
      flexDirection: 'column',
      gap: '10px',
      zIndex: 10,
    }}>
      {/* Scroll Up Button */}
<button
  style={{
    backgroundColor: '#FFCC00',
    border: 'none',
    borderRadius: '50%',
    width: '40px',
    height: '40px',
    cursor: 'pointer',
    fontWeight: 'bold',
    fontSize: '20px',
    color: '#000',
    boxShadow: '0px 4px 8px rgba(0,0,0,0.5)',
  }}
  onClick={() => {
    const container = document.getElementById('scrollable-container');
    container.scrollTop -= 250; // <-- now 450px up
  }}
>
  ↑
</button>

{/* Scroll Down Button */}
<button
  style={{
    backgroundColor: '#FFCC00',
    border: 'none',
    borderRadius: '50%',
    width: '40px',
    height: '40px',
    cursor: 'pointer',
    fontWeight: 'bold',
    fontSize: '20px',
    color: '#000',
    boxShadow: '0px 4px 8px rgba(0,0,0,0.5)',
  }}
  onClick={() => {
    const container = document.getElementById('scrollable-container');
    container.scrollTop += 250; // <-- now 450px down
  }}
>
  ↓
</button>

    </div>
  </div>
</div>
</div>
    </div>
    
  );
}

function Stat({ title, value, color }) {
  return (
    <div style={{ textAlign: 'center', margin: '10px 20px' }}>
      <div style={{ fontSize: '18px', marginBottom: '8px' }}>{title}</div>
      <div style={{ fontSize: '26px', fontWeight: 'bold', color: color || 'white' }}>{value}</div>
    </div>
  );
}

function formatNumber(num) {
  if (num >= 1e6) return (num / 1e6).toFixed(1) + 'm';
  if (num >= 1e3) return (num / 1e3).toFixed(1) + 'k';
  return num;
}

export default BrawlerDetail;
