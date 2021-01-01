export class Emitter {
    constructor() {
        this.listeners = {}
    }

    emit(event, ...args) {
        if (!Array.isArray(this.listeners[event])) {
            return false
        }
        this.listeners[event].forEach(listener => {
            listener(...args)
        })
        return true
    }

    subscribe(event, fn) {
        this.listeners[event] = this.listeners[event] || []
        this.listeners[event].push(fn)
        return () => {
            this.listeners[event] =
                this.listeners[event].filter(listener => listener !== fn)
        }
    }

}

const emitter = new Emitter()

// Example
// const unsub = emitter.subscribe('sergei', data => console.log('Sub: ', data))
// setTimeout(() => {
//     emitter.emit('sergei', 'After 2 seconds')
// }, 2000)
//
// setTimeout(() => {
//     unsub()
// }, 3000)
//
// setTimeout(() => {
//     emitter.emit('sergei', 'After 4 seconds')
// }, 4000)