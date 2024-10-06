import { Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home.jsx';
import About from './pages/About.jsx';
import NotFound from './pages/NotFound.jsx';
import HWO from './components/HWO';
import ExoPlanet from './components/ExoPlanet.jsx';
import './App.css';

function App() {
  return (
    <div>
      <div className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/hwo" element={<HWO />} />
          <Route path="/hwo/:name" element={<ExoPlanet />} />
          <Route path="/about" element={<About />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
