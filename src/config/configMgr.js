// Created by xiazeyu.

/**
 * @description The manager of configeration.
 */


'use strict';

import defaultConfig from './defaultConfig';
import defaultsDeep from './defaultsDeep';

/**
 * The container of current configs
 * @type {Object}
 */

let currConfig = {};

/**
 * Apply users function, make the full settings
 * @param  {Object} [userConfig] User's custom config
 * @return {null}
 */

function configApplyer(userConfig){

  defaultsDeep(currConfig, userConfig, defaultConfig);
  // console.log('Live2Dwidget: currConfig', currConfig);

}

export {
  configApplyer,
  currConfig as config,
}
