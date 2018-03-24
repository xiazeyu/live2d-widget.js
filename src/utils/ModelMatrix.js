
//============================================================
//============================================================
//  class L2DModelMatrix       extends     L2DMatrix44
//============================================================
//============================================================
function L2DModelMatrix(w/*float*/, h/*float*/) {
    L2DMatrix44.prototype.constructor.call(this);
    this.width = w;
    this.height = h;
}

//L2DModelMatrix extends L2DMatrix44
L2DModelMatrix.prototype = new L2DMatrix44();

//============================================================
//    L2DModelMatrix # setPosition()
//============================================================
L2DModelMatrix.prototype.setPosition = function (x/*float*/, y/*float*/) {
    this.translate(x, y);
}

//============================================================
//    L2DModelMatrix # setCenterPosition()
//============================================================
L2DModelMatrix.prototype.setCenterPosition = function (x/*float*/, y/*float*/) {
    var w = this.width * this.getScaleX();
    var h = this.height * this.getScaleY();
    this.translate(x - w / 2, y - h / 2);
}

//============================================================
//    L2DModelMatrix # top()
//============================================================
L2DModelMatrix.prototype.top = function (y/*float*/) {
    this.setY(y);
}

//============================================================
//    L2DModelMatrix # bottom()
//============================================================
L2DModelMatrix.prototype.bottom = function (y/*float*/) {
    var h = this.height * this.getScaleY();
    this.translateY(y - h);
}

//============================================================
//    L2DModelMatrix # left()
//============================================================
L2DModelMatrix.prototype.left = function (x/*float*/) {
    this.setX(x);
}

//============================================================
//    L2DModelMatrix # right()
//============================================================
L2DModelMatrix.prototype.right = function (x/*float*/) {
    var w = this.width * this.getScaleX();
    this.translateX(x - w);
}

//============================================================
//    L2DModelMatrix # centerX()
//============================================================
L2DModelMatrix.prototype.centerX = function (x/*float*/) {
    var w = this.width * this.getScaleX();
    this.translateX(x - w / 2);
}

//============================================================
//    L2DModelMatrix # centerY()
//============================================================
L2DModelMatrix.prototype.centerY = function (y/*float*/) {
    var h = this.height * this.getScaleY();
    this.translateY(y - h / 2);
}

//============================================================
//    L2DModelMatrix # setX()
//============================================================
L2DModelMatrix.prototype.setX = function (x/*float*/) {
    this.translateX(x);
}

//============================================================
//    L2DModelMatrix # setY()
//============================================================
L2DModelMatrix.prototype.setY = function (y/*float*/) {
    this.translateY(y);
}

//============================================================
//    L2DModelMatrix # setHeight()
//============================================================
L2DModelMatrix.prototype.setHeight = function (h/*float*/) {
    var scaleX = h / this.height;
    var scaleY = -scaleX;
    this.scale(scaleX, scaleY);
}

//============================================================
//    L2DModelMatrix # setWidth()
//============================================================
L2DModelMatrix.prototype.setWidth = function (w/*float*/) {
    var scaleX = w / this.width;
    var scaleY = -scaleX;
    this.scale(scaleX, scaleY);
}
