export default class Event {
  constructor() {
    this.events = []
  }

  addEventListener(type, fn) {
    this.events[type] = this.events[type] || []
    this.events[type].push(fn)
  }

  clear(type, fn) {
    if(!(type in this.events)) return
    this.events[type].splice(this.events[type].indexOf(fn), 1)
  }

  dispatch(...args) {
    const type = args[0]
    if(!(type in this.events)) return
    for (const actualEvent of this.events[type]) {
      actualEvent(...args.slice(1))
    }
  }
}
