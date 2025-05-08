import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import TeamCompositionPage from "./pages/TeamCompositionPage";
import BrawlerDetail from './pages/BrawlerDetail';
import BrawlerTable from "./pages/BrawlerTable";
import LuminaPage from "./pages/LuminaPage";
import IntroPage from "./pages/IntroPage";
import GetStartedPage from "./pages/GetStartedPage";
import MapShowcase from './pages/MapShowcase';
import MapDetail from './pages/MapDetail';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<GetStartedPage />} />
        <Route path="/intro" element={<IntroPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/team-composition" element={<TeamCompositionPage />} />
        <Route path="/brawler/:name" element={<BrawlerDetail />} />
        <Route path="/brawler" element={<BrawlerTable />} />
        <Route path="/lumina" element={<LuminaPage />} /> 
        <Route path = "/map-show" element = { < MapShowcase /> } /> 
        <Route path = "/map/:mapName"element = { < MapDetail /> }/> 
      </Routes>
    </Router>
  );
}

export default App;