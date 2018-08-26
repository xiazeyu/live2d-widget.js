/* global process, device */

import htmlTemplate from './tmplate/innerHTML';

/**
 * Get webGL RenderingContext.
 * @param   {HTMLElement}  canvas  The anvas element.
 * @return  {RenderingContext}     The rendering context.
 */
function getWebGL (canvas) {

  if (!canvas.getContext) {

    console.error('Unable to get canvas.getContext, your browser may not support canvas, check https://get.webgl.org/.');
    throw new Error('live2d-widget: Failed to get WebGL context.');

  }
  if (!window.WebGLRenderingContext) {

    console.error('Unable to get window.WebGLRenderingContext, browser may not support webGL, check https://get.webgl.org/.');
    throw new Error('live2d-widget: Failed to get WebGL context.');

  }

  const contextTypes = ['webgl2',
    'webgl',
    'webkit-3d',
    'moz-webgl',
    'experimental-webgl2',
    'experimental-webgl'];

  for (const key in contextTypes) {

    if ({}.hasOwnProperty.call(contextTypes, key)) {

      try{

        const ctx = canvas.getContext(contextTypes[key], {
          'alpha': true,
          'antialias': true,
          'failIfMajorPerformanceCaveat': device.mobile(),
          'premultipliedAlpha': true,
        });
        if(ctx) {

          return ctx;

        }

      } catch (e) { } // eslint-disable-line no-empty

    }

  }
  console.error('Unable to get the rendering context, your browser may not support canvas, check https://get.webgl.org/.');
  throw new Error('live2d-widget: Failed to get WebGL context.');

}

/**
 * To detect if user's display size is dynamic.
 * @param  {Config}   usrConfig User's config.
 * @return {Boolean}  If user's display size is dynamic.
 */
function isDynamic (usrConfig) {

  const isHeightDynamic = !!usrConfig.displayHeight.match('%');
  const isWidthDynamic = !!usrConfig.displayWidth.match('%');
  if (isHeightDynamic !== isWidthDynamic) {

    throw new Error('live2d-widget: config.displayHeight must have the same size type(fixed or dynamic) with config.displayWidth.');

  }
  return isHeightDynamic;

}

/**
 * Create canvas for live2d-widget.
 * @param   {Config}  usrConfig  Config.
 * @return  {HTMLElement}        The canvas element.
 */
function createCanvasElement (usrConfig) {

  const newCanvasElem = document.createElement('canvas');
  const canvasAttributes = {
    'height': undefined,
    'width': undefined,
  };
  const canvasStyleAttributes = {
    'border': usrConfig.devBorder ? 'dashed 1px #CCC' : null, // eslint-disable-line no-ternary
    'bottom': usrConfig.displayOffsetV,
    'height': undefined,
    'opacity': usrConfig.displayOpacityDefault,
    'pointer-events': 'none',
    'position': 'fixed',
    'visibility': usrConfig.displayShow ? 'visible' : 'hidden', // eslint-disable-line no-ternary
    'width': undefined,
    [usrConfig.displaySide]: usrConfig.displayOffsetH,
    'z-index': usrConfig.displayzindex,
  };

  if (isDynamic(usrConfig)) {

    const screenHeight = window.screen.availHeight || window.screen.height || (device.mobile() ? 1920 : 1080);
    const screenWidth = window.screen.availWidth || window.screen.width || (device.mobile() ? 1080 : 1920);

    canvasAttributes.height = parseFloat(usrConfig.displayHeight) * 0.01 * usrConfig.displaySampleLevel;
    canvasAttributes.width = parseFloat(usrConfig.displayWidth) * usrConfig.displaySampleLevel;

    function changeSize () {

      const styleHeight = '300px';
      const styleWidth = '150px';

    }
    window.addEventListener('resize', changeSize);
    changeSize();

  }else{

    canvasAttributes.height = parseFloat(usrConfig.displayHeight) * usrConfig.displaySampleLevel;
    canvasAttributes.width = parseFloat(usrConfig.displayWidth) * usrConfig.displaySampleLevel;
    canvasStyleAttributes.height = usrConfig.displayHeight;
    canvasStyleAttributes.width = usrConfig.displayWidth;

  }

  for (const key in canvasAttributes) {

    if ({}.hasOwnProperty.call(canvasAttributes, key)) {

      if (canvasAttributes[key]) {

        newCanvasElem.setAttribute(key, canvasAttributes[key]);

      }

    }

  }
  for (const key in canvasStyleAttributes) {

    if ({}.hasOwnProperty.call(canvasStyleAttributes, key)) {

      if(canvasStyleAttributes[key]) {

        newCanvasElem.style.setProperty(key, `${canvasStyleAttributes[key]} !important`);

      }

    }

  }

  if (usrConfig.displayOpacityDefault !== usrConfig.displayOpacityOnHover) {

    window.requestAnimationFrame(function changeOpacity () {

      window.requestAnimationFrame(changeOpacity);
      // TODO

    });

  }
  window.addEventListener('beforeprint', () => {
    newCanvasElem.style.visibility = 'hidden';
  })
  window.addEventListener('afterprint', () => {
    newCanvasElem.style.visibility = 'visible';
  })
  return newCanvasElem;

}

/**
 * Create a new live2d-widget Element and append it to HTML.
 * @param   {Config}  usrConfig  User's config.
 * @return  {Object}  An object of elements created.
 * @property  {HTMLElement}  canvas   The canvas element.
 * @property  {HTMLElement}  element  The live2d-widget element.
 * @property  {RenderingContext}  webGL  The rendering context.
 */
function createElement (usrConfig) {

  const newElem = document.createElement('live2d-widget');
  const newCanvasElem = createCanvasElement(usrConfig);
  const webGL = getWebGL(newCanvasElem);
  const elemAttributes = {'className': 'live2d-widget'};
  for (const key in elemAttributes) {

    if ({}.hasOwnProperty.call(elemAttributes, key)) {

      if (elemAttributes[key]) {

        newElem.setAttribute(key, elemAttributes[key]);

      }

    }

  }
  if(newElem.createShadowRoot) {

    const shadowRoot = newElem.attachShadow({'mode': 'open'});
    shadowRoot.innerHTML = htmlTemplate;
    shadowRoot.appendChild(newCanvasElem);

  }else{

    newElem.innerHTML = htmlTemplate;
    newElem.appendChild(newCanvasElem);

  }

  document.body.appendChild(newElem);
  return {
    'canvas': newCanvasElem,
    'element': newElem,
    webGL,
  };

}

if (process.env.NODE_ENV === 'development') { // eslint-disable-line no-process-env

  window.elementMgr = {
    createCanvasElement,
    createElement,
    getWebGL,
    isDynamic,
  };

}

export {createElement};
