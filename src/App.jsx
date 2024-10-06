// App.jsx
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home.jsx';
import About from './pages/About.jsx';
import NotFound from './pages/NotFound.jsx';
import AppExoplanet from './components/Exoplaneta/SceneExoplaneta.jsx';
import './App.css';

function App() {
  return (
    <div>
      <div className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/exoplanet/:id" element={<AppExoplanet />} /> {/* Rota com parâmetro */}
          <Route path="/about" element={<About />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
