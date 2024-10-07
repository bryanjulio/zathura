// src/components/Trilha/TrailList.jsx

import React from 'react';
import TrailCard from './TrailCard';
import exoplanets from '../../data/trilhaA'; // Adjust the path as necessary

const TrailList = () => {
  return (
    <div className="trail-list">
      {exoplanets.map((planet) => (
        <TrailCard key={planet.id} exoplanet={planet} />
      ))}
    </div>
  );
};

export default TrailList;
