import Observer from "./Observer.js";

export default class TimeObserver extends Observer {

    constructor() {
        super()
        // this.subscribedMethods = []
        this.start = Date.now()
        this.current = this.start
        this.elapsedTime = 0
        this.delta = 16
        window.requestAnimationFrame(() => this.tick())
    }

    /* subscribe(func) {
         this.subscribedMethods.push(func);
     }

     unsubscribe(func) {
         this.subscribedMethods = this.subscribedMethods.filter(observer => observer !== func);
     }*/

    tick = () => {
        const currentTime = Date.now()
        this.delta = currentTime - this.current
        this.current = currentTime
        const elapsedTime = this.current - this.start

        this.notify({delta: this.delta, current: this.current, elapsedTime})

        window.requestAnimationFrame(() => this.tick())
    }

    /*  notify = (time) => {
          if (this.subscribedMethods.length) {
              this.subscribedMethods.forEach(observer => observer(time));
          }
      }*/
    /*

    stopEventListener() {
        window.removeEventListener('resize', this.notify)
    }*/

}

