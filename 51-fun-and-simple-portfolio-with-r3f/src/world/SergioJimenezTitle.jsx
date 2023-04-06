import {Text3D} from "@react-three/drei";
import {environmentVariables} from "../utils/environmentVariables.js";
import React from "react";

export default function SergiojimenezTitle() {
    return (
        <>
            <Text3D font={'./fonts/noto-sans-regular.json'} position={[1.8, 2.3, -0.5]}
                    rotation={[0, -Math.PI * 0.5, 0]}>
                Sergio
                <meshNormalMaterial color={environmentVariables.colors.primary}/>
            </Text3D>
            <Text3D font={'./fonts/noto-sans-regular.json'} position={[1.8, 1, -0.5]} rotation={[0, -Math.PI * 0.5, 0]}>
                Jimenez
                <meshNormalMaterial color={environmentVariables.colors.primary}/>
            </Text3D>
        </>
    )
}