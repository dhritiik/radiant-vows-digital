import { useRef, useMemo, useCallback } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Sparkles, MeshDistortMaterial, Trail } from "@react-three/drei";
import * as THREE from "three";

function GoldenRing({ position, rotation, scale = 1 }: { position: [number, number, number]; rotation: [number, number, number]; scale?: number }) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = rotation[0] + Math.sin(state.clock.elapsedTime * 0.3) * 0.08;
      meshRef.current.rotation.y += 0.003;
    }
  });

  return (
    <Float speed={1.2} rotationIntensity={0.3} floatIntensity={0.8}>
      <mesh ref={meshRef} position={position} scale={scale}>
        <torusGeometry args={[0.6, 0.08, 32, 100]} />
        <meshStandardMaterial
          color="#d4a853"
          metalness={0.95}
          roughness={0.05}
          envMapIntensity={2}
        />
      </mesh>
    </Float>
  );
}

function InterlockedRings() {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.2) * 0.15;
      groupRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.15) * 0.05;
    }
  });

  return (
    <group ref={groupRef} position={[0, -0.2, 0]}>
      <mesh position={[-0.3, 0, 0]} rotation={[Math.PI / 2, 0, 0.3]}>
        <torusGeometry args={[0.5, 0.06, 32, 100]} />
        <meshStandardMaterial color="#d4a853" metalness={0.95} roughness={0.05} envMapIntensity={2} />
      </mesh>
      <mesh position={[0.3, 0, 0]} rotation={[Math.PI / 2, 0, -0.3]}>
        <torusGeometry args={[0.5, 0.06, 32, 100]} />
        <meshStandardMaterial color="#e8c06a" metalness={0.9} roughness={0.08} envMapIntensity={2} />
      </mesh>
    </group>
  );
}

function FloatingPetals() {
  const petals = useMemo(() => {
    return Array.from({ length: 30 }, (_, i) => ({
      position: [
        (Math.random() - 0.5) * 12,
        (Math.random() - 0.5) * 10,
        (Math.random() - 0.5) * 4 - 2,
      ] as [number, number, number],
      speed: 0.3 + Math.random() * 0.6,
      scale: 0.06 + Math.random() * 0.1,
      id: i,
      color: i % 3 === 0 ? "#e8a0b4" : i % 3 === 1 ? "#f0c8d4" : "#d4a853",
    }));
  }, []);

  return (
    <>
      {petals.map((petal) => (
        <Float
          key={petal.id}
          speed={petal.speed}
          rotationIntensity={0.8}
          floatIntensity={2}
        >
          <mesh position={petal.position} scale={petal.scale}>
            <sphereGeometry args={[1, 6, 4]} />
            <MeshDistortMaterial
              color={petal.color}
              speed={1.5}
              distort={0.5}
              radius={1}
              transparent
              opacity={0.5}
            />
          </mesh>
        </Float>
      ))}
    </>
  );
}

function FloatingDiamond({ position }: { position: [number, number, number] }) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.01;
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.5) * 0.2;
    }
  });

  return (
    <Float speed={0.8} floatIntensity={1}>
      <mesh ref={meshRef} position={position} scale={0.15}>
        <octahedronGeometry args={[1, 0]} />
        <meshStandardMaterial
          color="#ffffff"
          metalness={0.1}
          roughness={0}
          transparent
          opacity={0.6}
          envMapIntensity={3}
        />
      </mesh>
    </Float>
  );
}

function GoldenParticleRing() {
  const pointsRef = useRef<THREE.Points>(null);

  const positions = useMemo(() => {
    const count = 200;
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const angle = (i / count) * Math.PI * 2;
      const radius = 3 + (Math.random() - 0.5) * 0.6;
      pos[i * 3] = Math.cos(angle) * radius;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 0.4;
      pos[i * 3 + 2] = Math.sin(angle) * radius;
    }
    return pos;
  }, []);

  useFrame((state) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y += 0.002;
      pointsRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.1) * 0.1;
    }
  });

  return (
    <points ref={pointsRef} position={[0, 0, -1]}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        color="#d4a853"
        size={0.03}
        transparent
        opacity={0.7}
        sizeAttenuation
      />
    </points>
  );
}

export default function WeddingScene() {
  return (
    <div className="absolute inset-0 z-0">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 45 }}
        gl={{ alpha: true, antialias: true }}
        style={{ background: "transparent" }}
      >
        <ambientLight intensity={0.4} />
        <directionalLight position={[5, 5, 5]} intensity={0.8} color="#ffecd2" />
        <pointLight position={[-3, 2, 3]} intensity={0.6} color="#e8a0b4" />
        <pointLight position={[3, -2, 2]} intensity={0.4} color="#d4a853" />
        <pointLight position={[0, 3, 1]} intensity={0.3} color="#fff5e6" />

        {/* Centered interlocked rings */}
        <InterlockedRings />

        {/* Floating accent rings */}
        <GoldenRing position={[-3.5, 1.8, -1]} rotation={[0.5, 0, 0.4]} scale={0.6} />
        <GoldenRing position={[3.2, -1.5, -1.5]} rotation={[-0.3, 0.5, -0.2]} scale={0.5} />

        {/* Diamonds */}
        <FloatingDiamond position={[2, 1.5, -0.5]} />
        <FloatingDiamond position={[-2.5, -1, -1]} />
        <FloatingDiamond position={[0, 2.5, -1]} />

        {/* Orbiting golden particle ring */}
        <GoldenParticleRing />

        {/* Petals */}
        <FloatingPetals />

        {/* Sparkles across the scene */}
        <Sparkles
          count={80}
          scale={10}
          size={1.5}
          speed={0.3}
          color="#d4a853"
          opacity={0.4}
        />
        <Sparkles
          count={40}
          scale={8}
          size={2}
          speed={0.2}
          color="#e8a0b4"
          opacity={0.3}
        />
      </Canvas>
    </div>
  );
}
