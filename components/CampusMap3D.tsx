// components/CampusMap3D.tsx
'use client'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Html } from '@react-three/drei'
import { Suspense, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const campusBuildings = [
  { name: 'Main Building', color: '#00f3ff', x: 0, z: 0, info: 'CS101 now: Algorithms with Dr. Rai' },
  { name: 'Library', color: '#c084fc', x: -2.2, z: 1.8, info: '10 students studying' },
  { name: 'Cafeteria', color: '#ff2e63', x: 2.6, z: 2.1, info: 'Lunch: Mo:Mo today' },
  { name: 'Sports', color: '#ff2e63', x: 1.5, z: -2.2, info: 'Basketball, Table Tennis' },
]
const studentAvatars = [
  { x: 0.4, z: 0.6 }, {x: -1.9, z:1.5}, {x:2.5, z:2.6},
  {x:1.7, z:-2.0}, {x:-2.1, z:2.4}
]

export function CampusMap3D() {
  return (
    <Canvas camera={{ position: [0, 7, 7], fov: 48 }}>
      <ambientLight intensity={0.32} />
      <spotLight position={[6,20,12]} intensity={0.94} />
      <MainCampus />
      <OrbitControls autoRotate autoRotateSpeed={1.18} enablePan={false} enableZoom={false} minPolarAngle={Math.PI/3} maxPolarAngle={Math.PI/2} />
    </Canvas>
  )
}

function MainCampus() {
  const [hovered, setHovered] = useState<number|null>(null)
  const meshRefs = useRef<Array<any>>([])
  // Animate bounce when hovered
  useFrame(() => {
    meshRefs.current.forEach((ref,i) => {
      if (ref) {
        ref.position.y = hovered===i ? 0.42+Math.abs(Math.sin(Date.now()/240))*.33 : 0.24
      }
    })
  })
  return (
    <group>
      <mesh receiveShadow position={[0,-.5,0]}>
        <boxGeometry args={[10,0.4,10]} />
        <meshStandardMaterial color="#181826" />
      </mesh>
      {/* Buildings */}
      {campusBuildings.map((b, i) => (
        <mesh
          key={b.name}
          ref={(el)=>meshRefs.current[i]=el}
          position={[b.x, 0.24, b.z]}
          scale={hovered===i?[1.13,1.07,1.13]:[1,1,1]}
          onPointerOver={()=>setHovered(i)}
          onPointerOut={()=>setHovered(null)}
        >
          <boxGeometry args={[1.35, 1.15, 1.35]} />
          <meshStandardMaterial
            color={b.color}
            emissive={b.color}
            emissiveIntensity={hovered===i?1.5:0.66}
            opacity={0.8}
            transparent
            wireframe
          />
          {hovered===i && (
            <Html center distanceFactor={7}>
              <BuildingInfo name={b.name} info={b.info}/>
            </Html>
          )}
        </mesh>
      ))}
      {/* Student avatars: floating glowing spheres */}
      {studentAvatars.map((s,i)=>(
        <mesh key={i} position={[s.x, 0.95 + Math.sin((Date.now()/400)+Math.PI*i/2)*0.14, s.z]}>
          <sphereGeometry args={[0.21,20,20]}/>
          <meshPhysicalMaterial color={['#00f3ff','#c084fc','#ff2e63'][i%3]} opacity={0.86} emissiveIntensity={1.1} clearcoat={0.7} transparent />
        </mesh>
      ))}
    </group>
  )
}

function BuildingInfo({name,info}:{name:string,info:string}) {
  return (
    <motion.div
      initial={{y:20, opacity:0}}
      animate={{y:0, opacity:1}}
      exit={{opacity:0}}
      transition={{ type:'spring', duration:0.55 }}
      className="rounded-xl px-5 py-3 bg-[#28283c]/95 font-semibold shadow-xl border-2 border-[#00f3ff66] text-[#00f3ff] neon text-lg"
    >
      <div>{name}</div>
      <div className="text-xs text-[#fff] font-mono opacity-75">{info}</div>
    </motion.div>
  )
}
