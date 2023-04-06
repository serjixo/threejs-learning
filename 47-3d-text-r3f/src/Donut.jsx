import {useMatcapTexture} from "@react-three/drei";

export default function Donut(props) {

    let [matcapTexture] = useMatcapTexture('5A492B_DEC583_987D4D_AC9C74', 256);

    return (
        <mesh{...props} >
            {/*<torusGeometry/>*/}
            <meshMatcapMaterial matcap={matcapTexture}/>
        </mesh>
    )

}
