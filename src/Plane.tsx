
import { useAspect, useTexture } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { useRef } from 'react';
import { Mesh, Vector2 } from 'three';

import { useControls } from 'leva';
import amsler_grid from './assets/asmler_grid.jpg';
import girl_with_peal from './assets/girl_with_peal.jpg';
import Lesion02 from './assets/Lesion_02_Large_circular_focal_points.png';
import { fragment, vertex } from './PlaneShader';

const PlaneLens = () => {

    const {
        theta1,
        theta2,
        A1,
        A2,
        psi1,
        psi2,
        B1,
        B2
    } = useControls({
        theta1: {
            value: 0.1,
            min: 0,
            max: 10,
            step: 0.1,
        },
        theta2: {
            value: 0.1,
            min: 0,
            max: 10,
            step: 0.1,
        },
        A1: {
            value: 0.01,
            min: 0,
            max: 1,
            step: 0.1,
        },
        A2: {
            value: 0.01,
            min: 0,
            max: 1,
            step: 0.1,
        },
        psi1: {
            value: 0.1,
            min: 0,
            max: 10,
            step: 0.1,
        },
        psi2: {
            value: 0.1,
            min: 0,
            max: 10,
            step: 0.1,
        },
        B1: {
            value: 0.01,
            min: 0,
            max: 1,
            step: 0.1,
        },
        B2: {
            value: 0.01,
            min: 0,
            max: 1,
            step: 0.1,
        }
    })

    const meshRef = useRef<Mesh>(null);


    const uvGridTexture = useTexture(amsler_grid)
    const lesionTexture = useTexture(Lesion02)
    const backgroud = useTexture(girl_with_peal)



    const scale = useAspect(uvGridTexture.image.width, uvGridTexture.image.height, 0.3)


    const numCenters = 3; // Example number of centers
    const centers = [
        new Vector2(0.0, 0.0),
        new Vector2(1.0, 1.0),
        new Vector2(-1.0, -1.0)
    ];
    const lesion1 = {
        center: new Vector2(0.2, 0.2),
        k1: 0.1,
        k2: 0.2,
        k3: 0.3
    }
    const lesion2 = {
        center: new Vector2(0.5, 0.3),
        k1: 0.1,
        k2: 4,
        k3: 0.3
    }
    const lesion3 = {
        center: new Vector2(0.8, 0.2),
        k1: 0.1,
        k2: 0.2,
        k3: 0.3
    }

    const uniforms = useRef({
        uMask: { value: lesionTexture },
        uDiffuse: { value: backgroud },
        theta1: { value: theta1 },
        theta2: { value: theta2 },
        A1: { value: A1 },
        A2: { value: A2 },
        psi1: { value: psi1 },
        psi2: { value: psi2 },
        B1: { value: B1 },
        B2: { value: B2 },

    })

    useFrame(() => {
        if (meshRef.current) {
            meshRef.current.material.uniforms.theta1.value = theta1;
            meshRef.current.material.uniforms.theta2.value = theta2;
            meshRef.current.material.uniforms.A1.value = A1;
            meshRef.current.material.uniforms.A2.value = A2;
            meshRef.current.material.uniforms.psi1.value = psi1;
            meshRef.current.material.uniforms.psi2.value = psi2;
            meshRef.current.material.uniforms.B1.value = B1;
            meshRef.current.material.uniforms.B2.value = B2;


        }

    })

    return (
        <mesh ref={meshRef} scale={scale}>
            <planeGeometry args={[1, 1, 10, 10]} />
            <shaderMaterial
                wireframe={false}
                fragmentShader={fragment}
                vertexShader={vertex}
                uniforms={uniforms.current}
            />
        </mesh>
    )
}

export { PlaneLens };

