class Storage{
  constructor(){
    this.webGL = null;
    this.webGLBuffer = null;
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
  }

  /**
   * Set WebGL.
   * Buffer will also be setted.
   * @param  {RenderingContext}  v  WebGL to set.
   * @return {Function}             The instance function itself.
   */
  setWebGL(v){
    this.webGL = v;
    this.webGLBuffer = v;
    return this;
  }

  /**
   * Set WebGL buffer.
   * @param  {RenderingContext}  v  WebGL buffer to set.
   * @return {Function}             The instance function itself.
   */
  setWebGLBuffer(v){
    this.webGLBuffer = v;
    return this;
  }

  /**
   * Get WebGL.
   * @return  {RenderingContext}  WebGL.
   */
  getWebGL(){
    return this.webGL;
  }

  /**
   * Get WebGL buffer.
   * @return  {RenderingContext}  WebGL buffer.
   */
  getWebGLBuffer(){
    return this.webGLBuffer;
  }

  /**
   * Set config.
   * @param  {Config}  v  Config to set.
   */
  setConfig(v){
    this.config = v;
    return this;
  }

  /**
   * Set PlatformManager.
   * @param  {PlatformManager}  v  PlatformManager to set.
   */
  setPFM(v){
    this.platformManager = v;
    return this;
  }

  /**
   * Get PlatformManager.
   * @return  {PlatformManager}  PlatformManager.
   */
  getPFM(){
    return this.platformManager;
  }

}


if (process.env.NODE_ENV === 'development') {

  window.Storage = Storage;

}

export {
  Storage,
};
