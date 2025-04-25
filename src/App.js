import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import SignupPage from "./pages/SignupPage ";
import TeamCompositionPage from "./pages/TeamCompositionPage";
import PredictionPage from './pages/PredictionPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/team-composition" element={<TeamCompositionPage />} />
        <Route path="/predict" element={<PredictionPage />} />
      </Routes>
    </Router>
  );
}

export default App;
