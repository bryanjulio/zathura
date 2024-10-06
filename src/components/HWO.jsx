import React from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';

import HostName from './HostName';
import Stars from './Stars'

const HWO = () => {
  return (
    <Canvas
      camera={{ position: [0, 0, 0.001], fov: 60 }}
      style={{ background: 'black', width: '100vw', height: '100vh' }}
    >
      <ambientLight intensity={0.5} />
      <OrbitControls enableZoom={false} />

      <Stars />

      <HostName />
    </Canvas>
  );
};

export default HWO;
