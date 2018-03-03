import { Live2DFramework, L2DBaseModel, L2DEyeBlink } from './lib/Live2DFramework';
import { ModelSettingJson } from './utils/ModelSettingJson';
import { MatrixStack } from './utils/MatrixStack';
import { cDefine } from './cDefine';
import { UtSystem,/*
         UtDebug,
         LDTransform,
         LDGL,
         Live2D,
         Live2DModelWebGL,
         Live2DModelJS,
         Live2DMotion,
         MotionQueueManager,
         PhysicsHair,
         AMotion,
         PartsDataID,
         DrawDataID,
         BaseDataID,
         ParamID*/ } from './lib/live2d.core';
//============================================================
//============================================================
//  class cModel     extends L2DBaseModel
//============================================================
//============================================================
export function cModel()
{
  //L2DBaseModel.apply(this, arguments);
  L2DBaseModel.prototype.constructor.call(this);

  this.modelHomeDir = '';
  this.modelSetting = null;
  this.tmpMatrix = [];
}

cModel.prototype = new L2DBaseModel();


cModel.prototype.load = function(gl, modelSettingPath, callback)
{
  this.setUpdating(true);
  this.setInitialized(false);

  this.modelHomeDir = modelSettingPath.substring(0, modelSettingPath.lastIndexOf('/') + 1);

  this.modelSetting = new ModelSettingJson();

  var thisRef = this;

  this.modelSetting.loadModelSetting(modelSettingPath, function(){

    var path = thisRef.modelSetting.getModelFile();

    if (!/^http/.test(path)) {
      path = thisRef.modelHomeDir + path;
    }

    thisRef.loadModelData(path, function(model){

      for (var i = 0; i < thisRef.modelSetting.getTextureNum(); i++)
      {
        var texPaths = thisRef.modelSetting.getTextureFile(i);
        if (!/^http/.test(texPaths)) {
          texPaths = thisRef.modelHomeDir + texPaths;
        }

        thisRef.loadTexture(i, texPaths, function() {

          if( thisRef.isTexLoaded ) {

            if (thisRef.modelSetting.getExpressionNum() > 0)
            {

              thisRef.expressions = {};

              for (var j = 0; j < thisRef.modelSetting.getExpressionNum(); j++)
              {
                var expName = thisRef.modelSetting.getExpressionName(j);
                var expFilePath = thisRef.modelSetting.getExpressionFile(j);

                if (!/^http/.test(expFilePath)) {
                  expFilePath = thisRef.modelHomeDir + expFilePath;
                }

                thisRef.loadExpression(expName, expFilePath);
              }
            }
            else
            {
              thisRef.expressionManager = null;
              thisRef.expressions = {};
            }



            if (thisRef.eyeBlink == null)
            {
              thisRef.eyeBlink = new L2DEyeBlink();
            }


            if (thisRef.modelSetting.getPhysicsFile() != null)
            {
              var physicsPath = thisRef.modelSetting.getPhysicsFile();
              if (!/^http/.test(physicsPath)) {
                physicsPath = thisRef.modelHomeDir + physicsPath;
              }
              thisRef.loadPhysics(physicsPath);
            }
            else
            {
              thisRef.physics = null;
            }

            var poseFile = thisRef.modelSetting.getPoseFile();
            if (poseFile != null)
            {
              thisRef.loadPose(/^http/.test(poseFile) ? poseFile : thisRef.modelHomeDir + poseFile,
                function() {
                  thisRef.pose.updateParam(thisRef.live2DModel);
                }
              );
            }
            else
            {
              thisRef.pose = null;
            }



            if (thisRef.modelSetting.getLayout() != null)
            {
              var layout = thisRef.modelSetting.getLayout();
              if (layout['width'] != null)
                thisRef.modelMatrix.setWidth(layout['width']);
              if (layout['height'] != null)
                thisRef.modelMatrix.setHeight(layout['height']);

              if (layout['x'] != null)
                thisRef.modelMatrix.setX(layout['x']);
              if (layout['y'] != null)
                thisRef.modelMatrix.setY(layout['y']);
              if (layout['center_x'] != null)
                thisRef.modelMatrix.centerX(layout['center_x']);
              if (layout['center_y'] != null)
                thisRef.modelMatrix.centerY(layout['center_y']);
              if (layout['top'] != null)
                thisRef.modelMatrix.top(layout['top']);
              if (layout['bottom'] != null)
                thisRef.modelMatrix.bottom(layout['bottom']);
              if (layout['left'] != null)
                thisRef.modelMatrix.left(layout['left']);
              if (layout['right'] != null)
                thisRef.modelMatrix.right(layout['right']);
            }

            for (var j = 0; j < thisRef.modelSetting.getInitParamNum(); j++)
            {

              thisRef.live2DModel.setParamFloat(
                thisRef.modelSetting.getInitParamID(j),
                thisRef.modelSetting.getInitParamValue(j)
              );
            }

            for (var j = 0; j < thisRef.modelSetting.getInitPartsVisibleNum(); j++)
            {

              thisRef.live2DModel.setPartsOpacity(
                thisRef.modelSetting.getInitPartsVisibleID(j),
                thisRef.modelSetting.getInitPartsVisibleValue(j)
              );
            }



            thisRef.live2DModel.saveParam();
            // thisRef.live2DModel.setGL(gl);


            thisRef.preloadMotionGroup(cDefine.MOTION_GROUP_IDLE);
            thisRef.mainMotionManager.stopAllMotions();

            thisRef.setUpdating(false);
            thisRef.setInitialized(true);

            if (typeof callback == 'function') callback();

          }
        });
      }
    });
  });
};



cModel.prototype.release = function(gl)
{
  // this.live2DModel.deleteTextures();
  var pm = Live2DFramework.getPlatformManager();

  gl.deleteTexture(pm.texture);
};



cModel.prototype.preloadMotionGroup = function(name)
{
  var thisRef = this;

  for (var i = 0; i < this.modelSetting.getMotionNum(name); i++)
  {
    var file = this.modelSetting.getMotionFile(name, i);
    var path = /^http/.test(file) ? file : this.modelHomeDir + file;
    this.loadMotion(file, path, function(motion) {
      motion.setFadeIn(thisRef.modelSetting.getMotionFadeIn(name, i));
      motion.setFadeOut(thisRef.modelSetting.getMotionFadeOut(name, i));
    });

  }
};


cModel.prototype.update = function()
{
  // console.log("--> cModel.update()");

  if(this.live2DModel == null)
  {
    if (cDefine.DEBUG_LOG) console.error('Failed to update.');

    return;
  }

  var timeMSec = UtSystem.getUserTimeMSec() - this.startTimeMSec;
  var timeSec = timeMSec / 1000.0;
  var t = timeSec * 2 * Math.PI;


  if (this.mainMotionManager.isFinished())
  {

<<<<<<< HEAD
    this.startRandomMotion(cDefine.MOTION_GROUP_IDLE, cDefine.PRIORITY_IDLE);
  }
=======
        this.startRandomMotion('idle', config.reactPriorityIdle);
    }
>>>>>>> 1bb9ee5... fix: bugs

  //-----------------------------------------------------------------


  this.live2DModel.loadParam();



  var update = this.mainMotionManager.updateParam(this.live2DModel);
  if (!update) {

    if(this.eyeBlink != null) {
      this.eyeBlink.updateParam(this.live2DModel);
    }
  }


  this.live2DModel.saveParam();

  //-----------------------------------------------------------------


  if (this.expressionManager != null &&
        this.expressions != null &&
        !this.expressionManager.isFinished())
  {
    this.expressionManager.updateParam(this.live2DModel);
  }



  this.live2DModel.addToParamFloat('PARAM_ANGLE_X', this.dragX * 30, 1);
  this.live2DModel.addToParamFloat('PARAM_ANGLE_Y', this.dragY * 30, 1);
  this.live2DModel.addToParamFloat('PARAM_ANGLE_Z', (this.dragX * this.dragY) * -30, 1);



  this.live2DModel.addToParamFloat('PARAM_BODY_ANGLE_X', this.dragX*10, 1);



  this.live2DModel.addToParamFloat('PARAM_EYE_BALL_X', this.dragX, 1);
  this.live2DModel.addToParamFloat('PARAM_EYE_BALL_Y', this.dragY, 1);



  this.live2DModel.addToParamFloat('PARAM_ANGLE_X',
    Number((15 * Math.sin(t / 6.5345))), 0.5);
  this.live2DModel.addToParamFloat('PARAM_ANGLE_Y',
    Number((8 * Math.sin(t / 3.5345))), 0.5);
  this.live2DModel.addToParamFloat('PARAM_ANGLE_Z',
    Number((10 * Math.sin(t / 5.5345))), 0.5);
  this.live2DModel.addToParamFloat('PARAM_BODY_ANGLE_X',
    Number((4 * Math.sin(t / 15.5345))), 0.5);
  this.live2DModel.setParamFloat('PARAM_BREATH',
    Number((0.5 + 0.5 * Math.sin(t / 3.2345))), 1);


  if (this.physics != null)
  {
    this.physics.updateParam(this.live2DModel);
  }


  if (this.lipSync == null)
  {
    this.live2DModel.setParamFloat('PARAM_MOUTH_OPEN_Y',
      this.lipSyncValue);
  }


  if( this.pose != null ) {
    this.pose.updateParam(this.live2DModel);
  }

  this.live2DModel.update();
};



cModel.prototype.setRandomExpression = function()
{
  var tmp = [];
  for (var name in this.expressions)
  {
    tmp.push(name);
  }

  var no = parseInt(Math.random() * tmp.length);

  this.setExpression(tmp[no]);
};



cModel.prototype.startRandomMotion = function(name, priority)
{
  var max = this.modelSetting.getMotionNum(name);
  var no = parseInt(Math.random() * max);
  this.startMotion(name, no, priority);
};



cModel.prototype.startMotion = function(name, no, priority)
{
  // console.log("startMotion : " + name + " " + no + " " + priority);

  var motionName = this.modelSetting.getMotionFile(name, no);

  if (motionName == null || motionName == '')
  {
    if (cDefine.DEBUG_LOG)
      console.error('Failed to motion.');
    return;
  }

  if (priority == cDefine.PRIORITY_FORCE)
  {
    this.mainMotionManager.setReservePriority(priority);
  }
  else if (!this.mainMotionManager.reserveMotion(priority))
  {
    if (cDefine.DEBUG_LOG)
      console.log('Motion is running.');
    return;
  }

<<<<<<< HEAD
  var thisRef = this;
  var motion;
=======
    if (priority == config.reactPriorityForce)
    {
        this.mainMotionManager.setReservePriority(priority);
    }
    else if (!this.mainMotionManager.reserveMotion(priority))
    {
        if (cDefine.DEBUG_LOG)
            console.log("Motion is running.")
        return;
    }
>>>>>>> 1bb9ee5... fix: bugs

  if (this.motions[name] == null)
  {

    motionName = /^http/.test(motionName) ? motionName : this.modelHomeDir + motionName;
    this.loadMotion(null, motionName, function(mtn) {
      motion = mtn;


      thisRef.setFadeInFadeOut(name, no, priority, motion);

    });
  }
  else
  {
    motion = this.motions[name];


    thisRef.setFadeInFadeOut(name, no, priority, motion);
  }
};


cModel.prototype.setFadeInFadeOut = function(name, no, priority, motion)
{
  var motionName = this.modelSetting.getMotionFile(name, no);

  motion.setFadeIn(this.modelSetting.getMotionFadeIn(name, no));
  motion.setFadeOut(this.modelSetting.getMotionFadeOut(name, no));


  if (cDefine.DEBUG_LOG)
    console.log('Start motion : ' + motionName);

  if (this.modelSetting.getMotionSound(name, no) == null)
  {
    this.mainMotionManager.startMotionPrio(motion, priority);
  }
  else
  {
    var soundName = this.modelSetting.getMotionSound(name, no);
    // var player = new Sound(this.modelHomeDir + soundName);

    var snd = document.createElement('audio');
    snd.src = /^http/.test(soundName) ? soundName : this.modelHomeDir + soundName;


    if (cDefine.DEBUG_LOG)
      console.log('Start sound : ' + soundName);

    snd.play();
    this.mainMotionManager.startMotionPrio(motion, priority);
  }
};



cModel.prototype.setExpression = function(name)
{
  var motion = this.expressions[name];

  if (cDefine.DEBUG_LOG)
    console.log('Expression : ' + name);

  this.expressionManager.startMotion(motion, false);
};



cModel.prototype.draw = function(gl)
{
  //console.log("--> cModel.draw()");

  // if(this.live2DModel == null) return;


  MatrixStack.push();

  MatrixStack.multMatrix(this.modelMatrix.getArray());

  this.tmpMatrix = MatrixStack.getMatrix();
  this.live2DModel.setMatrix(this.tmpMatrix);
  this.live2DModel.draw();

  MatrixStack.pop();

};



cModel.prototype.hitTest = function(id, testX, testY)
{
  var len = this.modelSetting.getHitAreaNum();
  for (var i = 0; i < len; i++)
  {
    if (id == this.modelSetting.getHitAreaName(i))
    {
      var drawID = this.modelSetting.getHitAreaID(i);

      return this.hitTestSimple(drawID, testX, testY);
    }
  }

  return false;
};
