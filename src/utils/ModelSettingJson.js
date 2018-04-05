/* global process */

class ModelSettingJson {

  /**
   * Constructor
   * @param   {Object}  userAlias  Custom model setting json alias.
   * @return  {Function}           The instance function itself.
   */
  constructor (userAlias) {

    this.a = Object.assign({}, userAlias, {
      'expressions': 'expressions',
      'fadeIn': 'fade_in',
      'fadeOut': 'fade_out',
      'file': 'file',
      'hitAreas': 'hit_areas',
      'id': 'id',
      'initParam': 'init_param',
      'initPartsVisible': 'init_parts_visible',
      'layout': 'layout',
      'model': 'model',
      'motions': 'motions',
      'name': 'name',
      'physics': 'physics',
      'pose': 'pose',
      'sound': 'sound',
      'textures': 'textures',
      'value': 'val',
    });
    this.json = {};
    return this;

  }

  /**
   * Load model settings.
   * @param   {String}  path     Model json path.
   * @param   {Function}  pfMgr  Instance platformManager.
   * @return  {Promise}          A promise that returns instance function.
   */
  load (path, pfMgr) {

    /* Test case:

    k = new ModelSettingJson();
    pfMgr = {
      'loadBytes': (path) => {
        return new Promise((resolve) => {
          fetch(path).then((response) => {
            resolve(response.arrayBuffer());
          })
        })
      }
    }
    k.load('https://cdn.jsdelivr.net/npm/live2d-widget-model-shizuku@latest/assets/shizuku.model.json', pfMgr);

*/

    return new Promise((resolve, reject) => {

      pfMgr.loadBytes(path).then((buffer) => {

        const Uint8Str = String.fromCharCode.apply(null, new Uint8Array(buffer));
        this.json = JSON.parse(Uint8Str);
        if (process.env.NODE_ENV === 'development') {

          console.log(this.json);

        }
        resolve(this);

      }, (error) => {

        reject(error);

      });

    });

  }

  /**
   * Get texture file.
   * @param   {Number}  n  Index.
   * @return  {String}     Texture file path.
   */
  getTextureFile (n) {

    if(this.json[this.a.textures] == null || this.json[this.a.textures][n] == null) { // eslint-disable-line eqeqeq

      return null;

    }

    return this.json[this.a.textures][n];

  }

  /**
   * Get model file.
   * @return  {String}  Model file path.
   */
  getModelFile () {

    return this.json[this.a.model];

  }

  /**
   * Get model texture quantity.
   * @return  {Number}  Length of model textures' index.
   */
  getTextureNum () {

    if(this.json[this.a.textures] == null) { // eslint-disable-line eqeqeq

      return 0; // eslint-disable-line no-magic-numbers

    }
    return this.json[this.a.textures].length;

  }

  /**
   * Get model hit area quantity.
   * @return  {Number}  Length of model hit areas's index.
   */
  getHitAreaNum () {

    if(this.json[this.a.hitAreas] == null) { // eslint-disable-line eqeqeq

      return 0; // eslint-disable-line no-magic-numbers

    }
    return this.json[this.a.hitAreas].length;

  }

  /**
   * Get model hit area id.
   * @param   {Number}  n  Index.
   * @return  {Number}     Hit area ID.
   */
  getHitAreaID (n) {

    if(this.json[this.a.hitAreas] == null || this.json[this.a.hitAreas][n] == null) { // eslint-disable-line eqeqeq

      return null;

    }
    return this.json[this.a.hitAreas][n][this.a.id];

  }

  /**
   * Get model hit area name.
   * @param   {Number}  n  Index.
   * @return  {String}     Hit area name.
   */
  getHitAreaName (n) {

    if(this.json[this.a.hitAreas] == null || this.json[this.a.hitAreas][n] == null) { // eslint-disable-line eqeqeq

      return null;

    }
    return this.json[this.a.hitAreas][n][this.a.name];

  }

  /**
   * Get physics file path.
   * @return  {String}  Physics file path.
   */
  getPhysicsFile () {

    if(this.json[this.a.physics] == null) { // eslint-disable-line eqeqeq

      return null;

    }
    return this.json[this.a.physics];

  }

  /**
   * Get pose file path.
   * @return  {String}  Pose file path.
   */
  getPoseFile () {

    if(this.json[this.a.pose] == null) { // eslint-disable-line eqeqeq

      return null;

    }
    return this.json[this.a.pose];

  }

  /**
   * Get model expression quantity.
   * @return  {Number}  Length of model expressions' index.
   */
  getExpressionNum () {

    if(this.json[this.a.expressions] == null) { // eslint-disable-line eqeqeq

      return 0; // eslint-disable-line no-magic-numbers

    }
    return this.json[this.a.expressions].length;

  }

  /**
   * Get model expression file path.
   * @param   {Number}  n  Index.
   * @return  {String}     Expression file path.
   */
  getExpressionFile (n) {

    if(this.json[this.a.expressions] == null || this.json[this.a.expressions][n] == null) { // eslint-disable-line eqeqeq

      return null;

    }
    return this.json[this.a.expressions][n][this.a.file];

  }

  /**
   * Get model experssion file name.
   * @param   {Number}  n  Index.
   * @return  {String}     Expression file name.
   */
  getExpressionName (n) {

    if(this.json[this.a.expressions] == null || this.json[this.a.expressions][n] == null) { // eslint-disable-line eqeqeq

      return null;

    }
    return this.json[this.a.expressions][n][this.a.name];

  }

  /**
   * Get model layout.
   * @return  {String}  Layout.
   */
  getLayout () {

    if(this.json[this.a.layout] == null) { // eslint-disable-line eqeqeq

      return null;

    }
    return this.json[this.a.layout];

  }

  /**
   * Get init param quantity.
   * @return  {Number}  Init param's length.
   */
  getInitParamNum () {

    if(this.json[this.a.initParam] == null) { // eslint-disable-line eqeqeq

      return 0; // eslint-disable-line no-magic-numbers

    }
    return this.json[this.a.initParam].length;

  }

  /**
   * Get ID of init param.
   * @param   {Number}  n  Index.
   * @return  {Number}     ID of init param.
   */
  getInitParamID (n) {

    if(this.json[this.a.initParam] == null || this.json[this.a.initParam][n] == null) { // eslint-disable-line eqeqeq

      return null;

    }
    return this.json[this.a.initParam][n][this.a.id];

  }

  /**
   * Get value of init param.
   * @param   {Number}  n  Index.
   * @return  {Number}     Value of init param.
   */
  getInitParamValue (n) {

    if(this.json[this.a.initParam] == null || this.json[this.a.initParam][n] == null) { // eslint-disable-line eqeqeq

      return null; // Origin: NaN

    }
    return this.json[this.a.initParam][n][this.a.value];

  }

  /**
   * Get init parts visable quantity.
   * @return  {Number}  Length of init parts visable's index.
   */
  getInitPartsVisibleNum () {

    if(this.json[this.a.initPartsVisible] == null) { // eslint-disable-line eqeqeq

      return 0; // eslint-disable-line no-magic-numbers

    }
    return this.json[this.a.initPartsVisible].length;

  }

  /**
   * Get ID of parts visable.
   * @param   {Number}  n  Index.
   * @return  {Number}     ID of init parts visable.
   */
  getInitPartsVisibleID (n) {

    if(this.json[this.a.initPartsVisible] == null || this.json[this.a.initPartsVisible][n] == null) { // eslint-disable-line eqeqeq

      return null;

    }
    return this.json[this.a.initPartsVisible][n][this.a.id];

  }

  /**
   * Get value of init parts visable.
   * @param   {Number}  n  Index.
   * @return  {Number}     Value of init parts visable.
   */
  getInitPartsVisibleValue (n) {

    if(this.json[this.a.initPartsVisible] == null || this.json[this.a.initPartsVisible][n] == null) { // eslint-disable-line eqeqeq

      return null; // Origin: NaN

    }
    return this.json[this.a.initPartsVisible][n][this.a.value];

  }

  /**
   * Get motions quantity.
   * @param   {String}  name  Name of motion group.
   * @return  {Number}        Length of motions' index.
   */
  getMotionNum (name) {

    if(this.json[this.a.motions] == null || this.json[this.a.motions][name] == null) { // eslint-disable-line eqeqeq

      return 0; // eslint-disable-line no-magic-numbers

    }
    return this.json[this.a.motions][name].length;

  }

  /**
   * Get motion file path.
   * @param   {String}  name  Motion group name.
   * @param   {Number}  n     Index.
   * @return  {String}        motion file path.
   */
  getMotionFile (name, n) {

    if(this.json[this.a.motions] == null || this.json[this.a.motions][name] == null || this.json[this.a.motions][name][n] == null) { // eslint-disable-line eqeqeq

      return null;

    }
    return this.json[this.a.motions][name][n][this.a.file];

  }

  /**
   * Get motion sound file path.
   * @param   {String}  name  Motion group name.
   * @param   {Number}  n     Index.
   * @return  {String}        Motion sound file path.
   */
  getMotionSound (name, n) {

    if(this.json[this.a.motions] == null || this.json[this.a.motions][name] == null || this.json[this.a.motions][name][n] == null || this.json[this.a.motions][name][n][this.a.sound] == null) { // eslint-disable-line eqeqeq

      return null;

    }
    return this.json[this.a.motions][name][n][this.a.sound];

  }

  /**
   * Get motion fade in time.
   * @param   {String}  name  Motion group name.
   * @param   {Number}  n     Index.
   * @return  {Number}        Motion fade in time. (1000 if undefined)
   */
  getMotionFadeIn (name, n) {

    if(this.json[this.a.motions] == null || this.json[this.a.motions][name] == null || this.json[this.a.motions][name][n] == null || this.json[this.a.motions][name][n][this.a.fadeIn] == null) { // eslint-disable-line eqeqeq

      return 1000; // eslint-disable-line no-magic-numbers

    }
    return this.json[this.a.motions][name][n][this.a.fadeIn];

  }

  /**
   * Get motion fade out time.
   * @param   {String}  name  Motion group name.
   * @param   {Number}  n     Index.
   * @return  {Number}        Motion fade out time. (1000 if undefined)
   */
  getMotionFadeOut (name, n) {

    if(this.json[this.a.motions] == null || this.json[this.a.motions][name] == null || this.json[this.a.motions][name][n] == null || this.json[this.a.motions][name][n][this.a.fadeOut] == null) { // eslint-disable-line eqeqeq

      return 1000; // eslint-disable-line no-magic-numbers

    }
    return this.json[this.a.motions][name][n][this.a.fadeOut];

  }

}

if (process.env.NODE_ENV === 'development') {

  window.ModelSettingJson = ModelSettingJson;

}

export {
  ModelSettingJson,
};
