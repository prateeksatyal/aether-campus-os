// components/HoloAI.tsx
'use client'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { OrbitControls, Sparkles, Html } from '@react-three/drei'
import { Suspense, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { useVoiceControl } from '@/hooks/useVoiceControl'

const moods = {
  neutral: { color: '#00f3ff', ring: '#c084fc' },
  happy: { color: '#00f3ff', ring: '#00fbfc' },
  thinking: { color: '#ff2e63', ring: '#c084fc' },
  excited: { color: '#fff600', ring: '#ff2e63' },
}

export function HoloAI() {
  const [mood, setMood] = useState<keyof typeof moods>('neutral')
  const { isListening, transcript } = useVoiceControl({ onResult: msg => {
    if (/hi|hello|good/i.test(msg)) setMood('happy')
    else if (/score|grade|future/i.test(msg)) setMood('thinking')
    else setMood('neutral')
  }})

  return (
    <Canvas camera={{ position: [0, 0, 7], fov: 44 }}>
      <ambientLight intensity={0.33} />
      <pointLight position={[0, 2, 8]} color={moods[mood].color} intensity={2.2} />
      <GroupAI mood={mood} />
      <Sparkles count={50} scale={2.6} color={moods[mood].color} speed={1.22} />
      <OrbitControls enableZoom={false} minPolarAngle={Math.PI/2.9} maxPolarAngle={Math.PI/1.8} autoRotate autoRotateSpeed={1.1} enablePan={false} />
      {isListening && (
        <Html>
          <div className="px-5 py-2 mt-16 bg-[#14143cdd] text-[#00f3ff] font-bold rounded-2xl neon animate-pulse">
            Listening...
          </div>
        </Html>
      )}
      {transcript && (
        <Html>
          <motion.div
            className="px-4 py-1.5 mt-20 text-[#ff2e63] bg-black/45 backdrop-blur-md font-mono text-[1rem] rounded-xl shadow-lg border border-[#c084fc54]"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ type: 'spring', duration: 0.9 }}
          >{transcript}</motion.div>
        </Html>
      )}
    </Canvas>
  )
}

// Holographic being and rings
function GroupAI({ mood }: { mood: keyof typeof moods }) {
  const mesh = useRef<any>()
  const rings = useRef<any>([])
  useFrame(({ mouse }) => {
    // Sphere tracks pointer
    if (!mesh.current) return
    mesh.current.position.x = mouse.x * 1.5
    mesh.current.position.y = mouse.y * 0.7
    mesh.current.rotation.y = -mouse.x * 0.8
    mesh.current.rotation.x = -mouse.y * 0.5
    // Rings rotate/follow
    rings.current.forEach((ring: any, i: number) => {
      if (!ring) return
      ring.rotation.z += 0.008 + 0.001*i
      ring.position.x = Math.sin(Date.now()/900 + i)*0.22*i
      ring.position.y = Math.cos(Date.now()/1400 + i)*0.10*i
    })
  })

  return (
    <group>
      {/* Main holographic sphere */}
      <mesh ref={mesh}>
        <sphereGeometry args={[1.25, 64, 64]} />
        <meshPhysicalMaterial
          color={moods[mood].color}
          transmission={1}
          transparent
          opacity={0.97}
          roughness={0}
          clearcoat={0.7}
          clearcoatRoughness={0.04}
          thickness={1.5}
          ior={1.75}
          sheen={1}
          emissive={moods[mood].color}
          emissiveIntensity={0.19}
          envMapIntensity={2}
        />
      </mesh>
      {/* Energy rings */}
      {[...Array(3)].map((_,i)=>(
        <mesh
          key={i}
          ref={el=>{ rings.current[i]=el }}
          position={[0, 0, 0]}
          rotation={[i,0,0]}
        >
          <torusGeometry args={[1.32 + i*0.15, 0.05 + i*0.013, 24, 64]} />
          <meshStandardMaterial
            color={moods[mood].ring}
            transparent
            opacity={0.45 - i*0.1}
            emissive={moods[mood].ring}
            emissiveIntensity={2.6-i}
            wireframe
          />
        </mesh>
      ))}
      {/* Floating bits */}
      {[...Array(7)].map((_,i)=>(
        <mesh key={i} position={[
          Math.cos(i)*1.7, Math.sin(i * 2.1)*1.4, Math.sin(i)*0.37+0.1
        ]}>
          <sphereGeometry args={[0.13+Math.random()*0.06,24,24]} />
          <meshStandardMaterial color={['#00f3ff','#c084fc','#ff2e63'][i%3]} emissiveIntensity={1} emissive={['#00f3ff','#c084fc','#ff2e63'][i%3]} transparent opacity={0.87}/>
        </mesh>
      ))}
    </group>
  )
}
