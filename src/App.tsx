import { OrbitControls } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
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






