
//============================================================
//============================================================
//  class L2DViewMatrix        extends     L2DMatrix44
//============================================================
//============================================================
function L2DViewMatrix() {
  L2DMatrix44.prototype.constructor.call(this);
  this.screenLeft = null;
  this.screenRight = null;
  this.screenTop = null;
  this.screenBottom = null;
  this.maxLeft = null;
  this.maxRight = null;
  this.maxTop = null;
  this.maxBottom = null;
  this.max = Number.MAX_VALUE;
  this.min = 0;
}

L2DViewMatrix.prototype = new L2DMatrix44(); //L2DViewMatrix extends L2DMatrix44


L2DViewMatrix.prototype = new L2DMatrix44(); //L2DViewMatrix extends L2DMatrix44

//============================================================
//    L2DViewMatrix # getMaxScale()
//============================================================
L2DViewMatrix.prototype.getMaxScale = function () {
    return this.max;
}

//============================================================
//    L2DViewMatrix # getMinScale()
//============================================================
L2DViewMatrix.prototype.getMinScale = function () {
    return this.min;
}

//============================================================
//    L2DViewMatrix # setMaxScale()
//============================================================
L2DViewMatrix.prototype.setMaxScale = function (v /*float*/ ) {
    this.max = v;
}

//============================================================
//    L2DViewMatrix # setMinScale()
//============================================================
L2DViewMatrix.prototype.setMinScale = function (v /*float*/ ) {
    this.min = v;
}

//============================================================
//    L2DViewMatrix # isMaxScale()
//============================================================
L2DViewMatrix.prototype.isMaxScale = function () {
    return this.getScaleX() == this.max;
}

//============================================================
//    L2DViewMatrix # isMinScale()
//============================================================
L2DViewMatrix.prototype.isMinScale = function () {
    return this.getScaleX() == this.min;
}


//============================================================
//    L2DViewMatrix # adjustTranslate()
//============================================================
L2DViewMatrix.prototype.adjustTranslate = function (shiftX/*float*/, shiftY/*float*/) {
    if (this.tr[0] * this.maxLeft + (this.tr[12] + shiftX) > this.screenLeft)
        shiftX = this.screenLeft - this.tr[0] * this.maxLeft - this.tr[12];
    if (this.tr[0] * this.maxRight + (this.tr[12] + shiftX) < this.screenRight)
        shiftX = this.screenRight - this.tr[0] * this.maxRight - this.tr[12];
    if (this.tr[5] * this.maxTop + (this.tr[13] + shiftY) < this.screenTop)
        shiftY = this.screenTop - this.tr[5] * this.maxTop - this.tr[13];
    if (this.tr[5] * this.maxBottom + (this.tr[13] + shiftY) > this.screenBottom)
        shiftY = this.screenBottom - this.tr[5] * this.maxBottom - this.tr[13];

    var tr1 = [1, 0, 0, 0,
        0, 1, 0, 0,
        0, 0, 1, 0,
        shiftX, shiftY, 0, 1];
    L2DMatrix44.mul(tr1, this.tr, this.tr);
}

//============================================================
//    L2DViewMatrix # adjustScale()
//============================================================
L2DViewMatrix.prototype.adjustScale = function (cx/*float*/, cy/*float*/, scale/*float*/) {
    var targetScale = scale * this.tr[0];
    if (targetScale < this.min) {
        if (this.tr[0] > 0) scale = this.min / this.tr[0];
    } else if (targetScale > this.max) {
        if (this.tr[0] > 0) scale = this.max / this.tr[0];
    }
    var tr1 = [1, 0, 0, 0,
        0, 1, 0, 0,
        0, 0, 1, 0,
        cx, cy, 0, 1];
    var tr2 = [scale, 0, 0, 0,
        0, scale, 0, 0,
        0, 0, 1, 0,
        0, 0, 0, 1];
    var tr3 = [1, 0, 0, 0,
        0, 1, 0, 0,
        0, 0, 1, 0,
        -cx, -cy, 0, 1];
    L2DMatrix44.mul(tr3, this.tr, this.tr);
    L2DMatrix44.mul(tr2, this.tr, this.tr);
    L2DMatrix44.mul(tr1, this.tr, this.tr);
}

//============================================================
//    L2DViewMatrix # setScreenRect()
//============================================================
L2DViewMatrix.prototype.setScreenRect = function (left/*float*/, right/*float*/, bottom/*float*/, top/*float*/) {
    this.screenLeft = left;
    this.screenRight = right;
    this.screenTop = top;
    this.screenBottom = bottom;
}

//============================================================
//    L2DViewMatrix # setMaxScreenRect()
//============================================================
L2DViewMatrix.prototype.setMaxScreenRect = function (left/*float*/, right/*float*/, bottom/*float*/, top/*float*/) {
    this.maxLeft = left;
    this.maxRight = right;
    this.maxTop = top;
    this.maxBottom = bottom;
}

//============================================================
//    L2DViewMatrix # getScreenLeft()
//============================================================
L2DViewMatrix.prototype.getScreenLeft = function () {
    return this.screenLeft;
}

//============================================================
//    L2DViewMatrix # getScreenRight()
//============================================================
L2DViewMatrix.prototype.getScreenRight = function () {
    return this.screenRight;
}

//============================================================
//    L2DViewMatrix # getScreenBottom()
//============================================================
L2DViewMatrix.prototype.getScreenBottom = function () {
    return this.screenBottom;
}

//============================================================
//    L2DViewMatrix # getScreenTop()
//============================================================
L2DViewMatrix.prototype.getScreenTop = function () {
    return this.screenTop;
}

//============================================================
//    L2DViewMatrix # getMaxLeft()
//============================================================
L2DViewMatrix.prototype.getMaxLeft = function () {
    return this.maxLeft;
}

//============================================================
//    L2DViewMatrix # getMaxRight()
//============================================================
L2DViewMatrix.prototype.getMaxRight = function () {
    return this.maxRight;
}

//============================================================
//    L2DViewMatrix # getMaxBottom()
//============================================================
L2DViewMatrix.prototype.getMaxBottom = function () {
    return this.maxBottom;
}

//============================================================
//    L2DViewMatrix # getMaxTop()
//============================================================
L2DViewMatrix.prototype.getMaxTop = function () {
    return this.maxTop;
}
