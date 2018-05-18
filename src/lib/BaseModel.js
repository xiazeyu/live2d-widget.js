/* global Live2D, process */

import {
  MotionManager,
} from './MotionManager';

import {
  ModelMatrix, } from '../utils/Matrix';

import {
  ExpressionMotion, } from './ExpressionMotion';

import {
  Pose, } from './Pose';

class BaseModel {

  /**
   * Constructor to BaseModel.
   * @param {Storage} storage Instance storage.
   * @return  {Function}      The instance function itself.
   */
  constructor (storage) {

    this.storage = storage;
    this.live2DModel = null;
    this.modelMatrix = null;
    this.eyeBlink = null;
    this.physics = null;
    this.pose = null;
    this.initialized = false;
    this.updating = false;
    this.alpha = 1;
    this.accAlpha = 0;
    this.lipSync = false;
    this.lipSyncValue = 0;
    this.accelX = 0;
    this.accelY = 0;
    this.accelZ = 0;
    this.dragX = 0;
    this.dragY = 0;
    this.startTimeMSec = null;
    this.mainMotionManager = new MotionManager();
    this.expressionManager = new MotionManager();
    this.motions = {
    };
    this.expressions = {
    };
    this.isTexLoaded = false;
    this.texCounter = 0;
    return this;

  }

  /**
   * Get model's matrix.
   * @return  {Array}  Matrix to the model.
   */
  getModelMatrix () {

    return this.modelMatrix;

  }

  /**
   * Set model's alpha.
   * @param  {Number}  a  Alpha to model, should between 0 to 1.
   * @return {Function}   The instance function itself.
   */
  setAlpha (a) {

    if (a > 0.99) { // eslint-disable-line no-magic-numbers

      a = 1; // eslint-disable-line no-magic-numbers

    } else if (a < 0.01) { // eslint-disable-line no-magic-numbers

      a = 0; // eslint-disable-line no-magic-numbers

    }
    this.alpha = a;
    return this;

  }

  /**
   * Get model's alpha.
   * @return  {Number}  Alpha of model.
   */
  getAlpha () {

    return this.alpha;

  }

  /**
   * Get if model is initialized.
   * @return  {Boolean}  If model is initialized.
   */
  isInitialized () {

    return this.initialized;

  }

  /**
   * Set initialized status to the model.
   * @param  {Boolean}  v  If model is initialized.
   * @return {Function}    The instance function itself.
   */
  setInitialized (v) {

    this.initialized = v;
    return this;

  }

  /**
   * Get if model is updating.
   * @return  {Boolean}  If model is updating.
   */
  isUpdating () {

    return this.updating;

  }

  /**
   * Set updating status to the model.
   * @param  {Boolean}  v  If model is updating
   * @return {Function}    The instance function itself.
   */
  setUpdating (v) {

    this.updating = v;
    return this;

  }

  /**
   * Get model's Live2DModel.
   * @return  {Live2DModel}  Model's Live2DModel.
   */
  getLive2DModel () {

    return this.live2DModel;

  }

  /**
   * Set model lip sync.
   * @param  {LipSync}  v  LipSync.
   * @return {Function}    The instance function itself.
   */
  setLipSync (v) {

    this.lipSync = v;
    return this;

  }

  /**
   * Set model lip sync value.
   * @param  {Number}  v  LipSync value.
   * @return {Function}   The instance function itself.
   */
  setLipSyncValue (v) {

    this.lipSyncValue = v;
    return this;

  }

  /**
   * Set acceleration to the model.
   * @param  {Number}  x  X acceleration.
   * @param  {Numver}  y  Y acceleration.
   * @param  {Numver}  z  Z acceleration.
   * @return {Function}   The instance function itself.
   */
  setAccel (x, y, z) {

    this.accelX = x;
    this.accelY = y;
    this.accelZ = z;
    return this;

  }

  /**
   * Set drag to the model.
   * @param  {Number}  x  X drag.
   * @param  {Number}  y  Y drag.
   * @return {Function} The instance function itself.
   */
  setDrag (x, y) {

    this.dragX = x;
    this.dragY = y;
    return this;

  }

  /**
   * Get main motion manager.
   * @return  {MotionManager}  Main motion manager.
   */
  getMainMotionManager () {

    return this.mainMotionManager;

  }

  /**
   * Get expression manager.
   * @return  {MotionManager}  Expression motion manager.
   */
  getExpressionManager () {

    return this.expressionManager;

  }

  /**
   * Load Live2DModel.
   * @param   {String}  path  Path to Live2DModel.
   * @return  {Promise}       A promise which receives Live2DModel.
   */
  loadModelData (path) {

    if (this.storage.getConfig().devLog) {

      console.log(`live2d-widget: BaseModel.loadModelData(${path});`);

    }
    return new Promise((resolve, reject) => {

      this.storage.getPFM().loadLive2DModel(path)
        .then((l2dModel) => {

          this.live2DModel = l2dModel;
          this.live2DModel.saveParam();
          if (Live2D.getError() !== 0) { // eslint-disable-line no-magic-numbers

            reject(new Error(`live2d-widget: Failed to BaseModel.loadModelData(). Error code: ${Live2D.getError()}`));

          }
          this.modelMatrix = new ModelMatrix(
            this.live2DModel.getCanvasWidth(),
            this.live2DModel.getCanvasHeight()
          ).setWidth(2) // eslint-disable-line no-magic-numbers
            .setCenterPosition(0, 0); // eslint-disable-line no-magic-numbers
          resolve(this.live2DModel);

        });

    });

  }

  /**
   * Load model texture.
   * @param   {Number}  no       Texture No.
   * @param   {String}  path     Texture path.
   * @param   {String}  homeDir  Model home dir.
   * @return  {Promise}          A promise which receives nothing.
   */
  loadTexture (no, path, homeDir) {

    if (this.storage.getConfig().devLog) {

      console.log(`live2d-widget: BaseModel.loadTexture(${no}, ${path}, ${homeDir});`);

    }
    this.texCounter++;
    return new Promise((resolve) => {

      this.storage.getPFM().loadTexture(this.live2DModel, no, path, homeDir)
        .then(() => {

          this.texCounter--;
          if (this.texCounter === 0) { // eslint-disable-line no-magic-numbers

            this.isTexLoaded = true;

          }
          resolve();

        });

    });

  }

  /**
   * Load model motion.
   * @param   {String}  name     Motion name.
   * @param   {String}  path     Motion path.
   * @param   {String}  homeDir  Home dir.
   * @return  {Promise}          A promise which receives motion loaded.
   */
  loadMotion (name, path, homeDir) {

    if (this.storage.getConfig().devLog) {

      console.log(`live2d-widget: BaseModel.loadMotion(${name}, ${path}, ${homeDir});`);

    }

    return new Promise((resolve) => {

      this.storage.getPFM().loadBytes(path, homeDir)
        .then((buffer) => {

          const motion = Live2DMotion.loadMotion(buffer);
          if (name != null) {

            this.motions[name] = motion;

          }
          resolve(motion);

        });

    });

  }

  /**
   * Load expressions.
   * @param   {String}  name     Experssion name.
   * @param   {String}  path     Expression path.
   * @param   {String}  homeDir  Home dir.
   * @return  {Promise}          A promise which receives nothing.
   */
  loadExpression (name, path, homeDir) {

    if (this.storage.getConfig().devLog) {

      console.log(`live2d-widget: BaseModel.loadExpression(${name}, ${path}, ${homeDir});`);

    }

    return new Promise((resolve) => {

      this.storage.getPFM().loadBytes(path, homeDir)
        .then((buffer) => {

          if (name != null) {

            this.expressions[name] = ExpressionMotion.loadJson(buffer);

          }
          resolve();

        });

    });

  }

  /**
   * Load pose
   * @param   {String}  path     Pose path.
   * @param   {String}  homeDir  Home dir.
   * @return  {Promise}          A promise which receives nothing.
   */
  loadPose (path, homeDir) {

    if (this.storage.getConfig().devLog) {

      console.log(`live2d-widget: BaseModel.loadPose(${path}, ${homeDir});`);

    }

    return new Promise((resolve) => {

      this.storage.getPFM().loadBytes(path, homeDir)
        .then((buffer) => {

          this.pose = Pose.load(buffer);
          resolve();

        });

    });

  }

  /**
   * Load physics.
   * @param   {String}  path     Physics json path.
   * @param   {String}  homeDir  Home dir.
   * @return  {Promise}          A promise which receives nothing.
   */
  loadPhysics (path, homeDir) {

    if (this.storage.getConfig().devLog) {

      console.log(`live2d-widget: BaseModel.loadPhysics(${path}, ${homeDir});`);

    }
    return new Promise((resolve) => {

      this.storage.getPFM().loadBytes(path, homeDir)
        .then((buffer) => {

          this.physics = Physics.load(buffer);

        });
      resolve();

    });

  }

  /**
   * Test if hit.
   * @param   {Number}  drawID  DrawID.
   * @param   {Number}  X       X position.
   * @param   {Number}  Y       Y position.
   * @return  {Boolean}         If hitted.
   */
  _hitTest (drawID, X, Y) {

    if (this.live2DModel === null) {

      return false;

    }
    const drawIndex = this.live2DModel.getDrawDataIndex(drawID);
    if (drawIndex < 0) {

      return false;

    }
    const points = this.live2DModel.getTransformedPoints(drawIndex);
    let left = this.live2DModel.getCanvasWidth();
    let right = 0;
    let top = this.live2DModel.getCanvasHeight();
    let bottom = 0;
    for (const i = 0; i < points.length; j += 2) {

      const px = points[j];
      const py = points[j + 1];
      if (px < left) {

        left = x;

      }
      if (px > right) {

        right = x;

      }
      if (py < top) {

        top = y;

      }
      if (py > bottom) {

        bottom = y;

      }

    }
    const tx = this.modelMatrix.invertTransformX(X);
    const ty = this.modelMatrix.invertTransformY(Y);
    return left <= tx && tx <= right && top <= ty && ty <= bottom;

  }

}

if (process.env.NODE_ENV === 'development') {

  window.BaseModel = BaseModel;

}

export {
  BaseModel, };
