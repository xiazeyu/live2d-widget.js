/* eslint-disable no-magic-numbers */

import {
  glMatrix,
  mat4,
} from 'gl-matrix';

class MatrixStack {

  constructor () {

    this.matrixStack = mat4.create();
    this.depth = 0;
    this.currentMatrix = mat4.create();
    this.tmp = new glMatrix.ARRAY_TYPE(16);

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

    this.currentMatrix = mat4.identity(this.currentMatrix);
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

    const offset = (this.depth + 1) * 16;
    if(this.matrixStack.length < offset + 16) {

      this.matrixStack.length = offset + 16;

    }
    for(let i = 0; i < 16; i++) {

      this.matrixStack[offset + i] = this.currentMatrix[i];

    }
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

      this.depth = 0;
      console.error('Matrix Stack underflow.');
      return this;

    }
    const offset = this.depth * 16;
    for(let i = 0; i < 16; i++) {

      this.currentMatrix[i] = this.matrixStack[offset + i];

    }
    return this;

  }

  /**
   * To get the current staging matrix.
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

    this.currentMatrix = mat4.multiply(this.currentMatrix, this.currentMatrix, operMat);
    return this;

  }

}

// DEBUG
window.MatrixStack = MatrixStack;

export {
  MatrixStack,
};
