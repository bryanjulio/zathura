import React, { useRef } from 'react';
import { TextureLoader, Vector3 } from 'three';
import { useLoader, useFrame } from '@react-three/fiber';
import { RigidBody } from '@react-three/rapier';
import { useCamera } from '../context/Camera';
import { EARTH_RADIUS, EARTH_DISTANCE_FROM_SUN } from '../config/constants';
import { calculateInitialPosition, calculateInitialVelocity } from '../utils/planetCalculations';
import { Text } from '@react-three/drei';
import { useTrails } from '../context/Trails';

const Earth = () => {
    const meshRef = useRef();
    const textRef = useRef();
    const torusRef = useRef();
    const { handleFocus } = useCamera();
    const texture = useLoader(TextureLoader, '/textures/earth.jpg');
    const { addTrailPoint } = useTrails();

    // Use useRef to maintain angle between renders
    const angleRef = useRef(0);
    const rotationSpeed = 0.01; // Adjust this value for faster or slower orbiting

    // Initial position and velocity calculations
    const initialPosition = calculateInitialPosition(false);
    const linearVelocity = calculateInitialVelocity(initialPosition, false);
    const scale = 0.5 + Math.random() * 1.5;

    useFrame(({ camera }) => {
        // Update angle and calculate new position for the Earth
        angleRef.current += rotationSpeed; // Update angle
        const x = EARTH_DISTANCE_FROM_SUN * Math.cos(angleRef.current);
        const z = EARTH_DISTANCE_FROM_SUN * Math.sin(angleRef.current);
        
        // Set the position of the Earth
        meshRef.current.position.set(x, 0, z);

        // Add a trail point for Earth
        addTrailPoint('earthTrail', new Vector3(x, 0, z));

        if (textRef.current && torusRef.current) {
            // Calculate the distance between the camera and Earth
            const distance = camera.position.distanceTo(meshRef.current.position);

            // Adjust the font size based on the distance
            textRef.current.fontSize = distance / 22;

            // Ensure the text faces the camera
            textRef.current.lookAt(camera.position);

            // Adjust the torus (ring) size based on the distance
            const torusSize = EARTH_RADIUS * 8 + distance / 30;
            const tubeSize = EARTH_RADIUS / 2 + distance / 150;
            torusRef.current.scale.set(torusSize, torusSize, tubeSize);

            // Ensure the torus follows the Earth
            torusRef.current.position.set(x, 0, z);
            torusRef.current.lookAt(camera.position);

            // Set the position of the text above the Earth
            const aboveEarthHeight = EARTH_RADIUS * 50;
            textRef.current.position.set(x, aboveEarthHeight, z);
        }
    });

    return (
        <>
            {/* Earth Mesh */}
            <RigidBody
                colliders="ball"
                userData={{ type: 'Earth', key: 'Earth' }}
                position={initialPosition}
                linearVelocity={linearVelocity}
                scale={scale}
                type="kinematicPosition"
                onClick={handleFocus}
            >
                <mesh ref={meshRef}>
                    <sphereGeometry args={[EARTH_RADIUS, 32, 32]} />
                    <meshStandardMaterial map={texture} />
                </mesh>
            </RigidBody>

            {/* Dynamic Highlight Ring (Torus) around Earth */}
            <mesh ref={torusRef}>
                <torusGeometry args={[EARTH_RADIUS * 3, EARTH_RADIUS / 5, 64, 100]} />
                <meshBasicMaterial color="white" transparent opacity={0.5} />
            </mesh>

            {/* Label Text for Earth that dynamically changes size with zoom */}
            <Text
                ref={textRef}
                position={[EARTH_DISTANCE_FROM_SUN, EARTH_RADIUS * 10, 0]}
                fontSize={2}
                color="white"
                anchorX="center"
                anchorY="middle"
            >
                Earth
            </Text>
        </>
    );
};

export default Earth;