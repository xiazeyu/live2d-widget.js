import configStorage from './configStorage';


/**
 * Default config according to user's config and default config.
 * @param  {Config} userConfig  User's custom config.
 * @return {Config}             Config that has been defaulted.
 */
function configDefaulter (userConfig) {

  if (typeof userConfig.displayHeight === 'number') {

    userConfig.displayHeight = `${userConfig.displayHeight}px`;

  }

  if (typeof userConfig.displayWidth === 'number') {

    userConfig.displayWidth = `${userConfig.displayWidth}px`;

  }

  return Object.assign({}, userConfig, configStorage.defaultConfig);

}



/**
 * To validate whether user config is valid.
 * @param  {Config} userConfig User's custom config.
 * @return {Boolean}           Whether the config is valid.
 */
function configValidater (userConfig) {

  for (const key in configStorage.configType) {

    if ({}.hasOwnProperty.call(configStorage.configType, key)) {

      if (typeof userConfig[key] !== configStorage.configType[key]) {

        throw new Error(`config.${key} is expected a ${configStorage.configType[key]}, but got a ${typeof userConfig[key]}`);

      }

    }


  }

  return true;

}

export {
  configDefaulter,
  configValidater,
};
