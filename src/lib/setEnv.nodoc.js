import 'current-device';
import 'whatwg-fetch'
import 'es6-promise/auto';

// eslint-disable-next-line capitalized-comments
// import 'core-js/fn/object/assign';
// Polyfill for Object.assign
// https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/assign
if (typeof Object.assign !== 'function') {

  // Must be writable: true, enumerable: false, configurable: true
  Object.defineProperty(Object, 'assign', {
    // eslint-disable-next-line no-unused-vars
    'value': function assign (target, varArgs) { // .length of function is 2

      // eslint-disable-next-line eqeqeq
      if (target == null) { // TypeError if undefined or null

        throw new TypeError('Cannot convert undefined or null to object');

      }

      const to = Object(target);

      for (let index = 1; index < arguments.length; index++) {

        const nextSource = arguments[index];
        // eslint-disable-next-line eqeqeq
        if (nextSource != null) { // Skip over if undefined or null

          for (const nextKey in nextSource) {

            // Avoid bugs when hasOwnProperty is shadowed
            if (Object.prototype.hasOwnProperty.call(nextSource, nextKey)) {

              to[nextKey] = nextSource[nextKey];

            }

          }

        }

      }
      return to;

    },
    'writable': true,
    'configurable': true,
  });

}

// Polyfill for document.currentScript.src
if(!document.currentScript){
  // https://github.com/mozilla/pdf.js/blob/e081a708c36cb2aacff7889048863723fcf23671/src/shared/compatibility.js#L97
  // For IE, Chrome < 29
  const scripts = document.getElementsByTagName('script');
  document.currentScript = scripts[scripts.length - 1]; // eslint-disable-line no-magic-numbers
}

// Polyfill for window.requestAnimationFrame
// https://github.com/darius/requestAnimationFrame/blob/master/requestAnimationFrame.js
if(!window.requestAnimationFrame){ // Chromium
  window.requestAnimationFrame =
     window.webkitRequestAnimationFrame || // Webkit
     window.mozRequestAnimationFrame || // Mozilla Geko
     window.msRequestAnimationFram; // IE Trident?
}

// Polyfill for window.cancelAnimationFrame
// https://github.com/darius/requestAnimationFrame/blob/master/requestAnimationFrame.js
if(!window.cancelAnimationFrame){ // Chromium
  window.cancelAnimationFrame =
     window.webkitCancelAnimationFrame || // Webkit
     window.webkitCancelRequestAnimationFrame || // Webkit
     window.mozCancelAnimationFrame || // Mozilla Geko
     window.mozCancelRequestAnimationFrame || // Mozilla Geko
     window.msCancelAnimationFrame || // IE Trident?
     window.msCancelRequestAnimationFrame; // IE Trident?
}

// Fallback function for window.requestAnimationFrame and window.cancelAnimationFrame
// https://github.com/darius/requestAnimationFrame/blob/master/requestAnimationFrame.js
if (/iP(ad|hone|od).*OS 6/.test(window.navigator.userAgent) || !window.requestAnimationFrame || !window.cancelAnimationFrame) { // iOS6 is buggy
  const lastTime = 0;
  window.requestAnimationFrame = (callback) => {
    const now = Date.now();
    const nextTime = Math.max(lastTime + 16, now);
    return setTimeout(() => {
      callback(lastTime = nextTime);
    }, nextTime - now);
  }
  window.cancelAnimationFrame = clearTimeout;
}

// fpsCounter
import '../utils/fpsCounter';
