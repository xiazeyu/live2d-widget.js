// Modified by xiazeyu.

/**
 * @description The container of configeration.
 */


class Config{
  constructor(
    modelPath, modelWidth, modelHeight,
    modelScaling, AASetting, mobileShow,
    mobileScaling, position, horizontalOffset,
    verticalOffset, horizontalHeadPos, verticalHeadPos,
    opacityDefault, opacityHover, canvasID,
    divID,
    ){};
}

/**
 * default options
 * @type {Object}
 * @param {[type]} [varname] [description]
 */

const defaultOptions = {
  modelPath: 'https://raw.githubusercontent.com/EYHN/hexo-helper-live2d/master/assets/z16/z16.model.json',
  modelWidth: 150,
  modelHeight: 300,
  modelScaling: 1,
  AASetting: 2,
  mobileShow: true,
  mobileScaling: 0.5,
  position: 'right',
  horizontalOffset: 0,
  verticalOffset: -20,
  horizontalHeadPos: 0.5,
  verticalHeadPos: 0.618,
  opacityDefault: 0.7,
  opacityHover: 0.1,
  canvasID: 'live2DCanvas',
  divID: 'hexo-helper-live2d'
}

let currConfig = {};

function checkUserConfig(inUserConfig){
      if(( this.position != 'left' ) && ( this.position != 'right' )){
      console.error('L2D: Invalid position setting');
    }
}

function applyConfig(inUserConfig){
  checkUserConfig(inUserConfig);
  currConfig = Object.assign(
    {},
    defaultOptions,
    inUserConfign,
  );
}

export {/*
  applyConfig,
  currConfig,*/
}
