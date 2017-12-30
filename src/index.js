// Created by xiazeyu.

////////////////////////////////////
// Celebrate for the 3.0 version! //
////////////////////////////////////


import device from 'current-device';
// import config from './lib/configManager.js';
/**
 * The public entry point
 * @param  {Object} userConfig User's config
 */

function loadL2D(userConfig){/*
  config.checkConfig(userConfig);
  config.applyConfig(userConfig);
  if((!config.mobileShow)&&(device.mobile())){
    return;
  }*/
  import(/* webpackMode: "lazy" */ './cLive2DApp').then(_ => {
    _.default();
  }).catch(err => {
    console.error(err);
  });
}

window.loadL2D = loadL2D;
