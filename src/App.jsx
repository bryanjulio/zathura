// App.jsx
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home.jsx';
import About from './pages/About.jsx';
import NotFound from './pages/NotFound.jsx';
import './App.css'; // Certifique-se de importar o CSS

function App() {
  return (
    <div>
      <div className="main-content">
        <Routes>
          <Route path="/" element={<Home />} /> {/* Rota Home */}
          <Route path="/about" element={<About />} /> {/* Rota About */}
          <Route path="*" element={<NotFound />} /> {/* Rota para páginas não encontradas */}
        </Routes>
      </div>
    </div>
  );
}

export default App;
