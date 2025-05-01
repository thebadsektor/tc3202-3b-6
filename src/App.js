import React from "react";
import { BrowserRouter as Router, Routes, Route,} from "react-router-dom";
import HomePage from "./pages/HomePage";
import TeamCompositionPage from "./pages/TeamCompositionPage";
import PredictionPage from './pages/PredictionPage';
import BrawlerDetail from './pages/BrawlerDetail';
import BrawlerTable from "./pages/BrawlerTable";
import LuminaPage from "./pages/LuminaPage";
import PredictPage from "./pages/PredictPage";
import IntroPage from "./pages/IntroPage";
import GetStartedPage from "./pages/GetStartedPage";

function App() {
  return (
    <Router>
      <Routes>
<<<<<<< HEAD
        <Route path="/" element={<LoginPage />} />
=======
        <Route path="/" element={<GetStartedPage />} />
        <Route path="/intro" element={<IntroPage />} />
        <Route path="/predict" element={<PredictPage />} />
>>>>>>> 33b576dd8a36c6c1336e9fa363085c5c648984a4
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
