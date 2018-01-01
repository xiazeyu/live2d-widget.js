// Created by xiazeyu.

////////////////////////////////////
// Celebrate for the 3.0 version! //
////////////////////////////////////

// Created by xiazeyu.

/**
 * @description The entry file
 */

'use strict';

import device from 'current-device';
import { config, applyConfig }from './lib/configManager.js';

/**
 * The public entry point
 * @param  {Object} userConfig User's config
 */

export function init(userConfig){

  if (process.env.NODE_ENV === 'development') {
    console.log('Hey that, you are now in DEV MODE.');
  }
  try{
    applyConfig(userConfig);
  }catch(err){
    console.error(err);
  }

  if((!config.mobile.show)&&(device.mobile())){
    return;
  }

  import(/* webpackMode: "lazy" */ './cLive2DApp').then(_ => {
    _.default();
  }).catch(err => {
    console.error(err);
  });

}
