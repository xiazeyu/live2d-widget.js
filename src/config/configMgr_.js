/**
 * @description The manager of configeration.
 */


'use strict';

import _ from 'lodash';
import defaultConfig from './defaultConfig';

/**
 * @typedef {Object} Config
 * @property {String}   [model.jsonPath = '']                Path to Live2D model's main json eg. `https://test.com/miku.model.json` model主文件路径
 * @property {Number}   [model.scale = 1]                    Scale between the model and the canvas 模型与canvas的缩放
 * @property {Number}   [model.hHeadPos = 0.5]               Horizontal position of model's head 模型头部横坐标
 * @property {Number}   [model.vHeadPos = 0.618]             Vertical position of model's head 模型头部纵坐标
 * @property {Array}    [model.myDefine = []]                User's custom Defines which will override LDefine 自定义的LDefine
 * @property {Number}   [display.superSample = 2]            rate for super sampling rate 超采样等级
 * @property {Number}   [display.width = 150]                Width to the canvas which shows the model canvas的长度
 * @property {Number}   [display.height = 300]               Height to the canvas which shows the model canvas的高度
 * @property {String}   [display.position = 'right']         Left of right side to show 显示位置：左或右
 * @property {Number}   [display.hOffset = 0]                Horizontal offset of the canvas canvas水平偏移
 * @property {Number}   [display.vOffset = -20]              Vertical offset of the canvas canvas垂直偏移
 * @property {Boolean}  [mobile.show = true]                 Whether to show on mobile device 是否在移动设备上显示
 * @property {Number}   [mobile.scale = 0.5]                 Scale on mobile device 移动设备上的缩放
 * @property {Boolean}  [mobile.motion = true]               Whether to enable motion detection on mobile devices 移动设备是否开启重力感应
 * @property {String}   [name.canvas = 'live2dcanvas']       ID name of the canvas canvas元素的ID
 * @property {String}   [name.div = 'live2d-widget']         ID name of the div div元素的ID
 * @property {Number}   [react.opacityDefault = 0.7]         Default opacity 默认透明度
 * @property {Number}   [react.opacityOnHover = 0.2]         OnHover opacity 鼠标移上透明度
 * @property {Function} [react.myFunc = func(e)]             Custom event handler, won't override main handler, will reveice the event type. 自定义事件接收器
 * @property {Boolean}  [dev.log = false]                    Whether to show log 显示日志
 * @property {Boolean}  [dev.border = false]                 Whether to show border around the canvas 在canvas周围显示边界
 * @property {Boolean}  [dev.mouseLog = false]               Whether to show mouse log (tons of log), only work when dev.log is enabled 显示鼠标移动
 * @property {Function} [dev.mouseFunc = func(x, y, ix, iy)] Custom logger, only work when dev.log is enabled, will receive (x, y, ix, iy), which presents the actucally position and vitural position 自定义鼠标移动处理函数
 */
