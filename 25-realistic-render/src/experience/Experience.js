import Sizes from "./utils/Sizes.js";

export default class Experience {

    constructor(canvas) {
        //enable global acces to experience from browser console
        window.experience = this

        //options
        this.canvas = canvas

        this.sizes = new Sizes()
    }

}