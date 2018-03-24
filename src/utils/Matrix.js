/* eslint-disable no-magic-numbers */

import {
  mat4,
} from 'gl-matrix';

const ArrayType = (typeof Float32Array !== 'undefined') ? Float32Array : Array;

class MatrixStack {

  constructor () {

    this.matrixStack = [
      1, 0, 0, 0,
      0, 1, 0, 0,
      0, 0, 1, 0,
      0, 0, 0, 1,
    ];
    this.depth = 0;
    this.currentMatrix = [
      1, 0, 0, 0,
      0, 1, 0, 0,
      0, 0, 1, 0,
      0, 0, 0, 1,
    ];
    this.tmp = new ArrayType(16);

  }

  /**
   * Reseet the matrix stack.
   * @return  {Function}  The instance function itself.
   */
  reset () {

    this.depth = 0;
    return this;

  }

  /**
   * Load the identity matrix to the current modelview matrix.
   * @return  {Function}  The instance function itself.
   */
  loadIdentity () {

    for(const i = 0; i < 16; i++){
      this.currentMatrix[i] = (i % 5 === 0) ? 1 : 0;
    }
    return this;

  }

  /**
   * Adds a matrix to the stack.
   * @return  {Function}  The instance function itself.
   */
  push(){
    this.matrixStack.push(this.currentMatrix);
    this.depth++;
    return this;
  }

  pop(){
    this.depth--;
    if(this.depth < 0){
      console.error('Invalid matrix stack.');
      this.depth = 0;
    }
    this.currentMatrix = this.matrixStack.pop();
  }

}

export {
  MatrixStack,
};
