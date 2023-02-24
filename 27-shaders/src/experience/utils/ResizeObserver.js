import Observer from "./Observer.js";

export default class ResizeObserver extends Observer {

    constructor() {
        super()
        window.addEventListener('resize', this.notify)
    }

    stopResizeListener() {
        window.removeEventListener('resize', this.notify)
    }

}

