import './style.css'
import * as THREE from 'three'
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from 'lil-gui'

/**
 * Base
 */
// Debug
const gui = new dat.GUI({width: 360})


// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()


/*
* Generat de galaxy
* */
const parameters = {}
parameters.count = 100000
parameters.size = 0.01
parameters.radius = 5
parameters.branches = 3
parameters.spin = 1
parameters.randomness = 0.2
parameters.randomnessPower = 3
parameters.insideColor = '#ff6030'
parameters.outsideColor = '#1b3984'

let geometry = null
let material = null
let points = null
let textureLoader = new THREE.TextureLoader();
let particlesTexture = textureLoader.load('/textures/particles/8.png');

const cloudTexture = textureLoader.load('/textures/clouds/cloud.png',
    function (texture) {
        let cloudGeo = new THREE.PlaneGeometry(500, 500)
        let cloudMaterial = new THREE.MeshLambertMaterial({
            map: texture,
            transparent: true
        })
        for (let i = 0; i < 50; i++) {
            let cloud = new THREE.Mesh(cloudGeo, cloudMaterial)
            cloud.position.set(
                Math.random() * 800 - 400,
                Math.random() * 500 - 500
            )

            cloud.rotation.x = 1.16
            cloud.rotation.y = -0.12
            cloud.rotation.z = Math.random() * 2 * Math.PI
            cloud.material.opacity = 0.55
            console.log(cloud)
            scene.add(cloud)
        }
    }
)

/*
scene.background = new THREE.Color(0,0,0);
const fog = new THREE.Fog('#0000ff', 2, 9.5)
scene.fog = fog
*/
/*light and fog background effect*/


const generateTheGalaxy = () => {
    /*Destroy the galaxy to update it with the gui control cneter*/
    if (points !== null) {
        geometry.dispose()
        material.dispose()
        scene.remove(points)
    }

    geometry = new THREE.BufferGeometry()
    const positions = new Float32Array(parameters.count * 3)

    const colors = new Float32Array(parameters.count * 3)

    const colorInside = new THREE.Color(parameters.insideColor)
    const colorOutside = new THREE.Color(parameters.outsideColor)

    for (let i = 0; i < parameters.count; i++) {

        const i3 = i * 3 // to go to x, y and z positions in the array

        //position
        const branchAngle = (i % parameters.branches) / parameters.branches * Math.PI * 2
        const radius = Math.random() * parameters.radius
        const spinAngle = radius * parameters.spin
        const randomX = Math.pow(Math.random(), parameters.randomnessPower) * (Math.random() < 0.5 ? 1 : -1)
        const randomY = Math.pow(Math.random(), parameters.randomnessPower) * (Math.random() < 0.5 ? 1 : -1)
        const randomZ = Math.pow(Math.random(), parameters.randomnessPower) * (Math.random() < 0.5 ? 1 : -1)

        positions[i3 + 0] = Math.cos(branchAngle + spinAngle) * radius + randomX
        positions[i3 + 1] = randomY
        positions[i3 + 2] = Math.sin(branchAngle + spinAngle) * radius + randomZ

        const mixedColor = colorInside.clone()
        mixedColor.lerp(colorOutside, radius / parameters.radius)
        //color
        colors[i3 + 0] = mixedColor.r
        colors[i3 + 1] = mixedColor.g
        colors[i3 + 2] = mixedColor.b
    }

    geometry.setAttribute(
        'position',
        new THREE.BufferAttribute(positions, 3)
    )

    geometry.setAttribute(
        'color',
        new THREE.BufferAttribute(colors, 3)
    )

    material = new THREE.PointsMaterial({
        size: parameters.size,
        sizeAttenuation: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
        map: particlesTexture,
        // depthWriteEnabled: false,
        vertexColors: true
    })

    points = new THREE.Points(geometry, material)
    scene.add(points)
}

generateTheGalaxy()

gui.add(parameters, 'count').min(100).max(1000000).step(100).onFinishChange(generateTheGalaxy)
gui.add(parameters, 'size').min(0.001).max(0.1).step(0.001).onFinishChange(generateTheGalaxy)
gui.add(parameters, 'radius').min(0.01).max(20).step(0.01).onFinishChange(generateTheGalaxy)
gui.add(parameters, 'branches').min(2).max(20).step(1).onFinishChange(generateTheGalaxy)
gui.add(parameters, 'spin').min(-5).max(5).step(0.001).onFinishChange(generateTheGalaxy)
gui.add(parameters, 'randomness').min(0).max(2).step(0.001).onFinishChange(generateTheGalaxy)
gui.add(parameters, 'randomnessPower').min(1).max(10).step(0.001).onFinishChange(generateTheGalaxy)
gui.addColor(parameters, 'insideColor').onFinishChange(generateTheGalaxy)
gui.addColor(parameters, 'outsideColor').onFinishChange(generateTheGalaxy)

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
camera.position.x = 3
camera.position.y = 3
camera.position.z = 3
scene.add(camera)
/*
let camera = new THREE.PerspectiveCamera(60,window.innerWidth / window.innerHeight,1,1000);
camera.position.z = 1;
camera.rotation.x = 1.16;
camera.rotation.y = -0.12;
camera.rotation.z = 0.27;
*/

let ambient = new THREE.AmbientLight(0x555555);
scene.add(ambient);
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


let ambientLight = new THREE.AmbientLight('#555555')
scene.add(ambientLight)

scene.fog = new THREE.FogExp2('#03544e', 0.001)
renderer.setClearColor(scene.fog.color)
// console.log(5% 3)
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