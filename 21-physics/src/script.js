import * as THREE from 'three'
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from 'lil-gui'
import CANNON from "cannon"


/**
 * Debug
 */
const gui = new dat.GUI()
const debugObject = {}
debugObject.createSphere = () => {

    createSphere(0.5,
        {
            x: (Math.random() - 0.5 * 3),
            y: 3,
            z: (Math.random() - 0.5 * 3),
        })
}

debugObject.createBox = () => {

    createBox(0.5,
        {
            x: (Math.random() - 0.5 * 3),
            y: 3,
            z: (Math.random()),
        })
}

debugObject.reset = () => {
    for (const element of objectsToUpdate) {
        element.body.removeEventListener('collide', playHitSound)
        world.removeBody(element.body)
        scene.remove(element.mesh)
    }
    objectsToUpdate.splice(0, objectsToUpdate.length)
}
gui.add(debugObject, 'createSphere')
gui.add(debugObject, 'createBox')
gui.add(debugObject, 'reset')
/**
 * Base
 */
// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()
/*
Audios
*/

const hitSound = new Audio('/sounds/hit.mp3')

const playHitSound = async (collision) => {
    let strengthOfImpact = collision.contact.getImpactVelocityAlongNormal()
    if (strengthOfImpact > 1.5) {
        hitSound.volume = Math.random()
        hitSound.currentTime = 0
        await hitSound.play()
    }
}
await playHitSound()
/**
 * Textures
 */
const textureLoader = new THREE.TextureLoader()
const cubeTextureLoader = new THREE.CubeTextureLoader()

const environmentMapTexture = cubeTextureLoader.load([
    '/textures/environmentMaps/0/px.png',
    '/textures/environmentMaps/0/nx.png',
    '/textures/environmentMaps/0/py.png',
    '/textures/environmentMaps/0/ny.png',
    '/textures/environmentMaps/0/pz.png',
    '/textures/environmentMaps/0/nz.png'
])
/*
Physiscs
*
 */

const world = new CANNON.World()
world.broadphase = new CANNON.SAPBroadphase(world)
world.allowSleep = true

world.gravity.set(0, -9.82, 0)

// Materials for the world physic

/*const concreteMaterial = new CANNON.Material('concrete')
const plasticMaterial = new CANNON.Material('plastic')*/
const defaultMaterial = new CANNON.Material('default')
const defaultContactMaterial = new CANNON.ContactMaterial(
    defaultMaterial,
    defaultMaterial,
    {
        friction: 0.1,
        restitution: 0.7,
    }
)
world.addContactMaterial(defaultContactMaterial)
world.defaultContactMaterial = defaultContactMaterial
// create the shape first


// floor
const floorShape = new CANNON.Plane()
const floorBody = new CANNON.Body()
floorBody.mass = 0
floorBody.addShape(floorShape)
floorBody.quaternion.setFromAxisAngle(
    new CANNON.Vec3(-1, 0, 0),
    Math.PI * 0.5
)
world.addBody(floorBody)

/*
* Utils
*/

//create material
//create geometry
let sphereGeometry = new THREE.SphereGeometry(1, 20, 20);
const boxGeometry = new THREE.BoxGeometry(1, 1, 1)

let meshStandardMaterial = new THREE.MeshStandardMaterial({
    metalness: 0.3,
    roughness: 0.4,
    envMap: environmentMapTexture
});

const objectsToUpdate = []

const createBox = (size, position) => {
    const boxMesh = new THREE.Mesh(
        boxGeometry,
        meshStandardMaterial
    )
    boxMesh.scale.set(size, size, size)
    boxMesh.castShadow = true
    boxMesh.position.copy(position)
    scene.add(boxMesh)
    //phisycs part
    const boxPhysicsGeometry = new CANNON.Box(new CANNON.Vec3(size * 0.5, size * 0.5, size * 0.5))

    const bodyBoxGeometry = new CANNON.Body({
        mass: 1,
        position: new CANNON.Vec3(0, 3, 0),
        boxPhysicsGeometry: boxPhysicsGeometry,
        material: defaultMaterial,
        shape: boxPhysicsGeometry
    })

    bodyBoxGeometry.position.copy(position)
    bodyBoxGeometry.addEventListener('collide', playHitSound)
    bodyBoxGeometry.applyLocalForce(
        new CANNON.Vec3(0, 500, 0),
        new CANNON.Vec3(0, 0, 0)
    )
    world.addBody(bodyBoxGeometry)

    objectsToUpdate.push({
        mesh: boxMesh,
        body: bodyBoxGeometry
    })
}
const createSphere = (radius, position) => {
    // create mesh
    let mesh = new THREE.Mesh(
        sphereGeometry,
        meshStandardMaterial
    );
    mesh.scale.set(radius, radius, radius)
    mesh.castShadow = true
    mesh.position.copy(position)
    scene.add(mesh)
    //canno part
    let shape = new CANNON.Sphere(radius);
    let body = new CANNON.Body({
        mass: 1,
        position: CANNON.Vec3(0, 3, 0),
        shape
    });

    body.position.copy(position)
    body.addEventListener('collide', playHitSound)
    world.addBody(body)

    //save in objects to uopdate

    objectsToUpdate.push({
        mesh,
        body
    })

}


/**
 * Floor
 */
const floor = new THREE.Mesh(
    new THREE.PlaneGeometry(10, 10),
    new THREE.MeshStandardMaterial({
        color: '#777777',
        metalness: 0.3,
        roughness: 0.4,
        envMap: environmentMapTexture,
        envMapIntensity: 0.5
    })
)

floor.receiveShadow = true
floor.rotation.x = -Math.PI * 0.5
scene.add(floor)

/**
 * Lights
 */
const ambientLight = new THREE.AmbientLight(0xffffff, 0.7)
scene.add(ambientLight)

const directionalLight = new THREE.DirectionalLight(0xffffff, 0.2)
directionalLight.castShadow = true
directionalLight.shadow.mapSize.set(1024, 1024)
directionalLight.shadow.camera.far = 15
directionalLight.shadow.camera.left = -7
directionalLight.shadow.camera.top = 7
directionalLight.shadow.camera.right = 7
directionalLight.shadow.camera.bottom = -7
directionalLight.position.set(5, 5, 5)
scene.add(directionalLight)

/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () => {
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.set(-3, 3, 3)
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.shadowMap.enabled = true
renderer.shadowMap.type = THREE.PCFSoftShadowMap
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Animate
 */
const clock = new THREE.Clock()
let oldELapsedTime = 0
const tick = () => {
    const elapsedTime = clock.getElapsedTime()
    const deltaTime = elapsedTime - oldELapsedTime
    oldELapsedTime = elapsedTime

    //update phisycs world
    world.step(1 / 60, deltaTime, 3)

    // console.log(deltaTime)

    for (const objectsToUpdateElement of objectsToUpdate) {
        objectsToUpdateElement.mesh.position.copy(objectsToUpdateElement.body.position)
        objectsToUpdateElement.mesh.quaternion.copy(objectsToUpdateElement.body.quaternion)
    }

    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()