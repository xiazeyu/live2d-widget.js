
//============================================================
//============================================================
//  class L2DMotionManager     extends     MotionQueueManager
//============================================================
//============================================================
function L2DMotionManager() {
    MotionQueueManager.prototype.constructor.call(this);
    this.currentPriority = null;
    this.reservePriority = null;

    this.super = MotionQueueManager.prototype;
}


L2DMotionManager.prototype = new MotionQueueManager();

//============================================================
//    L2DMotionManager # getCurrentPriority()
//============================================================
L2DMotionManager.prototype.getCurrentPriority = function () {
    return this.currentPriority;
}

//============================================================
//    L2DMotionManager # getReservePriority()
//============================================================
L2DMotionManager.prototype.getReservePriority = function () {
    return this.reservePriority;
}

//============================================================
//    L2DMotionManager # reserveMotion()
//============================================================
L2DMotionManager.prototype.reserveMotion = function (priority/*int*/) {
    if (this.reservePriority >= priority) {
        return false;
    }
    if (this.currentPriority >= priority) {
        return false;
    }

    this.reservePriority = priority;

    return true;
}

//============================================================
//    L2DMotionManager # setReservePriority()
//============================================================
L2DMotionManager.prototype.setReservePriority = function (val/*int*/) {
    this.reservePriority = val;
}

//============================================================
//    L2DMotionManager # updateParam()
//============================================================
L2DMotionManager.prototype.updateParam = function (model/*ALive2DModel*/) {
    var updated = MotionQueueManager.prototype.updateParam.call(this, model);

    if (this.isFinished()) {
        this.currentPriority = 0;
    }

    return updated;
}

//============================================================
//    L2DMotionManager # startMotionPrio()
//============================================================
L2DMotionManager.prototype.startMotionPrio = function (motion/*AMotion*/, priority/*int*/) {
    if (priority == this.reservePriority) {
        this.reservePriority = 0;
    }
    this.currentPriority = priority;
    return this.startMotion(motion, false);
}
