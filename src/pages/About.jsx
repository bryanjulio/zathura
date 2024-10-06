import React, { useState, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Physics } from '@react-three/rapier';
import Scene from "../components/LandingScene";
import '../assets/styles/About.css'; 
import groupPhoto from '../assets/photos/photo.jpeg'; 
import { useNavigate } from 'react-router-dom'; 


const FocusOnSunWithZoom = () => {
  const { camera } = useThree();
  const targetPosition = { x: 0, y: 20, z: 50 }; // Final camera position
  const speed = 0.05;  // Animation speed

  useFrame(() => {
    camera.position.x += (targetPosition.x - camera.position.x) * speed;
    camera.position.y += (targetPosition.y - camera.position.y) * speed;
    camera.position.z += (targetPosition.z - camera.position.z) * speed;
    camera.lookAt(0, 0, 0); // Keeps the camera focused on the center
  });

  return null;
};

const About = () => {
  const [startZoom, setStartZoom] = useState(false);
  const [currentStep, setCurrentStep] = useState(1); // Controls the current step
  const navigate = useNavigate(); // Hook for navigation

  useEffect(() => {
    setStartZoom(true); // Automatically triggers zoom on load
  }, []);

  const handleNextClick = () => {
    setCurrentStep(prevStep => prevStep + 1); // Advances to the next step
  };

  const handleBackClick = () => {
    setCurrentStep(prevStep => prevStep - 1); // Goes back to the previous step
  };

  const handleHomeClick = () => {
    navigate('/'); 
  };

  return (
    <div className="app-container">
      <Canvas camera={{ position: [0, 50, 150], far: 200000 }}>
        <color attach='background' args={['black']} />
        <ambientLight intensity={0.25} />

        {/* Automatically triggered zoom animation */}
        {startZoom && <FocusOnSunWithZoom />}

        <Physics gravity={[0, 0, 0]}>
          <Scene />
        </Physics>
      </Canvas>

      {/* Information Section */}
      <div className="info-section">
        {currentStep === 1 && (
          <>
            <h2>Zathura Team - NASA Hackathon 2024</h2>
            <p>
              We are the Zathura team, and we are participating in the <strong>2024 NASA Space Apps Challenge</strong>. Our theme is the <em>Navigator for the Habitable Worlds Observatory (HWO)</em>, which aims to map the characterizable exoplanets in our galaxy.
            </p>
            <p>
              The <strong>Habitable Worlds Observatory (HWO)</strong> is a future space observatory that NASA is developing with the goal of directly observing exoplanets in habitable zones around nearby stars. It will be a large telescope capable of expanding our knowledge of Earth-like planets by capturing direct images of exoplanets, something that has never been done on a large scale.
            </p>
            <p>
              Our challenge is to develop a 3D interactive application that allows users to visualize the observational paths to known exoplanets, highlighting those with potential to be characterized by the HWO. The goal is to identify the most promising exoplanets that could be studied in future missions, considering parameters such as the distance to planetary systems and the size of the telescope.
            </p>
            <p>
              The HWO mission is part of a continuous effort to expand our understanding of the universe and explore the mysteries of exoplanets, with a particular focus on finding and studying potentially habitable worlds. With our application, we hope to provide a tool that helps scientists and engineers better understand the impact of different telescope parameters and potentially optimize future missions.
            </p>

            <button onClick={handleNextClick}>Next</button>
          </>
        )}

        {currentStep === 2 && (
          <>
            <h2>Adopted Methodology</h2>
            <p>
              Our team adopted an agile methodology, using short sprints and focusing on rapid prototyping to ensure efficient and collaborative development. After each sprint, we reviewed the features and adjusted based on the feedback from members and the project goals.
            </p>
            <p>
              We used <strong>Vite</strong> with <strong>React</strong> for the front-end, and <strong>Python</strong> for processing data from the NASA Exoplanet Archive. For audio generation, we used <strong>ElevenLabs</strong>, and some images were created with <strong>MidJourney</strong>.
            </p>
            <p>
              <strong>ChatGPT</strong> was used to assist with coding and technical decisions throughout the project. Additionally, we used a <strong>whiteboard</strong> for brainstorming and discussions.
            </p>
            <p>
              Tools like <strong>GitHub</strong> for version control, <strong>Trello</strong> for task management, and <strong>Slack</strong> for internal communication were essential to keeping everyone aligned with the project's objectives.
            </p>

            <button onClick={handleBackClick}>Back</button>
            <button onClick={handleNextClick}>Next</button>
          </>
        )}

        {currentStep === 3 && (
          <>
            <h2>Our Group</h2>
            <p>
              We are from <strong>Rio Claro, São Paulo</strong>, and we are friends with a shared background in technology. Our team name, <strong>Zathura</strong>, was inspired by the 2005 movie <em>Zathura: A Space Adventure</em>. In honor of the astronaut character from the movie, we named our project astronaut <strong>Wallter</strong>.
            </p>
            <p>
              Our project combines our passion for technology and space exploration, and we look forward to contributing to the NASA Space Apps Challenge with this interactive and innovative solution.
            </p>
            <p><strong>Members:</strong></p>
            <ul>
              <li>Bryan Julio</li>
              <li>Diogo Pereira</li>
              <li>Erick Gomes</li>
              <li>Lucas Ferreira</li>
              <li>Pedro Dias</li>
            </ul>

            <img src={groupPhoto} alt="Group Photo" className="group-photo" />
            <button onClick={handleBackClick}>Back</button>
            <button onClick={handleHomeClick}>Home</button> 
          </>
        )}
      </div>
    </div>
  );
};

export default About;
