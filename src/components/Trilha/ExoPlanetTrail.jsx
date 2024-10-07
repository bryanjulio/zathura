// src/components/ExoPlanet.jsx

import React from 'react';
import { useParams } from 'react-router-dom';
import exoplanets from '../data/trilhaA'; // Adjust the path as necessary

const ExoPlanetTrail = () => {
  const { id } = useParams();
  const planet = exoplanets.find((p) => p.id === parseInt(id));

  if (!planet) {
    return <div>Exoplanet not found.</div>;
  }

  return (
    <div className="exoplanet-details">
      <h1>{planet.pl_name}</h1>
      <p>Host Star: {planet.hostname}</p>
      <p>Orbital Radius: {planet.pl_orbsmax} AU</p>
      <p>Mass: {planet.pl_bmasse} Earth Masses</p>
      {/* Add more details as needed */}
    </div>
  );
};

export default ExoPlanetTrail;
