import React, { useState, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import { Physics } from "@react-three/rapier";
import Scene from "../components/Scene";
import "../assets/styles/Home.css";
import { Link } from "react-router-dom";
import AnimatedSpriteTalking from "../components/AnimatedSpriteTalking"; // Importa corretamente o componente de animação
import { TypeAnimation } from "react-type-animation";

const FocusOnSunWithZoom = () => {
  const { camera } = useThree();
  const targetPosition = { x: 0, y: 20, z: 50 }; // Posição final da câmera (zoom próximo do Sol)
  const speed = 0.05; // Velocidade da animação (quanto menor, mais suave)

  useFrame(() => {
    camera.position.x += (targetPosition.x - camera.position.x) * speed;
    camera.position.y += (targetPosition.y - camera.position.y) * speed;
    camera.position.z += (targetPosition.z - camera.position.z) * speed;

    // Mantém a câmera olhando para o Sol (centro da cena)
    camera.lookAt(0, 0, 0);
  });

  return null;
};

const Home = () => {
  const [hasStarted, setHasStarted] = useState(false);
  const [showInfoCard, setShowInfoCard] = useState(false);
  const [canControlView, setCanControlView] = useState(false);
  const [startZoom, setStartZoom] = useState(false); // Controla quando iniciar o zoom
  const [overlayActive, setOverlayActive] = useState(true); // Controla a exibição do overlay
  const [fadeOut, setFadeOut] = useState(false); // Controla a transição de fade-out
  const [cardStep, setCardStep] = useState(1); // Controla o passo do card
  const [astronautReaction, setAstronautReaction] = useState("normal"); // Controla a reação do astronauta
  const [astronautVisible, setAstronautVisible] = useState(true); // Controla a visibilidade do astronauta

  useEffect(() => {
    const startAction = () => {
      console.log("Tecla pressionada ou clique detectado");
      setHasStarted(true);
      setShowInfoCard(true);
      setFadeOut(true); // Inicia o fade-out do overlay

      // Espera a transição terminar (4 segundos) para remover o overlay
      setTimeout(() => {
        setOverlayActive(false); // Remove o overlay após o fade-out completo
      }, 4000); // Tempo da transição de clareamento suave (ajustado para 4 segundos)
    };

    if (!hasStarted) {
      window.addEventListener("keydown", startAction);
      window.addEventListener("click", startAction); // Adiciona suporte para cliques do mouse
    }

    return () => {
      window.removeEventListener("keydown", startAction);
      window.removeEventListener("click", startAction); // Remove o evento de clique quando não necessário
    };
  }, [hasStarted]);

  // Função para lidar com o clique no botão Next e mudar o conteúdo do card
  const handleNextClick = () => {
    setCardStep((prevStep) => {
      if (prevStep === 1) {
        setAstronautReaction("pointing");
        return 2;
      } else if (prevStep === 2) {
        setAstronautReaction("thumbsUp");
        return 3;
      }  else if (prevStep === 3) {
        // Aqui implementamos o fade-out do astronauta
        setAstronautVisible(false); // Inicia o fade-out do astronauta
        setTimeout(() => {
          setShowInfoCard(false); // Após o fade-out, esconde o card
          setStartZoom(true); // Ativa o zoom
          setTimeout(() => {
            setCanControlView(true); // Habilita o controle da câmera depois do zoom
          }, 3000); // Tempo para a animação de zoom
        }, 1000); // Tempo para a animação de fade-out do astronauta
        return prevStep; // Não incrementa mais o cardStep, já que estamos no último passo
      } else {
        return prevStep;
      }
    });
  };
  
  

  return (
    <div className="app-container">
      <Link to="/about" className="about-btn">
        About
      </Link>
      <Canvas camera={{ position: [0, 50, 150], far: 200000 }}>
        <color attach="background" args={["black"]} />
        <ambientLight intensity={0.25} />

        {/* Animação de zoom, quando o usuário clica em "Next" */}
        {startZoom && <FocusOnSunWithZoom />}

        {/* OrbitControls são ativados apenas quando canControlView é true */}
        {canControlView && (
          <OrbitControls maxDistance={450} minDistance={10} makeDefault />
        )}

        <Physics gravity={[0, 0, 0]}>
          <Scene />
        </Physics>

        <EffectComposer>
          <Bloom luminanceThreshold={0} luminanceSmoothing={0.9} height={300} />
        </EffectComposer>
      </Canvas>

      {overlayActive && (
        <div className={`overlay ${fadeOut ? "fade-out" : ""}`} />
      )}

      {!hasStarted && (
        <TypeAnimation className="start-text"
        key={cardStep}  // Adiciona a key para forçar o re-render ao mudar o cardStep
        sequence={[
          'Press any key or click to start', // Texto a ser escrito
          1000, // Pausa de 1 segundo
        ]}
        speed={75}
        wrapper="span"
        cursor={true}  // Mostra o cursor piscando
        repeat={0}  // Não repete a animação
      />
      )}

      
      {showInfoCard && (
  <>
    <div className="info-card">
      {/* O conteúdo do card muda de acordo com o cardStep */}
      {cardStep === 1 ? (
        <>
          <TypeAnimation
            key={cardStep}  // Adiciona a key para forçar o re-render ao mudar o cardStep
            sequence={[
              'Hi there! I’m Walter, your guide on this space adventure. Today, we’re going to explore distant planets and discover new worlds through the HWO, NASA’s newest telescope. It’s designed to find Earth-like planets around nearby stars and search for signs of life. Ready to dive in?', // Texto a ser escrito
              1000, // Pausa de 1 segundo
            ]}
            speed={75}
            wrapper="span"
            cursor={true}  // Mostra o cursor piscando
            repeat={0}  // Não repete a animação
          />
        </>
      ) : cardStep === 2 ? (
        <>
          <TypeAnimation
            key={cardStep}  // Adiciona a key para forçar o re-render ao mudar o cardStep
            sequence={[
              'The HWO is positioned at Lagrange Point 2 (L2), 1.5 million km from Earth, where it has a perfect view of deep space.', // Novo texto da segunda etapa
              1000, // Pausa de 1 segundo
            ]}
            speed={75}
            wrapper="span"
            cursor={true}
            repeat={0}
          />
        </>
      ) : cardStep === 3 ? (
        <>
          <TypeAnimation
            key={cardStep}  // Adiciona a key para forçar o re-render ao mudar o cardStep
            sequence={[
              'In this app, you’ll explore exoplanets through HWO’s eyes, learning about planets that might support life. Join me on a guided tour or explore freely!', // Novo texto da terceira etapa
              1000,
            ]}
            speed={75}
            wrapper="span"
            cursor={true}
            repeat={0}
          />
        </>
      ) : (
        <>
          <TypeAnimation
            key={cardStep}  // Adiciona a key para forçar o re-render ao mudar o cardStep
            sequence={[
              'All steps are completed.', // Texto quando todas as etapas são concluídas
              1000,
            ]}
            speed={75}
            wrapper="span"
            cursor={false}  // Cursor desaparece ao final
            repeat={0}
          />
        </>
      )}
      <button className="fixed-btn" onClick={handleNextClick}>Next</button>
    </div>
  </>
)}



      {/* Exibe a animação do astronauta */}
      {showInfoCard && (
        <AnimatedSpriteTalking
          reacao={astronautReaction}
          visible={astronautVisible}
        />
      )}

      {canControlView && (
        <div className="controls">
          <button className="btn">Guided Tour</button>
          <button className="btn">Free Navigation</button>
        </div>
      )}
    </div>
  );
};

export default Home;
