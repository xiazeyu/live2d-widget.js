// Created by xiazeyu.

/**
 * @description The manager of configeration.
 */


'use strict';

import _ from 'lodash';

/**
 * The container of current configs
 * @type {Object}
 */

let currConfig = {};
/**
 * Default settings for defaulter
 * @type {Object}
 */

const defaultConfig = {
  model: {
    jsonPath: '',
    scale: 1,
    hHeadPos: 0.5,
    vHeadPos: 0.618,
    myDefine: [],
  },
  display: {
    AA: 2,
    widght: 150,
    height: 300,
    position: 'right',
    hOffset: 0,
    vOffset: -20,
  },
  mobile: {
    show: true,
    scale: 0.5,
    motion: true,
  },
  name: {
    canvas: 'live2dcanvas',
    div: 'live2d-widget',
  },
  react: {
    opacityDefault: 0.7,
    opacityOnHover: 0.2,
    myFunc: (e) => {console.log('(undefined) ┑(￣Д ￣)┍');},
  },
  dev: {
    log: false,
    border: false,
    mouseLog: false,
    mouseFunc: (x, y, ix, iy) => {console.log(`MouseFunc: ${x},${y}; ${ix}, ${iy}`);},
  },
  // _: true,
}

/**
 * Apply users function, make the full settings
 * @param  {Object} [userConfig] User's custom config
 * @return {null}
 */

function configApplyer(userConfig){

  // if (_.has(userConfig, '_')){
  //   import(/* webpackMode: "lazy" */ './configValidater').then(f => {
  //     f.configValidater(userConfig);
  //   }).catch(err => {
  //     console.error(err);
  //   });
  // }

  currConfig = _.defaultsDeep(userConfig, defaultConfig);

}

export {
  configApplyer,
  currConfig as config,
}
