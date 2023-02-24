import * as THREE from 'three'
import * as dat from 'lil-gui'
import gsap from 'gsap'

/**
 * Debug
 */
const gui = new dat.GUI()

const parameters = {
    materialColor: '#ffeded'
}

gui
    .addColor(parameters, 'materialColor').onChange(() => {
    material.color.set(parameters.materialColor)
    particlesMaterial.color.set(parameters.materialColor)
})

/**
 * Base
 */
// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

/**
 * Tobjects
 */

const textureLoader = new THREE.TextureLoader()
const gradientTexture = textureLoader.load('textures/gradients/5.jpg')
const particlesTexture = textureLoader.load('textures/particles/8.png')

gradientTexture.magFilter = THREE.NearestFilter


const material = new THREE.MeshToonMaterial({
    color: parameters.materialColor,
    gradientMap: gradientTexture
})

//meshes
const objectsDistance = 4
const torusMesh = new THREE.Mesh(
    new THREE.TorusGeometry(1, 0.4, 16, 60),
    material
)

const coneMesh = new THREE.Mesh(
    new THREE.ConeGeometry(1, 2, 32),
    material
)

const torusKnotMesh = new THREE.Mesh(
    new THREE.TorusKnotGeometry(0.8, 0.35, 100, 16),
    material
)
torusMesh.position.x = 2
coneMesh.position.x = -2
torusKnotMesh.position.x = 2

torusMesh.position.y = -objectsDistance * 0
coneMesh.position.y = -objectsDistance * 1
torusKnotMesh.position.y = -objectsDistance * 2

scene.add(torusMesh, coneMesh, torusKnotMesh)
const sectionMeshes = [torusMesh, coneMesh, torusKnotMesh]

/*
* Particles
* */
const particlesCount = 200
const particlesPositions = new Float32Array(particlesCount * 3)

for (let i = 0; i < particlesCount; i++) {
    particlesPositions[i * 3 + 0] = (Math.random() - 0.5) * 10
    particlesPositions[i * 3 + 1] = objectsDistance * 0.5 - Math.random() * objectsDistance * sectionMeshes.length
    particlesPositions[i * 3 + 2] = (Math.random() - 0.5) * 5
}
const particleGeometry = new THREE.BufferGeometry()
particleGeometry.setAttribute('position', new THREE.BufferAttribute(particlesPositions, 3))

const particlesMaterial = new THREE.PointsMaterial({
    color: parameters.materialColor,
    sizeAttenuation: true,
    size: 0.25,
    map: particlesTexture,
    depthWriteEnabled: false,
    alphaMap: particlesTexture,
    transparent: true,
})

const particlesPoints = new THREE.Points(particleGeometry, particlesMaterial)


scene.add(particlesPoints)


/*lights
* */
const directionalLight = new THREE.DirectionalLight('#ffffff', 1)
directionalLight.position.set(1, 1, 0)
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
//group for camera
const cameraGroup = new THREE.Group()
// Base camera
const camera = new THREE.PerspectiveCamera(35, sizes.width / sizes.height, 0.1, 100)
camera.position.z = 6
cameraGroup.add(camera)
scene.add(cameraGroup)

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    alpha: true
})

renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
/*
scroll
* */

let scrollY = window.scrollY
let currentSection = 0

window.addEventListener('scroll', () => {
    scrollY = window.scrollY

    let newSection = Math.round(scrollY / sizes.height)

    if (currentSection !== newSection) {
        currentSection = newSection
        gsap.to(sectionMeshes[currentSection].rotation,
            {
                duration: 1.5,
                ease: 'power2.inOut',
                x: '+=6',
                Y: '+=6',
                z: '+=2'
            })
/*        gsap.to(sectionMeshes[currentSection].position,
            {
                duration: 1.5,
                ease: 'power2.inOut',
                // z: '-=2',
            })*/
    }
})

/*
* cursor
* */


const cursor = {}
cursor.x = 0
cursor.y = 0

window.addEventListener('mousemove', (event) => {
    cursor.x = (event.clientX / sizes.width) - 0.5
    cursor.y = (event.clientY / sizes.height) - 0.5
})
/**
 * Animate
 */
const clock = new THREE.Clock()
let previousTime = 0
const tick = () => {

    const elapsedTime = clock.getElapsedTime()
    const deltatime = elapsedTime - previousTime
    previousTime = elapsedTime
    camera.position.y = -scrollY / sizes.height * objectsDistance

    const parallaxX = cursor.x * 0.5
    const parallaxY = -cursor.y * 0.5

    cameraGroup.position.x += (parallaxX - cameraGroup.position.x) * 2 * deltatime
    cameraGroup.position.y += (parallaxY - cameraGroup.position.y) * 2 * deltatime

    /*animate meshes*/
    for (const mesh of sectionMeshes) {
        mesh.rotation.x += deltatime * 0.1
        mesh.rotation.y += deltatime * 0.12
    }
    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()