// Created by xiazeyu.

/**
 * @description The validater function for user's config.
 */


'use strict';


let PropTypes = require('prop-types');

const configPropTypes = {
  model: PropTypes.shape({
    jsonPath: PropTypes.string,
    hHeadPos: PropTypes.number,
    vHeadPos: PropTypes.number,
    myDefine: PropTypes.array,
  }),
  display: PropTypes.shape({
    AA: PropTypes.number,
    widght: PropTypes.number,
    height: PropTypes.number,
    scale: PropTypes.number,
    position: PropTypes.oneOf(['left', 'right']),
    hOffset: PropTypes.number, // horizontalOffset
    vOffset: PropTypes.number, // verticalOffset
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
  debug: PropTypes.shape({
    log: PropTypes.bool,
    mouseLog: PropTypes.bool,
    mouseFunc: PropTypes.func,
  }),
}

function configValidater(userConfig){

  PropTypes.checkPropTypes(configPropTypes, userConfig, 'config', 'Live2D-widget');

}

module.exports = {
  configValidater: configValidater,
}
