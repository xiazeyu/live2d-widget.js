/**
 * @description The entry point of live2d-widget.js
 */

'use strict';

import device from 'current-device';
import {
  config,
  configApplyer,
} from './config/configMgr';

if (process.env.NODE_ENV === 'development'){
  console.log('--- --- --- --- ---\nLive2Dwidget: Hey that, notice that you are now in DEV MODE.\n--- --- --- --- ---');
}

let coreApp = null;

class L2Dwidget{
  constructor(userConfig = {}, loadNow = true){
    const isLoaded = Symbol('isLoaded');
    const canvas = Symbol('canvas');
    const config = Symbol('config');
    this[isLoaded] = false;
    this[canvas] = null;
    // TBD.
  }
  get isLoaded() {
    return this[isLoaded];
  }
  set isLoaded(value) {
    throw new Error('Uncaught ReferenceError: Invalid varible in asnsignmet.');
  }
  get canvas() {
    return this[canvas];
  }
  set canvas(value) {
    throw new Error('Uncaught ReferenceError: Invalid varible in asnsignmet.');
  }
  get config() {
    return this[config];
  }
  set config(value) {
    this[config] = configApplyer(value);
  }
  init(userConfig = {}) {
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
