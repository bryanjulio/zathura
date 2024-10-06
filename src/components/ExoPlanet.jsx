import React from 'react';
import { useParams } from 'react-router-dom';
import starsData from '../data/dados_exoplanetas.json';

const ExoPlanet = () => {
  const { name } = useParams();

  const starData = starsData.find(star => star.hostname === name);

  if (!starData) {
    return <div>Estrela não encontrada.</div>;
  }

  return (
    <div>
      <h1>Detalhes da Estrela: {name}</h1>
      <p>Temperatura Efetiva: {starData.st_teff} K</p>
      <p>RA: {starData.ra} graus</p>
      <p>DEC: {starData.dec} graus</p>
      <p>Distância: {starData.sy_dist} parsecs</p>
      {/* Temporario */}
    </div>
  );
};

export default ExoPlanet;
