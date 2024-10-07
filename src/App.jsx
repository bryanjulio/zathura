// src/App.js

import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home.jsx';
import About from './pages/About.jsx';
import NotFound from './pages/NotFound.jsx';
import AppExoplanet from './components/Exoplaneta/SceneExoplaneta.jsx';
import HWO from './components/HWO';
import ExoPlanet from './components/ExoPlanet.jsx';
import TrailList from './components/Trilha/TrailList.jsx'; // Import the TrailList
import './App.css';

function App() {
  return (
    <div>
      <div className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/hwo" element={<HWO />} />
          <Route path="/hwo/:name" element={<ExoPlanet />} />
          <Route path="/exoplanet/:id" element={<AppExoplanet />} /> 
          <Route path="/trail-card" element={<TrailList />} /> {/* Update this route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
