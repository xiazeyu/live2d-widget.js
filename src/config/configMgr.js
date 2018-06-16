/* global process */

import configStorage from './configStorage';

/**
 * To update a Config from previous version.
 * @param {Config} oldConfig  Any previous version of Config.
 * @return {Config}  Updated Config.
 */
function configUpdater (oldConfig) {

  const newConfig = {};
  // For live2d-widget@3.0.0 to live2d-widget@3.0.5
  if ('model' in oldConfig) {

    if ('jsonPath' in oldConfig.model) {

      newConfig.modelJsonPath = oldConfig.model.jsonPath;

    }
    if ('scale' in oldConfig.model) {

      console.error('model.scale: deprecated.');

    }
    if ('hHeadPos' in oldConfig.model) {

      newConfig.modelHeadPosH = oldConfig.model.hHeadPos;

    }
    if ('vHeadPos' in oldConfig.model) {

      newConfig.modelHeadPosV = oldConfig.model.vHeadPos;

    }
    if ('myDefine' in oldConfig.model) {

      console.error('model.myDefine: deprecated.');

    }

  }
  if ('display' in oldConfig) {

    if ('superSample' in oldConfig.display) {

      newConfig.displaySampleLevel = oldConfig.display.superSample;

    }
    if ('width' in oldConfig.display) {

      newConfig.displayWidth = oldConfig.display.width;

    }
    if ('height' in oldConfig.display) {

      newConfig.displayHeight = oldConfig.display.height;

    }

    if ('position' in oldConfig.display) {

      newConfig.displaySide = oldConfig.display.position;

    }

    if ('hOffset' in oldConfig.display) {

      newConfig.displayOffsetH = oldConfig.display.hOffset;

    }

    if ('vOffset' in oldConfig.display) {

      newConfig.displayOffsetV = oldConfig.display.vOffset;

    }

  }
  if ('mobile' in oldConfig) {

    if ('show' in oldConfig.mobile) {

      console.error('mobile.show: please use displayFunc manually.');

    }
    if ('scale' in oldConfig.mobile) {

      console.error('mobile.scale: please use displayFunc manually.');

    }
    if ('motion' in oldConfig.mobile) {

      newConfig.displayDeviceMotion = oldConfig.mobile.motion;

    }

  }

  if ('name' in oldConfig) {

    if ('canvas' in oldConfig.name) {

      console.error('name.canvas: deprecated.');

    }
    if ('div' in oldConfig.name) {

      console.error('name.div: deprecated');

    }

  }

  if ('react' in oldConfig) {

    if ('opacityDefault' in oldConfig.react) {

      newConfig.displayOpacityDefault = oldConfig.react.opacityDefault;

    }
    if ('opacityOnHover' in oldConfig.react) {

      newConfig.displayOpacityOnHover = oldConfig.react.opacityOnHover;

    }
    if ('myFunc' in oldConfig.react) {

      console.error('react.myFunc: deprecated');

    }

  }
  if ('dev' in oldConfig) {

    if ('log' in oldConfig.dev) {

      newConfig.devLog = oldConfig.dev.log;

    }
    if ('border' in oldConfig.dev) {

      newConfig.devBorder = oldConfig.dev.border;

    }
    if ('mouseLog' in oldConfig.dev) {

      newConfig.devMouseLog = oldConfig.dev.mouseLog;

    }
    if ('mouseFunc' in oldConfig.dev) {

      console.error('dev.mouseFunc: deprecated.');

    }

  }

  // For hexo-helper-live2d@2.0.0 to hexo-helper-live2d@2.1.5 (config only)
  if ('model' in oldConfig) {

    console.error('model: use modelJsonPath instead.');

  }
  if ('width' in oldConfig) {

    newConfig.displayWidth = oldConfig.width;

  }
  if ('height' in oldConfig) {

    newConfig.displayHeight = oldConfig.height;

  }
  if ('scaling' in oldConfig) {

    newConfig.displaySampleLevel = oldConfig.scaling;

  }
  if ('opacityDefault' in oldConfig) {

    newConfig.displayOpacityDefault = oldConfig.opacityDefault;

  }
  if ('opacityHover' in oldConfig) {

    newConfig.displayOpacityOnHover = oldConfig.opacityHover;

  }
  if ('mobileShow' in oldConfig) {

    console.error('mobileShow: please use displayFunc manually.');

  }
  if ('mobileScaling' in oldConfig) {

    console.error('mobileScaling: please use displayFunc manually.');

  }
  if ('position' in oldConfig) {

    newConfig.displaySide = oldConfig.position;

  }
  if ('horizontalOffset' in oldConfig) {

    newConfig.displayOffsetH = oldConfig.horizontalOffset;

  }
  if ('verticalOffset' in oldConfig) {

    newConfig.displayOffsetV = oldConfig.verticalOffset;

  }
  if ('className' in oldConfig) {

    console.error('className: deprecated.');

  }
  if ('id' in oldConfig) {

    console.error('id: deprecated.');

  }
  if ('bottom' in oldConfig) {

    newConfig.displayOffsetV = oldConfig.bottom;

  }

  // For latest config

  for (const key in configStorage.defaultConfig) {

    if ({}.hasOwnProperty.call(configStorage.defaultConfig, key)) {

      if (!newConfig[key]) {

        newConfig[key] = oldConfig[key];

      }

    }

  }

  // Convert type

  if ('displayHeight' in newConfig) {

    if (typeof newConfig.displayHeight !== 'string') {

      newConfig.displayHeight = `${newConfig.displayHeight}px`;

    }

  }
  if ('displayWidth' in newConfig) {

    if (typeof newConfig.displayWidth !== 'string') {

      newConfig.displayWidth = `${newConfig.displayWidth}px`;

    }

  }
  if ('displayOffsetH' in newConfig) {

    if (typeof newConfig.displayOffsetH !== 'string') {

      newConfig.displayOffsetH = `${newConfig.displayOffsetH}px`;

    }

  }
  if ('displayOffsetV' in newConfig) {

    if (typeof newConfig.displayOffsetV !== 'string') {

      newConfig.displayOffsetV = `${newConfig.displayOffsetV}px`;

    }

  }

  return newConfig;

}

/**
 * Default config based on user's config and default config.<br>
 * Will update the Config first.
 * @param  {Config} usrConfig  User's custom config.
 * @return {Config}            Config that has been defaulted.
 */
function configDefaulter (usrConfig) {

  const updatedConfig = configUpdater(usrConfig);

  return Object.assign({}, updatedConfig, configStorage.defaultConfig);

}



/**
 * To validate whether user config is valid.<br>
 * Console an error if there's something wrong.
 * @param  {Config} usrConfig User's custom config.
 * @return {Boolean}          Whether the config is valid.
 */
function configValidater (usrConfig) {

  let validFlag = true;

  for (const key in configStorage.configType) {

    if ({}.hasOwnProperty.call(configStorage.configType, key)) {

      if (key in usrConfig && typeof usrConfig[key] !== configStorage.configType[key]) {

        validFlag = false;
        console.error(`config.${key} is expected a ${configStorage.configType[key]}, but got a ${typeof usrConfig[key]}`);

      }

    }

  }

  return validFlag;

}


if (process.env.NODE_ENV === 'development') { // eslint-disable-line no-process-env

  window.configMgr = {
    configDefaulter,
    configUpdater,
    configValidater,
  };

}

export {
  configDefaulter,
  configUpdater,
  configValidater,
};
