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

class L2Dwidget{

/**
 * The init function
 * @param {Object}   [userConfig] User's custom config 用户自定义设置
 * @param {String}   [userConfig.model.jsonPath = ''] Path to Live2D model's main json eg. `https://test.com/miku.model.json` model主文件路径
 * @param {Number}   [userConfig.model.scale = 1] Scale between the model and the canvas 模型与canvas的缩放
 * @param {Number}   [userConfig.model.hHeadPos = 0.5] Horizontal position of model's head 模型头部横坐标
 * @param {Number}   [userConfig.model.vHeadPos = 0.618] Vertical position of model's head 模型头部纵坐标
 * @param {Array}    [userConfig.model.myDefine = []] User's custom Defines which will override LDefine 自定义的LDefine
 * @param {Number}   [userConfig.display.superSample = 2] rate for super sampling rate 超采样等级
 * @param {Number}   [userConfig.display.width = 150] Width to the canvas which shows the model canvas的长度
 * @param {Number}   [userConfig.display.height = 300] Height to the canvas which shows the model canvas的高度
 * @param {String}   [userConfig.display.position = 'right'] Left of right side to show 显示位置：左或右
 * @param {Number}   [userConfig.display.hOffset = 0] Horizontal offset of the canvas canvas水平偏移
 * @param {Number}   [userConfig.display.vOffset = -20] Vertical offset of the canvas canvas垂直偏移
 * @param {Boolean}  [userConfig.mobile.show = true] Whether to show on mobile device 是否在移动设备上显示
 * @param {Number}   [userConfig.mobile.scale = 0.5] Scale on mobile device 移动设备上的缩放
 * @param {Boolean}  [userConfig.mobile.motion = true] Whether to enable motion detection on mobile devices 移动设备是否开启重力感应
 * @param {String}   [userConfig.name.canvas = 'live2dcanvas'] ID name of the canvas canvas元素的ID
 * @param {String}   [userConfig.name.div = 'live2d-widget'] ID name of the div div元素的ID
 * @param {Number}   [userConfig.react.opacityDefault = 0.7] Default opacity 默认透明度
 * @param {Number}   [userConfig.react.opacityOnHover = 0.2] OnHover opacity 鼠标移上透明度
 * @param {Function} [userConfig.react.myFunc = func(e)] Custom event handler, won't override main handler, will reveice the event type. 自定义事件接收器
 * @param {Boolean}  [userConfig.dev.log = false] Whether to show log 显示日志
 * @param {Boolean}  [userConfig.dev.border = false] Whether to show border around the canvas 在canvas周围显示边界
 * @param {Boolean}  [userConfig.dev.mouseLog = false] Whether to show mouse log (tons of log), only work when dev.log is enabled 显示鼠标移动
 * @param {Function} [userConfig.dev.mouseFunc = func(x, y, ix, iy)] Custom logger, only work when dev.log is enabled, will receive (x, y, ix, iy), which presents the actucally position and vitural position 自定义鼠标移动处理函数
 * @return {null}
 */

  init(userConfig = {}){
    configApplyer(userConfig);
    if((!config.mobile.show)&&(device.mobile())){
      return;
    }
    import(/* webpackMode: 'lazy' */ './cLive2DApp').then(f => {
      coreApp = f;
      coreApp.theRealInit();
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
