import {useGLTF} from "@react-three/drei";

export default function MacbookModel(props) {
    const {nodes, materials} = useGLTF("./models/macbook.gltf");
    return (

        <group {...props} dispose={null}>
            <group position={[0, 0.52, 0]} scale={0.1}>
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Circle001.geometry}
                    material={materials["Frame.001"]}
                />
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Circle001_1.geometry}
                    material={materials["Frame.001"]}
                />
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Circle001_2.geometry}
                    material={materials.HeadPhoneHole}
                />
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Circle001_3.geometry}
                    material={materials.USB_C_INSIDE}
                />
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Circle001_4.geometry}
                    material={materials["Frame.001"]}
                />
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Circle001_5.geometry}
                    material={materials.TouchbarBorder}
                />
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Circle001_6.geometry}
                    material={materials.Keyboard}
                />
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.FrontCameraRing001.geometry}
                    material={materials["CameraRIngBlack.002"]}
                    position={[-0.15, 19.57, -16.15]}
                    scale={5.8}
                />
                <group position={[0, -0.51, 0]} scale={5.8}>
                    <mesh
                        castShadow
                        receiveShadow
                        geometry={nodes.Circle006.geometry}
                        material={materials["Frame.001"]}
                    />
                    <mesh
                        castShadow
                        receiveShadow
                        geometry={nodes.Circle006_1.geometry}
                        material={materials.USB_C_INSIDE}
                    />
                </group>
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.KeyboardKeyHole.geometry}
                    material={materials["Keyboard.001"]}
                    position={[-11.79, -0.15, -8.3]}
                    scale={5.8}
                />
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.RubberFoot.geometry}
                    material={materials.DarkRubber}
                    position={[-11.95, -0.75, 7.86]}
                    scale={5.8}
                />
                <group position={[0.01, -0.21, -10.56]} scale={5.8}>
                    <mesh
                        castShadow
                        receiveShadow
                        geometry={nodes.Circle012.geometry}
                        material={materials.HingeBlack}
                    />
                    <mesh
                        castShadow
                        receiveShadow
                        geometry={nodes.Circle012_1.geometry}
                        material={materials.HingeMetal}
                    />
                </group>
                <group position={[-11.79, -0.15, -8.3]} scale={5.8}>
                    <mesh
                        castShadow
                        receiveShadow
                        geometry={nodes.Circle.geometry}
                        material={materials["Keyboard.001"]}
                    />
                    <mesh
                        castShadow
                        receiveShadow
                        geometry={nodes.Circle_1.geometry}
                        material={materials.Key}
                    />
                    <mesh
                        castShadow
                        receiveShadow
                        geometry={nodes.Circle_2.geometry}
                        material={materials.Touchbar}
                    />
                </group>
                <group
                    position={[0.01, -0.47, -10.41]}
                    rotation={[1.31, 0, 0]}
                    scale={5.8}
                >
                    <mesh
                        castShadow
                        receiveShadow
                        geometry={nodes.Circle002.geometry}
                        material={materials["Frame.001"]}
                    />
                    <mesh
                        castShadow
                        receiveShadow
                        geometry={nodes.Circle002_1.geometry}
                        material={materials.Screen}
                    />
                    <mesh
                        castShadow
                        receiveShadow
                        geometry={nodes.Circle002_2.geometry}
                        material={materials.ScreenGlass}
                    />
                    <mesh
                        castShadow
                        receiveShadow
                        geometry={nodes.Circle002_3.geometry}
                        material={materials.Rubber}
                    />
                    <mesh
                        castShadow
                        receiveShadow
                        geometry={nodes.Circle002_4.geometry}
                        material={materials.DisplayGlass}
                    />
                    <mesh
                        castShadow
                        receiveShadow
                        geometry={nodes.AppleLogo000.geometry}
                        material={materials["AppleLogo.004"]}
                        position={[0, -0.11, -1.8]}
                        rotation={[-Math.PI, 0, -Math.PI]}
                        scale={0.58}
                    />
                </group>
                <group position={[12.2, 0.03, 0.6]} scale={5.8}>
                    <mesh
                        castShadow
                        receiveShadow
                        geometry={nodes.Circle003.geometry}
                        material={materials["Frame.001"]}
                    />
                    <mesh
                        castShadow
                        receiveShadow
                        geometry={nodes.Circle003_1.geometry}
                        material={materials.SpeakerHole}
                    />
                </group>
                <group position={[-15.03, 0.03, 0.6]} scale={5.8}>
                    <mesh
                        castShadow
                        receiveShadow
                        geometry={nodes.Circle009.geometry}
                        material={materials["Frame.001"]}
                    />
                    <mesh
                        castShadow
                        receiveShadow
                        geometry={nodes.Circle009_1.geometry}
                        material={materials.SpeakerHole}
                    />
                </group>
            </group>
        </group>
    );
}

useGLTF.preload("/macbook.gltf")


