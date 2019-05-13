class EventEmitter {
  constructor() {
    this.eventHandlers = {};
  }

  on(name, handler) {
    if (typeof handler !== 'function') {
      throw new TypeError('Event handler is not a function.');
    }
    if (!this.eventHandlers[name]) {
      this.eventHandlers[name] = [];
    }
    this.eventHandlers[name].push(handler);
    return this;
  }

  emit(name, ...args) {
    if (!!this.eventHandlers[name]) {
      this.eventHandlers[name].forEach(handler => {
        if (typeof handler === 'function') {
          handler(...args);
        }
      });
    }
    if (!!this.eventHandlers['*']) {
      this.eventHandlers['*'].forEach(handler => {
        if (typeof handler === 'function') {
          handler(name, ...args);
        }
      });
    }
    return this;
  }
}

module.exports = {
  EventEmitter
};