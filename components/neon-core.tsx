"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { AdaptiveDpr, PerformanceMonitor } from "@react-three/drei";
import { motion, useReducedMotion } from "motion/react";
import { useEffect, useRef, useState, type MutableRefObject } from "react";
import { Group, MathUtils, Mesh, Vector3 } from "three";

function Sculpture({ position }: { position: MutableRefObject<{ x: number; y: number }> }) {
  const assembly = useRef<Group>(null);
  const core = useRef<Mesh>(null);
  const orbitalGroups = useRef<(Group | null)[]>([]);
  const scroll = useRef(0);
  useEffect(() => {
    const hero = document.getElementById("inicio");
    const read = () => {
      const runway = Math.max(260, (hero?.clientHeight || window.innerHeight) - window.innerHeight + 72);
      scroll.current = MathUtils.clamp(window.scrollY / runway, 0, 1);
    };
    window.addEventListener("scroll", read, { passive: true });
    window.addEventListener("resize", read);
    read();
    return () => {
      window.removeEventListener("scroll", read);
      window.removeEventListener("resize", read);
    };
  }, []);

  useFrame(({ clock, camera }, delta) => {
    if (!assembly.current || !core.current) return;
    const progress = scroll.current;
    assembly.current.rotation.x = MathUtils.damp(assembly.current.rotation.x, position.current.y * .2 - .12 + progress * .55, 6, delta);
    assembly.current.rotation.y = MathUtils.damp(assembly.current.rotation.y, position.current.x * .28 + progress * 1.55, 6, delta);
    assembly.current.position.y = Math.sin(clock.elapsedTime * .65) * .065 + progress * .16;
    core.current.rotation.y = MathUtils.damp(core.current.rotation.y, .55 + progress * 1.75, 6, delta);
    core.current.rotation.z = MathUtils.damp(core.current.rotation.z, .1 + progress * .4, 6, delta);
    camera.position.z = MathUtils.damp(camera.position.z, 9.5 - progress * 1.1, 6, delta);
    orbitalGroups.current.forEach((ring, index) => {
      if (!ring) return;
      ring.position.z = MathUtils.damp(ring.position.z, (index - 1) * progress * .82, 6, delta);
      ring.rotation.z += delta * (.08 + index * .025);
    });
  });

  const rings = [
    { radius: 2.18, rotation: [0.42, 0.55, 0.5], color: "#00a3ff" },
    { radius: 2.40, rotation: [-0.64, 0.68, -0.54], color: "#416bff" },
    { radius: 2.62, rotation: [0.83, -0.28, 0.2], color: "#69dfff" },
  ] as const;

  return <group ref={assembly}>
    <mesh ref={core} rotation={[0.35, 0.55, 0.1]}>
      <icosahedronGeometry args={[1.34, 0]} />
      <meshPhysicalMaterial color="#0d3897" roughness={0.23} metalness={0.57} clearcoat={0.8} emissive="#051c61" emissiveIntensity={0.48} flatShading />
      <mesh scale={1.018}><icosahedronGeometry args={[1.34, 0]} /><meshBasicMaterial color="#62ccff" transparent opacity={0.68} wireframe /></mesh>
    </mesh>
    {rings.map(({ radius, rotation, color }, index) => <group key={radius} rotation={rotation}
      ref={(node) => { orbitalGroups.current[index] = node; }}>
      <mesh>
        <torusGeometry args={[radius, 0.026, 8, 96]} />
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.58} metalness={0.75} roughness={0.25} />
      </mesh>
      {[0.35, 2.6, 4.55].map((angle) => <mesh key={angle} position={new Vector3(radius * Math.cos(angle), radius * Math.sin(angle), 0)}>
        <sphereGeometry args={[0.065, 8, 8]} /><meshBasicMaterial color={color} />
      </mesh>)}
    </group>)}
  </group>;
}

function ContextLossHandler({ onError }: { onError: () => void }) {
  const canvas = useThree((state) => state.gl.domElement);
  useEffect(() => {
    canvas.addEventListener("webglcontextlost", onError, { once: true });
    return () => canvas.removeEventListener("webglcontextlost", onError);
  }, [canvas, onError]);
  return null;
}

export default function NeonCore({ onError }: { onError: () => void }) {
  const position = useRef({ x: 0, y: 0 });
  const [dpr, setDpr] = useState(1.35);
  const reduced = useReducedMotion();
  return <motion.div className="canvas-wrap" initial={reduced ? false : { opacity: 0 }}
    animate={{ opacity: 1 }} transition={{ duration: 0.25 }} onPointerMove={(event) => {
    const box = event.currentTarget.getBoundingClientRect();
    position.current = { x: ((event.clientX - box.left) / box.width) * 2 - 1, y: ((event.clientY - box.top) / box.height) * 2 - 1 };
  }} onPointerLeave={() => { position.current = { x: 0, y: 0 }; }}>
    <Canvas dpr={dpr} camera={{ position: [0, 0, 9.5], fov: 40 }} gl={{ alpha: true, antialias: true }}
      fallback={<span />}>
      <ContextLossHandler onError={onError} />
      <PerformanceMonitor onDecline={() => setDpr(1)} onFallback={() => setDpr(1)} />
      <AdaptiveDpr />
      <ambientLight intensity={0.78} color="#8ebfff" />
      <pointLight position={[1, 4, 5]} color="#0066ff" intensity={85} />
      <pointLight position={[-4, -2, 3]} color="#00d4ff" intensity={55} />
      <directionalLight position={[3, -4, 3]} color="#cae9ff" intensity={1.6} />
      <Sculpture position={position} />
    </Canvas>
  </motion.div>;
}
