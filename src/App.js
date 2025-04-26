import React from "react";
import { BrowserRouter as Router, Routes, Route,} from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import SignupPage from "./pages/SignupPage ";
import TeamCompositionPage from "./pages/TeamCompositionPage";
import PredictionPage from './pages/PredictionPage';
import BrawlerList from './pages/BrawlerList';
import BrawlerDetail from "./pages/BrawlerDetail";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/team-composition" element={<TeamCompositionPage />} />
        <Route path="/predict" element={<PredictionPage />} />
        <Route path="/brawler-list" element={<BrawlerList />} />
        <Route path="/brawler/:name" element={<BrawlerDetail />} />
      </Routes>
    </Router>
  );
}

export default App;
