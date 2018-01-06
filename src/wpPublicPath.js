/**
 * @description Automatic locate the publicPath for webpack
 */


'use strict';

/**
 * Get current script path
 * @return {String} the accessable path of current script
 * @example
 * get 'dev/' or 'https'
 */

function getCurrentPath(){

  let currentScriptPath = null;

  try{
    // FF, Chrome
    // use their API to get the path of current script

    // a.b();
    // console.log('Stage1');
    let currentScriptElement = document.currentScript;
    currentScriptPath = currentScriptElement.getAttribute('src').replace(/[^/\\\\]+$/, '');
  }catch(e){
    // IE 10 +, Safari and Opera 9

    // console.log('Stage2');
    // console.log(e);

    let stack = e.stack || e.sourceURL || e.stacktrace,
    rExtractUri = /(?:http|https|file):\/\/.*?\/.+?.js/,
    absPath = rExtractUri.exec(stack);
    currentScriptPath = absPath[0] || '';
  }

  if (currentScriptPath === null){
    throw 'Cannot get currentScriptPath for wpPublicPath';
  }

  return currentScriptPath;

}

// expose the path to the global,
// and wp will finish the following work
__webpack_public_path__ = getCurrentPath();
if (process.env.NODE_ENV === 'development'){
  console.log(`wpPP: publicPath: ${__webpack_public_path__}`);
}
