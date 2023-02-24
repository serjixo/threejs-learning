import './style.css'
import * as THREE from 'three'
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from 'lil-gui'
import {FontLoader} from 'three/examples/jsm/loaders/FontLoader.js'
import {TextGeometry} from 'three/examples/jsm/geometries/TextGeometry.js'

/**
 * Base
 */
// Debug
// const gui = new dat.GUI()

/**
 * Textures
 */
const textureLoader = new THREE.TextureLoader()
let matcap = textureLoader.load('/textures/matcaps/8.png');
let matcapMaterial = new THREE.MeshMatcapMaterial({matcap: matcap})

const fontLoader = new FontLoader()

fontLoader.load(
    '/fonts/montserrat.json',
    (font) => {
        const textGeometry = new TextGeometry(
            'Sergio Jimenez',
            {
                font: font,
                size: 0.5,
                height: 0.2,
                curveSegments: 6,
                bevelEnabled: true,
                bevelThickness: 0.03,
                bevelSize: 0.002,
                bevelOffset: 0,
                bevelSegments: 5

            }
        )
        textGeometry.computeBoundingBox()
        textGeometry.center()

        const mesh = new THREE.Mesh(textGeometry, matcapMaterial)
        scene.add(mesh)
    }
)


// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

console.time('donut creation')

let torusGeometry = new THREE.TorusGeometry(0.3, 0.2, 18,  45)

for (let i = 0; i < 300; i++) {

    let donut = new THREE.Mesh(torusGeometry, matcapMaterial)
    donut.position.x = (Math.random() - 0.5) * 10
    donut.position.y = (Math.random() - 0.5) * 10
    donut.position.z = (Math.random() - 0.5) * 10


    donut.rotation.x = (Math.random() - 0.5) * 10
    donut.rotation.y = (Math.random() - 0.5) * 10

    const randomValue = Math.random()
    donut.scale.set(randomValue,randomValue,randomValue)

    scene.add(donut)
}
console.timeEnd('donut creation')
/*
let axisHelper = new THREE.AxesHelper();
scene.add(axisHelper)*/
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
camera.position.x = 1
camera.position.y = 1
camera.position.z = 2
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
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Animate
 */
const clock = new THREE.Clock()

const tick = () => {
    const elapsedTime = clock.getElapsedTime()

    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()