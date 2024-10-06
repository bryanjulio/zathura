// App.jsx
import { Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home.jsx';
import About from './pages/About.jsx';
import NotFound from './pages/NotFound.jsx';
import './App.css'; // Certifique-se de importar o CSS

function App() {
  return (
    <div>
      <nav>
        <ul>
          <li><Link to="/">Home</Link></li> {/* Link para a rota Home */}
          <li><Link to="/about">About</Link></li> {/* Link para a rota About */}
        </ul>
      </nav>
      
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
