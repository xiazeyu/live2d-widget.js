/* global process, device */

import './lib/setEnv.nodoc';
import './lib/wpPublicPath.nodoc';
import {
  configDefaulter,
  configValidater,
} from './config/configMgr';
import {
  createElement as _createElement,
  initElement,
} from './elementMgr';
import {
  Storage,
} from './Storage';

// DEBUG
// DEV
import './lib/BaseModel';

// DEBUG END

if (process.env.NODE_ENV === 'development') {

  console.log('--- --- --- --- ---\nlive2d-widget: Hey, this is a dev build.\n--- --- --- --- ---');

}

class L2Dwidget {

  /**
   * The constructor of L2Dwidget.
   * @return {Function}  The instance function itself.
   * @example
   * Use codes below to one-key initialize:
   * var t = new L2Dwidget().init();
   */
  constructor () {

    /**
     * The container for private varibles.
     * @private
     * @type  {Object}
     */
    this._private = {
      'config': null,
      'element': null,
      'isActive': false,
      'hasCanvas': () => this._private.canvas !== null,
      'hasElement': () => this._private.element !== null,
      'hasWebGL': () => this._private.webGL !== null,
      'storage': new Storage(),
      '_L2Dwidget': null,
    };
    // Use setter to set default config.
    this.config = {};

    return this;

  }

  /**
   * Check if Live2D widget is active.
   * @return {Boolean} If Live2D widget is active
   * @example
   * var t = new L2Dwidget();
   * t.isActive
   * > true
   */
  get isActive () {

    return this._private.isActive;

  }

  /**
   * Throw an error when you try to set {@link L2Dwidget#isActive}.
   * @param {Boolean} value  Everything.
   * @example
   * var t = new L2Dwidget();
   * t.isActive = balabala;
   * > Error: Uncaught ReferenceError: Invalid varible in asnsignmet.
   */
  set isActive (value) {

    throw new Error('live2d-widget: Uncaught ReferenceError: Invalid varible in asnsignmet.');

  }

  /**
   * Get the current HTML Element that L2Dwidget is now using,
   * throw an Error if it is not defined.
   * @return {HTMLELement} The HTMLElement L2Dwidget is now using.
   * @example
   * var t = new L2Dwidget();
   * t.element
   * > Error: No element defined. Please bind one first.
   * t.element = balabala;
   * t.element
   * > balabala
   */
  get element () {

    if(!this._private.hasElement()) {

      throw new Error('live2d-widget: No element defined. Please bind one first.');

    }
    return this._private.element;

  }

  /**
   * Bind and initialize an HTMLElement that belongs to this instance.
   * May automatically detect if the browser supports ShadowDOM.
   * Throw an error if this instance alreday hava an HTMLElement binded.
   * @param {HTMLElement} value  An empty HTMLElement to bind and initialize.
   * @return {HTMLElement}       The HTMLElement given.
   * @example
   * t.element = balabala;
   * > balabala(now is initialized and binded with this instance)
   * t.element = bilibili;
   * > Error: Uncaught ReferenceError: Invalid varible in asnsignmet. Element alreday defined.
   */
  set element (value) {

    if(!this._private.hasElement()) {

      const {
        element,
        webGL,
        canvas,
      } = initElement(value, this.config);

      this._private.element = element;
      this._private.storage.setWebGL(webGL)
      .setCanvas(canvas);

    }else{

      throw new Error('live2d-widget: Uncaught ReferenceError: Invalid varible in asnsignmet. Element alreday defined.');

    }

  }

  /**
   * Get the current canvas element L2Dwidget is now using,
   * throw an Error if not found.
   * @return {HTMLElement} The canvas element L2Dwidget is now using.
   * @example
   * var t = new L2Dwidget();
   * t.canvas
   * > Error: No canvas defined. Please bind element first.
   * t.element = miaomiaomiao;
   * t.canvas
   * > balabala
   */
  get canvas () {

    if(!this._private.hasCanvas()) {

      throw new Error('live2d-widget: No canvas defined. Please bind element first.');

    }
    return this._private.canvas;

  }

  /**
   * Throw an error when you try to set {@link L2Dwidget#canvas}.
   * @param {HTMLElement} value  Everything.
   * @example
   * var t = new L2Dwidget();
   * t.canvas = balabala;
   * > Error: Uncaught ReferenceError: Invalid varible in asnsignmet.
   */
  set canvas (value) {

    throw new Error('live2d-widget: Uncaught ReferenceError: Invalid varible in asnsignmet.');

  }

  /**
   * Get the current WebGL content L2Dwidget is now using,
   * throw an Error if not found.
   * @return {RenderingContext} The WebGL content L2Dwidget is now using.
   * @example
   * var t = new L2Dwidget();
   * t.webGL
   * > Error: No webGL defined. Please bind element first.
   * t.element = miaomiaomiao;
   * t.webGL
   * > balabala
   */
  get webGL () {

    if(!this._private.hasWebGL()) {

      throw new Error('live2d-widget: No webGL defined. Please bind element first.');

    }
    return this._private.webGL;

  }

  /**
   * Throw an error when you try to set {@link L2Dwidget#webGL}.
   * @param {RenderingContext} value  Everything.
   * @example
   * var t = new L2Dwidget();
   * t.webGL = balabala;
   * > Error: Uncaught ReferenceError: Invalid varible in asnsignmet.
   */
  set webGL (value) {

    throw new Error('live2d-widget: Uncaught ReferenceError: Invalid varible in asnsignmet.');

  }

  /**
   * Get the current config L2Dwidget is now using.
   * @return {Config} The config L2Dwidget is now using.
   * @example
   * var t = new L2Dwidget();
   * t.config
   * > balabala
   */
  get config () {

    return this._private.config;

  }

  /**
   * Set your config for current L2Dwidget instance.
   * Mention that: changing config itself doesn't influence the content that is displaying.
   * You should use {@link L2Dwidget#reload} to reload the page.
   * @param {Config} value  Config to apply.
   * @return {Config}       The config you given.
   * @example
   * t.config = balabala;
   * > balabala(now is applied to this instance)
   * t.config = bilibili;
   * > bilibili(now is applied to this instance)
   * t.reload()
   * > (The changes may apply)
   */
  set config (value) {

    this._private.config = configDefaulter(value);
    this._private.storage.setConfig(this._private.config);

  }

  /**
   * The function to help you initialize the widget one-key.
   * It is equal to:
   * this.element = L2Dwidget.createElement();
   * this.config = userConfig;
   * this.load();(if loadNow is enabled)
   * @param   {Config}   userConfig       Your config.
   * @param   {Object}   options          An object to pass in options, keeps for future APIs.
   * @param   {Boolean}  options.loadNow  If the widget is display instantly.
   * @return  {Function}                  The instance function itself.
   */
  init (userConfig = {}, options = { 'loadNow': true, }) {

    if(!this._private.hasElement()) {

      this.element = L2Dwidget.createElement();

    }
    this.config = userConfig;
    if(options.loadNow) {

      this.load();

    }
    return this;

  }

  /**
   * To load the widget, need to set the element and config first.
   * @return  {Function}  The instance function itself.
   */
  load () {

    if(!this._private.hasElement()) {

      throw new Error('live2d-widget: No element defined. Please bind one first.');

    }
    if(this.isActive) {

      console.log('live2d-widget: Instance alreday loaded, use unload() or reload().');
      return this;

    }
    if(!this.config.mobileShow && device.mobile()) {

      console.log('live2d-widget: Mobile device detected, not load.');
      return this;

    }
    /* eslint-disable */

    import('./main').then(f => {

      this._private._L2Dwidget = new f._L2Dwidget(storage);
      this._private._L2Dwidget.load();
	    this._private.isActive = true;

    }).catch(err => {

      throw err;

    });

    /* eslint-enable */
    return this;

  }

  /**
   * To unload the widget, throw an error if it is not loaded.
   * @return  {Function}  The instance function itself.
   * @todo Finish program
   */
  unload () {

    if(!this.isActive) {

      throw new Error('live2d-widget: Instance must be loaded.');

    }
    this._private._L2Dwidget.unload();
    this._private.isActive = false;
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
   * To create a new HTML Element and append it to HTML.
   * @param   {String}  tagName  Tag name of element.
   * @param   {String}  id       Id of element.
   * @return  {HTMLElement}         Element created
   * @example
   * var newElement = L2Dwidget.createElement();
   */
  static createElement (tagName = 'live2d-widget', id = null) {

    return _createElement(tagName, id);

  }

  /**
   * To capture current frame.
   * @param   {Object}    options                 An object to pass in options, keeps for future APIs.
   * @param   {String}    options.type            A DOMString indicating the image format.
   * @param   {Number}    options.encoderOptions  A Number between 0 and 1 indicating image quality if the requested type is image/jpeg or image/webp.
   * @return  {Promise}                           A promise which will receive the frame.
   */
  captureFrame ({ type, encoderOptions, } = { 'type': 'image/png', 'encoderOptions': 0.92, }) { // eslint-disable-line no-magic-numbers

    if(!this.isActive) {

      throw new Error('Live2d-widget: must be loaded first.');

    };

    return new Promise((resolve) => {
      this._private._L2Dwidget.addFrameCallback(() => {
        resolve(this._private.storage.canvas.toDataURL({ type, encoderOptions, }));
      }, false);
    });

  }

  /**
   * To download current frame.
   * @param   {String}  type            A DOMString indicating the image format.
   * @param   {Number}  encoderOptions  A Number between 0 and 1 indicating image quality if the requested type is image/jpeg or image/webp.
   * @return  {Function}                The instance function itself.
   * @description Thanks to @journey-ad https://github.com/journey-ad/live2d_src/commit/97356a19f93d2abd83966f032a53b5ca1109fbc3
   */
  downloadFrame (type = 'image/png', encoderOptions = 0.92) { // eslint-disable-line no-magic-numbers

    if(!this.isActive) {

      throw new Error('Live2d-widget: must be loaded first.');

    }
    this.captureFrame({type, encoderOptions, }).then((data) => {

      const link = document.createElement('a');
      document.body.appendChild(link);
      link.setAttribute('type', 'hidden');
      link.href = data;
      link.download = 'live2d.png';
      link.click();

    });
    return this;

  }

}

export {
  L2Dwidget,
};
