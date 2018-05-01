class Storage {

  constructor () {

    this.canvas = null;
    this.webGL = null;
    this.config = null;
    this.platformManager = null;
    this.eyeState = {
      'first': 'STATE_FIRST',
      'interval': 'STATE_INTERVAL',
      'closing': 'STATE_CLOSING',
      'closed': 'STATE_CLOSED',
      'opening': 'STATE_OPENING',
    };
    this.eyeID = {
      'L': 'PARAM_EYE_L_OPEN',
      'R': 'PARAM_EYE_R_OPEN',
    };
    this.expressionMotion = {
      'expressionDefault': 'DEFAULT',
      'typeSet': 0,
      'typeAdd': 1,
      'typeMult': 2,
    };
    this.reactPriority = {
      'idle': 1,
      'normal': 2,
      'force': 3,
    };
    this.ModelSettingJson = {
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
    };

    this.captureFramePromise = null;

    return this;

  }

  /**
   * Set WebGL.
   * Buffer will also be setted.
   * @param  {RenderingContext}  v  WebGL to set.
   * @return {Function}             The instance function itself.
   */
  setWebGL (v) {

    this.webGL = v;
    return this;

  }

  /**
   * Set config.
   * @param  {Config}  v  Config to set.
   */
  setConfig (v) {

    this.config = v;
    return this;

  }

  /**
   * Set PlatformManager.
   * @param  {PlatformManager}  v  PlatformManager to set.
   */
  setPFM (v) {

    this.platformManager = v;
    return this;

  }

  setCanvas (v) {

    this.canvas = v;
    return this;

  }

}


if (process.env.NODE_ENV === 'development') {

  window.Storage = Storage;

}

export {Storage, };
