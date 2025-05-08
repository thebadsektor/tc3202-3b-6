import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./IntroPage.css";

function IntroPage() {
  const navigate = useNavigate();
  const [animate, setAnimate] = useState(false);


  // Generate random positions for floating elements
  useEffect(() => {
    // Create floating gems
    const createGems = () => {
      const battleArena = document.querySelector('.battle-arena');
      if (!battleArena) return;
      
      // Clear any existing gems
      const existingGems = battleArena.querySelectorAll('.floating-gem');
      existingGems.forEach(gem => gem.remove());
      
      // Create new gems
      for (let i = 0; i < 15; i++) {
        const gem = document.createElement('div');
        const gemTypes = ['gem-blue', 'gem-orange', 'gem-yellow'];
        const randomType = gemTypes[Math.floor(Math.random() * gemTypes.length)];
        
        gem.classList.add('floating-gem', randomType);
        
        // Random position, size and animation delay
        const posX = Math.random() * 100;
        const scale = 0.5 + Math.random() * 1.5;
        const delay = Math.random() * 15;
        const floatX = -100 + Math.random() * 200;
        
        gem.style.left = `${posX}%`;
        gem.style.transform = `rotate(45deg) scale(${scale})`;
        gem.style.animationDelay = `${delay}s`;
        gem.style.setProperty('--float-x', `${floatX}px`);
        
        battleArena.appendChild(gem);
      }
    };
    
    // Create energy orbs
    const createOrbs = () => {
      const battleArena = document.querySelector('.battle-arena');
      if (!battleArena) return;
      
      // Clear any existing orbs
      const existingOrbs = battleArena.querySelectorAll('.energy-orb');
      existingOrbs.forEach(orb => orb.remove());
      
      // Create new orbs
      for (let i = 0; i < 10; i++) {
        const orb = document.createElement('div');
        orb.classList.add('energy-orb');
        
        // Random color based on theme
        const colors = [
          'radial-gradient(circle, rgba(58, 147, 209, 0.8) 0%, rgba(58, 147, 209, 0) 70%)',
          'radial-gradient(circle, rgba(245, 115, 40, 0.8) 0%, rgba(245, 115, 40, 0) 70%)',
          'radial-gradient(circle, rgba(252, 191, 41, 0.8) 0%, rgba(252, 191, 41, 0) 70%)'
        ];
        const randomColor = colors[Math.floor(Math.random() * colors.length)];
        
        // Random position, size and animation delay
        const posX = Math.random() * 100;
        const posY = 40 + Math.random() * 50;
        const size = 20 + Math.random() * 60;
        const delay = Math.random() * 8;
        const floatX = -50 + Math.random() * 100;
        
        orb.style.background = randomColor;
        orb.style.left = `${posX}%`;
        orb.style.bottom = `${posY}%`;
        orb.style.width = `${size}px`;
        orb.style.height = `${size}px`;
        orb.style.animationDelay = `${delay}s`;
        orb.style.setProperty('--float-x', `${floatX}px`);
        
        battleArena.appendChild(orb);
      }
    };
    
    // Create battle lines
    const createBattleLines = () => {
      const battleArena = document.querySelector('.battle-arena');
      if (!battleArena) return;
      
      // Clear any existing lines
      const existingLines = battleArena.querySelectorAll('.battle-line');
      existingLines.forEach(line => line.remove());
      
      // Create new battle lines
      for (let i = 0; i < 8; i++) {
        const line = document.createElement('div');
        line.classList.add('battle-line');
        
        // Random position, rotation and animation delay
        const posX = Math.random() * 100;
        const posY = Math.random() * 100;
        const rotation = Math.random() * 360;
        const delay = Math.random() * 4;
        
        line.style.left = `${posX}%`;
        line.style.top = `${posY}%`;
        line.style.transform = `rotate(${rotation}deg)`;
        line.style.animationDelay = `${delay}s`;
        
        if (i % 3 === 0) {
          line.style.background = 'linear-gradient(to right, rgba(58, 147, 209, 0), rgba(58, 147, 209, 0.8), rgba(58, 147, 209, 0))';
        } else if (i % 3 === 1) {
          line.style.background = 'linear-gradient(to right, rgba(245, 115, 40, 0), rgba(245, 115, 40, 0.8), rgba(245, 115, 40, 0))';
        }
        
        battleArena.appendChild(line);
      }
    };
    
    // Create power cubes
    const createPowerCubes = () => {
      const battleArena = document.querySelector('.battle-arena');
      if (!battleArena) return;
      
      // Clear any existing cubes
      const existingCubes = battleArena.querySelectorAll('.power-cube');
      existingCubes.forEach(cube => cube.remove());
      
      // Create new power cubes
      for (let i = 0; i < 5; i++) {
        const cube = document.createElement('div');
        cube.classList.add('power-cube');
        
        // Random position and animation delay
        const posX = 10 + Math.random() * 80;
        const delay = Math.random() * 12;
        const rotate = Math.random() * 360;
        
        cube.style.left = `${posX}%`;
        cube.style.animationDelay = `${delay}s`;
        cube.style.transform = `rotate(${rotate}deg)`;
        
        battleArena.appendChild(cube);
      }
    };
    
    // Initialize all elements
    const initializeElements = () => {
      createGems();
      createOrbs();
      createBattleLines();
      createPowerCubes();
    };
    
    // Initial creation and setup interval for continuous animation
    initializeElements();
    const refreshInterval = setInterval(initializeElements, 20000);
    
    return () => clearInterval(refreshInterval);
  }, []);

  const handleStart = () => {
    setAnimate(true);

    // Delay navigation to allow animation to play
    setTimeout(() => {
      navigate("/home");
    }, 600); // match animation duration
  };


  return (
    <div className={`intro-container ${animate ? "fade-out" : ""}`}>
      <div className="intro-background"></div>
      
      {/* Battle arena with animated elements */}
      <div className="battle-arena">
        {/* Floating elements will be dynamically added by JavaScript */}
      </div>

    

        <div className="intro-form-wrapper">
          <div className="intro-form-container">
            <h1 className="intro-login-title">What Smart Brawl Can Do?</h1>
            <p className="intro-text1">Discover Smart Brawl's core features — from match win-rate predictions based on team comps, to an in-depth brawler database and expert recommendations for every 3v3 map.</p>

            <button
              className={`intro-login-button ${animate ? "button-pressed" : ""}`}
              onClick={handleStart}
              disabled={animate}
            >
              Next
            </button>
          </div>
        </div>
      </div>
  
  );
}

export default IntroPage;