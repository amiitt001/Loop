import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Sphere, MeshDistortMaterial, Float, Stars } from '@react-three/drei';

const AnimatedSphere = () => {
    const meshRef = useRef();

    useFrame((state) => {
        if (meshRef.current) {
            meshRef.current.rotation.x = state.clock.getElapsedTime() * 0.2;
            meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.3;
        }
    });

    return (
        <Float speed={2} rotationIntensity={1} floatIntensity={1}>
            <Sphere ref={meshRef} args={[1.5, 64, 64]}>
                <MeshDistortMaterial
                    color="#00f3ff"
                    attach="material"
                    distort={0.4}
                    speed={2}
                    roughness={0.2}
                    metalness={0.8}
                    wireframe
                    transparent
                    opacity={0.15}
                />
            </Sphere>
        </Float>
    );
};

const Particles = () => {
    const group = useRef();

    useFrame((state) => {
        if (group.current) {
            group.current.rotation.y = state.clock.getElapsedTime() * 0.05;
        }
    });

    return (
        <group ref={group}>
            {Array.from({ length: 30 }).map((_, i) => (
                <Float key={i} speed={1.5} rotationIntensity={2} floatIntensity={2}>
                    <mesh position={[
                        (Math.random() - 0.5) * 6,
                        (Math.random() - 0.5) * 6,
                        (Math.random() - 0.5) * 4
                    ]}>
                        <octahedronGeometry args={[0.05]} />
                        <meshBasicMaterial color="#00f3ff" transparent opacity={0.4} />
                    </mesh>
                </Float>
            ))}
        </group>
    );
};

const ChatbotBackground = () => {
    return (
        <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            opacity: 0.8,
            zIndex: -1,
            pointerEvents: 'none',
            borderRadius: '16px', // Match Chatbot border radius
            overflow: 'hidden'
        }}>
            <Canvas camera={{ position: [0, 0, 4], fov: 50 }}>
                <ambientLight intensity={0.5} />
                <pointLight position={[10, 10, 10]} intensity={1} color="#00f3ff" />

                <AnimatedSphere />
                <Particles />
                <Stars radius={20} depth={20} count={300} factor={4} saturation={0} fade speed={1} />

                <fog attach="fog" args={['#000', 5, 15]} />
            </Canvas>
        </div>
    );
};

export default ChatbotBackground;
