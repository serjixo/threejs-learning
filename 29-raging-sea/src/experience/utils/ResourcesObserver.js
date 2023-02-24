import Observer from "./Observer.js";

let instance = null

export default class ResourcesObserver extends Observer {
    constructor() {
        //singleton
        if (instance) {
            return instance
        }
        super()
        instance = this
    }
}