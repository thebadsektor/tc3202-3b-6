import React from "react";
import { BrowserRouter as Router, Routes, Route,} from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import TeamCompositionPage from "./pages/TeamCompositionPage";
import PredictionPage from './pages/PredictionPage';
import BrawlerDetail from './pages/BrawlerDetail';
import BrawlerTable from "./pages/BrawlerTable";
import LuminaPage from "./pages/LuminaPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/team-composition" element={<TeamCompositionPage />} />
        <Route path="/predict" element={<PredictionPage />} />
        <Route path="/brawler/:name" element={<BrawlerDetail />} />
        <Route path="/brawler" element={<BrawlerTable />} />
        <Route path="/lumina" element={<LuminaPage />} /> 
      </Routes>
    </Router>
  );
}

export default App;
