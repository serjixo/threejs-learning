import * as THREE from 'three'
import Experience from "../Experience.js";
import vertex from '../shaders/water/vertex.glsl'
import fragment from '../shaders/water/fragment.glsl'
import TimeObserver from "../utils/TimeObserver.js";

let instance = null

export default class Water {
    constructor() {
        if(instance){
            return instance
        }
        instance = this

        this.experience = new Experience()
        this.scene = this.experience.scene
        this.resources = this.experience.resources
        this.debug = this.experience.debug

        const timeObserver = new TimeObserver()
        timeObserver.subscribe(this.onUpdate)

        if (this.debug.active) {
            this.debugFolder = this.debug.ui.addFolder('shader')
        }
        this.debugObject = {}
        this.debugObject.depthColor = '#186691'
        this.debugObject.surfaceColor = '#9bd8ff'

        this.setGeometry()
        // this.setTextures()
        this.setMaterial()
        this.setMesh()
    }

    setGeometry() {
        this.geometry = new THREE.PlaneGeometry(2, 2, 512, 512)
        const count = this.geometry.attributes.position.count
        const randoms = new Float32Array(count)

        for (let i = 0; i < count; i++) {
            randoms[i] = Math.random()
        }


    }

    setTextures = () => {
        this.textures = {}
    }

    setMaterial() {
        this.material = new THREE.ShaderMaterial({
            vertexShader: vertex,
            fragmentShader: fragment,
            side: THREE.DoubleSide,
            uniforms:
                {
                    uTime: {value: 0},

                    uBigWavesElevation: {value: 0.2},
                    uBigWavesFrequency: {value: new THREE.Vector2(4, 1.5)},
                    uBigWavesSpeed: {value: 0.75},

                    uSmallWavesElevation: {value:0.15},
                    uSmallWavesFrequency: {value:3},
                    uSmallWavesSpeed: {value:0.2},
                    uSmallWavesIterations: {value:4},

                    uDepthColor: {value: new THREE.Color(this.debugObject.depthColor)},
                    uSurfaceColor: {value: new THREE.Color(this.debugObject.surfaceColor)},
                    uColorOffSet: {value: 0.08},
                    uColorMultiplier: {value: 5}
                }
        })

        //debug
        if (this.debug.active) {
            this.debugFolder.add(this.material.uniforms.uBigWavesElevation, 'value').min(0).max(1.0).step(0.001).name('uBigWavesElevation')
            this.debugFolder.add(this.material.uniforms.uBigWavesFrequency.value, 'x').min(0).max(10).step(0.001).name('uBigWavesFrequencyX')
            this.debugFolder.add(this.material.uniforms.uBigWavesFrequency.value, 'y').min(0).max(10).step(0.001).name('uBigWavesFrequencyY')
            this.debugFolder.add(this.material.uniforms.uBigWavesSpeed, 'value').min(0).max(4.0).step(0.001).name('uBigWavesSpeed')

            this.debugFolder.add(this.material.uniforms.uSmallWavesElevation, 'value').min(0).max(1.0).step(0.001).name('uSmallWavesElevation')
            this.debugFolder.add(this.material.uniforms.uSmallWavesFrequency, 'value').min(0).max(30.0).step(0.001).name('uSmallWavesFrequency')
            this.debugFolder.add(this.material.uniforms.uSmallWavesSpeed, 'value').min(0).max(4.0).step(0.001).name('uSmallWavesSpeed')
            this.debugFolder.add(this.material.uniforms.uSmallWavesIterations, 'value').min(0).max(5.0).step(1.0).name('uSmallWavesIterations')

            this.debugFolder.add(this.material.uniforms.uColorOffSet, 'value').min(0).max(1).step(0.001).name('uColorOffset')
            this.debugFolder.add(this.material.uniforms.uColorMultiplier, 'value').min(0).max(10).step(0.001).name('uColorMultiplier')


            this.debugFolder.addColor(this.debugObject, 'depthColor').name('depthColor').onChange(() => this.material.uniforms.uDepthColor.value.set(this.debugObject.depthColor))
            this.debugFolder.addColor(this.debugObject, 'surfaceColor').name('surfaceColor').onChange(() => this.material.uniforms.uSurfaceColor.value.set(this.debugObject.surfaceColor))

        }
    }

    setMesh() {
        this.mesh = new THREE.Mesh(this.geometry, this.material)
        // this.mesh.position.set(0, 1, 0)
        this.mesh.rotation.x = -Math.PI * 0.5
        // this.mesh.receiveShadow = true
        this.scene.add(this.mesh)
    }

    onUpdate = (time) => {
        let water = new Water();

        // this.material.uniforms.
        water.material.uniforms.uTime.value = time.elapsedTime / 1000
    }
}