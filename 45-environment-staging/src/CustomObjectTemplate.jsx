import {useEffect, useMemo, useRef} from "react";

export default function CustomObjectTemplate() {

    const bufferGeometryRef = useRef();

    const verticesCount = 10 * 3;

    const positions = useMemo(() => {
        const positions = new Float32Array(verticesCount * 3)

        for (let i = 0; i < verticesCount * 3; i++) {
            positions[i] = (Math.random() - 0.5) * 3
        }
        return positions

    }, []);

    useEffect(() => {
        bufferGeometryRef.current.computeVertexNormals()
    }, []);

    return (
        <mesh>
            <bufferGeometry ref={bufferGeometryRef}>
                <bufferAttribute
                    attach={'attributes-position'}
                    count={verticesCount}
                    itemSize={3}
                    array={positions}
                />

            </bufferGeometry>
            {/*<torusKnotGeometry/>*/}
            <meshStandardMaterial/>
        </mesh>
    )
}