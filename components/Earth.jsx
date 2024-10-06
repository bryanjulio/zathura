import React, { useRef, useState } from 'react';
import { TextureLoader, Vector3 } from 'three';
import { useLoader, useFrame } from '@react-three/fiber';
import { RigidBody } from '@react-three/rapier';
import { useCamera } from '../context/Camera';
import { EARTH_RADIUS, EARTH_DISTANCE_FROM_SUN } from '../config/constants';
import { Text } from '@react-three/drei';

const Earth = () => {
    const meshRef = useRef();
    const textRef = useRef();
    const torusRef = useRef();
    const { handleFocus } = useCamera();
    const texture = useLoader(TextureLoader, '/textures/earth.jpg');

    // State for angular position and rotation speed
    const [angle, setAngle] = useState(0);
    const rotationSpeed = 0.01; // Adjust this value for faster or slower orbiting

    useFrame(({ camera }) => {
        if (textRef.current && torusRef.current) {
            // Calculate the distance between the camera and Earth
            const distance = camera.position.distanceTo(new Vector3(EARTH_DISTANCE_FROM_SUN, 0, 0));

            // Adjust the font size based on the distance
            textRef.current.fontSize = distance / 22;

            // Ensure the text faces the camera
            textRef.current.lookAt(camera.position);

            // Update the angle for orbiting
            setAngle((prevAngle) => prevAngle + rotationSpeed);

            // Calculate new position for the Earth based on the angle
            const x = EARTH_DISTANCE_FROM_SUN * Math.cos(angle);
            const z = EARTH_DISTANCE_FROM_SUN * Math.sin(angle);
            meshRef.current.position.set(x, 0, z);

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
            <RigidBody colliders="ball" userData={{ type: 'Earth' }} type="kinematicPosition" onClick={handleFocus}>
                <mesh ref={meshRef} position={[EARTH_DISTANCE_FROM_SUN, 0, 0]}>
                    <sphereGeometry args={[EARTH_RADIUS, 32, 32]} />
                    <meshStandardMaterial map={texture} />
                </mesh>
            </RigidBody>

            {/* Dynamic Highlight Ring (Torus) around Earth */}
            <mesh ref={torusRef} position={[EARTH_DISTANCE_FROM_SUN, 0, 0]} rotation={[Math.PI / 2, 0, 0]}>
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
