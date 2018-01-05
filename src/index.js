// Created by xiazeyu.

////////////////////////////////////
// Celebrate for the 3.0 version! //
////////////////////////////////////

/**
 * @description The entry point of live2d-widget
 */


'use strict';

import device from 'current-device';
import { config, configApplyer }from './config/configMgr';

/**
 * The public entry point
 * @param  {Object} userConfig User's config
 */

export function init(userConfig){

  userConfig = typeof userConfig === 'undefined' ? {} : userConfig;

  if (process.env.NODE_ENV === 'development'){
    console.log('--- --- --- --- ---');
    console.log('Hey that, notice that you are now in DEV MODE.');
    console.log('--- --- --- --- ---');
  }

  configApplyer(userConfig);

  if((!config.mobile.show)&&(device.mobile())){
    return;
  }

  import(/* webpackMode: "lazy" */ './_cLive2DApp').then(f => {
    f.default();
  }).catch(err => {
    console.error(err);
  });

}
