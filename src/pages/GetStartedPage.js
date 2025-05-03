import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./GetStartedPage.css";

function GetStartedPage() {
  const navigate = useNavigate();
  const [animate, setAnimate] = useState(false);
  const [loaded, setLoaded] = useState(false);

  // Create particles for background effect
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

    // Create particles
    const totalParticles = 20;
    for (let i = 0; i < totalParticles; i++) {
      createParticle(particlesContainer, i);
    }

    // Create star decorations
    const totalStars = 30;
    for (let i = 0; i < totalStars; i++) {
      createStar(i);
    }

    // Function to create a star decoration
    function createStar(index) {
      const star = document.createElement('div');
      star.className = 'star-decoration';
      
      // Random properties
      const size = Math.random() * 4 + 2;
      const posX = Math.random() * 100;
      const posY = Math.random() * 100;
      const delay = Math.random() * 10;
      const duration = Math.random() * 6 + 4;
      
      // Set CSS properties
      star.style.width = `${size}px`;
      star.style.height = `${size}px`;
      star.style.left = `${posX}%`;
      star.style.top = `${posY}%`;
      
      // Set animation
      star.style.animation = `twinkle ${duration}s ease-in-out ${delay}s infinite`;
      
      // Add to container
      document.querySelector('.brawl-login-container').appendChild(star);
    }

    // Function to create a single animated particle
    function createParticle(container, index) {
      const particle = document.createElement('div');
      particle.className = 'particle';
      
      // Random properties
      const size = Math.random() * 15 + 5;
      const posX = Math.random() * 100;
      const delay = Math.random() * 15;
      const duration = Math.random() * 10 + 15;
      const opacity = Math.random() * 0.3 + 0.1;
      
      // Set CSS properties
      particle.style.width = `${size}px`;
      particle.style.height = `${size}px`;
      particle.style.left = `${posX}%`;
      particle.style.bottom = `-${size}px`;
      particle.style.setProperty('--particle-opacity', opacity);
      
      // Set animation
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
      if (particlesContainer.parentNode) {
        particlesContainer.parentNode.removeChild(particlesContainer);
      }
      
      // Remove decorations, stars, and logo container
      document.querySelectorAll('.brawl-decoration, .star-decoration, .brawl-logo-container').forEach(el => {
        if (el.parentNode) {
          el.parentNode.removeChild(el);
        }
      });
    };
  }, []);

  const handleStart = () => {
    setAnimate(true);

    // Play button press sound if available
    // const buttonSound = new Audio('/sounds/button-press.mp3');
    // buttonSound.play().catch(e => console.log('Sound play prevented'));

    // Delay navigation to allow animation to play
    setTimeout(() => {
      navigate("/intro");
    }, 800); // match animation duration
  };

  return (
    <div className={`brawl-login-container ${animate ? "fade-out" : ""} ${loaded ? "page-enter" : ""}`}>
      <div className="brawl-background"></div>

      <div className="brawl-form-wrapper">
        <div className="brawl-form-container">
          <h1 className="brawl-login-title">Welcome to Smart Brawl</h1>
          
          <div className="tagline-container">
            <p className="brawl-tagline">
              Unleash the power of Karl to make pervert all the human AI to predict winning team compositions and explore every brawler in depth — your ultimate companion for dominating the arena.
            </p>
          </div>

          <button
            className={`brawl-login-button ${animate ? "button-pressed" : ""}`}
            onClick={handleStart}
            disabled={animate}
          >
            Get Started
          </button>
        </div>
      </div>
    </div>
  );
}

export default GetStartedPage;