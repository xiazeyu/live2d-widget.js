/**
 * @description The container and manager for all the DOM and WebGL emelents.
 */


import { config } from './config/configMgr';
import { htmlTemplate } from './tmplate/innerHTML';

let currWebGL = undefined;
let currCanvas;

function createCanvas(){

  let newElem = document.createElement('div');
  newElem.id = config.name.div;
  newElem.innerHTML = htmlTemplate(config);
  document.body.appendChild(newElem);

}

function getCurrCanvas(){
  return currCanvas;
}

/**
 * set the current WebGL element to the container
 * @param {RenderingContext } e The WebGL element to be set
 * @return {null}
 */

function setCurrWebGL(e){
  currWebGL = e;
}

/**
 * get the current WebGL element in the container
 * @return {RenderingContext} The current WebGL element
 */

function getCurrWebGL(){
  return currWebGL;
}

function getWebGLContext()
{
    var NAMES = [ "webgl" , "experimental-webgl" , "webkit-3d" , "moz-webgl"];
    for( var i = 0; i < NAMES.length; i++ ){
        try{
            var ctx = canvas.getContext(NAMES[i], {premultipliedAlpha : true});
            if(ctx) return ctx;
        }
        catch(e){}
    }
    return null;
};


export{
  createCanvas,
  getCurrCanvas,
  setCurrWebGL,
  getCurrWebGL,
}
