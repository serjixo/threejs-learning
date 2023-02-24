/*
console.log(THREE)

//scene
const scene = new THREE.Scene()

//red cube
const geometry = new  THREE.BoxGeometry(1,1,1)
const material = new THREE.MeshBasicMaterial({color:'#bada55'})
const mesh = new THREE.Mesh(geometry,material)
scene.add(mesh)

//sizes
const sizes = {
    width: 800,
    height: 600
}

//Camera

const camera = new THREE.PerspectiveCamera(75, sizes.width  / sizes.height)
camera.position.z = 3
scene.add(camera)


//Renderer
const canvas = document.querySelector(".webgl")
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})

renderer.setSize(sizes.width, sizes.height)
renderer.render(scene,camera)~
*/

//scene
const scene = new THREE.Scene()

// geometry

const geometry = new THREE.BoxGeometry(1, 1, 1)
const material = new THREE.MeshBasicMaterial({color: "#bada55"})
const boxMexh = new THREE.Mesh(geometry, material)

scene.add(boxMexh)

//camera

const sizes = {width: 800, height: 600}
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height)
camera.position.z = 3
scene.add(camera)

// render

const canvas = document.querySelector(".webgl")
const renderer = new THREE.WebGLRenderer({canvas: canvas})
renderer.setSize(sizes.width, sizes.height)
renderer.render(scene, camera)
