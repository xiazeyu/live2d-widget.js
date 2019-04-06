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

if (process.env.NODE_ENV === 'development'){
  console.log('--- --- --- --- ---\nLive2Dwidget: Hey that, notice that you are now in DEV MODE.\n--- --- --- --- ---');
}

let coreApp;
/**
 * The main entry point, which is ... nothing
 */

class L2Dwidget {

  constructor() {
    this.eventHandlers = {};
    this.config = config;
  }

  on(name, handler) {
    if (typeof handler !== 'function') {
      throw new TypeError('Event handler is not a function.');
    }
    if (!this.eventHandlers[name]) {
      this.eventHandlers[name] = [];
    }
    this.eventHandlers[name].push(handler);
    return this;
  }

  emit(name, ...args) {
    if (!!this.eventHandlers[name]) {
      this.eventHandlers[name].forEach(handler => {
        if (typeof handler === 'function') {
          handler(...args);
        }
      });
    }
    if (!!this.eventHandlers['*']) {
      this.eventHandlers['*'].forEach(handler => {
        if (typeof handler === 'function') {
          handler(name, ...args);
        }
      });
    }
    return this;
  }

/**
 * The init function
 * @param {Object}   [userConfig] User's custom config 用户自定义设置
 * @param {String}   [userConfig.model.jsonPath = ''] Path to Live2D model's main json eg. `https://test.com/miku.model.json` model主文件路径
 * @param {Number}   [userConfig.model.scale = 1] Scale between the model and the canvas 模型与canvas的缩放
 * @param {Number}   [userConfig.display.superSample = 2] rate for super sampling rate 超采样等级
 * @param {Number}   [userConfig.display.width = 150] Width to the canvas which shows the model canvas的长度
 * @param {Number}   [userConfig.display.height = 300] Height to the canvas which shows the model canvas的高度
 * @param {String}   [userConfig.display.position = 'right'] Left of right side to show 显示位置：左或右
 * @param {Number}   [userConfig.display.hOffset = 0] Horizontal offset of the canvas canvas水平偏移
 * @param {Number}   [userConfig.display.vOffset = -20] Vertical offset of the canvas canvas垂直偏移
 * @param {Boolean}  [userConfig.mobile.show = true] Whether to show on mobile device 是否在移动设备上显示
 * @param {Number}   [userConfig.mobile.scale = 0.5] Scale on mobile device 移动设备上的缩放
 * @param {String}   [userConfig.name.canvas = 'live2dcanvas'] ID name of the canvas canvas元素的ID
 * @param {String}   [userConfig.name.div = 'live2d-widget'] ID name of the div div元素的ID
 * @param {Number}   [userConfig.react.opacity = 0.7] opacity 透明度
 * @param {Boolean}  [userConfig.dev.border = false] Whether to show border around the canvas 在canvas周围显示边界
 * @param {Boolean}  [userConfig.dialog.enable = false] Display dialog 显示人物对话框
 * @param {Boolean}  [userConfig.dialog.hitokoto = false] Enable hitokoto 使用一言API
 * @return {null}
 */

  init(userConfig = {}){
    configApplyer(userConfig);
    this.emit('config', this.config);
    if((!config.mobile.show)&&(device.mobile())){
      return;
    }
    import(/* webpackMode: 'lazy' */ './cLive2DApp').then(f => {
      coreApp = f;
      coreApp.theRealInit(this);
    }).catch(err => {
      console.error(err);
    });
  }


/**
 * Capture current frame to png file {@link captureFrame}
 * @param  {Function} callback The callback function which will receive the current frame
 * @return {null}
 */

  captureFrame(callback){
    return coreApp.captureFrame(callback);
  }

/**
 * download current frame {@link L2Dwidget.captureFrame}
 * @return {null}
 */

  downloadFrame(){
    this.captureFrame(
      function(e){
        let link = document.createElement('a');
        document.body.appendChild(link);
        link.setAttribute('type', 'hidden');
        link.href = e;
        link.download = 'live2d.png';
        link.click();
      }
    );
  }

};

let _ = new L2Dwidget();

export {
  _ as L2Dwidget,
}
