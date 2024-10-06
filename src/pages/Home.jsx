  import React, { useState, useEffect } from 'react'
  import { Canvas, useFrame, useThree } from '@react-three/fiber'
  import { OrbitControls } from '@react-three/drei'
  import { EffectComposer, Bloom } from '@react-three/postprocessing'
  import { Physics } from '@react-three/rapier'
  import Scene from "../components/Scene";
  import '../assets/styles/Home.css'

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

      useEffect(() => {
          const handleKeyPress = () => {
              console.log("Tecla pressionada");
              setHasStarted(true);
              setShowInfoCard(true);
              setFadeOut(true);  // Inicia o fade-out do overlay

              // Espera a transição terminar (4 segundos) para remover o overlay
              setTimeout(() => {
                  setOverlayActive(false);  // Remove o overlay após o fade-out completo
              }, 4000);  // Tempo da transição de clareamento suave (ajustado para 4 segundos)
          };

          if (!hasStarted) {
              window.addEventListener('keydown', handleKeyPress);
          }

          return () => {
              window.removeEventListener('keydown', handleKeyPress);
          };
      }, [hasStarted]);

      const handleNextClick = () => {
          setShowInfoCard(false);
          setStartZoom(true);  // Ativa o zoom
          setTimeout(() => {
              setCanControlView(true);  // Habilita o controle da câmera depois do zoom
          }, 3000);  // Tempo para a animação de zoom (ajustar conforme o desejado)
      };

      return (
          <div className="app-container">
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
                  <p className="start-text">Press any key to start</p>
              )}

              {showInfoCard && (
                  <div className="info-card">
                      <h2>Welcome to the Solar System Explorer</h2>
                      <p>Here you can explore the solar system. Use the controls to navigate through space!</p>
                      <button onClick={handleNextClick}>Next</button>
                  </div>
              )}

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