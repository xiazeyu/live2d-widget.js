import {Live2DFramework, L2DBaseModel, L2DEyeBlink,} from './lib/Live2DFramework';
import {ModelSettingJson,} from './utils/ModelSettingJson';
import {MatrixStack,} from './utils/MatrixStack';
import {cDefine,} from './cDefine';
import {getPathFromUrl} from './utils/getPathFromUrl';

// ============================================================
// ============================================================
//  Class cModel     extends L2DBaseModel
// ============================================================
// ============================================================

export function cModel () {

  // L2DBaseModel.apply(this, arguments);
  L2DBaseModel.prototype.constructor.call(this);

  this.modelSetting = null;
  this.tmpMatrix = [];
  this.modelHomeDir = null;

}

cModel.prototype = new L2DBaseModel();


cModel.prototype.load = function (gl, modelSettingPath, callback) {

  this.setUpdating(true);
  this.setInitialized(false);

  this.modelHomeDir = getPathFromUrl(modelSettingPath);

  this.modelSetting = new ModelSettingJson();

  const thisRef = this;

  this.modelSetting.loadModelSetting(modelSettingPath, function () {

    const path = thisRef.modelSetting.getModelFile();
    thisRef.loadModelData(path, homeDir, function (model) {

      for (let i = 0; i < thisRef.modelSetting.getTextureNum(); i++) {

          const texPaths = thisRef.modelSetting.getTextureFile(i);

        thisRef.loadTexture(i, texPaths, homeDir, function () {

          if(thisRef.isTexLoaded) {

            if (thisRef.modelSetting.getExpressionNum() > 0) {

              thisRef.expressions = {};

              for (var j = 0; j < thisRef.modelSetting.getExpressionNum(); j++) {

                const expName = thisRef.modelSetting.getExpressionName(j);
                const expFilePath = thisRef.modelSetting.getExpressionFile(j);

                thisRef.loadExpression(expName, expFilePath, homeDir);

              }

            } else {

              thisRef.expressionManager = null;
              thisRef.expressions = {};

            }



            if (thisRef.eyeBlink == null) {

              thisRef.eyeBlink = new L2DEyeBlink();

            }


            if (thisRef.modelSetting.getPhysicsFile() != null) {

              thisRef.loadPhysics(thisRef.modelSetting.getPhysicsFile(), homeDir);

            } else {

              thisRef.physics = null;

            }



            if (thisRef.modelSetting.getPoseFile() != null) {

              thisRef.loadPose(thisRef.modelSetting.getPoseFile(), homeDir,
                function () {

                  thisRef.pose.updateParam(thisRef.live2DModel);

                }
              );

            } else {

              thisRef.pose = null;

            }



            if (thisRef.modelSetting.getLayout() != null) {

              const layout = thisRef.modelSetting.getLayout();
              if (layout.width != null) {

                thisRef.modelMatrix.setWidth(layout.width);

              }
              if (layout.height != null) {

                thisRef.modelMatrix.setHeight(layout.height);

              }

              if (layout.x != null) {

                thisRef.modelMatrix.setX(layout.x);

              }
              if (layout.y != null) {

                thisRef.modelMatrix.setY(layout.y);

              }
              if (layout.center_x != null) {

                thisRef.modelMatrix.centerX(layout.center_x);

              }
              if (layout.center_y != null) {

                thisRef.modelMatrix.centerY(layout.center_y);

              }
              if (layout.top != null) {

                thisRef.modelMatrix.top(layout.top);

              }
              if (layout.bottom != null) {

                thisRef.modelMatrix.bottom(layout.bottom);

              }
              if (layout.left != null) {

                thisRef.modelMatrix.left(layout.left);

              }
              if (layout.right != null) {

                thisRef.modelMatrix.right(layout.right);

              }

            }

            for (var j = 0; j < thisRef.modelSetting.getInitParamNum(); j++) {

              thisRef.live2DModel.setParamFloat(
                thisRef.modelSetting.getInitParamID(j),
                thisRef.modelSetting.getInitParamValue(j)
              );

            }

            for (var j = 0; j < thisRef.modelSetting.getInitPartsVisibleNum(); j++) {

              thisRef.live2DModel.setPartsOpacity(
                thisRef.modelSetting.getInitPartsVisibleID(j),
                thisRef.modelSetting.getInitPartsVisibleValue(j)
              );

            }



            thisRef.live2DModel.saveParam();
            // ThisRef.live2DModel.setGL(gl);


            thisRef.preloadMotionGroup('idle');
            thisRef.mainMotionManager.stopAllMotions();

            thisRef.setUpdating(false);
            thisRef.setInitialized(true);

            if (typeof callback === 'function') {

              callback();

            }

          }

        });

      }

    });

  });

};



cModel.prototype.release = function (gl) {

  // This.live2DModel.deleteTextures();
  const pm = Live2DFramework.getPlatformManager();

  gl.deleteTexture(pm.texture);

};



cModel.prototype.preloadMotionGroup = function (name) {

  const thisRef = this;

  for (var i = 0; i < this.modelSetting.getMotionNum(name); i++) {

    const file = this.modelSetting.getMotionFile(name, i);
    this.loadMotion(file, file,this.modelHomeDir, function (motion) {

      motion.setFadeIn(thisRef.modelSetting.getMotionFadeIn(name, i));
      motion.setFadeOut(thisRef.modelSetting.getMotionFadeOut(name, i));

    });

  }

};


cModel.prototype.update = function () {

  // Console.log("--> cModel.update()");

  if(this.live2DModel == null) {

    if (cDefine.DEBUG_LOG) {

      console.error('Failed to update.');

    }

    return;

  }

  const timeMSec = UtSystem.getUserTimeMSec() - this.startTimeMSec;
  const timeSec = timeMSec / 1000.0;
  const t = timeSec * 2 * Math.PI;


  if (this.mainMotionManager.isFinished()) {

    this.startRandomMotion('idle', config.reactPriorityIdle);

  }

  // -----------------------------------------------------------------


  this.live2DModel.loadParam();



  const update = this.mainMotionManager.updateParam(this.live2DModel);
  if (!update) {

    if(this.eyeBlink != null) {

      this.eyeBlink.updateParam(this.live2DModel);

    }

  }


  this.live2DModel.saveParam();

  // -----------------------------------------------------------------


  if (this.expressionManager != null &&
        this.expressions != null &&
        !this.expressionManager.isFinished()) {

    this.expressionManager.updateParam(this.live2DModel);

  }



  this.live2DModel.addToParamFloat('PARAM_ANGLE_X', this.dragX * 30, 1);
  this.live2DModel.addToParamFloat('PARAM_ANGLE_Y', this.dragY * 30, 1);
  this.live2DModel.addToParamFloat('PARAM_ANGLE_Z', this.dragX * this.dragY * -30, 1);



  this.live2DModel.addToParamFloat('PARAM_BODY_ANGLE_X', this.dragX * 10, 1);



  this.live2DModel.addToParamFloat('PARAM_EYE_BALL_X', this.dragX, 1);
  this.live2DModel.addToParamFloat('PARAM_EYE_BALL_Y', this.dragY, 1);



  this.live2DModel.addToParamFloat('PARAM_ANGLE_X',
    Number(15 * Math.sin(t / 6.5345)), 0.5);
  this.live2DModel.addToParamFloat('PARAM_ANGLE_Y',
    Number(8 * Math.sin(t / 3.5345)), 0.5);
  this.live2DModel.addToParamFloat('PARAM_ANGLE_Z',
    Number(10 * Math.sin(t / 5.5345)), 0.5);
  this.live2DModel.addToParamFloat('PARAM_BODY_ANGLE_X',
    Number(4 * Math.sin(t / 15.5345)), 0.5);
  this.live2DModel.setParamFloat('PARAM_BREATH',
    Number(0.5 + 0.5 * Math.sin(t / 3.2345)), 1);


  if (this.physics != null) {

    this.physics.updateParam(this.live2DModel);

  }


  if (this.lipSync == null) {

    this.live2DModel.setParamFloat('PARAM_MOUTH_OPEN_Y',
      this.lipSyncValue);

  }


  if(this.pose != null) {

    this.pose.updateParam(this.live2DModel);

  }

  this.live2DModel.update();

};



cModel.prototype.setRandomExpression = function () {

  const tmp = [];
  for (const name in this.expressions) {

    tmp.push(name);

  }

  const no = parseInt(Math.random() * tmp.length);

  this.setExpression(tmp[no]);

};



cModel.prototype.startRandomMotion = function (name, priority) {

  const max = this.modelSetting.getMotionNum(name);
  const no = parseInt(Math.random() * max);
  this.startMotion(name, no, priority);

};



cModel.prototype.startMotion = function (name, no, priority) {

  // Console.log("startMotion : " + name + " " + no + " " + priority);

  const motionName = this.modelSetting.getMotionFile(name, no);

  if (motionName == null || motionName == '') {

    if (cDefine.DEBUG_LOG) {

      console.error('Failed to motion.');

    }
    return;

  }

  if (priority == config.reactPriorityForce) {

    this.mainMotionManager.setReservePriority(priority);

  } else if (!this.mainMotionManager.reserveMotion(priority)) {

    if (cDefine.DEBUG_LOG) {

      console.log('Motion is running.');

    }
    return;

  }

  const thisRef = this;
  let motion;

  if (this.motions[name] == null) {

    this.loadMotion(null, motionName, this.modelHomeDir,function (mtn) {

      motion = mtn;


      thisRef.setFadeInFadeOut(name, no, priority, motion);

    });

  } else {

    motion = this.motions[name];


    thisRef.setFadeInFadeOut(name, no, priority, motion);

  }

};


cModel.prototype.setFadeInFadeOut = function (name, no, priority, motion) {

  const motionName = this.modelSetting.getMotionFile(name, no);

  motion.setFadeIn(this.modelSetting.getMotionFadeIn(name, no));
  motion.setFadeOut(this.modelSetting.getMotionFadeOut(name, no));


  if (cDefine.DEBUG_LOG) {

    console.log(`Start motion : ${ motionName}`);

  }

  if (this.modelSetting.getMotionSound(name, no) == null) {

    this.mainMotionManager.startMotionPrio(motion, priority);

  } else {

    const soundName = this.modelSetting.getMotionSound(name, no);


    if (cDefine.DEBUG_LOG) {

      console.log(`Start sound : ${ soundName}`);

    }
    pmf.loadSound(soundName, this.modelHomeDir).then((elem) => {

      this.mainMotionManager.startMotionPrio(motion, priority);
      snd.play();
    });

  }

};



cModel.prototype.setExpression = function (name) {

  const motion = this.expressions[name];

  if (cDefine.DEBUG_LOG) {

    console.log(`Expression : ${ name}`);

  }

  this.expressionManager.startMotion(motion, false);

};



cModel.prototype.draw = function (gl) {

  // Console.log("--> cModel.draw()");

  // If(this.live2DModel == null) return;


  MatrixStack.push();

  MatrixStack.multMatrix(this.modelMatrix.getArray());

  this.tmpMatrix = MatrixStack.getMatrix();
  this.live2DModel.setMatrix(this.tmpMatrix);
  this.live2DModel.draw();

  MatrixStack.pop();

};



cModel.prototype.hitTest = function (id, testX, testY) {

  const len = this.modelSetting.getHitAreaNum();
  for (let i = 0; i < len; i++) {

    if (id == this.modelSetting.getHitAreaName(i)) {

      const drawID = this.modelSetting.getHitAreaID(i);

      return this.hitTestSimple(drawID, testX, testY);

    }

  }

  return false;

};
