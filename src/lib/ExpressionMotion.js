/* global process, AMotion */

import {ExpressionParam, } from './ExpressionParam';

class ExpressionMotion extends AMotion {

  /**
   * Constructor to ExpressionMotion.
   * @return  {Function}  The instance function itself.
   */
  constructor (storage) {

    super();
    this.paramList = new Array();
    this.expressionDefault = 'DEFAULT';
    this.storage = storage;
    return this;

  }

  /**
   * Load json.
   * @param   {Array}  buffer  Buffer of expression.
   * @return  {Function}       The instance function itself with loaded expressions.
   */
  static loadJson (buffer) {

    const thisRef = new ExpressionMotion(storage);
    const json = this.storage.getPMF().jsonParseFromBytes(buffer);
    thisRef.setFadeIn(parseInt(json.fade_in) > 0 ? parseInt(json.fade_in) : 1000);
    thisRef.setFadeOut(parseInt(json.fade_out) > 0 ? parseInt(json.fade_out) : 1000);
    if (json.params == null) {

      return thisRef;

    }
    const params = json.params;
    thisRef.paramList = [];
    for (const i in params) {

      const param = params[i];
      const paramID = param.id.toString();
      let value = parseFloat(param.val);
      let calcTypeInt = this.storage.expressionMotion.typeAdd;
      const calc = param.calc != null ? param.calc.toString() : 'add';
      if (calc === 'add') {

        calcTypeInt = this.storage.expressionMotion.typeAdd;

      } else if (calc === 'mult') {

        calcTypeInt = this.storage.expressionMotion.typeMult;

      } else if (calc === 'set') {

        calcTypeInt = this.storage.expressionMotion.typeSet;

      } else {

        calcTypeInt = this.storage.expressionMotion.typeAdd;

      }
      if (calcTypeInt === this.storage.expressionMotion.typeAdd) {

        const defaultValue = param.def == null ? 0 : parseFloat(param.def);
        value -= defaultValue;

      } else if (calcTypeInt === this.storage.expressionMotion.typeMult) {

        const defaultValue = param.def == null ? 1 : parseFloat(param.def);
        if (defaultValue === 0) {

          defaultValue = 1;

        }
        value /= defaultValue;

      }
      const item = new ExpressionParam();
      item.id = paramID;
      item.type = calcTypeInt;
      item.value = value;
      thisRef.paramList.push(item);

    }
    return thisRef;

  }

  /**
   * Update param exe.
   * @param   {Model}  model                    A Model.
   * @param   {Number}  timeMSec                Time M second.
   * @param   {Number}  weight                  Weight.
   * @param   {MotionQueueEnt}  motionQueueEnt  MotionQueueEnt.
   * @return  {Function}                        The instance function itself.
   */
  updateParamExe (model, timeMSec, weight, motionQueueEnt) {

    for (const i in this.paramList) {

      const param = this.paramList[i];
      if (param.type === this.storage.expressionMotion.typeAdd) {

        model.addToParamFloat(param.id, param.value, weight);

      } else if (param.type === this.storage.expressionMotion.typeMult) {

        model.multParamFloat(param.id, param.value, weight);

      } else if (param.type === this.storage.expressionMotion.typeSet) {

        model.setParamFloat(param.id, param.value, weight);

      }

    }
    return this;

  }

}

if (process.env.NODE_ENV === 'development') {

  window.ExpressionMotion = ExpressionMotion;

}

export {ExpressionMotion, };
