import './style.css'
import * as THREE from 'three'
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from 'lil-gui'

/**
 * Base
 */
// Debug
const gui = new dat.GUI()

// Canvas
const canvas = document.querySelector('canvas.webgl')


//fog

// Scene
const scene = new THREE.Scene()

const fog = new THREE.Fog('#262837', 2, 9.5)
scene.fog = fog
/**
 * Textures
 */
const textureLoader = new THREE.TextureLoader()

const doorColorTexture = textureLoader.load('/textures/door/color.jpg')
const doorAlphaTexture = textureLoader.load('/textures/door/alpha.jpg')
const doorAmbientOcclusionTexture = textureLoader.load('/textures/door/ambientOcclusion.jpg')
const doorHeightTexture = textureLoader.load('/textures/door/height.jpg')
const doorNormalTexture = textureLoader.load('/textures/door/normal.jpg')
const doorMetalnessTexture = textureLoader.load('/textures/door/metalness.jpg')
const doorRoughnessTexture = textureLoader.load('/textures/door/roughness.jpg')


const bricksColorTexture = textureLoader.load('/textures/bricks/color.jpg')
const bricksAmbientTexture = textureLoader.load('/textures/bricks/ambientOcclusion.jpg')
const bricksNormalTexture = textureLoader.load('/textures/bricks/normal.jpg')
const bricksRoughnessTexture = textureLoader.load('/textures/bricks/roughness.jpg')


const grassColorTexture = textureLoader.load('/textures/grass/color.jpg')
const grassAmbientTexture = textureLoader.load('/textures/grass/ambientOcclusion.jpg')
const grassNormalTexture = textureLoader.load('/textures/grass/normal.jpg')
const grassRoughnessTexture = textureLoader.load('/textures/grass/roughness.jpg')

grassColorTexture.repeat.set(9, 9)
grassAmbientTexture.repeat.set(9, 9)
grassNormalTexture.repeat.set(9, 9)
grassRoughnessTexture.repeat.set(9, 9)

grassColorTexture.wrapS = THREE.RepeatWrapping
grassAmbientTexture.wrapS = THREE.RepeatWrapping
grassNormalTexture.wrapS = THREE.RepeatWrapping
grassRoughnessTexture.wrapS = THREE.RepeatWrapping

grassColorTexture.wrapT = THREE.RepeatWrapping
grassAmbientTexture.wrapT = THREE.RepeatWrapping
grassNormalTexture.wrapT = THREE.RepeatWrapping
grassRoughnessTexture.wrapT = THREE.RepeatWrapping


/**
 * House
 */
const house = new THREE.Group()
scene.add(house)
//HouseMaterial
let houseMaterial = new THREE.MeshStandardMaterial({color: '#ac8e82'});
//walls
const wallsSizes = {width: 4, height: 2.5, depth: 4}
const walls = new THREE.Mesh(
    new THREE.BoxGeometry(wallsSizes.width, wallsSizes.height, wallsSizes.depth),
    new THREE.MeshStandardMaterial(
        {
            map: bricksColorTexture,
            aoMap: bricksAmbientTexture,
            normalMap: bricksNormalTexture,
            roughnessMap: bricksRoughnessTexture
        }
    )
)
walls.position.y = wallsSizes.height / 2
//making ambientocclusion work properly
walls.geometry.setAttribute(
    'uv2',
    new THREE.Float32BufferAttribute(walls.geometry.attributes.uv.array, 2)
)

house.add(walls)

//roof
const coneSizes = {radius: wallsSizes.width - 0.5, height: 1, radialSegments: 4}
let roof = new THREE.Mesh(
    new THREE.ConeGeometry(coneSizes.radius, coneSizes.height, coneSizes.radialSegments),
    houseMaterial
);
roof.position.y = wallsSizes.height + (coneSizes.height / 2)
roof.rotation.y = Math.PI / 4

house.add(roof)

const planeDoorSizes = {width: 2, height: 2, widthSegments: 25, heightSegments: 25}
let door = new THREE.Mesh(
    new THREE.PlaneGeometry(planeDoorSizes.width, planeDoorSizes.height, planeDoorSizes.widthSegments, planeDoorSizes.heightSegments),
    new THREE.MeshStandardMaterial({
        transparent: true, // make alphamap work
        map: doorColorTexture,
        alphaMap: doorAlphaTexture,
        aoMap: doorAmbientOcclusionTexture,
        displacementMap: doorHeightTexture,
        displacementScale: 0.1,
        normalMap: doorNormalTexture,
        metalnessMap: doorMetalnessTexture,
        roughnessMap: doorRoughnessTexture
    })
);

door.geometry.setAttribute(
    'uv2',
    new THREE.Float32BufferAttribute(door.geometry.attributes.uv.array, 2)
)
door.position.y = planeDoorSizes.height / 2
door.position.z = (wallsSizes.depth / 2) + 0.001
house.add(door)

//busahes
let bushProps = {radius: 1, widthSegments: 16, heightSegments: 16, color: '#89c854'}
const bushGeeometry = new THREE.SphereGeometry(bushProps.radius, bushProps.widthSegments, bushProps.heightSegments)
const bushMaterial = new THREE.MeshStandardMaterial({color: bushProps.color})

const bush1 = new THREE.Mesh(bushGeeometry, bushMaterial)
bush1.scale.set(0.5, 0.5, 0.5)
bush1.position.set(0.8, 0.2, (wallsSizes.depth + bushProps.radius) / 2)
house.add(bush1)

const bush2 = new THREE.Mesh(bushGeeometry, bushMaterial)
bush2.scale.set(0.25, 0.25, 0.25)
bush2.position.set((bush1.position.x + bushProps.radius) / 1.3, 0.2, (wallsSizes.depth + bushProps.radius) / 2)
house.add(bush2)

const bush3 = new THREE.Mesh(bushGeeometry, bushMaterial)
bush3.scale.set(0.4, 0.4, 0.4)
bush3.position.set(-(bush1.position.x + bushProps.radius) / 1.3, 0.2, (wallsSizes.depth + bushProps.radius) / 2)
house.add(bush3)

const bush4 = new THREE.Mesh(bushGeeometry, bushMaterial)
bush4.scale.set(0.14, 0.14, 0.14)
bush4.position.set(-(bush1.position.x + bushProps.radius) / 1.1, 0.1, 2.9)
house.add(bush4)


//graves

const gravesGroup = new THREE.Group()
scene.add(gravesGroup)
const graveProps = {color: '#b2b6b1'}

const graveGeomery = new THREE.BoxGeometry(0.6, 0.8, 0.2)
const graveMaterial = new THREE.MeshStandardMaterial({color: graveProps.color})

for (let i = 0; i < 50; i++) {
    let grave = new THREE.Mesh(graveGeomery, graveMaterial);
    const angle = Math.PI * 2 * Math.random()
    const radius = 3 + Math.random() * 6
    const x = Math.sin(angle) * radius
    const z = Math.cos(angle) * radius

    grave.position.set(x, 0.2, z)
    grave.rotation.y = ((Math.random() - 0.5) * 0.4)
    grave.rotation.z = ((Math.random() - 0.5) * 0.4)

    grave.castShadow = true

    scene.add(grave)
}
//
// // Temporary sphere
// const sphere = new THREE.Mesh(
//     new THREE.SphereGeometry(1, 32, 32),
//     new THREE.MeshStandardMaterial({roughness: 0.7})
// )
// sphere.position.y = 1
// scene.add(sphere)

// Floor
const floor = new THREE.Mesh(
    new THREE.PlaneGeometry(20, 20),
    new THREE.MeshStandardMaterial(
        {
            map: grassColorTexture,
            aoMap: grassAmbientTexture,
            normalMap: grassNormalTexture,
            roughnessMap: grassRoughnessTexture
        }
    )
)
//making ambientocclusion work properly
floor.geometry.setAttribute(
    'uv2',
    new THREE.Float32BufferAttribute(floor.geometry.attributes.uv.array, 2)
)

floor.rotation.x = -Math.PI * 0.5
floor.position.y = 0

floor.receiveShadow = true


scene.add(floor)

/**
 * Lights
 */
// Ambient light
const ambientLight = new THREE.AmbientLight('#ffffff', 0.5)
gui.add(ambientLight, 'intensity').min(0).max(1).step(0.001)
scene.add(ambientLight)

// Directional light
const moonLight = new THREE.DirectionalLight('#b9b5ff', 0.12)
moonLight.position.set(4, 5, -2)
gui.add(moonLight, 'intensity').min(0).max(1).step(0.001)
gui.add(moonLight.position, 'x').min(-5).max(5).step(0.001)
gui.add(moonLight.position, 'y').min(-5).max(5).step(0.001)
gui.add(moonLight.position, 'z').min(-5).max(5).step(0.001)
scene.add(moonLight)

//doorLight
const doorLight = new THREE.PointLight('#ff7d46', 1, 7)
doorLight.position.set(0, 2.2, 2.7)
doorLight.castShadow =true
doorLight.shadow.mapSize.width = 256
doorLight.shadow.mapSize.height = 256
doorLight.shadow.mapSize.far = 7

scene.add(doorLight)

const ghostPurple = new THREE.PointLight('#ff00ff', 2, 3)
const ghostCyan = new THREE.PointLight('#00ffff', 2, 3)
const ghostYellow = new THREE.PointLight('#ffff00', 2, 3)



scene.add(ghostPurple)
scene.add(ghostCyan)
scene.add(ghostYellow)


ghostPurple.shadow.mapSize.width = 256
ghostPurple.shadow.mapSize.height = 256
ghostPurple.shadow.mapSize.far = 7

ghostYellow.shadow.mapSize.width = 256
ghostYellow.shadow.mapSize.height = 256
ghostYellow.shadow.mapSize.far = 7

ghostCyan.shadow.mapSize.width = 256
ghostCyan.shadow.mapSize.height = 256
ghostCyan.shadow.mapSize.far = 7


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
    // renderer.setClearColor(/**/)
})

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.x = 4
camera.position.y = 2
camera.position.z = 5
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
renderer.setClearColor('#262837')

///*
//
// SHADOWSA*/

renderer.shadowMap.enabled = true
renderer.shadowMap.type =  THREE.PCFSoftShadowMap

moonLight.castShadow = true

ghostCyan.castShadow = true
ghostPurple.castShadow = true
ghostYellow.castShadow = true

walls.castShadow = true

bush1.castShadow = true
bush2.castShadow = true
bush3.castShadow = true
bush4.castShadow = true

/**
 * Animate
 *
 *
 */
const clock = new THREE.Clock()

const tick = () => {
    const elapsedTime = clock.getElapsedTime()
//Ghost aniation
    const ghostPurpleAngle = elapsedTime * 0.5
    ghostPurple.position.x = Math.cos(ghostPurpleAngle) * 4
    ghostPurple.position.z = Math.sin(ghostPurpleAngle) * 4
    ghostPurple.position.y = Math.sin(ghostPurpleAngle) * 3

    const ghostCyanAngle = -elapsedTime * 0.32
    ghostCyan.position.x = Math.cos(ghostCyanAngle) * 4
    ghostCyan.position.z = Math.sin(ghostCyanAngle) * 4
    ghostCyan.position.y = Math.sin(ghostCyanAngle) + Math.sin(elapsedTime * 2.5)

    const ghostYellowAngle = -elapsedTime * 0.32
    ghostYellow.position.x = Math.cos(ghostYellowAngle) * (4 + Math.sin(elapsedTime * 0.32))
    ghostYellow.position.z = Math.sin(ghostYellowAngle) * (4 + Math.sin(elapsedTime * 0.32))
    ghostYellow.position.y = Math.sin(ghostYellowAngle) + Math.sin(elapsedTime * 2)


    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()