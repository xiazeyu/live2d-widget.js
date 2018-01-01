/**
 * @description Automatic locate the publicPath for webpack
 */


'use strict';

let currentScriptPath;

try{
  // a.b();
  // console.log('Stage1');
  let currentScriptElement = document.currentScript;
  currentScriptPath = currentScriptElement.getAttribute('src').replace(/[^/\\\\]+$/, '');
}catch(e){
  // console.log('Stage2');
  let stack = e.stack || e.sourceURL || e.stacktrace,
  rExtractUri = /(?:http|https|file):\/\/.*?\/.+?.js/,
   absPath = rExtractUri.exec(stack);
   currentScriptPath = absPath[0] || '';
   currentScriptPath = currentScriptPath.replace(/[^/\\\\]+$/, '');
}

__webpack_public_path__ = currentScriptPath;
if (process.env.NODE_ENV === 'development'){
  console.log(`webPack publicPath: ${__webpack_public_path__}`);
}
