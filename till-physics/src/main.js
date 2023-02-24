import './style.css'
import * as THREE from 'three'
import {BoxMesh} from "./meshes/box.js";
import {OrbitControls} from "three/addons/controls/OrbitControls.js";
import * as CANNON from 'cannon-es'
import {Plane} from "./meshes/plane.js";

const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}


let canvas = document.querySelector('canvas.webgl')


window.addEventListener('resize', () => {

    //update sizes of the =renderer
    sizes.width = window.innerWidth
    sizes.height = window.innerWidth


    //update camera
    perspectiveCamera.aspect = sizes.width / sizes.height
    perspectiveCamera.updateProjectionMatrix()

    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))


})

const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
renderer.shadowMap.enabled = true
renderer.shadowMap.type = THREE.PCFSoftShadowMap


const scene = new THREE.Scene()

const perspectiveCamera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
perspectiveCamera.position.set(0, 0, 3)

scene.add(perspectiveCamera)

const controls = new OrbitControls(perspectiveCamera, canvas)

const world = new CANNON.World()
world.broadphase = new CANNON.SAPBroadphase(world)
world.allowSleep = true

world.gravity.set(0, -9.82, 0)
const defaultMaterial = new CANNON.Material('default')
const defaultContactMaterial = new CANNON.ContactMaterial(defaultMaterial, defaultMaterial, {
    friction: 0.1,
    restitution: 0.1
})

world.addContactMaterial(defaultContactMaterial)
// world.defaultContactMaterial = defaultContactMaterial
world.defaultMaterial = defaultMaterial

/**
 * Lights
 */
const ambientLight = new THREE.AmbientLight(0xffffff, 0.7)
scene.add(ambientLight)


// 3d Objects

const objectsToUpdate = []

let box = BoxMesh({height: 1, width: 1, depth: 1}, new THREE.Vector3(2, 0, 0))
scene.add(box.mesh)
world.addBody(box.body)
objectsToUpdate.push({mesh: box.mesh, body: box.body})

let plane = Plane({height: 10, width: 10}, new THREE.Vector3(0, -2, 0))
plane.mesh.rotation.x = -Math.PI * 0.5
plane.body.quaternion.setFromEuler(-Math.PI / 2, 0, 0)
scene.add(plane.mesh)
world.addBody(plane.body)
objectsToUpdate.push({mesh: plane.mesh, body: plane.body})

const clock = new THREE.Clock()
let oldElapsedTime = 0

const nextFrameAction = () => {
    //time to work animations and physics with
    let elapsedTime = clock.getElapsedTime()
    let deltaTime = elapsedTime - oldElapsedTime
    oldElapsedTime = elapsedTime

    renderer.render(scene, perspectiveCamera)
    // Render
    renderer.render(scene, perspectiveCamera)

    //contrls s
    controls.update()


    //update phisycs world
    world.step(1 / 60, deltaTime, 3)
    // TODO make the PLANE and THE square collide, give contact material objets and set default contact material.

    // update physics
    for (const objectToUpdate of objectsToUpdate) {
        objectToUpdate.mesh.position.copy(objectToUpdate.body.position)
    }
    // Call tick again on the next frame
    window.requestAnimationFrame(nextFrameAction)
}

nextFrameAction()
/**
 * Camera
 */
// Base camera

