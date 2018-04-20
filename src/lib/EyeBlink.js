/* global UtSystem, process */

class EyeBlink {

  /**
   * Construtcor to EyeBlink.
   * @param   {Storage}  storage  Storage.
   * @return  {Function}          The instance function itself.
   */
  constructor (storage) {

    this.storage = storage;
    this.nextBlinkTime = null;
    this.stateStartTime = null;
    this.eyeState = this.storage.eyeState.first;
    this.blinkIntervalMsec = 4000;
    this.closingMotionMsec = 100;
    this.closedMotionMsec = 50;
    this.openingMotionMsec = 150;
    this.closeIfZero = true;
    return this;

  }

  /**
   * Calc next bink
   * @return  {Number}  Next blink time.
   */
  calcNextBlink () {

    const time = UtSystem.getUserTimeMSec();
    const r = Math.random();
    return time + r * (2 * this.blinkIntervalMsec - 1);

  }

  /**
   * Set interval.
   * @param  {Number}  blinkIntervalMsec  blink interval time.
   * @return {Function}                   The instance function itself.
   */
  setInterval (blinkIntervalMsec) {

    this.blinkIntervalMsec = blinkIntervalMsec;
    return this;

  }

  /**
   * Set eye motion.
   * @param  {Number}  closingMotionMsec  Closing motion time.
   * @param  {Number}  closedMotionMsec   Closed motion time.
   * @param  {Number}  openingMotionMsec  Opening motion time.
   * @return {Function}                   The instance function itself.
   */
  setEyeMotion (closingMotionMsec, closedMotionMsec, openingMotionMsec) {

    this.closingMotionMsec = closingMotionMsec;
    this.closedMotionMsec = closedMotionMsec;
    this.openingMotionMsec = openingMotionMsec;
    return this;

  }

  /**
   * Update eye param.
   * @param   {Model}  model  A Model.
   * @return  {Function}      The instance function itself.
   */
  updateParam (model) {

    const time = UtSystem.getUserTimeMSec();
    let eyeParamValue;
    let t = 0;
    switch(this.eyeState) {

    case this.storage.eyeState.closing:
      t = (time - this.stateStartTime) / this.closingMotionMsec;
      if(t >= 1) {

        t = 1;
        this.eyeState = this.storage.eyeState.closed;
        this.stateStartTime = time;

      }
      eyeParamValue = 1 - t;
      break;
    case this.storage.eyeState.closed:
      t = (time - this.stateStartTime) / this.closedMotionMsec;
      if(t >= 1) {

        this.eyeState = this.storage.eyeState.opening;
        this.stateStartTime = time;

      }
      eyeParamValue = 0;
      break;
    case this.storage.eyeState.opening:
      t = (time - this.stateStartTime) / this.openingMotionMsec;
      if(t >= 1) {

        t = 1;
        this.eyeState = this.storage.eyeState.interval;
        this.nextBlinkTime = this.calcNextBlink();

      }
      eyeParamValue = t;
      break;
    case this.storage.eyeState.interval:
      if(this.nextBlinkTime < time) {

        this.eyeState = this.storage.eyeState.closing;
        this.stateStartTime = time;

      }
      eyeParamValue = 1;
      break;
    case this.storage.eyeState.first:
    default:
      this.eyeState = this.storage.eyeState.interval;
      this.nextBlinkTime = this.calcNextBlink();
      eyeParamValue = 1;
      break;

    }
    if(!this.closeIfZero) {

      eyeParamValue = -eyeParamValue;

    }
    model.setParamFloat(this.storage.eyeID.L, eyeParamValue);
    model.setParamFloat(this.storage.eyeID.R, eyeParamValue);
    return this;

  }

}


if (process.env.NODE_ENV === 'development') {

  window.EyeBlink = EyeBlink;

}

export {
  EyeBlink,
};
