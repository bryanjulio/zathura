import React, { useState } from 'react';

const astronautStates = {
  pointing: 'as-talking01.png',
  thumbsUp: 'as-talking02.png',
  normal: 'as-talking03.png',
};

const AstronautTalkingAnimation = () => {
  const [currentState, setCurrentState] = useState(astronautStates.normal); // Estado inicial: astronauta normal

  // Função para mudar o estado de acordo com o botão clicado
  const changeState = (state) => {
    setCurrentState(astronautStates[state]);
  };

  return (
    <div className="astronaut-animation">
      <img
        src={`/sprites/talking/${currentState}`}
        alt="Astronauta falando"
        style={{ width: '100px', height: 'auto' }} // Ajuste o tamanho conforme necessário
      />
      <div>
        <button onClick={() => changeState('pointing')}>Apontando</button>
        <button onClick={() => changeState('thumbsUp')}>Joinha</button>
        <button onClick={() => changeState('normal')}>Normal</button>
      </div>
    </div>
  );
};

export default AstronautTalkingAnimation;
