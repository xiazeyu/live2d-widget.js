/* global process, UtSystem */

import {
  BaseModel,
} from './lib/BaseModel';

import {
  EyeBlink, } from './lib/EyeBlink';

import {
  ModelSettingJson,
} from './utils/ModelSettingJson';

import {
  getPathFromUrl, } from './utils/pathHandler';

class Model extends BaseModel {

  /**
   * Constructor to Model.
   * @param   {Storage}  storage  Storage.
   * @return  {Function}          The instance function itself.
   */
  constructor (storage) {

    super(storage);
    this.modelSetting = null;
    this.tmpMatrix = matrixStack.getMatrix();
    this.modelHomeDir = null;
    this.textures = [];

  }

  /**
   * Load Model.
   * @param   {String}  modelSettingPath  Model setting path.
   * @return  {Promise}                   A promise which receives nothing.
   */
  load (modelSettingPath) {

    return new Promise((resolve) => {

      const gl = this.storage.getWebGL();
      this.setUpdating(true)
        .setInitialized(false);
      this.modelHomeDir = getPathFromUrl(modelSettingPath);
      this.modelSetting = new ModelSettingJson();
      this.modelSetting.loadModelSetting(modelSettingPath).then(() => {

        const path = this.modelSetting.getModel();
        this.loadModelData(path, this.modelHomeDir).then((model) => {

          for (const i in this.modelSetting.getTexture()) {

            const texPaths = this.modelSetting.getTexture[i];
            this.loadTexture(i, texPaths, this.modelHomeDir).then((texture) => {

              this.textures.push(texture);
              if (this.isTexLoaded) {

                this.expressions = {
                };
                if (this.modelSetting.getExpression() !== null) {

                  for (const j in this.modelSetting.getExpression()) {

                    const expName = this.modelSetting.getExpressionName(j);
                    const expFilePath = this.modelSetting.getExpressionFile(j);
                    this.loadExpression(expName, expFilePath, this.modelHomeDir);

                  }

                } else {

                  this.expressionManager = null;

                }

              }
              if (this.eyeBlink == null) {

                this.eyeBlink = new EyeBlink(this.storage);

              }
              if (this.modelSetting.getPhysicsFile() !== null) {

                this.loadPhysics(this.modelSetting.getPhysicsFile(), this.modelHomeDir);

              } else {

                this.physics = null;

              }
              if (this.modelSetting.getPoseFile() !== null) {

                this.loadPose(this.modelSetting.getPoseFile(), this.modelHomeDir).then(() => {

                  this.pose.updateParam(this.live2DModel);

                });

              } else {

                this.pose = null;

              }
              if (this.modelSetting.getLayout() !== null) {

                const layout = this.modelSetting.getLayout();
                if (layout.width != null) {

                  this.modelMatrix.setWidth(layout.width);

                }
                if (layout.height != null) {

                  this.modelMatrix.setHeight(layout.height);

                }
                if (layout.x != null) {

                  this.modelMatrix.setX(layout.x);

                }
                if (layout.y != null) {

                  this.modelMatrix.setY(layout.y);

                }
                if (layout.center_x != null) {

                  this.modelMatrix.centerX(layout.center_x);

                }
                if (layout.center_y != null) {

                  this.modelMatrix.centerY(layout.center_y);

                }
                if (layout.top != null) {

                  this.modelMatrix.top(layout.top);

                }
                if (layout.bottom != null) {

                  this.modelMatrix.bottom(layout.bottom);

                }
                if (layout.left != null) {

                  this.modelMatrix.left(layout.left);

                }
                if (layout.right != null) {

                  this.modelMatrix.right(layout.right);

                }

              }
              for (const j in this.modelSetting.getInitParam()) {

                this.live2DModel.setParamFloat(this.modelSetting.getInitParamID(j), this.modelSetting.getInitParamValue(j));

              }
              for (const j in this.modelSetting.getInitPartsVisible()) {

                this.live2DModel.setPartsOpacity(this.modelSetting.getInitPartsVisibleID(j), this.modelSetting.getInitPartsVisibleValue(j));

              }
              this.live2DModel.saveParam().setGL(this.storage.getWebGL());
              this.mainMotionManager.stopAllMotions();
              this.preloadMotionGroup('idle')
                .setUpdating(false)
                .setInitialized(true);
              resolve();

            });

          }

        });

      });

    });

  }

  /**
   * Release model.
   * Delete texture. Only operates WebGL buffer!
   * @return  {Function}  The instance function itself.
   */
  release () {

    for (const i in this.textures) {

      this.storage.getWebGL().deleteTextures(this.textures[i]);

    }
    return this;

  }

  /**
   * Preload motions.
   * @param   {String}  name  Name of motion group.
   * @return  {Function}      The instance function itself.
   */
  preloadMotionGroup (name) {

    for (const i in this.modelSetting.getMotion(name)) {

      const file = this.modelSetting.getMotionFile(name, i);
      this.loadMotion(name, file, this.modelHomeDir).then((motion) => {

        motion.setFadeIn(this.modelSetting.getMotionFadeIn(name, i));
        motion.setFadeOut(this.modelSetting.getMotionFadeOut(name, i));

      });

    }
    return this;

  }

  /**
   * Update Model.
   * @return  {Function}  The instance function itself.
   */
  update () {

    if (this.live2DModel === null) {

      if (this.storage.config.devLog) {

        console.log('live2d-widget: Failed to update.');

      }

    }
    const timeMSec = UtSystem.getUserTimeMSec() - this.startTimeMSec;
    const timeSec = timeMSec / 1000.0;
    const t = timeSec * 2 * Math.PI;
    if (this.mainMotionManager.isFinished()) {

      this.startRandomMotion('idle', this.storage.reactPriority.idle);

    }
    this.live2DModel.loadParam();
    const update = this.mainMotionManager.updateParam(this.live2DModel);
    if (!update) {

      if (this.eyeBlink != null) {

        this.eyeBlink.updateParam(this.live2DModel);

      }

    }
    this.live2DModel.saveParam();
    if (this.expressionManager != null && this.expressions != null && !this.expressionManager.isFinished()) {

      this.expressionManager.updateParam(this.live2DModel);

    }
    const paramFloatToAdd = [{
      'a': 'PARAM_ANGLE_X',
      'b': this.dragX * 30,
      'c': 1,
    },
    {
      'a': 'PARAM_ANGLE_Y',
      'b': this.dragY * 30,
      'c': 1,
    },
    {
      'a': 'PARAM_ANGLE_Z',
      'b': this.dragX * this.dragY * -30,
      'c': 1,
    },
    {
      'a': 'PARAM_BODY_ANGLE_X',
      'b': this.dragX * 10,
      'c': 1,
    },
    {
      'a': 'PARAM_EYE_BALL_X',
      'b': this.dragX,
      'c': 1,
    },
    {
      'a': 'PARAM_EYE_BALL_Y',
      'b': this.dragY,
      'c': 1,
    },
    {
      'a': 'PARAM_ANGLE_X',
      'b': Number(15 * Math.sin(t / 6.5345)),
      'c': 0.5,
    },
    {
      'a': 'PARAM_ANGLE_Y',
      'b': Number(8 * Math.sin(t / 3.5345)),
      'c': 0.5,
    },
    {
      'a': 'PARAM_ANGLE_Z',
      'b': Number(10 * Math.sin(t / 5.5345)),
      'c': 0.5,
    },
    {
      'a': 'PARAM_BODY_ANGLE_X',
      'b': Number(4 * Math.sin(t / 15.5345)),
      'c': 0.5,
    },
    {
      'a': 'PARAM_BREATH',
      'b': Number(0.5 + 0.5 * Math.sin(t / 3.2345)),
      'c': '1',
    }, ];
    for (const i in paramFloatToAdd) {

      this.live2DModel.addToParamFloat(paramFloatToAdd[i].a, paramFloatToAdd[i].b, paramFloatToAdd[i].c);

    }
    if (this.physics != null) {

      this.physics.updateParam(this.live2DModel);

    }
    if (this.lipSync != null) {

      this.live2DModel.setParamFloat('PARAM_MOUTH_OPEN_Y', this.lipSyncValue);

    }
    if (this.pose != null) {

      this.pose.updateParam(this.live2DModel);

    }
    this.live2DModel.update();
    return this;

  }

  /**
   * Set random expresions.
   * @return {Function} The instance function itself.
   */
  setRandomExpression () {

    const tmp = [];
    for (const name in this.expressions) {

      tmp.push(name);

    }
    const no = parseInt(Math.random() * tmp.length);
    this.setExpression(tmp[no]);
    return this;

  }

  /**
   * Start random motion
   * @param   {String}  name      Motion name.
   * @param   {Number}  priority  Priority.
   * @return  {Function}          The instance function itself.
   */
  startRandomMotion (name, priority) {

    const max = this.modelSetting.getMotionNum(name);
    const no = parseInt(Math.random() * max);
    this.startMotion(name, no, priority);
    return this;

  }

  /**
   * Start a motion.
   * @param   {String}  name      Motion name.
   * @param   {Number}  no        Motion no.
   * @param   {Number}  priority  Priority.
   * @return  {Function}          The instance function itself.
   */
  startMotion (name, no, priority) {

    if (this.storage.config.devLog) {

      console.log(`live2d-widget: Model.startMotion(${name}, ${no}, ${priority});`);

    }
    const motionName = this.modelSetting.getMotion(name)[no];
    if (motionName == null || motionName === '') {

      if (this.storage.config.devLog) {

        console.log('live2d-widget: Failed to motion.');

      }
      return;

    }
    if (priority === this.storage.reactPriority.force) {

      this.mainMotionManager.setReservePriority(priority);

    } else if (!this.mainMotionManager.reserveMotion(priority)) {

      if (this.storage.config.devLog) {

        console.log('live2d-widget: Motion is running.');

      }
      return;

    }
    let motion;
    if (this.motions[name] == null) {

      this.loadMotion(null, motionName, this.modelHomeDir).then((mtn) => {

        motion = mtn;
        this.setFadeInFadeOut(name, no, priority, motion);

      });

    } else {

      motion = this.motions[name];
      this.setFadeInFadeOut(name, no, priority, motion);

    }


  }

  /**
   * Set fade in and fade out
   * @param  {String}  name      Motion name.
   * @param  {Number}  no        Motion no.
   * @param  {Number}  priority  Priority.
   * @param  {Motion}  motion    Motion.
   * @return {Function}          The instance function itself.
   */
  setFadeInFadeOut (name, no, priority, motion) {

    const motionName = this.modelSetting.getMotion(name)[no];
    motion.setFadeIn(this.modelSetting.getMotionFadeIn(name, no))
      .setFadeOut(this.modelSetting.getMotionFadeOut(name, no));
    if (this.storage.config.devLog) {

      console.log(`live2d-widget: Start motion ${motionName}`);

    }
    if (this.modelSetting.getMotionSound(name, no) == null) {

      this.mainMotionManager.startMotionPrio(motion, priority);

    } else {

      const soundName = this.modelSetting.getMotionSound(name, no);
      if (this.storage.config.devLog) {

        console.log(`live2d-widget: Play sound ${soundName} with motion ${motionName}.`);

      }
      this.storage.getPFM().loadSound(soundName, this.modelHomeDir)
        .then((elem) => {

          this.mainMotionManager.startMotionPrio(motion, priority);
          elem.play();

        });

    }
    return this;

  }

  /**
   * Set motion.
   * @param  {String}  name  Motion name.
   * @return {Function}      The instance function itself.
   */
  setExpression (name) {

    const motion = this.expressions[name];
    if (this.storage.config.devLog) {

      console.log(`live2d-widget: Model.setExpression(${name});`);

    }
    this.expressionManager.startMotion(motion, false);
    return this;

  }

  /**
   * Draw.
   * @param   {MatrixStack}  matrixStack  A Matrix stack.
   * @return  {Function}                  The instance function itself.
   */
  draw (matrixStack) {

    if (this.live2DModel == null) {

      return;

    }
    matrixStack.push()
      .multMatrix(this.modelMatrix.getArray());
    this.tmpMatix = this.matrixStack.getMatrix();
    this.live2DModel.setMatirx(this.tmpMatrix)
      .draw();
    matrixStack.pop();
    return this;

  }

  /**
   * Test if hit.
   * @param   {Number}  id     Hit area id.
   * @param   {Number}  testX  X position.
   * @param   {Number}  testY  Y position.
   * @return  {Boolean}        If hitted.
   */
  hitTest (id, testX, testY) {

    for (const i in this.modelSetting.getHitArea) {

      if (id === this.modelSetting.getHitAreaName(i)) {

        const drawID = this.model.getHitAreaID(i);
        return this._hitTest(drawID, testX, testY);

      }

    }
    return false;

  }

}

if (process.env.NODE_ENV === 'development') {

  window.Model = Model;

}

export {
  Model, };
