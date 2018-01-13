// Created by xiazeyu.

/**
 * @description The validater function for user's config.
 * @deprecated Only respond one time when you call it, won't be built in production.
 * @requires prop-types, use npm i prop-types
 */


'use strict';


let PropTypes = require('prop-types');
/**
 * The propTypes configeration of config
 * @type {Object}
 */

const configPropTypes = {
  model: PropTypes.shape({
    jsonPath: PropTypes.string,
    hHeadPos: PropTypes.number,
    vHeadPos: PropTypes.number,
    myDefine: PropTypes.array,
  }),
  display: PropTypes.shape({
    antialias: PropTypes.number,
    widght: PropTypes.number,
    height: PropTypes.number,
    scale: PropTypes.number,
    position: PropTypes.oneOf(['left', 'right']),
    hOffset: PropTypes.number,
    vOffset: PropTypes.number,
  }),
  mobile: PropTypes.shape({
    show: PropTypes.bool,
    scale: PropTypes.number,
    motion: PropTypes.bool,
  }),
  name: PropTypes.shape({
    canvas: PropTypes.string,
    div: PropTypes.string,
  }),
  react: PropTypes.shape({
    opacityDefault: PropTypes.number,
    opacityOnHover: PropTypes.number,
    myFunc: PropTypes.func,
  }),
  dev: PropTypes.shape({
    log: PropTypes.bool,
    border: PropTypes.bool,
    mouseLog: PropTypes.bool,
    mouseFunc: PropTypes.func,
  }),
}
/**
 * The validater for user config
 * See https://github.com/facebook/prop-types
 * @param  {Object} [userConfig] User's config
 * @description Only console.warn
 * @deprecated Only respond one time when you call it, won't be built in production.
 * @return {null}
 */

function configValidater(userConfig){
  PropTypes.checkPropTypes(configPropTypes, userConfig, 'config', 'Live2D-widget');
}

if (process.env.NODE_ENV === 'development') window.cV = configValidater;

module.exports = {
  configValidater: configValidater,
}
