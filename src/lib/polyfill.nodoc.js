/*
 * Polyfill for fetch
 * https://github.com/github/fetch
 */
import 'whatwg-fetch';

/*
 * Polyfill for promise
 * https://github.com/stefanpenner/es6-promise
 */
import 'es6-promise/auto';

/*
 * Polyfill for Object.assign
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/assign
 */
/* eslint-disable */
if (typeof Object.assign != 'function') {
  // Must be writable: true, enumerable: false, configurable: true
  Object.defineProperty(Object, "assign", {
    value: function assign(target, varArgs) { // .length of function is 2
      'use strict';
      if (target == null) { // TypeError if undefined or null
        throw new TypeError('Cannot convert undefined or null to object');
      }

      var to = Object(target);

      for (var index = 1; index < arguments.length; index++) {
        var nextSource = arguments[index];

        if (nextSource != null) { // Skip over if undefined or null
          for (var nextKey in nextSource) {
            // Avoid bugs when hasOwnProperty is shadowed
            if (Object.prototype.hasOwnProperty.call(nextSource, nextKey)) {
              to[nextKey] = nextSource[nextKey];
            }
          }
        }
      }
      return to;
    },
    writable: true,
    configurable: true
  });
}
/* eslint-enable */

/*
 * Polyfill for document.currentScript.src
 * https://github.com/mozilla/pdf.js/blob/e081a708c36cb2aacff7889048863723fcf23671/src/shared/compatibility.js#L97
 * Support: IE, Chrome<29.
 */
if (!document.currentScript) {

  const scripts = document.getElementsByTagName('script');
  document.currentScript = scripts[scripts.length - 1]; // eslint-disable-line no-magic-numbers


}

/*
 * Polyfill for window.requestAnimationFrame
 * https://github.com/darius/requestAnimationFrame/blob/master/requestAnimationFrame.js
 */
if (!window.requestAnimationFrame) { // Chromium

  window.requestAnimationFrame =
    window.webkitRequestAnimationFrame || // Webkit
    window.mozRequestAnimationFrame || // Mozilla Geko
    window.msRequestAnimationFram; // IE Trident?

}

/*
 * Polyfill for window.cancelAnimationFrame
 * https://github.com/darius/requestAnimationFrame/blob/master/requestAnimationFrame.js
 */
if (!window.cancelAnimationFrame) { // Chromium

  window.cancelAnimationFrame =
    window.webkitCancelAnimationFrame || // Webkit
    window.webkitCancelRequestAnimationFrame || // Webkit
    window.mozCancelAnimationFrame || // Mozilla Geko
    window.mozCancelRequestAnimationFrame || // Mozilla Geko
    window.msCancelAnimationFrame || // IE Trident?
    window.msCancelRequestAnimationFrame; // IE Trident?

}

/*
 * Fallback function for window.requestAnimationFrame and window.cancelAnimationFrame
 * https://github.com/darius/requestAnimationFrame/blob/master/requestAnimationFrame.js
 */
if (/iP(ad|hone|od).*OS 6/.test(window.navigator.userAgent) || !window.requestAnimationFrame || !window.cancelAnimationFrame) { // IOS6 is buggy

  let lastTime = 0;
  window.requestAnimationFrame = (callback) => {

    const now = Date.now();
    const nextTime = Math.max(lastTime + 16, now); // eslint-disable-line no-magic-numbers
    return setTimeout(() => {

      callback(lastTime = nextTime);

    }, nextTime - now);

  };
  window.cancelAnimationFrame = clearTimeout;

}
