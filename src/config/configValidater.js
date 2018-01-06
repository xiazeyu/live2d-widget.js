// Created by xiazeyu.

/**
 * @description the validater for user's config
 */


'use strict';


import _ from 'lodash';

function configValidater(userConfig){

  if (process.env.NODE_ENV === 'development') console.log('config: validating config...');

  if(_.has(userConfig, 'model')){
    if(_.has(userConfig.model, 'jsonPath')){
      if(!_.isString(userConfig.model.jsonPath)){
        throw 'userConfig.model.jsonPath should be a string.';
      }
    }
    if(_.has(userConfig.model, 'hHeadPos')){

    }
  }

}

export {
  configValidater,
}
