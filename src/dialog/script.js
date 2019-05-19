import { EventEmitter } from '../utils/EventEmitter';

class ScriptEngine extends EventEmitter {
  constructor(cb) {
    super();
    this.output = cb;
    this.emitters = [];
    this.variables = [];
  }

  /**
   * @param {string} name 
   * @param {(...args:string[], cb: () => void, engine: ScriptEngine) => void} func 
   */
  registerEmitter(name, func) {
    this.emitters.push({
      name: name.toLowerCase(), func
    })
  }

  /**
   * @param {string} name 
   * @param {(...args:string[]) => Promise|string} func
   */
  registerVariable(name, func) {
    this.variables.push({
      name: name.toLowerCase(), func
    })
  }

  /**
   * @param {string} when
   */
  matchEmitter(when) {
    return this.emitters.find((emitter) => {
      return when.toLowerCase().startsWith(emitter.name);
    })
  }

  /**
   * @param {string} name
   */
  matchVariable(name) {
    return this.variables.find((variable) => {
      return name.toLowerCase() === variable.name;
    })
  }

  /**
   * @param {string} text
   */
  injectVariable(sourceText) {
    if (Array.isArray(sourceText)) {
      sourceText = sourceText[Math.floor(Math.random() * sourceText.length)];
    }
    const re = /\$(\w+)\$/g;
    let text = sourceText;
    let match = null;
    const matches = [];
    while (match = re.exec(sourceText), match !== null) {
      matches.push(match)
    }

    const promises = matches.map((match) => {
      const variable = this.matchVariable(match[1]);
      if (!variable) {
        throw new Error('Unknown variable: ' + match[1]);
      }
      const res = variable.func();
      const resPromise = Promise.resolve(res);
      return resPromise.then((str) => {
        text = text.replace(match[0], str);
        return str;
      })
    });
    return Promise.all(promises).then(() => {
      return text
    });
  }

  /**
   * @param {string} when 
   * @param {string} text 
   */
  run(when, text) {
    const whenStr = when.trim().toLowerCase();
    const emitter = this.matchEmitter(whenStr);
    if (!emitter) {
      throw new Error('Unknown emitter: ' + whenStr);
    }
    const args = whenStr.slice(emitter.name.length).trim().split(/\s+/g);
    emitter.func(args, () => {
      this.emit('emit');
      this.injectVariable(text).then((finalText) => this.output(finalText));
    });
  }
}

module.exports = {
  ScriptEngine
}
