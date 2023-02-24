import * as THREE from 'three'
import * as CANNON from 'cannon-es'


export const BoxMesh = (sizes, position) => {
    const boxGeometry = new THREE.BoxGeometry(sizes.width, sizes.height, sizes.depth)
    const boxMaterial = new THREE.MeshStandardMaterial({color: '#00ff00'})
    let mesh = new THREE.Mesh(boxGeometry, boxMaterial);
    mesh.position.copy(position)

    // physics object
    const boxGeomtry = new CANNON.Box(new CANNON.Vec3(sizes.width / 2, sizes.height / 2, sizes.depth / 2))
    const body = new CANNON.Body({shape: boxGeomtry, mass: 1})
    body.position.copy(position)
    return {mesh, body}
}