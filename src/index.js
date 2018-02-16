/**
 * @description The entry point of live2d-widget.
 */


'use strict';

import device from 'current-device';
import { config, configApplyer }from './config/configMgr';

if (process.env.NODE_ENV === 'development'){
  console.log('--- --- --- --- ---\nLive2Dwidget: Hey that, notice that you are now in DEV MODE.\n--- --- --- --- ---');
}

let coreApp;

class L2Dwidget{


/**
 * The init function
 * @param {Config}   [userConfig] User's custom config 用户自定义设置
 * @return {null}
 */

  init(userConfig = {}){
    configApplyer(userConfig);
    if((!config.mobile.show)&&(device.mobile())){
      return;
    }
    import(/* webpackMode: 'lazy' */ './cLive2DApp').then(f => {
      coreApp = f;
      coreApp.theRealInit();
    }).catch(err => {
      console.error(err);
    });
  }


/**
 * Capture current frame to png file {@link captureFrame}
 * @param  {Function} callback The callback function which will receive the current frame
 * @return {null}
 */

  captureFrame(callback){
    return coreApp.captureFrame(callback);
  }

/**
 * download current frame {@link L2Dwidget.captureFrame}
 * @return {null}
 */

  downloadFrame(){
    this.captureFrame(
      function(e){
        let link = document.createElement('a');
        document.body.appendChild(link);
        link.setAttribute('type', 'hidden');
        link.href = e;
        link.download = 'live2d.png';
        link.click();
      }
    );
  }

};

let _ = new L2Dwidget();

export {
  _ as L2Dwidget,
}
