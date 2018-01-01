// Created by xiazeyu.

////////////////////////////////////
// Celebrate for the 3.0 version! //
////////////////////////////////////

/**
 * @description The entry file
 */

'use strict';

import device from 'current-device';
import config from './lib/configManager.js';
/**
 * The public entry point
 * @param  {Object} userConfig User's config
 */

function getWebPackPublicPath(){
  let runtimePublicPath;
  __webpack_public_path__ = runtimePublicPath;
}

export function init(userConfig){
  if (process.env.NODE_ENV === 'development') {
    console.log('Hey that, you are now in DEV.');
  }/*
  try{
    config.checkConfig(userConfig);
  }catch(err){
    console.error(err);
  }
  config.applyConfig(userConfig);
  if((!config.options.mobile.show)&&(device.mobile())){
    return;
  }*/
  import(/* webpackMode: "lazy" */ './cLive2DApp').then(_ => {
    _.default();
  }).catch(err => {
    console.error(err);
  });
}
