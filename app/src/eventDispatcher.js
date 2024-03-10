export class EventDispatcher {
    events = {}

    trigger(eventName, event) {
        if (typeof this.events[eventName] === 'undefined') {
            this.registerEvent(eventName)
        }

        this.events[eventName].forEach((resolve) => {
            resolve(event)
        })
    }

    listen(eventName, callable = null) {
        if (typeof this.events[eventName] === 'undefined') {
            this.registerEvent(eventName)
        }

        this.events[eventName].push(callable)
    }

    registerEvent(eventName) {
        this.events[eventName] = []
    }
}