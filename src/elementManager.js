/**
 * @description The container and manager for all the DOM and WebGL emelents.
 */


import { config } from './config/configMgr';
import htmlTemplate from './tmplate/innerHTML';

/**
 * The current WebGL element
 * @type {RenderingContext}
 */

let currWebGL = undefined;

/**
 * The current canvas element
 * @type {DOMString}
 */

let currCanvas;

/**
 * Create the canvas and styles using DOM
 * @return {null}
 */

function createElement(){

  let newElem = document.createElement('div');
  newElem.id = config.name.div;
  newElem.innerHTML = htmlTemplate(config);
  document.body.appendChild(newElem);
  currCanvas = document.getElementById(config.name.canvas);
  initWebGL();

}

/**
 * Find and set the current WebGL element to the container
 * @return {null}
 */

function initWebGL(){

  var NAMES = ['webgl2', 'webgl', 'experimental-webgl2', 'experimental-webgl', 'webkit-3d', 'moz-webgl'];
  for(let i = 0; i < NAMES.length; i++){
    try{
      let ctx = currCanvas.getContext(NAMES[i], {
        alpha: true,
        antialias: true,
        premultipliedAlpha: true,
        failIfMajorPerformanceCaveat: false,
      });
      if(ctx) currWebGL = ctx;
    }catch(e){}
  }
  if(!gl){
    console.error('Live2D widgets: Failed to create WebGL context.');
    if(!window.WebGLRenderingContext){
      console.error('Your browser may not support WebGL, check https://get.webgl.org/ for futher information.');
    }
    return;
  }
};


export{
  createElement,
  currWebGL,
}
