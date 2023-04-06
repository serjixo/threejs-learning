import {OrbitControls, useGLTF} from '@react-three/drei'
import {Perf} from 'r3f-perf'

export default function Experience() {

    /*const model = useLoader(GLTFLoader,
        './hamburger.glb')*/

    const model = useGLTF('./hamburger.glb')


    return <>

        <Perf position="top-left"/>

        <OrbitControls makeDefault/>

        <directionalLight castShadow position={[1, 2, 3]} intensity={1.5}/>
        <ambientLight intensity={0.5}/>

        {/*   <mesh castShadow position-x={ - 2 }>
            <sphereGeometry />
            <meshStandardMaterial color="orange" />
        </mesh>

        <mesh castShadow position-x={ 2 } scale={ 1.5 }>
            <boxGeometry />
            <meshStandardMaterial color="mediumpurple" />
        </mesh>
*/}
        <primitive object={model.scene} scale={0.1} castShadow/>
        <mesh receiveShadow position-y={-1} rotation-x={-Math.PI * 0.5} scale={10}>
            <planeGeometry/>
            <meshStandardMaterial color="greenyellow"/>
        </mesh>

    </>
}