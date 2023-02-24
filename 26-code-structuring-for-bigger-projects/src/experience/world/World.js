import Experience from "../Experience.js";
import Environment from "./Environment.js";
import Floor from "./Floor.js";
import Fox from "./Fox.js";
import * as THREE from 'three'

export default class World {
    constructor() {

        this.experience = new Experience()
        this.scene = this.experience.scene
        // this.test()
    }

    test() {
        const testMesh = new THREE.Mesh(new THREE.BoxGeometry(1, 1, 1), new THREE.MeshStandardMaterial())
        // testMesh.castShadow = true
        testMesh.receiveShadow = true
        this.scene.add(testMesh)
    }

    onResourcesLoaded = () => {
        this.floor = new Floor()
        this.fox = new Fox()
        this.environment = new Environment()
    }

    onUpdate = (time) => {
        if(this.fox)
            this.fox.onUpdate(time)
    }
}