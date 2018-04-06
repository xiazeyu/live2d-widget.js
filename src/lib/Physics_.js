
//============================================================
//============================================================
//  class L2DPhysics
//============================================================
//============================================================
function L2DPhysics() {
    this.physicsList = new Array(); //ArrayList<PhysicsHair>
    this.startTimeMSec = UtSystem.getUserTimeMSec();
}

//============================================================
//    static L2DPhysics.load()
//============================================================
L2DPhysics.load = function (buf /*byte[]*/) {
    var ret = new L2DPhysics(); //L2DPhysicsL2DPhysics
    var pm = Live2DFramework.getPlatformManager();
    var json = pm.jsonParseFromBytes(buf);
    var params = json.physics_hair;
    var paramNum = params.length;
    for (var i = 0; i < paramNum; i++) {
        var param = params[i]; //Value
        var physics = new PhysicsHair(); //PhysicsHairPhysicsHair
        var setup = param.setup; //Value
        var length = parseFloat(setup.length);
        var resist = parseFloat(setup.regist);
        var mass = parseFloat(setup.mass);
        physics.setup(length, resist, mass);
        var srcList = param.src; //Value
        var srcNum = srcList.length;
        for (var j = 0; j < srcNum; j++) {
            var src = srcList[j]; //Value
            var id = src.id; //String
            var type = PhysicsHair.Src.SRC_TO_X;
            var typeStr = src.ptype; //String
            if (typeStr === "x") {
                type = PhysicsHair.Src.SRC_TO_X;
            }
            else if (typeStr === "y") {
                type = PhysicsHair.Src.SRC_TO_Y;
            }
            else if (typeStr === "angle") {
                type = PhysicsHair.Src.SRC_TO_G_ANGLE;
            }
            else {
                UtDebug.error("live2d", "Invalid parameter:PhysicsHair.Src");
            }
            var scale = parseFloat(src.scale);
            var weight = parseFloat(src.weight);
            physics.addSrcParam(type, id, scale, weight);
        }
        var targetList = param.targets; //Value
        var targetNum = targetList.length;
        for (var j = 0; j < targetNum; j++) {
            var target = targetList[j]; //Value
            var id = target.id; //String
            var type = PhysicsHair.Target.TARGET_FROM_ANGLE;
            var typeStr = target.ptype; //String
            if (typeStr === "angle") {
                type = PhysicsHair.Target.TARGET_FROM_ANGLE;
            }
            else if (typeStr === "angle_v") {
                type = PhysicsHair.Target.TARGET_FROM_ANGLE_V;
            }
            else {
                UtDebug.error("live2d", "Invalid parameter:PhysicsHair.Target");
            }
            var scale = parseFloat(target.scale);
            var weight = parseFloat(target.weight);
            physics.addTargetParam(type, id, scale, weight);
        }
        ret.physicsList.push(physics);
    }
    return ret;
}

//============================================================
//    L2DPhysics # updateParam()
//============================================================
L2DPhysics.prototype.updateParam = function (model/*ALive2DModel*/) {
    var timeMSec = UtSystem.getUserTimeMSec() - this.startTimeMSec;
    for (var i = 0; i < this.physicsList.length; i++) {
        this.physicsList[i].update(model, timeMSec);
    }
}
