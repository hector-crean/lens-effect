
import { useAspect, useTexture } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { useRef } from 'react';
import { Mesh, Vector2 } from 'three';

import Lesion02 from './assets/Lesion_02_Large_circular_focal_points.png';
import uvGrid from './assets/UVMap.png';

const PlaneLens = () => {

    const meshRef = useRef<Mesh>(null);


    const uvGridTexture = useTexture(uvGrid)
    const uMassTexture = useTexture(Lesion02)



    const scale = useAspect(uvGridTexture.image.width, uvGridTexture.image.height, 0.3)


    console.log(uMassTexture.image.width, uMassTexture.image.height)

    const uniforms = useRef({
        uTexture: { value: uvGridTexture },
        uMassTexture: { value: uMassTexture },
        uTextureSize: { value: new Vector2(uMassTexture.image.width, uMassTexture.image.height) }
    })

    useFrame(() => {

    })

    return (
        <mesh ref={meshRef} scale={scale}>
            {/* <planeGeometry args={[1, 1, 10, 10]} />
            <shaderMaterial
                wireframe={true}
                fragmentShader={fragment}
                vertexShader={vertex}
                uniforms={uniforms.current}
            /> */}
        </mesh>
    )
}

export { PlaneLens };

