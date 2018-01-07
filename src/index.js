// Created by xiazeyu.

////////////////////////////////////
// Celebrate for the 3.0 version! //
////////////////////////////////////

/**
 * @description The entry point of live2d-widget.
 */


'use strict';

import device from 'current-device';
import { config, configApplyer }from './config/configMgr';

/**
 * The public entry point
 * @param {Object}   [userConfig] User's custom config
 * @param {String}   [model.jsonPath = ''] Path to Live2D model's main json eg. https://test.com/miku.model.json
 * @param {Number}   [model.scale = 1] Scale between the model and the canvas
 * @param {Number}   [model.hHeadPos = 0.5] Horizontal position of model's head
 * @param {Number}   [model.vHeadPos = 0.618] Vertical position of model's head
 * @param {Array}    [model.myDefine = []] User's custom Defines which will override LDefine
 * @param {Number}   [display.AA = 2] Antialiasing grade
 * @param {Number}   [display.widget = 150] Widget to the canvas which shows the model
 * @param {Number}   [display.height = 300] Height to the canvas which shows the model
 * @param {String}   [display.position = 'right'] Left of right side to show
 * @param {Number}   [display.hOffset = 0] Horizontal offset of the canvas
 * @param {Number}   [display.vOffset = -20] Vertical offset of the canvas
 * @param {Boolean}  [mobile.show = true] Whether to show on mobile device
 * @param {Number}   [mobile.scale = 0.5] Scale on mobile device
 * @param {Boolean}  [mobile.motion = true] Whether to enable motion detection on mobile devices
 * @param {String}   [name.canvas = 'live2dcanvas'] ID name of the canvas
 * @param {String}   [name.div = 'live2d-widget'] ID name of the div
 * @param {Number}   [react.opacityDefault = 0.7] Default opacity
 * @param {Number}   [react.opacityOnHover = 0.2] OnHover opacity
 * @param {Function} [react.myFunc = func(e)] Custom event handler, won't override main handler, will reveice the event type.
 * @param {Boolean}  [dev.log = false] Whether to show log
 * @param {Boolean}  [dev.mouseLog = false] Whether to show mouse log (tons of log), only work when dev.log is enabled
 * @param {Function} [dev.mouseFunc = func(x, y, ix, iy)] Custom logger, only work when dev.log is enabled, will receive (x, y, ix, iy), which presents the actucally position and vitural position
 */

function init(userConfig){

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

export {
  init,
}
