import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./HomePage.css";

function HomePage() {
  const navigate = useNavigate();
  const username = "Brawler";
  const [activeIndex, setActiveIndex] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);

  const brawlers = [
    { id: 1, name: "NAPAGALITAN NG NANAY NI KINN", image: "/images/leee.jpg" },
    { id: 2, name: "TINGININGINING", image: "/images/james.jpg" },
    { id: 3, name: "MAMA'S BOY", image: "/images/kinn.jpg" },
    { id: 4, name: "TIGER KAMOTE", image: "/images/eyyy.jpg" },
    { id: 5, name: "CHINESE", image: "/images/edd.jpg" },
    { id: 6, name: "VOTE BUYER", image: "/images/Argie.jpg" },
    { id: 7, name: "PINAGALITAN NG NANAY", image: "/images/Karlito.jpg" },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prevIndex) => (prevIndex + 1) % brawlers.length);
    }, 3000);
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 300);

    // IMPORTANT: Enable scrolling on body
    document.body.style.overflow = "auto";
    document.body.style.height = "auto";

    return () => {
      clearInterval(interval);
      clearTimeout(timer);

      // Reset styles when leaving component
      document.body.style.overflow = "";
      document.body.style.height = "";
    };
  }, [brawlers.length]);

  const handleCarouselNav = (index) => {
    setActiveIndex(index);
  };

  const handleMatchPredictionsClick = () => {
    navigate("/team-composition");
  };

  const gotoBrawlerList = () => {
    navigate("/brawler");
  };

  const gotoMapDetails = () => {
    navigate("/map-show");
  };

  const getCarouselItemClass = (index) => {
    const diff = (brawlers.length + (index - activeIndex)) % brawlers.length;
    if (diff === 0) return "carousel-item active";
    if (diff === 1) return "carousel-item next";
    if (diff === 2) return "carousel-item far-next";
    if (diff === brawlers.length - 1) return "carousel-item prev";
    if (diff === brawlers.length - 2) return "carousel-item far-prev";
    return "carousel-item hidden";
  };

  return (
    <div className={`brawl-home-container ${isLoaded ? 'loaded' : ''}`} style={{ overflowY: 'auto', maxHeight: '100vh' }}>
      <div className="stars-container">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="star"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
            }}
          />
        ))}
      </div>

      <div className="brawl-header">
        <div className="brawl-logo">
        <img src="/public/james.jpg" alt="Brawl Logo" style={{ width: '100%', height: 'auto', borderRadius: '50%' }} />
          <div className="logo-text">Smart Brawl</div>
        </div>
        <div className="brawl-nav-buttons">
          <button className="brawl-nav-button" onClick={handleMatchPredictionsClick}>
            PREDICT MATCH
          </button>
          <button className="brawl-nav-button" onClick={gotoMapDetails}>
            MAP OVERVIEW
          </button>
          <button className="brawl-nav-button" onClick={gotoBrawlerList}>
            ALL BRAWLERS
          </button>
        </div>
        
      </div>

      <div className="ai-assistant-container">
        <button className="ai-assistant-button" onClick={() => navigate("/lumina")}>
          <span className="ai-icon">./.</span>
          <span> </span>
        </button>
      </div>

      <div className="brawl-welcome-banner">
        <h2 className="welcome-title">
          WELCOME, <span className="brawl-highlight">{username.toUpperCase()}</span>!
        </h2>
        <p className="welcome-subtitle">Ready to predict your next Brawl Stars victory?</p>
      </div>

      <div className="carousel-container">
        <h3 className="carousel-title">FEATURED BRAWLERS</h3>
        <div className="carousel-wrapper">
          <div className="carousel">
            {brawlers.map((brawler, index) => (
              <div
                key={brawler.id}
                className={getCarouselItemClass(index)}
                onClick={() => handleCarouselNav(index)}
              >
                <div className="carousel-card">
                  <img src={brawler.image} alt={brawler.name} />
                  <div className="carousel-card-content">
                    <h4>{brawler.name}</h4>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="carousel-dots">
          {brawlers.map((_, index) => (
            <span
              key={index}
              className={`carousel-dot ${index === activeIndex ? 'active' : ''}`}
              onClick={() => handleCarouselNav(index)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default HomePage;
