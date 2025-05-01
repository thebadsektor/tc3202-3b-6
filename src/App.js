import React from "react";
import { BrowserRouter as Router, Routes, Route,} from "react-router-dom";
import HomePage from "./pages/HomePage";
import TeamCompositionPage from "./pages/TeamCompositionPage";
import PredictionPage from './pages/PredictionPage';
import BrawlerList from './pages/BrawlerList';
import BrawlerDetail from "./pages/BrawlerDetail";
import LuminaPage from "./pages/LuminaPage";
import PredictPage from "./pages/PredictPage";
import IntroPage from "./pages/IntroPage";
import GetStartedPage from "./pages/GetStartedPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<GetStartedPage />} />
        <Route path="/intro" element={<IntroPage />} />
        <Route path="/predict" element={<PredictPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/team-composition" element={<TeamCompositionPage />} />
        <Route path="/predict" element={<PredictionPage />} />
        <Route path="/brawler-list" element={<BrawlerList />} />
        <Route path="/brawler/:name" element={<BrawlerDetail />} />
        <Route path="/lumina" element={<LuminaPage />} /> 
      </Routes>
    </Router>
  );
}

export default App;
