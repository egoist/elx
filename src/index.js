import Event from './event'

export default class Elx extends Event {
  constructor(selector, initialState) {
    super()
    this.el = typeof selector === 'string' ?
      document.querySelector(selector) :
      selector
    this.state = initialState
    this.subscribers = []
  }

  fromAction(type, getNewState) {
    this.type = type
    this.getNewState = getNewState

    const el = this._fromDOMEvent ? this.el : this
    el.addEventListener(this.type, (...args) => {
      if (typeof this.getNewState === 'function') {
        const newState = this.getNewState(...args)
        if (newState && newState.then) {
          newState.then(actualNewState => {
            this.run(actualNewState)
          })
        } else {
          this.run(newState)
        }
      } else {
        this.run(this.getNewState)
      }
    }, false)

    return this
  }

  fromDOMEvent(type, getNewState) {
    this._fromDOMEvent = true
    this.fromAction(type, getNewState)

    return this
  }

  reduce(handler) {
    this.handler = handler
    return this
  }

  subscribe(subscriber) {
    this.subscribers.push(subscriber)
    this.run()
    return this
  }

  run(newState) {
    for (const subscriber of this.subscribers) {
      this.state = (this.handler && typeof newState !== 'undefined') ?
        this.handler(this.state, newState) :
        this.state
      subscriber(this.el, this.state)
    }
    return this
  }
}

export function elx(...args) {
  return new Elx(...args)
}
