import React, {useRef} from "react";
import {useFrame} from "@react-three/fiber";
import Floor from "./world/Floor.jsx";
import CustomObjectTemplate from "../CustomObjectTemplate.jsx";
import {OrbitControls, PivotControls} from "@react-three/drei";
import {useControls} from "leva";
import {Perf} from "r3f-perf";


export default function Experience() {
    const boxRef = useRef();
    const sphereRef = useRef();

    const {performanceToolVisible} = useControls({
        performanceToolVisible: false
    })

    const {position, color} = useControls({
        position: {
            value: {x: -2, y: 0},
            step: 0.1,
            joystick: 'invertY'
        },
        color: '#ff829e'
    })
    console.log(position)

    useFrame((state, delta) =>
        boxRef.current.rotation.y += delta
    )

    return (
        <>
            {performanceToolVisible && <Perf position='top-left'/>}
            <OrbitControls makeDefault/>
            <directionalLight castShadow position={[1, 2, 3]} intensity={1.5}/>
            <ambientLight position={[2, 2, 3]} intensity={0.5}/>
            {/*<CustomObjectTemplate/>*/}

            <PivotControls anchor={[0, 0, 0]}>
                <mesh ref={sphereRef} position={[position.x, position.y, 0]} castShadow>
                    <sphereGeometry/>
                    <meshStandardMaterial color={color}/>
                </mesh>
            </PivotControls>
            {/*<TransformControls object={sphereRef} mode={'translate'}/>*/}

            <mesh ref={boxRef} position-x={2} castShadow>
                <boxGeometry/>
                <meshStandardMaterial color={'#bafd66'}/>
            </mesh>
            <Floor/>
        </>
    )
}