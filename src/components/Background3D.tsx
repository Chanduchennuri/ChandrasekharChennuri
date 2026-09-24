import { useMemo, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { lorenz } from '@/lib/lorenz'

function Attractor() {
  const g = useRef<THREE.Group>(null)
  const line = useMemo(() => {
    const geo = new THREE.BufferGeometry().setAttribute('position', new THREE.BufferAttribute(lorenz(), 3))
    return new THREE.Line(geo, new THREE.LineBasicMaterial({ color: '#ffffff', transparent: true, opacity: 0.2 }))
  }, [])
  useFrame(({ pointer }, dt) => {
    if (!g.current) return
    g.current.rotation.y += dt * 0.08
    g.current.rotation.x += (pointer.y * 0.25 - g.current.rotation.x) * 0.02
  })
  return <group ref={g} scale={0.09}><primitive object={line} /></group>
}
/** Fixed, low-opacity, non-interactive Lorenz strange attractor as ambient background. */
export default function Background3D() {
  return (
    <div className="pointer-events-none fixed bottom-[-10%] right-[-8%] h-[80vh] w-[80vh] opacity-70">
      <Canvas camera={{ position: [0, 0, 6], fov: 50 }} dpr={[1, 1.5]} gl={{ alpha: true }}><Attractor /></Canvas>
    </div>
  )
}
