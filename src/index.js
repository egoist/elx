export default class Elx {
  constructor(selector, initialState) {
    this.el = typeof selector === 'string' ?
      document.querySelector(selector) :
      selector
    this.state = initialState
  }

  on(type, getNewState) {
    this.type = type
    this.getNewState = getNewState
    return this
  }

  reduce(handler) {
    this.handler = handler
    return this
  }

  subscribe(runAsStateChanges) {
    this.el.addEventListener(this.type, e => {
      if (typeof this.getNewState === 'function') {
        const newState = this.getNewState(e)
        if (newState.then) {
          newState.then(actualNewState => {
            this.run(runAsStateChanges, actualNewState)
          })
        } else {
          this.run(runAsStateChanges, newState)
        }
      } else {
        this.run(runAsStateChanges, this.getNewState)
      }
    }, false)

    return this
  }

  run(runAsStateChanges, newState) {
    this.state = this.handler(this.state, newState)
    runAsStateChanges(this.el, this.state)
    return this
  }
}

export function elx(...args) {
  return new Elx(...args)
}
