// ExoPlanet.js
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import starsData from '../data/dados_exoplanetas.json';

const ExoPlanet = () => {
  const { name } = useParams();

  // Filtra todas as entradas que correspondem ao hostname
  const starEntries = starsData.filter(star => star.hostname === name);

  if (starEntries.length === 0) {
    return <div className="text-center text-red-500 mt-10">Estrela não encontrada.</div>;
  }

  // Obtém os dados da estrela (assumindo que são iguais em todas as entradas)
  const starData = starEntries[0];

  // Extrai os exoplanetas associados
  const planets = starEntries.map(entry => ({
    id: entry.id, // Usando 'id' como identificador único do exoplaneta
    name: entry.pl_name,
    mass: entry.pl_bmassj || 'Desconhecida', // Massa em massas de Júpiter
    radius: entry.pl_rade || 'Desconhecido', // Raio em raios de Júpiter
    orbitalPeriod: entry.pl_orbper || 'Desconhecido', // Período orbital em dias
  }));

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Detalhes da Estrela: {name}</h1>
      <div className="bg-gray-100 p-6 rounded-lg shadow-md mb-8">
        <p><span className="font-semibold">Temperatura Efetiva:</span> {starData.st_teff || 'Desconhecida'} K</p>
        <p><span className="font-semibold">Massa:</span> {starData.st_mass || 'Desconhecida'} Massas Solares</p>
        <p><span className="font-semibold">Raio:</span> {starData.st_rad || 'Desconhecido'} Raios Solares</p>
        <p><span className="font-semibold">Metalicidade:</span> {starData.st_met || 'Desconhecida'}</p>
        <p><span className="font-semibold">RA:</span> {starData.ra || 'Desconhecido'} graus</p>
        <p><span className="font-semibold">DEC:</span> {starData.dec || 'Desconhecido'} graus</p>
        <p><span className="font-semibold">Distância:</span> {starData.sy_dist || 'Desconhecida'} parsecs</p>
      </div>

      <h2 className="text-2xl font-semibold mb-4">Exoplanetas Associados</h2>
      {planets.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {planets.map((planet) => (
            <div key={planet.id} className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-bold mb-2">{planet.name}</h3>
              <p><span className="font-semibold">Massa:</span> {planet.mass} M<sub>Júpiter</sub></p>
              <p><span className="font-semibold">Raio:</span> {planet.radius} R<sub>Júpiter</sub></p>
              <p><span className="font-semibold">Período Orbital:</span> {planet.orbitalPeriod} dias</p>
              <Link to={`/exoplanet/${planet.id}`}>
                <button className="mt-4 w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">
                  Visitar Exoplaneta
                </button>
              </Link>
            </div>
          ))}
        </div>
      ) : (
        <p>Nenhum exoplaneta associado encontrado.</p>
      )}
    </div>
  );
};

export default ExoPlanet;
