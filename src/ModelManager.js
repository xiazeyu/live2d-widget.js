/* global process */

import {
  Model,
} from './Model';

class ModelManager {

  constructor () {

    this.model = null;

  }
  /**
   * Create and bind a Live2D Model.
   * Please release the model first otherwise it will throw an Error.
   * @return  {Model}  A model.
   */
  create (gl, modelUrl) {

    if(this.model !== null) {

      this.model = new Model();
      this.model.load(gl, modelUrl);
      return this.model;

    }
    throw new Error('live2d-widget: Failed to create a model: Alreday have one, please release first.');

  }

  /**
   * Get current Live2D model.
   * @return  {Model}  A model.
   */
  get(){
    return this.model;
  }

  /**
   * Release current Live2D model.
   * @return  {Function}  The instance function itself.
   */
  release(){
    this.model.release(gl);
    this.model = null;
    return this;
  }

  /**
   * Set model to face a direction.
   * @param  {Number}  x  X position.
   * @param  {Number}  y  Y position.
   * @return {Function}   The instance function itself.
   */
  setDrag(x, y){
    this.model.setDrag(x, y);
    return this;
  }

  /**
   * Process a tap event.
   * @param   {Number}  x  X position.
   * @param   {Number}  y  Y position.
   * @return  {Function}   The instance function itself.
   */
  tapEvent(x, y, config){
    if(config.devLog){
      console.log(`DEBUG-live2d-widget: ModelManager.tapEvent(${x}, ${y});`);
    }
    // TODO
    if(this.model.hitTest('head', x, y)){
      if(config.devLog){
        console.log(`DEBUG-live2d-widget: ModelManager.tapEvent(): Tap head.`);
      }
      this.model.setRandomExpression();
    }else if (this.model.hitTest('body', x, y)){
      if(config.devLog){
        console.log(`DEBUG-live2d-widget: ModelManager.tapEvent(): Tap body.`);
      }
      this.model.setRandomExpression('tap_body', config.reactPriorityNormal)
    }
  }
  return this;
}

if (process.env.NODE_ENV === 'development') {

  window.ModelManager = ModelManager;

}

export {
  ModelManager,
};
