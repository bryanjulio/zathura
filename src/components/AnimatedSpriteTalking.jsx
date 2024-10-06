import React, { useState, useEffect } from 'react';

const astronautStates = {
  pointing: 'as-talking01.png',
  thumbsUp: 'as-talking02.png',
  normal: 'as-talking03.png',
};

const AnimatedSpriteTalking = ({ reacao, visible }) => {
  const [currentState, setCurrentState] = useState(astronautStates.normal); // Estado inicial: astronauta normal
  const [isVisible, setIsVisible] = useState(false); // Controla o fade-in e fade-out

  // Atualiza o estado da animação do astronauta quando a prop 'reacao' mudar
  useEffect(() => {
    switch (reacao) {
      case "pointing": 
        setCurrentState(astronautStates.pointing);
        break;
      case "thumbsUp": 
        setCurrentState(astronautStates.thumbsUp);
        break;
      case "normal":
      default:
        setCurrentState(astronautStates.normal);
        break;
    }
  }, [reacao]);

  // Controla o fade-in quando o componente for exibido
  useEffect(() => {
    if (visible) {
      setTimeout(() => setIsVisible(true), 100); // Atraso para iniciar o fade-in
    } else {
      setIsVisible(false); // Inicia o fade-out
    }
  }, [visible]);

  return (
    <div className={`astronaut-animation ${isVisible ? 'show' : ''}`}>
      <img
        src={`/sprites/talking/${currentState}`}
        alt="Astronauta falando"
      />
    </div>
  );
};

export default AnimatedSpriteTalking;
