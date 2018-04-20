import defaultConfig from './defaultConfig';

/**
 * @typedef {Object} Config
 * @property {String}   modelJsonPath        Path to model.json eg. `https://test.com/miku.model.json`  模型model.json文件路径
 * @property {Number}   modelHeadPosH        Horizontal position of model's head  模型头部横坐标
 * @property {Number}   modelHeadPosV        Vertical position of model's head  模型头部纵坐标
 * @property {Number}   modelScale           Scale rate between model and canvas  模型与canvas缩放比例
 * @property {Number}   displayWidth         Width of canvas  canvas宽度
 * @property {Number}   displayHeight        Height of canvas  canvas高度
 * @property {String}   displaySide          Which side(left or right) to show  左右侧显示位置
 * @property {Number}   displaySampleLevel   Sampling level  采样等级
 * @property {Number}   displayOffsetH       Horizontal offset of canvas  canvas水平偏移
 * @property {Number}   displayOffsetV       Vertical offset of canvas  canvas垂直偏移
 * @property {Boolean}  mobileShow           If show on mobile device  是否在移动设备上显示
 * @property {Number}   mobileScale          Scale rate on mobile device  移动设备上缩放比例
 * @property {Boolean}  mobileMotion         If enable motion reaction on mobile devices  是否在移动设备上开启运动响应
 * @property {Number}   reactOpacityDefault  Default opacity  默认透明度
 * @property {Number}   reactOpacityOnHover  OnHover opacity  鼠标移上透明度
 * @property {Boolean}  devLog               If show log  显示日志
 * @property {Boolean}  devMouseLog          If show mouse log  显示鼠标日志
 */

/**
 * Default config according to user's config and default config
 * @param  {Config} userConfig  User's custom config
 * @return {Config}             Config that has been defaulted
 */
function configDefaulter (userConfig) {

  return Object.assign({}, userConfig, defaultConfig);

}

function configValidater (userConfig) {

  return null;

}

export {
  configDefaulter,
  configValidater,
};
