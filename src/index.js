import Event from './event'

export default class Elx extends Event {
  constructor(selector, initialState) {
    super()
    this.el = typeof selector === 'string' ?
      document.querySelector(selector) :
      selector
    this.state = initialState
    this.sources = []
  }

  fromAction(type, getNewState, fromEvent) {
    this.sources.push({
      type,
      getNewState,
      fromEvent
    })

    const currentSourceIndex = this.sources.length - 1

    const el = fromEvent ? this.el : this
    el.addEventListener(type, (...args) => {
      if (typeof getNewState === 'function') {
        const newState = getNewState(...args)
        if (newState && newState.then) {
          newState.then(actualNewState => {
            this.run(currentSourceIndex, actualNewState)
          })
        } else {
          this.run(currentSourceIndex, newState)
        }
      } else {
        this.run(currentSourceIndex, getNewState)
      }
    }, false)

    return this
  }

  fromDOMEvent(type, getNewState) {
    this.fromAction(type, getNewState, true)
    return this
  }

  reduce(handler) {
    this.sources[this.sources.length - 1].handler = handler
    return this
  }

  subscribe(subscriber) {
    this.sources[this.sources.length - 1].subscriber = subscriber
    this.run(this.sources.length - 1)
    return this
  }

  run(currentSourceIndex, newState) {
    const source = this.sources[currentSourceIndex]
    this.state = (source.handler && typeof newState !== 'undefined') ?
      source.handler(this.state, newState) :
      this.state
    if (source.subscriber) {
      source.subscriber(this.el, this.state)
    }
    return this
  }
}

export function elx(...args) {
  return new Elx(...args)
}
