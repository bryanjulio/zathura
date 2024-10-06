// src/Exoplanet.jsx

import  { useMemo } from 'react';
import { useTexture } from '@react-three/drei';
import { Color } from 'three';

function Exoplanet() {
  const texture = useTexture('/textures/planet.jpg'); // Certifique-se de ter essa textura no caminho correto

  // Gera uma cor randômica usando useMemo para memoizar o valor
  const color = useMemo(() => {
    // Gera um matiz aleatório entre 0 e 360
    const hue = Math.random() * 360;
    // Define saturação e luminosidade fixas ou randômicas, se desejar
    const saturation = 50 + Math.random() * 50; // Entre 50% e 100%
    const lightness = 50 + Math.random() * 10;  // Entre 50% e 60%

    // Cria a cor em formato HSL e converte para o objeto Color do Three.js
    const hslColor = `hsl(${hue}, ${saturation}%, ${lightness}%)`;
    return new Color(hslColor);
  }, []); // O array vazio [] garante que o valor seja memoizado

  return (
    <mesh>
      <sphereGeometry args={[2, 64, 64]} />
      <meshStandardMaterial map={texture} color={color} />
    </mesh>
  );
}

export default Exoplanet;
