//============================================================
//============================================================
//  class L2DBaseModel
//============================================================
//============================================================
function L2DBaseModel() {
    this.live2DModel = null; // ALive2DModel
    this.modelMatrix = null; // L2DModelMatrix
    this.eyeBlink = null; // L2DEyeBlink
    this.physics = null; // L2DPhysics
    this.pose = null; // L2DPose
    this.debugMode = false;
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
    this.mainMotionManager = new L2DMotionManager(); //L2DMotionManager
    this.expressionManager = new L2DMotionManager(); //L2DMotionManager
    this.motions = {};
    this.expressions = {};
    this.isTexLoaded = false;
}

var texCounter = 0;

//============================================================
//    L2DBaseModel # getModelMatrix()
//============================================================
L2DBaseModel.prototype.getModelMatrix = function () {
    return this.modelMatrix;
}

//============================================================
//    L2DBaseModel # setAlpha()
//============================================================
L2DBaseModel.prototype.setAlpha = function (a/*float*/) {
    if (a > 0.999) a = 1;
    if (a < 0.001) a = 0;
    this.alpha = a;
}

//============================================================
//    L2DBaseModel # getAlpha()
//============================================================
L2DBaseModel.prototype.getAlpha = function () {
    return this.alpha;
}

//============================================================
//    L2DBaseModel # isInitialized()
//============================================================
L2DBaseModel.prototype.isInitialized = function () {
    return this.initialized;
}

//============================================================
//    L2DBaseModel # setInitialized()
//============================================================
L2DBaseModel.prototype.setInitialized = function (v/*boolean*/) {
    this.initialized = v;
}

//============================================================
//    L2DBaseModel # isUpdating()
//============================================================
L2DBaseModel.prototype.isUpdating = function () {
    return this.updating;
}

//============================================================
//    L2DBaseModel # setUpdating()
//============================================================
L2DBaseModel.prototype.setUpdating = function (v/*boolean*/) {
    this.updating = v;
}

//============================================================
//    L2DBaseModel # getLive2DModel()
//============================================================
L2DBaseModel.prototype.getLive2DModel = function () {
    return this.live2DModel;
}

//============================================================
//    L2DBaseModel # setLipSync()
//============================================================
L2DBaseModel.prototype.setLipSync = function (v/*boolean*/) {
    this.lipSync = v;
}

//============================================================
//    L2DBaseModel # setLipSyncValue()
//============================================================
L2DBaseModel.prototype.setLipSyncValue = function (v/*float*/) {
    this.lipSyncValue = v;
}

//============================================================
//    L2DBaseModel # setAccel()
//============================================================
L2DBaseModel.prototype.setAccel = function (x/*float*/, y/*float*/, z/*float*/) {
    this.accelX = x;
    this.accelY = y;
    this.accelZ = z;
}

//============================================================
//    L2DBaseModel # setDrag()
//============================================================
L2DBaseModel.prototype.setDrag = function (x/*float*/, y/*float*/) {
    this.dragX = x;
    this.dragY = y;
}

//============================================================
//    L2DBaseModel # getMainMotionManager()
//============================================================
L2DBaseModel.prototype.getMainMotionManager = function () {
    return this.mainMotionManager;
}

//============================================================
//    L2DBaseModel # getExpressionManager()
//============================================================
L2DBaseModel.prototype.getExpressionManager = function () {
    return this.expressionManager;
}

//============================================================
//    L2DBaseModel # loadModelData()
//============================================================
L2DBaseModel.prototype.loadModelData = function (path/*String*/, callback) {
    /*
    if( this.live2DModel != null ) {
        this.live2DModel.deleteTextures();
    }
    */
    var pm = Live2DFramework.getPlatformManager(); //IPlatformManager
    if (this.debugMode) pm.log("Load model : " + path);

    var thisRef = this;
    pm.loadLive2DModel(path, function (l2dModel) {
        thisRef.live2DModel = l2dModel;
        thisRef.live2DModel.saveParam();

        var _err = Live2D.getError();

        if (_err != 0) {
            console.error("Error : Failed to loadModelData().");
            return;
        }

        thisRef.modelMatrix = new L2DModelMatrix(
            thisRef.live2DModel.getCanvasWidth(),
            thisRef.live2DModel.getCanvasHeight()); //L2DModelMatrix
        thisRef.modelMatrix.setWidth(2);
        thisRef.modelMatrix.setCenterPosition(0, 0);

        callback(thisRef.live2DModel);
    });
}


//============================================================
//    L2DBaseModel # loadTexture()
//============================================================
L2DBaseModel.prototype.loadTexture = function (no/*int*/, path/*String*/, homeDir, callback) {
    texCounter++;

    var pm = Live2DFramework.getPlatformManager(); //IPlatformManager

    if (this.debugMode) pm.log("Load Texture : " + path);

    var thisRef = this;
    pm.loadTexture(this.live2DModel, no, path, homeDir, function () {
        texCounter--;
        if (texCounter == 0) thisRef.isTexLoaded = true;
        if (typeof callback == "function") callback();
    });

}

//============================================================
//    L2DBaseModel # loadMotion()
//============================================================
L2DBaseModel.prototype.loadMotion = function (name/*String*/, path /*String*/,homeDir, callback) {
    var pm = Live2DFramework.getPlatformManager(); //IPlatformManager

    if (this.debugMode) pm.log("Load Motion : " + path);

    var motion = null; //Live2DMotion

    var thisRef = this;
    pm.loadBytes(path, homeDir, function (buf) {
        motion = Live2DMotion.loadMotion(buf);
        if (name != null) {
            thisRef.motions[name] = motion;
        }
        callback(motion);
    });

}

//============================================================
//    L2DBaseModel # loadExpression()
//============================================================
L2DBaseModel.prototype.loadExpression = function (name/*String*/, path /*String*/, homeDir, callback) {
    var pm = Live2DFramework.getPlatformManager(); //IPlatformManager

    if (this.debugMode) pm.log("Load Expression : " + path);

    var thisRef = this;
    pm.loadBytes(path, homeDir, function (buf) {
        if (name != null) {
            thisRef.expressions[name] = L2DExpressionMotion.loadJson(buf);
        }
        if (typeof callback == "function") callback();
    });
}

//============================================================
//    L2DBaseModel # loadPose()
//============================================================
L2DBaseModel.prototype.loadPose = function (path /*String*/, homeDir, callback) {
    var pm = Live2DFramework.getPlatformManager(); //IPlatformManager
    if (this.debugMode) pm.log("Load Pose : " + path);
    var thisRef = this;
    try {
        pm.loadBytes(path, homeDir, function (buf) {
            thisRef.pose = L2DPose.load(buf);
            if (typeof callback == "function") callback();
        });
    }
    catch (e) {
        console.warn(e);
    }
}

//============================================================
//    L2DBaseModel # loadPhysics()
//============================================================
L2DBaseModel.prototype.loadPhysics = function (path/*String*/, homeDir) {
    var pm = Live2DFramework.getPlatformManager(); //IPlatformManager
    if (this.debugMode) pm.log("Load Physics : " + path);
    var thisRef = this;
    try {
        pm.loadBytes(path, homeDir, function (buf) {
            thisRef.physics = L2DPhysics.load(buf);
        });
    }
    catch (e) {
        console.warn(e);
    }
}

//============================================================
//    L2DBaseModel # hitTestSimple()
//============================================================
L2DBaseModel.prototype.hitTestSimple = function (drawID, testX, testY) {

  if(this.live2DModel === null) return !1;

    var drawIndex = this.live2DModel.getDrawDataIndex(drawID);

    if (drawIndex < 0) return false;

    var points = this.live2DModel.getTransformedPoints(drawIndex);
    var left = this.live2DModel.getCanvasWidth();
    var right = 0;
    var top = this.live2DModel.getCanvasHeight();
    var bottom = 0;

    for (var j = 0; j < points.length; j = j + 2) {
        var x = points[j];
        var y = points[j + 1];

        if (x < left) left = x;
        if (x > right) right = x;
        if (y < top) top = y;
        if (y > bottom) bottom = y;
    }
    var tx = this.modelMatrix.invertTransformX(testX);
    var ty = this.modelMatrix.invertTransformY(testY);

    return (left <= tx && tx <= right && top <= ty && ty <= bottom);
}
