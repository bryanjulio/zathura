import React, { useState, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import { Physics } from '@react-three/rapier';
import Scene from "../components/Scene";
import '../assets/styles/Home.css';
import { Link } from 'react-router-dom';
import AnimatedSpriteTalking from '../components/AnimatedSpriteTalking'; // Importa corretamente o componente de animação
import React, { useState, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import { Physics } from "@react-three/rapier";
import Scene from "../components/Scene";
import "../assets/styles/Home.css";
import { TypeAnimation } from "react-type-animation";

const FocusOnSunWithZoom = () => {
    const { camera } = useThree();
    const targetPosition = { x: 0, y: 20, z: 50 };  // Posição final da câmera (zoom próximo do Sol)
    const speed = 0.05;  // Velocidade da animação (quanto menor, mais suave)

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
    const [startZoom, setStartZoom] = useState(false);  // Controla quando iniciar o zoom
    const [overlayActive, setOverlayActive] = useState(true); // Controla a exibição do overlay
    const [fadeOut, setFadeOut] = useState(false);  // Controla a transição de fade-out
    const [cardStep, setCardStep] = useState(1); // Controla o passo do card
    const [astronautReaction, setAstronautReaction] = useState("normal"); // Controla a reação do astronauta
    const [astronautVisible, setAstronautVisible] = useState(true); // Controla a visibilidade do astronauta

    useEffect(() => {
        const startAction = () => {
            console.log("Tecla pressionada ou clique detectado");
            setHasStarted(true);
            setShowInfoCard(true);
            setFadeOut(true);  // Inicia o fade-out do overlay

            // Espera a transição terminar (4 segundos) para remover o overlay
            setTimeout(() => {
                setOverlayActive(false);  // Remove o overlay após o fade-out completo
            }, 4000);  // Tempo da transição de clareamento suave (ajustado para 4 segundos)
        };

        if (!hasStarted) {
            window.addEventListener('keydown', startAction);
            window.addEventListener('click', startAction);  // Adiciona suporte para cliques do mouse
        }

        return () => {
            window.removeEventListener('keydown', startAction);
            window.removeEventListener('click', startAction);  // Remove o evento de clique quando não necessário
        };
    }, [hasStarted]);

    // Função para lidar com o clique no botão Next e mudar o conteúdo do card
    const handleNextClick = () => {
        if (cardStep === 1) {
            setCardStep(2); // Avança para o próximo passo do card
            setAstronautReaction("pointing"); // Muda a reação do astronauta para "pointing"
        } else {
            // Aqui implementamos o fade-out do astronauta
            setAstronautVisible(false); // Inicia o fade-out do astronauta
            setTimeout(() => {
                setShowInfoCard(false); // Após o fade-out, esconde o card
                setStartZoom(true);  // Ativa o zoom
                setTimeout(() => {
                    setCanControlView(true);  // Habilita o controle da câmera depois do zoom
                }, 3000);  // Tempo para a animação de zoom
            }, 1000);  // Tempo para a animação de fade-out do astronauta
        }
    };
    return (
        <div className="app-container">
            <Link to="/about" className="top-right-link">About</Link>
            <Canvas camera={{ position: [0, 50, 150], far: 200000 }}>
                <color attach='background' args={['black']} />
                <ambientLight intensity={0.25} />

                {/* Animação de zoom, quando o usuário clica em "Next" */}
                {startZoom && <FocusOnSunWithZoom />}

                {/* OrbitControls são ativados apenas quando canControlView é true */}
                {canControlView && <OrbitControls maxDistance={450} minDistance={10} makeDefault />}

                <Physics gravity={[0, 0, 0]}>
                    <Scene />
                </Physics>

                <EffectComposer>
                    <Bloom luminanceThreshold={0} luminanceSmoothing={0.9} height={300} />
                </EffectComposer>
            </Canvas>

            {overlayActive && (
                <div className={`overlay ${fadeOut ? 'fade-out' : ''}`} />
            )}

            {!hasStarted && (
                <p className="start-text">Press any key or click to start</p>
            )}

      {showInfoCard && (
        <div className="info-card">
        <h2>   <TypeAnimation
      sequence={[
        'One', // Types 'One'
        1000, // Waits 1s
        'Two', // Deletes 'One' and types 'Two'
        2000, // Waits 2s
        'Two Three', // Types 'Three' without deleting 'Two'
        () => {
          console.log('Sequence completed'); // Place optional callbacks anywhere in the array
        }
      ]}
      wrapper="span"
      cursor={true}
      repeat={Infinity}
      style={{ fontSize: '2em', display: 'inline-block' }}
    />
         </h2>
          <p>
            Here you can explore the solar system. Use the controls to navigate
            through space!
          </p>
          <button onClick={handleNextClick}>Next</button>
        </div>
      )}
            {showInfoCard && (
                <>
                    <div className="info-card">
                        {/* O conteúdo do card muda de acordo com o cardStep */}
                        {cardStep === 1 ? (
                            <>
                                <h2>Welcome to the Solar System Explorer</h2>
                                <p>Here you can explore the solar system. Use the controls to navigate through space!</p>
                            </>
                        ) : (
                            <>
                                <h2>Prepare for Exploration!</h2>
                                <p>The Solar System awaits. Click 'Next' to begin your journey!</p>
                            </>
                        )}
                        <button onClick={handleNextClick}>Next</button>
                    </div>
                </>
            )}

            {/* Exibe a animação do astronauta */}
            {showInfoCard && <AnimatedSpriteTalking reacao={astronautReaction} visible={astronautVisible} />}

            {canControlView && (
                <div className="controls">
                    <button className="control-btn">Livre</button>
                    <button className="control-btn">Tour Guiada</button>
                </div>
            )}
        </div>
    );
}

export default Home;
