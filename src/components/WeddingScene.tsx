import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Sparkles, MeshDistortMaterial } from "@react-three/drei";
import * as THREE from "three";

function WeddingRing({ position, rotation }: { position: [number, number, number]; rotation: [number, number, number] }) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = rotation[0] + Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
      meshRef.current.rotation.y += 0.005;
    }
  });

  return (
    <mesh ref={meshRef} position={position}>
      <torusGeometry args={[1, 0.15, 32, 100]} />
      <meshStandardMaterial
        color="#d4a853"
        metalness={0.9}
        roughness={0.1}
        envMapIntensity={1.5}
      />
    </mesh>
  );
}

function FloatingPetals() {
  const petals = useMemo(() => {
    return Array.from({ length: 20 }, (_, i) => ({
      position: [
        (Math.random() - 0.5) * 10,
        (Math.random() - 0.5) * 8,
        (Math.random() - 0.5) * 6,
      ] as [number, number, number],
      rotation: Math.random() * Math.PI * 2,
      speed: 0.2 + Math.random() * 0.5,
      scale: 0.1 + Math.random() * 0.15,
      id: i,
    }));
  }, []);

  return (
    <>
      {petals.map((petal) => (
        <Float
          key={petal.id}
          speed={petal.speed}
          rotationIntensity={0.5}
          floatIntensity={1.5}
        >
          <mesh position={petal.position} scale={petal.scale}>
            <sphereGeometry args={[1, 8, 6]} />
            <MeshDistortMaterial
              color="#e8a0b4"
              speed={2}
              distort={0.4}
              radius={1}
              transparent
              opacity={0.6}
            />
          </mesh>
        </Float>
      ))}
    </>
  );
}

function HeartShape() {
  const meshRef = useRef<THREE.Mesh>(null);

  const heartShape = useMemo(() => {
    const shape = new THREE.Shape();
    const x = 0, y = 0;
    shape.moveTo(x + 0.25, y + 0.25);
    shape.bezierCurveTo(x + 0.25, y + 0.25, x + 0.2, y, x, y);
    shape.bezierCurveTo(x - 0.3, y, x - 0.3, y + 0.35, x - 0.3, y + 0.35);
    shape.bezierCurveTo(x - 0.3, y + 0.55, x - 0.1, y + 0.77, x + 0.25, y + 0.95);
    shape.bezierCurveTo(x + 0.6, y + 0.77, x + 0.8, y + 0.55, x + 0.8, y + 0.35);
    shape.bezierCurveTo(x + 0.8, y + 0.35, x + 0.8, y, x + 0.5, y);
    shape.bezierCurveTo(x + 0.35, y, x + 0.25, y + 0.25, x + 0.25, y + 0.25);
    return shape;
  }, []);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.3) * 0.1;
      const s = 1 + Math.sin(state.clock.elapsedTime * 1.5) * 0.05;
      meshRef.current.scale.set(s, s, s);
    }
  });

  return (
    <Float speed={1} rotationIntensity={0.2} floatIntensity={0.5}>
      <mesh ref={meshRef} position={[0, 0.5, 0]} rotation={[0, 0, Math.PI]}>
        <extrudeGeometry args={[heartShape, { depth: 0.2, bevelEnabled: true, bevelThickness: 0.05, bevelSize: 0.05, bevelSegments: 3 }]} />
        <meshStandardMaterial
          color="#c97d8f"
          metalness={0.3}
          roughness={0.4}
          transparent
          opacity={0.8}
        />
      </mesh>
    </Float>
  );
}

export default function WeddingScene() {
  return (
    <div className="absolute inset-0 z-0">
      <Canvas
        camera={{ position: [0, 0, 6], fov: 50 }}
        gl={{ alpha: true, antialias: true }}
        style={{ background: "transparent" }}
      >
        <ambientLight intensity={0.6} />
        <directionalLight position={[5, 5, 5]} intensity={1} color="#ffecd2" />
        <pointLight position={[-3, 2, 3]} intensity={0.8} color="#e8a0b4" />
        <pointLight position={[3, -2, 2]} intensity={0.5} color="#d4a853" />

        <WeddingRing position={[-1.2, 0.3, 0]} rotation={[0.3, 0, 0.2]} />
        <WeddingRing position={[0.8, 0.1, -0.3]} rotation={[-0.2, 0.5, -0.1]} />

        <HeartShape />
        <FloatingPetals />

        <Sparkles
          count={60}
          scale={8}
          size={2}
          speed={0.4}
          color="#d4a853"
          opacity={0.5}
        />
      </Canvas>
    </div>
  );
}
