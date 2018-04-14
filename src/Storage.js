class Storage{
  constructor(){
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
  }

  setWebGL(v){
    this.webGL = v;
    return this;
  }

  getWebGL(){
    return this.webGL;
  }

  setConfig(v){
    this.config = v;
    return this;
  }

  getConfig(){
    return this.config;
  }

  setPFM(v){
    this.platformManager = v;
    return this;
  }

  getPFM(){
    return this.platformManager;
  }

  setEyeState(v){
    console.log('live2d-widget: Make sure you know what you are doing.');
    this.eyeState = v;
    return this;
  }

  getEyeState(){
    return this.eyeState;
  }

  setReactPriority(v){
    console.log('live2d-widget: Make sure you know what you are doing.');
    this.reactPriority = v;
    return this;
  }

  getReactPriority(){
    return this.reactPriority;
  }

}


if (process.env.NODE_ENV === 'development') {

  window.Storage = Storage;

}

export {
  Storage,
};
