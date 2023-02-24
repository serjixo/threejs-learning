import * as THREE from 'three'
import * as CANNON from 'cannon-es'


export const Plane = (sizes, position) => {
    const planeGeometry = new THREE.PlaneGeometry(sizes.width, sizes.height)
    const planeMaterial = new THREE.MeshStandardMaterial({color: '#2354bb'})
    let mesh = new THREE.Mesh(planeGeometry, planeMaterial);
    mesh.position.copy(position)

    // physics object
    const planeGeomtry = new CANNON.Plane()
    const body = new CANNON.Body({shape: planeGeomtry, mass: 0})
    body.position.copy(position)
    return {mesh, body}
}