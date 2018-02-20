/**
 * @description The entry point of live2d-widget.js
 */

/* global process */

import device from 'current-device';
import {
  configDefaulter,
} from './config/configMgr';
import {
  createElement as _createElement,
  initElement,
} from './elementMgr';

if (process.env.NODE_ENV === 'development') {

  console.log('--- --- --- --- ---\nLive2Dwidget: Hey that, notice that you are now in DEV MODE.\n--- --- --- --- ---');

}

/**
 * The container for main.js
 * @private
 * @type {Function}
 */
let mainFunc = null; // eslint-disable-line prefer-const

/**
 * The index for private property 'canvas'
 * @private
 * @type  {Symbol}
 */
const iCanvas = Symbol('canvas');
/**
 * The index for private property 'config'
 * @private
 * @type  {Symbol}
 */
const iConfig = Symbol('config');
/**
 * The index for private property 'element'
 * @private
 * @type  {Symbol}
 */
const iElement = Symbol('element');
/**
 * The index for private property 'isActive'
 * @private
 * @type {Symbol}
 */
const iIsActive = Symbol('isActive');
/**
 * The index for private property 'WebGL'
 * @private
 * @type  {Symbol}
 */
const iWebGL = Symbol('WebGL');

class L2Dwidget {

  /**
   * The constructor of L2Dwidget
   * @return {Function}  The instance function itself
   * @example
   * Use codes below to one-key initialize:
   * var t = new L2Dwidget().init();
   */
  constructor () {

    /**
     * The container to store canvas
     * @type {HTMLElement}
     * @private
     */
    this[iCanvas] = null;
    /**
     * The container to store config
     * @type {Config}
     * @private
     */
    this[iConfig] = null;
    this.config = {};
    /**
     * The container to store element
     * @type {HTMLElement}
     * @private
     */
    this[iElement] = null;
    /**
     * The container to store active status
     * @type {Boolean}
     * @private
     */
    this[iIsActive] = false;
    /**
     * The container to store WebGL
     * @type {RenderingContext}
     * @private
     */
    this[iWebGL] = null;
    return this;

  }

  /**
   * Check if Live2D widget is active
   * @return {Boolean} If Live2D widget is active
   * @example
   * var t = new L2Dwidget();
   * t.isActive
   * > true
   */
  get isActive () {

    return this[iIsActive];

  }

  /**
   * Throw an error when you try to set {@link L2Dwidget#isActive}.
   * @param {Boolean} value  Nothing
   * @example
   * var t = new L2Dwidget();
   * t.isActive = balabala;
   * > Error: Uncaught ReferenceError: Invalid varible in asnsignmet.
   */
  set isActive (value) {

    throw new Error('Uncaught ReferenceError: Invalid varible in asnsignmet.');

  }

  /**
   * Get the current HTML Element that L2Dwidget is now using,
   * throw an Error if it is not defined.
   * @return {HTMLELement} The HTMLElement L2Dwidget is now using
   * @example
   * var t = new L2Dwidget();
   * t.element
   * > Error: Live2d-widget: no element defined. Please bind one first.
   * t.element = balabala;
   * t.element
   * > balabala
   */
  get element () {
    if(this[iElement] === null) {

      throw new Error('Live2d-widget: no element defined. Please bind one first.');

    }
    return this[iElement];

  }

  /**
   * Bind and initialize an HTMLElement that belongs to this instance,
   * throw an error if this instance alreday hava an HTMLElement binded
   * @param {HTMLElement} value  An empty HTMLElement to bind and initialize
   * @return {HTMLElement}       The HTMLElement you provided
   * @example
   * t.element = balabala;
   * > balabala(now is initialized and binded with this instance)
   * t.element = bilibili;
   * > Error: Uncaught ReferenceError: Invalid varible in asnsignmet.
   */
  set element (value) {

    if(this[iElement] === null) {

      const {
        element,
        WebGL,
        canvas,
      } = initElement(value, this.config);

      this[iElement] = element;
      this[iWebGL] = WebGL;
      this[iCanvas] = canvas;

    }else{

      throw new Error('Uncaught ReferenceError: Invalid varible in asnsignmet.');

    }

  }

  /**
   * Get the current canvas element L2Dwidget is now using,
   * throw an Error if not found.
   * @return {HTMLElement} The canvas element L2Dwidget is now using
   * @example
   * var t = new L2Dwidget();
   * t.element = miaomiaomiao;
   * t.canvas
   * > balabala
   */
  get canvas () {
    if(this[iCanvas] === null) {

      throw new Error('Live2d-widget: no canvas defined. Please bind element first.');

    }
    return this[iCanvas];

  }

  /**
   * Throw an error when you try to set {@link L2Dwidget#canvas}
   * @param {HTMLElement} value  Nothing
   * @example
   * var t = new L2Dwidget();
   * t.canvas = balabala;
   * > Error: Uncaught ReferenceError: Invalid varible in asnsignmet.
   */
  set canvas (value) {

    throw new Error('Uncaught ReferenceError: Invalid varible in asnsignmet.');

  }

  /**
   * Get the current WebGL content L2Dwidget is now using,
   * throw an Error if not found.
   * @return {RenderingContext} The WebGL content L2Dwidget is now using
   * @example
   * var t = new L2Dwidget();
   * t.element = miaomiaomiao;
   * t.WebGL
   * > balabala
   */
  get WebGL () {
    if(this[iWebGL] === null) {

      throw new Error('Live2d-widget: no WebGL defined. Please bind element first.');

    }
    return this[iWebGL];

  }

  /**
   * Throw an error when you try to set {@link L2Dwidget#WebGL}
   * @param {RenderingContext} value  Nothing
   * @example
   * var t = new L2Dwidget();
   * t.WebGL = balabala;
   * > Error: Uncaught ReferenceError: Invalid varible in asnsignmet.
   */
  set WebGL (value) {

    throw new Error('Uncaught ReferenceError: Invalid varible in asnsignmet.');

  }

  /**
   * Get the current config L2Dwidget is now using
   * @return {Config} The config L2Dwidget is now using
   * @example
   * var t = new L2Dwidget();
   * t.config
   * > balabala
   */
  get config () {

    return this[iConfig];

  }

  /**
   * Set your config for current L2Dwidget instance
   * Mention that: changing config itself doesn't influence the content that is displaying.
   * You should use {@link L2Dwidget#reload} to reload the page
   * @param {Config} value  Config to apply
   * @return {Config}       The config you provided
   * @example
   * t.config = balabala;
   * > balabala(now is applied to this instance)
   * t.config = bilibili;
   * > bilibili(now is applied to this instance)
   * t.reload()
   * > (The changes may apply)
   */
  set config (value) {

    this[iConfig] = configDefaulter(value);

  }

  /**
   * The function to help you initialize the widget one-key
   * It is equal to:
   * this.element = L2Dwidget.createElement();
   * this.config = userConfig;
   * this.load();(if loadNow is enabled)
   * @param   {Config}   userConfig       Your config
   * @param   {Object}   options          An object to pass in options, keeps for future APIs
   * @param   {Boolean}  options.loadNow  If the widget is display instantly
   * @return  {Function}                  The instance function itself
   */
  init (userConfig = {}, options = { 'loadNow': true, }) {

    this.element = L2Dwidget.createElement();
    this.config = userConfig;
    if(options.loadNow) {

      this.load();

    }
    return this;

  }

  /**
   * To load the widget, need to set the element and config first
   * @return  {Function}  The instance function itself
   */
  load () {

    if(this.element === null) {

      throw new Error('Live2d-widget: no element defined. Please bind one first.');

    }
    if(this.config === null) {

      throw new Error('Live2d-widget: no config defined. Please define one first.');

    }
    if(this.isActive) {

      console.log('Live2d-widget: alreday loaded, use unload() or reload().');
      return this;

    }
    if(!this.config.mobile.show && device.mobile()) {

      return this;

    }
    /* eslint-disable */

    import('./main').then(f => {
      mainFunc = f;
      mainFunc.loadL2DWidget({ WebGL: this.WebGL, config: this.config });
      this[iIsActive] = true;
    }).catch(err => {
      console.error(err);
    });

    /* eslint-enable */
    return this;

  }

  /**
   * To unload the widget, throw an error if it is not loaded.
   * @return  {Function}  The instance function itself
   */
  unload () {

    if(!this.isActive) {

      throw new Error('Live2d-widget: must be loaded first.');

    }
    // TBD.
    this[iIsActive] = false;
    return this;

  }

  /**
   * To reload the widget.
   * Equal to:
   * unload();
   * load();
   * @return  {Function}  The instance function itself
   */
  reload () {

    this.unload();
    this.load();
    return this;

  }

  /**
   * To create a new HTML Element.
   * May automatically detect if the browser supports ShadowDOM.
   * @param   {String}  tagName  The tag name of the element
   * @return  {Function}         The instance function itself
   * @example
   * var newElement = L2Dwidget.createElement();
   */
  static createElement (tagName = 'live2d-widget') {

    return _createElement(tagName);

  }

  /**
   * To capture current frame
   * @param   {Function}  callback                Callback function that receive the image
   * @param   {Object}    options                 An object to pass in options, keeps for future APIs
   * @param   {String}    options.type            A DOMString indicating the image format
   * @param   {Number}    options.encoderOptions  A Number between 0 and 1 indicating image quality if the requested type is image/jpeg or image/webp
   * @return  {Function}                          The instance function itself
   */
  captureFrame (callback, { type, encoderOptions, } = { 'type': 'image/png', 'encoderOptions': 0.92, }) { // eslint-disable-line no-magic-numbers

    if(!this.isActive) {

      throw new Error('Live2d-widget: must be loaded first.');

    }
    mainFunc.captureFrame(callback, { type, encoderOptions, });
    return this;

  }

  /**
   * To download current frame
   * @param   {String}  type            A DOMString indicating the image format
   * @param   {Number}  encoderOptions  A Number between 0 and 1 indicating image quality if the requested type is image/jpeg or image/webp
   * @return  {Function}                The instance function itself
   */
  downloadFrame (type = 'image/png', encoderOptions = 0.92) { // eslint-disable-line no-magic-numbers

    if(!this.isActive) {

      throw new Error('Live2d-widget: must be loaded first.');

    }
    this.captureFrame(function downloadFrameBrowser (e) {

      const link = document.createElement('a');
      document.body.appendChild(link);
      link.setAttribute('type', 'hidden');
      link.href = e;
      link.download = 'live2d.png';
      link.click();

    }, {type, encoderOptions, });
    return this;

  }

}

export {
  L2Dwidget,
};
