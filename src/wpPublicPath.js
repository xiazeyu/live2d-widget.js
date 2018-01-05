/**
 * @description Automatic locate the publicPath for webpack
 */


'use strict';

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
  let stack = e.stack || e.sourceURL || e.stacktrace,
  rExtractUri = /(?:http|https|file):\/\/.*?\/.+?.js/,
  absPath = rExtractUri.exec(stack);
  currentScriptPath = absPath[0] || '';
  currentScriptPath = currentScriptPath.replace(/[^/\\\\]+$/, '');
}

if (currentScriptPath === null){
  throw 'Cannot get currentScriptPath for wpPublicPath';
}

// expose the path to the global,
// and wp will finish the following work
__webpack_public_path__ = currentScriptPath;
if (process.env.NODE_ENV === 'development'){
  console.log(`wpPP: webPack publicPath: ${__webpack_public_path__}`);
}
