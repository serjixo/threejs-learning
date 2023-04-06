import {OrbitControls} from '@react-three/drei'
import {Perf} from 'r3f-perf'
import {Debug, Physics, RigidBody} from "@react-three/rapier";
import {useRef, useState} from "react";
import {useFrame} from "@react-three/fiber";
import * as THREE from 'three'

export default function Experience() {

    const [audio, setAudio] = useState(() => new Audio('./hit.mp3'));
    console.log(audio)
    const cube = useRef();
    const twister = useRef();

    const cubeJump = () => {
        cube.current.applyImpulse({x: 0, y: 6, z: 0})
        cube.current.applyTorqueImpulse({
            x: Math.random() - 0.5,
            y: Math.random() - 0.5,
            z: Math.random() - 0.5
        })
    }

    const onCollisionEnter = () => {
        console.log('called collision')
        audio.volume = Math.random()
        audio.reset
        audio.play()
    }
    useFrame((state, delta) => {

        const time = state.clock.getElapsedTime()

        const eulerRotation = new THREE.Euler(0, time * 3, 0)
        const quartenion = new THREE.Quaternion()
        quartenion.setFromEuler(eulerRotation)
        twister.current.setNextKinematicRotation(quartenion)

        const angle = time
        const x = Math.cos(angle)
        const z = Math.sin(angle)
        twister.current.setNextKinematicTranslation({x, y: -0.8, z})

    })

    return <>
        <color args={['black']} attach={'background'}/>
        <Perf position="top-left"/>

        <OrbitControls makeDefault/>

        <directionalLight castShadow position={[1, 2, 3]} intensity={1.5}/>
        <ambientLight intensity={0.5}/>
        <Physics gravity={[0, -9.8, 0]}>
            <Debug/>
            <RigidBody
                position={[0, -0.8, 0]}
                friction={0}
                type={'kinematicPosition'}
                ref={twister}
                onCollisionEnter={onCollisionEnter}
            >
                <mesh castShadow scale={[0.4, 0.4, 3]}>
                    <boxGeometry/>
                    <meshStandardMaterial color={'#bada55'}/>
                </mesh>
            </RigidBody>
            <RigidBody colliders={'ball'}>
                <mesh castShadow position={[-2, 2, 0]}>
                    <sphereGeometry/>
                    <meshStandardMaterial color="orange"/>
                </mesh>
            </RigidBody>
            <RigidBody
                ref={cube}
                onClick={cubeJump}
                restitution={1}
                friction={0.3}
            >
                <mesh castShadow position={[2, 2, 0]}>
                    <boxGeometry/>
                    <meshStandardMaterial color="mediumpurple"/>
                </mesh>
            </RigidBody>

            <RigidBody type={'fixed'}>
                <mesh receiveShadow position-y={-1.25}>
                    <boxGeometry args={[10, 0.5, 10]}/>
                    <meshStandardMaterial color="greenyellow"/>
                </mesh>
            </RigidBody>

        </Physics>

    </>
}