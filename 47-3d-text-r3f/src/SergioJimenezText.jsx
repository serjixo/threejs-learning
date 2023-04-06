import {Text3D, useMatcapTexture} from "@react-three/drei";

export default function SergioJimenezText() {

    let [matcapTexture] = useMatcapTexture('5A492B_DEC583_987D4D_AC9C74', 256);

    return (
        <Text3D font='./fonts/Noto-Sans-Regular.json'
                size={0.75}
                bevelEnabled
                bevelThickness={0.05}
                bevelSegments={5}
        >
            Sergio Jimenez
            <meshMatcapMaterial matcap={matcapTexture}/>
        </Text3D>
    )

}
