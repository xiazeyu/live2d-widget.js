/* eslint-disable no-magic-numbers */

import {
  create,
  multiply,
  identity,
  clone,
  copy,
} from 'gl-matrix/src/gl-matrix/mat4';

import {
  ARRAY_TYPE,
} from 'gl-matrix/src/gl-matrix/common';

class MatrixStack {

  /**
   * Constructor to MatrixStack
   * @return  {Function}  The instance function itself.
   */
  constructor () {

    this.currentMatrix = create();
    this.depth = 0;
    this.matrixStack = create();

  }

  /**
   * Reset current matrix stack.
   * @return  {Function}  The instance function itself.
   */
  reset () {

    this.depth = 0;
    return this;

  }

  /**
   * Set current matrix to the identity matrix.
   * @return  {Function}  The instance function itself.
   */
  loadIdentity () {

    this.currentMatrix = create();
    return this;

  }

  /**
   * Adds a matrix to the stack.
   *
   * This method increments the count of items on the stack by 1.
   * The stack grows dynamically as more items are added.
   *
   * @return  {Function}  The instance function itself.
   */
  push () {

    // Not using push() because Float32Array doesn't support it.
    const offset = (this.depth + 1) * 16;
    if(this.matrixStack.length < offset + 16) {

      // TypedArray.length is read only.
      const newLength = offset + 16;
      const newMatrixStack = new ARRAY_TYPE(newLength);
      newMatrixStack.set(this.matrixStack);
      this.matrixStack = newMatrixStack;

    }
    this.matrixStack.set(this.currentMatrix, offset);
    this.depth++;
    return this;

  }

  /**
   * Removes the current matrix from the top of the stack.
   *
   * This method decrements the count of items on the stack by 1,
   * effectively removing the current matrix from the top of the stack and promoting a different matrix to that position.
   * If the depth of the stack belows 0,
   * this method logs an error in console and empties the stack.
   * If the current count of items is 1,
   * the method empties the stack.
   *
   * @return  {Function}  The instance function itself.
   */
  pop () {

    this.depth--;
    if(this.depth < 0) {

      console.error('Matrix stack underflow.');
      this.depth = 0;
      return this;

    }
    const offset = (this.depth + 1) * 16;
    this.currentMatrix = this.matrixStack.slice(offset, offset + 16);
    return this;

  }

  /**
   * Returns current staging matrix.
   * @return  {Array}  Current staging matrix.
   */
  getMatrix () {

    return this.currentMatrix;

  }

  /**
   * Determines the product of the current matrix and a given matrix.
   * @param   {Array}     operMat  A matrix to multiply with the current matrix.
   * @return  {Function}           The instance function itself.
   */
  multMatrix (operMat) {

    this.currentMatrix = multiply(this.currentMatrix, this.currentMatrix, operMat);
    return this;

  }

}

class Matrix44 {

  /**
   * Constructor to Matrix44
   * @return  {Function}  The instance function itself.
   */
  constructor () {

    this.tr = new ARRAY_TYPE(16);
    this.identity();
    return this;

  }

  /**
   * Multplies two matrix44.
   * @param   {Array}  a    The first operand.
   * @param   {Array}  b    The second operand.
   * @param   {Array}  out  The receiving matrix.
   * @return  {Array}       Matrix multiplied.
   */
  static mul (a, b, out) {

    return multiply(out, a, b);

  }

  /**
   * Set current matrix44 to identity matrix.
   * @return  {Function}  The instance function itself.
   */
  identity () {

    this.tr = identity(this.tr);
    return this;

  }

  /**
   * Returns current matrix44.
   * @return  {Array}  Current matrix44.
   */
  getArray () {

    return this.tr;

  }

  /**
   * Creates a new matrix44 initalized with values from current matrix44.
   * @return  {Array}  Matrix copied.
   */
  getCopyMatrix () {

    return clone(this.tr);

  }
  /**
   * Copy the value from provided matrix44 to current one.
   * @param  {Array}  tr  The source matrix44.
   * @return {Function}   The instance function itself.
   */
  setMatrix (tr) {

    this.tr = copy(this.tr, tr);
    return this;

  }

  /**
   * Returns current X scale.
   * @return  {Number}  Current X scale.
   */
  getScaleX () {

    return this.tr[0];

  }

  /**
   * Returns current Y scale.
   * @return  {Number}  Current Y scale.
   */
  getScaleY () {

    return this.tr[5];

  }

  /**
   * Returns current X translate.
   * @return  {Number}  Current X translate.
   */
  getTransX () {

    return this.tr[12];

  }

  /**
   * Returns current Y translate.
   * @return  {Number}  Current Y translate.
   */
  getTransY () {

    return this.tr[13];

  }

  /**
   * Returns X transformed by current matrix.
   * @param   {Number}  src  Number to be transformed.
   * @return  {Number}       X-transformed number.
   */
  transformX (src) {

    const t = this.tr[0] * src;

    return this.tr[12] + t;

  }

  /**
   * Returns Y transformed by current matrix.
   * @param   {Number}  src  Number to be transformed.
   * @return  {Number}       Y-transformed number.
   */
  transformY (src) {

    const t = this.tr[5] * src;

    return this.tr[13] + t;

  }

  /**
   * Returns the X-invertTransformed X-operand;
   * @param   {Number}  src  Number to operate X.
   * @return  {Number}       X-invertTransformed result.
   */
  invertTransformX (src) {

    return (src - this.tr[12]) / this.tr[0];

  }
  /**
   * Returns the Y-invertTransformed Y-operand;
   * @param   {Number}  src  Number to operate Y.
   * @return  {Number}       Y-invertTransformed result.
   */
  invertTransformY (src) {

    return (src - this.tr[13]) / this.tr[5];

  }

  /**
   * Multiply current matrix44 by given X and Y translate.
   * @param   {Number}  shiftX  X Shift to translate.
   * @param   {Number}  shiftY  Y shift to translate.
   * @return  {Function}        The instance function itself.
   */
  multTranslate (shiftX, shiftY) {

    const oper = create();
    oper[12] = shiftX;
    oper[13] = shiftY;
    this.tr = Matrix44.mul(oper, this.tr, this.tr);
    return this;

  }

  /**
   * Set X and Y translate to current matrix44.
   * @param   {Number}  x  X operand.
   * @param   {Number}  y  Y operand.
   * @return  {Function}   The instance function itself.
   */
  translate (x, y) {

    return this.translateX(x).translateY(y);

  }

  /**
   * Set X translate to current matrix44.
   * @param   {Number}  x  X operand.
   * @return  {Function}   The instance function itself.
   */
  translateX (x) {

    this.tr[12] = x;
    return this;

  }

  /**
   * Set Y translate to current matrix44.
   * @param   {Number}  y  Y operand.
   * @return  {Function}   The instance function itself.
   */
  translateY (y) {

    this.tr[13] = y;
    return this;

  }

  /**
   * Multiply current matrix44 by given X and Y scale.
   * @param   {Number}  scaleX  X scale to multiply.
   * @param   {Number}  scaleY  Y scale to multiply.
   * @return  {Function}        The instance function itself.
   */
  multScale (scaleX, scaleY) {

    const oper = create();
    oper[0] = scaleX;
    oper[5] = scaleY;
    this.tr = Matrix44.mul(oper, this.tr, this.tr);
    return this;

  }

  /**
   * Scale X and Y scale to current matrix44.
   * @param   {Number}  x  X operand.
   * @param   {Number}  y  Y operand.
   * @return  {Function}   The instance function itself.
   */
  scale (x, y) {

    return this.scaleX(x).scaleY(y);

  }

  /**
   * Set Y scale to current matrix44.
   * @param   {Number}  x  X operand.
   * @return  {Function}   The instance function itself.
   */
  scaleX (x) {

    this.tr[0] = x;
    return this;

  }

  /**
   * Set Y scale to current matrix44.
   * @param   {Number}  y  Y operand.
   * @return  {Function}   The instance function itself.
   */
  scaleY (y) {

    this.tr[5] = y;
    return this;

  }

}

class ModelMatrix extends Matrix44 {

  /**
   * Constructor to ModelMatrix.
   * @param   {Number}  width   Width.
   * @param   {Number}  height  Height.
   * @return  {Function}        The instance function itself.
   */
  constructor (width, height) {

    super();
    this.width = width;
    this.height = height;
    return this;

  }

  /**
   * Set model position.
   * @param  {Number}  x  X position.
   * @param  {Number}  y  Y position.
   * @return {Function}   The instance function itself.
   */
  setPosition (x, y) {

    return this.translate(x, y);

  }

  /**
   * Set model center position.
   * @param  {Number}  x  X position of model center.
   * @param  {Number}  y  Y position of model center
   * @return {Function}   The instance function itself.
   */
  setCenterPosition (x, y) {

    const operW = this.width * this.getScaleX() / 2;
    const operH = this.height * this.getScaleY() / 2;
    return this.translate(x - operW, y - operH);

  }

  /**
   * Set model top position.
   * @param   {Number}  y  Top position.
   * @return  {Function}   The instance function itself.
   */
  top (y) {

    return this.setY(y);

  }

  /**
   * Set model bottom position.
   * @param   {Number}  y  Bottom position.
   * @return  {Function}   The instance function itself.
   */
  bottom (y) {

    const h = this.height * this.getScaleY();
    return this.translateY(y - h);

  }

  /**
   * Set model left position.
   * @param   {Number}  x  Left position.
   * @return  {Function}   The instance function itself.
   */
  left (x) {

    return this.setX(x);

  }

  /**
   * Set model right position.
   * @param   {Number}  x  Right position.
   * @return  {Function}   The instance function itself.
   */
  right (x) {

    const w = this.width * this.getScaleX();
    return this.translateX(x - w);

  }

  /**
   * Set X center.
   * @param   {Number}  x  X position of center.
   * @return  {Function}   The instance function itself.
   */
  centerX (x) {

    const operW = this.width * this.getScaleX() / 2;
    return this.translateX(x - operW);

  }

  /**
   * Set Y center.
   * @param   {Number}  y  Y position of center.
   * @return  {Function}   The instance function itself.
   */
  centerY (y) {

    const operH = this.height * this.getScaleY() / 2;
    return this.translateY(y - operH);

  }

  /**
   * Set X position.
   * @param  {Number}  x  X position.
   * @return {Function}   The instance function iteself.
   */
  setX (x) {

    return this.translateX(x);

  }

  /**
   * Set Y position.
   * @param  {Number}  y  Y position.
   * @return {Function}   The instance function itself.
   */
  setY (y) {

    return this.translateY(y);

  }

  /**
   * Set model height.
   * @param  {Number}  h  Height.
   * @return {Function}   The instance function itself.
   */
  setHeight (h) {

    const scaleX = h / this.height;
    const scaleY = -scaleX;
    return this.scale(scaleX, scaleY);

  }

  /**
   * Set model width.
   * @param  {Number}  w  Width.
   * @return {Function}   The instance function itself.
   */
  setWidth (w) {

    const scaleX = w / this.width;
    const scaleY = -scaleX;
    return this.scale(scaleX, scaleY);

  }

}

class ViewMatrix extends Matrix44 {

  /**
   * Constructor to ViewMatrix
   * @return  {Function}  The instance function itself.
   */
  constructor () {

    super();
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
    return this;

  }

  /**
   * Get max scale of matrix.
   * @return  {Number}  Max scale.
   */
  getMaxScale () {

    return this.max;

  }

  /**
   * Get min scale of matrix.
   * @return  {Number}  Min scale.
   */
  getMinScale () {

    return this.min;

  }

  /**
   * Set max scale of matrix.
   * @param  {Number}  value  Max scale.
   * @return {Function}       The instance function itself.
   */
  setMaxScale (value) {

    this.max = value;
    return this;

  }

  /**
   * Set min scale of matrix.
   * @param  {Number}  value  Min scale.
   * @return {Function}       The instance function itself.
   */
  setMinScale (value) {

    this.min = value;
    return this;

  }

  /**
   * If current scale is max.
   * @return  {Boolean}  If current scale is max.
   */
  isMaxScale () {

    return this.getScaleX() === this.getMaxScale();

  }

  /**
   * If current scale is min.
   * @return  {Boolean}  If current scale is min.
   */
  isMinScale () {

    return this.getScaleX() === this.getMinScale();

  }

  /**
   * Translate matrix.
   * @param   {Number}  shiftX  X shift.
   * @param   {Number}  shiftY  Y shift.
   * @return  {Function}        The instance function itself.
   */
  adjustTranslate (shiftX, shiftY) {

    const tLeft = this.getScaleX() * this.getMaxLeft();
    const tRight = this.getScaleX() * this.getMaxRight();
    const tTop = this.getScaleY() * this.getMaxTop();
    const tBottom = this.getScaleY() * this.getMaxBottom();

    if (tLeft + this.getTransX() + shiftX > this.getScreenLeft()) {

      shiftX = this.getScreenLeft() - tLeft - this.getTransX();

    }
    if (tRight + this.getTransX() + shiftX < this.getScreenRight()) {

      shiftX = this.getScreenRight() - tRight - this.getTransX();

    }
    if (tTop + this.getTransY() + shiftY < this.getScreenTop()) {

      shiftY = this.getScreenTop() - tTop - this.getTransY();

    }
    if (tBottom + this.getTransY() + shiftY > this.getScreenBottom()) {

      shiftY = this.getScreenBottom() - tBottom - this.getTransY();

    }
    return this.multTranslate(shiftX, shiftY);

  }

  /**
   * Scale matrix.
   * @param   {Number}  cx     Cx.
   * @param   {Number}  cy     Cy.
   * @param   {Number}  scale  Scale.
   * @return  {Function}       The instance function itself.
   */
  adjustScale (cx, cy, scale) {

    const targetScale = scale * this.getScaleX();

    if(targetScale < this.getMinScale()) {

      if (this.getScaleX() > 0) {

        scale = this.getMinScale() / this.getScaleX();

      }

    } else if (targetScale > this.getMaxScale()) {

      if(this.getScaleX() > 0) {

        scale = this.getMaxScale() / this.getScaleX();

      }

    }
    return this.multTranslate(-cx, -cy).multScale(scale, scale).multTranslate(cx, cy);

  }

  /**
   * Set screen rect.
   * @param  {Number}  left    Left.
   * @param  {Number}  right   Right.
   * @param  {Number}  bottom  Bottom.
   * @param  {Number}  top     Top.
   * @return {Function}        The instance function itself.
   */
  setScreenRect (left, right, bottom, top) {

    this.screenLeft = left;
    this.screenRight = right;
    this.screenTop = top;
    this.screenBottom = bottom;
    return this;

  }

  /**
   * Set max screent rect
   * @param  {Number}  left    Left.
   * @param  {Number}  right   Right.
   * @param  {Number}  bottom  Bottom.
   * @param  {Number}  top     Top.
   * @return {Function}        The instance function itself.
   */
  setMaxScreenRect (left, right, bottom, top) {

    this.maxLeft = left;
    this.maxRight = right;
    this.maxTop = top;
    this.maxBottom = bottom;
    return this;

  }

  /**
   * Get screen left.
   * @return  {Number}  Screen left.
   */
  getScreenLeft () {

    return this.screenLeft;

  }

  /**
   * Get screen right.
   * @return  {Number}  Screen right.
   */
  getScreenRight () {

    return this.screenRight;

  }

  /**
   * Get screen bottom.
   * @return  {Number}  Screen bottom.
   */
  getScreenBottom () {

    return this.screenBottom;

  }

  /**
   * Get screen top.
   * @return  {Number}  Screen top.
   */
  getScreenTop () {

    return this.screenTop;

  }

  /**
   * Get max left.
   * @return  {Number}  Max left.
   */
  getMaxLeft () {

    return this.maxLeft;

  }

  /**
   * Get max right.
   * @return  {Number}  Max right.
   */
  getMaxRight () {

    return this.maxRight;

  }

  /**
   * Get max bottom.
   * @return  {Number}  Max bottom.
   */
  getMaxBottom () {

    return this.maxBottom;

  }

  /**
   * Get max top.
   * @return  {Number}  Max top.
   */
  getMaxTop () {

    return this.maxTop;

  }

}

export {
  MatrixStack,
  Matrix44,
  ModelMatrix,
  ViewMatrix,
};
