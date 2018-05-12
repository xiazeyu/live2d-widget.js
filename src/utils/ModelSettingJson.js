/* global process */

/*
 * TODO
 * Add getMotionNum(name)...
 */

class ModelSettingJson {

  /**
   * Constructor
   * @param   {Storage}  storage  Storage.
   * @return  {Function}           The instance function itself.
   */
  constructor (storage) {

    this.storage = storage;
    this.json = {
    };
    return this;

  }

  /**
   * Load model settings.
   * @param   {String}  path     Model json path.
   * @param   {Function}  pfMgr  Instance platformManager.
   * @return  {Promise}          A promise that returns instance function.
   */
  load (path, pfMgr) {

    return new Promise((resolve, reject) => {

      pfMgr.loadBytes(path).then((buffer) => {

        this.json = pfMgr.jsonParseFromBytes(buffer);
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
   * Get texture.
   * @return  {Array}  Textures.
   */
  getTexture () {

    return this.json[this.storage.ModelSettingJson.textures];

  }

  /**
   * Get model file.
   * @return  {String}  Model file path.
   */
  getModel () {

    return this.json[this.storage.ModelSettingJson.model];

  }

  /**
   * Set model hit area with default settings.
   * @return {Function} The instance function itself.
   */
  setHitArea () {

    if (this.json[this.storage.ModelSettingJson.hitAreas] == null) { // eslint-disable-line eqeqeq

      this.json = Object.assign(this.json, {
        [this.storage.ModelSettingJson.hitAreas]: [
        ], });

    }
    const currHitArea = this.json[this.storage.ModelSettingJson.hitAreas];
    const defaultHitArea = [
      {
        'id': 'D_REF.HEAD',
        'name': 'head',
      },
      {
        'id': 'D_REF.BODY',
        'name': 'body',
      },
      {
        'id': 'D_REF.EAR_L',
        'name': 'ear_l',
      },
      {
        'id': 'D_REF.EAR_R',
        'name': 'ear_r',
      },
      {
        'id': 'D_REF.BUST',
        'name': 'bust',
      },
    ];

    for (const i in defaultHitArea) {

      let has = false;
      for (const j in currHitArea) {

        if (currHitArea[j].name === defaultHitArea[i].name) {

          has = true;

        }

      }
      if (!has) {

        this.json[this.storage.ModelSettingJson.hitAreas].push(defaultHitArea[i]);

      }

    }

    return this;

  }

  /**
   * Get model hit area.
   * @return  {Array}  Hit areas.
   */
  getHitArea () {

    return this.json[this.storage.ModelSettingJson.hitAreas];

  }

  /**
   * Get model hit area id.
   * @param   {Number}  n  Index.
   * @return  {Number}     Hit area ID.
   */
  getHitAreaID (n) {

    if (this.json[this.storage.ModelSettingJson.hitAreas] == null || this.json[this.storage.ModelSettingJson.hitAreas][n] == null) { // eslint-disable-line eqeqeq

      return null;

    }
    return this.json[this.storage.ModelSettingJson.hitAreas][n][this.storage.ModelSettingJson.id];

  }

  /**
   * Get model hit area name.
   * @param   {Number}  n  Index.
   * @return  {String}     Hit area name.
   */
  getHitAreaName (n) {

    if (this.json[this.storage.ModelSettingJson.hitAreas] == null || this.json[this.storage.ModelSettingJson.hitAreas][n] == null) { // eslint-disable-line eqeqeq

      return null;

    }
    return this.json[this.storage.ModelSettingJson.hitAreas][n][this.storage.ModelSettingJson.name];

  }

  /**
   * Get physics file path.
   * @return  {String}  Physics file path.
   */
  getPhysicsFile () {

    if (this.json[this.storage.ModelSettingJson.physics] == null) { // eslint-disable-line eqeqeq

      return null;

    }
    return this.json[this.storage.ModelSettingJson.physics];

  }

  /**
   * Get pose file path.
   * @return  {String}  Pose file path.
   */
  getPoseFile () {

    if (this.json[this.storage.ModelSettingJson.pose] == null) { // eslint-disable-line eqeqeq

      return null;

    }
    return this.json[this.storage.ModelSettingJson.pose];

  }

  /**
   * Get model expression quantity.
   * @return  {Array}  Expressions.
   */
  getExpression () {

    if (this.json[this.storage.ModelSettingJson.expressions] == null || this.json[this.storage.ModelSettingJson.expressions].length <= 0) { // eslint-disable-line eqeqeq

      return null;

    }

    return this.json[this.storage.ModelSettingJson.expressions];

  }

  /**
   * Get model expression file path.
   * @param   {Number}  n  Index.
   * @return  {String}     Expression file path.
   */
  getExpressionFile (n) {

    if (this.json[this.storage.ModelSettingJson.expressions] == null || this.json[this.storage.ModelSettingJson.expressions][n] == null) { // eslint-disable-line eqeqeq

      return null;

    }
    return this.json[this.storage.ModelSettingJson.expressions][n][this.storage.ModelSettingJson.file];

  }

  /**
   * Get model experssion file name.
   * @param   {Number}  n  Index.
   * @return  {String}     Expression file name.
   */
  getExpressionName (n) {

    if (this.json[this.storage.ModelSettingJson.expressions] == null || this.json[this.storage.ModelSettingJson.expressions][n] == null) { // eslint-disable-line eqeqeq

      return null;

    }
    return this.json[this.storage.ModelSettingJson.expressions][n][this.storage.ModelSettingJson.name];

  }

  /**
   * Get model layout.
   * @return  {String}  Layout.
   */
  getLayout () {

    if (this.json[this.storage.ModelSettingJson.layout] == null) { // eslint-disable-line eqeqeq

      return null;

    }
    return this.json[this.storage.ModelSettingJson.layout];

  }

  /**
   * Get init param.
   * @return  {Array}  Init param.
   */
  getInitParam () {

    return this.json[this.storage.ModelSettingJson.initParam];

  }

  /**
   * Get ID of init param.
   * @param   {Number}  n  Index.
   * @return  {Number}     ID of init param.
   */
  getInitParamID (n) {

    if (this.json[this.storage.ModelSettingJson.initParam] == null || this.json[this.storage.ModelSettingJson.initParam][n] == null) { // eslint-disable-line eqeqeq

      return null;

    }
    return this.json[this.storage.ModelSettingJson.initParam][n][this.storage.ModelSettingJson.id];

  }

  /**
   * Get value of init param.
   * @param   {Number}  n  Index.
   * @return  {Number}     Value of init param.
   */
  getInitParamValue (n) {

    if (this.json[this.storage.ModelSettingJson.initParam] == null || this.json[this.storage.ModelSettingJson.initParam][n] == null) { // eslint-disable-line eqeqeq

      return null; // Origin: NaN

    }
    return this.json[this.storage.ModelSettingJson.initParam][n][this.storage.ModelSettingJson.value];

  }

  /**
   * Get init parts visable.
   * @return  {Array}  Init parts visable.
   */
  getInitPartsVisible () {

    return this.json[this.storage.ModelSettingJson.initPartsVisible];

  }

  /**
   * Get ID of parts visable.
   * @param   {Number}  n  Index.
   * @return  {Number}     ID of init parts visable.
   */
  getInitPartsVisibleID (n) {

    if (this.json[this.storage.ModelSettingJson.initPartsVisible] == null || this.json[this.storage.ModelSettingJson.initPartsVisible][n] == null) { // eslint-disable-line eqeqeq

      return null;

    }
    return this.json[this.storage.ModelSettingJson.initPartsVisible][n][this.storage.ModelSettingJson.id];

  }

  /**
   * Get value of init parts visable.
   * @param   {Number}  n  Index.
   * @return  {Number}     Value of init parts visable.
   */
  getInitPartsVisibleValue (n) {

    if (this.json[this.storage.ModelSettingJson.initPartsVisible] == null || this.json[this.storage.ModelSettingJson.initPartsVisible][n] == null) { // eslint-disable-line eqeqeq

      return null; // Origin: NaN

    }
    return this.json[this.storage.ModelSettingJson.initPartsVisible][n][this.storage.ModelSettingJson.value];

  }

  /**
   * Get motions quantity.
   * @param   {String}  name  Name of motion group.
   * @return  {Array}         Motions.
   */
  getMotion (name) {

    if (this.json[this.storage.ModelSettingJson.motions] == null || this.json[this.storage.ModelSettingJson.motions][name] == null) { // eslint-disable-line eqeqeq

      return null;

    }
    return this.json[this.storage.ModelSettingJson.motions][name];

  }

  /**
   * Get motion file path.
   * @param   {String}  name  Motion group name.
   * @param   {Number}  n     Index.
   * @return  {String}        motion file path.
   */
  getMotionFile (name, n) {

    if (this.json[this.storage.ModelSettingJson.motions] == null || this.json[this.storage.ModelSettingJson.motions][name] == null || this.json[this.storage.ModelSettingJson.motions][name][n] == null) { // eslint-disable-line eqeqeq

      return null;

    }
    return this.json[this.storage.ModelSettingJson.motions][name][n][this.storage.ModelSettingJson.file];

  }

  /**
   * Get motion sound file path.
   * @param   {String}  name  Motion group name.
   * @param   {Number}  n     Index.
   * @return  {String}        Motion sound file path.
   */
  getMotionSound (name, n) {

    if (this.json[this.storage.ModelSettingJson.motions] == null || this.json[this.storage.ModelSettingJson.motions][name] == null || this.json[this.storage.ModelSettingJson.motions][name][n] == null || this.json[this.storage.ModelSettingJson.motions][name][n][this.storage.ModelSettingJson.sound] == null) { // eslint-disable-line eqeqeq

      return null;

    }
    return this.json[this.storage.ModelSettingJson.motions][name][n][this.storage.ModelSettingJson.sound];

  }

  /**
   * Get motion fade in time.
   * @param   {String}  name  Motion group name.
   * @param   {Number}  n     Index.
   * @return  {Number}        Motion fade in time. (1000 if undefined)
   */
  getMotionFadeIn (name, n) {

    if (this.json[this.storage.ModelSettingJson.motions] == null || this.json[this.storage.ModelSettingJson.motions][name] == null || this.json[this.storage.ModelSettingJson.motions][name][n] == null || this.json[this.storage.ModelSettingJson.motions][name][n][this.storage.ModelSettingJson.fadeIn] == null) { // eslint-disable-line eqeqeq

      return 1000; // eslint-disable-line no-magic-numbers

    }
    return this.json[this.storage.ModelSettingJson.motions][name][n][this.storage.ModelSettingJson.fadeIn];

  }

  /**
   * Get motion fade out time.
   * @param   {String}  name  Motion group name.
   * @param   {Number}  n     Index.
   * @return  {Number}        Motion fade out time. (1000 if undefined)
   */
  getMotionFadeOut (name, n) {

    if (this.json[this.storage.ModelSettingJson.motions] == null || this.json[this.storage.ModelSettingJson.motions][name] == null || this.json[this.storage.ModelSettingJson.motions][name][n] == null || this.json[this.storage.ModelSettingJson.motions][name][n][this.storage.ModelSettingJson.fadeOut] == null) { // eslint-disable-line eqeqeq

      return 1000; // eslint-disable-line no-magic-numbers

    }
    return this.json[this.storage.ModelSettingJson.motions][name][n][this.storage.ModelSettingJson.fadeOut];

  }

}

if (process.env.NODE_ENV === 'development') {

  window.ModelSettingJson = ModelSettingJson;

}

export {
  ModelSettingJson, };
