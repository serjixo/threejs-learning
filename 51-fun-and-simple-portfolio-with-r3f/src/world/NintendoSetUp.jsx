import {useGLTF} from "@react-three/drei";

export default function NintendoSetUp(props) {
    const {nodes, materials} = useGLTF("./models/nesSetUp.glb");
    return (
        <group {...props} dispose={null}>
            <group position={[0, 0.39, 0]}>
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Plane016.geometry}
                    material={materials["Material.026"]}
                />
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Plane016_1.geometry}
                    material={materials["Material.028"]}
                />
                <group scale={0.21}>
                    <mesh
                        castShadow
                        receiveShadow
                        geometry={nodes.Circle021.geometry}
                        material={materials["Material.030"]}
                    />
                    <mesh
                        castShadow
                        receiveShadow
                        geometry={nodes.Circle021_1.geometry}
                        material={materials["Material.029"]}
                    />
                </group>
                <group scale={0.21}>
                    <mesh
                        castShadow
                        receiveShadow
                        geometry={nodes.Circle020.geometry}
                        material={materials["Material.031"]}
                    />
                    <mesh
                        castShadow
                        receiveShadow
                        geometry={nodes.Circle020_1.geometry}
                        material={materials["Material.030"]}
                    />
                </group>
                <group
                    position={[-0.16, -0.16, -0.63]}
                    rotation={[0, 1.57, 0]}
                    scale={0.21}
                >
                    <mesh
                        castShadow
                        receiveShadow
                        geometry={nodes.Circle000.geometry}
                        material={materials["Material.030"]}
                    />
                    <mesh
                        castShadow
                        receiveShadow
                        geometry={nodes.Circle000_1.geometry}
                        material={materials["Material.028"]}
                    />
                </group>
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.black_back_grill.geometry}
                    material={materials["Material.027"]}
                    position={[-0.03, 0.18, -0.62]}
                    scale={[0.15, 0.18, 0.13]}
                />
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.black_front_grill.geometry}
                    material={materials["Material.027"]}
                    scale={0.21}
                />
                <group scale={0.21}>
                    <mesh
                        castShadow
                        receiveShadow
                        geometry={nodes.Plane026.geometry}
                        material={materials["Material.026"]}
                    />
                    <mesh
                        castShadow
                        receiveShadow
                        geometry={nodes.Plane026_1.geometry}
                        material={materials["Material.027"]}
                    />
                </group>
                <group position={[-0.03, -0.32, -0.82]} scale={[0.16, 0.18, 0.13]}>
                    <mesh
                        castShadow
                        receiveShadow
                        geometry={nodes.Cube011.geometry}
                        material={materials["Material.026"]}
                    />
                    <mesh
                        castShadow
                        receiveShadow
                        geometry={nodes.Cube011_1.geometry}
                        material={materials["Material.028"]}
                    />
                    <mesh
                        castShadow
                        receiveShadow
                        geometry={nodes.Cube011_2.geometry}
                        material={materials["Material.027"]}
                    />
                </group>
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.game_lid.geometry}
                    material={materials["Material.028"]}
                    scale={0.21}
                />
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Plane007.geometry}
                    material={materials["Material.027"]}
                    position={[-0.01, -0.14, -0.59]}
                    rotation={[Math.PI / 2, -Math.PI / 2, 0]}
                    scale={[0.02, 0.01, 0.02]}
                />
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Plane008.geometry}
                    material={materials["Material.027"]}
                    position={[-0.16, -0.17, -0.44]}
                    rotation={[Math.PI / 2, 0, -Math.PI / 2]}
                    scale={[0.1, 0.12, 0.12]}
                />
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Power_Button.geometry}
                    material={materials["Material.026"]}
                    scale={0.21}
                />
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.reset_Button.geometry}
                    material={materials["Material.026"]}
                    scale={0.21}
                />
            </group>
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.Cube.geometry}
                material={materials["Material.026"]}
                position={[-0.33, 0.04, 1.84]}
                rotation={[0, 0, -Math.PI]}
                scale={[-0.55, -0.12, -0.8]}
            />
            <group position={[-0.87, 0.18, 3.17]}>
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Plane030.geometry}
                    material={materials["Material.033"]}
                />
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Plane030_1.geometry}
                    material={materials["Material.032"]}
                />
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.BezierCurve.geometry}
                    material={materials["Material.035"]}
                    position={[0.08, 0.08, -0.14]}
                />
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Cube002.geometry}
                    material={materials["Material.035"]}
                    position={[0.71, -0.63, -0.22]}
                    rotation={[0, 0, 1.55]}
                />
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Cylinder002.geometry}
                    material={materials["Material.034"]}
                />
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Plane009.geometry}
                    material={materials["Material.035"]}
                />
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Plane010.geometry}
                    material={materials["Material.035"]}
                />
            </group>
        </group>
    );
}