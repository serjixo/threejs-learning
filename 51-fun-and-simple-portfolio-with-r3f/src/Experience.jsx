import {Center, OrbitControls, Text3D} from '@react-three/drei'
import {environmentVariables} from "./utils/environmentVariables.js";
import React from "react";
import MacbookModel from "./world/MacbookModel.jsx";
import SergioJimenezTitle from "./world/SergioJimenezTitle.jsx";
import NintendoSetUp from "./world/NintendoSetUp.jsx";



export default function Experience() {
    return <>
        <directionalLight/>
        <ambientLight/>
        <color args={[environmentVariables.colors.fifth]} attach={'background'}/>
        <OrbitControls makeDefault/>

        <Center>
            <MacbookModel/>
            {/*<NintendoSetUp/>*/}
            <SergioJimenezTitle/>
        </Center>


        {/*<mesh>*/}
        {/*    <boxGeometry/>*/}
        {/*    <meshStandardMaterial color={environmentVariables.colors.primary}/>*/}
        {/*</mesh>*/}

    </>;
}