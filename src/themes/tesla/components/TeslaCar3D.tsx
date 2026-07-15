import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Environment, ContactShadows, PerspectiveCamera } from '@react-three/drei';
import * as THREE from 'three';

function CyberTruckModel() {
  const group = useRef<THREE.Group>(null);
  const wheels = useRef<THREE.Group[]>([]);

  // Create the Cybertruck profile shape
  const bodyGeometry = useMemo(() => {
    const shape = new THREE.Shape();
    // Start at bottom rear
    shape.moveTo(-2.8, 0.4);
    // Bottom edge to front bumper
    shape.lineTo(2.7, 0.4);
    // Front bumper vertical lip
    shape.lineTo(2.7, 0.6);
    // Sloped hood to roof peak
    shape.lineTo(0.2, 1.7);
    // Sloped rear bed to tailgate
    shape.lineTo(-2.7, 1.1);
    // Tailgate vertical drop
    shape.lineTo(-2.8, 1.1);
    shape.lineTo(-2.8, 0.4);

    const extrudeSettings = { 
      depth: 1.8, 
      bevelEnabled: false 
    };

    const geo = new THREE.ExtrudeGeometry(shape, extrudeSettings);
    // Center the extrusion on Z axis
    geo.translate(0, 0, -0.9);
    return geo;
  }, []);

  // Window geometry (dark glass)
  const glassGeometry = useMemo(() => {
    const shape = new THREE.Shape();
    shape.moveTo(1.2, 0.9);
    shape.lineTo(0.2, 1.68);
    shape.lineTo(-1.8, 1.15);
    shape.lineTo(-1.8, 0.9);
    shape.lineTo(1.2, 0.9);
    
    const geo = new THREE.ExtrudeGeometry(shape, { depth: 1.85, bevelEnabled: false });
    geo.translate(0, 0, -0.925);
    return geo;
  }, []);

  useFrame((state) => {
    if (group.current) {
      group.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
    }
    // Rotate wheels
    wheels.current.forEach((wheel) => {
      if (wheel) wheel.rotation.z -= 0.05;
    });
  });

  const bodyMaterial = new THREE.MeshStandardMaterial({ 
    color: '#888888', // Stainless steel
    roughness: 0.2, 
    metalness: 0.9 
  });

  const glassMaterial = new THREE.MeshStandardMaterial({ 
    color: '#000000', 
    roughness: 0.0, 
    metalness: 1.0 
  });

  const wheelMaterial = new THREE.MeshStandardMaterial({
    color: '#111111',
    roughness: 0.8,
  });

  const rimMaterial = new THREE.MeshStandardMaterial({
    color: '#222222',
    roughness: 0.4,
    metalness: 0.8
  });

  return (
    <group ref={group} dispose={null} scale={[0.8, 0.8, 0.8]} position={[0, -0.5, 0]}>
      {/* Main Body */}
      <mesh geometry={bodyGeometry} material={bodyMaterial} castShadow />
      
      {/* Windows */}
      <mesh geometry={glassGeometry} material={glassMaterial} position={[0, 0.02, 0]} />

      {/* Wheels */}
      {[
        [-1.8, 0.4, 0.9], // Rear Left
        [-1.8, 0.4, -0.9], // Rear Right
        [1.8, 0.4, 0.9],  // Front Left
        [1.8, 0.4, -0.9]  // Front Right
      ].map((pos, i) => (
        <group 
          key={i} 
          position={new THREE.Vector3(...pos)} 
          ref={(el) => { if (el) wheels.current[i] = el; }}
        >
          {/* Tire */}
          <mesh rotation={[Math.PI / 2, 0, 0]} castShadow>
            <cylinderGeometry args={[0.45, 0.45, 0.35, 32]} />
            <meshStandardMaterial {...wheelMaterial} />
          </mesh>
          {/* Rim */}
          <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, 0, pos[2] > 0 ? 0.18 : -0.18]}>
            <cylinderGeometry args={[0.3, 0.3, 0.05, 7]} />
            <meshStandardMaterial {...rimMaterial} />
          </mesh>
        </group>
      ))}

      {/* Headlight Bar */}
      <mesh position={[2.71, 0.65, 0]}>
        <boxGeometry args={[0.02, 0.05, 1.7]} />
        <meshStandardMaterial color="#ffffff" emissive="#ffffff" emissiveIntensity={2} toneMapped={false} />
      </mesh>

      {/* Taillight Bar */}
      <mesh position={[-2.81, 1.05, 0]}>
        <boxGeometry args={[0.02, 0.05, 1.7]} />
        <meshStandardMaterial color="#ff0000" emissive="#ff0000" emissiveIntensity={2} toneMapped={false} />
      </mesh>
    </group>
  );
}

export default function TeslaCar3D() {
  return (
    <div className="w-full h-full relative group">
      <Canvas shadows>
        <React.Suspense fallback={null}>
          <PerspectiveCamera makeDefault position={[-5, 3, 6]} fov={40} />
          <color attach="background" args={['#0a0a0a']} />
          
          <ambientLight intensity={0.5} />
          <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={2} castShadow />
          <spotLight position={[-10, 5, -10]} angle={0.2} penumbra={1} intensity={1} color="#4488ff" />
          
          <CyberTruckModel />

          {/* Floor reflection/shadow */}
          <ContactShadows resolution={512} scale={20} blur={2} opacity={0.6} far={10} color="#000000" position={[0, -0.1, 0]} />
          
          <Environment preset="city" />
          <OrbitControls 
            enablePan={false} 
            enableZoom={false} 
            minPolarAngle={Math.PI / 4} 
            maxPolarAngle={Math.PI / 2 - 0.1} 
            autoRotate 
            autoRotateSpeed={0.5}
          />
        </React.Suspense>
      </Canvas>

      {/* Overlays */}
      <div className="absolute bottom-6 left-6 text-white/50 text-xs font-mono tracking-widest pointer-events-none">
        CYBERTRUCK PLATFORM ACTIVE
      </div>
      <div className="absolute top-6 right-6 flex flex-col gap-2 pointer-events-none">
         <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></div>
      </div>
    </div>
  );
}
