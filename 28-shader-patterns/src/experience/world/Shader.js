import * as THREE from 'three'
import Experience from "../Experience.js";
import vertex from '../shaders/test/vertex.glsl'
import fragment from '../shaders/test/fragment.glsl'
import TimeObserver from "../utils/TimeObserver.js";

export default class Shader {
    constructor() {
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.resources = this.experience.resources
        this.debug = this.experience.debug

        const timeObserver = new TimeObserver()
        timeObserver.subscribe(this.onUpdate)
        // this.time = this.experience.time

        if (this.debug.active) {
            this.debugFolder = this.debug.ui.addFolder('shader')
        }

        this.setGeometry()
        this.setTextures()
        this.setMaterial()
        this.setMesh()
    }

    setGeometry() {
        this.geometry = new THREE.PlaneGeometry(1, 1, 32, 32)
        const count = this.geometry.attributes.position.count
        const randoms = new Float32Array(count)

        for (let i = 0; i < count; i++) {
            randoms[i] = Math.random()
        }

        // this.geometry.setAttribute('aRandom', new THREE.BufferAttribute(randoms, 1))

    }

    setTextures = () => {
        this.textures = {}

        // this.textures.color = this.resources.items.grassColorTexture
        // this.textures.color.encoding = THREE.sRGBEncoding
        // this.textures.color.repeat.set(1.5, 1.5)
        // this.textures.color.wrapS = THREE.RepeatWrapping
        // this.textures.color.wrapT = THREE.RepeatWrapping

        // this.textures.normal = this.resources.items.grassNormalTexture
        // this.textures.normal.repeat.set(1.5, 1.5)
        // this.textures.normal.wrapS = THREE.RepeatWrapping
        // this.textures.normal.wrapT = THREE.RepeatWrapping
    }

    setMaterial() {
        // console.log(this.resources.items.flagTexture)
        //  debugger
        this.material = new THREE.ShaderMaterial({
            vertexShader: vertex,
            fragmentShader: fragment,
            side: THREE.DoubleSide,
            // uniforms: {
            //     uFrequency: {value: new THREE.Vector2(10, 5)},
            //     uTime: {value: 0},
            //     uColor: {value: new THREE.Color('orange')},
            //     uTexture: {value: this.resources.items.flagTexture}
            // }
        })

        // if (this.debug.active) {
        //     this.debugFolder.add(this.material.uniforms.uFrequency.value, 'x').min(0).max(20).step(0.001).name('frequencyX')
        //     this.debugFolder.add(this.material.uniforms.uFrequency.value, 'y').min(0).max(20).step(0.001).name('frequencyY')
        //
        // }
    }

    setMesh() {
        this.mesh = new THREE.Mesh(this.geometry, this.material)
        this.mesh.position.set(0, 1, 0)
        // this.mesh.rotation.x = -Math.PI * 0.5
        // this.mesh.receiveShadow = true
        this.scene.add(this.mesh)
    }

    onUpdate = (time) => {
        this.material.uniforms.uTime.value = time.elapsedTime
    }
}