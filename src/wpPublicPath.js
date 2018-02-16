/**
 * @description Automatic locate the publicPath and set it up for webpack.
 */
/* global __webpack_public_path__: true, process */



/**
 * Get current script path
 * @return {String} The path of current script
 * @example
 * get 'file:///C:/git/live2d-widget/dev/bundle.js' or 'https://www.host.com/test/js/bundle.js'
 */
function getCurrentPath () {

  try{

    // FF, Chrome, Modern browsers
    // Use their API to get the path of current script

    // A.b();
    // Console.log('wpStage1');

    return document.currentScript.src;

  }catch(e) {

    // Document.currentScript doesn't supports

    // Console.log('wpStage2');

    // Method 1
    // https://github.com/mozilla/pdf.js/blob/e081a708c36cb2aacff7889048863723fcf23671/src/shared/compatibility.js#L97
    // IE, Chrome < 29

    const scripts = document.getElementsByTagName('script');
    return scripts[scripts.length - 1].src; // eslint-disable-line no-magic-numbers

    /*
    // Method 2
    // Parse the error stack trace maually
    // https://github.com/workhorsy/uncompress.js/blob/master/js/uncompress.js#L25

    const stack = e.stack;
    let line = null;

    // Chrome and IE
    if (stack.indexOf('@') !== -1) { // eslint-disable-line no-magic-numbers

      line = stack.split('@')[1].split('\n')[0]; // eslint-disable-line no-magic-numbers
    // Firefox

    } else {

      line = stack.split('(')[1].split(')')[0]; // eslint-disable-line no-magic-numbers

    }
    line = `${line.substring(0, line.lastIndexOf('/')) }/`; // eslint-disable-line no-magic-numbers
    return line;
    */

  }

}

// Expose the path to the global,
// And wp will finish the following work
__webpack_public_path__ = getCurrentPath().replace(/[^/\\\\]+$/, ''); // eslint-disable-line camelcase
if (process.env.NODE_ENV === 'development') {

  console.log(`Live2Dwidget: publicPath: ${__webpack_public_path__}`); // eslint-disable-line camelcase

}

export {
  getCurrentPath,
};
