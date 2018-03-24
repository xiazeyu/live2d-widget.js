
//============================================================
//============================================================
//  class L2DMatrix44
//============================================================
//============================================================
function L2DMatrix44() {
    this.tr = new Float32Array(16); //
    this.identity();
}

//============================================================
//    static L2DMatrix44.mul()
//============================================================
// matrix multiplication
L2DMatrix44.mul = function (a/*float[]*/, b/*float[]*/, dst/*float[]*/) {
    var c = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    var n = 4;
    var i, j, k;
    for (i = 0; i < n; i++) {
        for (j = 0; j < n; j++) {
            for (k = 0; k < n; k++) {
                c[i + j * 4] += a[i + k * 4] * b[k + j * 4];
            }
        }
    }
    for (i = 0; i < 16; i++) {
        dst[i] = c[i];
    }
}

//============================================================
//    L2DMatrix44 # identity()
//============================================================
L2DMatrix44.prototype.identity = function () {
    for (var i/*:int*/ = 0; i < 16; i++)
        this.tr[i] = ((i % 5) == 0) ? 1 : 0;
}

//============================================================
//    L2DMatrix44 # getArray()
//============================================================
L2DMatrix44.prototype.getArray = function () {
    return this.tr;
}

//============================================================
//    L2DMatrix44 # getCopyMatrix()
//============================================================
L2DMatrix44.prototype.getCopyMatrix = function () {
    return new Float32Array(this.tr); // this.tr.clone();
}

//============================================================
//    L2DMatrix44 # setMatrix()
//============================================================
L2DMatrix44.prototype.setMatrix = function (tr/*float[]*/) {
    if (this.tr == null || this.tr.length != this.tr.length) return;
    for (var i/*:int*/ = 0; i < 16; i++) this.tr[i] = tr[i];
}

//============================================================
//    L2DMatrix44 # getScaleX()
//============================================================
L2DMatrix44.prototype.getScaleX = function () {
    return this.tr[0];
}

//============================================================
//    L2DMatrix44 # getScaleY()
//============================================================
L2DMatrix44.prototype.getScaleY = function () {
    return this.tr[5];
}

//============================================================
//    L2DMatrix44 # transformX()
//============================================================
L2DMatrix44.prototype.transformX = function (src/*float*/) {
    return this.tr[0] * src + this.tr[12];
}

//============================================================
//    L2DMatrix44 # transformY()
//============================================================
L2DMatrix44.prototype.transformY = function (src/*float*/) {
    return this.tr[5] * src + this.tr[13];
}

//============================================================
//    L2DMatrix44 # invertTransformX()
//============================================================
L2DMatrix44.prototype.invertTransformX = function (src/*float*/) {
    return (src - this.tr[12]) / this.tr[0];
}

//============================================================
//    L2DMatrix44 # invertTransformY()
//============================================================
L2DMatrix44.prototype.invertTransformY = function (src/*float*/) {
    return (src - this.tr[13]) / this.tr[5];
}

//============================================================
//    L2DMatrix44 # multTranslate()
//============================================================
L2DMatrix44.prototype.multTranslate = function (shiftX/*float*/, shiftY/*float*/) {
    var tr1 = [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, shiftX, shiftY, 0, 1];
    L2DMatrix44.mul(tr1, this.tr, this.tr);
}

//============================================================
//    L2DMatrix44 # translate()
//============================================================
L2DMatrix44.prototype.translate = function (x/*float*/, y/*float*/) {
    this.tr[12] = x;
    this.tr[13] = y;
}

//============================================================
//    L2DMatrix44 # translateX()
//============================================================
L2DMatrix44.prototype.translateX = function (x/*float*/) {
    this.tr[12] = x;
}

//============================================================
//    L2DMatrix44 # translateY()
//============================================================
L2DMatrix44.prototype.translateY = function (y/*float*/) {
    this.tr[13] = y;
}

//============================================================
//    L2DMatrix44 # multScale()
//============================================================
L2DMatrix44.prototype.multScale = function (scaleX/*float*/, scaleY/*float*/) {
    var tr1 = [scaleX, 0, 0, 0, 0, scaleY, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1];
    L2DMatrix44.mul(tr1, this.tr, this.tr);
}

//============================================================
//    L2DMatrix44 # scale()
//============================================================
L2DMatrix44.prototype.scale = function (scaleX/*float*/, scaleY/*float*/) {
    this.tr[0] = scaleX;
    this.tr[5] = scaleY;
}
