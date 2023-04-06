import './App.css'
import {Perf} from "r3f-perf";
import {Center, OrbitControls} from "@react-three/drei";
import SergioJimenezText from "./SergioJimenezText.jsx";
import Donut from "./Donut.jsx";
import {torus} from "./geometry/torus.js";


function Experience() {

    const numberOfDonuts = new Array(100).fill(undefined);

    return (
        <>
            <Perf position={'top-left'}/>
            <OrbitControls/>
            <directionalLight castShadow position={[1, 2, 3]} intensity={1.5}/>
            <ambientLight/>
            <Center>
                <SergioJimenezText/>
            </Center>
            {numberOfDonuts.map((el, id) => <Donut
                material={torus}
                key={id}
                position={[
                    (Math.random() - 0.5) * 10,
                    (Math.random() - 0.5) * 10,
                    (Math.random() - 0.5) * 10
                ]}
                scale={(Math.random() + 0.2) * 0.5}
                rotation={[
                    Math.random() * Math.PI,
                    Math.random() * Math.PI,
                    0
                ]}
            />)}
            {/*<Donut/>*/}

        </>
    )
}

export default Experience
