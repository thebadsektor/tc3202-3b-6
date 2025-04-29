import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./HomePage.css";

function HomePage() {
  const navigate = useNavigate();
  const username = "Brawler";

  const handleMatchPredictionsClick = () => navigate("/team-composition");
  const goToPrediction = () => navigate("/predict");
  const gotoBrawlerList = () => navigate("/brawler-list");

  const [showChat, setShowChat] = useState(false);
  const [userInput, setUserInput] = useState("");
  const [chatHistory, setChatHistory] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const sendMessage = async () => {
    if (!userInput.trim()) return;

    const newMessage = { role: "user", content: userInput };
    setChatHistory((prev) => [...prev, newMessage]);
    setUserInput("");

    setIsLoading(true);
    try {
      const res = await fetch("http://localhost:5000/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: userInput }),
      });

      const data = await res.json();
      const botMessage = { role: "bot", content: data.response };

      setChatHistory((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error("Chatbot error:", error);
      const errorMessage = { role: "bot", content: "Sorry, something went wrong. 😞" };
      setChatHistory((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="brawl-home-container">
      {/* Header */}
      <div className="brawl-header">
        <div className="brawl-logo-small">
          <div className="brawl-skull-small"></div>
        </div>
        <h1 className="brawl-title">SMART BRAWL</h1>
        <div className="brawl-user-info">
          <div className="brawl-avatar">
            <div className="brawl-avatar-inner"></div>
          </div>
          <span className="brawl-username">{username}</span>
        </div>
      </div>

      {/* Search */}
      <div className="brawl-search-container">
        <input
          type="text"
          className="brawl-search-input"
          placeholder="Search for brawlers, maps, or strategies..."
        />
        <button className="brawl-search-btn">SEARCH</button>
      </div>

      {/* Welcome */}
      <div className="brawl-welcome-banner">
        <h2>
          WELCOME, <span className="brawl-highlight">{username.toUpperCase()}</span>!
        </h2>
        <p>Ready to predict your next Brawl Stars victory?</p>
      </div>

      {/* Featured Gameplay */}
      <div className="brawl-gameplay-showcase">
        <h3>FEATURED GAMEPLAY</h3>
        <div className="brawl-gameplay-image">
          <img src="/images/brawl.jpg" alt="Brawl Stars Gameplay" />
          <div className="brawl-gameplay-caption">
            Exciting Brawl Stars Battle Arena
          </div>
        </div>
      </div>

      {/* Chat Bubble */}
      <div className="chat-bubble" onClick={() => setShowChat(!showChat)}>
        💬
      </div>

      {/* Chat Window */}
      {showChat && (
        <div className="chat-window">
          <div className="chat-header">
            <h4>Ask Smart Brawl 🤖</h4>
            <button className="chat-close-btn" onClick={() => setShowChat(false)}>✖</button>
          </div>

          <div className="chat-messages-container">
            {chatHistory.length === 0 ? (
              <div className="chat-empty-state">
                Ask anything about Brawl Stars strategies, brawlers, or game mechanics!
              </div>
            ) : (
              chatHistory.map((msg, index) => (
                <div key={index} className={`chat-message-wrapper ${msg.role}-wrapper`}>
                  <div className={`chat-message ${msg.role}-message`}>
                    {msg.role === "user" ? (
                      <div className="message-content user-content">{msg.content}</div>
                    ) : (
                      <div className="message-content bot-content">{msg.content}</div>
                    )}
                  </div>
                </div>
              ))
            )}
            
            {isLoading && (
              <div className="chat-message-wrapper bot-wrapper">
                <div className="chat-message bot-message">
                  <div className="message-content bot-content">
                    <div className="typing-indicator">
                      <span></span>
                      <span></span>
                      <span></span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="chat-input-container">
            <input
              type="text"
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              placeholder="Type your message..."
              className="chat-input"
              onKeyDown={(e) => { if (e.key === "Enter") sendMessage(); }}
              disabled={isLoading}
            />
            <button onClick={sendMessage} className="chat-send-button" disabled={isLoading}>
              Send
            </button>
          </div>
        </div>
      )}

      {/* Features */}
      <div className="brawl-features">
        <div className="brawl-feature-card" onClick={handleMatchPredictionsClick}>
          <div className="brawl-feature-icon prediction"></div>
          <h4>MATCH PREDICTIONS</h4>
          <p>Analyze and predict your gameplay outcomes</p>
        </div>
        <div className="brawl-feature-card" onClick={goToPrediction}>
          <div className="brawl-feature-icon strategy"></div>
          <h4>MATCH PREDICTIONS 2</h4>
          <p>Predict your gameplay outcomes 2.0</p>
        </div>
        <div className="brawl-feature-card" onClick={gotoBrawlerList}>
          <div className="brawl-feature-icon stats"></div>
          <h4>Brawlers</h4>
          <p>Brawlers Winrate and Information</p>
        </div>
      </div>
    </div>
  );
}

export default HomePage;