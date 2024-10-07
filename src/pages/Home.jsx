import React, { useState, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import { Physics } from "@react-three/rapier";
import Scene from "../components/Scene";

import "../assets/styles/Home.css";
import { Link } from "react-router-dom";
import AnimatedSpriteTalking from "../components/AnimatedSpriteTalking";
import { TypeAnimation } from "react-type-animation";
import HWO from "../components/HWO";

import introAudio from '../assets/audio/intro.mp3';
import audio2 from '../assets/audio/audio2.mp3';
import audio3 from '../assets/audio/audio3.mp3';

const FocusOnSunWithZoom = () => {
  const { camera } = useThree();
  const targetPosition = { x: 0, y: 20, z: 50 };
  const speed = 0.05;

  useFrame(() => {
    camera.position.x += (targetPosition.x - camera.position.x) * speed;
    camera.position.y += (targetPosition.y - camera.position.y) * speed;
    camera.position.z += (targetPosition.z - camera.position.z) * speed;
    camera.lookAt(0, 0, 0);
  });

  return null;
};

const Home = () => {
  const [hasStarted, setHasStarted] = useState(false);
  const [showInfoCard, setShowInfoCard] = useState(false);
  const [canControlView, setCanControlView] = useState(false);
  const [startZoom, setStartZoom] = useState(false);
  const [overlayActive, setOverlayActive] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);
  const [cardStep, setCardStep] = useState(1);
  const [astronautReaction, setAstronautReaction] = useState("normal");
  const [astronautVisible, setAstronautVisible] = useState(true);

  // Adiciona controle de áudio
  const [audio, setAudio] = useState(new Audio(introAudio)); // Inicializa o áudio com o intro.mp3

  useEffect(() => {
    const startAction = () => {
      setHasStarted(true);
      setShowInfoCard(true);
      setFadeOut(true);

      // Inicia a reprodução do áudio de introdução
      audio.play();

      setTimeout(() => {
        setOverlayActive(false);
      }, 4000);
    };

    if (!hasStarted) {
      window.addEventListener("keydown", startAction);
      window.addEventListener("click", startAction);
    }

    return () => {
      window.removeEventListener("keydown", startAction);
      window.removeEventListener("click", startAction);
    };
  }, [hasStarted, audio]);

  // Função para tocar o áudio correspondente e parar o áudio anterior
  const playAudio = (step) => {
    // Pausa o áudio anterior, se estiver tocando
    audio.pause();
    audio.currentTime = 0; // Reseta o tempo de execução do áudio anterior

    let newAudioSrc;
    if (step === 1) newAudioSrc = introAudio;
    if (step === 2) newAudioSrc = audio2;
    if (step === 3) newAudioSrc = audio3;

    const newAudio = new Audio(newAudioSrc);
    setAudio(newAudio); // Atualiza o áudio atual para o novo
    newAudio.play(); // Reproduz o novo áudio
  };

  useEffect(() => {
    playAudio(cardStep); // Reproduz o áudio correspondente sempre que o cardStep mudar
  }, [cardStep]);

  // Função para lidar com o clique no botão Next e mudar o conteúdo do card
  const handleNextClick = () => {
    setCardStep((prevStep) => {
      if (prevStep === 1) {
        setAstronautReaction("pointing");
        return 2;
      } else if (prevStep === 2) {
        setAstronautReaction("thumbsUp");
        return 3;
      } else if (prevStep === 3) {
        setAstronautVisible(false);
        setTimeout(() => {
          setShowInfoCard(false);
          setStartZoom(true);
          setTimeout(() => {
            setCanControlView(true);
          }, 3000);
        }, 1000);
        return prevStep;
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

        {startZoom && <FocusOnSunWithZoom />}

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
          key={cardStep}
          sequence={[
            'Press any key or click to start',
            1000,
          ]}
          speed={75}
          wrapper="span"
          cursor={true}
          repeat={0}
        />
      )}

      {showInfoCard && (
        <>
          <div className="info-card">
            {cardStep === 1 ? (
              <TypeAnimation
                key={cardStep}
                sequence={[
                  'Hi there! I’m Walter, your guide on this space adventure. Today, we’re going to explore distant planets and discover new worlds through the HWO, NASA’s newest telescope. It’s designed to find Earth-like planets around nearby stars and search for signs of life. Ready to dive in?',
                  1000,
                ]}
                speed={75}
                wrapper="span"
                cursor={true}
                repeat={0}
              />
            ) : cardStep === 2 ? (
              <TypeAnimation
                key={cardStep}
                sequence={[
                  'The HWO is positioned at Lagrange Point 2 (L2), 1.5 million km from Earth, where it has a perfect view of deep space.',
                  1000,
                ]}
                speed={75}
                wrapper="span"
                cursor={true}
                repeat={0}
              />
            ) : cardStep === 3 ? (
              <TypeAnimation
                key={cardStep}
                sequence={[
                  'In this app, you’ll explore exoplanets through HWO’s eyes, learning about planets that might support life. Join me on a guided tour or explore freely!',
                  1000,
                ]}
                speed={75}
                wrapper="span"
                cursor={true}
                repeat={0}
              />
            ) : (
              <TypeAnimation
                key={cardStep}
                sequence={[
                  'All steps are completed.',
                  1000,
                ]}
                speed={75}
                wrapper="span"
                cursor={false}
                repeat={0}
              />
            )}
            <button className="fixed-btn" onClick={handleNextClick}>Next</button>
          </div>
        </>
      )}

      {showInfoCard && (
        <AnimatedSpriteTalking
          reacao={astronautReaction}
          visible={astronautVisible}
        />
      )}

      {canControlView && (
        <div className="controls">
          <Link className="btn">Guided Tour</Link>
          <Link to="/hwo" className="btn">Free Navigation</Link>
        </div>
      )}
    </div>
  );
};

export default Home;
