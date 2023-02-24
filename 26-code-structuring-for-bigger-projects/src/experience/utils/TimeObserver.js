import Observer from "./Observer.js";

let instance = null
export default class TimeObserver extends Observer {

    constructor() {
        if(instance){
            return instance
        }
        super()
        instance = this

        this.start = Date.now()
        this.current = this.start
        this.elapsedTime = 0
        this.delta = 16
        window.requestAnimationFrame(() => this.tick())
    }

    tick = () => {
        const currentTime = Date.now()
        this.delta = currentTime - this.current
        this.current = currentTime
        const elapsedTime = this.current - this.start

        this.notify({delta: this.delta, current: this.current, elapsedTime})

        window.requestAnimationFrame(() => this.tick())
    }

}

