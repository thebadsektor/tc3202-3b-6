import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "./GetStartedPage.css";

function GetStartedPage() {
  const navigate = useNavigate();
  const [animate, setAnimate] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const buttonRef = useRef(null);
  const containerRef = useRef(null);

  // Create enhanced particles and stars for background effect
  useEffect(() => {
    // Wait for initial page load
    setTimeout(() => {
      setLoaded(true);
    }, 100);

    // Add logo and website name
    const logoContainer = document.createElement('div');
    logoContainer.className = 'brawl-logo-container';
    
    const logo = document.createElement('img');
    logo.src = '/images/logo.png';
    logo.alt = 'Smart Brawl Logo';
    logo.className = 'brawl-logo';
    
    const websiteName = document.createElement('div');
    websiteName.className = 'brawl-website-name';
    websiteName.innerText = 'Smart Brawl';
    
    logoContainer.appendChild(logo);
    logoContainer.appendChild(websiteName);
    document.querySelector('.brawl-login-container').appendChild(logoContainer);

    // Create and animate particles
    const particlesContainer = document.createElement('div');
    particlesContainer.className = 'particles';
    document.querySelector('.brawl-login-container').appendChild(particlesContainer);

    // Create enhanced particles - increased count for more visual impact
    const totalParticles = 40;
    for (let i = 0; i < totalParticles; i++) {
      createParticle(particlesContainer, i);
    }

    // Create enhanced star decorations - increased count for more visual impact
    const totalStars = 50;
    for (let i = 0; i < totalStars; i++) {
      createStar(i);
    }

    // Create shooting stars
    const shootingStarsInterval = setInterval(() => {
      createShootingStar();
    }, 3000);

    // Function to create a shooting star
    function createShootingStar() {
      const shootingStar = document.createElement('div');
      shootingStar.className = 'shooting-star';
      
      // Random properties
      const posY = Math.random() * 60 + 5; // Keep in top 70% of screen
      const posX = Math.random() * 30; // Start from left 30% of screen
      const length = Math.random() * 100 + 50; // Length of shooting star
      const angle = Math.random() * 20 - 10; // Angle variation
      const distance = Math.random() * 120 + 80; // Distance to travel
      const duration = Math.random() * 2 + 2; // Animation duration
      const delay = Math.random() * 5; // Delay before animation
      const riseFactor = Math.random() * 0.4 - 0.2; // How much it rises/falls
      
      // Set CSS properties and custom properties for animation
      shootingStar.style.top = `${posY}%`;
      shootingStar.style.left = `${posX}%`;
      shootingStar.style.setProperty('--length', `${length}px`);
      shootingStar.style.setProperty('--angle', `${angle}deg`);
      shootingStar.style.setProperty('--distance', `${distance}vw`);
      shootingStar.style.setProperty('--rise-factor', riseFactor);
      
      // Set animation
      shootingStar.style.animation = `shootingStar ${duration}s linear ${delay}s`;
      
      // Add to container
      document.querySelector('.brawl-login-container').appendChild(shootingStar);
      
      // Remove after animation completes
      setTimeout(() => {
        if (shootingStar.parentNode) {
          shootingStar.parentNode.removeChild(shootingStar);
        }
      }, (duration + delay) * 1000 + 100);
    }

    // Function to create an enhanced star decoration with varied animations
    function createStar(index) {
      const star = document.createElement('div');
      star.className = 'star-decoration';
      
      // Random properties
      const size = Math.random() * 5 + 1;
      const posX = Math.random() * 100;
      const posY = Math.random() * 100;
      const delay = Math.random() * 10;
      const duration = Math.random() * 6 + 4;
      
      // Set CSS properties
      star.style.width = `${size}px`;
      star.style.height = `${size}px`;
      star.style.left = `${posX}%`;
      star.style.top = `${posY}%`;
      
      // Set different animation types for variety
      const animationType = index % 3;
      if (animationType === 0) {
        star.style.animation = `twinkle ${duration}s ease-in-out ${delay}s infinite`;
      } else if (animationType === 1) {
        star.style.animation = `twinkleAlt ${duration * 0.7}s ease-in-out ${delay}s infinite`;
      } else {
        star.style.animation = `twinklePulse ${duration * 0.85}s ease-in-out ${delay}s infinite`;
        star.style.color = index % 4 === 0 ? 'rgba(135, 206, 250, 0.8)' : 
                         index % 4 === 1 ? 'rgba(255, 215, 0, 0.8)' : 
                         index % 4 === 2 ? 'rgba(255, 182, 193, 0.8)' : 
                         'rgba(255, 255, 255, 0.8)';
      }
      
      // Add to container
      document.querySelector('.brawl-login-container').appendChild(star);
    }

    // Function to create an enhanced animated particle
    function createParticle(container, index) {
      const particle = document.createElement('div');
      particle.className = 'particle';
      
      // More varied random properties
      const size = Math.random() * 20 + 5;
      const posX = Math.random() * 100;
      const delay = Math.random() * 15;
      const duration = Math.random() * 15 + 15;
      const opacity = Math.random() * 0.5 + 0.2;
      const driftX = Math.random() * 200 - 100; // Random horizontal drift
      const rotation = Math.random() * 360; // Random rotation
      
      // Set CSS properties
      particle.style.width = `${size}px`;
      particle.style.height = `${size}px`;
      particle.style.left = `${posX}%`;
      particle.style.bottom = `-${size}px`;
      particle.style.setProperty('--particle-opacity', opacity);
      particle.style.setProperty('--drift-x', `${driftX}px`);
      particle.style.setProperty('--rotation', `${rotation}deg`);
      
      // Set animation with more randomness for natural effect
      particle.style.animation = `floatUp ${duration}s ease-in-out ${delay}s infinite`;
      
      // Add to container
      container.appendChild(particle);
    }

    // Add enhanced decorative elements with more character silhouettes
    const decorations = [
      { className: 'deco-1', style: { top: '15%', right: '12%', transform: 'rotate(15deg)' } },
      { className: 'deco-2', style: { bottom: '10%', right: '20%', transform: 'rotate(-8deg)' } },
      { className: 'deco-3', style: { top: '25%', left: '10%', transform: 'rotate(5deg)' } },
      { className: 'deco-4', style: { bottom: '20%', left: '15%', transform: 'rotate(-12deg)' } },
      { className: 'deco-5', style: { top: '40%', right: '8%', transform: 'rotate(10deg)' } }
    ];

    decorations.forEach(deco => {
      const element = document.createElement('div');
      element.className = `brawl-decoration ${deco.className}`;
      Object.assign(element.style, deco.style);
      element.style.setProperty('--rotate', deco.style.transform);
      document.querySelector('.brawl-login-container').appendChild(element);
    });

    // Cleanup function
    return () => {
      clearInterval(shootingStarsInterval);
      
      if (particlesContainer.parentNode) {
        particlesContainer.parentNode.removeChild(particlesContainer);
      }
      
      // Remove all created elements
      document.querySelectorAll('.brawl-decoration, .star-decoration, .brawl-logo-container, .shooting-star').forEach(el => {
        if (el.parentNode) {
          el.parentNode.removeChild(el);
        }
      });
    };
  }, []);

  // Create transition particles effect
  const createTransitionParticles = () => {
    const transitionParticles = document.createElement('div');
    transitionParticles.className = 'transition-particles';
    document.body.appendChild(transitionParticles);

    // Create centered burst effect from button location
    if (buttonRef.current) {
      const buttonRect = buttonRef.current.getBoundingClientRect();
      const centerX = buttonRect.left + buttonRect.width / 2;
      const centerY = buttonRect.top + buttonRect.height / 2;

      // Create multiple particles emanating from button
      for (let i = 0; i < 50; i++) {
        const particle = document.createElement('div');
        particle.className = 'transition-particle';
        
        // Random size and direction
        const size = Math.random() * 30 + 10;
        const angle = Math.random() * Math.PI * 2;
        const distance = Math.random() * 100 + 100;
        const x = Math.cos(angle) * distance;
        const y = Math.sin(angle) * distance;
        const speed = Math.random() * 0.5 + 0.5;
        
        // Set properties
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        particle.style.left = `${centerX}px`;
        particle.style.top = `${centerY}px`;
        particle.style.setProperty('--x', `${x}px`);
        particle.style.setProperty('--y', `${y}px`);
        particle.style.animationDuration = `${speed}s`;
        
        // Add color variation
        const colorTypes = ['rgba(245, 115, 40, 0.8)', 'rgba(58, 147, 209, 0.8)', 'rgba(252, 191, 41, 0.8)'];
        const colorIndex = i % colorTypes.length;
        particle.style.background = `radial-gradient(circle, ${colorTypes[colorIndex]} 0%, rgba(255,255,255,0) 70%)`;
        
        transitionParticles.appendChild(particle);
      }
    }

    // Create flash overlay
    const flashOverlay = document.createElement('div');
    flashOverlay.className = 'flash-overlay';
    document.body.appendChild(flashOverlay);

    // Clean up after animation completes
    setTimeout(() => {
      if (transitionParticles.parentNode) {
        transitionParticles.parentNode.removeChild(transitionParticles);
      }
      if (flashOverlay.parentNode) {
        flashOverlay.parentNode.removeChild(flashOverlay);
      }
    }, 1500);
  };

  const handleStart = () => {
    setAnimate(true);
    
    // Add click ripple effect
    if (buttonRef.current) {
      buttonRef.current.classList.add('button-click-effect');
    }
    
    // Add exit animation to page
    if (containerRef.current) {
      containerRef.current.classList.add('page-exit');
    }
    
    // Create transition particles effect
    createTransitionParticles();

    // Try to play button press sound if available
    try {
      const buttonSound = new Audio('/sounds/button-press.mp3');
      buttonSound.volume = 0.7; // Set volume to 70%
      buttonSound.play().catch(e => console.log('Sound play prevented'));
    } catch (e) {
      console.log('Sound play error:', e);
    }

    // Delay navigation to allow animation to play
    setTimeout(() => {
      // Store transition state to trigger entrance animation on next page
      sessionStorage.setItem('pageTransitioning', 'true');
      navigate("/intro");
    }, 800); // match animation duration
  };

  return (
    <div 
      ref={containerRef}
      className={`brawl-login-container ${animate ? "fade-out" : ""} ${loaded ? "page-enter" : ""}`}
    >
      <div className="brawl-background"></div>

      <div className="brawl-form-wrapper">
        <div className="brawl-form-container">
          <h1 className="brawl-login-title">Welcome to Smart Brawl</h1>
          
          <div className="tagline-container">
            <p className="brawl-tagline">
              Unleash the AI to predict winning team compositions and explore every brawler in depth — your ultimate companion for dominating the arena.
            </p>
          </div>

          <button
            ref={buttonRef}
            className={`brawl-login-button ${animate ? "button-pressed" : ""}`}
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

export default GetStartedPage;