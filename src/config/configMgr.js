// Created by xiazeyu.

/**
 * @description The manager of configeration.
 */


'use strict';

import _ from 'lodash';
import defaultConfig from './defaultConfig';

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

  currConfig = _.defaultsDeep(userConfig, defaultConfig);
  // console.log('Live2Dwidget: currConfig', currConfig);

}

export {
  configApplyer,
  currConfig as config,
}
