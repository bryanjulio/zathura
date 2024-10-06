import React, { createContext, useState, useContext, useCallback } from 'react';
import { Line } from '@react-three/drei';

const TrailContext = createContext();

export const useTrails = () => useContext(TrailContext);

export const TrailProvider = ({ children }) => {
  const [trails, setTrails] = useState({});
  const MAX_TRAIL_AGE = 20000; // Maximum age of trail points in milliseconds

  const addTrailPoint = useCallback((key, position) => {
    setTrails((prevTrails) => {
      const now = Date.now();
      const trail = prevTrails[key] || [];
      const newTrail = trail
        // Remove points older than MAX_TRAIL_AGE
        .filter((point) => now - point.timestamp < MAX_TRAIL_AGE)
        // Limit the trail length to the most recent 300 points
        .slice(-300);
      const lastPoint = newTrail[newTrail.length - 1];
      if (
        !lastPoint ||
        lastPoint.position.distanceToSquared(position) > 1
      ) {
        return {
          ...prevTrails,
          [key]: [
            ...newTrail,
            { position: position.clone(), timestamp: now },
          ],
        };
      }
      return prevTrails;
    });
  }, []);

  const clearTrail = useCallback((key) => {
    setTrails((prevTrails) => {
      const { [key]: _, ...rest } = prevTrails;
      return rest;
    });
  }, []);

  return (
    <TrailContext.Provider value={{ addTrailPoint, clearTrail }}>
      {children}
      {Object.entries(trails).map(([key, trailPoints]) => (
        <Line
          key={key}
          points={trailPoints.map((point) => point.position)}
          color="rgba(30,30,30)"
        />
      ))}
    </TrailContext.Provider>
  );
};
