/**
 * @description The entry point of live2d-widget.js
 */


'use strict';

import device from 'current-device';
import {
  currConfig,
  configDefaulter,
} from './config/configMgr';
import {
  currElement,
  currCanvas,
  currWebGL,
  bindElement,
} from './elementMgr';

if (process.env.NODE_ENV === 'development'){
  console.log('--- --- --- --- ---\nLive2Dwidget: Hey that, notice that you are now in DEV MODE.\n--- --- --- --- ---');
}

let coreApp = null;

class L2Dwidget{
  constructor(...argvs){
    const isLoaded = Symbol('isLoaded');
    this[isLoaded] = false;
    this.init(...argvs);
  }
  get isLoaded() {
    return this[isLoaded];
  }
  set isLoaded(value) {
    throw new Error('Uncaught ReferenceError: Invalid varible in asnsignmet.');
  }
  get element() {
    return currElement;
  }
  set element(value) {
    if(currElement === null){
      bindElement(value);
    }else{
      throw new Error('Uncaught ReferenceError: Invalid varible in asnsignmet.');
    }
  }
  get canvas() {
    return currCanvas;
  }
  set canvas(value) {
    throw new Error('Uncaught ReferenceError: Invalid varible in asnsignmet.');
  }
  get WebGL() {
    return WebGL;
  }
  set WebGL(value) {
    throw new Error('Uncaught ReferenceError: Invalid varible in asnsignmet.');
  }
  get config() {
    return currConfig;
  }
  set config(value) {
    configDefaulter(value);
  }
  init(userConfig = {}, loadNow = true) {
    this.config = userConfig;
    this.load();
    // TBD.
  }
  load() {
    // TBD.
  }
  unload() {
    // TBD.
  }
  captureFrame(callback, type = 'image/png', encoderOptions = 0.92) {
    // TBD.
  }
  downloadFrame(type = 'image/png', encoderOptions = 0.92) {
    // TBD.
  }
}

export {
  L2Dwidget,
}
