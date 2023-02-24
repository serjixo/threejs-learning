import {GLTFLoader} from "three/addons/loaders/GLTFLoader.js";
import * as THREE from 'three'
import ResourcesObserver from "./ResourcesObserver.js";

export default class Resources {
    constructor(sources) {

        this.resourcesObserver = new ResourcesObserver()
        this.sources = sources
        this.loadersMap = new Map()

        //    update
        this.items = {}
        this.toLoad = this.sources.length
        this.loaded = 0

        this.setLoaders()
        this.startLoading().then(() => {
            if (this.loaded === this.toLoad) {
                this.resourcesObserver.notify()
            }
        })

    }

    setLoaders() {
        this.loaders = {}
        this.loaders.gltfLoader = new GLTFLoader()
        this.loaders.textureLoader = new THREE.TextureLoader()
        this.loaders.cubeTextureLoader = new THREE.CubeTextureLoader()

        this.loadersMap.set("gltfLoader", this.loaders.gltfLoader)
        this.loadersMap.set("textureLoader", this.loaders.textureLoader)
        this.loadersMap.set("cubeTextureLoader", this.loaders.cubeTextureLoader)
    }

    startLoading = async () => {
        for (let i = 0; i < this.toLoad; i++) {
            let loader = this.loadersMap.get(this.sources[i].typeOfLoader);
            if (!loader) console.log('source loader typeOfLoader wrong?')
            await loader.loadAsync(this.sources[i].path).then((file) => {
                this.sourceLoaded(this.sources[i], file)
            })
        }

    }

    sourceLoaded(source, file) {
        this.items[source.name] = file
        this.loaded++
    }
}