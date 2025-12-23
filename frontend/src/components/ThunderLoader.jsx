import React, { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { TextureLoader } from 'three';
import thunder from '../assets/thund.svg';

const ThunderLoader = () => {
  return (
    <div className="relative w-full h-screen bg-gradient-to-r from-[#000428] to-[#004e92] overflow-hidden">
      <LoadingText />
      <Canvas camera={{ position: [0, 0, 5], fov: 75 }} className="absolute inset-0">
        <Scene />
      </Canvas>
    </div>
  );
};

const LoadingText = () => {
  const [dots, setDots] = useState('');

  useEffect(() => {
    const interval = setInterval(() => {
      setDots(prev => {
        if (prev.length >= 3) return '';
        return prev + '.';
      });
    }, 500);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-10">
      <h1 className="text-white text-2xl md:text-3xl font-bold text-center font-sans">
        Loading{dots}
      </h1>
    </div>
  );
};

const Scene = () => {
  const groupRef = useRef();
  const logoRef = useRef();
  const glowDirection = useRef(0.01); // Slow pulsation
  const glowIntensity = useRef(0.6); // Reduced intensity
  
  const texture = new TextureLoader().load(thunder);

  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.02;
    }

    if (logoRef.current) {
      logoRef.current.rotation.y = groupRef.current?.rotation.y || 0;
    }

    // Subtle pulsating effect
    glowIntensity.current += glowDirection.current;
    if (glowIntensity.current >= 0.8 || glowIntensity.current <= 0.5) {
      glowDirection.current *= -1;
    }
    
    if (logoRef.current && logoRef.current.material) {
      logoRef.current.material.emissiveIntensity = glowIntensity.current;
    }
  });

  return (
    <>
      <ambientLight intensity={0.2} />
      <pointLight position={[0, 0, 2]} color="#ffff00" intensity={0.4} />
      
      <mesh ref={logoRef} position={[0, 0, 0]}>
        <planeGeometry args={[1.5, 1.5]} />
        <meshStandardMaterial 
          map={texture}
          transparent={true}
          emissive="#ffff00"
          emissiveIntensity={glowIntensity.current}
        />
      </mesh>

      <group ref={groupRef}>
        {[...Array(10)].map((_, i) => (
          <Ring key={i} index={i} />
        ))}
      </group>
    </>
  );
};

const Ring = ({ index }) => {
  const ringRef = useRef();

  useFrame(() => {
    if (ringRef.current) {
      ringRef.current.rotation.x = Math.PI / 2;
    }
  });

  return (
    <mesh ref={ringRef} position={[0, -index * 0.2, 0]}>
      <torusGeometry args={[1 - index * 0.1, 0.05, 16, 100]} />
      <meshBasicMaterial 
        color="#000000" 
        transparent={true} 
        opacity={0.3} // Reduced ring opacity
      />
    </mesh>
  );
};

export default ThunderLoader;