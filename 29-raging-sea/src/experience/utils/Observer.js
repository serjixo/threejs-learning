
export default class Observer {

    constructor() {
        this.subscribedMethods = []
    }

    subscribe(func) {
        this.subscribedMethods.push(func);
    }

    unsubscribe(func) {
        this.subscribedMethods = this.subscribedMethods.filter(observer => observer !== func);
    }

    notify = (optional) => {
        if (this.subscribedMethods.length) {
            this.subscribedMethods.forEach(observer => observer(optional));
        }
    }

    stopEventListener(nameEventListener, functionToStop) {
        window.removeEventListener(nameEventListener, functionToStop)
    }

}

