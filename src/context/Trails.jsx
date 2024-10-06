import React, { createContext, useState, useContext, useCallback } from 'react';
import { Line } from '@react-three/drei';

const TrailContext = createContext();

export const useTrails = () => useContext(TrailContext);

export const TrailProvider = ({ children }) => {
  const [trails, setTrails] = useState({});
  const MAX_TRAIL_AGE = 8000; // Maximum age of trail points in milliseconds

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
        <TrailLine key={key} trailPoints={trailPoints} />
      ))}
    </TrailContext.Provider>
  );
};

// Comet-like Trail Line Component
const TrailLine = ({ trailPoints }) => {
  return (
    <group>
      {trailPoints.map((point, index) => {
        const size = ( index * trailPoints.length) / 50000; // Adjust size based on index
        return (
          <mesh key={index} position={point.position}>
            <sphereGeometry args={[size, 8, 8]} />
            <meshBasicMaterial color="rgba(100, 100, 100)" />
          </mesh>
        );
      })}
    </group>
  );
};