import { useGLTF } from '@react-three/drei'
import * as THREE from 'three'
import { GLTF } from 'three-stdlib'

type GLTFResult = GLTF & {
    nodes: {
        Plane: THREE.Mesh
    }
    materials: {}
}

export function Model(props: JSX.IntrinsicElements['group']) {
    const { nodes, materials } = useGLTF('/mag-transformed.glb') as GLTFResult
    return (
        <group {...props} dispose={null}>
            <group name="Scene">
                <mesh
                    name="Plane"
                    castShadow
                    receiveShadow
                    geometry={nodes.Plane.geometry}
                    material={nodes.Plane.material}
                />
            </group>
        </group>
    )
}

useGLTF.preload('/mag-transformed.glb')
