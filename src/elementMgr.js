/* global process, device */

import htmlTemplate from './tmplate/innerHTML';

/**
 * Find and init webGL RenderingContext according to canvas element
 * @param   {HTMLElement}  canvas  Canvas element
 * @return  {RenderingContext}          The webGL RenderingContext
 */
function initWebGL (canvas) {

  const contextTypes = [
    'webgl2',
    'webgl',
    'experimental-webgl2',
    'experimental-webgl',
    'webkit-3d',
    'moz-webgl',
  ];
  for (const i in contextTypes) {

    try {

      const ctx = canvas.getContext(contextTypes[i], {
        'alpha': true,
        'antialias': true,
        'premultipliedAlpha': true,
        'failIfMajorPerformanceCaveat': false,
      });
      if (ctx) {

        return ctx;

      }

    } catch (e) {} // eslint-disable-line no-empty

  }
  if (!window.WebGLRenderingContext) {

    console.error('Your browser may not support webGL, check https://get.webgl.org/.');

  }
  throw new Error('live2d-widget: Failed to create WebGL context.');

}

/**
 * Create and init canvas for live2d-widget use.
 * @param   {Config}  config  Config
 * @return  {HTMLElement}     Canvas processed
 * @todo Finish program
 */
function createCanvasElement (config) {

  const newCanvasElem = document.createElement('canvas');
  const canvasAttributes = {
    'width': config.displayWidth * config.displaySampleLevel * (device.mobile() ? config.mobileScale : 1), // eslint-disable-line no-magic-numbers
    'height': config.displayHeight * config.displaySampleLevel * (device.mobile() ? config.mobileScale : 1), // eslint-disable-line no-magic-numbers
  };
  const canvasStyleAttributes = {
    'position': 'fixed',
    'width': `${config.displayWidth}px`,
    'height': `${config.displayHeight}px`,
    'opacity': config.reactOpacityDefault,
    [config.displaySide]: `${config.displayOffsetH}px`,
    'bottom': `${config.displayOffsetV}px`,
    'z-index': 473193,
    'pointer-events': 'none',
    'border': process.env.NODE_ENV === 'development' ? 'dashed 1px #CCC' : null,
  };
  for (const i in canvasAttributes) {

    newCanvasElem.setAttribute(i, canvasAttributes[i]);

  }
  for (const i in canvasStyleAttributes) {

    newCanvasElem.style.setProperty(i, canvasStyleAttributes[i]);

  }

  return newCanvasElem;

}

/**
 * To create a new HTML Element and append it to HTML.
 * @param   {String}  tagName  Tag name of element
 * @param   {String}  id       Id of element
 * @return  {HTMLElement}      Element created
 */
function createElement (tagName, id) {

  const newElem = document.createElement(tagName);
  newElem.className = 'live2d-widget';
  if (id !== null) {

    newElem.id = id;

  }
  document.body.appendChild(newElem);
  return newElem;

}

/**
 * Init element for live2d-widget use
 * @param   {HTMLElement}  elem  HTMLElement to init
 * @param   {Config}  config     Config
 * @return  {Object}             Object contains element, webGL, canvas
 */
function initElement (elem, config) {

  const element = elem;
  const canvas = createCanvasElement(config);
  const webGL = initWebGL(canvas);
  if (element.createShadowRoot) {

    const shadowRoot = element.attachShadow({
      'mode': 'open', });
    shadowRoot.innerHTML = htmlTemplate;
    shadowRoot.appendChild(canvas);

  } else {

    element.innerHTML = htmlTemplate;
    element.appendChild(canvas);

  }

  return {
    element,
    webGL,
    canvas,
  };

}

export {
  createElement,
  initElement,
};
