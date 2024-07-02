import { Float, MeshTransmissionMaterial, OrbitControls, useFBO, useGLTF } from '@react-three/drei'
import { Canvas, createPortal, useFrame, useThree } from '@react-three/fiber'
import { easing } from 'maath'
import { useRef, useState } from 'react'
import * as THREE from 'three'
import { PlaneLens } from './Plane'







export default function App() {
  return (
    <Canvas camera={{ position: [0, 0, 20], fov: 15 }}>
      <ambientLight intensity={0.7} />
      <PlaneLens />
      <OrbitControls
        makeDefault
        minPolarAngle={Math.PI / 2}
        maxPolarAngle={Math.PI / 2}
        minAzimuthAngle={0}
        maxAzimuthAngle={0}
        enablePan={false}
        enableZoom={true}
      />    </Canvas>
  )
}






function Model({ name, floatIntensity = 10, ...props }) {
  const { nodes } = useGLTF('/ao_shapes.glb')
  return (
    <Float {...props} rotationIntensity={2} floatIntensity={floatIntensity} speed={1}>
      <mesh geometry={nodes[name].geometry} material={nodes[name].material} rotation={[Math.PI / 2, 0, 0]} />
    </Float>
  )
}


function Lens({ children, damping = 0.15, ...props }) {
  const ref = useRef()
  const { nodes } = useGLTF('/rory-lens.glb')
  const buffer = useFBO()
  const viewport = useThree((state) => state.viewport)
  const [scene] = useState(() => new THREE.Scene())
  useFrame((state, delta) => {
    // Tie lens to the pointer
    // getCurrentViewport gives us the width & height that would fill the screen in threejs units
    // By giving it a target coordinate we can offset these bounds, for instance width/height for a plane that
    // sits 15 units from 0/0/0 towards the camera (which is where the lens is)
    const viewport = state.viewport.getCurrentViewport(state.camera, [0, 0, 15])
    easing.damp3(
      ref.current.position,
      [(state.pointer.x * viewport.width) / 2, (state.pointer.y * viewport.height) / 2, 15],
      damping,
      delta
    )
    // This is entirely optional but spares us one extra render of the scene
    // The createPortal below will mount the children of <Lens> into the new THREE.Scene above
    // The following code will render that scene into a buffer, whose texture will then be fed into
    // a plane spanning the full screen and the lens transmission material
    state.gl.setRenderTarget(buffer)
    state.gl.setClearColor('#d8d7d7')
    state.gl.render(scene, state.camera)
    state.gl.setRenderTarget(null)
  })
  return (
    <>
      {createPortal(children, scene)}
      <mesh scale={[viewport.width, viewport.height, 1]}>
        <planeGeometry />
        <meshBasicMaterial map={buffer.texture} />
      </mesh>
      <mesh scale={[0.2, 0.2, 0.005]} ref={ref} rotation-x={0} geometry={nodes.Sphere001.geometry} {...props}>
        <MeshTransmissionMaterial buffer={buffer.texture} ior={1.2} thickness={10} anisotropy={0.1} chromaticAberration={0.04} />
      </mesh>
    </>
  )
}

