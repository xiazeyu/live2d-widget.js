// Created by xiazeyu.

/**
 * @description The container of configeration.
 */


let currConfig = {};

const defaultOptions = {
  model: {
    jsonPath: '',
    hHeadPos: 0.5, // horizontalHeadPos
    vHeadPos: 0.618, // verticalHeadPos
    myDefine: {},
  },
  display: {
    AA: 2, // antialiasing Grade 抗锯齿等级
    widght: 150,
    height: 300,
    scale: 1,
    position: 'right',
    hOffset: 0, // horizontalOffset
    vOffset: -20, // verticalOffset
  },
  mobile: {
    show: true,
    scale: 0.5,
    motion: false,
  },
  name: {
    canvas: 'live2dcanvas',
    div: 'live2d-widget',
  },
  react: {
    opacityDefault: 0.7,
    opacityOnHover: 0.2,
    myFunc: () => {console.log('(undefined) ┑(￣Д ￣)┍');},
    messageFunc: () => {console.log('(undefined) ┑(￣Д ￣)┍');},
  },
  debug: {
    log: false,
    mouseLog: false,
    mouseFunc: () => {console.log('(undefined) ┑(￣Д ￣)┍');}, // only works when debug.mouseLog is on
  },
  checked: false,
}

function applyConfig(inUserConfig){
  checkUserConfig(inUserConfig);
  currConfig = Object.assign(
    {},
    defaultOptions,
    inUserConfign,
  );
}

function checkUserConfig(inUserConfig){
      if(( this.position != 'left' ) && ( this.position != 'right' )){
      console.error('L2D: Invalid position setting');
    }
}
export {
  applyConfig,
  currConfig,
}
