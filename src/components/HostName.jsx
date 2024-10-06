// src/components/HostName.jsx

import React, { useMemo, useState } from 'react';
import { useLoader } from '@react-three/fiber';
import { useNavigate } from 'react-router-dom';
import * as THREE from 'three';
import { Html } from '@react-three/drei'; // Importa o Html
import starsData from '../data/dados_exoplanetas.json';

const HostName = () => {
  const navigate = useNavigate();
  const [hoveredStar, setHoveredStar] = useState(null); // Estado para a estrela hovereda

  // Carrega as texturas
  const textures = useMemo(
    () => ({
      star1: new THREE.TextureLoader().load('/textures/star1.svg'),
      star2: new THREE.TextureLoader().load('/textures/star2.svg'),
      star3: new THREE.TextureLoader().load('/textures/star3.svg'),
      star4: new THREE.TextureLoader().load('/textures/star4.svg'),
    }),
    []
  );

  // Função para mapear a distância para um valor de escala
  const getScaleFromDistance = (distance) => {
    const minScale = 0.005;
    const maxScale = 1.3;
    const maxDistance = 900;

    let scale = (distance / maxDistance) * maxScale;

    if (scale < minScale) scale = minScale;
    if (scale > maxScale) scale = maxScale;

    return [scale, scale, scale];
  };

  // Filtra estrelas únicas com base no sy_id
  const uniqueStars = useMemo(() => {
    const seenSyIds = new Set();
    return starsData.filter((star) => {
      if (seenSyIds.has(star.sy_id)) {
        return false;
      } else {
        seenSyIds.add(star.sy_id);
        return true;
      }
    });
  }, []);

  // Prepara os dados das estrelas
  const stars = useMemo(() => {
    return uniqueStars
      .map((star) => {
        const RA = star.ra;
        const DEC = star.dec;
        const d = star.sy_dist;
        const st_teff = star.st_teff;
        const name = star.hostname;

        if (RA == null || DEC == null || d == null || st_teff == null) {
          return null;
        }

        const RA_rad = (RA * Math.PI) / 180;
        const DEC_rad = (DEC * Math.PI) / 180;

        const X = d * Math.cos(DEC_rad) * Math.cos(RA_rad);
        const Y = d * Math.cos(DEC_rad) * Math.sin(RA_rad);
        const Z = d * Math.sin(DEC_rad);

        const scaleFactor = 0.1;
        const position = [X * scaleFactor, Y * scaleFactor, Z * scaleFactor];

        let texture;
        if (st_teff >= 10000) {
          texture = textures.star1;
        } else if (st_teff >= 5000 && st_teff < 7500) {
          texture = textures.star2;
        } else if (st_teff >= 3500 && st_teff < 5000) {
          texture = textures.star3;
        } else if (st_teff < 3500) {
          texture = textures.star4;
        } else {
          texture = textures.star2;
        }

        const scale = getScaleFromDistance(d);

        return {
          name,
          position,
          texture,
          scale,
        };
      })
      .filter((star) => star !== null);
  }, [uniqueStars, textures]);

  // Função para lidar com o clique na estrela
  const handleClick = (name) => {
    navigate(`/hwo/${encodeURIComponent(name)}`);
  };

  return (
    <>
      {stars.map((star, index) => (
        <sprite
          key={index}
          position={star.position}
          onClick={() => handleClick(star.name)}
          scale={star.scale}
          onPointerOver={(e) => {
            e.stopPropagation();
            setHoveredStar(star); // Define a estrela hovereda
          }}
          onPointerOut={(e) => {
            e.stopPropagation();
            setHoveredStar(null); // Remove a estrela hovereda
          }}
        >
          <spriteMaterial map={star.texture} />
        </sprite>
      ))}
      {/* Renderiza o tooltip se houver uma estrela hovereda */}
      {hoveredStar && (
        <Html
          position={hoveredStar.position}
          style={{
            pointerEvents: 'none',
            background: 'rgba(0, 0, 50, 0.8)',
            padding: '5px 10px',
            borderRadius: '5px',
            border: '2px solid rgba(255, 255, 255, 0.6)',
            color: 'white',
            whiteSpace: 'nowrap',
            textAlign: 'center',
            
          }}
          sprite // Adiciona sprite para manter o tamanho constante
          // distanceFactor={10} // Opcional: ajuste conforme necessário
        >
          <div>
            <a
              href={`/hwo/${encodeURIComponent(hoveredStar.name)}`}
              style={{ color: 'white', textDecoration: 'none' }}
            >
              {hoveredStar.name}
            </a>
          </div>
        </Html>
      )}
    </>
  );
};

export default HostName;
