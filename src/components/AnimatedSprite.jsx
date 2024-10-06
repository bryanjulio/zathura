import React, { useState, useEffect } from 'react';

const stationaryImages = ['a1.png', 'a2.png']; // Estados parado
const movingImages = ['a3.png', 'a4.png', 'a5.png', 'a6.png', 'a7.png']; // Estados de movimento

// Intervalos de tempo entre imagens (em milissegundos)
const stationaryIntervals = [600, 600]; // Tempo para intercalar entre a1 e a2
const movingIntervals = [200, 200, 200, 200, 200]; // Tempo para a animação de movimento
const transitionTime = 200; // Tempo extra para transição de parado para movimento

const AstronautAnimation = () => {
  const [currentFrame, setCurrentFrame] = useState(0);
  const [isMoving, setIsMoving] = useState(false); // Controla se o astronauta está se movendo
  const [delay, setDelay] = useState(stationaryIntervals[0]); // Tempo de intervalo entre frames
  const [isTransitioning, setIsTransitioning] = useState(false); // Controla se está em transição

  useEffect(() => {
    let images = isMoving ? movingImages : stationaryImages;
    let intervals = isMoving ? movingIntervals : stationaryIntervals;

    const changeFrame = () => {
      setCurrentFrame((prevFrame) => {
        const nextFrame = (prevFrame + 1) % images.length;

        // Quando a animação de movimento terminar, voltar ao estado parado
        if (isMoving && nextFrame === 0) {
          setIsMoving(false); // Voltar ao estado parado quando o ciclo de movimento acabar
          setIsTransitioning(false); // Resetar transição
        }

        return nextFrame;
      });

      // Definir o novo intervalo de tempo baseado no estado (parado ou movendo)
      const nextDelay = intervals[(currentFrame + 1) % images.length];
      setDelay(nextDelay);
    };

    const timer = setTimeout(changeFrame, delay);
    return () => clearTimeout(timer);
  }, [currentFrame, isMoving, delay]);

  const handleMovement = () => {
    setIsTransitioning(true); // Começar a transição
    setTimeout(() => {
      setIsMoving(true); // Ativar a animação de movimento quando a transição acabar
      setCurrentFrame(0); // Reiniciar a animação de movimento desde a primeira imagem
    }, transitionTime); // Aguardar o tempo de transição antes de começar a animação de movimento
  };

  const images = isMoving ? movingImages : stationaryImages;

  return (
    <div>
      <img
        src={`/sprites/flying/${images[currentFrame]}`}
        alt="Astronauta animado"
        style={{ width: '100px', height: 'auto' }} // Ajuste o tamanho conforme necessário
      />
      <button onClick={handleMovement} disabled={isTransitioning || isMoving}>
        Mover Astronauta
      </button>
    </div>
  );
};

export default AstronautAnimation;
